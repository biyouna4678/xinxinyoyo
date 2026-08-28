const fs = require('fs');
let code = fs.readFileSync('js/beautify.js', 'utf8');

const oldInit = `        init() {
            // No need to load from storage manually here if loadConfig() handles it,
            // but for Alpine data it's already assigned above. 
            // We can just rely on \`config: loadConfig()\`.
            this.applyThemeColor();
            this.startClock();
        },`;

const newInit = `        init() {
            this.$watch('currentTab', (val) => {
                if (val === 'wallpaper' && this.config.schemes) {
                    this.$nextTick(() => {
                        this.scrollToActiveScheme();
                    });
                }
            });

            this.loadConfigFromStorage();
            
            window.addEventListener('beautifyConfigChanged', () => {
                this.loadConfigFromStorage();
            });

            this.applyThemeColor();
            this.startClock();
        },`;

if (code.includes(oldInit)) {
    code = code.replace(oldInit, newInit);
    fs.writeFileSync('js/beautify.js', code);
    console.log('Fixed init');
} else {
    console.log('Could not find old init');
}
