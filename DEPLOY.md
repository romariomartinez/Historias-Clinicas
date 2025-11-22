# 🚀 Guía de Despliegue - Sistema de Historias Clínicas

Esta guía te ayudará a desplegar la aplicación en diferentes plataformas.

## 📋 Requisitos Previos

1. Cuenta en la plataforma elegida
2. Git configurado
3. Proyecto en un repositorio Git (GitHub, GitLab, etc.)

---

## 🌐 Opción 1: Render (Recomendado - Gratis)

### Pasos:

1. **Crear cuenta en Render:**
   - Ve a [render.com](https://render.com)
   - Regístrate con GitHub

2. **Crear nuevo servicio:**
   - Click en "New +" → "Web Service"
   - Conecta tu repositorio

3. **Configuración:**
   - **Name:** `historias-clinicas-api`
   - **Environment:** `Node`
   - **Build Command:** `npm install --include=dev && npm run build:frontend`
   - **Start Command:** `npm start`
   - **Environment Variables:**
     - `NODE_ENV` = `production`
     - `PORT` = `10000` (Render lo asigna automáticamente)

4. **Desplegar:**
   - Click en "Create Web Service"
   - Render construirá y desplegará automáticamente

### Ventajas:
- ✅ Plan gratuito disponible
- ✅ Despliegue automático desde Git
- ✅ SSL automático
- ✅ Base de datos SQLite incluida

---

## 🌐 Opción 2: Vercel

### Pasos:

1. **Instalar Vercel CLI:**
```bash
npm i -g vercel
```

2. **Desplegar:**
```bash
vercel
```

3. **O desde el dashboard:**
   - Ve a [vercel.com](https://vercel.com)
   - Importa tu repositorio
   - Vercel detectará automáticamente la configuración

### Nota:
Vercel funciona mejor para frontend. Para el backend completo, considera usar Render o Heroku.

---

## 🌐 Opción 3: Heroku

### Pasos:

1. **Instalar Heroku CLI:**
   - Descarga desde [heroku.com](https://devcenter.heroku.com/articles/heroku-cli)

2. **Login:**
```bash
heroku login
```

3. **Crear aplicación:**
```bash
heroku create tu-app-nombre
```

4. **Configurar variables:**
```bash
heroku config:set NODE_ENV=production
```

5. **Desplegar:**
```bash
git push heroku main
```

### Ventajas:
- ✅ Plan gratuito (con limitaciones)
- ✅ Fácil de usar
- ✅ Add-ons disponibles

---

## 🌐 Opción 4: DigitalOcean App Platform

### Pasos:

1. **Crear cuenta en DigitalOcean**
2. **Ir a App Platform**
3. **Conectar repositorio**
4. **Configurar:**
   - **Build Command:** `npm install && npm run build:frontend`
   - **Run Command:** `npm start`
   - **Environment Variables:**
     - `NODE_ENV` = `production`

### Ventajas:
- ✅ Plan básico desde $5/mes
- ✅ Muy confiable
- ✅ Escalable

---

## 🌐 Opción 5: Netlify (Solo Frontend) + Backend Separado

Si quieres separar frontend y backend:

### Frontend en Netlify:
1. Ve a [netlify.com](https://netlify.com)
2. Conecta tu repositorio
3. **Build settings:**
   - Build command: `npm run build:frontend`
   - Publish directory: `public`
4. **Environment variables:**
   - `VITE_API_URL` = URL de tu backend

### Backend en Render/Heroku:
- Sigue las instrucciones de Render o Heroku arriba

---

## 🔧 Configuración Local para Producción

### 1. Compilar el frontend:
```bash
npm run build:frontend
```

### 2. Verificar que se creó la carpeta `public`:
```bash
ls public
```

### 3. Probar localmente en modo producción:
```bash
NODE_ENV=production npm start
```

---

## 📝 Variables de Entorno

Crea un archivo `.env` (no lo subas a Git):

```env
NODE_ENV=production
PORT=3000
```

En las plataformas de despliegue, configura estas variables en el panel de configuración.

---

## 🗄️ Base de Datos en Producción

**Nota importante:** SQLite funciona bien para desarrollo, pero para producción considera:

1. **PostgreSQL** (Recomendado para producción)
2. **MySQL**
3. **MongoDB**

Si quieres mantener SQLite:
- Render: SQLite funciona bien
- Heroku: Necesitas usar PostgreSQL (ephemeral filesystem)
- Vercel: SQLite funciona con limitaciones

---

## ✅ Checklist de Despliegue

- [ ] Código en repositorio Git
- [ ] `.env` configurado (o variables en la plataforma)
- [ ] Frontend compilado (`npm run build:frontend`)
- [ ] `package.json` con scripts correctos
- [ ] Base de datos inicializada
- [ ] Pruebas locales exitosas
- [ ] Variables de entorno configuradas en la plataforma
- [ ] Dominio personalizado (opcional)

---

## 🐛 Solución de Problemas

### Error: "Cannot find module"
```bash
npm install
```

### Error: "Port already in use"
- Cambia el puerto en `.env` o usa la variable `PORT` de la plataforma

### Frontend no carga:
- Verifica que `npm run build:frontend` se ejecutó correctamente
- Verifica que la carpeta `public` existe y tiene `index.html`

### Base de datos no funciona:
- Verifica permisos de escritura
- Considera usar PostgreSQL para producción

---

## 📞 Soporte

Si tienes problemas con el despliegue:
1. Revisa los logs de la plataforma
2. Verifica las variables de entorno
3. Asegúrate de que el build se completó correctamente

---

## 🎉 ¡Listo!

Una vez desplegado, tu aplicación estará disponible en la URL proporcionada por la plataforma.

**Ejemplo de URLs:**
- Render: `https://tu-app.onrender.com`
- Vercel: `https://tu-app.vercel.app`
- Heroku: `https://tu-app.herokuapp.com`

