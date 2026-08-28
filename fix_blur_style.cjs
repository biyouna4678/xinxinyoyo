const fs = require('fs');
let indexHtml = fs.readFileSync('index.html', 'utf8');

const target = `<template x-if="desktopSettings && desktopSettings.wallpaperUrl">
      <div class="absolute inset-0 bg-cover bg-center transition-all duration-500"
           :class="desktopSettings.isBlurred ? 'scale-110' : ''"
           :style="\`background-image: url('\${desktopSettings.wallpaperUrl}');\`"></div>
    </template>`;

const replacement = `<template x-if="desktopSettings && desktopSettings.wallpaperUrl">
      <div class="absolute inset-0 bg-cover bg-center transition-all duration-500"
           :class="desktopSettings.isBlurred ? 'scale-125' : ''"
           :style="desktopSettings.isBlurred ? \`background-image: url('\${desktopSettings.wallpaperUrl}'); filter: blur(40px); transform: scale(1.15);\` : \`background-image: url('\${desktopSettings.wallpaperUrl}');\`"></div>
    </template>`;

indexHtml = indexHtml.replace(target, replacement);
fs.writeFileSync('index.html', indexHtml);
console.log('patched blur');
