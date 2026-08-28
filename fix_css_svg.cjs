const fs = require('fs');
let css = fs.readFileSync('css/desktop.css', 'utf8');

css = css.replace(
  /\.theme-light-wallpaper \[data-grid-item\] \.text-white \{\s*color: rgba\(0, 0, 0, 0\.85\) !important;\s*\}/,
  `.theme-light-wallpaper span.text-white {
    color: rgba(0, 0, 0, 0.85) !important;
}`
);

css = css.replace(
  /\.theme-light-wallpaper \[data-grid-item\]\.matte-frosted-icon svg\.text-white,\s*\.theme-light-wallpaper \.matte-frosted-icon svg,\s*\.theme-light-wallpaper #dock-grid-container svg\s*\{\s*color: #ffffff !important;\s*filter: drop-shadow\(0px 1px 4px rgba\(0,0,0,0\.35\)\) !important;\s*\}/,
  `.theme-light-wallpaper .matte-frosted-icon svg,
.theme-light-wallpaper .matte-frosted-icon svg *,
.theme-light-wallpaper #dock-grid-container svg,
.theme-light-wallpaper #dock-grid-container svg * {
    color: #ffffff !important;
    filter: drop-shadow(0px 1px 4px rgba(0,0,0,0.35)) !important;
}`
);

fs.writeFileSync('css/desktop.css', css);
console.log("CSS SVG color rule updated");
