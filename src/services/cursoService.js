import Curso from '../models/Curso.js';

/**
 * Servicio de Curso
 * Contiene la lógica de negocio y validaciones para los cursos
 */
class CursoService {
  /**
   * Valida los datos de un curso
   * @param {Object} cursoData - Datos del curso a validar
   * @throws {Error} Si los datos no son válidos
   */
  static validateCursoData(cursoData) {
    const errors = [];

    if (!cursoData.nombre || typeof cursoData.nombre !== 'string' || cursoData.nombre.trim().length === 0) {
      errors.push('El nombre del curso es requerido y debe ser una cadena de texto');
    }

    if (cursoData.nombre && cursoData.nombre.trim().length > 200) {
      errors.push('El nombre del curso no puede exceder 200 caracteres');
    }

    if (cursoData.descripcion && typeof cursoData.descripcion !== 'string') {
      errors.push('La descripción debe ser una cadena de texto');
    }

    if (!cursoData.duracion_horas || typeof cursoData.duracion_horas !== 'number') {
      errors.push('La duración en horas es requerida y debe ser un número');
    }

    if (cursoData.duracion_horas && (cursoData.duracion_horas < 1 || cursoData.duracion_horas > 1000)) {
      errors.push('La duración en horas debe estar entre 1 y 1000');
    }

    if (!cursoData.profesor || typeof cursoData.profesor !== 'string' || cursoData.profesor.trim().length === 0) {
      errors.push('El nombre del profesor es requerido y debe ser una cadena de texto');
    }

    if (cursoData.profesor && cursoData.profesor.trim().length > 200) {
      errors.push('El nombre del profesor no puede exceder 200 caracteres');
    }

    if (errors.length > 0) {
      throw new Error(errors.join('; '));
    }
  }

  /**
   * Obtiene todos los cursos
   * @returns {Array} Lista de cursos
   */
  static async getAllCursos() {
    try {
      return Curso.findAll();
    } catch (error) {
      throw new Error(`Error al obtener cursos: ${error.message}`);
    }
  }

  /**
   * Obtiene un curso por su ID
   * @param {number} id - ID del curso
   * @returns {Object} El curso encontrado
   * @throws {Error} Si el curso no existe
   */
  static async getCursoById(id) {
    try {
      const curso = Curso.findById(id);
      
      if (!curso) {
        throw new Error('Curso no encontrado');
      }

      return curso;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Crea un nuevo curso
   * @param {Object} cursoData - Datos del curso
   * @returns {Object} El curso creado
   * @throws {Error} Si los datos no son válidos
   */
  static async createCurso(cursoData) {
    try {
      // Validar datos
      this.validateCursoData(cursoData);

      // Limpiar y normalizar datos
      const cleanData = {
        nombre: cursoData.nombre.trim(),
        descripcion: cursoData.descripcion ? cursoData.descripcion.trim() : null,
        duracion_horas: cursoData.duracion_horas,
        profesor: cursoData.profesor.trim()
      };

      return Curso.create(cleanData);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Actualiza un curso existente
   * @param {number} id - ID del curso a actualizar
   * @param {Object} cursoData - Datos actualizados
   * @returns {Object} El curso actualizado
   * @throws {Error} Si el curso no existe o los datos no son válidos
   */
  static async updateCurso(id, cursoData) {
    try {
      // Verificar que el curso existe
      const existingCurso = Curso.findById(id);
      if (!existingCurso) {
        throw new Error('Curso no encontrado');
      }

      // Validar datos
      this.validateCursoData(cursoData);

      // Limpiar y normalizar datos
      const cleanData = {
        nombre: cursoData.nombre.trim(),
        descripcion: cursoData.descripcion ? cursoData.descripcion.trim() : null,
        duracion_horas: cursoData.duracion_horas,
        profesor: cursoData.profesor.trim()
      };

      const updatedCurso = Curso.update(id, cleanData);
      
      if (!updatedCurso) {
        throw new Error('Error al actualizar el curso');
      }

      return updatedCurso;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Elimina un curso
   * @param {number} id - ID del curso a eliminar
   * @returns {boolean} true si se eliminó correctamente
   * @throws {Error} Si el curso no existe
   */
  static async deleteCurso(id) {
    try {
      // Verificar que el curso existe
      const existingCurso = Curso.findById(id);
      if (!existingCurso) {
        throw new Error('Curso no encontrado');
      }

      const deleted = Curso.delete(id);
      
      if (!deleted) {
        throw new Error('Error al eliminar el curso');
      }

      return true;
    } catch (error) {
      throw error;
    }
  }
}

export default CursoService;


