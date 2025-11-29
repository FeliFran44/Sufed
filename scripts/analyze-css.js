#!/usr/bin/env node

/**
 * CSS Analyzer for SUFED
 * 
 * This script analyzes CSS usage and provides insights:
 * - Lists all CSS selectors
 * - Checks which selectors are used in HTML
 * - Identifies potentially unused CSS
 * - Calculates CSS file sizes
 * 
 * Usage:
 *   node scripts/analyze-css.js
 */

const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  cssFiles: [
    'css/reset.css',
    'css/variables.css',
    'css/base.css',
    'css/main.css'
  ],
  htmlFiles: ['index.html'],
  ignoreSelectors: [
    ':root',
    '*',
    'html',
    'body',
    // Pseudo-classes and pseudo-elements
    /^::/,
    /^:/,
    // Media queries
    /@media/,
    // Keyframes
    /@keyframes/
  ]
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

function extractSelectorsFromCSS(cssContent) {
  const selectors = new Set();
  
  // Remove comments
  cssContent = cssContent.replace(/\/\*[\s\S]*?\*\//g, '');
  
  // Extract selectors (simplified regex)
  const selectorRegex = /([^{}]+)\s*\{[^}]*\}/g;
  let match;
  
  while ((match = selectorRegex.exec(cssContent)) !== null) {
    const selectorGroup = match[1].trim();
    
    // Split by comma for multiple selectors
    const individualSelectors = selectorGroup.split(',').map(s => s.trim());
    
    individualSelectors.forEach(selector => {
      // Skip empty selectors
      if (!selector) return;
      
      // Skip ignored selectors
      const shouldIgnore = CONFIG.ignoreSelectors.some(ignore => {
        if (ignore instanceof RegExp) {
          return ignore.test(selector);
        }
        return selector === ignore;
      });
      
      if (!shouldIgnore) {
        selectors.add(selector);
      }
    });
  }
  
  return Array.from(selectors);
}

function extractClassesFromHTML(htmlContent) {
  const classes = new Set();
  
  // Extract class attributes
  const classRegex = /class=["']([^"']*)["']/g;
  let match;
  
  while ((match = classRegex.exec(htmlContent)) !== null) {
    const classList = match[1].split(/\s+/).filter(c => c);
    classList.forEach(c => classes.add(c));
  }
  
  return Array.from(classes);
}

function extractIdsFromHTML(htmlContent) {
  const ids = new Set();
  
  // Extract id attributes
  const idRegex = /id=["']([^"']*)["']/g;
  let match;
  
  while ((match = idRegex.exec(htmlContent)) !== null) {
    ids.add(match[1]);
  }
  
  return Array.from(ids);
}

function analyzeCSS() {
  log('\n🔍 Analyzing CSS Usage...', 'bright');
  log('='.repeat(60), 'bright');
  
  // Read all CSS files
  const allCSS = CONFIG.cssFiles
    .filter(file => fs.existsSync(file))
    .map(file => ({
      file,
      content: fs.readFileSync(file, 'utf-8'),
      size: fs.statSync(file).size
    }));
  
  // Read all HTML files
  const allHTML = CONFIG.htmlFiles
    .filter(file => fs.existsSync(file))
    .map(file => ({
      file,
      content: fs.readFileSync(file, 'utf-8')
    }));
  
  // Extract selectors from CSS
  log('\n📊 CSS Files:', 'cyan');
  log('-'.repeat(60));
  
  let totalSize = 0;
  const allSelectors = [];
  
  allCSS.forEach(css => {
    const selectors = extractSelectorsFromCSS(css.content);
    const sizeKB = (css.size / 1024).toFixed(2);
    totalSize += css.size;
    
    log(`  ${path.basename(css.file)}: ${selectors.length} selectors, ${sizeKB} KB`, 'green');
    
    allSelectors.push(...selectors);
  });
  
  log(`\n  Total: ${allSelectors.length} selectors, ${(totalSize / 1024).toFixed(2)} KB`, 'bright');
  
  // Extract classes and IDs from HTML
  log('\n📝 HTML Usage:', 'cyan');
  log('-'.repeat(60));
  
  const usedClasses = new Set();
  const usedIds = new Set();
  
  allHTML.forEach(html => {
    const classes = extractClassesFromHTML(html.content);
    const ids = extractIdsFromHTML(html.content);
    
    classes.forEach(c => usedClasses.add(c));
    ids.forEach(id => usedIds.add(id));
    
    log(`  ${path.basename(html.file)}: ${classes.length} classes, ${ids.length} IDs`, 'green');
  });
  
  log(`\n  Total: ${usedClasses.size} unique classes, ${usedIds.size} unique IDs`, 'bright');
  
  // Analyze selector usage
  log('\n🔎 Selector Analysis:', 'cyan');
  log('-'.repeat(60));
  
  const classSelectors = allSelectors.filter(s => s.startsWith('.'));
  const idSelectors = allSelectors.filter(s => s.startsWith('#'));
  const elementSelectors = allSelectors.filter(s => !s.startsWith('.') && !s.startsWith('#'));
  
  log(`  Class selectors: ${classSelectors.length}`, 'green');
  log(`  ID selectors: ${idSelectors.length}`, 'green');
  log(`  Element selectors: ${elementSelectors.length}`, 'green');
  
  // Find potentially unused selectors
  const potentiallyUnused = [];
  
  classSelectors.forEach(selector => {
    // Extract class name (handle complex selectors)
    const classMatch = selector.match(/\.([a-zA-Z0-9_-]+)/);
    if (classMatch) {
      const className = classMatch[1];
      if (!usedClasses.has(className)) {
        potentiallyUnused.push(selector);
      }
    }
  });
  
  idSelectors.forEach(selector => {
    // Extract ID name
    const idMatch = selector.match(/#([a-zA-Z0-9_-]+)/);
    if (idMatch) {
      const idName = idMatch[1];
      if (!usedIds.has(idName)) {
        potentiallyUnused.push(selector);
      }
    }
  });
  
  if (potentiallyUnused.length > 0) {
    log(`\n⚠ Potentially Unused Selectors: ${potentiallyUnused.length}`, 'yellow');
    log('-'.repeat(60));
    
    // Show first 20
    const toShow = potentiallyUnused.slice(0, 20);
    toShow.forEach(selector => {
      log(`  ${selector}`, 'yellow');
    });
    
    if (potentiallyUnused.length > 20) {
      log(`  ... and ${potentiallyUnused.length - 20} more`, 'yellow');
    }
    
    log('\n  Note: This is a simplified analysis. Some selectors may be:', 'cyan');
    log('  - Used in JavaScript', 'cyan');
    log('  - Used in dynamic content', 'cyan');
    log('  - Part of complex selectors', 'cyan');
    log('  - Used in other HTML files not analyzed', 'cyan');
  } else {
    log('\n✓ No obviously unused selectors found', 'green');
  }
  
  // Recommendations
  log('\n💡 Recommendations:', 'cyan');
  log('-'.repeat(60));
  
  const recommendations = [];
  
  if (totalSize > 100 * 1024) {
    recommendations.push('Consider splitting CSS into critical and non-critical parts');
  }
  
  if (potentiallyUnused.length > 50) {
    recommendations.push('Review and remove unused CSS selectors');
  }
  
  if (allSelectors.length > 500) {
    recommendations.push('Consider using a CSS methodology (BEM, SMACSS) for better organization');
  }
  
  recommendations.push('Minify CSS for production (run: npm run build)');
  recommendations.push('Use PurgeCSS to remove unused styles automatically');
  
  recommendations.forEach((rec, index) => {
    log(`  ${index + 1}. ${rec}`, 'yellow');
  });
  
  log('\n' + '='.repeat(60), 'bright');
  log('✅ Analysis complete!\n', 'green');
}

// Main execution
analyzeCSS();
