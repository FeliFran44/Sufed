# Build and Optimization Scripts

This directory contains scripts for optimizing and building the SUFED website for production.

## Available Scripts

### 1. Build Production Files
```bash
npm run build
```

**What it does:**
- Minifies CSS files
- Minifies JavaScript files
- Creates combined CSS bundle
- Extracts critical CSS
- Generates optimization report

**Output:**
- `dist/css/*.min.css` - Minified CSS files
- `dist/css/bundle.min.css` - Combined CSS bundle
- `dist/css/critical.min.css` - Critical CSS for inlining
- `dist/js/*.min.js` - Minified JavaScript files

**Requirements:**
- Node.js installed
- Dependencies installed (`npm install`)

### 2. Optimize Images
```bash
npm run optimize:images
```

**What it does:**
- Analyzes all images in `assets/images/`
- Checks image file sizes
- Validates HTML image attributes
- Provides optimization recommendations

**Output:**
- Console report with image analysis
- Recommendations for optimization

### 3. Generate Responsive Images
```bash
npm run optimize:images:generate <image-path>
```

**What it does:**
- Creates multiple sizes of an image (400w, 600w, 800w, 1200w)
- Compresses images to 85% quality
- Strips metadata

**Requirements:**
- ImageMagick installed
- See: https://imagemagick.org/script/download.php

**Example:**
```bash
npm run optimize:images:generate assets/images/hero.jpg
```

### 4. Analyze CSS
```bash
npm run analyze:css
```

**What it does:**
- Extracts all CSS selectors
- Checks which selectors are used in HTML
- Identifies potentially unused CSS
- Calculates CSS file sizes
- Provides optimization recommendations

**Output:**
- Console report with CSS analysis
- List of potentially unused selectors

### 5. Full Analysis
```bash
npm run analyze
```

**What it does:**
- Runs image optimization analysis
- Runs CSS analysis
- Builds production files
- Generates comprehensive report

**Use this before deployment!**

## Installation

### 1. Install Node.js
Download from: https://nodejs.org/

### 2. Install Dependencies
```bash
npm install
```

This installs:
- `clean-css-cli` - CSS minification
- `terser` - JavaScript minification

### 3. (Optional) Install ImageMagick
For responsive image generation:
- **Windows**: https://imagemagick.org/script/download.php#windows
- **Mac**: `brew install imagemagick`
- **Linux**: `sudo apt-get install imagemagick`

## Usage Workflow

### Development
1. Work on your code normally
2. Test in browser
3. Commit changes

### Before Deployment
1. Run full analysis:
   ```bash
   npm run analyze
   ```

2. Review recommendations

3. Optimize images if needed:
   ```bash
   npm run optimize:images:generate assets/images/large-image.jpg
   ```

4. Update HTML to use minified files:
   ```html
   <!-- Replace -->
   <link rel="stylesheet" href="css/main.css">
   
   <!-- With -->
   <link rel="stylesheet" href="dist/css/bundle.min.css">
   ```

5. Inline critical CSS in `<head>`

6. Test the optimized version

7. Deploy!

## Script Details

### build-production.js
Main build script that:
- Minifies CSS using clean-css
- Minifies JavaScript using terser
- Creates bundles
- Extracts critical CSS
- Generates build report

### optimize-images.js
Image optimization utility that:
- Scans image directory
- Analyzes file sizes
- Checks HTML attributes
- Generates responsive sizes (with ImageMagick)
- Provides recommendations

### analyze-css.js
CSS analysis tool that:
- Parses CSS files
- Extracts selectors
- Checks HTML usage
- Identifies unused styles
- Calculates file sizes

## Troubleshooting

### "Module not found" Error
```bash
npm install
```

### ImageMagick Not Found
Install ImageMagick or skip responsive image generation.

### Permission Denied (Unix/Mac)
```bash
chmod +x scripts/*.js
```

### Scripts Not Running (Windows)
Use:
```bash
node scripts/build-production.js
```

## Advanced Usage

### Custom Configuration
Edit the `CONFIG` object in each script to customize:
- File paths
- Output directories
- Optimization settings
- Ignored patterns

### Automated Builds
Add to your CI/CD pipeline:
```yaml
# Example GitHub Actions
- name: Build production files
  run: npm run build

- name: Deploy
  run: # your deployment command
```

## Performance Targets

After optimization, aim for:
- **CSS**: < 50KB (minified + gzipped)
- **JavaScript**: < 100KB (minified + gzipped)
- **Images**: < 200KB per image
- **Lighthouse Score**: > 90
- **LCP**: < 2.5s
- **CLS**: < 0.1

## Resources

- [Web.dev Performance](https://web.dev/performance/)
- [ImageMagick Documentation](https://imagemagick.org/)
- [Clean-CSS](https://github.com/clean-css/clean-css)
- [Terser](https://terser.org/)

## Support

For issues or questions, contact the development team.
