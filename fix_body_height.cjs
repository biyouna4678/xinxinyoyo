const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace('h-[100dvh]', '');
fs.writeFileSync('index.html', html);
console.log("Fixed body height");
