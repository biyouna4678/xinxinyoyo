const fs = require('fs');
let indexHtml = fs.readFileSync('index.html', 'utf8');

indexHtml = indexHtml.replace(
  '<span class="text-[11px] font-serif text-white tracking-tight pointer-events-none font-medium truncate max-w-[64px] text-center"',
  '<span class="text-[11px] font-serif text-white tracking-tight pointer-events-none font-medium truncate max-w-[64px] text-center drop-shadow-md"'
);

fs.writeFileSync('index.html', indexHtml);
console.log("drop shadow added");
