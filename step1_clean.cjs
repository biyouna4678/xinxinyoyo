const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Revert HTML/body background
const oldCss = `    html, body {
      position: fixed;
      inset: 0;
      width: 100%;
      height: 100%;
      height: 100dvh;
      margin: 0;
      padding: 0;
      background: #1c1c1e;
      overflow: hidden;
      overscroll-behavior: none;
    }`;

const newCss = `    html, body {
      margin: 0;
      background-color: #BCBCBC; /* desktop grey fallback */
      overflow: hidden;
    }
    body {
      min-height: 100vh;
      min-height: -webkit-fill-available;
    }
    /* iOS Safari Fullscreen Safe bg */
    .fullscreen-bg {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      min-height: -webkit-fill-available;
      background-size: cover;
      background-position: center;
      z-index: 0;
    }`;

html = html.replace(oldCss, newCss);

// Remove specific Tailwind classes added previously that mess with this
// 2. Lockscreen
html = html.replace(
    /class="fixed top-0 left-0 w-\[100vw\] h-\[100dvh\] z-\[9999\] bg-black/g,
    'class="fixed top-0 left-0 w-full h-full min-h-[-webkit-fill-available] z-[9999] bg-transparent'
);

html = html.replace(
    /<div class="absolute top-0 left-0 w-full h-full z-0 default-grey-wallpaper bg-\[#1c1c1e\]">/g,
    '<div class="fullscreen-bg bg-[#BCBCBC]">'
);

// 3. Desktop
html = html.replace(
    /<div class="fixed top-0 left-0 w-\[100vw\] h-\[100dvh\] z-0 pointer-events-none bg-\[#1c1c1e\]">/g,
    '<div class="fullscreen-bg pointer-events-none bg-[#BCBCBC]">'
);

// 4. Manifest link
html = html.replace(
    /<link rel="manifest" href="\/manifest.webmanifest\?v=3">/g,
    '<link rel="manifest" href="/manifest.webmanifest">'
);

fs.writeFileSync('index.html', html);
console.log("Cleaned up old hacks");
