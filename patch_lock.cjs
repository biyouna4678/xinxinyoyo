const fs = require('fs');

let lockCode = fs.readFileSync('js/lockscreen.js', 'utf8');
lockCode = lockCode.replace(
    /settings: \{\s*wallpaper: null,\s*avatarUrl: '.*',\s*unlockMethod: 'pin',\s*correctPin: '123456' \/\/ 默认 6 位数密码\s*\}/g,
    "settings: {\n          wallpaper: null,\n          filterStyle: '',\n          vignetteOpacity: 0,\n          avatarUrl: 'https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAEYZslqcCTcQieeScfjSsdVHzqnzoHI9QACwSUAApvPgVeH3cYnfM_0nz0E.jpeg',\n          unlockMethod: 'pin',\n          correctPin: '123456'\n        }"
);

const newLockSync = `syncWithGlobalConfig() {
            const config = loadConfig();
            const activeScheme = getActiveScheme(config);
            if (activeScheme) {
                this.settings.wallpaper = activeScheme.lockscreen;
                this.clockColor = activeScheme.textColor === 'black' ? '#000000' : '#FFFFFF';
                
                if (typeof getSchemeFilter === 'function') {
                    this.settings.filterStyle = getSchemeFilter(activeScheme, false);
                    this.settings.vignetteOpacity = getVignetteOpacity(activeScheme);
                }
            }
        },`;

let lockRegex = /syncWithGlobalConfig\(\) \{[\s\S]*?this\.clockColor = activeScheme\.textColor === 'black' \? '#000000' : '#FFFFFF';\s*\}/;
if (lockCode.match(lockRegex)) {
    lockCode = lockCode.replace(lockRegex, newLockSync);
}
fs.writeFileSync('js/lockscreen.js', lockCode);

console.log('patched lockscreen.js');
