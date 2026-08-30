const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Lockscreen layer to fixed inset-0
html = html.replace(
    /class="absolute top-0 left-0 w-full h-full z-\[9999\]/g,
    'class="fixed inset-0 z-[9999]'
);
html = html.replace(
    /class="absolute inset-0 w-full h-full z-\[9999\]/g, // just in case
    'class="fixed inset-0 z-[9999]'
);

// 2. Lockscreen wallpaper to absolute inset-0 (it's inside the fixed layer)
html = html.replace(
    /<div class="absolute top-0 left-0 w-full h-full z-0 default-grey-wallpaper/g,
    '<div class="absolute inset-0 z-0 default-grey-wallpaper'
);

// 3. Desktop background layer to fixed inset-0
html = html.replace(
    /<div class="absolute inset-0 z-0 pointer-events-none bg-\[#1c1c1e\]">/g,
    '<div class="fixed inset-0 z-0 pointer-events-none bg-[#1c1c1e]">'
);

// 4. Desktop main layout - make sure it spans the viewport height properly if body is problematic
// Actually, let's just make sure body has no height restriction from HTML
html = html.replace(
    /html, body \{\n\s*height: 100%;/g,
    'html, body {\n      min-height: 100%;\n      height: auto;'
);

fs.writeFileSync('index.html', html);
console.log("Applied fixed inset-0 fixes");
