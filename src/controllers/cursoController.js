import CursoService from '../services/cursoService.js';

/**
 * Controlador de Curso
 * Maneja las peticiones HTTP y las respuestas para los endpoints de cursos
 */
class CursoController {
  /**
   * Obtiene todos los cursos
   * GET /cursos
   */
  static async getAllCursos(req, res) {
    try {
      const cursos = await CursoService.getAllCursos();
      res.status(200).json({
        success: true,
        data: cursos,
        count: cursos.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener los cursos',
        error: error.message
      });
    }
  }

  /**
   * Obtiene un curso por su ID
   * GET /cursos/:id
   */
  static async getCursoById(req, res) {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id) || id <= 0) {
        return res.status(400).json({
          success: false,
          message: 'ID inválido. Debe ser un número entero positivo'
        });
      }

      const curso = await CursoService.getCursoById(id);
      
      res.status(200).json({
        success: true,
        data: curso
      });
    } catch (error) {
      if (error.message === 'Curso no encontrado') {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      }

      res.status(500).json({
        success: false,
        message: 'Error al obtener el curso',
        error: error.message
      });
    }
  }

  /**
   * Crea un nuevo curso
   * POST /cursos
   */
  static async createCurso(req, res) {
    try {
      const curso = await CursoService.createCurso(req.body);
      
      res.status(201).json({
        success: true,
        message: 'Curso creado exitosamente',
        data: curso
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Error al crear el curso',
        error: error.message
      });
    }
  }

  /**
   * Actualiza un curso existente
   * PUT /cursos/:id
   */
  static async updateCurso(req, res) {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id) || id <= 0) {
        return res.status(400).json({
          success: false,
          message: 'ID inválido. Debe ser un número entero positivo'
        });
      }

      const curso = await CursoService.updateCurso(id, req.body);
      
      res.status(200).json({
        success: true,
        message: 'Curso actualizado exitosamente',
        data: curso
      });
    } catch (error) {
      if (error.message === 'Curso no encontrado') {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      }

      res.status(400).json({
        success: false,
        message: 'Error al actualizar el curso',
        error: error.message
      });
    }
  }

  /**
   * Elimina un curso
   * DELETE /cursos/:id
   */
  static async deleteCurso(req, res) {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id) || id <= 0) {
        return res.status(400).json({
          success: false,
          message: 'ID inválido. Debe ser un número entero positivo'
        });
      }

      await CursoService.deleteCurso(id);
      
      res.status(200).json({
        success: true,
        message: 'Curso eliminado exitosamente'
      });
    } catch (error) {
      if (error.message === 'Curso no encontrado') {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      }

      res.status(500).json({
        success: false,
        message: 'Error al eliminar el curso',
        error: error.message
      });
    }
  }
}

export default CursoController;


