import HistoriaClinica from '../models/HistoriaClinica.js';

/**
 * Servicio de Historia Clínica
 * Contiene la lógica de negocio y validaciones para las historias clínicas
 */
class HistoriaClinicaService {
  /**
   * Valida los datos de una historia clínica
   * @param {Object} historiaData - Datos de la historia clínica a validar
   * @throws {Error} Si los datos no son válidos
   */
  static validateHistoriaData(historiaData) {
    const errors = [];

    // Validar nombre del paciente
    if (!historiaData.paciente_nombre || typeof historiaData.paciente_nombre !== 'string' || historiaData.paciente_nombre.trim().length === 0) {
      errors.push('El nombre del paciente es requerido y debe ser una cadena de texto');
    }

    if (historiaData.paciente_nombre && historiaData.paciente_nombre.trim().length > 200) {
      errors.push('El nombre del paciente no puede exceder 200 caracteres');
    }

    // Validar edad
    if (!historiaData.paciente_edad || typeof historiaData.paciente_edad !== 'number') {
      errors.push('La edad del paciente es requerida y debe ser un número');
    }

    if (historiaData.paciente_edad && (historiaData.paciente_edad < 0 || historiaData.paciente_edad > 150)) {
      errors.push('La edad debe estar entre 0 y 150 años');
    }

    // Validar cédula
    if (!historiaData.paciente_cedula || typeof historiaData.paciente_cedula !== 'string' || historiaData.paciente_cedula.trim().length === 0) {
      errors.push('La cédula del paciente es requerida');
    }

    if (historiaData.paciente_cedula && historiaData.paciente_cedula.trim().length > 50) {
      errors.push('La cédula no puede exceder 50 caracteres');
    }

    // Validar fecha de consulta
    if (!historiaData.fecha_consulta || typeof historiaData.fecha_consulta !== 'string') {
      errors.push('La fecha de consulta es requerida y debe tener formato YYYY-MM-DD');
    }

    // Validar formato de fecha
    if (historiaData.fecha_consulta) {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(historiaData.fecha_consulta)) {
        errors.push('La fecha de consulta debe tener formato YYYY-MM-DD');
      } else {
        const fecha = new Date(historiaData.fecha_consulta);
        if (isNaN(fecha.getTime())) {
          errors.push('La fecha de consulta no es válida');
        }
      }
    }

    // Validar diagnóstico
    if (!historiaData.diagnostico || typeof historiaData.diagnostico !== 'string' || historiaData.diagnostico.trim().length === 0) {
      errors.push('El diagnóstico es requerido y debe ser una cadena de texto');
    }

    if (historiaData.diagnostico && historiaData.diagnostico.trim().length > 500) {
      errors.push('El diagnóstico no puede exceder 500 caracteres');
    }

    // Validar tratamiento
    if (!historiaData.tratamiento || typeof historiaData.tratamiento !== 'string' || historiaData.tratamiento.trim().length === 0) {
      errors.push('El tratamiento es requerido y debe ser una cadena de texto');
    }

    if (historiaData.tratamiento && historiaData.tratamiento.trim().length > 1000) {
      errors.push('El tratamiento no puede exceder 1000 caracteres');
    }

    // Validar médico
    if (!historiaData.medico || typeof historiaData.medico !== 'string' || historiaData.medico.trim().length === 0) {
      errors.push('El nombre del médico es requerido y debe ser una cadena de texto');
    }

    if (historiaData.medico && historiaData.medico.trim().length > 200) {
      errors.push('El nombre del médico no puede exceder 200 caracteres');
    }

    // Validar campos opcionales
    if (historiaData.sintomas && typeof historiaData.sintomas !== 'string') {
      errors.push('Los síntomas deben ser una cadena de texto');
    }

    if (historiaData.sintomas && historiaData.sintomas.trim().length > 1000) {
      errors.push('Los síntomas no pueden exceder 1000 caracteres');
    }

    if (historiaData.observaciones && typeof historiaData.observaciones !== 'string') {
      errors.push('Las observaciones deben ser una cadena de texto');
    }

    if (historiaData.observaciones && historiaData.observaciones.trim().length > 1000) {
      errors.push('Las observaciones no pueden exceder 1000 caracteres');
    }

    if (errors.length > 0) {
      throw new Error(errors.join('; '));
    }
  }

  /**
   * Obtiene todas las historias clínicas
   * @returns {Array} Lista de historias clínicas
   */
  static async getAllHistorias() {
    try {
      return HistoriaClinica.findAll();
    } catch (error) {
      throw new Error(`Error al obtener historias clínicas: ${error.message}`);
    }
  }

  /**
   * Obtiene una historia clínica por su ID
   * @param {number} id - ID de la historia clínica
   * @returns {Object} La historia clínica encontrada
   * @throws {Error} Si la historia clínica no existe
   */
  static async getHistoriaById(id) {
    try {
      const historia = HistoriaClinica.findById(id);
      
      if (!historia) {
        throw new Error('Historia clínica no encontrada');
      }

      return historia;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Busca historias clínicas por cédula del paciente
   * @param {string} cedula - Cédula del paciente
   * @returns {Array} Lista de historias clínicas del paciente
   */
  static async getHistoriasByCedula(cedula) {
    try {
      return HistoriaClinica.findByCedula(cedula);
    } catch (error) {
      throw new Error(`Error al buscar historias clínicas: ${error.message}`);
    }
  }

  /**
   * Crea una nueva historia clínica
   * @param {Object} historiaData - Datos de la historia clínica
   * @returns {Object} La historia clínica creada
   * @throws {Error} Si los datos no son válidos
   */
  static async createHistoria(historiaData) {
    try {
      // Validar datos
      this.validateHistoriaData(historiaData);

      // Limpiar y normalizar datos
      const cleanData = {
        paciente_nombre: historiaData.paciente_nombre.trim(),
        paciente_edad: historiaData.paciente_edad,
        paciente_cedula: historiaData.paciente_cedula.trim(),
        fecha_consulta: historiaData.fecha_consulta.trim(),
        sintomas: historiaData.sintomas ? historiaData.sintomas.trim() : null,
        diagnostico: historiaData.diagnostico.trim(),
        tratamiento: historiaData.tratamiento.trim(),
        medico: historiaData.medico.trim(),
        observaciones: historiaData.observaciones ? historiaData.observaciones.trim() : null
      };

      return HistoriaClinica.create(cleanData);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Actualiza una historia clínica existente
   * @param {number} id - ID de la historia clínica a actualizar
   * @param {Object} historiaData - Datos actualizados
   * @returns {Object} La historia clínica actualizada
   * @throws {Error} Si la historia clínica no existe o los datos no son válidos
   */
  static async updateHistoria(id, historiaData) {
    try {
      // Verificar que la historia clínica existe
      const existingHistoria = HistoriaClinica.findById(id);
      if (!existingHistoria) {
        throw new Error('Historia clínica no encontrada');
      }

      // Validar datos
      this.validateHistoriaData(historiaData);

      // Limpiar y normalizar datos
      const cleanData = {
        paciente_nombre: historiaData.paciente_nombre.trim(),
        paciente_edad: historiaData.paciente_edad,
        paciente_cedula: historiaData.paciente_cedula.trim(),
        fecha_consulta: historiaData.fecha_consulta.trim(),
        sintomas: historiaData.sintomas ? historiaData.sintomas.trim() : null,
        diagnostico: historiaData.diagnostico.trim(),
        tratamiento: historiaData.tratamiento.trim(),
        medico: historiaData.medico.trim(),
        observaciones: historiaData.observaciones ? historiaData.observaciones.trim() : null
      };

      const updatedHistoria = HistoriaClinica.update(id, cleanData);
      
      if (!updatedHistoria) {
        throw new Error('Error al actualizar la historia clínica');
      }

      return updatedHistoria;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Elimina una historia clínica
   * @param {number} id - ID de la historia clínica a eliminar
   * @returns {boolean} true si se eliminó correctamente
   * @throws {Error} Si la historia clínica no existe
   */
  static async deleteHistoria(id) {
    try {
      // Verificar que la historia clínica existe
      const existingHistoria = HistoriaClinica.findById(id);
      if (!existingHistoria) {
        throw new Error('Historia clínica no encontrada');
      }

      const deleted = HistoriaClinica.delete(id);
      
      if (!deleted) {
        throw new Error('Error al eliminar la historia clínica');
      }

      return true;
    } catch (error) {
      throw error;
    }
  }
}

export default HistoriaClinicaService;

