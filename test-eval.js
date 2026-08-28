const code = `{
                        year: '',
                        percentage: '0.00%',
                        totalDays: 365,
                        passedDays: 0,
                  
                        isLeapYear(y) {
                          return (y % 4 === 0 && y % 100 !== 0) || (y % 400 === 0);
                        },
                  
                        init() {
                          const now = new Date();
                          const currentYear = now.getFullYear();
                          this.year = currentYear;
                          
                          // 判断平年 365 天还是闰年 366 天
                          this.totalDays = this.isLeapYear(currentYear) ? 366 : 365;
                  
                          const startOfYear = new Date(currentYear, 0, 1);
                          const endOfYear = new Date(currentYear + 1, 0, 1);
                          
                          // 计算精确年度百分比
                          const progress = (now - startOfYear) / (endOfYear - startOfYear);
                          this.percentage = (progress * 100).toFixed(2) + '%';
                  
                          // 计算今年已过的天数（点亮对应的圆点）
                          const dayOfYear = Math.floor((now - startOfYear) / (1000 * 60 * 60 * 24)) + 1;
                          this.passedDays = Math.min(dayOfYear, this.totalDays);
                        }
                      }`;

try {
  const obj = (new Function('return ' + code))();
  const context = { ...obj };
  context.init();
  console.log("Success!", context);
} catch (e) {
  console.error("Error:", e);
}
