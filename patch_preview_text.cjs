const fs = require('fs');

let indexHtml = fs.readFileSync('index.html', 'utf8');

indexHtml = indexHtml.replace(
  '<h2 class="font-serif text-[16px] font-semibold text-text-main">壁纸 Preview</h2>',
  '<h2 class="font-serif text-[16px] font-semibold text-text-main">壁纸</h2>'
);

fs.writeFileSync('index.html', indexHtml);
console.log("preview text removed");
