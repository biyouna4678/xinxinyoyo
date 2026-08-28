const fs = require('fs');
let indexHtml = fs.readFileSync('index.html', 'utf8');

indexHtml = indexHtml.replace(
  '<div class="w-full backdrop-blur-xl border border-white/40 rounded-[28px] p-2.5 shadow-ins-dock flex items-center justify-around" style="background-color: color-mix(in srgb, var(--theme-accent) 30%, transparent);">',
  '<div class="w-full bg-white/20 backdrop-blur-xl border border-white/40 rounded-[28px] p-2.5 shadow-ins-dock flex items-center justify-around">'
);

fs.writeFileSync('index.html', indexHtml);
console.log("Dock fixed");
