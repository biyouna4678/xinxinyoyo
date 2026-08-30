const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Also update the inner layers of the backgrounds to ensure they don't use absolute top-0 left-0 w-full h-[100dvh]
html = html.replace(
    /<div class="absolute inset-0/g,
    '<div class="absolute top-0 left-0 w-full h-full"' // Use simpler absolute fill for children of fullscreen-bg
);
html = html.replace(
    /<div class="absolute top-0 left-0 w-full h-\[100dvh\]/g,
    '<div class="absolute top-0 left-0 w-full h-full"'
);


fs.writeFileSync('index.html', html);
console.log("Fixed children");
