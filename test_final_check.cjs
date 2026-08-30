const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
if (!html.includes('viewport-fit=cover')) {
  console.log("Missing viewport-fit=cover");
}
fs.writeFileSync('index.html', html);
console.log("Ready");
