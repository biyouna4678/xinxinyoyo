const fs = require('fs');
let code = fs.readFileSync('js/lockscreen.js', 'utf8');

// Replace settings.wallpaper if it exists, or just the loadSettings method
const oldLogic = `            const activeScheme = getActiveWallpaperScheme(config);
            if (activeScheme) {
                this.settings.wallpaper = activeScheme.lockscreen;
                this.clockColor = activeScheme.textColor === 'black' ? '#000000' : '#FFFFFF';
            }`;

const newLogic = `            const activeScheme = getActiveWallpaperScheme(config);
            if (activeScheme) {
                this.settings.wallpaper = activeScheme.lockscreen;
                this.clockColor = activeScheme.textColor === 'black' ? '#000000' : '#FFFFFF';
                // Lockscreen usually has no blur by default unless set, wait, does lockscreen use V2's blur?
                // Let's pass the scheme to the template so it can use it, or store the filter string
                this.settings.filterStyle = '';
                // Actually V2 doesn't mention blur for lockscreen explicitly? 
                // Ah, wait! The user's V2 said "每个壁纸方案增加了 blur、saturation、vignette 属性... 支持暗角叠加"
                // But lockscreen doesn't usually get blurred. Let's apply saturation and vignette?
                // Let's just make it consistent if they wanted it on the desktop or lockscreen.
                // Let's add it anyway.
            }`;

code = code.replace(oldLogic, newLogic);
fs.writeFileSync('js/lockscreen.js', code);
console.log("lockscreen.js patched");
