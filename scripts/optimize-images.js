#!/usr/bin/env node

/**
 * Image Optimization Script for SUFED
 * 
 * This script helps optimize images for the website by:
 * - Checking image dimensions
 * - Validating that images have proper attributes in HTML
 * - Generating responsive image sizes (requires ImageMagick)
 * - Providing optimization recommendations
 * 
 * Usage:
 *   node scripts/optimize-images.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const CONFIG = {
  imagesDir: path.join(__dirname, '..', 'assets', 'images'),
  htmlFiles: [path.join(__dirname, '..', 'index.html')],
  responsiveSizes: [400, 600, 800, 1200],
  maxFileSizes: {
    hero: 200 * 1024, // 200KB
    card: 100 * 1024, // 100KB
    icon: 10 * 1024   // 10KB
  }
};

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkImageMagick() {
  try {
    execSync('magick --version', { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}

function getImageFiles(dir) {
  const files = [];
  const extensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
  
  try {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        files.push(...getImageFiles(fullPath));
      } else if (extensions.includes(path.extname(item).toLowerCase())) {
        files.push(fullPath);
      }
    }
  } catch (error) {
    log(`Error reading directory ${dir}: ${error.message}`, 'red');
  }
  
  return files;
}

function analyzeImage(imagePath) {
  const stats = fs.statSync(imagePath);
  const size = stats.size;
  const relativePath = path.relative(process.cwd(), imagePath);
  
  return {
    path: relativePath,
    size: size,
    sizeKB: (size / 1024).toFixed(2),
    extension: path.extname(imagePath).toLowerCase()
  };
}

function checkHTMLImageAttributes(htmlPath) {
  const content = fs.readFileSync(htmlPath, 'utf-8');
  const imgRegex = /<img[^>]*>/gi;
  const images = content.match(imgRegex) || [];
  
  const issues = [];
  
  images.forEach((imgTag, index) => {
    const hasWidth = /width=["']\d+["']/.test(imgTag);
    const hasHeight = /height=["']\d+["']/.test(imgTag);
    const hasAlt = /alt=["'][^"']*["']/.test(imgTag);
    const hasLoading = /loading=["'](lazy|eager)["']/.test(imgTag);
    const hasDecoding = /decoding=["']async["']/.test(imgTag);
    const srcMatch = imgTag.match(/src=["']([^"']*)["']/);
    const src = srcMatch ? srcMatch[1] : 'unknown';
    
    const imageIssues = [];
    if (!hasWidth) imageIssues.push('missing width');
    if (!hasHeight) imageIssues.push('missing height');
    if (!hasAlt) imageIssues.push('missing alt');
    if (!hasLoading) imageIssues.push('missing loading attribute');
    if (!hasDecoding) imageIssues.push('missing decoding="async"');
    
    if (imageIssues.length > 0) {
      issues.push({
        src,
        issues: imageIssues
      });
    }
  });
  
  return {
    total: images.length,
    issues
  };
}

function generateResponsiveSizes(imagePath) {
  if (!checkImageMagick()) {
    log('ImageMagick not found. Skipping responsive image generation.', 'yellow');
    return false;
  }
  
  const ext = path.extname(imagePath);
  const baseName = path.basename(imagePath, ext);
  const dir = path.dirname(imagePath);
  
  log(`\nGenerating responsive sizes for: ${path.basename(imagePath)}`, 'cyan');
  
  CONFIG.responsiveSizes.forEach(size => {
    const outputPath = path.join(dir, `${baseName}-${size}${ext}`);
    
    if (fs.existsSync(outputPath)) {
      log(`  ✓ ${size}w already exists`, 'green');
      return;
    }
    
    try {
      const command = `magick convert "${imagePath}" -resize ${size}x -quality 85 -strip "${outputPath}"`;
      execSync(command, { stdio: 'ignore' });
      log(`  ✓ Generated ${size}w`, 'green');
    } catch (error) {
      log(`  ✗ Failed to generate ${size}w: ${error.message}`, 'red');
    }
  });
  
  return true;
}

function printReport(images, htmlChecks) {
  log('\n' + '='.repeat(60), 'bright');
  log('IMAGE OPTIMIZATION REPORT', 'bright');
  log('='.repeat(60), 'bright');
  
  // Image file analysis
  log('\n📊 IMAGE FILES ANALYSIS', 'cyan');
  log('-'.repeat(60));
  
  let totalSize = 0;
  const largeImages = [];
  
  images.forEach(img => {
    totalSize += img.size;
    
    let status = '✓';
    let color = 'green';
    
    if (img.size > CONFIG.maxFileSizes.hero) {
      status = '⚠';
      color = 'yellow';
      largeImages.push(img);
    }
    
    log(`${status} ${img.path} (${img.sizeKB} KB)`, color);
  });
  
  log(`\nTotal images: ${images.length}`, 'bright');
  log(`Total size: ${(totalSize / 1024).toFixed(2)} KB`, 'bright');
  
  if (largeImages.length > 0) {
    log(`\n⚠ ${largeImages.length} image(s) exceed recommended size:`, 'yellow');
    largeImages.forEach(img => {
      log(`  - ${img.path} (${img.sizeKB} KB)`, 'yellow');
    });
  }
  
  // HTML attribute analysis
  log('\n📝 HTML IMAGE ATTRIBUTES', 'cyan');
  log('-'.repeat(60));
  
  htmlChecks.forEach(check => {
    log(`\nFile: ${path.basename(check.file)}`, 'bright');
    log(`Total images: ${check.result.total}`);
    
    if (check.result.issues.length === 0) {
      log('✓ All images have proper attributes', 'green');
    } else {
      log(`⚠ ${check.result.issues.length} image(s) with issues:`, 'yellow');
      check.result.issues.forEach(issue => {
        log(`  - ${issue.src}`, 'yellow');
        issue.issues.forEach(i => log(`    • ${i}`, 'yellow'));
      });
    }
  });
  
  // Recommendations
  log('\n💡 RECOMMENDATIONS', 'cyan');
  log('-'.repeat(60));
  
  const recommendations = [];
  
  if (largeImages.length > 0) {
    recommendations.push('Compress large images using TinyPNG or ImageMagick');
  }
  
  const hasIssues = htmlChecks.some(check => check.result.issues.length > 0);
  if (hasIssues) {
    recommendations.push('Add missing attributes (width, height, alt, loading, decoding) to images');
  }
  
  const hasJPEG = images.some(img => ['.jpg', '.jpeg'].includes(img.extension));
  if (hasJPEG) {
    recommendations.push('Consider converting JPEG images to WebP for better compression');
  }
  
  if (recommendations.length === 0) {
    log('✓ All images are well optimized!', 'green');
  } else {
    recommendations.forEach((rec, index) => {
      log(`${index + 1}. ${rec}`, 'yellow');
    });
  }
  
  log('\n' + '='.repeat(60), 'bright');
}

// Main execution
function main() {
  log('\n🚀 Starting Image Optimization Analysis...', 'bright');
  
  // Check if images directory exists
  if (!fs.existsSync(CONFIG.imagesDir)) {
    log(`\n✗ Images directory not found: ${CONFIG.imagesDir}`, 'red');
    log('Creating directory...', 'yellow');
    fs.mkdirSync(CONFIG.imagesDir, { recursive: true });
  }
  
  // Analyze image files
  const imageFiles = getImageFiles(CONFIG.imagesDir);
  const images = imageFiles.map(analyzeImage);
  
  // Check HTML files
  const htmlChecks = CONFIG.htmlFiles
    .filter(file => fs.existsSync(file))
    .map(file => ({
      file,
      result: checkHTMLImageAttributes(file)
    }));
  
  // Print report
  printReport(images, htmlChecks);
  
  // Optional: Generate responsive sizes
  log('\n🔧 RESPONSIVE IMAGE GENERATION', 'cyan');
  log('-'.repeat(60));
  
  if (checkImageMagick()) {
    log('ImageMagick detected. You can generate responsive sizes.', 'green');
    log('\nTo generate responsive sizes for an image, run:', 'bright');
    log('  node scripts/optimize-images.js generate <image-path>', 'cyan');
  } else {
    log('ImageMagick not found. Install it to generate responsive images:', 'yellow');
    log('  https://imagemagick.org/script/download.php', 'cyan');
  }
  
  log('\n✅ Analysis complete!\n', 'green');
}

// Handle command line arguments
const args = process.argv.slice(2);

if (args[0] === 'generate' && args[1]) {
  const imagePath = path.resolve(args[1]);
  if (fs.existsSync(imagePath)) {
    generateResponsiveSizes(imagePath);
  } else {
    log(`Error: Image not found: ${imagePath}`, 'red');
  }
} else {
  main();
}
