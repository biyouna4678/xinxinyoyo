const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Remove padding-bottom from body
html = html.replace('      padding-bottom: env(safe-area-inset-bottom);\n', '');
html = html.replace('      box-sizing: border-box;\n', '');

// 2. Restore padding to desktop main layout
html = html.replace(
    'pb-3 px-4 app-pop-in"',
    'pb-[max(0.75rem,calc(env(safe-area-inset-bottom,0px)+0.5rem))] px-4 app-pop-in"'
);

// Lockscreen was already restored in my previous script (fix_lockscreen_padding.cjs). Let's double check.
if (!html.includes('pb-[max(1.25rem,calc(env(safe-area-inset-bottom,0px)+0.75rem))] px-5')) {
    html = html.replace(
        'pb-5 px-5 transition-all duration-300 transform"',
        'pb-[max(1.25rem,calc(env(safe-area-inset-bottom,0px)+0.75rem))] px-5 transition-all duration-300 transform"'
    );
}

fs.writeFileSync('index.html', html);
console.log("Restored padding logic");
