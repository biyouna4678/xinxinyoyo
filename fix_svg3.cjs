const fs = require('fs');
let css = fs.readFileSync('css/desktop.css', 'utf8');

css = css.replace(
  /\.theme-light-wallpaper \[data-grid-item\]\.matte-frosted-icon svg\.text-white,[\s\S]*?\{\s*color: #ffffff !important;\s*\}/,
  `.theme-light-wallpaper [data-grid-item].matte-frosted-icon svg.text-white,
.theme-light-wallpaper .matte-frosted-icon svg,
.theme-light-wallpaper #dock-grid-container svg {
    color: #ffffff !important;
    filter: drop-shadow(0px 1px 4px rgba(0,0,0,0.35)) !important;
}`
);

fs.writeFileSync('css/desktop.css', css);
console.log("SVG fix 3 applied with drop shadow");
