# 🚀 Instrucciones Rápidas de Despliegue

## Opción 1: Railway (Más Fácil - Recomendado)

### Paso 1: Preparar el código
```bash
# Asegúrate de tener todo commiteado
git add .
git commit -m "Preparado para despliegue"
```

### Paso 2: Desplegar en Railway
1. Ve a [railway.app](https://railway.app)
2. Crea una cuenta o inicia sesión
3. Click en "New Project"
4. Selecciona "Deploy from GitHub repo"
5. Conecta tu repositorio
6. Railway detectará automáticamente Node.js
7. Agrega variable de entorno: `NODE_ENV=production`
8. ¡Listo! Railway desplegará automáticamente

### Paso 3: Obtener URL
Railway te dará una URL como: `https://tu-app.up.railway.app`

---

## Opción 2: Render

### Paso 1: Preparar
```bash
npm run build
git add .
git commit -m "Build para producción"
git push
```

### Paso 2: Desplegar
1. Ve a [render.com](https://render.com)
2. Crea cuenta
3. "New +" → "Web Service"
4. Conecta tu repositorio de GitHub
5. Configuración:
   - **Name**: historias-clinicas
   - **Environment**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `NODE_ENV=production node server.js`
6. Agrega variable: `NODE_ENV=production`
7. Click "Create Web Service"

---

## Opción 3: Heroku

### Paso 1: Instalar Heroku CLI
```bash
npm install -g heroku
```

### Paso 2: Login
```bash
heroku login
```

### Paso 3: Crear app
```bash
heroku create tu-app-nombre
```

### Paso 4: Configurar
```bash
heroku config:set NODE_ENV=production
```

### Paso 5: Desplegar
```bash
git push heroku main
```

---

## Opción 4: VPS (Servidor propio)

### Paso 1: Compilar localmente
```bash
npm run build
```

### Paso 2: Subir archivos al servidor
```bash
# Usar SCP, FTP, o Git
scp -r . usuario@servidor:/ruta/aplicacion
```

### Paso 3: En el servidor
```bash
cd /ruta/aplicacion
npm install --production
NODE_ENV=production node server.js
```

### Paso 4: Con PM2 (Recomendado)
```bash
npm install -g pm2
pm2 start server.js --name "historias-clinicas" --env production
pm2 save
pm2 startup
```

---

## ✅ Verificación Post-Despliegue

1. **Verificar que la app carga:**
   - Visita la URL proporcionada
   - Debe mostrar el frontend React

2. **Verificar API:**
   - Visita: `https://tu-url.com/api-docs`
   - Debe mostrar Swagger

3. **Probar CRUD:**
   - Crear una historia clínica
   - Verificar que se guarda
   - Editar y eliminar

---

## 🔧 Solución de Problemas

### Error: "Cannot GET /"
- Verifica que `npm run build` se ejecutó correctamente
- Verifica que los archivos están en `/public`

### Error: "Port already in use"
- Cambia el puerto en variables de entorno
- O usa el puerto que la plataforma asigna

### Base de datos no funciona
- Verifica permisos de escritura
- La base de datos se crea automáticamente

---

## 📝 Notas Importantes

- **Base de datos**: SQLite se crea automáticamente
- **Backups**: Considera hacer backups regulares de `database.sqlite`
- **Producción**: Para producción real, considera migrar a PostgreSQL
- **HTTPS**: La mayoría de plataformas proporcionan HTTPS automático

---

## 🎉 ¡Listo!

Tu aplicación debería estar funcionando. Si tienes problemas, revisa los logs de la plataforma donde desplegaste.

