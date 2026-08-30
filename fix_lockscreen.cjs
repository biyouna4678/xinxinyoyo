const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace('<div class="absolute inset-0 z-0 default-grey-wallpaper">', '<div class="absolute top-0 left-0 w-full h-full z-0 default-grey-wallpaper bg-[#1c1c1e]">');
html = html.replace('<div class="absolute inset-0 z-0">\n        <img :src="settings.wallpaper"', '<div class="absolute top-0 left-0 w-full h-full z-0">\n        <img :src="settings.wallpaper"');

fs.writeFileSync('index.html', html);
console.log("Fixed lockscreen wallpaper");
