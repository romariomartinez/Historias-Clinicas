import express from 'express';
import HistoriaClinicaController from '../controllers/historiaClinicaController.js';

const router = express.Router();

/**
 * @swagger
 * /historias-clinicas:
 *   get:
 *     summary: Obtiene todas las historias clínicas
 *     tags: [Historias Clínicas]
 *     responses:
 *       200:
 *         description: Lista de historias clínicas obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessListResponse'
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', HistoriaClinicaController.getAllHistorias);

/**
 * @swagger
 * /historias-clinicas/cedula/{cedula}:
 *   get:
 *     summary: Busca historias clínicas por cédula del paciente
 *     tags: [Historias Clínicas]
 *     parameters:
 *       - in: path
 *         name: cedula
 *         required: true
 *         schema:
 *           type: string
 *         description: Cédula o documento de identidad del paciente
 *         example: "1234567890"
 *     responses:
 *       200:
 *         description: Lista de historias clínicas del paciente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessListResponse'
 *       400:
 *         description: Cédula inválida
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/cedula/:cedula', HistoriaClinicaController.getHistoriasByCedula);

/**
 * @swagger
 * /historias-clinicas/{id}:
 *   get:
 *     summary: Obtiene una historia clínica por su ID
 *     tags: [Historias Clínicas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID de la historia clínica a obtener
 *         example: 1
 *     responses:
 *       200:
 *         description: Historia clínica obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: ID inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Historia clínica no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', HistoriaClinicaController.getHistoriaById);

/**
 * @swagger
 * /historias-clinicas:
 *   post:
 *     summary: Crea una nueva historia clínica
 *     tags: [Historias Clínicas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HistoriaClinicaInput'
 *           example:
 *             paciente_nombre: "Juan Pérez"
 *             paciente_edad: 35
 *             paciente_cedula: "1234567890"
 *             fecha_consulta: "2024-01-15"
 *             sintomas: "Dolor de cabeza, fiebre"
 *             diagnostico: "Gripe común"
 *             tratamiento: "Reposo, paracetamol 500mg cada 8 horas"
 *             medico: "Dr. María García"
 *             observaciones: "Seguimiento en 3 días"
 *     responses:
 *       201:
 *         description: Historia clínica creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Error de validación o datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', HistoriaClinicaController.createHistoria);

/**
 * @swagger
 * /historias-clinicas/{id}:
 *   put:
 *     summary: Actualiza una historia clínica existente
 *     tags: [Historias Clínicas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID de la historia clínica a actualizar
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HistoriaClinicaInput'
 *           example:
 *             paciente_nombre: "Juan Pérez"
 *             paciente_edad: 35
 *             paciente_cedula: "1234567890"
 *             fecha_consulta: "2024-01-15"
 *             sintomas: "Dolor de cabeza, fiebre"
 *             diagnostico: "Gripe común"
 *             tratamiento: "Reposo, paracetamol 500mg cada 8 horas"
 *             medico: "Dr. María García"
 *             observaciones: "Seguimiento en 3 días"
 *     responses:
 *       200:
 *         description: Historia clínica actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Error de validación o datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Historia clínica no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/:id', HistoriaClinicaController.updateHistoria);

/**
 * @swagger
 * /historias-clinicas/{id}:
 *   delete:
 *     summary: Elimina una historia clínica
 *     tags: [Historias Clínicas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID de la historia clínica a eliminar
 *         example: 1
 *     responses:
 *       200:
 *         description: Historia clínica eliminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Historia clínica eliminada exitosamente"
 *       400:
 *         description: ID inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Historia clínica no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id', HistoriaClinicaController.deleteHistoria);

export default router;

