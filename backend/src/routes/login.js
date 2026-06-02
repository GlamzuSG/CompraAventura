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
 *
 * Body: { email, password }
 * Respuestas:
 *   200 - Login exitoso, retorna token JWT
 *   400 - Datos faltantes o inválidos
 *   401 - Credenciales incorrectas
 *   500 - Error interno
 */
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Validar campos requeridos
  if (!email || !password) {
    return res.status(400).json({
      error: 'Los campos email y password son requeridos'
    });
  }

  if (typeof email !== 'string' || typeof password !== 'string') {
    return res.status(400).json({ error: 'Los campos deben ser cadenas de texto' });
  }

  const emailTrim = email.trim().toLowerCase();

  // Validar formato email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailTrim)) {
    return res.status(400).json({ error: 'El formato del email es inválido' });
  }

  try {
    // Buscar usuario
    const usuario = db.prepare('SELECT * FROM usuarios WHERE email = ?').get(emailTrim);

    if (!usuario) {
      // Usar mensaje genérico para no revelar si el email existe
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Verificar contraseña
    const passwordValida = await bcrypt.compare(password, usuario.password);
    if (!passwordValida) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Generar JWT
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
 * US-08: Cierre de sesión
 * Nota: Con JWT stateless, el logout se maneja en el cliente eliminando el token.
 * Este endpoint confirma el cierre de sesión.
 */
router.post('/logout', authMiddleware, (req, res) => {
  return res.status(200).json({
    mensaje: 'Sesión cerrada exitosamente. Por favor elimine el token del cliente.'
  });
});

/**
 * GET /api/auth/perfil
 * Ruta protegida de ejemplo - retorna datos del usuario autenticado
 */
router.get('/perfil', authMiddleware, (req, res) => {
  const usuario = db.prepare('SELECT id, nombre, email, creado_en FROM usuarios WHERE id = ?').get(req.user.id);

  if (!usuario) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  return res.status(200).json({ usuario });
});

module.exports = router;
