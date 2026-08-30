const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace('x-cloak x-show="!unlocked"', 'x-show="!unlocked"');
fs.writeFileSync('index.html', html);
console.log("Removed x-cloak from lockscreen");
