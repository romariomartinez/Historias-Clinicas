#!/bin/bash

# Script de build para producción
echo "🔨 Compilando frontend..."
npm run build

echo "✅ Build completado!"
echo "📦 Archivos listos en la carpeta public/"
echo ""
echo "Para iniciar en producción:"
echo "  NODE_ENV=production npm start"

