const fs = require('fs');
let css = fs.readFileSync('css/desktop.css', 'utf8');

css = css.replace(
  /\.theme-light-wallpaper \[data-grid-item\]\.matte-frosted-icon svg,\s*\.theme-light-wallpaper \.matte-frosted-icon svg,\s*\.theme-light-wallpaper #dock-grid-container svg\s*\{\s*color: #ffffff !important;\s*\}/,
  `.theme-light-wallpaper [data-grid-item].matte-frosted-icon svg.text-white,
.theme-light-wallpaper .matte-frosted-icon svg,
.theme-light-wallpaper #dock-grid-container svg {
    color: #ffffff !important;
}`
);

fs.writeFileSync('css/desktop.css', css);
console.log("SVG fix 2 applied");
