const fs = require('fs');
let css = fs.readFileSync('css/desktop.css', 'utf8');

css = css.replace(
  /\.matte-frosted-icon\s*{[\s\S]*?box-shadow:[^}]*}/,
  `.matte-frosted-icon {
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.15) 100%);
      backdrop-filter: blur(25px) saturate(1.2);
      -webkit-backdrop-filter: blur(25px) saturate(1.2);
      border: 1px solid rgba(255, 255, 255, 0.45);
      box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.6), 0 2px 10px rgba(0, 0, 0, 0.05);
      color: #ffffff !important;`
);

const themeCss = `
/* Smart text color adaptation for light wallpapers (Only affects text, not icon backgrounds) */
.theme-light-wallpaper #desktop-status-bar,
.theme-light-wallpaper #desktop-status-bar .text-white {
    color: rgba(0, 0, 0, 0.9) !important;
}
.theme-light-wallpaper #desktop-status-bar .bg-white {
    background-color: rgba(0, 0, 0, 0.9) !important;
}
.theme-light-wallpaper #desktop-status-bar .bg-white\\/40 {
    background-color: rgba(0, 0, 0, 0.3) !important;
}
.theme-light-wallpaper #desktop-status-bar .border-white {
    border-color: rgba(0, 0, 0, 0.9) !important;
}

/* App Labels (the text below icons) */
.theme-light-wallpaper [data-grid-item] + span.text-white {
    color: rgba(0, 0, 0, 0.85) !important;
    text-shadow: none !important;
}

/* Desktop Clock */
.theme-light-wallpaper .desktop-clock-text {
    color: rgba(0, 0, 0, 0.9) !important;
}

/* Widgets text that used text-white */
.theme-light-wallpaper [data-grid-item] .text-white {
    color: rgba(0, 0, 0, 0.85) !important;
}
.theme-light-wallpaper [data-grid-item] .text-white\\/80 {
    color: rgba(0, 0, 0, 0.7) !important;
}

/* Keep Matte Frosted Icon SVG pure white regardless of wallpaper */
.theme-light-wallpaper .matte-frosted-icon svg {
    color: #ffffff !important;
}
`;

fs.writeFileSync('css/desktop.css', css + themeCss);
console.log("glass patched");
