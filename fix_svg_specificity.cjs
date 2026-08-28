const fs = require('fs');
let css = fs.readFileSync('css/desktop.css', 'utf8');

css = css.replace(
  /\/\* Keep Matte Frosted Icon SVG pure white regardless of wallpaper \*\/[\s\S]*?\/\* Dock page dots adaptation \*\//,
  `/* Keep Matte Frosted Icon SVG pure white regardless of wallpaper */
.theme-light-wallpaper [data-grid-item] .matte-frosted-icon svg,
.theme-light-wallpaper .matte-frosted-icon svg,
.theme-light-wallpaper #dock-grid-container svg {
    color: #ffffff !important;
}
/* Dock page dots adaptation */`
);

fs.writeFileSync('css/desktop.css', css);
console.log("Specificity fixed");
