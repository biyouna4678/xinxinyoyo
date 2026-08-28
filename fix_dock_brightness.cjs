const fs = require('fs');
let css = fs.readFileSync('css/desktop.css', 'utf8');

css = css.replace(
  /\.theme-light-wallpaper \[data-grid-item\] \.bg-white\\\/20, \s*\.theme-light-wallpaper #dock-grid-container \.bg-white\\\/20\s*\{\s*background-color: rgba\(255, 255, 255, 0\.6\) !important;\s*\}/,
  `.theme-light-wallpaper [data-grid-item] .bg-white\\/20 {
    background-color: rgba(255, 255, 255, 0.6) !important;
}
.theme-light-wallpaper #dock-grid-container .bg-white\\/20 {
    background-color: rgba(255, 255, 255, 0.35) !important;
}`
);

fs.writeFileSync('css/desktop.css', css);
console.log("Dock brightness fixed");
