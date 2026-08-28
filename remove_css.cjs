const fs = require('fs');
let css = fs.readFileSync('css/desktop.css', 'utf8');

css = css.replace(/\/\* Light wallpaper adaptations for desktop \*\/[\s\S]*/, '');

fs.writeFileSync('css/desktop.css', css);
console.log("CSS restored");
