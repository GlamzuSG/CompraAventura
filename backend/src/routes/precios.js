const express = require('express');
const db = require('../db/database');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// GET /api/precios - Listar precios con filtros opcionales
router.get('/', (req, res) => {
  try {
    const { producto_id, supermercado_id, fecha_desde, fecha_hasta } = req.query;
    let query = 'SELECT p.*, s.nombre AS supermercado, pr.nombre AS producto FROM precios p JOIN supermercados s ON p.supermercado_id = s.id JOIN productos pr ON p.producto_id = pr.id WHERE 1=1';
    const params = [];

    if (producto_id) {
      query += ' AND p.producto_id = ?';
      params.push(producto_id);
    }
    if (supermercado_id) {
      query += ' AND p.supermercado_id = ?';
      params.push(supermercado_id);
    }
    if (fecha_desde) {
      query += ' AND p.fecha >= ?';
      params.push(fecha_desde);
    }
    if (fecha_hasta) {
      query += ' AND p.fecha <= ?';
      params.push(fecha_hasta);
    }

    query += ' ORDER BY p.fecha DESC';
    const precios = db.prepare(query).all(...params);
    res.json(precios);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET /api/precios/:id - Obtener un precio específico
router.get('/:id', (req, res) => {
  try {
    const precio = db.prepare(`
      SELECT p.*, s.nombre AS supermercado, pr.nombre AS producto
      FROM precios p
      JOIN supermercados s ON p.supermercado_id = s.id
      JOIN productos pr ON p.producto_id = pr.id
      WHERE p.id = ?
    `).get(req.params.id);

    if (!precio) {
      return res.status(404).json({ error: 'Precio no encontrado' });
    }
    res.json(precio);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST /api/precios - Crear un nuevo precio
router.post('/', (req, res) => {
  try {
    const { valor, fecha, producto_id, supermercado_id } = req.body;

    if (!valor || !producto_id || !supermercado_id) {
      return res.status(400).json({ error: 'Valor, producto_id y supermercado_id son requeridos' });
    }

    // Verificar que el producto existe
    const productoExiste = db.prepare('SELECT id FROM productos WHERE id = ?').get(producto_id);
    if (!productoExiste) {
      return res.status(400).json({ error: 'Producto no encontrado' });
    }

    // Verificar que el supermercado existe
    const supermercadoExiste = db.prepare('SELECT id FROM supermercados WHERE id = ?').get(supermercado_id);
    if (!supermercadoExiste) {
      return res.status(400).json({ error: 'Supermercado no encontrado' });
    }

    const result = db.prepare(
      'INSERT INTO precios (valor, fecha, producto_id, supermercado_id) VALUES (?, ?, ?, ?)'
    ).run(valor, fecha || new Date().toISOString().split('T')[0], producto_id, supermercado_id);

    res.status(201).json({
      id: result.lastInsertRowid,
      mensaje: 'Precio creado exitosamente'
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// PUT /api/precios/:id - Actualizar un precio
router.put('/:id', (req, res) => {
  try {
    const { valor, fecha, producto_id, supermercado_id } = req.body;

    // Verificar que existe
    const existe = db.prepare('SELECT id FROM precios WHERE id = ?').get(req.params.id);
    if (!existe) {
      return res.status(404).json({ error: 'Precio no encontrado' });
    }

    // Validar referencias si se proporcionan
    if (producto_id) {
      const productoExiste = db.prepare('SELECT id FROM productos WHERE id = ?').get(producto_id);
      if (!productoExiste) {
        return res.status(400).json({ error: 'Producto no encontrado' });
      }
    }
    if (supermercado_id) {
      const supermercadoExiste = db.prepare('SELECT id FROM supermercados WHERE id = ?').get(supermercado_id);
      if (!supermercadoExiste) {
        return res.status(400).json({ error: 'Supermercado no encontrado' });
      }
    }

    db.prepare(
      'UPDATE precios SET valor = ?, fecha = ?, producto_id = ?, supermercado_id = ? WHERE id = ?'
    ).run(
      valor,
      fecha || new Date().toISOString().split('T')[0],
      producto_id || req.body.producto_id, // Mantener el existente si no se proporciona
      supermercado_id || req.body.supermercado_id,
      req.params.id
    );

    res.json({ mensaje: 'Precio actualizado exitosamente' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// DELETE /api/precios/:id - Eliminar un precio
router.delete('/:id', (req, res) => {
  try {
    const result = db.prepare('DELETE FROM precios WHERE id = ?').run(req.params.id);
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Precio no encontrado' });
    }
    res.json({ mensaje: 'Precio eliminado exitosamente' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST /api/precios/carga-masiva - Carga masiva de precios desde CSV (US-04)
router.post('/carga-masiva', (req, res) => {
  try {
    // En una aplicación real, usaríamos multer para manejar uploads de archivos
    // Para este ejemplo, asumimos que el CSV se envía como texto en el cuerpo
    // o que ya hemos guardado el archivo temporalmente

    // Como no tenemos multer configurado, dejamos un placeholder
    // En producción, se necesitaría:
    // 1. Configurar multer para handling de uploads
    // 2. Procesar el archivo CSV línea por línea
    // 3. Para cada fila, buscar o crear producto y supermercado
    // 4. Insertar el precio

    return res.status(501).json({
      error: 'Endpoint de carga masiva no implementado completamente',
      hint: 'Se necesitaría configurar multer para manejar uploads de archivos CSV'
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;