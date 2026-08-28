const fs = require('fs');

let content = fs.readFileSync('js/desktop.js', 'utf8');

content = content.replace(/if \(activeScheme\) \{/, `if (activeScheme) {
                if (config.themeColor && typeof applyThemeColor === 'function') {
                    applyThemeColor(config.themeColor);
                }`);

fs.writeFileSync('js/desktop.js', content);
console.log("Patched desktop theme color sync");
