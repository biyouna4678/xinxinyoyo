const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Set theme-color to a dark grey/black
html = html.replace('<meta name="theme-color" content="#F7F7F7">', '<meta name="theme-color" content="#1c1c1e">');

// Restore body height and use absolute/fixed correctly
html = html.replace('<body class="bg-[#1c1c1e] text-main fixed inset-0 w-full  overflow-hidden', '<body class="bg-[#1c1c1e] text-main fixed inset-0 w-full h-[100dvh] overflow-hidden');

fs.writeFileSync('index.html', html);
console.log("Fixed viewport and theme-color");
