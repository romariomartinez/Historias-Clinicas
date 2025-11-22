import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import swaggerSpec from './src/config/swagger.js';
import historiaClinicaRoutes from './src/routes/historiaClinicaRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Configuración principal de la aplicación Express
 */
const app = express();

// Middleware para parsear JSON en las peticiones
app.use(express.json());

// Middleware para parsear URL encoded
app.use(express.urlencoded({ extended: true }));

/**
 * Middleware de logging para desarrollo
 * Registra todas las peticiones entrantes
 */
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

/**
 * @swagger
 * /api:
 *   get:
 *     summary: Información general de la API
 *     tags: []
 *     responses:
 *       200:
 *         description: Información de la API
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 version:
 *                   type: string
 *                 endpoints:
 *                   type: object
 *                 swagger:
 *                   type: string
 */
/**
 * Ruta de información de la API
 */
app.get('/api', (req, res) => {
  res.json({
    message: 'API REST para gestión de historias clínicas',
    version: '1.0.0',
    endpoints: {
      historiasClinicas: '/historias-clinicas'
    },
    swagger: '/api-docs'
  });
});

/**
 * Configuración de Swagger UI
 * Documentación interactiva de la API disponible en /api-docs
 */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'API Historias Clínicas - Documentación'
}));

/**
 * Rutas de la API
 * Todas las rutas de historias clínicas están bajo /historias-clinicas
 */
app.use('/historias-clinicas', historiaClinicaRoutes);

/**
 * Servir archivos estáticos desde la carpeta public (solo en producción)
 * En desarrollo, Vite sirve el frontend en puerto 5173
 */
if (process.env.NODE_ENV === 'production') {
  // Servir archivos estáticos de React (CSS, JS, imágenes, etc.)
  app.use(express.static(join(__dirname, 'public'), {
    maxAge: '1y', // Cache estático por 1 año
    etag: true
  }));
  
  // Todas las rutas que no sean API, servir index.html (SPA)
  app.get('*', (req, res) => {
    // No servir index.html para rutas de API
    if (req.path.startsWith('/api') || req.path.startsWith('/historias-clinicas') || req.path.startsWith('/api-docs')) {
      return res.status(404).json({
        success: false,
        message: 'Ruta no encontrada'
      });
    }
    res.sendFile(join(__dirname, 'public', 'index.html'));
  });
}

/**
 * Middleware para manejar rutas no encontradas (404) - Solo para API
 */
app.use((req, res) => {
  // Solo responder JSON si es una petición de API
  if (req.path.startsWith('/api') || req.path.startsWith('/historias-clinicas') || req.path.startsWith('/api-docs')) {
    return res.status(404).json({
      success: false,
      message: 'Ruta no encontrada'
    });
  }
  // Para otras rutas, si estamos en desarrollo, no hacer nada (Vite maneja)
  if (process.env.NODE_ENV !== 'production') {
    return res.status(404).json({
      success: false,
      message: 'Ruta no encontrada'
    });
  }
});

/**
 * Middleware de manejo de errores global
 */
app.use((err, req, res, next) => {
  console.error('Error no manejado:', err);
  
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Error interno del servidor',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

export default app;


