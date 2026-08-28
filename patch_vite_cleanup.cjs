const fs = require('fs');
let content = fs.readFileSync('vite.config.ts', 'utf8');
content = content.replace(/,\n\s*beautify:\s*path\.resolve\(__dirname,\s*'beautify\.html'\)/, '');
fs.writeFileSync('vite.config.ts', content);
