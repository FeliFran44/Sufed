# SUFED - Documentos Descargables

Este directorio contiene todos los documentos PDF disponibles para descarga en el sitio web de SUFED.

## Estructura de Carpetas

```
assets/documents/
├── guias/              # Guías de práctica clínica
├── interpretacion/     # Material de interpretación de guías
├── conceptos/          # Documentos sobre conceptos esenciales
└── recursos/           # Recursos adicionales (escalas, cuestionarios, etc.)
```

## Guías de Práctica Clínica

Ubicación: `assets/documents/guias/`

- `NICE-Guidelines-SUFED.pdf` - Guías NICE sobre dolor
- `JOSPT-Guidelines-SUFED.pdf` - Guías JOSPT para fisioterapia
- `IASP-Guidelines-SUFED.pdf` - Guías IASP sobre dolor
- `Lancet-Series-SUFED.pdf` - Serie The Lancet sobre dolor lumbar

## Material de Interpretación

Ubicación: `assets/documents/interpretacion/`

- `Como-Leer-Guia-Clinica-SUFED.pdf` - Guía para interpretar guías clínicas
- `Resumen-Guias-JOSPT-SUFED.pdf` - Resumen de guías JOSPT

## Conceptos Esenciales

Ubicación: `assets/documents/conceptos/`

- `Definicion-IASP-2020-SUFED.pdf` - Nueva definición de dolor IASP 2020
- `Enfoque-Biopsicosocial-SUFED.pdf` - Explicación del modelo biopsicosocial
- `Mitos-Dolor-SUFED.pdf` - Mitos comunes sobre el dolor

## Recursos

Ubicación: `assets/documents/recursos/`

- Escalas validadas (Tampa, PCS, PEG, ODI, BPI)
- Material de referencia rápida
- Infografías

## Cómo Agregar Nuevos Documentos

1. Coloca el archivo PDF en la carpeta correspondiente
2. Actualiza el mapeo en `js/main.js` en la clase `PDFDownloadManager`:
   ```javascript
   this.pdfPaths = {
     'nuevo-documento': 'assets/documents/categoria/Nombre-Documento-SUFED.pdf'
   };
   ```
3. Agrega el nombre del archivo en el método `getFileName()`:
   ```javascript
   const fileNames = {
     'nuevo-documento': 'Nombre-Documento-SUFED.pdf'
   };
   ```
4. Agrega el botón de descarga en el HTML con el atributo `data-download-pdf`:
   ```html
   <button data-download-pdf="nuevo-documento" 
           aria-label="Descargar documento">
     Descargar PDF
   </button>
   ```

## Convenciones de Nomenclatura

- Usar formato: `Titulo-Del-Documento-SUFED.pdf`
- Incluir siempre el sufijo `-SUFED` para identificar la fuente
- Usar guiones medios (`-`) en lugar de espacios
- Capitalizar la primera letra de cada palabra importante

## Tracking de Descargas

El sistema incluye tracking opcional de descargas que se almacena en `localStorage`:
- Contador de descargas por documento
- Fecha de última descarga
- Los datos se pueden exportar para análisis

## Notas Técnicas

- Tamaño máximo recomendado: 10MB por archivo
- Formato: PDF (preferiblemente PDF/A para archivado)
- Compresión: Optimizar PDFs antes de subir
- Accesibilidad: Asegurar que los PDFs sean accesibles (texto seleccionable, estructura)
