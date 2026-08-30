const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(
    'pb-5 px-5 transition-all duration-300 transform"',
    'pb-[max(1.25rem,calc(env(safe-area-inset-bottom,0px)+0.75rem))] px-5 transition-all duration-300 transform"'
);

fs.writeFileSync('index.html', html);
console.log("Restored lockscreen padding");
