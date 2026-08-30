const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Add [x-cloak] to <head> before alpine.js
const styleBlock = `  <style>
    [x-cloak] {
      display: none !important;
    }
  </style>
  <!-- Alpine.js CDN -->`;
html = html.replace('  <!-- Alpine.js CDN -->', styleBlock);

// 2. Remove style="display: none;" from specific elements that had it
html = html.replace('style="display: none;"', '');
html = html.replace('style="display: none;"', '');
html = html.replace('style="display: none;"', ''); // Just in case there are multiple

// 3. Add x-cloak to all x-show elements.
// Simple regex to find `x-show="something"` and add `x-cloak` before it if it doesn't already have it.
html = html.replace(/(\s)x-show="/g, (match, p1, offset, string) => {
    // Check if x-cloak is already nearby
    const before = string.slice(Math.max(0, offset - 20), offset);
    if (before.includes('x-cloak')) return match;
    return p1 + 'x-cloak x-show="';
});

fs.writeFileSync('index.html', html);
console.log("Fixed x-show flashing");
