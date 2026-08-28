const fs = require('fs');
let css = fs.readFileSync('public/css/desktop.css', 'utf-8');

// Replace liquid glass base style
css = css.replace(/\.matte-frosted-icon\s*{[^}]+}/, `.matte-frosted-icon {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.05) 100%);
      backdrop-filter: blur(10px) saturate(1.3) contrast(1.1);
      -webkit-backdrop-filter: blur(10px) saturate(1.3) contrast(1.1);
      border: 1px solid rgba(255, 255, 255, 0.35);
      border-top-color: rgba(255, 255, 255, 0.65);
      border-left-color: rgba(255, 255, 255, 0.65);
      border-bottom-color: rgba(255, 255, 255, 0.15);
      border-right-color: rgba(255, 255, 255, 0.15);
      box-shadow: 
        inset 1.5px 1.5px 3px rgba(255, 255, 255, 0.8), 
        inset -1.5px -1.5px 3px rgba(0, 0, 0, 0.08), 
        0 4px 12px rgba(0, 0, 0, 0.08);
      color: #ffffff !important;
    }`);

// Replace the pure white SVG override
css = css.replace(/\/\* Keep Matte Frosted Icon SVG pure white regardless of wallpaper \*\/[\s\S]*?color: #ffffff !important;\n\}/, `/* Smart SVG color adaptation: Dark SVGs on light wallpaper */
.theme-light-wallpaper .matte-frosted-icon svg,
.theme-light-wallpaper .matte-frosted-icon svg *,
.theme-light-wallpaper #dock-grid-container svg,
.theme-light-wallpaper #dock-grid-container svg * {
    color: rgba(0, 0, 0, 0.8) !important;
}`);

// Replace the light wallpaper matte frosted icon override
css = css.replace(/\/\* Add support for theme-light-wallpaper on matte-frosted-icon \*\/[\s\S]*?rgba\(0, 0, 0, 0\.05\) !important;\n\}/, `/* Liquid glass support for theme-light-wallpaper */
.theme-light-wallpaper .matte-frosted-icon {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.15) 100%) !important;
    border-top-color: rgba(255, 255, 255, 0.8) !important;
    border-left-color: rgba(255, 255, 255, 0.8) !important;
    border-bottom-color: rgba(255, 255, 255, 0.3) !important;
    border-right-color: rgba(255, 255, 255, 0.3) !important;
    box-shadow: 
      inset 1.5px 1.5px 3px rgba(255, 255, 255, 0.9), 
      inset -1.5px -1.5px 3px rgba(0, 0, 0, 0.05), 
      0 4px 12px rgba(0, 0, 0, 0.05) !important;
}`);

// Replace Dock Icon Overexposure
css = css.replace(/\/\* Fix Dock Icon Overexposure \*\/[\s\S]*?rgba\(0, 0, 0, 0\.05\) !important;\n\}/, `/* Liquid glass Dock Icon Overexposure */
.theme-light-wallpaper #dock-grid-container .matte-frosted-icon {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.05) 100%) !important;
    border-top-color: rgba(255, 255, 255, 0.6) !important;
    border-left-color: rgba(255, 255, 255, 0.6) !important;
    border-bottom-color: rgba(255, 255, 255, 0.15) !important;
    border-right-color: rgba(255, 255, 255, 0.15) !important;
    box-shadow: 
      inset 1.5px 1.5px 3px rgba(255, 255, 255, 0.8), 
      inset -1.5px -1.5px 3px rgba(0, 0, 0, 0.08), 
      0 4px 12px rgba(0, 0, 0, 0.08) !important;
}`);

fs.writeFileSync('public/css/desktop.css', css);
