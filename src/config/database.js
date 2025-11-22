import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Configuración y conexión a la base de datos SQLite
 * Crea la base de datos si no existe y configura las tablas necesarias
 */
const dbPath = join(__dirname, '../../database.sqlite');
const db = new Database(dbPath);

/**
 * Inicializa la base de datos creando las tablas necesarias
 */
function initializeDatabase() {
  try {
    // Crear tabla de historias clínicas si no existe
    db.exec(`
      CREATE TABLE IF NOT EXISTS historias_clinicas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        paciente_nombre TEXT NOT NULL,
        paciente_edad INTEGER NOT NULL,
        paciente_cedula TEXT NOT NULL,
        fecha_consulta DATE NOT NULL,
        sintomas TEXT,
        diagnostico TEXT NOT NULL,
        tratamiento TEXT NOT NULL,
        medico TEXT NOT NULL,
        observaciones TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('Base de datos inicializada correctamente');
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
    throw error;
  }
}

// Inicializar la base de datos al cargar el módulo
initializeDatabase();

export default db;


