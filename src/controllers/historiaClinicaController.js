import HistoriaClinicaService from '../services/historiaClinicaService.js';

/**
 * Controlador de Historia Clínica
 * Maneja las peticiones HTTP y las respuestas para los endpoints de historias clínicas
 */
class HistoriaClinicaController {
  /**
   * Obtiene todas las historias clínicas
   * GET /historias-clinicas
   */
  static async getAllHistorias(req, res) {
    try {
      const historias = await HistoriaClinicaService.getAllHistorias();
      res.status(200).json({
        success: true,
        data: historias,
        count: historias.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener las historias clínicas',
        error: error.message
      });
    }
  }

  /**
   * Obtiene una historia clínica por su ID
   * GET /historias-clinicas/:id
   */
  static async getHistoriaById(req, res) {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id) || id <= 0) {
        return res.status(400).json({
          success: false,
          message: 'ID inválido. Debe ser un número entero positivo'
        });
      }

      const historia = await HistoriaClinicaService.getHistoriaById(id);
      
      res.status(200).json({
        success: true,
        data: historia
      });
    } catch (error) {
      if (error.message === 'Historia clínica no encontrada') {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      }

      res.status(500).json({
        success: false,
        message: 'Error al obtener la historia clínica',
        error: error.message
      });
    }
  }

  /**
   * Busca historias clínicas por cédula del paciente
   * GET /historias-clinicas/cedula/:cedula
   */
  static async getHistoriasByCedula(req, res) {
    try {
      const { cedula } = req.params;

      if (!cedula || cedula.trim().length === 0) {
        return res.status(400).json({
          success: false,
          message: 'La cédula es requerida'
        });
      }

      const historias = await HistoriaClinicaService.getHistoriasByCedula(cedula);
      
      res.status(200).json({
        success: true,
        data: historias,
        count: historias.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al buscar las historias clínicas',
        error: error.message
      });
    }
  }

  /**
   * Crea una nueva historia clínica
   * POST /historias-clinicas
   */
  static async createHistoria(req, res) {
    try {
      const historia = await HistoriaClinicaService.createHistoria(req.body);
      
      res.status(201).json({
        success: true,
        message: 'Historia clínica creada exitosamente',
        data: historia
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Error al crear la historia clínica',
        error: error.message
      });
    }
  }

  /**
   * Actualiza una historia clínica existente
   * PUT /historias-clinicas/:id
   */
  static async updateHistoria(req, res) {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id) || id <= 0) {
        return res.status(400).json({
          success: false,
          message: 'ID inválido. Debe ser un número entero positivo'
        });
      }

      const historia = await HistoriaClinicaService.updateHistoria(id, req.body);
      
      res.status(200).json({
        success: true,
        message: 'Historia clínica actualizada exitosamente',
        data: historia
      });
    } catch (error) {
      if (error.message === 'Historia clínica no encontrada') {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      }

      res.status(400).json({
        success: false,
        message: 'Error al actualizar la historia clínica',
        error: error.message
      });
    }
  }

  /**
   * Elimina una historia clínica
   * DELETE /historias-clinicas/:id
   */
  static async deleteHistoria(req, res) {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id) || id <= 0) {
        return res.status(400).json({
          success: false,
          message: 'ID inválido. Debe ser un número entero positivo'
        });
      }

      await HistoriaClinicaService.deleteHistoria(id);
      
      res.status(200).json({
        success: true,
        message: 'Historia clínica eliminada exitosamente'
      });
    } catch (error) {
      if (error.message === 'Historia clínica no encontrada') {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      }

      res.status(500).json({
        success: false,
        message: 'Error al eliminar la historia clínica',
        error: error.message
      });
    }
  }
}

export default HistoriaClinicaController;

