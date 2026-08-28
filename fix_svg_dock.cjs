const fs = require('fs');
let css = fs.readFileSync('css/desktop.css', 'utf8');

// I need to find the SVG pure white rule and make it broader so it hits everything in dock too.
css = css.replace(
  /\.theme-light-wallpaper \.matte-frosted-icon svg \{[\s\S]*?\}/,
  `.theme-light-wallpaper .matte-frosted-icon svg,
.theme-light-wallpaper #dock-grid-container svg {
    color: #ffffff !important;
}`
);

// Also I'll fix the excessive opacity/overexposure you noticed on the dock items themselves
// by adjusting the dock-grid-container matte frosted icon backgrounds.

css += `
/* Fix Dock Icon Overexposure */
.theme-light-wallpaper #dock-grid-container .matte-frosted-icon {
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.15) 100%) !important;
    border: 1px solid rgba(255, 255, 255, 0.45) !important;
    box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.6), 0 2px 10px rgba(0, 0, 0, 0.05) !important;
}
`;

fs.writeFileSync('css/desktop.css', css);
console.log("SVG colors and dock overexposure fixed");
