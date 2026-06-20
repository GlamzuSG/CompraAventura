const express = require('express');
const db = require('../db/database');

const router = express.Router();

router.get('/', (req, res) => {
  try {
    const { nombre, categoria } = req.query;
    let query = 'SELECT * FROM productos WHERE 1=1';
    const params = [];
    if (nombre) { query += ' AND nombre LIKE ?'; params.push(`%${nombre}%`); }
    if (categoria) { query += ' AND categoria = ?'; params.push(categoria); }
    res.json(db.prepare(query).all(...params));
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.post('/', (req, res) => {
  try {
    const { nombre, categoria, descripcion } = req.body;
    const r = db.prepare('INSERT INTO productos (nombre, categoria, descripcion) VALUES (?, ?, ?)').run(nombre, categoria, descripcion);
    res.status(201).json({ id: r.lastInsertRowid });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.put('/:id', (req, res) => {
  try {
    const { nombre, categoria, descripcion } = req.body;
    db.prepare('UPDATE productos SET nombre=?, categoria=?, descripcion=? WHERE id=?').run(nombre, categoria, descripcion, req.params.id);
    res.json({ ok: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.delete('/:id', (req, res) => {
  try {
    db.prepare('DELETE FROM productos WHERE id=?').run(req.params.id);
    res.json({ ok: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.get('/:id/precios', (req, res) => {
  try {
    const precios = db.prepare(`
      SELECT p.valor, p.fecha, s.nombre AS supermercado
      FROM precios p
      JOIN supermercados s ON s.id = p.supermercado_id
      WHERE p.producto_id = ?
      ORDER BY p.valor ASC
    `).all(req.params.id);
    res.json(precios);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

module.exports = router;