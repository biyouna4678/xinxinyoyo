const fs = require('fs');

// Desktop
let desktopCode = fs.readFileSync('js/desktop.js', 'utf8');
desktopCode = desktopCode.replace(
    /desktopSettings: \{ wallpaperUrl: '', isBlurred: false, textColor: 'white' \}/g,
    "desktopSettings: { wallpaperUrl: '', isBlurred: false, textColor: 'white', filterStyle: '', vignetteOpacity: 0 }"
);
const newDesktopSync = `syncWithGlobalConfig() {
            const config = typeof loadConfig === 'function' ? loadConfig() : null;
            if (!config) return;
            const activeScheme = typeof getActiveScheme === 'function' ? getActiveScheme(config) : getActiveWallpaperScheme(config);
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
                
                if (typeof getSchemeFilter === 'function') {
                    this.desktopSettings.filterStyle = getSchemeFilter(activeScheme, true);
                    this.desktopSettings.vignetteOpacity = getVignetteOpacity(activeScheme);
                }

                this.desktopSettings.textColor = activeScheme.textColor || 'white';
                this.updateThemeColor();
            }
        },`;

let desktopRegex = /syncWithGlobalConfig\(\) \{[\s\S]*?this\.updateThemeColor\(\);\s*\}\s*\},\s*/;
if (desktopCode.match(desktopRegex)) {
    desktopCode = desktopCode.replace(desktopRegex, newDesktopSync + '\n        ');
}
fs.writeFileSync('js/desktop.js', desktopCode);

// Lockscreen
let lockCode = fs.readFileSync('js/lockscreen.js', 'utf8');
lockCode = lockCode.replace(
    /settings: \{\s*wallpaper: '',\s*widgets: \[\],\s*showLunar: true\s*\}/g,
    "settings: {\n                wallpaper: '',\n                filterStyle: '',\n                vignetteOpacity: 0,\n                widgets: [],\n                showLunar: true\n            }"
);

const newLockSync = `loadSettings() {
            const config = typeof loadConfig === 'function' ? loadConfig() : null;
            if (!config) return;
            const activeScheme = typeof getActiveScheme === 'function' ? getActiveScheme(config) : getActiveWallpaperScheme(config);
            if (activeScheme) {
                this.settings.wallpaper = activeScheme.lockscreen;
                this.clockColor = activeScheme.textColor === 'black' ? '#000000' : '#FFFFFF';
                
                if (typeof getSchemeFilter === 'function') {
                    this.settings.filterStyle = getSchemeFilter(activeScheme, false);
                    this.settings.vignetteOpacity = getVignetteOpacity(activeScheme);
                }
            }
        },`;
let lockRegex = /loadSettings\(\) \{[\s\S]*?this\.clockColor = activeScheme\.textColor === 'black' \? '#000000' : '#FFFFFF';\s*\}\s*\},/;
if (lockCode.match(lockRegex)) {
    lockCode = lockCode.replace(lockRegex, newLockSync);
}
fs.writeFileSync('js/lockscreen.js', lockCode);

console.log('patched desktop.js and lockscreen.js');
