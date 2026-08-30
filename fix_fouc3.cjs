const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Remove all injected styles
html = html.replace(/<style>\s*\[x-cloak\]\s*\{\s*display:\s*none\s*!important;\s*\}\s*<\/style>/g, '');

// Re-inject once before Alpine
const styleBlock = `<style>
    [x-cloak] {
      display: none !important;
    }
  </style>
  <!-- Alpine.js CDN -->`;

html = html.replace(/<!-- Alpine\.js CDN -->/, styleBlock);

fs.writeFileSync('index.html', html);
console.log("Cleaned up x-cloak style");
