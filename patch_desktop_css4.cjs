const fs = require('fs');
let css = fs.readFileSync('public/css/desktop.css', 'utf-8');

// Replace theme-light-wallpaper override for matte-frosted-icon
css = css.replace(/\.theme-light-wallpaper \.matte-frosted-icon\s*{[^}]+}/, `.theme-light-wallpaper .matte-frosted-icon {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.01) 100%) !important;
    backdrop-filter: blur(20px) saturate(1.4) contrast(1.05) !important;
    -webkit-backdrop-filter: blur(20px) saturate(1.4) contrast(1.05) !important;
    border: 1px solid rgba(255, 255, 255, 0.35) !important;
    border-top-color: rgba(255, 255, 255, 0.95) !important;
    border-left-color: rgba(255, 255, 255, 0.8) !important;
    border-bottom-color: rgba(255, 255, 255, 0.1) !important;
    border-right-color: rgba(255, 255, 255, 0.1) !important;
    box-shadow: 
      inset 1px 1px 2px rgba(255, 255, 255, 0.9), 
      inset -1px -1px 2px rgba(0, 0, 0, 0.02), 
      0 8px 16px rgba(0, 0, 0, 0.06) !important;
}`);

// Replace SVG color for light wallpaper
css = css.replace(/\.theme-light-wallpaper \.matte-frosted-icon svg,[\s\S]*?color: rgba\(0, 0, 0, 0\.45\) !important;\n\}/, `.theme-light-wallpaper .matte-frosted-icon svg,
.theme-light-wallpaper .matte-frosted-icon svg *,
.theme-light-wallpaper #dock-grid-container svg,
.theme-light-wallpaper #dock-grid-container svg * {
    color: rgba(60, 60, 67, 0.75) !important;
}`);

fs.writeFileSync('public/css/desktop.css', css);
