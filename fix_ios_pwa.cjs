const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Change body classes and make it relative
// Currently: <body class="bg-[#1c1c1e] text-main fixed inset-0 w-full h-[100dvh] overflow-hidden select-none font-serif overscroll-none touch-manipulation"
html = html.replace(
    '<body class="bg-[#1c1c1e] text-main fixed inset-0 w-full h-[100dvh] overflow-hidden select-none font-serif overscroll-none touch-manipulation"',
    '<body class="text-main relative w-full overflow-hidden select-none font-serif overscroll-none touch-manipulation"'
);

// 2. Add global CSS in <head>
const css = `  <style>
    html, body {
      height: 100%;
      margin: 0;
      background: #1c1c1e;
    }
    body {
      min-height: 100vh;
      min-height: 100dvh;
      min-height: -webkit-fill-available;
      padding-bottom: env(safe-area-inset-bottom);
      box-sizing: border-box;
    }
  </style>`;
html = html.replace('</head>', css + '\n</head>');
html = html.replace('<style>html { background-color: #1c1c1e; }</style>', ''); // remove previous fix

// 3. Update lockscreen-layer to absolute h-full
html = html.replace(
    'class="fixed top-0 left-0 w-full h-[100dvh] z-[9999]',
    'class="absolute top-0 left-0 w-full h-full z-[9999]'
);

// 4. Update lockscreen main view padding
html = html.replace(
    'pb-[max(1.25rem,calc(env(safe-area-inset-bottom,0px)+0.75rem))]',
    'pb-5'
);

// 5. Update desktop background to h-full
html = html.replace(
    '<div class="absolute top-0 left-0 w-full h-[100dvh] z-0 pointer-events-none bg-[#1c1c1e]">',
    '<div class="absolute top-0 left-0 w-full h-full z-0 pointer-events-none bg-[#1c1c1e]">'
);

// 6. Update desktop main layout padding
html = html.replace(
    'pb-[max(0.75rem,calc(env(safe-area-inset-bottom,0px)+0.5rem))]',
    'pb-3'
);

fs.writeFileSync('index.html', html);
console.log("Applied PWA layout fixes");
