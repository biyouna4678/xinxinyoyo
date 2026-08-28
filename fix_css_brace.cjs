const fs = require('fs');
let css = fs.readFileSync('css/desktop.css', 'utf8');

css = css.replace(
  /color: #ffffff !important;/,
  `color: #ffffff !important;
    }`
);

fs.writeFileSync('css/desktop.css', css);
console.log("brace fixed");
