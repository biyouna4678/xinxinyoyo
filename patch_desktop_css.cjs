const fs = require('fs');

const css = `
/* Light wallpaper adaptations for desktop */
.theme-light-wallpaper .matte-frosted-icon {
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.02) 100%);
  border: 1px solid rgba(0, 0, 0, 0.1);
  color: rgba(0, 0, 0, 0.8) !important;
}

.theme-light-wallpaper #desktop-app-container .bg-white\\/20,
.theme-light-wallpaper #dock-grid-container .bg-white\\/20 {
    background-color: rgba(0, 0, 0, 0.06) !important;
}

.theme-light-wallpaper #desktop-app-container .border-white\\/30,
.theme-light-wallpaper #dock-grid-container .border-white\\/30 {
    border-color: rgba(0, 0, 0, 0.1) !important;
}

.theme-light-wallpaper #desktop-app-container .border-white\\/40,
.theme-light-wallpaper #dock-grid-container .border-white\\/40 {
    border-color: rgba(0, 0, 0, 0.15) !important;
}

.theme-light-wallpaper #desktop-app-container .text-white,
.theme-light-wallpaper #dock-grid-container .text-white {
    color: rgba(0, 0, 0, 0.9) !important;
}

.theme-light-wallpaper #desktop-app-container .text-white\\/80,
.theme-light-wallpaper #dock-grid-container .text-white\\/80 {
    color: rgba(0, 0, 0, 0.7) !important;
}

.theme-light-wallpaper #desktop-app-container .text-white\\/60,
.theme-light-wallpaper #dock-grid-container .text-white\\/60 {
    color: rgba(0, 0, 0, 0.5) !important;
}

.theme-light-wallpaper #desktop-app-container .bg-white\\/40,
.theme-light-wallpaper #dock-grid-container .bg-white\\/40 {
    background-color: rgba(0, 0, 0, 0.15) !important;
}

.theme-light-wallpaper #desktop-app-container .bg-white,
.theme-light-wallpaper #dock-grid-container .bg-white {
    background-color: rgba(0, 0, 0, 0.4) !important;
}

.theme-light-wallpaper .desktop-clock-text {
    color: rgba(0,0,0,0.9) !important;
}
`;

fs.appendFileSync('css/desktop.css', css);
console.log("desktop.css patched");
