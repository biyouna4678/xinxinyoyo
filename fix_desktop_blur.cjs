const fs = require('fs');
let desktopJs = fs.readFileSync('js/desktop.js', 'utf8');

const targetStr = `} else if (activeScheme.lockscreen) {
                    this.desktopSettings.wallpaperUrl = activeScheme.lockscreen;
                    this.desktopSettings.isBlurred = false;
                }`;

const replacementStr = `} else if (activeScheme.lockscreen) {
                    this.desktopSettings.wallpaperUrl = activeScheme.lockscreen;
                    this.desktopSettings.isBlurred = true;
                }`;

desktopJs = desktopJs.replace(targetStr, replacementStr);
fs.writeFileSync('js/desktop.js', desktopJs);
console.log("Restored isBlurred = true");
