require('dotenv').config();
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globales
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS simple (para desarrollo)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

// Rutas
const registroRouter = require('./routes/registro');
const loginRouter   = require('./routes/login');

const productosRouter = require('./routes/productos');

app.use('/api/auth', registroRouter);
app.use('/api/auth', loginRouter);
app.use('/api/productos', productosRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', proyecto: 'CompraAventura', version: '1.0.0' });
});

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Error handler global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(PORT, () => {
  console.log(`Servidor CompraAventura corriendo en http://localhost:${PORT}`);
});

module.exports = app;
