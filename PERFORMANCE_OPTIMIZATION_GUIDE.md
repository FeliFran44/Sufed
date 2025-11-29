# Performance Optimization Guide - SUFED

This document provides a comprehensive guide for optimizing the performance of the SUFED website.

## Overview

Performance optimizations implemented:
- ✅ Image optimization (lazy loading, srcset, dimensions)
- ✅ CSS minification and bundling
- ✅ JavaScript minification
- ✅ Critical CSS extraction
- ✅ Async/defer script loading
- ✅ Resource hints (preconnect for fonts)

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Optimization Scripts
```bash
# Analyze images
npm run optimize:images

# Build production files
npm run build

# Run both
npm run analyze
```

### 3. Deploy Optimized Files
Use the minified files from the `dist/` directory in production.

## Detailed Optimizations

### 1. Image Optimization

#### Current Implementation
- All images have `width` and `height` attributes (prevents CLS)
- Lazy loading for below-the-fold images
- Eager loading for hero image
- `decoding="async"` for better rendering
- Responsive images with `srcset` (hero image)

#### Best Practices
```html
<!-- Hero image (above-the-fold) -->
<img src="image.jpg"
     srcset="image-400.jpg 400w,
             image-600.jpg 600w,
             image-800.jpg 800w"
     sizes="(max-width: 640px) 100vw, 600px"
     alt="Description"
     loading="eager"
     width="600"
     height="400"
     decoding="async">

<!-- Below-the-fold images -->
<img src="image.jpg"
     alt="Description"
     loading="lazy"
     width="400"
     height="250"
     decoding="async">
```

#### Tools
- **ImageMagick**: Batch resize and compress
- **TinyPNG**: Online compression
- **Squoosh**: Manual optimization

See `IMAGE_OPTIMIZATION_GUIDE.md` for detailed instructions.

### 2. CSS Optimization

#### Minification
```bash
npm run build
```

This creates:
- Individual minified files: `dist/css/*.min.css`
- Combined bundle: `dist/css/bundle.min.css`
- Critical CSS: `dist/css/critical.min.css`

#### Critical CSS
Inline critical CSS in `<head>` for faster initial render:

```html
<head>
  <!-- Critical CSS -->
  <style>
    /* Inline critical.min.css content here */
  </style>
  
  <!-- Non-critical CSS -->
  <link rel="stylesheet" href="dist/css/bundle.min.css">
</head>
```

#### Remove Unused CSS
Use PurgeCSS to remove unused styles:
```bash
npm install --save-dev purgecss
npx purgecss --css dist/css/bundle.min.css --content index.html --output dist/css/
```

### 3. JavaScript Optimization

#### Minification
```bash
npm run build
```

Creates minified files in `dist/js/`

#### Loading Strategy
```html
<!-- Defer: Load after HTML parsing -->
<script src="js/main.js" defer></script>

<!-- Async: Load and execute asynchronously -->
<script src="analytics.js" async></script>
```

**Use `defer` for:**
- Scripts that manipulate the DOM
- Scripts that depend on DOM being ready
- Main application scripts

**Use `async` for:**
- Analytics scripts
- Third-party widgets
- Independent scripts

### 4. Font Optimization

#### Current Implementation
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

#### Best Practices
- ✅ Use `preconnect` for font domains
- ✅ Use `display=swap` to prevent FOIT (Flash of Invisible Text)
- Consider self-hosting fonts for better control

### 5. Resource Hints

#### Preconnect
Connect to external domains early:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

#### Preload
Preload critical resources:
```html
<!-- Preload critical CSS -->
<link rel="preload" href="dist/css/critical.min.css" as="style">

<!-- Preload hero image -->
<link rel="preload" href="assets/images/sufed.jpg" as="image">

<!-- Preload fonts -->
<link rel="preload" href="fonts/inter.woff2" as="font" type="font/woff2" crossorigin>
```

#### DNS Prefetch
Resolve DNS for external domains:
```html
<link rel="dns-prefetch" href="https://www.youtube.com">
```

### 6. Caching Strategy

#### HTTP Headers
Configure server to send proper cache headers:

```
# Static assets (1 year)
Cache-Control: public, max-age=31536000, immutable

# HTML (no cache, revalidate)
Cache-Control: no-cache, must-revalidate

# CSS/JS (1 week)
Cache-Control: public, max-age=604800
```

#### Service Worker (Future)
Consider implementing a service worker for offline support and caching.

### 7. Compression

#### Gzip/Brotli
Enable compression on server:

**Apache (.htaccess)**
```apache
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript
</IfModule>
```

**Nginx**
```nginx
gzip on;
gzip_types text/css application/javascript image/svg+xml;
gzip_min_length 1000;
```

### 8. Code Splitting (Future)

For larger applications, consider splitting JavaScript:
```javascript
// Dynamic import
const module = await import('./module.js');

// Webpack code splitting
import(/* webpackChunkName: "feature" */ './feature.js');
```

## Performance Metrics

### Core Web Vitals Targets

#### LCP (Largest Contentful Paint)
- **Target**: < 2.5s
- **Optimizations**:
  - Optimize hero image
  - Use `loading="eager"` for above-fold images
  - Inline critical CSS
  - Preload key resources

#### FID (First Input Delay)
- **Target**: < 100ms
- **Optimizations**:
  - Minimize JavaScript execution
  - Use `defer` for scripts
  - Break up long tasks

#### CLS (Cumulative Layout Shift)
- **Target**: < 0.1
- **Optimizations**:
  - Set `width` and `height` on images
  - Reserve space for dynamic content
  - Avoid inserting content above existing content

### Other Metrics

#### Time to Interactive (TTI)
- **Target**: < 3.8s
- Minimize JavaScript
- Use code splitting

#### Total Blocking Time (TBT)
- **Target**: < 200ms
- Break up long tasks
- Defer non-critical JavaScript

#### Speed Index
- **Target**: < 3.4s
- Optimize above-the-fold content
- Inline critical CSS

## Testing Tools

### 1. Lighthouse (Chrome DevTools)
```bash
# Run Lighthouse audit
1. Open Chrome DevTools (F12)
2. Go to "Lighthouse" tab
3. Select "Performance" category
4. Click "Analyze page load"
```

### 2. PageSpeed Insights
- URL: https://pagespeed.web.dev/
- Test both mobile and desktop
- Follow recommendations

### 3. WebPageTest
- URL: https://www.webpagetest.org/
- Detailed waterfall analysis
- Test from different locations

### 4. Chrome DevTools Performance
```bash
1. Open DevTools (F12)
2. Go to "Performance" tab
3. Click record
4. Reload page
5. Stop recording
6. Analyze timeline
```

## Monitoring

### Real User Monitoring (RUM)

#### Google Analytics 4
Track Core Web Vitals:
```javascript
// web-vitals library
import {getCLS, getFID, getLCP} from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getLCP(console.log);
```

#### Custom Monitoring
```javascript
// Performance Observer
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log(entry.name, entry.duration);
  }
});

observer.observe({entryTypes: ['measure', 'navigation']});
```

## Checklist

### Pre-Deployment
- [ ] Run `npm run analyze`
- [ ] Minify CSS and JavaScript
- [ ] Optimize and compress images
- [ ] Inline critical CSS
- [ ] Add defer/async to scripts
- [ ] Test on slow 3G connection
- [ ] Run Lighthouse audit (score > 90)
- [ ] Verify Core Web Vitals

### Post-Deployment
- [ ] Monitor Core Web Vitals
- [ ] Check real user metrics
- [ ] Review server response times
- [ ] Verify caching is working
- [ ] Test from different locations

### Monthly Maintenance
- [ ] Review performance metrics
- [ ] Update dependencies
- [ ] Re-optimize images if needed
- [ ] Check for unused CSS/JS
- [ ] Test on latest browsers

## Advanced Optimizations (Future)

### 1. HTTP/2 Server Push
Push critical resources before they're requested.

### 2. WebP/AVIF Images
Use modern image formats with fallbacks:
```html
<picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="...">
</picture>
```

### 3. CDN
Use a Content Delivery Network for static assets.

### 4. Service Worker
Implement offline support and advanced caching.

### 5. Resource Bundling
Use a build tool like Webpack or Vite for advanced bundling.

## Resources

- [Web.dev Performance](https://web.dev/performance/)
- [MDN Web Performance](https://developer.mozilla.org/en-US/docs/Web/Performance)
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [WebPageTest](https://www.webpagetest.org/)
- [Can I Use](https://caniuse.com/)

## Support

For questions or issues, contact the development team.
