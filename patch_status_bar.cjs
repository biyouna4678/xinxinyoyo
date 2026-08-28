const fs = require('fs');

let indexHtml = fs.readFileSync('index.html', 'utf8');

indexHtml = indexHtml.replace(
  '<div class="absolute top-0 left-0 right-0 z-40 pt-3.5 px-7 flex items-center justify-between text-white font-sans drop-shadow-sm">',
  '<div id="desktop-status-bar" class="absolute top-0 left-0 right-0 z-40 pt-3.5 px-7 flex items-center justify-between text-white font-sans drop-shadow-sm transition-colors">'
);

indexHtml = indexHtml.replace(
  '<div class="flex items-center gap-2 text-white">',
  '<div class="flex items-center gap-2 text-white transition-colors">'
);

fs.writeFileSync('index.html', indexHtml);
console.log("status bar patched");
