# 🚀 Guía de Despliegue

Esta guía te ayudará a desplegar la aplicación de Gestión de Historias Clínicas en diferentes plataformas.

## 📋 Pre-requisitos

1. **Compilar el frontend:**
```bash
npm run build
```

Esto generará los archivos estáticos en la carpeta `public/`.

2. **Verificar que todo funciona localmente:**
```bash
NODE_ENV=production npm start
```

## 🌐 Opciones de Despliegue

### 1. Railway (Recomendado - Gratis)

Railway es excelente para aplicaciones Node.js con base de datos SQLite.

#### Pasos:

1. **Crear cuenta en [Railway](https://railway.app/)**

2. **Instalar Railway CLI:**
```bash
npm i -g @railway/cli
```

3. **Iniciar sesión:**
```bash
railway login
```

4. **Inicializar proyecto:**
```bash
railway init
```

5. **Desplegar:**
```bash
railway up
```

6. **Configurar variables de entorno:**
   - `NODE_ENV=production`
   - `PORT` (Railway lo asigna automáticamente)

7. **Abrir dominio:**
```bash
railway open
```

### 2. Render (Gratis con limitaciones)

#### Pasos:

1. **Crear cuenta en [Render](https://render.com/)**

2. **Crear nuevo Web Service:**
   - Conectar repositorio de GitHub
   - Build Command: `npm install && npm run build`
   - Start Command: `NODE_ENV=production npm start`
   - Environment: `Node`

3. **Variables de entorno:**
   - `NODE_ENV=production`

### 3. Heroku

#### Pasos:

1. **Instalar Heroku CLI:**
```bash
npm install -g heroku
```

2. **Login:**
```bash
heroku login
```

3. **Crear aplicación:**
```bash
heroku create tu-app-nombre
```

4. **Configurar buildpacks:**
```bash
heroku buildpacks:set heroku/nodejs
```

5. **Variables de entorno:**
```bash
heroku config:set NODE_ENV=production
```

6. **Desplegar:**
```bash
git push heroku main
```

### 4. Vercel (Solo Frontend) + Backend separado

Si quieres separar frontend y backend:

#### Frontend en Vercel:

1. **Instalar Vercel CLI:**
```bash
npm i -g vercel
```

2. **Desplegar:**
```bash
cd client
vercel
```

#### Backend en Railway/Render:

Seguir pasos de Railway o Render para el backend.

### 5. Servidor VPS (Ubuntu/Debian)

#### Pasos:

1. **Conectar al servidor:**
```bash
ssh usuario@tu-servidor.com
```

2. **Instalar Node.js:**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

3. **Instalar PM2:**
```bash
sudo npm install -g pm2
```

4. **Clonar repositorio:**
```bash
git clone tu-repositorio
cd tu-proyecto
```

5. **Instalar dependencias y compilar:**
```bash
npm install
npm run build
```

6. **Iniciar con PM2:**
```bash
NODE_ENV=production pm2 start server.js --name "historias-clinicas"
pm2 save
pm2 startup
```

7. **Configurar Nginx (opcional):**
```nginx
server {
    listen 80;
    server_name tu-dominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 🔧 Configuración de Producción

### Variables de Entorno

Crea un archivo `.env` en producción:

```env
NODE_ENV=production
PORT=3000
```

### Base de Datos

La base de datos SQLite se creará automáticamente. En producción, considera:

- **Backups regulares** de `database.sqlite`
- **Migrar a PostgreSQL** para producción (opcional)

## 📝 Checklist Pre-Despliegue

- [ ] Frontend compilado (`npm run build`)
- [ ] Variables de entorno configuradas
- [ ] Base de datos inicializada
- [ ] Pruebas locales en modo producción
- [ ] Documentación actualizada
- [ ] Archivos sensibles en `.gitignore`

## 🐛 Troubleshooting

### Error: "Cannot find module"
```bash
npm install
npm run build
```

### Error: "Port already in use"
Cambiar el puerto en variables de entorno o en `server.js`.

### Base de datos no se crea
Verificar permisos de escritura en el directorio del proyecto.

## 📚 Recursos Adicionales

- [Railway Docs](https://docs.railway.app/)
- [Render Docs](https://render.com/docs)
- [Heroku Docs](https://devcenter.heroku.com/)
- [PM2 Docs](https://pm2.keymetrics.io/)

