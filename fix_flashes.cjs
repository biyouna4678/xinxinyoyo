const fs = require('fs');

// Fix index.html
let index = fs.readFileSync('index.html', 'utf8');
index = index.replace(/<style>[\s\S]*?<\/style>/, `<style>
    html { background-color: #111111; }
    body {
      background-color: #111111;
      animation: fadeInNav 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    @keyframes fadeInNav {
      from { opacity: 0; transform: scale(0.98); }
      to { opacity: 1; transform: scale(1); }
    }
    html.skip-lock #lockscreen-layer { display: none !important; }
  </style>
  <script>
    if (window.location.search.includes('skipLock=true')) {
      document.documentElement.classList.add('skip-lock');
    }
  </script>`);
fs.writeFileSync('index.html', index);

// Fix beautify.html
let beautify = fs.readFileSync('beautify.html', 'utf8');
beautify = beautify.replace(/<style>[\s\S]*?<\/style>/, `<style>
    html { background-color: #F7F7F7; }
    body {
      background-color: #F7F7F7;
      animation: fadeInNav 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    @keyframes fadeInNav {
      from { opacity: 0; transform: scale(0.98); }
      to { opacity: 1; transform: scale(1); }
    }
  </style>`);
fs.writeFileSync('beautify.html', beautify);

console.log("Flashes fixed");
