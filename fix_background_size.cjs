const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Replace inset-0 with explicit 100vw/100dvh on the background containers
html = html.replace(
    /class="fixed inset-0 z-\[9999\]/g,
    'class="fixed top-0 left-0 w-[100vw] h-[100dvh] z-[9999]'
);

html = html.replace(
    /<div class="absolute inset-0 z-0 default-grey-wallpaper/g,
    '<div class="absolute top-0 left-0 w-full h-full z-0 default-grey-wallpaper'
);

html = html.replace(
    /<div class="fixed inset-0 z-0 pointer-events-none bg-\[#1c1c1e\]">/g,
    '<div class="fixed top-0 left-0 w-[100vw] h-[100dvh] z-0 pointer-events-none bg-[#1c1c1e]">'
);

fs.writeFileSync('index.html', html);
console.log("Updated background layer sizes to w-[100vw] h-[100dvh]");
