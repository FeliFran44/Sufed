# Documento de Diseño - Landing Page SUFED

## Overview

Este documento describe el diseño técnico y arquitectónico para el sitio web de SUFED (Sociedad Uruguaya de Fisioterapia Especializada en Dolor). El sitio será una landing page institucional moderna, responsive y fácil de mantener, construida con tecnologías web estándar y un CMS para gestión de contenidos.

### Objetivos del Diseño

- Crear una experiencia de usuario fluida y profesional
- Implementar un diseño mobile-first responsive
- Facilitar la gestión de contenidos sin conocimientos técnicos avanzos
- Optimizar el rendimiento y la accesibilidad
- Mantener coherencia visual con la identidad de AFU
- Permitir escalabilidad futura

### Stack Tecnológico Propuesto

**Frontend:**
- HTML5 semántico
- CSS3 con metodología BEM o CSS Modules
- JavaScript vanilla o framework ligero (Alpine.js/Vue.js)
- Tailwind CSS para estilos utilitarios

**CMS:**
- WordPress con tema custom o
- Webflow para diseño visual + CMS integrado

**Hosting y Deployment:**
- Hosting compartido o VPS (para WordPress)
- Netlify/Vercel (para solución estática con headless CMS)


## Architecture

### Arquitectura General

El sitio seguirá una arquitectura de aplicación web estática con CMS para gestión de contenidos dinámicos.

```
┌─────────────────────────────────────────────────────────┐
│                    Usuario Final                         │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│              CDN / Hosting Layer                         │
│         (Caché, SSL, Optimización)                       │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│              Frontend Application                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Landing    │  │   Secciones  │  │  Formulario  │  │
│  │     Page     │  │  Contenido   │  │   Contacto   │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                   CMS Backend                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Content    │  │    Media     │  │    Users     │  │
│  │  Management  │  │   Library    │  │  Management  │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                   Database                               │
│         (Contenidos, Media, Configuración)               │
└─────────────────────────────────────────────────────────┘
```

### Patrones de Diseño

**1. Component-Based Architecture**
- Cada sección del sitio será un componente reutilizable
- Separación clara entre presentación y lógica
- Componentes modulares y mantenibles

**2. Mobile-First Responsive Design**
- Diseño base para móviles
- Progressive enhancement para tablets y desktop
- Breakpoints: 320px (mobile), 768px (tablet), 1024px (desktop), 1440px (large desktop)

**3. Content-First Approach**
- Estructura semántica HTML5
- SEO optimizado
- Accesibilidad WCAG 2.1 AA


## Components and Interfaces

### 1. Navigation Component (Navbar)

**Responsabilidades:**
- Mostrar menú principal con todas las secciones
- Implementar menú hamburguesa en móvil
- Resaltar sección activa
- Mantener accesibilidad con navegación por teclado

**Estructura:**
```html
<nav class="navbar">
  <div class="navbar__container">
    <a href="/" class="navbar__logo">
      <img src="logo-sufed.svg" alt="SUFED Logo">
    </a>
    <button class="navbar__toggle" aria-label="Toggle menu">
      <span class="navbar__hamburger"></span>
    </button>
    <ul class="navbar__menu">
      <li><a href="#inicio">Inicio</a></li>
      <li><a href="#sobre-nosotros">Sobre Nosotros</a></li>
      <li class="navbar__dropdown">
        <a href="#educacion">Educación</a>
        <ul class="navbar__submenu">
          <li><a href="#guias">Guías</a></li>
          <li><a href="#interpretacion">Interpretación</a></li>
          <li><a href="#articulos">Artículos</a></li>
          <li><a href="#conceptos">Conceptos clave</a></li>
        </ul>
      </li>
      <li><a href="#recursos">Recursos</a></li>
      <li><a href="#competencias">Competencias</a></li>
      <li><a href="#actividades">Actividades</a></li>
      <li><a href="#contacto">Contacto</a></li>
    </ul>
  </div>
</nav>
```

### 2. Hero Section Component

**Responsabilidades:**
- Mostrar título y subtítulo principal
- Presentar botones de acción rápida
- Incluir imagen hero institucional

**Props/Configuración:**
- `title`: String - Título principal
- `subtitle`: String - Subtítulo descriptivo
- `heroImage`: String - URL de imagen
- `ctaButtons`: Array - Lista de botones con texto y enlace

### 3. About Section Component

**Responsabilidades:**
- Mostrar información institucional
- Presentar misión, visión y valores
- Mostrar equipo con fotos y cargos

**Subsecciones:**
- Propósito
- Misión y Visión
- Valores (lista con iconos)
- Autoridades (cards con foto, nombre y cargo)

### 4. Education Section Component

**Responsabilidades:**
- Organizar contenido educativo en categorías
- Permitir descarga de PDFs
- Incrustar videos
- Mostrar iconos por categoría

**Estructura de datos:**
```javascript
{
  categories: [
    {
      id: 'guias',
      title: 'Guías de Práctica Clínica',
      icon: 'icon-guidelines',
      items: [
        { title: 'NICE Guidelines', type: 'pdf', url: '...' },
        { title: 'JOSPT', type: 'link', url: '...' }
      ]
    },
    {
      id: 'interpretacion',
      title: 'Interpretación de Guías',
      icon: 'icon-interpretation',
      content: 'Texto descriptivo...',
      items: [...]
    }
  ]
}
```

### 5. Resources Section Component

**Responsabilidades:**
- Listar recursos descargables organizados por categoría
- Permitir preview de PDFs
- Facilitar descarga de archivos

**Categorías:**
- Escalas validadas (Tampa, PCS, PEG, ODI, BPI)
- Material de referencia rápida
- Infografías
- Documentos descargables

### 6. Activities/News Component

**Responsabilidades:**
- Mostrar últimas novedades en formato cards
- Ordenar cronológicamente
- Permitir filtrado por tipo de actividad

**Card Structure:**
```javascript
{
  id: 'unique-id',
  title: 'Título de la actividad',
  date: '2025-11-22',
  type: 'webinar', // webinar, curso, charla, reunion
  description: 'Descripción breve...',
  image: 'url-imagen',
  link: 'url-detalle'
}
```

### 7. Contact Form Component

**Responsabilidades:**
- Capturar información del usuario
- Validar campos
- Enviar formulario
- Mostrar mensajes de éxito/error

**Campos:**
- Nombre (text, required)
- Email (email, required)
- Tema (select, required)
- Mensaje (textarea, required)

**Validaciones:**
- Email válido
- Campos no vacíos
- Longitud mínima de mensaje (20 caracteres)
- Protección anti-spam (honeypot o reCAPTCHA)

### 8. Footer Component

**Responsabilidades:**
- Mostrar información de contacto
- Enlaces a redes sociales (si aplica)
- Logo de AFU y SUFED
- Copyright y créditos


## Data Models

### Content Page Model

Modelo base para páginas de contenido estático:

```javascript
{
  id: String,              // Identificador único
  slug: String,            // URL amigable
  title: String,           // Título de la página
  subtitle: String,        // Subtítulo opcional
  content: RichText,       // Contenido HTML/Markdown
  seoTitle: String,        // Título SEO
  seoDescription: String,  // Meta descripción
  featuredImage: Image,    // Imagen destacada
  publishedAt: DateTime,   // Fecha de publicación
  updatedAt: DateTime,     // Última actualización
  status: Enum             // draft, published, archived
}
```

### Resource Model

Modelo para recursos descargables:

```javascript
{
  id: String,
  title: String,
  description: String,
  category: Enum,          // escala, cuestionario, infografia, documento
  subcategory: String,     // Tampa, PCS, etc.
  file: File,              // PDF, imagen, etc.
  fileSize: Number,        // Tamaño en bytes
  downloadCount: Number,   // Contador de descargas
  tags: Array<String>,     // Etiquetas para búsqueda
  publishedAt: DateTime,
  updatedAt: DateTime
}
```

### Activity/News Model

Modelo para actividades y novedades:

```javascript
{
  id: String,
  title: String,
  slug: String,
  excerpt: String,         // Resumen breve
  content: RichText,       // Contenido completo
  type: Enum,              // webinar, curso, charla, reunion, publicacion
  date: DateTime,          // Fecha del evento
  location: String,        // Ubicación (opcional)
  registrationLink: String, // Link de inscripción (opcional)
  featuredImage: Image,
  gallery: Array<Image>,   // Galería de imágenes
  publishedAt: DateTime,
  status: Enum             // upcoming, ongoing, completed, cancelled
}
```

### Team Member Model

Modelo para miembros del equipo:

```javascript
{
  id: String,
  name: String,
  role: String,            // Presidenta, Secretario, etc.
  bio: Text,               // Biografía
  photo: Image,
  email: String,           // Opcional
  order: Number            // Orden de visualización
}
```

### Guide Model

Modelo para guías de práctica clínica:

```javascript
{
  id: String,
  title: String,
  organization: String,    // NICE, JOSPT, IASP, etc.
  year: Number,
  description: Text,
  externalLink: String,    // Link a guía original
  interpretationFile: File, // PDF de interpretación SUFED
  category: String,
  tags: Array<String>,
  publishedAt: DateTime
}
```

### Contact Submission Model

Modelo para envíos del formulario de contacto:

```javascript
{
  id: String,
  name: String,
  email: String,
  subject: String,
  message: Text,
  submittedAt: DateTime,
  status: Enum,            // new, read, replied, archived
  ipAddress: String,       // Para seguridad
  userAgent: String        // Para análisis
}
```


## Design System

### Color Palette

```css
:root {
  /* Primary Colors - AFU Blue */
  --color-primary-50: #E3F2FD;
  --color-primary-100: #BBDEFB;
  --color-primary-200: #90CAF9;
  --color-primary-300: #64B5F6;
  --color-primary-400: #42A5F5;
  --color-primary-500: #2196F3;  /* Main AFU Blue */
  --color-primary-600: #1E88E5;
  --color-primary-700: #1976D2;
  --color-primary-800: #1565C0;
  --color-primary-900: #0D47A1;

  /* Accent Colors - Petrol/Teal */
  --color-accent-50: #E0F2F1;
  --color-accent-100: #B2DFDB;
  --color-accent-200: #80CBC4;
  --color-accent-300: #4DB6AC;
  --color-accent-400: #26A69A;
  --color-accent-500: #009688;  /* Main Accent */
  --color-accent-600: #00897B;
  --color-accent-700: #00796B;

  /* Neutral Colors - Grays */
  --color-neutral-50: #FAFAFA;
  --color-neutral-100: #F5F5F5;
  --color-neutral-200: #EEEEEE;
  --color-neutral-300: #E0E0E0;
  --color-neutral-400: #BDBDBD;
  --color-neutral-500: #9E9E9E;
  --color-neutral-600: #757575;
  --color-neutral-700: #616161;
  --color-neutral-800: #424242;
  --color-neutral-900: #212121;

  /* Semantic Colors */
  --color-success: #4CAF50;
  --color-warning: #FF9800;
  --color-error: #F44336;
  --color-info: #2196F3;

  /* Background & Text */
  --color-background: #FFFFFF;
  --color-surface: #F5F5F5;
  --color-text-primary: #212121;
  --color-text-secondary: #757575;
  --color-text-disabled: #BDBDBD;
}
```

### Typography

```css
:root {
  /* Font Families */
  --font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-secondary: 'Montserrat', sans-serif;
  --font-mono: 'Fira Code', 'Courier New', monospace;

  /* Font Sizes */
  --text-xs: 0.75rem;      /* 12px */
  --text-sm: 0.875rem;     /* 14px */
  --text-base: 1rem;       /* 16px */
  --text-lg: 1.125rem;     /* 18px */
  --text-xl: 1.25rem;      /* 20px */
  --text-2xl: 1.5rem;      /* 24px */
  --text-3xl: 1.875rem;    /* 30px */
  --text-4xl: 2.25rem;     /* 36px */
  --text-5xl: 3rem;        /* 48px */
  --text-6xl: 3.75rem;     /* 60px */

  /* Font Weights */
  --font-light: 300;
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;

  /* Line Heights */
  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.75;
  --leading-loose: 2;
}
```

### Spacing System

```css
:root {
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
  --space-24: 6rem;     /* 96px */
}
```

### Breakpoints

```css
/* Mobile First Approach */
/* Base: 320px - 767px (Mobile) */

@media (min-width: 768px) {
  /* Tablet */
}

@media (min-width: 1024px) {
  /* Desktop */
}

@media (min-width: 1440px) {
  /* Large Desktop */
}
```

### Component Styles

**Buttons:**
```css
.btn {
  padding: var(--space-3) var(--space-6);
  border-radius: 0.375rem;
  font-weight: var(--font-medium);
  transition: all 0.2s ease;
}

.btn-primary {
  background: var(--color-primary-500);
  color: white;
}

.btn-secondary {
  background: var(--color-accent-500);
  color: white;
}

.btn-outline {
  border: 2px solid var(--color-primary-500);
  color: var(--color-primary-500);
  background: transparent;
}
```

**Cards:**
```css
.card {
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  padding: var(--space-6);
  transition: box-shadow 0.2s ease;
}

.card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}
```


## Error Handling

### Frontend Error Handling

**1. Form Validation Errors**

Estrategia:
- Validación en tiempo real (on blur)
- Mensajes de error claros y específicos
- Indicadores visuales (color rojo, iconos)
- Prevención de envío si hay errores

Ejemplo de mensajes:
```javascript
const errorMessages = {
  required: 'Este campo es obligatorio',
  email: 'Por favor ingresa un email válido',
  minLength: 'El mensaje debe tener al menos 20 caracteres',
  maxLength: 'El mensaje no puede exceder 500 caracteres'
}
```

**2. Network Errors**

Estrategia:
- Timeout de 30 segundos para requests
- Retry automático (máximo 3 intentos)
- Mensajes amigables al usuario
- Fallback a contenido estático cuando sea posible

```javascript
try {
  const response = await fetch('/api/contact', {
    method: 'POST',
    body: formData,
    signal: AbortSignal.timeout(30000)
  });
  
  if (!response.ok) {
    throw new Error('Error al enviar el formulario');
  }
  
  showSuccessMessage();
} catch (error) {
  if (error.name === 'TimeoutError') {
    showError('La solicitud tardó demasiado. Por favor intenta nuevamente.');
  } else {
    showError('Hubo un problema al enviar tu mensaje. Por favor intenta más tarde.');
  }
}
```

**3. Resource Loading Errors**

Estrategia:
- Lazy loading con placeholders
- Imágenes con fallback
- Manejo de PDFs no disponibles

```javascript
<img 
  src="image.jpg" 
  alt="Descripción"
  onerror="this.src='placeholder.jpg'"
  loading="lazy"
/>
```

### Backend Error Handling

**1. Form Submission Errors**

Códigos de respuesta:
- 200: Éxito
- 400: Datos inválidos (con detalles de validación)
- 429: Demasiadas solicitudes (rate limiting)
- 500: Error del servidor

**2. File Upload Errors**

Validaciones:
- Tamaño máximo: 10MB
- Tipos permitidos: PDF, JPG, PNG
- Sanitización de nombres de archivo
- Escaneo de virus (si es posible)

**3. Database Errors**

Estrategia:
- Logging de errores
- Mensajes genéricos al usuario
- Notificación a administradores
- Backup automático

### User-Facing Error Messages

Principios:
- Lenguaje claro y no técnico
- Sugerencias de solución
- Tono amigable y profesional
- Evitar culpar al usuario

Ejemplos:
```
✓ "Tu mensaje ha sido enviado correctamente. Te responderemos pronto."
✗ "Hubo un problema al enviar el formulario. Por favor verifica los campos e intenta nuevamente."
ℹ "Este recurso está temporalmente no disponible. Por favor intenta más tarde."
```


## Testing Strategy

### Unit Testing

**Componentes a testear:**
- Funciones de validación de formularios
- Utilidades de formateo de fechas
- Helpers de manipulación de datos
- Funciones de sanitización

**Framework:** Jest o Vitest

Ejemplo:
```javascript
describe('Form Validation', () => {
  test('validates email format correctly', () => {
    expect(validateEmail('test@example.com')).toBe(true);
    expect(validateEmail('invalid-email')).toBe(false);
  });

  test('validates required fields', () => {
    expect(validateRequired('')).toBe(false);
    expect(validateRequired('content')).toBe(true);
  });
});
```

### Integration Testing

**Escenarios a testear:**
- Envío completo del formulario de contacto
- Navegación entre secciones
- Descarga de recursos
- Reproducción de videos incrustados

**Framework:** Cypress o Playwright

Ejemplo:
```javascript
describe('Contact Form', () => {
  it('submits form successfully with valid data', () => {
    cy.visit('/contacto');
    cy.get('input[name="name"]').type('Juan Pérez');
    cy.get('input[name="email"]').type('juan@example.com');
    cy.get('select[name="subject"]').select('Consulta general');
    cy.get('textarea[name="message"]').type('Este es un mensaje de prueba');
    cy.get('button[type="submit"]').click();
    cy.contains('Tu mensaje ha sido enviado correctamente').should('be.visible');
  });
});
```

### Accessibility Testing

**Herramientas:**
- axe DevTools
- WAVE
- Lighthouse Accessibility Audit

**Checklist:**
- [ ] Todos los elementos interactivos son accesibles por teclado
- [ ] Contraste de colores cumple WCAG AA (4.5:1 para texto normal)
- [ ] Todas las imágenes tienen alt text descriptivo
- [ ] Formularios tienen labels asociados correctamente
- [ ] Navegación por teclado es lógica y predecible
- [ ] Screen readers pueden navegar el contenido
- [ ] No hay elementos que parpadeen más de 3 veces por segundo

### Performance Testing

**Métricas objetivo:**
- First Contentful Paint (FCP): < 1.8s
- Largest Contentful Paint (LCP): < 2.5s
- Time to Interactive (TTI): < 3.8s
- Cumulative Layout Shift (CLS): < 0.1
- First Input Delay (FID): < 100ms

**Herramientas:**
- Google Lighthouse
- WebPageTest
- Chrome DevTools Performance

**Optimizaciones:**
- Lazy loading de imágenes
- Code splitting
- Minificación de CSS/JS
- Compresión de imágenes (WebP con fallback)
- CDN para assets estáticos
- Caché de recursos

### Cross-Browser Testing

**Navegadores objetivo:**
- Chrome (últimas 2 versiones)
- Firefox (últimas 2 versiones)
- Safari (últimas 2 versiones)
- Edge (últimas 2 versiones)
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android 10+)

**Herramientas:**
- BrowserStack
- Manual testing en dispositivos reales

### Responsive Testing

**Dispositivos objetivo:**
- iPhone SE (375px)
- iPhone 12/13/14 (390px)
- Samsung Galaxy S21 (360px)
- iPad (768px)
- iPad Pro (1024px)
- Desktop 1920px

**Puntos de verificación:**
- Menú hamburguesa funciona correctamente en móvil
- Imágenes se adaptan sin distorsión
- Texto es legible en todos los tamaños
- Botones son fáciles de tocar (mínimo 44x44px)
- No hay scroll horizontal no deseado

### User Acceptance Testing (UAT)

**Escenarios de prueba:**
1. Usuario busca información sobre SUFED
2. Profesional descarga una escala validada
3. Estudiante accede a guías de práctica clínica
4. Visitante envía consulta por formulario
5. Administrador actualiza contenido en CMS

**Criterios de aceptación:**
- Todas las funcionalidades principales funcionan sin errores
- El contenido es claro y comprensible
- La navegación es intuitiva
- El diseño es profesional y coherente
- El sitio carga rápidamente


## SEO Strategy

### On-Page SEO

**Meta Tags:**
```html
<!-- Primary Meta Tags -->
<title>SUFED - Sociedad Uruguaya de Fisioterapia Especializada en Dolor</title>
<meta name="title" content="SUFED - Sociedad Uruguaya de Fisioterapia Especializada en Dolor">
<meta name="description" content="Educación, evidencia y práctica clínica para avanzar en el manejo del dolor en Uruguay. Guías, recursos y formación para profesionales de la salud.">
<meta name="keywords" content="fisioterapia, dolor, Uruguay, SUFED, AFU, guías clínicas, educación">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://sufed.org.uy/">
<meta property="og:title" content="SUFED - Sociedad Uruguaya de Fisioterapia Especializada en Dolor">
<meta property="og:description" content="Educación, evidencia y práctica clínica para avanzar en el manejo del dolor en Uruguay.">
<meta property="og:image" content="https://sufed.org.uy/og-image.jpg">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="https://sufed.org.uy/">
<meta property="twitter:title" content="SUFED - Sociedad Uruguaya de Fisioterapia Especializada en Dolor">
<meta property="twitter:description" content="Educación, evidencia y práctica clínica para avanzar en el manejo del dolor en Uruguay.">
<meta property="twitter:image" content="https://sufed.org.uy/twitter-image.jpg">
```

**Structured Data (Schema.org):**
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "SUFED - Sociedad Uruguaya de Fisioterapia Especializada en Dolor",
  "url": "https://sufed.org.uy",
  "logo": "https://sufed.org.uy/logo.png",
  "description": "Grupo de Interés Especial dedicado a promover una fisioterapia basada en evidencia y enfocada en el abordaje contemporáneo del dolor.",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "UY"
  },
  "parentOrganization": {
    "@type": "Organization",
    "name": "AFU - Asociación de Fisioterapeutas del Uruguay"
  }
}
```

**URL Structure:**
- `/` - Inicio
- `/sobre-nosotros` - Sobre Nosotros
- `/educacion` - Educación
- `/educacion/guias` - Guías
- `/educacion/interpretacion` - Interpretación
- `/recursos` - Recursos
- `/competencias` - Competencias
- `/actividades` - Actividades
- `/contacto` - Contacto

### Content Strategy

**Palabras clave objetivo:**
- Fisioterapia dolor Uruguay
- Manejo del dolor
- Guías clínicas dolor
- SUFED
- Fisioterapia basada en evidencia
- Escalas de dolor
- Educación dolor

**Content Guidelines:**
- Títulos descriptivos y únicos para cada página
- Headings jerárquicos (H1 > H2 > H3)
- Contenido original y de calidad
- Longitud mínima de 300 palabras por página
- Actualización regular de contenido

### Technical SEO

**Checklist:**
- [ ] Sitemap XML generado y enviado a Google Search Console
- [ ] Robots.txt configurado correctamente
- [ ] SSL/HTTPS implementado
- [ ] URLs amigables (sin parámetros innecesarios)
- [ ] Canonical tags para evitar contenido duplicado
- [ ] 404 page personalizada
- [ ] Redirects 301 para URLs antiguas (si aplica)
- [ ] Velocidad de carga optimizada
- [ ] Mobile-friendly (responsive)
- [ ] Imágenes optimizadas con alt text

### Local SEO (Uruguay)

**Optimizaciones:**
- Mención de ubicación en contenido
- Schema markup con dirección en Uruguay
- Registro en Google My Business (si aplica)
- Enlaces desde AFU y otras organizaciones uruguayas


## CMS Implementation

### WordPress Option

**Tema recomendado:**
- Tema custom basado en starter theme (Underscores o Sage)
- O tema premium: Astra, GeneratePress, Kadence

**Plugins esenciales:**
- **Yoast SEO** - Optimización SEO
- **Advanced Custom Fields (ACF)** - Campos personalizados
- **Contact Form 7** o **WPForms** - Formularios
- **WP Rocket** o **W3 Total Cache** - Caché y performance
- **Smush** - Optimización de imágenes
- **Wordfence** - Seguridad
- **UpdraftPlus** - Backups

**Custom Post Types:**
```php
// Recursos
register_post_type('recurso', [
  'labels' => [
    'name' => 'Recursos',
    'singular_name' => 'Recurso'
  ],
  'public' => true,
  'has_archive' => true,
  'supports' => ['title', 'editor', 'thumbnail'],
  'taxonomies' => ['categoria-recurso']
]);

// Actividades
register_post_type('actividad', [
  'labels' => [
    'name' => 'Actividades',
    'singular_name' => 'Actividad'
  ],
  'public' => true,
  'has_archive' => true,
  'supports' => ['title', 'editor', 'thumbnail', 'excerpt']
]);

// Guías
register_post_type('guia', [
  'labels' => [
    'name' => 'Guías',
    'singular_name' => 'Guía'
  ],
  'public' => true,
  'has_archive' => true,
  'supports' => ['title', 'editor', 'thumbnail']
]);
```

**Custom Fields (ACF):**
- Recursos: archivo PDF, categoría, tags
- Actividades: fecha, tipo, link de registro
- Guías: organización, año, link externo
- Equipo: cargo, foto, email

### Webflow Option

**Ventajas:**
- Diseño visual sin código
- CMS integrado
- Hosting incluido
- Actualizaciones automáticas

**Estructura de Collections:**

1. **Resources Collection**
   - Title (Text)
   - Description (Rich Text)
   - Category (Option)
   - File (File Upload)
   - Published Date (Date)

2. **Activities Collection**
   - Title (Text)
   - Excerpt (Plain Text)
   - Content (Rich Text)
   - Type (Option)
   - Event Date (Date)
   - Featured Image (Image)

3. **Guides Collection**
   - Title (Text)
   - Organization (Text)
   - Year (Number)
   - External Link (Link)
   - Interpretation File (File Upload)

4. **Team Members Collection**
   - Name (Text)
   - Role (Text)
   - Bio (Rich Text)
   - Photo (Image)
   - Order (Number)

### Content Management Workflow

**Roles y permisos:**
- **Administrador:** Acceso completo
- **Editor:** Puede publicar y editar todo el contenido
- **Autor:** Puede crear y publicar sus propios posts
- **Colaborador:** Puede crear contenido pero no publicar

**Proceso de publicación:**
1. Crear borrador
2. Revisión de contenido
3. Optimización SEO
4. Previsualización
5. Publicación
6. Verificación en producción

**Mantenimiento:**
- Backups diarios automáticos
- Actualizaciones mensuales de plugins/tema
- Revisión trimestral de contenido obsoleto
- Monitoreo de performance


## Security Considerations

### Frontend Security

**1. Form Security**
- Validación client-side y server-side
- Sanitización de inputs
- Protección contra XSS (Cross-Site Scripting)
- CSRF tokens en formularios
- Rate limiting en envíos

**2. Content Security Policy (CSP)**
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline' https://www.youtube.com; 
               style-src 'self' 'unsafe-inline'; 
               img-src 'self' data: https:; 
               font-src 'self' data:;">
```

**3. File Upload Security**
- Validación de tipo MIME
- Límite de tamaño (10MB)
- Sanitización de nombres de archivo
- Almacenamiento fuera del webroot
- Escaneo de malware (si es posible)

### Backend Security

**1. WordPress Security Hardening**
```php
// wp-config.php
define('DISALLOW_FILE_EDIT', true);
define('FORCE_SSL_ADMIN', true);
define('WP_AUTO_UPDATE_CORE', true);

// Cambiar prefijo de tablas
$table_prefix = 'sufed_';

// Claves de seguridad únicas
// Generar en: https://api.wordpress.org/secret-key/1.1/salt/
```

**2. Database Security**
- Credenciales fuertes
- Acceso restringido por IP
- Backups encriptados
- Prefijo de tablas personalizado

**3. Server Security**
- SSL/TLS certificate (Let's Encrypt)
- Firewall configurado
- Actualizaciones automáticas de seguridad
- Logs de acceso monitoreados
- Protección DDoS

### Authentication & Authorization

**Admin Access:**
- Contraseñas fuertes (mínimo 12 caracteres)
- Two-factor authentication (2FA)
- Límite de intentos de login
- Sesiones con timeout
- Logs de actividad de usuarios

### Data Protection

**GDPR Compliance (si aplica):**
- Política de privacidad clara
- Consentimiento para cookies
- Derecho al olvido
- Encriptación de datos sensibles
- Retención limitada de datos

**Contact Form Data:**
- No almacenar información sensible innecesaria
- Encriptar datos en tránsito (HTTPS)
- Eliminar submissions antiguas (>1 año)
- No compartir datos con terceros

### Monitoring & Incident Response

**Monitoreo:**
- Uptime monitoring (UptimeRobot, Pingdom)
- Error logging (Sentry, Rollbar)
- Security scanning (Wordfence, Sucuri)
- Performance monitoring (New Relic, Google Analytics)

**Plan de respuesta:**
1. Detección del incidente
2. Aislamiento del problema
3. Análisis y evaluación
4. Remediación
5. Restauración desde backup
6. Post-mortem y mejoras


## Deployment Strategy

### Development Workflow

**Environments:**
1. **Local Development**
   - Cada desarrollador trabaja localmente
   - Docker o XAMPP/MAMP para WordPress
   - Hot reload para desarrollo rápido

2. **Staging**
   - Réplica exacta de producción
   - Testing de nuevas features
   - URL: staging.sufed.org.uy

3. **Production**
   - Sitio público
   - URL: sufed.org.uy o www.sufed.org.uy

**Git Workflow:**
```
main (production)
  ↑
develop (staging)
  ↑
feature/nueva-seccion
feature/fix-formulario
```

### Hosting Options

**Opción 1: Hosting Compartido (Económico)**
- Proveedor: SiteGround, Hostinger, local uruguayo
- Pros: Económico, fácil de gestionar
- Contras: Recursos limitados, menos control

**Opción 2: VPS (Recomendado)**
- Proveedor: DigitalOcean, Linode, AWS Lightsail
- Pros: Más control, mejor performance
- Contras: Requiere más conocimiento técnico

**Opción 3: Managed WordPress**
- Proveedor: WP Engine, Kinsta
- Pros: Optimizado para WordPress, soporte experto
- Contras: Más costoso

**Opción 4: Webflow Hosting**
- Si se usa Webflow como CMS
- Pros: Todo integrado, muy fácil
- Contras: Menos flexibilidad

### Deployment Process

**Manual Deployment (WordPress):**
1. Backup de producción
2. Subir archivos vía FTP/SFTP
3. Actualizar base de datos (si necesario)
4. Verificar funcionamiento
5. Rollback si hay problemas

**Automated Deployment (Recomendado):**
```yaml
# GitHub Actions example
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Deploy to server
        uses: easingthemes/ssh-deploy@main
        env:
          SSH_PRIVATE_KEY: ${{ secrets.SSH_PRIVATE_KEY }}
          REMOTE_HOST: ${{ secrets.REMOTE_HOST }}
          REMOTE_USER: ${{ secrets.REMOTE_USER }}
          TARGET: /var/www/sufed
```

### Pre-Launch Checklist

**Content:**
- [ ] Todo el contenido está cargado y revisado
- [ ] Imágenes optimizadas y con alt text
- [ ] Links verificados (no hay 404s)
- [ ] Información de contacto correcta

**Technical:**
- [ ] SSL certificate instalado y funcionando
- [ ] Sitemap XML generado
- [ ] Google Analytics configurado
- [ ] Google Search Console configurado
- [ ] Robots.txt configurado
- [ ] 404 page personalizada
- [ ] Favicon y app icons

**Performance:**
- [ ] Lighthouse score > 90
- [ ] Imágenes lazy loading
- [ ] CSS/JS minificados
- [ ] Caché configurado
- [ ] CDN configurado (si aplica)

**Security:**
- [ ] Firewall configurado
- [ ] Backups automáticos activos
- [ ] Plugins de seguridad instalados
- [ ] Contraseñas fuertes
- [ ] 2FA activado

**Testing:**
- [ ] Probado en todos los navegadores objetivo
- [ ] Probado en dispositivos móviles
- [ ] Formulario de contacto funciona
- [ ] Descargas de PDFs funcionan
- [ ] Videos se reproducen correctamente

**Legal:**
- [ ] Política de privacidad publicada
- [ ] Términos de uso (si aplica)
- [ ] Cookie consent (si aplica)

### Post-Launch

**Monitoring:**
- Configurar alertas de uptime
- Monitorear errores en logs
- Revisar analytics semanalmente
- Verificar backups funcionan

**Maintenance:**
- Actualizaciones mensuales
- Revisión trimestral de contenido
- Auditoría de seguridad semestral
- Optimización de performance continua


## Accessibility Implementation

### WCAG 2.1 Level AA Compliance

**Perceivable:**

1. **Text Alternatives**
   - Todas las imágenes tienen alt text descriptivo
   - Imágenes decorativas usan alt=""
   - Iconos tienen aria-label

2. **Time-based Media**
   - Videos tienen subtítulos (si aplica)
   - Transcripciones disponibles para contenido de audio

3. **Adaptable**
   - Estructura semántica HTML5
   - Orden lógico de lectura
   - Información no depende solo del color

4. **Distinguishable**
   - Contraste mínimo 4.5:1 para texto normal
   - Contraste mínimo 3:1 para texto grande
   - Texto redimensionable hasta 200%
   - No usar solo color para transmitir información

**Operable:**

1. **Keyboard Accessible**
   - Toda funcionalidad accesible por teclado
   - No hay trampas de teclado
   - Orden de tabulación lógico

2. **Enough Time**
   - No hay límites de tiempo estrictos
   - Usuarios pueden pausar/detener animaciones

3. **Seizures**
   - No hay elementos que parpadeen más de 3 veces/segundo

4. **Navigable**
   - Skip links para saltar al contenido principal
   - Títulos de página descriptivos
   - Orden de foco lógico
   - Breadcrumbs (si aplica)

**Understandable:**

1. **Readable**
   - Idioma de la página declarado (lang="es")
   - Lenguaje claro y simple
   - Definiciones para términos técnicos

2. **Predictable**
   - Navegación consistente
   - Identificación consistente de componentes
   - No hay cambios de contexto inesperados

3. **Input Assistance**
   - Labels claros en formularios
   - Mensajes de error descriptivos
   - Sugerencias de corrección
   - Prevención de errores

**Robust:**

1. **Compatible**
   - HTML válido
   - Elementos tienen tags de apertura/cierre
   - IDs únicos
   - Atributos ARIA correctos

### Implementation Examples

**Skip Link:**
```html
<a href="#main-content" class="skip-link">
  Saltar al contenido principal
</a>

<style>
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--color-primary-500);
  color: white;
  padding: 8px;
  z-index: 100;
}

.skip-link:focus {
  top: 0;
}
</style>
```

**Accessible Form:**
```html
<form>
  <div class="form-group">
    <label for="name">
      Nombre <span aria-label="requerido">*</span>
    </label>
    <input 
      type="text" 
      id="name" 
      name="name" 
      required
      aria-required="true"
      aria-describedby="name-error"
    />
    <span id="name-error" class="error" role="alert"></span>
  </div>
</form>
```

**Accessible Navigation:**
```html
<nav aria-label="Navegación principal">
  <ul>
    <li><a href="/" aria-current="page">Inicio</a></li>
    <li><a href="/sobre-nosotros">Sobre Nosotros</a></li>
    <li>
      <button aria-expanded="false" aria-controls="submenu-educacion">
        Educación
      </button>
      <ul id="submenu-educacion" hidden>
        <li><a href="/educacion/guias">Guías</a></li>
        <li><a href="/educacion/interpretacion">Interpretación</a></li>
      </ul>
    </li>
  </ul>
</nav>
```

### Testing Tools

- **axe DevTools** - Browser extension
- **WAVE** - Web accessibility evaluation tool
- **NVDA** - Screen reader (Windows)
- **VoiceOver** - Screen reader (Mac/iOS)
- **Lighthouse** - Automated audits
- **Color Contrast Analyzer** - Verificar contrastes


## Performance Optimization

### Image Optimization

**Strategy:**
- Usar formato WebP con fallback a JPG/PNG
- Lazy loading para imágenes below the fold
- Responsive images con srcset
- Compresión adecuada (80-85% quality)
- Dimensiones apropiadas (no cargar imágenes más grandes de lo necesario)

**Implementation:**
```html
<picture>
  <source 
    srcset="image-320w.webp 320w,
            image-640w.webp 640w,
            image-1024w.webp 1024w"
    type="image/webp"
  />
  <source 
    srcset="image-320w.jpg 320w,
            image-640w.jpg 640w,
            image-1024w.jpg 1024w"
    type="image/jpeg"
  />
  <img 
    src="image-640w.jpg" 
    alt="Descripción"
    loading="lazy"
    width="640"
    height="480"
  />
</picture>
```

### CSS Optimization

**Strategy:**
- Critical CSS inline en <head>
- CSS no crítico cargado async
- Minificación
- Eliminar CSS no usado (PurgeCSS)
- Usar CSS custom properties para theming

**Implementation:**
```html
<head>
  <!-- Critical CSS inline -->
  <style>
    /* Estilos críticos para above the fold */
  </style>
  
  <!-- CSS no crítico async -->
  <link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="styles.css"></noscript>
</head>
```

### JavaScript Optimization

**Strategy:**
- Defer o async para scripts no críticos
- Code splitting
- Minificación
- Tree shaking
- Evitar JavaScript innecesario

**Implementation:**
```html
<!-- Script crítico -->
<script src="critical.js"></script>

<!-- Scripts no críticos -->
<script src="analytics.js" async></script>
<script src="non-critical.js" defer></script>
```

### Caching Strategy

**Browser Caching:**
```apache
# .htaccess
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType application/pdf "access plus 1 month"
</IfModule>
```

**Server-Side Caching:**
- Page caching (WP Rocket, W3 Total Cache)
- Object caching (Redis, Memcached)
- Database query caching

### CDN Implementation

**Recommended CDN:**
- Cloudflare (Free tier disponible)
- BunnyCDN
- KeyCDN

**Benefits:**
- Distribución geográfica
- Reducción de latencia
- Protección DDoS
- SSL gratuito

### Database Optimization

**WordPress Specific:**
- Limpiar revisiones de posts
- Eliminar transients expirados
- Optimizar tablas regularmente
- Índices en queries frecuentes

```sql
-- Limpiar revisiones
DELETE FROM wp_posts WHERE post_type = 'revision';

-- Limpiar transients
DELETE FROM wp_options WHERE option_name LIKE '_transient_%';

-- Optimizar tablas
OPTIMIZE TABLE wp_posts, wp_postmeta, wp_options;
```

### Monitoring & Metrics

**Core Web Vitals:**
- **LCP (Largest Contentful Paint):** < 2.5s
  - Optimizar imágenes hero
  - Preload recursos críticos
  - Mejorar tiempo de respuesta del servidor

- **FID (First Input Delay):** < 100ms
  - Minimizar JavaScript
  - Code splitting
  - Defer scripts no críticos

- **CLS (Cumulative Layout Shift):** < 0.1
  - Especificar dimensiones de imágenes
  - Reservar espacio para ads/embeds
  - Evitar inserción dinámica de contenido

**Tools:**
- Google PageSpeed Insights
- WebPageTest
- Chrome DevTools Lighthouse
- GTmetrix

### Performance Budget

**Targets:**
- Total page size: < 2MB
- JavaScript: < 300KB
- CSS: < 100KB
- Images: < 1.5MB
- Fonts: < 100KB
- Requests: < 50


## Future Enhancements

### Phase 2 Features (Post-Launch)

**1. Área de Miembros**
- Login para profesionales registrados
- Contenido exclusivo
- Certificados de participación en actividades
- Historial de descargas

**2. Sistema de Búsqueda**
- Búsqueda avanzada de recursos
- Filtros por categoría, tipo, fecha
- Búsqueda de texto completo

**3. Newsletter**
- Suscripción a boletín mensual
- Integración con Mailchimp o similar
- Segmentación de audiencia

**4. Eventos y Calendario**
- Calendario interactivo de actividades
- Registro online a eventos
- Recordatorios automáticos

**5. Foro o Comunidad**
- Espacio de discusión para miembros
- Preguntas y respuestas
- Moderación de contenido

**6. Multiidioma**
- Versión en inglés
- Versión en portugués (para región)
- Selector de idioma

**7. Blog Completo**
- Artículos regulares sobre dolor
- Comentarios
- Categorías y tags
- Autores múltiples

**8. Integración con Redes Sociales**
- Feed de Instagram/Twitter
- Compartir en redes
- Social login

### Scalability Considerations

**Database:**
- Índices optimizados para queries frecuentes
- Particionamiento de tablas grandes
- Replicación para alta disponibilidad

**Hosting:**
- Auto-scaling para picos de tráfico
- Load balancing si es necesario
- CDN para assets estáticos

**Code:**
- Arquitectura modular
- APIs RESTful para integraciones futuras
- Documentación técnica completa

### Analytics & Insights

**Métricas a trackear:**
- Páginas más visitadas
- Recursos más descargados
- Tiempo en sitio
- Tasa de rebote
- Conversión de formularios
- Dispositivos y navegadores
- Ubicación geográfica

**Tools:**
- Google Analytics 4
- Hotjar (heatmaps y recordings)
- Google Search Console
- Custom dashboard para administradores

### Maintenance Plan

**Diario:**
- Monitoreo de uptime
- Revisión de logs de error

**Semanal:**
- Revisión de analytics
- Respuesta a formularios de contacto
- Publicación de novedades

**Mensual:**
- Actualizaciones de seguridad
- Backup verification
- Performance audit
- Content review

**Trimestral:**
- Auditoría de SEO
- Revisión de contenido obsoleto
- User feedback analysis
- Feature prioritization

**Anual:**
- Rediseño parcial (si necesario)
- Auditoría de seguridad completa
- Renovación de certificados
- Revisión de hosting/costos

## Conclusion

Este diseño proporciona una base sólida para el sitio web de SUFED, balanceando profesionalismo, usabilidad y mantenibilidad. La arquitectura propuesta es escalable y permite agregar funcionalidades futuras sin necesidad de reescribir el sistema completo.

El enfoque en accesibilidad, performance y SEO asegura que el sitio no solo se vea bien, sino que también funcione bien para todos los usuarios y sea fácilmente encontrable en motores de búsqueda.

La elección entre WordPress y Webflow dependerá de las preferencias del equipo de SUFED en términos de control técnico vs. facilidad de uso, pero ambas opciones son viables y están bien documentadas en este diseño.
