const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Desktop
const oldDesktopBg = `<template x-if="desktopSettings && desktopSettings.wallpaperUrl">
      <div class="absolute inset-0 bg-cover bg-center transition-all duration-500"
           :class="desktopSettings.isBlurred ? 'scale-125' : ''"
           :style="desktopSettings.isBlurred ? \`background-image: url('\${desktopSettings.wallpaperUrl}'); filter: blur(40px); transform: scale(1.15);\` : \`background-image: url('\${desktopSettings.wallpaperUrl}');\`"></div>
    </template>`;
const newDesktopBg = `<template x-if="desktopSettings && desktopSettings.wallpaperUrl">
      <div>
          <div class="absolute inset-0 bg-cover bg-center transition-all duration-500"
               :class="desktopSettings.isBlurred ? 'scale-110' : ''"
               :style="\`background-image: url('\${desktopSettings.wallpaperUrl}'); filter: \${desktopSettings.filterStyle};\`"></div>
          <div class="absolute inset-0 pointer-events-none transition-opacity duration-500"
               :style="\`background: radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,\${desktopSettings.vignetteOpacity}) 100%);\`"></div>
      </div>
    </template>`;

html = html.replace(oldDesktopBg, newDesktopBg);

// Lockscreen
const oldLockBg = `<template x-if="settings.wallpaper">
      <div class="absolute inset-0 bg-cover bg-center transition-opacity duration-300" :style="\`background-image: url('\${settings.wallpaper}')\`"></div>
    </template>`;
const newLockBg = `<template x-if="settings.wallpaper">
      <div>
          <div class="absolute inset-0 bg-cover bg-center transition-all duration-300" 
               :style="\`background-image: url('\${settings.wallpaper}'); filter: \${settings.filterStyle || 'none'};\`"></div>
          <div class="absolute inset-0 pointer-events-none transition-opacity duration-300"
               :style="\`background: radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,\${settings.vignetteOpacity || 0}) 100%);\`"></div>
      </div>
    </template>`;

html = html.replace(oldLockBg, newLockBg);
fs.writeFileSync('index.html', html);
console.log('patched index bg');
