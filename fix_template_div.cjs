const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(
    /<template x-if="desktopSettings && desktopSettings.wallpaperUrl">\s*<div>/g,
    '<template x-if="desktopSettings && desktopSettings.wallpaperUrl">\s*<div class="absolute inset-0">'
);
html = html.replace(
    /<template x-if="settings.wallpaper">\s*<div>/g,
    '<template x-if="settings.wallpaper">\s*<div class="absolute inset-0">'
);

fs.writeFileSync('index.html', html);
console.log("Updated template divs");
