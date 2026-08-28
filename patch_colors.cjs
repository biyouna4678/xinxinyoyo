const fs = require('fs');

let indexHtml = fs.readFileSync('index.html', 'utf8');

const replacement = `colors: {
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
          }`;

indexHtml = indexHtml.replace(/colors:\s*\{[\s\S]*?iconFg:\s*'#FFFFFF'\s*\}/, replacement);
fs.writeFileSync('index.html', indexHtml);
console.log("Colors patched");
