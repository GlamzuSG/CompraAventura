const express = require('express');
const db = require('../db/database');

const router = express.Router();

// GET /api/busqueda/sugerencias - Sugerencias dinámicas de búsqueda (US-09)
router.get('/sugerencias', (req, res) => {
  try {
    const { parcial, limite = 10 } = req.query;

    if (!parcial) {
      return res.status(400).json({ error: 'El parámetro "parcial" es requerido' });
    }

    const sugerencias = db.prepare(
      'SELECT DISTINCT nombre FROM productos WHERE nombre LIKE ? ORDER BY nombre LIMIT ?'
    ).all(`%${parcial}%`, parseInt(limite));

    // Devolver solo los nombres para sugerencias
    const nombres = sugerencias.map(item => item.nombre);
    res.json(nombres);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET /api/busqueda/ordenar - Ordenar productos por precio (US-03)
router.get('/ordenar', (req, res) => {
  try {
    const { orden = 'asc', limite = 50 } = req.query;
    const ordenValido = orden.toLowerCase() === 'desc' ? 'DESC' : 'ASC';

    const productos = db.prepare(`
      SELECT p.*,
             MIN(pr.valor) as precio_min,
             MAX(pr.valor) as precio_max,
             AVG(pr.valor) as precio_promedio
      FROM productos p
      LEFT JOIN precios pr ON p.id = pr.producto_id
      GROUP BY p.id
      ORDER BY precio_min ${ordenValido}
      LIMIT ?
    `).all(parseInt(limite));

    res.json(productos);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET /api/busqueda/por-supermercado - Obtener productos disponibles en un supermercado específico (US-10)
router.get('/por-supermercado/:supermercadoId', (req, res) => {
  try {
    const { supermercadoId } = req.params;
    const { nombre, categoria } = req.query;

    // Verificar que el supermercado existe
    const supermercado = db.prepare('SELECT * FROM supermercados WHERE id = ?').get(supermercadoId);
    if (!supermercado) {
      return res.status(404).json({ error: 'Supermercado no encontrado' });
    }

    let query = `
      SELECT DISTINCT p.*,
             pr.valor as precio_actual,
             pr.fecha as fecha_precio
      FROM productos p
      JOIN precios pr ON p.id = pr.producto_id
      WHERE pr.supermercado_id = ?
    `;
    const params = [supermercadoId];

    if (nombre) {
      query += ' AND p.nombre LIKE ?';
      params.push(`%${nombre}%`);
    }
    if (categoria) {
      query += ' AND p.categoria = ?';
      params.push(categoria);
    }

    query += ' ORDER BY p.nombre';

    const productos = db.prepare(query).all(...params);
    res.json(productos);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET /api/busqueda/cercano - Priorizar resultados por distancia GPS (US-06)
// Nota: Requiere que la tabla supermercados tenga columnas latitud y longitud
router.get('/cercano', (req, res) => {
  try {
    const { latitud, longitud, radio = 10, limite = 20 } = req.query;

    if (!latitud || !longitud) {
      return res.status(400).json({
        error: 'Los parámetros "latitud" y "longitud" son requeridos',
        ejemplo: '/api/busqueda/cercano?latitud=-33.0458&longitud=-71.6197'
      });
    }

    const lat = parseFloat(latitud);
    const lng = parseFloat(longitud);
    const radioKm = parseFloat(radio); // Radio en kilómetros

    // Fórmula de Haversine para calcular distancia en SQLite
    // Esta es una aproximación - para producción se recomienda usar extensiones espaciales
    const productosCercanos = db.prepare(`
      SELECT DISTINCT p.*,
             s.nombre as supermercado,
             s.latitud,
             s.longitud,
             (
               6371 * acos(
                 cos(radians(?)) * cos(radians(s.latitud)) *
                 cos(radians(s.longitud) - radians(?)) +
                 sin(radians(?)) * sin(radians(s.latitud))
               )
             ) AS distancia_km,
             MIN(pr.valor) as precio_min
      FROM productos p
      JOIN precios pr ON p.id = pr.producto_id
      JOIN supermercados s ON pr.supermercado_id = s.id
      WHERE s.latitud IS NOT NULL AND s.longitud IS NOT NULL
      HAVING distancia_km <= ?
      ORDER BY distancia_km ASC
      LIMIT ?
    `).all(lat, lng, lat, radioKm, limite);

    res.json(productosCercanos);
  } catch (e) {
    res.status(500).json({
      error: e.message,
      hint: 'Asegúrate de que la tabla supermercados tiene columnas latitud y longitud'
    });
  }
});

// GET /api/busqueda/alertas-baja - Productos con precios por debajo de un umbral (US-03 - alertas de baja)
router.get('/alertas-baja', (req, res) => {
  try {
    const { umbralProducto, umbralPrecio } = req.query;

    // Si se especifica umbralProducto, buscamos ese producto específico
    // Si se especifica umbralPrecio, mostrando productos con precio mínimo debajo de ese valor

    let query = `
      SELECT p.*,
             MIN(pr.valor) as precio_minimo,
             s.nombre as supermercado_precio_min
      FROM productos p
      JOIN precios pr ON p.id = pr.producto_id
      JOIN supermercados s ON pr.supermercado_id = s.id
      GROUP BY p.id
      HAVING precio_minimo < ?
    `;
    const params = [umbralPrecio || 1000]; // Valor alto por defecto si no se especifica

    if (umbralProducto) {
      query += ' AND p.nombre LIKE ?';
      params.push(`%${umbralProducto}%`);
      // Reordenar params porque agregamos uno nuevo
      // Mejor reconstruir
    }

    // Reconstruir para manejar correctamente los parámetros
    let condicionales = [];
    const valores = [];

    if (umbralProducto) {
      condicionales.push('p.nombre LIKE ?');
      valores.push(`%${umbralProducto}%`);
    }

    const whereClause = condicionales.length > 0 ? 'WHERE ' + condicionales.join(' AND ') : '';

    const queryFinal = `
      SELECT p.*,
             MIN(pr.valor) as precio_minimo,
             s.nombre as supermercado_precio_min
      FROM productos p
      JOIN precios pr ON p.id = pr.producto_id
      JOIN supermercados s ON pr.supermercado_id = s.id
      ${whereClause}
      GROUP BY p.id
      HAVING precio_minimo < ?
      ORDER BY precio_minimo ASC
    `;

    valores.push(umbralPrecio || 1000);

    const productos = db.prepare(queryFinal).all(...valores);
    res.json(productos);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;