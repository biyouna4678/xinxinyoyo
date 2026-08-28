const fs = require('fs');

function addStorageListener(file) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/window\.addEventListener\('beautifyConfigChanged', \(\) => \{[\s\S]*?this\.syncWithGlobalConfig\(\);\s*\}\);/g, 
        `window.addEventListener('beautifyConfigChanged', () => {
              this.syncWithGlobalConfig();
          });
          window.addEventListener('storage', (e) => {
              if (e.key === 'beautifyConfig' || e.key === 'BeautifyGlobalConfig') {
                  this.syncWithGlobalConfig();
              }
          });`);
    fs.writeFileSync(file, content);
}

addStorageListener('js/lockscreen.js');
addStorageListener('js/desktop.js');
console.log("Added storage event listeners");
