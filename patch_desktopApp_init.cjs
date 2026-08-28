const fs = require('fs');

let content = fs.readFileSync('js/desktop.js', 'utf8');

// Add settings to desktopApp state
content = content.replace(/currentTime: '14:01',/, `currentTime: '14:01',
        desktopSettings: { wallpaperUrl: '', isBlurred: false },`);

// Update init() and add syncWithGlobalConfig()
content = content.replace(/init\(\) \{([\s\S]*?)initGrid\(\);([\s\S]*?)\},/, `init() {
          this.syncWithGlobalConfig();
          window.addEventListener('beautifyConfigChanged', () => {
              this.syncWithGlobalConfig();
          });
          this.updateClock();
          setInterval(() => this.updateClock(), 1000);
          this.initGrid();$2},

        syncWithGlobalConfig() {
            const config = typeof loadConfig === 'function' ? loadConfig() : null;
            if (!config) return;
            const activeScheme = typeof getActiveWallpaperScheme === 'function' ? getActiveWallpaperScheme(config) : null;
            if (activeScheme) {
                if (activeScheme.desktop) {
                    this.desktopSettings.wallpaperUrl = activeScheme.desktop;
                    this.desktopSettings.isBlurred = false;
                } else if (activeScheme.lockscreen) {
                    this.desktopSettings.wallpaperUrl = activeScheme.lockscreen;
                    this.desktopSettings.isBlurred = true;
                } else {
                    this.desktopSettings.wallpaperUrl = '';
                    this.desktopSettings.isBlurred = false;
                }
            }
        },`);

fs.writeFileSync('js/desktop.js', content);
console.log("Patched desktopApp init in desktop.js");
