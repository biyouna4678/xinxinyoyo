const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const oldCss = `    html, body {
      margin: 0;
      background-color: #BCBCBC; /* desktop grey fallback */
      overflow: hidden;
    }`;

const newCss = `    html, body {
      margin: 0;
      width: 100%;
      height: 100%;
      background-color: #BCBCBC; /* desktop grey fallback */
      overflow: hidden;
    }`;

html = html.replace(oldCss, newCss);
fs.writeFileSync('index.html', html);
console.log("Fixed height css");
