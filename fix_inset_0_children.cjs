const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(
    /<div class="absolute inset-0 bg-cover bg-center/g,
    '<div class="absolute top-0 left-0 w-full h-[100dvh] bg-cover bg-center'
);

html = html.replace(
    /<div class="absolute inset-0 pointer-events-none transition-opacity/g,
    '<div class="absolute top-0 left-0 w-full h-[100dvh] pointer-events-none transition-opacity'
);

html = html.replace(
    /<div class="absolute inset-0 bg-gradient-to-b/g,
    '<div class="absolute top-0 left-0 w-full h-[100dvh] bg-gradient-to-b'
);

// And lockscreen inner:
html = html.replace(
    /<div class="absolute inset-0 z-0">/g,
    '<div class="absolute top-0 left-0 w-full h-[100dvh] z-0">'
);

fs.writeFileSync('index.html', html);
console.log("Applied w-full h-[100dvh] to child absolute layers");
