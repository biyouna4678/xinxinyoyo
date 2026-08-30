const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const oldCss = `    html, body {
      min-height: 100%;
      height: auto;
      margin: 0;
      background: #1c1c1e;
    }
    body {
      min-height: 100vh;
      min-height: 100dvh;
      min-height: -webkit-fill-available;
    }`;

const newCss = `    html, body {
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

html = html.replace(oldCss, newCss);
fs.writeFileSync('index.html', html);
console.log("Updated HTML and Body CSS");
