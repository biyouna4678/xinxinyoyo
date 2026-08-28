const fs = require('fs');

function addAnimation(filename, bgColor) {
    let content = fs.readFileSync(filename, 'utf8');
    if (!content.includes('fadeInNav')) {
        const style = `<style>
    body {
      background-color: ${bgColor};
      animation: fadeInNav 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    @keyframes fadeInNav {
      from { opacity: 0; transform: scale(0.98); }
      to { opacity: 1; transform: scale(1); }
    }
  </style>
</head>`;
        content = content.replace('</head>', style);
        fs.writeFileSync(filename, content);
        console.log("Added animation to " + filename);
    }
}

addAnimation('index.html', '#111111');
addAnimation('beautify.html', '#F7F7F7');
