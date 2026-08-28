const fs = require('fs');
let css = fs.readFileSync('css/desktop.css', 'utf8');

// Replace the existing light wallpaper matte-frosted-icon styles (if any)
css = css.replace(/\.theme-light-wallpaper \.matte-frosted-icon {[\s\S]*?}/, '');

css += `
/* Add support for theme-light-wallpaper on matte-frosted-icon */
.theme-light-wallpaper .matte-frosted-icon {
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.65) 0%, rgba(255, 255, 255, 0.45) 100%) !important;
    border: 1px solid rgba(255, 255, 255, 0.8) !important;
    box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.8), 0 2px 10px rgba(0, 0, 0, 0.05) !important;
}

.theme-light-wallpaper [data-grid-item] .bg-white\\/20, 
.theme-light-wallpaper #dock-grid-container .bg-white\\/20 {
    background-color: rgba(255, 255, 255, 0.6) !important;
}
.theme-light-wallpaper [data-grid-item] .border-white\\/30, 
.theme-light-wallpaper #dock-grid-container .border-white\\/30,
.theme-light-wallpaper [data-grid-item] .border-white\\/40 {
    border-color: rgba(255, 255, 255, 0.8) !important;
}
`;

fs.writeFileSync('css/desktop.css', css);
console.log("Glass color fixed");
