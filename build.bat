@echo off
REM Script de build para producción (Windows)

echo 🔨 Compilando frontend...
call npm run build

echo ✅ Build completado!
echo 📦 Archivos listos en la carpeta public/
echo.
echo Para iniciar en producción:
echo   set NODE_ENV=production
echo   npm start

pause

