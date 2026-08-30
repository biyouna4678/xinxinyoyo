const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Revert h-[100dvh] back to inset-0 for fixed layers
html = html.replace(
    /class="fixed top-0 left-0 w-full h-\[100dvh\] z-\[9999\]/g,
    'class="fixed inset-0 z-[9999]'
);

html = html.replace(
    /<div class="absolute top-0 left-0 w-full h-\[100dvh\] z-0 default-grey-wallpaper/g,
    '<div class="absolute inset-0 z-0 default-grey-wallpaper'
);

html = html.replace(
    /<div class="fixed top-0 left-0 w-full h-\[100dvh\] z-0 pointer-events-none bg-\[#1c1c1e\]">/g,
    '<div class="fixed inset-0 z-0 pointer-events-none bg-[#1c1c1e]">'
);

// Revert the absolute children
html = html.replace(
    /<div class="absolute top-0 left-0 w-full h-\[100dvh\] bg-cover bg-center/g,
    '<div class="absolute inset-0 bg-cover bg-center'
);
html = html.replace(
    /<div class="absolute top-0 left-0 w-full h-\[100dvh\] pointer-events-none transition-opacity/g,
    '<div class="absolute inset-0 pointer-events-none transition-opacity'
);
html = html.replace(
    /<div class="absolute top-0 left-0 w-full h-\[100dvh\] bg-gradient-to-b/g,
    '<div class="absolute inset-0 bg-gradient-to-b'
);
html = html.replace(
    /<div class="absolute top-0 left-0 w-full h-\[100dvh\] z-0">/g,
    '<div class="absolute inset-0 z-0">'
);

fs.writeFileSync('index.html', html);
console.log("Restored inset-0");
