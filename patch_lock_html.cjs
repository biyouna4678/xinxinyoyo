const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const lockImgOld = `<img :src="settings.wallpaper" class="w-full h-full object-cover transition-all duration-300" alt="Lockscreen Wallpaper" />`;
const lockImgNew = `<img :src="settings.wallpaper" class="w-full h-full object-cover transition-all duration-300" :style="'filter: ' + settings.filterStyle + ';'" alt="Lockscreen Wallpaper" />\n      <div class="absolute inset-0 pointer-events-none transition-opacity duration-300" :style="\`background: radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,\${settings.vignetteOpacity}) 100%);\`"></div>`;

if (html.includes(lockImgOld)) {
    html = html.replace(lockImgOld, lockImgNew);
    fs.writeFileSync('index.html', html);
    console.log('patched lockscreen html');
} else {
    console.log('not found');
}
