# Documento de Requisitos - Landing Page SUFED

## Introducción

Este documento define los requisitos para el desarrollo del sitio web de SUFED (Sociedad Uruguaya de Fisioterapia Especializada en Dolor), un Grupo de Interés Especial (SIG) perteneciente a la Asociación de Fisioterapeutas del Uruguay (AFU).

El sitio tiene como objetivo principal educar sobre dolor desde un enfoque actualizado y basado en evidencia, proveer materiales prácticos para profesionales y usuarios, y posicionar a SUFED como referente técnico en dolor en Uruguay.

**Información Institucional:**
- **Presidenta:** Noemí Fremd
- **Secretario:** Ernesto Benítez
- **Prosecretario:** Agustín Matonte

**Características Generales del Sitio:**
- Estilo institucional, moderno y accesible
- Navegación simple (menos de 3 clics para cualquier sección)
- Mobile-first
- Carga rápida
- Paleta de colores: Azul AFU, gris, blanco, acentos petróleo o verde suave
- Tipografía: Montserrat / Inter

## Requisitos

### Requisito 1: Página de Inicio (Landing Page)

**User Story:** Como visitante del sitio, quiero ver inmediatamente qué es SUFED y acceder rápidamente a las secciones principales, para entender el propósito de la organización y navegar eficientemente.

#### Acceptance Criteria

1. WHEN un usuario accede al sitio THEN el sistema SHALL mostrar el título "SUFED – Sociedad Uruguaya de Fisioterapia Especializada en Dolor"
2. WHEN un usuario visualiza la página de inicio THEN el sistema SHALL mostrar el subtítulo "Educación, evidencia y práctica clínica para avanzar en el manejo del dolor en Uruguay"
3. WHEN un usuario visualiza la página de inicio THEN el sistema SHALL mostrar una sección "¿Qué es SUFED?" con el texto: "SUFED es un Grupo de Interés Especial (SIG) dentro de AFU dedicado a promover una fisioterapia basada en evidencia y enfocada en el abordaje contemporáneo del dolor"
4. WHEN un usuario visualiza la página de inicio THEN el sistema SHALL mostrar botones de acceso rápido a: Guías prácticas, Educación, Recursos y Contacto
5. WHEN un usuario visualiza la página de inicio THEN el sistema SHALL mostrar una sección "Últimas novedades" editable
6. WHEN un usuario visualiza la página de inicio THEN el sistema SHALL mostrar una imagen sobria relacionada con dolor, cuerpo, cerebro o equipo interdisciplinario
7. WHEN un usuario accede desde cualquier dispositivo THEN el sistema SHALL mostrar el contenido adaptado responsivamente (mobile-first)

### Requisito 2: Sección "Sobre Nosotros"

**User Story:** Como visitante interesado en SUFED, quiero conocer la identidad, propósito, misión, visión, valores y equipo de la organización, para entender su enfoque y credibilidad.

#### Acceptance Criteria

1. WHEN un usuario accede a "Sobre Nosotros" THEN el sistema SHALL mostrar la descripción institucional completa de SUFED como SIG de AFU
2. WHEN un usuario visualiza "Sobre Nosotros" THEN el sistema SHALL mostrar subsecciones claramente diferenciadas para: Propósito, Misión, Visión, Valores, Autoridades y equipo, y Relación institucional con AFU
3. WHEN un usuario visualiza la subsección "Autoridades" THEN el sistema SHALL mostrar los nombres y cargos de: Presidenta (Noemí Fremd), Secretario (Ernesto Benítez) y Prosecretario (Agustín Matonte)
4. WHEN un usuario visualiza la subsección "Valores" THEN el sistema SHALL listar: Evidencia científica actualizada, Enfoque centrado en la persona, Ética y lenguaje responsable, Interdisciplinariedad, Accesibilidad y claridad comunicativa, Actualización continua, y Colaboración con la comunidad profesional
5. IF se dispone de fotos profesionales THEN el sistema SHALL mostrar las fotografías de los integrantes del equipo

### Requisito 3: Sección "Educación"

**User Story:** Como profesional de la salud o estudiante, quiero acceder a guías prácticas, interpretaciones, conceptos esenciales y material educativo sobre dolor, para mejorar mi práctica clínica basada en evidencia.

#### Acceptance Criteria

1. WHEN un usuario accede a "Educación" THEN el sistema SHALL mostrar subsecciones para: Guías de práctica clínica, Interpretación de guías, Conceptos esenciales sobre dolor, y Material educativo para personas
2. WHEN un usuario accede a "Guías de práctica clínica" THEN el sistema SHALL listar guías de: NICE, JOSPT, IASP, The Lancet y otras referentes
3. WHEN un usuario accede a "Interpretación de guías" THEN el sistema SHALL mostrar el texto: "Nuestro objetivo es ofrecer materiales que faciliten la comprensión y aplicación de las guías clínicas, permitiendo un abordaje del dolor basado en evidencia y útil en diversos contextos"
4. WHEN un usuario accede a "Conceptos esenciales sobre dolor" THEN el sistema SHALL mostrar contenido sobre: Definición IASP 2020, Diferencias con 1979, Fundamentación del enfoque biopsicosocial, y Mitos habituales sobre dolor
5. WHEN un usuario visualiza contenido educativo THEN el sistema SHALL permitir la descarga de archivos PDF
6. WHEN un usuario visualiza contenido educativo THEN el sistema SHALL permitir la visualización de videos incrustados (YouTube o Vimeo)
7. WHEN un usuario navega por las subsecciones THEN el sistema SHALL mostrar iconos visuales diferenciados por categoría
8. WHEN un usuario accede a "Cómo leer una guía clínica" THEN el sistema SHALL mostrar material educativo específico sobre interpretación de guías

### Requisito 4: Sección "Recursos"

**User Story:** Como fisioterapeuta, quiero acceder a escalas validadas, cuestionarios, material de referencia y herramientas prácticas, para aplicarlas en mi evaluación y manejo clínico del dolor.

#### Acceptance Criteria

1. WHEN un usuario accede a "Recursos" THEN el sistema SHALL mostrar el texto: "En esta sección reunimos instrumentos y recursos clínicos validados que apoyan la evaluación y el manejo del dolor en distintos contextos de trabajo"
2. WHEN un usuario visualiza "Recursos" THEN el sistema SHALL organizar el contenido en categorías: Escalas y cuestionarios validados, Material de referencia rápida, Infografías, y Documentos descargables
3. WHEN un usuario accede a escalas validadas THEN el sistema SHALL incluir: Tampa, PCS, PEG, ODI, BPI y otras escalas relevantes
4. WHEN un usuario selecciona un recurso THEN el sistema SHALL permitir la descarga del archivo
5. WHEN un usuario visualiza un recurso THEN el sistema SHALL permitir la visualización de PDFs incrustados
6. WHEN un usuario navega por recursos THEN el sistema SHALL mostrar iconos diferenciados por categoría
7. WHEN un usuario busca un recurso específico THEN el sistema SHALL organizar los recursos de forma clara y accesible

### Requisito 5: Sección "Competencias"

**User Story:** Como fisioterapeuta interesado en especializarme en dolor, quiero conocer las competencias profesionales recomendadas para trabajar en este ámbito, para orientar mi desarrollo profesional.

#### Acceptance Criteria

1. WHEN un usuario accede a "Competencias" THEN el sistema SHALL mostrar el texto provisional: "Próximamente publicaremos las competencias profesionales recomendadas para el fisioterapeuta que trabaja en el ámbito del dolor, basadas en modelos internacionales y adaptadas a la realidad uruguaya"
2. WHEN el contenido esté disponible THEN el sistema SHALL permitir mostrar: Qué es una unidad de dolor (según IASP), Competencias clínicas, Competencias interdisciplinarias, y Competencias profesionales/éticas
3. WHEN el contenido esté disponible THEN el sistema SHALL permitir la descarga de un PDF con checklist de competencias
4. WHEN el contenido esté disponible THEN el sistema SHALL utilizar un diseño tipo "long scroll" limpio y académico

### Requisito 6: Sección "Actividades y Novedades"

**User Story:** Como miembro de la comunidad profesional, quiero estar informado sobre reuniones, charlas, webinars y publicaciones de SUFED, para participar y mantenerme actualizado.

#### Acceptance Criteria

1. WHEN un usuario accede a "Actividades y Novedades" THEN el sistema SHALL mostrar contenido sobre: Reuniones del SIG, Cursos, Charlas, Webinars y Colaboraciones
2. WHEN un administrador publica una novedad THEN el sistema SHALL mostrar la actualización en formato tipo blog o tarjetas
3. WHEN un usuario visualiza las novedades THEN el sistema SHALL ordenar el contenido cronológicamente (más reciente primero)
4. WHEN un administrador necesita editar contenido THEN el sistema SHALL permitir la edición de las publicaciones de forma sencilla
5. WHEN un usuario visualiza una actividad THEN el sistema SHALL mostrar información relevante como fecha, tipo de actividad y descripción

### Requisito 7: Sección "Contacto"

**User Story:** Como visitante interesado en SUFED, quiero poder enviar consultas o propuestas al equipo, para comunicarme con la organización.

#### Acceptance Criteria

1. WHEN un usuario accede a "Contacto" THEN el sistema SHALL mostrar el texto: "Para consultas, propuestas o interés en nuestras actividades, podés comunicarte con el equipo SUFED a través de este formulario"
2. WHEN un usuario visualiza el formulario THEN el sistema SHALL mostrar campos para: Nombre, Correo electrónico, Tema de la consulta y Mensaje
3. WHEN un usuario completa el formulario THEN el sistema SHALL validar que todos los campos obligatorios estén completos
4. WHEN un usuario envía el formulario THEN el sistema SHALL enviar la consulta al correo oficial de SUFED
5. WHEN un usuario envía el formulario exitosamente THEN el sistema SHALL mostrar un mensaje de confirmación
6. IF se implementa THEN el sistema SHALL incluir una sección de preguntas frecuentes

### Requisito 8: Navegación y Menú

**User Story:** Como usuario del sitio, quiero navegar fácilmente entre las secciones principales, para acceder rápidamente a la información que necesito.

#### Acceptance Criteria

1. WHEN un usuario visualiza el sitio THEN el sistema SHALL mostrar un menú superior (navbar) con las opciones: Inicio, Sobre Nosotros, Educación, Recursos, Competencias, Actividades y Contacto
2. WHEN un usuario accede al menú "Educación" THEN el sistema SHALL mostrar un submenú con: Guías, Interpretación, Artículos y Conceptos clave
3. WHEN un usuario navega por el sitio THEN el sistema SHALL permitir llegar a cualquier sección en menos de 3 clics
4. WHEN un usuario accede desde dispositivo móvil THEN el sistema SHALL mostrar un menú hamburguesa responsive
5. WHEN un usuario está en una sección THEN el sistema SHALL resaltar visualmente la opción activa en el menú

### Requisito 9: Diseño Visual y Branding

**User Story:** Como visitante del sitio, quiero experimentar un diseño profesional, moderno y coherente con la identidad institucional de AFU, para percibir credibilidad y profesionalismo.

#### Acceptance Criteria

1. WHEN un usuario visualiza el sitio THEN el sistema SHALL utilizar la paleta de colores: azul AFU, blanco, gris y acentos petróleo o verde suave
2. WHEN un usuario visualiza el sitio THEN el sistema SHALL utilizar tipografía Inter o Montserrat
3. WHEN un usuario visualiza el sitio THEN el sistema SHALL mostrar un estilo institucional, moderno y minimalista
4. WHEN un usuario visualiza el sitio THEN el sistema SHALL mantener coherencia cromática con AFU
5. WHEN un usuario visualiza el sitio THEN el sistema SHALL utilizar tono técnico y accesible (no coloquial)
6. IF se dispone de imágenes THEN el sistema SHALL mostrar fotografías reales de reuniones, equipo y jornadas de AFU y SUFED
7. WHEN un usuario visualiza el sitio THEN el sistema SHALL evitar elementos comerciales o lenguaje de marketing

### Requisito 10: Rendimiento y Accesibilidad

**User Story:** Como usuario con diferentes dispositivos y conexiones, quiero que el sitio cargue rápidamente y sea accesible, para tener una buena experiencia de navegación.

#### Acceptance Criteria

1. WHEN un usuario accede al sitio THEN el sistema SHALL cargar la página en menos de 3 segundos en conexiones estándar
2. WHEN un usuario accede al sitio THEN el sistema SHALL evitar elementos pesados innecesarios
3. WHEN un usuario accede desde dispositivo móvil THEN el sistema SHALL priorizar el diseño mobile-first
4. WHEN un usuario con discapacidad accede al sitio THEN el sistema SHALL cumplir con estándares de accesibilidad WCAG 2.1 nivel AA
5. WHEN un usuario navega por el sitio THEN el sistema SHALL optimizar imágenes y recursos para carga rápida
6. WHEN un usuario accede al sitio THEN el sistema SHALL funcionar correctamente en navegadores modernos (Chrome, Firefox, Safari, Edge)

### Requisito 11: Sistema de Gestión de Contenidos (CMS)

**User Story:** Como administrador de SUFED, quiero poder actualizar contenidos, subir archivos y gestionar novedades fácilmente, para mantener el sitio actualizado sin conocimientos técnicos avanzados.

#### Acceptance Criteria

1. WHEN un administrador accede al CMS THEN el sistema SHALL utilizar WordPress o Webflow como plataforma
2. WHEN un administrador necesita actualizar contenido THEN el sistema SHALL permitir edición de secciones de forma intuitiva
3. WHEN un administrador necesita subir archivos THEN el sistema SHALL permitir la carga de PDFs
4. WHEN un administrador necesita agregar videos THEN el sistema SHALL permitir incrustar videos de YouTube o Vimeo
5. WHEN un administrador publica novedades THEN el sistema SHALL actualizar automáticamente la sección "Últimas novedades" en la página de inicio
6. WHEN un administrador gestiona contenido THEN el sistema SHALL mantener la estructura y diseño del sitio consistente

### Requisito 12: Seguridad y Configuración Técnica

**User Story:** Como visitante del sitio, quiero que mis datos estén protegidos y la conexión sea segura, para confiar en la plataforma.

#### Acceptance Criteria

1. WHEN un usuario accede al sitio THEN el sistema SHALL utilizar certificado SSL activo (HTTPS)
2. WHEN un usuario envía el formulario de contacto THEN el sistema SHALL proteger los datos mediante conexión segura
3. WHEN un administrador gestiona el sitio THEN el sistema SHALL implementar medidas de seguridad básicas contra ataques comunes
4. WHEN el sitio está en producción THEN el sistema SHALL realizar backups periódicos del contenido
5. IF el sitio se integra con AFU THEN el sistema SHALL mantener compatibilidad y coherencia con la web de AFU
