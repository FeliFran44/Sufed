# Image Optimization Guide - SUFED

This document provides guidelines and instructions for optimizing images on the SUFED website to improve performance and Core Web Vitals.

## Current Implementation

All images in the site now include:
- ✅ `loading="lazy"` attribute (except hero image which uses `loading="eager"`)
- ✅ `width` and `height` attributes to prevent CLS (Cumulative Layout Shift)
- ✅ `decoding="async"` for better rendering performance
- ✅ `srcset` for responsive images (hero image)
- ✅ Proper `alt` text for accessibility

## Image Optimization Checklist

### 1. Image Formats
- **JPEG**: Use for photographs and complex images
  - Quality: 80-85% for optimal balance
  - Progressive encoding recommended
- **PNG**: Use for images with transparency or simple graphics
  - Optimize with tools like pngquant or TinyPNG
- **SVG**: Use for icons, logos, and simple illustrations
  - Minify SVG files
  - Remove unnecessary metadata
- **WebP**: Modern format with better compression (recommended)
  - Provide JPEG/PNG fallback for older browsers

### 2. Responsive Images

#### Hero Image
The hero image uses `srcset` to serve different sizes:
```html
<img src="assets/images/sufed.jpg"
     srcset="assets/images/sufed-400.jpg 400w,
             assets/images/sufed-600.jpg 600w,
             assets/images/sufed-800.jpg 800w,
             assets/images/sufed.jpg 1200w"
     sizes="(max-width: 640px) 100vw,
            (max-width: 1024px) 50vw,
            600px"
     alt="..."
     loading="eager"
     width="600"
     height="400"
     decoding="async">
```

#### Recommended Sizes
- **Hero images**: 400px, 600px, 800px, 1200px widths
- **News cards**: 400px, 600px, 800px widths
- **Team photos**: 200px, 400px widths
- **Icons**: SVG (scalable) or 32px, 64px, 128px

### 3. Image Compression

#### Using ImageMagick (Command Line)
```bash
# Convert and compress JPEG
magick convert input.jpg -quality 85 -strip output.jpg

# Create responsive versions
magick convert sufed.jpg -resize 400x -quality 85 -strip sufed-400.jpg
magick convert sufed.jpg -resize 600x -quality 85 -strip sufed-600.jpg
magick convert sufed.jpg -resize 800x -quality 85 -strip sufed-800.jpg
magick convert sufed.jpg -resize 1200x -quality 85 -strip sufed.jpg

# Convert to WebP
magick convert input.jpg -quality 85 output.webp
```

#### Using Online Tools
- **TinyPNG/TinyJPG**: https://tinypng.com/
- **Squoosh**: https://squoosh.app/
- **ImageOptim** (Mac): https://imageoptim.com/

### 4. Loading Strategies

#### Above-the-fold Images (Hero)
```html
<img loading="eager" ...>
```
- Loads immediately
- Use for critical images visible on page load

#### Below-the-fold Images
```html
<img loading="lazy" ...>
```
- Defers loading until near viewport
- Use for all non-critical images

### 5. Preventing Layout Shift (CLS)

Always include `width` and `height` attributes:
```html
<img src="image.jpg" width="600" height="400" alt="...">
```

The browser will calculate the aspect ratio and reserve space, preventing layout shift.

### 6. Async Decoding

Add `decoding="async"` to allow the browser to decode images off the main thread:
```html
<img src="image.jpg" decoding="async" alt="...">
```

## Implementation Steps

### Step 1: Audit Current Images
```bash
# List all images in the project
dir /s /b assets\images\*.*
```

### Step 2: Compress Existing Images
1. Download images from `assets/images/`
2. Compress using TinyPNG or ImageMagick
3. Replace original files

### Step 3: Create Responsive Versions
For each JPEG/PNG image, create multiple sizes:
- Small: 400px width
- Medium: 600px width
- Large: 800px width
- XLarge: 1200px width

### Step 4: Convert to WebP (Optional)
Create WebP versions for modern browsers:
```html
<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="...">
</picture>
```

### Step 5: Update HTML
Add `srcset` and `sizes` attributes to images that benefit from responsive loading.

## Performance Targets

### Core Web Vitals
- **LCP (Largest Contentful Paint)**: < 2.5s
  - Optimize hero image
  - Use `loading="eager"` for above-fold images
  - Preload critical images if needed

- **CLS (Cumulative Layout Shift)**: < 0.1
  - Always include width/height attributes
  - Reserve space for images in CSS

- **FID (First Input Delay)**: < 100ms
  - Use `decoding="async"`
  - Lazy load below-fold images

### File Size Targets
- **Hero images**: < 200KB
- **News card images**: < 100KB
- **Icons (PNG)**: < 10KB
- **Icons (SVG)**: < 5KB

## Testing

### Tools
1. **Lighthouse** (Chrome DevTools)
   - Run audit on Performance
   - Check image optimization suggestions

2. **PageSpeed Insights**
   - https://pagespeed.web.dev/
   - Test both mobile and desktop

3. **WebPageTest**
   - https://www.webpagetest.org/
   - Detailed waterfall analysis

### Metrics to Monitor
- Total page weight
- Number of image requests
- Time to load images
- LCP timing
- CLS score

## Maintenance

### Regular Tasks
- [ ] Compress new images before uploading
- [ ] Create responsive versions for photos
- [ ] Test on slow 3G connection
- [ ] Monitor Core Web Vitals monthly
- [ ] Update images if formats improve (e.g., AVIF)

### Automation (Future)
Consider implementing:
- Build-time image optimization
- Automatic WebP conversion
- CDN with automatic image optimization
- Responsive image generation pipeline

## Resources

- [Web.dev Image Optimization](https://web.dev/fast/#optimize-your-images)
- [MDN Responsive Images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
- [ImageMagick Documentation](https://imagemagick.org/index.php)
- [Squoosh App](https://squoosh.app/)
