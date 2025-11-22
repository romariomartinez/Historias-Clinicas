import swaggerJsdoc from 'swagger-jsdoc';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Configuración de Swagger/OpenAPI
 * Define la especificación OpenAPI para documentar la API
 */
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API REST para Gestión de Historias Clínicas',
      version: '1.0.0',
      description: 'API REST completa para la gestión de historias clínicas con operaciones CRUD. Desarrollada con Node.js, Express y SQLite.',
      contact: {
        name: 'Soporte API',
        email: 'soporte@example.com'
      },
      license: {
        name: 'ISC',
        url: 'https://opensource.org/licenses/ISC'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desarrollo'
      }
    ],
    components: {
      schemas: {
        HistoriaClinica: {
          type: 'object',
          required: ['paciente_nombre', 'paciente_edad', 'paciente_cedula', 'fecha_consulta', 'diagnostico', 'tratamiento', 'medico'],
          properties: {
            id: {
              type: 'integer',
              description: 'ID único de la historia clínica (autoincremental)',
              example: 1
            },
            paciente_nombre: {
              type: 'string',
              description: 'Nombre completo del paciente',
              maxLength: 200,
              example: 'Juan Pérez'
            },
            paciente_edad: {
              type: 'integer',
              description: 'Edad del paciente en años',
              minimum: 0,
              maximum: 150,
              example: 35
            },
            paciente_cedula: {
              type: 'string',
              description: 'Cédula o documento de identidad del paciente',
              maxLength: 50,
              example: '1234567890'
            },
            fecha_consulta: {
              type: 'string',
              format: 'date',
              description: 'Fecha de la consulta médica',
              example: '2024-01-15'
            },
            sintomas: {
              type: 'string',
              description: 'Síntomas presentados por el paciente',
              nullable: true,
              maxLength: 1000,
              example: 'Dolor de cabeza, fiebre, malestar general'
            },
            diagnostico: {
              type: 'string',
              description: 'Diagnóstico médico',
              maxLength: 500,
              example: 'Gripe común'
            },
            tratamiento: {
              type: 'string',
              description: 'Tratamiento prescrito',
              maxLength: 1000,
              example: 'Reposo, paracetamol 500mg cada 8 horas por 5 días'
            },
            medico: {
              type: 'string',
              description: 'Nombre del médico que atendió',
              maxLength: 200,
              example: 'Dr. María García'
            },
            observaciones: {
              type: 'string',
              description: 'Observaciones adicionales',
              nullable: true,
              maxLength: 1000,
              example: 'Seguimiento en 3 días si persisten los síntomas'
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha y hora de creación del registro',
              example: '2024-01-15T10:00:00.000Z'
            },
            updated_at: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha y hora de última actualización',
              example: '2024-01-15T10:00:00.000Z'
            }
          }
        },
        HistoriaClinicaInput: {
          type: 'object',
          required: ['paciente_nombre', 'paciente_edad', 'paciente_cedula', 'fecha_consulta', 'diagnostico', 'tratamiento', 'medico'],
          properties: {
            paciente_nombre: {
              type: 'string',
              description: 'Nombre completo del paciente',
              maxLength: 200,
              example: 'Juan Pérez'
            },
            paciente_edad: {
              type: 'integer',
              description: 'Edad del paciente en años',
              minimum: 0,
              maximum: 150,
              example: 35
            },
            paciente_cedula: {
              type: 'string',
              description: 'Cédula o documento de identidad del paciente',
              maxLength: 50,
              example: '1234567890'
            },
            fecha_consulta: {
              type: 'string',
              format: 'date',
              description: 'Fecha de la consulta médica (formato YYYY-MM-DD)',
              example: '2024-01-15'
            },
            sintomas: {
              type: 'string',
              description: 'Síntomas presentados por el paciente',
              nullable: true,
              maxLength: 1000,
              example: 'Dolor de cabeza, fiebre, malestar general'
            },
            diagnostico: {
              type: 'string',
              description: 'Diagnóstico médico',
              maxLength: 500,
              example: 'Gripe común'
            },
            tratamiento: {
              type: 'string',
              description: 'Tratamiento prescrito',
              maxLength: 1000,
              example: 'Reposo, paracetamol 500mg cada 8 horas por 5 días'
            },
            medico: {
              type: 'string',
              description: 'Nombre del médico que atendió',
              maxLength: 200,
              example: 'Dr. María García'
            },
            observaciones: {
              type: 'string',
              description: 'Observaciones adicionales',
              nullable: true,
              maxLength: 1000,
              example: 'Seguimiento en 3 días si persisten los síntomas'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false
            },
            message: {
              type: 'string',
              example: 'Mensaje de error descriptivo'
            },
            error: {
              type: 'string',
              description: 'Detalles adicionales del error (opcional)',
              example: 'Descripción detallada del error'
            }
          }
        },
        SuccessResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            message: {
              type: 'string',
              example: 'Operación realizada exitosamente'
            },
            data: {
              $ref: '#/components/schemas/HistoriaClinica'
            }
          }
        },
        SuccessListResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            data: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/HistoriaClinica'
              }
            },
            count: {
              type: 'integer',
              example: 10
            }
          }
        }
      }
    },
    tags: [
      {
        name: 'Historias Clínicas',
        description: 'Operaciones CRUD para la gestión de historias clínicas'
      }
    ]
  },
  apis: [
    join(__dirname, '../routes/*.js'),
    join(__dirname, '../../app.js')
  ]
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;

