# 🚀 Despliegue Rápido - Render (Recomendado)

## Pasos Rápidos:

### 1. Preparar el código:
```bash
# Asegúrate de que todo esté en Git
git add .
git commit -m "Preparado para despliegue"
git push
```

### 2. Desplegar en Render:

1. Ve a [render.com](https://render.com) y crea cuenta (gratis con GitHub)

2. Click en **"New +"** → **"Web Service"**

3. Conecta tu repositorio de GitHub

4. Configuración:
   - **Name:** `historias-clinicas` (o el nombre que prefieras)
   - **Environment:** `Node`
   - **Region:** Elige la más cercana
   - **Branch:** `main` (o `master`)
   - **Root Directory:** (dejar vacío)
   - **Build Command:** `npm install && npm run build:frontend`
   - **Start Command:** `npm start`

5. **Environment Variables:**
   - Click en "Advanced"
   - Agrega:
     - Key: `NODE_ENV` → Value: `production`
     - Key: `PORT` → Value: `10000` (Render lo asigna automáticamente, pero puedes ponerlo)

6. **Plan:** Selecciona "Free"

7. Click en **"Create Web Service"**

8. ⏳ Espera 5-10 minutos mientras Render construye y despliega

9. ✅ ¡Listo! Tu app estará en: `https://tu-app.onrender.com`

---

## 🔧 Si hay problemas:

### Error de build:
- Verifica que `npm run build:frontend` funciona localmente
- Revisa los logs en Render

### La app no carga:
- Verifica que el puerto sea dinámico: `process.env.PORT || 3000`
- Revisa los logs de Render

### Base de datos:
- SQLite funciona en Render
- Los datos persisten entre reinicios

---

## 📝 Notas Importantes:

- **Primera carga puede ser lenta** (Render "duerme" apps gratuitas después de 15 min de inactividad)
- **SSL automático** - Tu app tendrá HTTPS automáticamente
- **Despliegue automático** - Cada push a main despliega automáticamente

---

## 🎉 ¡Listo para usar!

Una vez desplegado, comparte la URL con quien necesites.

