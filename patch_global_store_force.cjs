const fs = require('fs');
let code = fs.readFileSync('js/global-store.js', 'utf8');

const oldLogic = `function loadConfig() {
    const saved = localStorage.getItem('beautifyConfig');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);`;

const newLogic = `function loadConfig() {
    const saved = localStorage.getItem('beautifyConfig');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            
            // 强制修复坏掉的图片链接
            if (parsed && parsed.schemes) {
                parsed.schemes.forEach(s => {
                    if (s.lockscreen === 'https://i.ibb.co/S4zFkqpx/IMG-5625.jpg') {
                        s.lockscreen = 'https://i.ibb.co/dsrzbzZF/IMG-5707.jpg';
                    }
                });
            }
`;

code = code.replace(oldLogic, newLogic);
fs.writeFileSync('js/global-store.js', code);
console.log("global-store patched for broken link");
