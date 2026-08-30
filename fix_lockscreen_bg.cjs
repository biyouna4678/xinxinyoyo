const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const oldLockscreenBg = `<div class="fullscreen-bg bg-[#BCBCBC]">
    <template x-if="settings.wallpaper">
      <div class="absolute top-0 left-0 w-full h-full z-0">
        <img :src="settings.wallpaper" class="w-full h-full object-cover transition-all duration-300" :style="'filter: ' + settings.filterStyle + ';'" alt="Lockscreen Wallpaper" />
        <div class="absolute top-0 left-0 w-full h-full pointer-events-none transition-opacity duration-300" :style="\`background: radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,\${settings.vignetteOpacity}) 100%);\`"></div>
      </div>
    </template>
    <div class="absolute bottom-0 left-0 right-0 h-[35%] bg-gradient-to-t from-black/40 via-black/10 to-transparent pointer-events-none"></div>
  </div>`;

const newLockscreenBg = `<div class="fullscreen-bg bg-[#BCBCBC]">
    <template x-if="settings.wallpaper">
      <div class="absolute top-0 left-0 w-full h-full z-0">
        <img :src="settings.wallpaper" class="w-full h-full object-cover transition-all duration-300" :style="'filter: ' + settings.filterStyle + ';'" alt="Lockscreen Wallpaper" />
        <div class="absolute top-0 left-0 w-full h-full pointer-events-none transition-opacity duration-300" :style="\`background: radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,\${settings.vignetteOpacity}) 100%);\`"></div>
      </div>
    </template>
    <template x-if="!settings.wallpaper">
      <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#e8eaec] via-[#d5d7da] to-[#b5b8bc]"></div>
    </template>
    <div class="absolute bottom-0 left-0 right-0 h-[35%] bg-gradient-to-t from-black/40 via-black/10 to-transparent pointer-events-none z-10"></div>
  </div>`;

html = html.replace(oldLockscreenBg, newLockscreenBg);
fs.writeFileSync('index.html', html);
console.log("Fixed lockscreen fallback bg");
