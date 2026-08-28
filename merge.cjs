const fs = require('fs');

let indexHtml = fs.readFileSync('index.html', 'utf8');

// 1. Update tailwind.config
const tailwindColors = `
            'glass': 'rgba(255, 255, 255, 0.35)',
            'glass-border': 'rgba(255, 255, 255, 0.5)',
            'iconFg': '#FFFFFF',
            'page-bg': '#F7F7F7',
            'card-bg': '#FFFFFF',
            'icon-bg': '#F7F7F7',
            'text-group': '#121212',
            'text-main': '#1A1A1A',
            'text-title': '#2C2C2C',
            'text-sub': '#666666',
            'text-muted': '#999999',
            'text-ghost': '#C0C0C0'
`;
indexHtml = indexHtml.replace(/colors:\s*\{[\s\S]*?'iconFg': '#FFFFFF'\s*\}/, `colors: {${tailwindColors}}`);

const tailwindFonts = `
          fontFamily: {
            serif: ['"Noto Serif SC"', 'Source Han Serif SC', 'serif'],
            sans: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', '"SF Pro Text"', 'Inter', 'sans-serif'],
            cursive: ['"Playfair Display"', 'serif']
          }
`;
indexHtml = indexHtml.replace(/fontFamily:\s*\{[\s\S]*?sans:.*?\}\s*,/, tailwindFonts + ',');

const tailwindShadows = `
          boxShadow: {
            'matte-card': '0 2px 6px rgba(0, 0, 0, 0.05)',
            'ins-dock': '0 4px 16px rgba(0, 0, 0, 0.06)',
            'drag': '0 8px 20px rgba(0, 0, 0, 0.12)',
            'card': '0px 4px 20px rgba(0, 0, 0, 0.03)',
            'preview': '0px 8px 24px rgba(0, 0, 0, 0.08)'
          }
`;
indexHtml = indexHtml.replace(/boxShadow:\s*\{[\s\S]*?'drag': '0 8px 20px rgba\(0, 0, 0, 0.12\)',\s*\}/, tailwindShadows);

// 2. Add beautify script in head
indexHtml = indexHtml.replace('</head>', '  <script src="js/beautify.js"></script>\n</head>');
// Add Playfair font
indexHtml = indexHtml.replace('</head>', '  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,600;1,700&display=swap" rel="stylesheet">\n</head>');


// 3. Prepare Beautify Body
let beautifyBody = fs.readFileSync('beautify_body.html', 'utf8');

// Strip out body tags and wrap in a layer
beautifyBody = beautifyBody.replace(/<body[\s\S]*?>/, '');
beautifyBody = beautifyBody.replace('</body>', '');
// Replace the button onclick to close
beautifyBody = beautifyBody.replace(/onclick="window\.location\.href='index\.html\?skipLock=true'"/, 'x-on:click="isOpen = false"');
// Note: In case the old button is still there:
beautifyBody = beautifyBody.replace(/onclick="window\.location\.href='index\.html'"/, 'x-on:click="isOpen = false"');

const wrapper = `
<!-- ================= BEAUTIFY APP LAYER ================= -->
<div id="beautify-layer" x-data="beautifyApp()" x-show="isOpen" style="display: none;"
     class="fixed inset-0 z-[10000] w-screen h-screen overflow-hidden bg-page-bg text-text-main"
     x-transition:enter="transition ease-out duration-300"
     x-transition:enter-start="opacity-0 translate-y-full"
     x-transition:enter-end="opacity-100 translate-y-0"
     x-transition:leave="transition ease-in duration-200"
     x-transition:leave-start="opacity-100 translate-y-0"
     x-transition:leave-end="opacity-0 translate-y-full"
     @open-beautify.window="isOpen = true"
>
${beautifyBody}
</div>
</body>`;

indexHtml = indexHtml.replace('</body>', wrapper);

// Save index.html
fs.writeFileSync('index.html', indexHtml);

// 4. Update desktop.js
let desktopJs = fs.readFileSync('js/desktop.js', 'utf8');
desktopJs = desktopJs.replace(/window\.location\.href\s*=\s*'beautify\.html';/, "window.dispatchEvent(new CustomEvent('open-beautify'));");
fs.writeFileSync('js/desktop.js', desktopJs);

// 5. Update beautify.js
let beautifyJs = fs.readFileSync('js/beautify.js', 'utf8');
beautifyJs = beautifyJs.replace(/currentTab: 'home',/, "currentTab: 'home',\n        isOpen: false,");
// Also handle back navigation if there are any other hrefs
beautifyJs = beautifyJs.replace(/window\.location\.href\s*=\s*'index\.html';/g, 'this.isOpen = false;');
fs.writeFileSync('js/beautify.js', beautifyJs);

console.log("Merged beautify into index.html");
