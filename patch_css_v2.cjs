const fs = require('fs');
let css = fs.readFileSync('css/desktop.css', 'utf8');

css = css.replace(/\/\* Light wallpaper adaptations for desktop \*\/[\s\S]*/, '');

const newCss = `
/* Light wallpaper adaptations for desktop */
.theme-light-wallpaper .matte-frosted-icon {
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.12) 0%, rgba(0, 0, 0, 0.04) 100%);
  border: 1px solid rgba(0, 0, 0, 0.1);
  color: rgba(0, 0, 0, 0.8) !important;
}

.theme-light-wallpaper [data-grid-item] .bg-white\\/20,
.theme-light-wallpaper #dock-grid-container .bg-white\\/20 {
    background-color: rgba(0, 0, 0, 0.08) !important;
}

.theme-light-wallpaper [data-grid-item] .border-white\\/30,
.theme-light-wallpaper #dock-grid-container .border-white\\/30 {
    border-color: rgba(0, 0, 0, 0.1) !important;
}

.theme-light-wallpaper [data-grid-item] .text-white,
.theme-light-wallpaper #dock-grid-container .text-white,
.theme-light-wallpaper .matte-frosted-icon {
    color: rgba(0, 0, 0, 0.9) !important;
}

.theme-light-wallpaper [data-grid-item] .text-white\\/80,
.theme-light-wallpaper #dock-grid-container .text-white\\/80 {
    color: rgba(0, 0, 0, 0.7) !important;
}

.theme-light-wallpaper [data-grid-item] .bg-white\\/40,
.theme-light-wallpaper #dock-grid-container .bg-white\\/40 {
    background-color: rgba(0, 0, 0, 0.15) !important;
}

.theme-light-wallpaper #dock-grid-container .border-white\\/40 {
    border-color: rgba(0, 0, 0, 0.2) !important;
}

.theme-light-wallpaper .desktop-clock-text {
    color: rgba(0,0,0,0.9) !important;
}

/* For icon svgs on light wallpaper */
.theme-light-wallpaper .matte-frosted-icon svg {
    color: rgba(0,0,0,0.8) !important;
}
`;

fs.writeFileSync('css/desktop.css', css + newCss);
console.log("CSS v2 applied");
