const fs = require('fs');
let css = fs.readFileSync('public/css/desktop.css', 'utf-8');

// Replace matte-frosted-icon base style
css = css.replace(/\.matte-frosted-icon\s*{[^}]+}/, `.matte-frosted-icon {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.02) 100%);
      backdrop-filter: blur(20px) saturate(1.4) contrast(1.05);
      -webkit-backdrop-filter: blur(20px) saturate(1.4) contrast(1.05);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-top-color: rgba(255, 255, 255, 0.85);
      border-left-color: rgba(255, 255, 255, 0.65);
      border-bottom-color: rgba(0, 0, 0, 0.05);
      border-right-color: rgba(0, 0, 0, 0.05);
      box-shadow: 
        inset 1px 1px 2px rgba(255, 255, 255, 0.7), 
        inset -1px -1px 2px rgba(0, 0, 0, 0.05), 
        0 4px 15px rgba(0, 0, 0, 0.05);
      color: #ffffff !important;
    }`);

// Replace SVG color for light wallpaper
css = css.replace(/\/\* Smart SVG color adaptation: Dark SVGs on light wallpaper \*\/[\s\S]*?color: rgba\(0, 0, 0, 0\.8\) !important;\n\}/, `/* Smart SVG color adaptation: Dark SVGs on light wallpaper */
.theme-light-wallpaper .matte-frosted-icon svg,
.theme-light-wallpaper .matte-frosted-icon svg *,
.theme-light-wallpaper #dock-grid-container svg,
.theme-light-wallpaper #dock-grid-container svg * {
    color: rgba(0, 0, 0, 0.45) !important;
}`);

// Replace theme-light-wallpaper override for matte-frosted-icon
css = css.replace(/\.theme-light-wallpaper \.matte-frosted-icon\s*{[^}]+}/, `.theme-light-wallpaper .matte-frosted-icon {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.02) 100%) !important;
    backdrop-filter: blur(25px) saturate(1.4) contrast(1.05) !important;
    -webkit-backdrop-filter: blur(25px) saturate(1.4) contrast(1.05) !important;
    border: 1px solid rgba(255, 255, 255, 0.3) !important;
    border-top-color: rgba(255, 255, 255, 0.95) !important;
    border-left-color: rgba(255, 255, 255, 0.75) !important;
    border-bottom-color: rgba(0, 0, 0, 0.05) !important;
    border-right-color: rgba(0, 0, 0, 0.05) !important;
    box-shadow: 
      inset 1px 1px 2.5px rgba(255, 255, 255, 0.95), 
      inset -1px -1px 2px rgba(0, 0, 0, 0.05), 
      0 6px 16px rgba(0, 0, 0, 0.05) !important;
}`);

// Replace Dock Icon Overexposure
css = css.replace(/\.theme-light-wallpaper #dock-grid-container \.matte-frosted-icon\s*{[^}]+}/, `.theme-light-wallpaper #dock-grid-container .matte-frosted-icon {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.02) 100%) !important;
    border-top-color: rgba(255, 255, 255, 0.8) !important;
    border-left-color: rgba(255, 255, 255, 0.6) !important;
    border-bottom-color: rgba(0, 0, 0, 0.03) !important;
    border-right-color: rgba(0, 0, 0, 0.03) !important;
    box-shadow: 
      inset 1px 1px 2px rgba(255, 255, 255, 0.8), 
      inset -1px -1px 2px rgba(0, 0, 0, 0.03), 
      0 4px 15px rgba(0, 0, 0, 0.03) !important;
}`);

fs.writeFileSync('public/css/desktop.css', css);
