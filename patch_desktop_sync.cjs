const fs = require('fs');
let code = fs.readFileSync('js/desktop.js', 'utf8');

const oldSync = `                if (activeScheme.desktop) {
                    this.desktopSettings.wallpaperUrl = activeScheme.desktop;
                    this.desktopSettings.isBlurred = false;
                } else if (activeScheme.lockscreen) {
                    this.desktopSettings.wallpaperUrl = activeScheme.lockscreen;
                    this.desktopSettings.isBlurred = true;
                } else {
                    this.desktopSettings.wallpaperUrl = '';
                    this.desktopSettings.isBlurred = false;
                }`;

const newSync = `                if (activeScheme.desktop) {
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
                }`;

if (code.includes(oldSync)) {
    code = code.replace(oldSync, newSync);
    fs.writeFileSync('js/desktop.js', code);
    console.log('patched desktop sync');
} else {
    console.log('old sync not found');
}
