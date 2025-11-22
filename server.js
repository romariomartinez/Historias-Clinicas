import app from './app.js';

/**
 * Archivo principal del servidor
 * Inicia el servidor Express en el puerto especificado
 */

const PORT = process.env.PORT || 3000;

// Asegurar que la base de datos se inicialice
import './src/config/database.js';

/**
 * Inicia el servidor
 */
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📖 Documentación Swagger: http://localhost:${PORT}/api-docs`);
  console.log(`📚 Endpoints disponibles:`);
  console.log(`   GET    /historias-clinicas - Obtener todas las historias clínicas`);
  console.log(`   GET    /historias-clinicas/:id - Obtener una historia clínica por ID`);
  console.log(`   GET    /historias-clinicas/cedula/:cedula - Buscar por cédula`);
  console.log(`   POST   /historias-clinicas - Crear una nueva historia clínica`);
  console.log(`   PUT    /historias-clinicas/:id - Actualizar una historia clínica`);
  console.log(`   DELETE /historias-clinicas/:id - Eliminar una historia clínica`);
});


