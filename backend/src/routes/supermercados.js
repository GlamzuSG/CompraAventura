const express = require('express');
const db = require('../db/database');

const router = express.Router();

// GET /api/supermercados - Listar todos los supermercados
router.get('/', (req, res) => {
  try {
    const supermercados = db.prepare('SELECT * FROM supermercados').all();
    res.json(supermercados);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET /api/supermercados/:id - Obtener un supermercado específico
router.get('/:id', (req, res) => {
  try {
    const supermercado = db.prepare('SELECT * FROM supermercados WHERE id = ?').get(req.params.id);
    if (!supermercado) {
      return res.status(404).json({ error: 'Supermercado no encontrado' });
    }
    res.json(supermercado);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST /api/supermercados - Crear un nuevo supermercado
router.post('/', (req, res) => {
  try {
    const { nombre, ubicacion, latitud, longitud } = req.body;

    if (!nombre) {
      return res.status(400).json({ error: 'El nombre es requerido' });
    }

    const result = db.prepare(
      'INSERT INTO supermercados (nombre, ubicacion, latitud, longitud) VALUES (?, ?, ?, ?)'
    ).run(nombre, ubicacion || null, latitud || null, longitud || null);

    res.status(201).json({
      id: result.lastInsertRowid,
      mensaje: 'Supermercado creado exitosamente'
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// PUT /api/supermercados/:id - Actualizar un supermercado
router.put('/:id', (req, res) => {
  try {
    const { nombre, ubicacion, latitud, longitud } = req.body;

    // Verificar que existe
    const existe = db.prepare('SELECT id FROM supermercados WHERE id = ?').get(req.params.id);
    if (!existe) {
      return res.status(404).json({ error: 'Supermercado no encontrado' });
    }

    db.prepare(
      'UPDATE supermercados SET nombre = ?, ubicacion = ?, latitud = ?, longitud = ? WHERE id = ?'
    ).run(nombre, ubicacion, latitud, longitud, req.params.id);

    res.json({ mensaje: 'Supermercado actualizado exitosamente' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// DELETE /api/supermercados/:id - Eliminar un supermercado
router.delete('/:id', (req, res) => {
  try {
    const result = db.prepare('DELETE FROM supermercados WHERE id = ?').run(req.params.id);
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Supermercado no encontrado' });
    }
    res.json({ mensaje: 'Supermercado eliminado exitosamente' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;