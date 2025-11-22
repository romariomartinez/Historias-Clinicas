import db from '../config/database.js';

/**
 * Modelo de Curso
 * Proporciona métodos para interactuar con la tabla de cursos en la base de datos
 */
class Curso {
  /**
   * Obtiene todos los cursos de la base de datos
   * @returns {Array} Lista de todos los cursos
   */
  static findAll() {
    try {
      const stmt = db.prepare('SELECT * FROM cursos ORDER BY id DESC');
      return stmt.all();
    } catch (error) {
      throw new Error(`Error al obtener cursos: ${error.message}`);
    }
  }

  /**
   * Obtiene un curso por su ID
   * @param {number} id - ID del curso
   * @returns {Object|null} El curso encontrado o null si no existe
   */
  static findById(id) {
    try {
      const stmt = db.prepare('SELECT * FROM cursos WHERE id = ?');
      return stmt.get(id) || null;
    } catch (error) {
      throw new Error(`Error al obtener curso: ${error.message}`);
    }
  }

  /**
   * Crea un nuevo curso en la base de datos
   * @param {Object} cursoData - Datos del curso a crear
   * @param {string} cursoData.nombre - Nombre del curso
   * @param {string} cursoData.descripcion - Descripción del curso
   * @param {number} cursoData.duracion_horas - Duración en horas
   * @param {string} cursoData.profesor - Nombre del profesor
   * @returns {Object} El curso creado con su ID
   */
  static create(cursoData) {
    try {
      const stmt = db.prepare(`
        INSERT INTO cursos (nombre, descripcion, duracion_horas, profesor)
        VALUES (?, ?, ?, ?)
      `);
      
      const result = stmt.run(
        cursoData.nombre,
        cursoData.descripcion,
        cursoData.duracion_horas,
        cursoData.profesor
      );

      return this.findById(result.lastInsertRowid);
    } catch (error) {
      throw new Error(`Error al crear curso: ${error.message}`);
    }
  }

  /**
   * Actualiza un curso existente
   * @param {number} id - ID del curso a actualizar
   * @param {Object} cursoData - Datos actualizados del curso
   * @returns {Object|null} El curso actualizado o null si no existe
   */
  static update(id, cursoData) {
    try {
      const stmt = db.prepare(`
        UPDATE cursos 
        SET nombre = ?, descripcion = ?, duracion_horas = ?, profesor = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `);
      
      const result = stmt.run(
        cursoData.nombre,
        cursoData.descripcion,
        cursoData.duracion_horas,
        cursoData.profesor,
        id
      );

      if (result.changes === 0) {
        return null;
      }

      return this.findById(id);
    } catch (error) {
      throw new Error(`Error al actualizar curso: ${error.message}`);
    }
  }

  /**
   * Elimina un curso de la base de datos
   * @param {number} id - ID del curso a eliminar
   * @returns {boolean} true si se eliminó, false si no existía
   */
  static delete(id) {
    try {
      const stmt = db.prepare('DELETE FROM cursos WHERE id = ?');
      const result = stmt.run(id);
      return result.changes > 0;
    } catch (error) {
      throw new Error(`Error al eliminar curso: ${error.message}`);
    }
  }
}

export default Curso;


