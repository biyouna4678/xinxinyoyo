const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace('<body class="text-main', '<body class="bg-[#1c1c1e] text-main');
html = html.replace('</head>', '  <style>html { background-color: #1c1c1e; }</style>\n</head>');
fs.writeFileSync('index.html', html);
console.log("Fixed body bg");
