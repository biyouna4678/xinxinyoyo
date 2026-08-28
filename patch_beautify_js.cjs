const fs = require('fs');

let js = fs.readFileSync('js/beautify.js', 'utf8');

const oldRealTime = `        realTime: {
            monthDate: '',
            weekDay: '',
            lunarDate: '',
            timeStr: ''
        },`;

const newRealTime = `        realTime: {
            fullDateStr: '',
            timeStr: ''
        },`;

js = js.replace(oldRealTime, newRealTime);

const oldInit = `        init() {
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

            const updateTime = () => {
                const now = new Date();
                this.realTime.monthDate = \`\${now.getMonth() + 1}月\${now.getDate()}日\`;
                
                const weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
                this.realTime.weekDay = weeks[now.getDay()];

                const hours = String(now.getHours()).padStart(2, '0');
                const minutes = String(now.getMinutes()).padStart(2, '0');
                this.realTime.timeStr = \`\${hours}:\${minutes}\`;

                this.realTime.lunarDate = '七月12';
            };

            updateTime();
            setInterval(updateTime, 1000);
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

            this.startClock();
        },
        startClock() {
            const updateTime = () => {
                const now = new Date();
                const month = now.getMonth() + 1;
                const date = now.getDate();
                const weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
                const weekDay = weeks[now.getDay()];
                const lunarStr = '丙午年七月十二';

                this.realTime.fullDateStr = \`\${month}月\${date}日\${weekDay}·\${lunarStr}\`;

                const hours = String(now.getHours()).padStart(2, '0');
                const minutes = String(now.getMinutes()).padStart(2, '0');
                this.realTime.timeStr = \`\${hours}:\${minutes}\`;
            };
            updateTime();
            setInterval(updateTime, 1000);
        },`;

js = js.replace(oldInit, newInit);

fs.writeFileSync('js/beautify.js', js);
console.log('patched beautify.js');
