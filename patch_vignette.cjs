const fs = require('fs');
let code = fs.readFileSync('js/desktop.js', 'utf8');

// Replace desktopSettings definition
code = code.replace(
    `desktopSettings: { wallpaperUrl: '', isBlurred: false, textColor: 'white', filterStyle: '' },`,
    `desktopSettings: { wallpaperUrl: '', isBlurred: false, textColor: 'white', filterStyle: '', vignette: 0 },`
);

// Replace syncWithGlobalConfig logic
const oldLogic = `                const filterStr = \`blur(\${blurPx}px) saturate(\${sat}%)\`;

                this.desktopSettings.wallpaperUrl = url || '';
                this.desktopSettings.isBlurred = blur > 0;
                this.desktopSettings.filterStyle = filterStr;`;

const newLogic = `                const filterStr = \`blur(\${blurPx}px) saturate(\${sat}%)\`;

                this.desktopSettings.wallpaperUrl = url || '';
                this.desktopSettings.isBlurred = blur > 0;
                this.desktopSettings.filterStyle = filterStr;
                this.desktopSettings.vignette = activeScheme.vignette || 0;`;

code = code.replace(oldLogic, newLogic);
fs.writeFileSync('js/desktop.js', code);
console.log("desktop.js patched for vignette");
