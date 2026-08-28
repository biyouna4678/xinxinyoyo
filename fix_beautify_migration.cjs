const fs = require('fs');
let code = fs.readFileSync('js/beautify.js', 'utf8');

const oldLogic = `        loadConfigFromStorage() {
            try {
                const saved = localStorage.getItem('BeautifyGlobalConfig');
                if (saved) {
                    const parsed = JSON.parse(saved);
                    this.config = { ...this.config, ...parsed };
                }
            } catch (e) {
                console.error('读取配置失败:', e);
            }
        }`;

const newLogic = `        loadConfigFromStorage() {
            try {
                // 读取可能是旧版的 key，也可能是新版的
                const saved = localStorage.getItem('BeautifyGlobalConfig') || localStorage.getItem('beautifyConfig');
                if (saved) {
                    const parsed = JSON.parse(saved);
                    
                    // 强制迁移蓝色的坏图
                    if (parsed && parsed.schemes) {
                        parsed.schemes.forEach(s => {
                            if (s.lockscreen === 'https://i.ibb.co/S4zFkqpx/IMG-5625.jpg') {
                                s.lockscreen = 'https://i.ibb.co/dsrzbzZF/IMG-5707.jpg';
                            }
                        });
                    }

                    this.config = { ...this.config, ...parsed };
                    
                    // 把修复后的数据保存回正确的 key
                    this.saveConfigToStorage();
                }
            } catch (e) {
                console.error('读取配置失败:', e);
            }
        }`;

code = code.replace(oldLogic, newLogic);
fs.writeFileSync('js/beautify.js', code);
console.log("beautify.js migration fixed");
