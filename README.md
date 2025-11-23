# SUFED - Sociedad Uruguaya de Fisioterapia Especializada en Dolor

Sitio web institucional de SUFED, un Grupo de Interés Especial (SIG) dentro de AFU dedicado a promover una fisioterapia basada en evidencia y enfocada en el abordaje contemporáneo del dolor.

## Estructura del Proyecto

```
sufed-landing-page/
├── index.html              # Página principal
├── css/
│   ├── reset.css          # CSS Reset moderno
│   ├── variables.css      # Variables del sistema de diseño
│   ├── base.css           # Estilos base y tipografía
│   └── main.css           # Estilos de componentes
├── js/
│   └── main.js            # JavaScript principal
├── assets/
│   ├── images/            # Imágenes (logos, fotos, hero)
│   ├── documents/         # PDFs descargables (guías, recursos)
│   └── icons/             # Iconos SVG
└── README.md              # Este archivo
```

## Sistema de Diseño

### Paleta de Colores

- **Azul AFU (Primary)**: `#2196F3` - Color principal institucional
- **Petróleo/Teal (Accent)**: `#009688` - Color de acento
- **Grises (Neutral)**: Escala de grises para texto y fondos
- **Blanco**: `#FFFFFF` - Fondo principal

### Tipografía

- **Primary**: Inter - Para cuerpo de texto
- **Secondary**: Montserrat - Para títulos y encabezados

### Breakpoints Responsive (Mobile-First)

- **Mobile**: 320px - 767px (base)
- **Tablet**: 768px+
- **Desktop**: 1024px+
- **Large Desktop**: 1440px+

## Tecnologías

- HTML5 semántico
- CSS3 con variables CSS (Custom Properties)
- JavaScript vanilla
- Mobile-first responsive design

## Desarrollo

Para visualizar el sitio localmente, simplemente abre `index.html` en tu navegador o usa un servidor local:

```bash
# Con Python 3
python -m http.server 8000

# Con Node.js (npx)
npx serve

# Con PHP
php -S localhost:8000
```

Luego accede a `http://localhost:8000`

## Requisitos Cumplidos

✅ Estructura de carpetas para HTML, CSS, JS, assets
✅ Variables CSS con paleta de colores SUFED (azul AFU, gris, blanco, acentos petróleo)
✅ Tipografía configurada (Inter/Montserrat) con tamaños y pesos
✅ Sistema de espaciado y breakpoints responsive
✅ Reset CSS y estilos base implementados

## Próximos Pasos

- Implementar componente de navegación (Navbar)
- Crear sección Hero
- Desarrollar páginas de contenido
- Integrar CMS para gestión de contenidos

## Contacto

SUFED - Sociedad Uruguaya de Fisioterapia Especializada en Dolor
Parte de la Asociación de Fisioterapeutas del Uruguay (AFU)
