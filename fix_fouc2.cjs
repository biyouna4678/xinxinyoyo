const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const styleBlock = `<style>
    [x-cloak] {
      display: none !important;
    }
  </style>
  <!-- Alpine.js CDN -->`;

html = html.replace(/<!-- Alpine\.js CDN -->/, styleBlock);

fs.writeFileSync('index.html', html);
console.log("Fixed x-cloak style");
