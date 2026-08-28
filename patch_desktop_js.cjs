const fs = require('fs');
let code = fs.readFileSync('js/desktop.js', 'utf8');

// Replace desktopSettings state
code = code.replace(
    `desktopSettings: { wallpaperUrl: '', isBlurred: false, textColor: 'white' },`,
    `desktopSettings: { wallpaperUrl: '', isBlurred: false, textColor: 'white', filterStyle: '' },`
);

// Replace syncWithGlobalConfig logic
const oldLogic = `                if (activeScheme.desktop) {
                    this.desktopSettings.wallpaperUrl = activeScheme.desktop;
                    this.desktopSettings.isBlurred = false;
                } else if (activeScheme.lockscreen) {
                    this.desktopSettings.wallpaperUrl = activeScheme.lockscreen;
                    this.desktopSettings.isBlurred = true;
                } else {
                    this.desktopSettings.wallpaperUrl = '';
                    this.desktopSettings.isBlurred = false;
                }`;

const newLogic = `                // 智能特效解析
                const useLockscreenFallback = !activeScheme.desktop;
                const url = activeScheme.desktop || activeScheme.lockscreen;
                
                // 处理 Blur (默认25，如果显式设置则跟随设置)
                let blur = activeScheme.blur;
                if (useLockscreenFallback && (blur === undefined || blur === 0)) {
                    blur = 25; // 缺省使用高斯模糊锁屏
                } else if (!blur) {
                    blur = 0;
                }
                const blurPx = Math.round(blur * 0.15); // 按照 V2 算法转换
                
                // 处理 Saturation
                const sat = activeScheme.saturation !== undefined ? activeScheme.saturation : 100;
                
                // 处理 Vignette (如果需要在 desktop.js 处理，但可以通过 CSS 叠加，不过原逻辑中 filter: blur(40px))
                // V2 中桌面和锁屏使用统一 filter，不过缩放可以根据是否有 blur 来决定
                const filterStr = \`blur(\${blurPx}px) saturate(\${sat}%)\`;

                this.desktopSettings.wallpaperUrl = url || '';
                this.desktopSettings.isBlurred = blur > 0;
                this.desktopSettings.filterStyle = filterStr;`;

code = code.replace(oldLogic, newLogic);
fs.writeFileSync('js/desktop.js', code);
console.log("desktop.js patched");
