import express from 'express';
import CursoController from '../controllers/cursoController.js';

const router = express.Router();

/**
 * @swagger
 * /cursos:
 *   get:
 *     summary: Obtiene todos los cursos
 *     tags: [Cursos]
 *     responses:
 *       200:
 *         description: Lista de cursos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessListResponse'
 *             example:
 *               success: true
 *               data:
 *                 - id: 1
 *                   nombre: "JavaScript Avanzado"
 *                   descripcion: "Curso completo de JavaScript"
 *                   duracion_horas: 40
 *                   profesor: "Juan Pérez"
 *                   created_at: "2024-01-01T10:00:00.000Z"
 *                   updated_at: "2024-01-01T10:00:00.000Z"
 *               count: 1
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', CursoController.getAllCursos);

/**
 * @swagger
 * /cursos/{id}:
 *   get:
 *     summary: Obtiene un curso por su ID
 *     tags: [Cursos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID del curso a obtener
 *         example: 1
 *     responses:
 *       200:
 *         description: Curso obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *             example:
 *               success: true
 *               data:
 *                 id: 1
 *                 nombre: "JavaScript Avanzado"
 *                 descripcion: "Curso completo de JavaScript"
 *                 duracion_horas: 40
 *                 profesor: "Juan Pérez"
 *                 created_at: "2024-01-01T10:00:00.000Z"
 *                 updated_at: "2024-01-01T10:00:00.000Z"
 *       400:
 *         description: ID inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Curso no encontrado
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
router.get('/:id', CursoController.getCursoById);

/**
 * @swagger
 * /cursos:
 *   post:
 *     summary: Crea un nuevo curso
 *     tags: [Cursos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CursoInput'
 *           example:
 *             nombre: "Node.js desde cero"
 *             descripcion: "Aprende Node.js desde los fundamentos"
 *             duracion_horas: 30
 *             profesor: "María García"
 *     responses:
 *       201:
 *         description: Curso creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *             example:
 *               success: true
 *               message: "Curso creado exitosamente"
 *               data:
 *                 id: 2
 *                 nombre: "Node.js desde cero"
 *                 descripcion: "Aprende Node.js desde los fundamentos"
 *                 duracion_horas: 30
 *                 profesor: "María García"
 *                 created_at: "2024-01-01T11:00:00.000Z"
 *                 updated_at: "2024-01-01T11:00:00.000Z"
 *       400:
 *         description: Error de validación o datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               success: false
 *               message: "Error al crear el curso"
 *               error: "El nombre del curso es requerido y debe ser una cadena de texto"
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', CursoController.createCurso);

/**
 * @swagger
 * /cursos/{id}:
 *   put:
 *     summary: Actualiza un curso existente
 *     tags: [Cursos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID del curso a actualizar
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CursoInput'
 *           example:
 *             nombre: "JavaScript Avanzado - Actualizado"
 *             descripcion: "Curso actualizado de JavaScript"
 *             duracion_horas: 50
 *             profesor: "Juan Pérez"
 *     responses:
 *       200:
 *         description: Curso actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *             example:
 *               success: true
 *               message: "Curso actualizado exitosamente"
 *               data:
 *                 id: 1
 *                 nombre: "JavaScript Avanzado - Actualizado"
 *                 descripcion: "Curso actualizado de JavaScript"
 *                 duracion_horas: 50
 *                 profesor: "Juan Pérez"
 *                 created_at: "2024-01-01T10:00:00.000Z"
 *                 updated_at: "2024-01-01T12:00:00.000Z"
 *       400:
 *         description: Error de validación o datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Curso no encontrado
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
router.put('/:id', CursoController.updateCurso);

/**
 * @swagger
 * /cursos/{id}:
 *   delete:
 *     summary: Elimina un curso
 *     tags: [Cursos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID del curso a eliminar
 *         example: 1
 *     responses:
 *       200:
 *         description: Curso eliminado exitosamente
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
 *                   example: "Curso eliminado exitosamente"
 *       400:
 *         description: ID inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Curso no encontrado
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
router.delete('/:id', CursoController.deleteCurso);

export default router;


