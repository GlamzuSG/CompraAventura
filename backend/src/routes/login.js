const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db/database');
const authMiddleware = require('../middleware/auth');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'compra_aventura_secret_2026';
const JWT_EXPIRES_IN = '2h';

/**
 * POST /api/auth/login
 * US-08: Inicio de sesión seguro con JWT
 */
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: 'Los campos email y password son requeridos'
    });
  }

  if (typeof email !== 'string' || typeof password !== 'string') {
    return res.status(400).json({ error: 'Los campos deben ser cadenas de texto' });
  }

  const emailTrim = email.trim().toLowerCase();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailTrim)) {
    return res.status(400).json({ error: 'El formato del email es inválido' });
  }

  try {
    const usuario = db.prepare('SELECT * FROM usuarios WHERE email = ?').get(emailTrim);

    if (!usuario) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const passwordValida = await bcrypt.compare(password, usuario.password_hash);
    if (!passwordValida) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const payload = {
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    return res.status(200).json({
      mensaje: 'Inicio de sesión exitoso. Bienvenido ' + usuario.nombre,
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email
      }
    });
  } catch (err) {
    console.error('Error en login:', err.message);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

/**
 * POST /api/auth/logout
 */
router.post('/logout', authMiddleware, (req, res) => {
  return res.status(200).json({
    mensaje: 'Sesión cerrada exitosamente. Por favor elimine el token del cliente.'
  });
});

/**
 * GET /api/auth/perfil
 */
router.get('/perfil', authMiddleware, (req, res) => {
  const usuario = db.prepare('SELECT id, nombre, email, creado_en FROM usuarios WHERE id = ?').get(req.user.id);

  if (!usuario) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  return res.status(200).json({ usuario });
});

/**
 * PUT /api/auth/perfil
 * Actualiza los datos del usuario autenticado
 */
router.put('/perfil', authMiddleware, async (req, res) => {
  const { nombre, email, password } = req.body;
  const usuarioId = req.user.id; // Obtenemos el ID directo del token JWT seguro

  if (!nombre || !email) {
    return res.status(400).json({ error: 'Los campos nombre y email son requeridos' });
  }

  try {
    // 1. Verificar si el nuevo email ya está tomado por OTRO usuario
    const emailExiste = db.prepare('SELECT id FROM usuarios WHERE email = ? AND id != ?').get(email.trim().toLowerCase());
    if (emailExiste) {
      return res.status(400).json({ error: 'El email ya está registrado por otro usuario' });
    }

    let query = 'UPDATE usuarios SET nombre = ?, email = ?';
    let params = [nombre.trim(), email.trim().toLowerCase()];

    // 2. Si el usuario también mandó una nueva contraseña, la encriptamos
    if (password) {
      if (password.length < 6) {
        return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' });
      }
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      query += ', password_hash = ?';
      params.push(passwordHash);
    }

    query += ' WHERE id = ?';
    params.push(usuarioId);

    // 3. Ejecutar la actualización en SQLite
    db.prepare(query).run(...params);

    return res.status(200).json({
      mensaje: 'Perfil actualizado con éxito',
      usuario: {
        id: usuarioId,
        nombre: nombre,
        email: email
      }
    });

  } catch (err) {
    console.error('Error al actualizar perfil:', err.message);
    return res.status(500).json({ error: 'Error interno al actualizar el perfil' });
  }
});

module.exports = router;
