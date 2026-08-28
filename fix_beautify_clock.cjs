const fs = require('fs');
let code = fs.readFileSync('js/beautify.js', 'utf8');

const oldStartClock = `        startClock() {
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

const newStartClock = `        startClock() {
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

if (code.includes(oldStartClock)) {
    code = code.replace(oldStartClock, newStartClock);
    fs.writeFileSync('js/beautify.js', code);
    console.log('Fixed startClock');
} else {
    console.log('Could not find old startClock');
}
