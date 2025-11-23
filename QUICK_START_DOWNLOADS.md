# Guía Rápida: Sistema de Descarga de PDFs

## 🚀 Inicio Rápido

### Para Agregar un Botón de Descarga

```html
<button data-download-pdf="mi-documento" 
        aria-label="Descargar mi documento">
  Descargar PDF
</button>
```

### Para Agregar un Nuevo Documento

1. **Coloca el PDF** en la carpeta correspondiente:
   ```
   assets/documents/guias/Mi-Documento-SUFED.pdf
   ```

2. **Actualiza el JavaScript** en `js/main.js`:
   ```javascript
   // En PDFDownloadManager constructor
   this.pdfPaths = {
     'mi-documento': 'assets/documents/guias/Mi-Documento-SUFED.pdf'
   };
   
   // En getFileName()
   const fileNames = {
     'mi-documento': 'Mi-Documento-SUFED.pdf'
   };
   ```

3. **Listo!** El botón funcionará automáticamente.

---

## 📁 Estructura de Carpetas

```
assets/documents/
├── guias/              ← Guías de práctica clínica
├── interpretacion/     ← Material de interpretación
├── conceptos/          ← Conceptos esenciales
└── recursos/           ← Escalas, cuestionarios, etc.
```

---

## 🎨 Variantes de Botones

### Botón Primario (Azul)
```html
<button data-download-pdf="documento">
  Descargar
</button>
```

### Botón Acento (Verde azulado)
```html
<button class="guideline-card__link guideline-card__link--download"
        data-download-pdf="documento">
  Descargar
</button>
```

---

## 🔍 Ver Estadísticas de Descarga

Abre la consola del navegador (F12) y ejecuta:

```javascript
// Ver todas las estadísticas
JSON.parse(localStorage.getItem('sufed_download_stats'))

// Ver descargas de un documento específico
const stats = JSON.parse(localStorage.getItem('sufed_download_stats'));
console.log(stats['nice']); // { count: 5, lastDownload: "..." }
```

---

## 🧪 Probar la Funcionalidad

1. Abre `test-download-buttons.html` en tu navegador
2. Haz clic en los botones de prueba
3. Verifica que aparezcan las notificaciones
4. Revisa las estadísticas en la consola

---

## 📝 Convención de Nombres

**Formato:** `Titulo-Del-Documento-SUFED.pdf`

✅ Correcto:
- `Guias-NICE-SUFED.pdf`
- `Como-Leer-Guia-Clinica-SUFED.pdf`
- `Definicion-IASP-2020-SUFED.pdf`

❌ Incorrecto:
- `guias nice.pdf` (espacios, sin SUFED)
- `NICE_Guidelines.pdf` (guiones bajos, sin SUFED)
- `nice-guidelines-sufed.pdf` (minúsculas)

---

## 🐛 Solución de Problemas

### El botón no funciona
- ✓ Verifica que tenga `data-download-pdf="id"`
- ✓ Verifica que el ID esté en `pdfPaths`
- ✓ Revisa la consola del navegador (F12)

### El archivo no se descarga
- ✓ Verifica que el archivo exista en la ruta
- ✓ Verifica el nombre del archivo
- ✓ Revisa la pestaña Network en DevTools

### Las notificaciones no aparecen
- ✓ Verifica que los estilos CSS estén cargados
- ✓ Revisa la consola para errores
- ✓ Verifica que no haya conflictos de z-index

---

## 📞 Ayuda

- **Documentación completa:** `DOWNLOAD_FUNCTIONALITY.md`
- **Código fuente:** `js/main.js` (clase `PDFDownloadManager`)
- **Estilos:** `css/main.css` (sección "PDF DOWNLOAD BUTTONS")
- **Pruebas:** `test-download-buttons.html`

---

## ✨ Tips

1. **Siempre incluye ARIA labels** para accesibilidad
2. **Usa nombres descriptivos** para los IDs de documentos
3. **Optimiza los PDFs** antes de subirlos (< 10MB)
4. **Prueba en diferentes navegadores** antes de publicar
5. **Monitorea las estadísticas** para ver qué documentos son más populares

---

**¿Listo para empezar?** 🚀

1. Prepara tus PDFs
2. Colócalos en `assets/documents/`
3. Actualiza `js/main.js`
4. ¡Prueba y publica!
