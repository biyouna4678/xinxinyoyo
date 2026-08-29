const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace('<div id="pin-pad" x-show="showPinPad"', '<div id="pin-pad" x-show="showPinPad" style="display: none;"');
fs.writeFileSync('index.html', html);
console.log("Fixed pin pad display");
