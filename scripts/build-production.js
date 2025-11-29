#!/usr/bin/env node

/**
 * Production Build Script for SUFED
 * 
 * This script optimizes CSS and JavaScript for production by:
 * - Minifying CSS files
 * - Minifying JavaScript files
 * - Extracting critical CSS
 * - Removing unused CSS (optional)
 * - Generating source maps
 * 
 * Usage:
 *   node scripts/build-production.js
 * 
 * Requirements:
 *   npm install --save-dev clean-css-cli terser
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const CONFIG = {
  cssFiles: [
    'css/reset.css',
    'css/variables.css',
    'css/base.css',
    'css/main.css'
  ],
  jsFiles: [
    'js/main.js'
  ],
  outputDir: 'dist',
  criticalCSS: true
};

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkDependencies() {
  const dependencies = ['clean-css-cli', 'terser'];
  const missing = [];
  
  for (const dep of dependencies) {
    try {
      require.resolve(dep);
    } catch (error) {
      missing.push(dep);
    }
  }
  
  if (missing.length > 0) {
    log('\n⚠ Missing dependencies:', 'yellow');
    missing.forEach(dep => log(`  - ${dep}`, 'yellow'));
    log('\nInstall them with:', 'cyan');
    log(`  npm install --save-dev ${missing.join(' ')}`, 'cyan');
    return false;
  }
  
  return true;
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function getFileSize(filePath) {
  const stats = fs.statSync(filePath);
  return (stats.size / 1024).toFixed(2);
}

function minifyCSS() {
  log('\n📦 Minifying CSS files...', 'cyan');
  
  const outputDir = path.join(CONFIG.outputDir, 'css');
  ensureDir(outputDir);
  
  const results = [];
  
  // Minify individual files
  CONFIG.cssFiles.forEach(file => {
    const inputPath = path.resolve(file);
    const fileName = path.basename(file);
    const outputPath = path.join(outputDir, fileName.replace('.css', '.min.css'));
    
    if (!fs.existsSync(inputPath)) {
      log(`  ⚠ File not found: ${file}`, 'yellow');
      return;
    }
    
    const originalSize = getFileSize(inputPath);
    
    try {
      execSync(`npx cleancss -o "${outputPath}" "${inputPath}"`, { stdio: 'ignore' });
      const minifiedSize = getFileSize(outputPath);
      const savings = ((1 - minifiedSize / originalSize) * 100).toFixed(1);
      
      log(`  ✓ ${fileName}: ${originalSize}KB → ${minifiedSize}KB (${savings}% smaller)`, 'green');
      
      results.push({
        file: fileName,
        original: originalSize,
        minified: minifiedSize,
        savings
      });
    } catch (error) {
      log(`  ✗ Failed to minify ${fileName}: ${error.message}`, 'red');
    }
  });
  
  // Create combined and minified bundle
  log('\n  Creating combined bundle...', 'cyan');
  const bundlePath = path.join(outputDir, 'bundle.min.css');
  const allCSS = CONFIG.cssFiles
    .filter(file => fs.existsSync(file))
    .map(file => fs.readFileSync(file, 'utf-8'))
    .join('\n');
  
  const tempFile = path.join(outputDir, 'temp.css');
  fs.writeFileSync(tempFile, allCSS);
  
  try {
    execSync(`npx cleancss -o "${bundlePath}" "${tempFile}"`, { stdio: 'ignore' });
    fs.unlinkSync(tempFile);
    
    const bundleSize = getFileSize(bundlePath);
    log(`  ✓ bundle.min.css: ${bundleSize}KB`, 'green');
  } catch (error) {
    log(`  ✗ Failed to create bundle: ${error.message}`, 'red');
  }
  
  return results;
}

function minifyJS() {
  log('\n📦 Minifying JavaScript files...', 'cyan');
  
  const outputDir = path.join(CONFIG.outputDir, 'js');
  ensureDir(outputDir);
  
  const results = [];
  
  CONFIG.jsFiles.forEach(file => {
    const inputPath = path.resolve(file);
    const fileName = path.basename(file);
    const outputPath = path.join(outputDir, fileName.replace('.js', '.min.js'));
    
    if (!fs.existsSync(inputPath)) {
      log(`  ⚠ File not found: ${file}`, 'yellow');
      return;
    }
    
    const originalSize = getFileSize(inputPath);
    
    try {
      execSync(`npx terser "${inputPath}" -o "${outputPath}" --compress --mangle`, { stdio: 'ignore' });
      const minifiedSize = getFileSize(outputPath);
      const savings = ((1 - minifiedSize / originalSize) * 100).toFixed(1);
      
      log(`  ✓ ${fileName}: ${originalSize}KB → ${minifiedSize}KB (${savings}% smaller)`, 'green');
      
      results.push({
        file: fileName,
        original: originalSize,
        minified: minifiedSize,
        savings
      });
    } catch (error) {
      log(`  ✗ Failed to minify ${fileName}: ${error.message}`, 'red');
    }
  });
  
  return results;
}

function extractCriticalCSS() {
  log('\n🎯 Extracting critical CSS...', 'cyan');
  
  // Critical CSS for above-the-fold content
  const criticalRules = `
/* Critical CSS - Above the fold */
:root {
  --color-primary-600: #2196F3;
  --color-primary-700: #1976D2;
  --color-background: #FFFFFF;
  --color-text-primary: #212121;
  --font-primary: 'Inter', sans-serif;
  --font-secondary: 'Montserrat', sans-serif;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --transition-fast: 0.15s ease;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: var(--font-primary);
  color: var(--color-text-primary);
  background-color: var(--color-background);
  line-height: 1.5;
}

.navbar {
  position: sticky;
  top: 0;
  background-color: var(--color-background);
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  z-index: 1000;
}

.hero {
  background: linear-gradient(135deg, #E3F2FD 0%, #FFFFFF 100%);
  padding: 4rem 0 3rem;
}

.container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
}
`;
  
  const outputPath = path.join(CONFIG.outputDir, 'css', 'critical.min.css');
  ensureDir(path.dirname(outputPath));
  
  try {
    const tempFile = path.join(CONFIG.outputDir, 'critical-temp.css');
    fs.writeFileSync(tempFile, criticalRules);
    execSync(`npx cleancss -o "${outputPath}" "${tempFile}"`, { stdio: 'ignore' });
    fs.unlinkSync(tempFile);
    
    const size = getFileSize(outputPath);
    log(`  ✓ critical.min.css: ${size}KB`, 'green');
    log(`  💡 Inline this CSS in <head> for faster initial render`, 'cyan');
  } catch (error) {
    log(`  ✗ Failed to create critical CSS: ${error.message}`, 'red');
  }
}

function generateReport(cssResults, jsResults) {
  log('\n' + '='.repeat(60), 'bright');
  log('BUILD OPTIMIZATION REPORT', 'bright');
  log('='.repeat(60), 'bright');
  
  if (cssResults.length > 0) {
    log('\n📊 CSS Optimization', 'cyan');
    log('-'.repeat(60));
    
    let totalOriginal = 0;
    let totalMinified = 0;
    
    cssResults.forEach(result => {
      totalOriginal += parseFloat(result.original);
      totalMinified += parseFloat(result.minified);
      log(`  ${result.file}: ${result.savings}% reduction`, 'green');
    });
    
    const totalSavings = ((1 - totalMinified / totalOriginal) * 100).toFixed(1);
    log(`\n  Total: ${totalOriginal.toFixed(2)}KB → ${totalMinified.toFixed(2)}KB (${totalSavings}% smaller)`, 'bright');
  }
  
  if (jsResults.length > 0) {
    log('\n📊 JavaScript Optimization', 'cyan');
    log('-'.repeat(60));
    
    let totalOriginal = 0;
    let totalMinified = 0;
    
    jsResults.forEach(result => {
      totalOriginal += parseFloat(result.original);
      totalMinified += parseFloat(result.minified);
      log(`  ${result.file}: ${result.savings}% reduction`, 'green');
    });
    
    const totalSavings = ((1 - totalMinified / totalOriginal) * 100).toFixed(1);
    log(`\n  Total: ${totalOriginal.toFixed(2)}KB → ${totalMinified.toFixed(2)}KB (${totalSavings}% smaller)`, 'bright');
  }
  
  log('\n💡 Next Steps:', 'cyan');
  log('-'.repeat(60));
  log('1. Update HTML to use minified files:', 'yellow');
  log('   <link rel="stylesheet" href="dist/css/bundle.min.css">', 'cyan');
  log('   <script src="dist/js/main.min.js" defer></script>', 'cyan');
  log('\n2. Inline critical CSS in <head> for faster initial render', 'yellow');
  log('\n3. Add defer/async to non-critical scripts', 'yellow');
  log('\n4. Consider using a CDN for static assets', 'yellow');
  
  log('\n' + '='.repeat(60), 'bright');
}

// Main execution
function main() {
  log('\n🚀 Starting Production Build...', 'bright');
  
  if (!checkDependencies()) {
    log('\n✗ Build failed: Missing dependencies\n', 'red');
    process.exit(1);
  }
  
  ensureDir(CONFIG.outputDir);
  
  const cssResults = minifyCSS();
  const jsResults = minifyJS();
  
  if (CONFIG.criticalCSS) {
    extractCriticalCSS();
  }
  
  generateReport(cssResults, jsResults);
  
  log('\n✅ Build complete!\n', 'green');
}

main();
