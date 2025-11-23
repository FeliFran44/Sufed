# Funcionalidad de Descarga de PDFs - SUFED

## Descripción General

Este documento describe la implementación de la funcionalidad de descarga de PDFs en el sitio web de SUFED. El sistema permite a los usuarios descargar guías, material educativo y recursos de manera eficiente y con seguimiento opcional.

## Características Implementadas

### 1. Componente de Botón de Descarga

- **Botones reutilizables** con estilos consistentes
- **Iconos de tipo de archivo** (PDF) integrados automáticamente
- **Estados visuales**: normal, hover, focus, active, loading
- **Accesibilidad completa** con ARIA labels y navegación por teclado

### 2. Tracking de Descargas (Opcional)

- Contador de descargas por documento
- Fecha de última descarga
- Almacenamiento en `localStorage`
- Datos exportables para análisis

### 3. Iconos de Tipo de Archivo

- Icono de descarga SVG integrado
- Animación al hover
- Indicador de carga durante la descarga

### 4. Gestión de Errores

- Verificación de existencia de archivos
- Mensajes de error amigables
- Fallback para archivos no disponibles
- Notificaciones toast con diferentes tipos (success, error, info, warning)

## Estructura de Archivos

```
assets/documents/
├── guias/              # Guías de práctica clínica
│   ├── NICE-Guidelines-SUFED.pdf
│   ├── JOSPT-Guidelines-SUFED.pdf
│   ├── IASP-Guidelines-SUFED.pdf
│   └── Lancet-Series-SUFED.pdf
├── interpretacion/     # Material de interpretación
│   ├── Como-Leer-Guia-Clinica-SUFED.pdf
│   └── Resumen-Guias-JOSPT-SUFED.pdf
├── conceptos/          # Conceptos esenciales
│   ├── Definicion-IASP-2020-SUFED.pdf
│   ├── Enfoque-Biopsicosocial-SUFED.pdf
│   └── Mitos-Dolor-SUFED.pdf
└── recursos/           # Recursos adicionales
    └── (escalas, cuestionarios, etc.)
```

## Uso

### En HTML

Para agregar un botón de descarga, usa el atributo `data-download-pdf`:

```html
<!-- Botón básico -->
<button data-download-pdf="nice" 
        aria-label="Descargar guías NICE">
  Descargar PDF
</button>

<!-- Botón con clase específica -->
<button class="guideline-card__link guideline-card__link--download"
        data-download-pdf="jospt" 
        aria-label="Descargar guías JOSPT">
  <svg>...</svg>
  Descargar interpretación SUFED
</button>
```

### En JavaScript

El sistema se inicializa automáticamente:

```javascript
// Inicialización automática en DOMContentLoaded
new PDFDownloadManager();
```

Para agregar nuevos documentos, actualiza el mapeo en `js/main.js`:

```javascript
this.pdfPaths = {
  'nuevo-doc': 'assets/documents/categoria/Nuevo-Documento-SUFED.pdf'
};

// Y el nombre del archivo
const fileNames = {
  'nuevo-doc': 'Nuevo-Documento-SUFED.pdf'
};
```

## Estilos CSS

Los estilos están definidos en `css/main.css`:

```css
/* Botón de descarga base */
[data-download-pdf] {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-5);
  background-color: var(--color-primary-600);
  color: white;
  /* ... más estilos ... */
}

/* Estado de carga */
[data-download-pdf].is-loading {
  opacity: 0.6;
  cursor: wait;
  pointer-events: none;
}
```

## Características de Accesibilidad

1. **ARIA Labels**: Todos los botones tienen labels descriptivos
2. **Navegación por teclado**: Completamente accesible con Tab y Enter
3. **Estados visuales claros**: Focus visible para usuarios de teclado
4. **Mensajes de estado**: Notificaciones con `role="status"` y `aria-live="polite"`
5. **Reduced motion**: Respeta la preferencia del usuario

## Tracking de Descargas

El sistema incluye tracking opcional que almacena:

```javascript
{
  "nice": {
    "count": 5,
    "lastDownload": "2025-11-22T18:30:00.000Z"
  },
  "jospt": {
    "count": 3,
    "lastDownload": "2025-11-22T17:15:00.000Z"
  }
}
```

Para acceder a las estadísticas:

```javascript
// En la consola del navegador
const stats = localStorage.getItem('sufed_download_stats');
console.log(JSON.parse(stats));
```

## Mensajes de Notificación

El sistema muestra notificaciones toast en la esquina inferior derecha:

- **Success** (verde): Descarga iniciada correctamente
- **Error** (rojo): Error al descargar
- **Info** (azul): Documento próximamente disponible
- **Warning** (naranja): Advertencias generales

## Flujo de Descarga

1. Usuario hace clic en botón de descarga
2. Sistema muestra estado de carga
3. Verifica si el archivo existe (HEAD request)
4. Si existe:
   - Inicia descarga
   - Registra en tracking
   - Muestra mensaje de éxito
5. Si no existe:
   - Muestra mensaje informativo
   - No registra en tracking
6. Quita estado de carga

## Personalización

### Cambiar colores de botones

```css
[data-download-pdf] {
  background-color: tu-color;
}

[data-download-pdf]:hover {
  background-color: tu-color-hover;
}
```

### Cambiar posición de notificaciones

```css
.download-message {
  bottom: 20px;  /* Cambiar según necesidad */
  right: 20px;   /* Cambiar según necesidad */
}
```

### Deshabilitar tracking

En `js/main.js`, comenta la línea:

```javascript
// this.trackDownload(resourceId);
```

## Requisitos del Navegador

- Navegadores modernos con soporte para:
  - ES6+ (async/await, arrow functions)
  - Fetch API
  - localStorage
  - CSS Grid y Flexbox
  - CSS Custom Properties

## Optimizaciones

1. **Lazy loading**: Los iconos se agregan dinámicamente
2. **Verificación de archivos**: HEAD request antes de descargar
3. **Caché de estadísticas**: localStorage para persistencia
4. **Animaciones optimizadas**: CSS transforms y opacity
5. **Reduced motion**: Respeta preferencias del usuario

## Mantenimiento

### Agregar nuevo documento

1. Coloca el PDF en la carpeta correspondiente
2. Actualiza `pdfPaths` en `PDFDownloadManager`
3. Actualiza `fileNames` en `getFileName()`
4. Agrega el botón en HTML con `data-download-pdf`

### Actualizar documento existente

1. Reemplaza el archivo PDF
2. Mantén el mismo nombre de archivo
3. No requiere cambios en código

### Eliminar documento

1. Elimina el archivo PDF
2. Elimina la entrada de `pdfPaths`
3. Elimina la entrada de `fileNames`
4. Elimina o deshabilita el botón en HTML

## Troubleshooting

### El botón no funciona

- Verifica que tenga el atributo `data-download-pdf`
- Verifica que el ID esté en `pdfPaths`
- Revisa la consola del navegador para errores

### El archivo no se descarga

- Verifica que el archivo exista en la ruta especificada
- Verifica permisos del servidor
- Revisa la consola de red del navegador

### Las notificaciones no aparecen

- Verifica que no haya conflictos de z-index
- Verifica que los estilos CSS estén cargados
- Revisa la consola para errores de JavaScript

## Mejoras Futuras

- [ ] Integración con backend para tracking en servidor
- [ ] Preview de PDFs antes de descargar
- [ ] Búsqueda de documentos
- [ ] Filtrado por categoría
- [ ] Compartir en redes sociales
- [ ] Generación de reportes de descargas
- [ ] Compresión de PDFs on-the-fly
- [ ] Versionado de documentos

## Referencias

- Requisito 3.5 del documento de requisitos
- Tarea 5.5 del plan de implementación
- Diseño de componentes en `design.md`
