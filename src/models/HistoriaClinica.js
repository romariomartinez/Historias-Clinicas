import db from '../config/database.js';

/**
 * Modelo de Historia Clínica
 * Proporciona métodos para interactuar con la tabla de historias clínicas en la base de datos
 */
class HistoriaClinica {
  /**
   * Obtiene todas las historias clínicas de la base de datos
   * @returns {Array} Lista de todas las historias clínicas
   */
  static findAll() {
    try {
      const stmt = db.prepare('SELECT * FROM historias_clinicas ORDER BY fecha_consulta DESC, id DESC');
      return stmt.all();
    } catch (error) {
      throw new Error(`Error al obtener historias clínicas: ${error.message}`);
    }
  }

  /**
   * Obtiene una historia clínica por su ID
   * @param {number} id - ID de la historia clínica
   * @returns {Object|null} La historia clínica encontrada o null si no existe
   */
  static findById(id) {
    try {
      const stmt = db.prepare('SELECT * FROM historias_clinicas WHERE id = ?');
      return stmt.get(id) || null;
    } catch (error) {
      throw new Error(`Error al obtener historia clínica: ${error.message}`);
    }
  }

  /**
   * Busca historias clínicas por cédula del paciente
   * @param {string} cedula - Cédula del paciente
   * @returns {Array} Lista de historias clínicas del paciente
   */
  static findByCedula(cedula) {
    try {
      const stmt = db.prepare('SELECT * FROM historias_clinicas WHERE paciente_cedula = ? ORDER BY fecha_consulta DESC');
      return stmt.all(cedula);
    } catch (error) {
      throw new Error(`Error al buscar historias clínicas: ${error.message}`);
    }
  }

  /**
   * Crea una nueva historia clínica en la base de datos
   * @param {Object} historiaData - Datos de la historia clínica a crear
   * @param {string} historiaData.paciente_nombre - Nombre completo del paciente
   * @param {number} historiaData.paciente_edad - Edad del paciente
   * @param {string} historiaData.paciente_cedula - Cédula o documento de identidad
   * @param {string} historiaData.fecha_consulta - Fecha de la consulta (YYYY-MM-DD)
   * @param {string} historiaData.sintomas - Síntomas presentados
   * @param {string} historiaData.diagnostico - Diagnóstico médico
   * @param {string} historiaData.tratamiento - Tratamiento prescrito
   * @param {string} historiaData.medico - Nombre del médico
   * @param {string} historiaData.observaciones - Observaciones adicionales
   * @returns {Object} La historia clínica creada con su ID
   */
  static create(historiaData) {
    try {
      const stmt = db.prepare(`
        INSERT INTO historias_clinicas (
          paciente_nombre, paciente_edad, paciente_cedula, fecha_consulta,
          sintomas, diagnostico, tratamiento, medico, observaciones
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      
      const result = stmt.run(
        historiaData.paciente_nombre,
        historiaData.paciente_edad,
        historiaData.paciente_cedula,
        historiaData.fecha_consulta,
        historiaData.sintomas || null,
        historiaData.diagnostico,
        historiaData.tratamiento,
        historiaData.medico,
        historiaData.observaciones || null
      );

      return this.findById(result.lastInsertRowid);
    } catch (error) {
      throw new Error(`Error al crear historia clínica: ${error.message}`);
    }
  }

  /**
   * Actualiza una historia clínica existente
   * @param {number} id - ID de la historia clínica a actualizar
   * @param {Object} historiaData - Datos actualizados de la historia clínica
   * @returns {Object|null} La historia clínica actualizada o null si no existe
   */
  static update(id, historiaData) {
    try {
      const stmt = db.prepare(`
        UPDATE historias_clinicas 
        SET paciente_nombre = ?, paciente_edad = ?, paciente_cedula = ?, 
            fecha_consulta = ?, sintomas = ?, diagnostico = ?, 
            tratamiento = ?, medico = ?, observaciones = ?, 
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `);
      
      const result = stmt.run(
        historiaData.paciente_nombre,
        historiaData.paciente_edad,
        historiaData.paciente_cedula,
        historiaData.fecha_consulta,
        historiaData.sintomas || null,
        historiaData.diagnostico,
        historiaData.tratamiento,
        historiaData.medico,
        historiaData.observaciones || null,
        id
      );

      if (result.changes === 0) {
        return null;
      }

      return this.findById(id);
    } catch (error) {
      throw new Error(`Error al actualizar historia clínica: ${error.message}`);
    }
  }

  /**
   * Elimina una historia clínica de la base de datos
   * @param {number} id - ID de la historia clínica a eliminar
   * @returns {boolean} true si se eliminó, false si no existía
   */
  static delete(id) {
    try {
      const stmt = db.prepare('DELETE FROM historias_clinicas WHERE id = ?');
      const result = stmt.run(id);
      return result.changes > 0;
    } catch (error) {
      throw new Error(`Error al eliminar historia clínica: ${error.message}`);
    }
  }
}

export default HistoriaClinica;

