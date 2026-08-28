const fs = require('fs');

let content = fs.readFileSync('js/beautify.js', 'utf8');

// Update applyWallpaperScheme
content = content.replace(/this\.config\.activeSchemeId = selectedScheme\.id;/g, `this.config.activeSchemeId = selectedScheme.id;
                this.config.schemes.forEach(s => s.isCurrent = (s.id === selectedScheme.id));`);

// Update resetWallpaperScheme to include isCurrent
content = content.replace(/id: 'scheme_white',\s*name: '浅色壁纸',\s*textColor: 'black',\s*lockscreen: 'https:\/\/i.ibb.co\/S4zFkqpx\/IMG-5625.jpg',\s*desktop: '',\s*isPlaceholder: false/g, `id: 'scheme_white',
                    name: '浅色壁纸',
                    textColor: 'black',
                    lockscreen: 'https://i.ibb.co/S4zFkqpx/IMG-5625.jpg',
                    desktop: '',
                    isPlaceholder: false,
                    isCurrent: true`);
content = content.replace(/id: 'scheme_black',\s*name: '深色壁纸',\s*textColor: 'white',\s*lockscreen: 'https:\/\/i.ibb.co\/x86Ch5Fq\/IMG-5626.jpg',\s*desktop: '',\s*isPlaceholder: false/g, `id: 'scheme_black',
                    name: '深色壁纸',
                    textColor: 'white',
                    lockscreen: 'https://i.ibb.co/x86Ch5Fq/IMG-5626.jpg',
                    desktop: '',
                    isPlaceholder: false,
                    isCurrent: false`);

// Update the newScheme creation in handleLockscreenUpload
content = content.replace(/isPlaceholder: false\s*\n\s*};/g, `isPlaceholder: false,
                        isCurrent: true
                    };
                    this.config.schemes.forEach(s => s.isCurrent = false);`);

// Update saveConfigToStorage
content = content.replace(/saveConfigToStorage\(\) \{[\s\S]*?loadConfigFromStorage/, `saveConfigToStorage() {
            saveConfig(this.config);
        },

        loadConfigFromStorage`);

// Update loadConfigFromStorage
content = content.replace(/loadConfigFromStorage\(\) \{[\s\S]*?\}\s*\},/g, `loadConfigFromStorage() {
            this.config = loadConfig();
        },`);

// Replace applyThemeColor to call applyThemeColor from global store
content = content.replace(/applyThemeColor\(\) \{[\s\S]*?\},/g, `applyThemeColor() {
            applyThemeColor(this.config.themeColor);
        },`);

fs.writeFileSync('js/beautify.js', content);
console.log("Patched beautify.js");
