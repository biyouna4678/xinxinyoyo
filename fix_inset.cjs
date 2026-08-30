const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Lockscreen layer
html = html.replace('id="lockscreen-layer" x-data="lockScreenApp()" x-show="!unlocked"\n       class="fixed inset-0', 'id="lockscreen-layer" x-data="lockScreenApp()" x-show="!unlocked"\n       class="fixed top-0 left-0 w-full h-[100dvh]');

// Desktop layer
html = html.replace('<div class="absolute inset-0 z-0 pointer-events-none bg-[#BCBCBC]">', '<div class="absolute top-0 left-0 w-full h-[100dvh] z-0 pointer-events-none bg-[#1c1c1e]">');

// Desktop wallpaper wrapper
html = html.replace('<div class="absolute inset-0 bg-cover bg-center transition-all duration-500"', '<div class="absolute top-0 left-0 w-full h-full bg-cover bg-center transition-all duration-500"');
html = html.replace('<div class="absolute inset-0 pointer-events-none transition-opacity duration-500"', '<div class="absolute top-0 left-0 w-full h-full pointer-events-none transition-opacity duration-500"');
html = html.replace('<div class="absolute inset-0 bg-gradient-to-b from-[#e8eaec] via-[#d5d7da] to-[#b5b8bc]"></div>', '<div class="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#e8eaec] via-[#d5d7da] to-[#b5b8bc]"></div>');

fs.writeFileSync('index.html', html);
console.log("Fixed layer positioning");
