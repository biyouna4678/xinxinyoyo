const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const oldTemplate = `<template x-if="desktopSettings && desktopSettings.wallpaperUrl">
      <div class="absolute inset-0 bg-cover bg-center transition-all duration-500"
           :class="desktopSettings.isBlurred ? 'scale-110' : ''"
           :style="\`background-image: url('\${desktopSettings.wallpaperUrl}'); filter: \${desktopSettings.filterStyle};\`"></div>
    </template>`;

const newTemplate = `<template x-if="desktopSettings && desktopSettings.wallpaperUrl">
      <div>
          <div class="absolute inset-0 bg-cover bg-center transition-all duration-500"
               :class="desktopSettings.isBlurred ? 'scale-110' : ''"
               :style="\`background-image: url('\${desktopSettings.wallpaperUrl}'); filter: \${desktopSettings.filterStyle};\`"></div>
          <div class="absolute inset-0 pointer-events-none transition-opacity duration-500"
               :style="\`background: radial-gradient(circle, transparent 40%, rgba(0,0,0,\${desktopSettings.vignette / 100}) 120%);\`"></div>
      </div>
    </template>`;

html = html.replace(oldTemplate, newTemplate);
fs.writeFileSync('index.html', html);
console.log("index.html vignette patched");
