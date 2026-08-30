const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Lockscreen layer
html = html.replace(
    /class="fixed inset-0 z-\[9999\]/g,
    'class="fixed top-0 left-0 w-full h-[100dvh] z-[9999]'
);

// Lockscreen wallpaper
html = html.replace(
    /<div class="absolute inset-0 z-0 default-grey-wallpaper/g,
    '<div class="absolute top-0 left-0 w-full h-[100dvh] z-0 default-grey-wallpaper'
);

// Desktop background layer
html = html.replace(
    /<div class="fixed inset-0 z-0 pointer-events-none bg-\[#1c1c1e\]">/g,
    '<div class="fixed top-0 left-0 w-full h-[100dvh] z-0 pointer-events-none bg-[#1c1c1e]">'
);

fs.writeFileSync('index.html', html);
console.log("Applied h-[100dvh] to fixed layers");
