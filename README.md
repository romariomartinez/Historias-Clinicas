# API REST para Gestión de Historias Clínicas

API REST completa desarrollada con Node.js y Express para la gestión de historias clínicas. Incluye operaciones CRUD (Create, Read, Update, Delete) con validaciones y manejo de errores. Frontend moderno con React y Tailwind CSS.

## 🚀 Características

- **Backend**: Node.js + Express
- **Frontend**: React 18 con Vite + Tailwind CSS
- **Base de datos**: SQLite (better-sqlite3)
- **Arquitectura**: Separación en capas (routes, controllers, services, models)
- **Validaciones**: Validación completa de datos de entrada
- **Manejo de errores**: Respuestas coherentes y estructuradas
- **ES Modules**: Uso de import/export moderno
- **Documentación API**: Swagger/OpenAPI integrado
- **Diseño Moderno**: Interfaz responsive con Tailwind CSS

## 📋 Requisitos Previos

- Node.js (versión 18 o superior recomendada)
- npm o yarn

## 📦 Instalación

1. **Clonar o descargar el proyecto**

2. **Instalar dependencias**:
```bash
npm install
```

Esto instalará las siguientes dependencias:
- **Backend**: `express`, `better-sqlite3`, `swagger-ui-express`, `swagger-jsdoc`
- **Frontend**: `react`, `react-dom`, `vite`, `tailwindcss`

## 🏃 Ejecución

### Desarrollo

**Terminal 1 - Backend:**
```bash
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev:frontend
```

- Backend: `http://localhost:3000`
- Frontend: `http://localhost:5173`
- Swagger: `http://localhost:3000/api-docs`

### Producción

1. **Compilar el frontend:**
```bash
npm run build
```

2. **Iniciar el servidor:**
```bash
NODE_ENV=production npm start
```

El servidor servirá tanto el backend como el frontend compilado en `http://localhost:3000`

## 🎨 Frontend React + Tailwind CSS

El frontend está construido con React 18 y Tailwind CSS, ofreciendo:

- **Componentes React**: Arquitectura modular y reutilizable
- **Tailwind CSS**: Diseño moderno y responsive
- **Vite**: Build tool rápido y eficiente
- **Hooks**: useState, useEffect para manejo de estado
- **Responsive Design**: Adaptable a todos los dispositivos

### Estructura del Frontend

```
client/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── HistoriaForm.jsx
│   │   ├── HistoriasList.jsx
│   │   ├── HistoriaCard.jsx
│   │   └── DeleteModal.jsx
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
└── package.json (implícito)
```

## 📚 Endpoints Disponibles

### Base URL
```
http://localhost:3000
```

### Endpoints de Historias Clínicas

- `GET /historias-clinicas` - Obtener todas las historias clínicas
- `GET /historias-clinicas/:id` - Obtener una historia clínica por ID
- `GET /historias-clinicas/cedula/:cedula` - Buscar por cédula
- `POST /historias-clinicas` - Crear una nueva historia clínica
- `PUT /historias-clinicas/:id` - Actualizar una historia clínica
- `DELETE /historias-clinicas/:id` - Eliminar una historia clínica

## 📁 Estructura del Proyecto

```
.
├── client/                      # Frontend React
│   ├── src/
│   │   ├── components/         # Componentes React
│   │   ├── services/           # Servicios API
│   │   └── App.jsx             # Componente principal
│   └── index.html
├── public/                      # Archivos estáticos (build)
├── src/                         # Backend
│   ├── config/
│   │   ├── database.js
│   │   └── swagger.js
│   ├── models/
│   │   └── HistoriaClinica.js
│   ├── services/
│   │   └── historiaClinicaService.js
│   ├── controllers/
│   │   └── historiaClinicaController.js
│   └── routes/
│       └── historiaClinicaRoutes.js
├── app.js                       # Configuración Express
├── server.js                    # Punto de entrada
├── vite.config.js               # Configuración Vite
├── tailwind.config.js           # Configuración Tailwind
└── package.json
```

## 🔍 Validaciones

El sistema valida los siguientes campos:

- **paciente_nombre**: Requerido, string, máximo 200 caracteres
- **paciente_edad**: Requerido, número entero entre 0 y 150 años
- **paciente_cedula**: Requerido, string, máximo 50 caracteres
- **fecha_consulta**: Requerido, formato YYYY-MM-DD
- **sintomas**: Opcional, string, máximo 1000 caracteres
- **diagnostico**: Requerido, string, máximo 500 caracteres
- **tratamiento**: Requerido, string, máximo 1000 caracteres
- **medico**: Requerido, string, máximo 200 caracteres
- **observaciones**: Opcional, string, máximo 1000 caracteres

## 🗄️ Base de Datos

La base de datos SQLite se crea automáticamente en el archivo `database.sqlite` en la raíz del proyecto al iniciar el servidor por primera vez.

### Esquema de la tabla `historias_clinicas`:

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | INTEGER | Clave primaria, autoincremental |
| paciente_nombre | TEXT | Nombre completo del paciente (requerido) |
| paciente_edad | INTEGER | Edad del paciente en años (requerido) |
| paciente_cedula | TEXT | Cédula o documento de identidad (requerido) |
| fecha_consulta | DATE | Fecha de la consulta médica (requerido) |
| sintomas | TEXT | Síntomas presentados (opcional) |
| diagnostico | TEXT | Diagnóstico médico (requerido) |
| tratamiento | TEXT | Tratamiento prescrito (requerido) |
| medico | TEXT | Nombre del médico (requerido) |
| observaciones | TEXT | Observaciones adicionales (opcional) |
| created_at | DATETIME | Fecha de creación (automático) |
| updated_at | DATETIME | Fecha de última actualización (automático) |

## 🛠️ Tecnologías Utilizadas

### Backend:
- **Node.js**: Entorno de ejecución de JavaScript
- **Express**: Framework web minimalista
- **better-sqlite3**: Driver de SQLite para Node.js
- **swagger-ui-express**: Interfaz de usuario para documentación Swagger
- **swagger-jsdoc**: Generador de especificación OpenAPI desde comentarios

### Frontend:
- **React 18**: Biblioteca de JavaScript para interfaces de usuario
- **Vite**: Build tool y dev server rápido
- **Tailwind CSS**: Framework CSS utility-first
- **PostCSS**: Procesador de CSS

## 🚀 Despliegue

Para desplegar la aplicación en producción:

1. **Compilar el frontend:**
```bash
npm run build
```

2. **Iniciar en producción:**
```bash
NODE_ENV=production npm start
```

### Plataformas de Despliegue Recomendadas

- **Railway**: [Guía de despliegue](./DEPLOY_INSTRUCTIONS.md#opción-1-railway-más-fácil---recomendado)
- **Render**: [Guía de despliegue](./DEPLOY_INSTRUCTIONS.md#opción-2-render)
- **Heroku**: [Guía de despliegue](./DEPLOY_INSTRUCTIONS.md#opción-3-heroku)
- **VPS**: [Guía de despliegue](./DEPLOY_INSTRUCTIONS.md#opción-4-vps-servidor-propio)

Ver [DEPLOY_INSTRUCTIONS.md](./DEPLOY_INSTRUCTIONS.md) para instrucciones detalladas.

## 📝 Notas

- La base de datos se crea automáticamente al iniciar el servidor
- Los timestamps `created_at` y `updated_at` se gestionan automáticamente
- Todas las respuestas siguen un formato JSON consistente
- El manejo de errores es coherente en todos los endpoints
- En desarrollo, el frontend corre en Vite (puerto 5173) con proxy al backend
- En producción, el frontend se compila y se sirve desde Express
- **Importante**: Ejecuta `npm run build` antes de desplegar

## 📄 Licencia

ISC
