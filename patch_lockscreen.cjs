const fs = require('fs');

let content = fs.readFileSync('js/lockscreen.js', 'utf8');

// Update init() to call syncWithGlobalConfig() and add event listener
content = content.replace(/init\(\) \{([\s\S]*?)updateClock\(\);([\s\S]*?)\},/, `init() {
          this.syncWithGlobalConfig();
          window.addEventListener('beautifyConfigChanged', () => {
              this.syncWithGlobalConfig();
          });
          this.updateClock();$2},

        syncWithGlobalConfig() {
            const config = loadConfig();
            const activeScheme = getActiveWallpaperScheme(config);
            if (activeScheme) {
                this.settings.wallpaper = activeScheme.lockscreen;
                this.clockColor = activeScheme.textColor === 'black' ? '#000000' : '#FFFFFF';
            }
        },`);

fs.writeFileSync('js/lockscreen.js', content);
console.log("Patched lockscreen.js");
