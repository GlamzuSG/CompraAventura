const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../db/database');

const router = express.Router();

/**
 * POST /api/auth/registro
 * US-07: Registro de nuevos usuarios
 *
 * Body: { nombre, email, password }
 * Respuestas:
 *   201 - Usuario creado exitosamente
 *   400 - Datos inválidos o faltantes
 *   409 - Email ya registrado
 *   500 - Error interno
 */
router.post('/registro', async (req, res) => {
  const { nombre, email, password } = req.body;

  // --- Validaciones de entrada ---
  if (!nombre || !email || !password) {
    return res.status(400).json({
      error: 'Todos los campos son requeridos: nombre, email, password'
    });
  }

  // Validar tipo string
  if (
    typeof nombre !== 'string' ||
    typeof email !== 'string' ||
    typeof password !== 'string'
  ) {
    return res.status(400).json({ error: 'Los campos deben ser cadenas de texto' });
  }

  // Sanitizar espacios
  const nombreTrim = nombre.trim();
  const emailTrim = email.trim().toLowerCase();

  if (nombreTrim.length === 0) {
    return res.status(400).json({ error: 'El nombre no puede estar vacío' });
  }

  if (nombreTrim.length > 100) {
    return res.status(400).json({ error: 'El nombre no puede superar 100 caracteres' });
  }

  // Validar formato email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailTrim)) {
    return res.status(400).json({ error: 'El formato del email es inválido' });
  }

  if (emailTrim.length > 255) {
    return res.status(400).json({ error: 'El email no puede superar 255 caracteres' });
  }

  // Validar contraseña: mínimo 8 caracteres
  if (password.length < 8) {
    return res.status(400).json({
      error: 'La contraseña debe tener al menos 8 caracteres'
    });
  }

  if (password.length > 128) {
    return res.status(400).json({ error: 'La contraseña no puede superar 128 caracteres' });
  }

  try {
    // Verificar si el email ya existe
    const existente = db.prepare('SELECT id FROM usuarios WHERE email = ?').get(emailTrim);
    if (existente) {
      return res.status(409).json({ error: 'El email ya está registrado' });
    }

    // Hash de la contraseña
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Insertar usuario
    const stmt = db.prepare(
      'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)'
    );
    const result = stmt.run(nombreTrim, emailTrim, passwordHash);

    return res.status(201).json({
      mensaje: 'Usuario registrado exitosamente',
      usuario: {
        id: result.lastInsertRowid,
        nombre: nombreTrim,
        email: emailTrim
      }
    });
  } catch (err) {
    console.error('Error en registro:', err.message);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;
