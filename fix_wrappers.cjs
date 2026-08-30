const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Lockscreen wrapper
html = html.replace(
    /<div class="relative z-10 h-full flex flex-col justify-between pt-\[max\(3.5rem,calc\(env\(safe-area-inset-top,0px\)\+1.5rem\)\)\]/g,
    '<div class="absolute inset-0 z-10 flex flex-col justify-between pt-[max(3.5rem,calc(env(safe-area-inset-top,0px)+1.5rem))]'
);

// Desktop wrapper
html = html.replace(
    /<div class="relative z-10 h-full flex flex-col justify-between pt-\[max\(4.5rem,calc\(env\(safe-area-inset-top,20px\)\+2.5rem\)\)\]/g,
    '<div class="absolute inset-0 z-10 flex flex-col justify-between pt-[max(4.5rem,calc(env(safe-area-inset-top,20px)+2.5rem))]'
);

fs.writeFileSync('index.html', html);
console.log("Fixed wrappers");
