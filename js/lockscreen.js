function lockScreenApp() {
      return {
        currentTime: '14:01',
        currentDate: '',
        dateMode: 'lunar',
        showDateOptions: false,
        customDateText: '',
        gregorianPreview: '',
        lunarPreview: '',

        hourStr: '14',
        minuteStr: '01',
        
        batteryLevel: 50,
        deviceName: '歆歆的 iPhone',
        isEditingDeviceName: false,
        flashlightOn: false,

        showCustomizePanel: false,
        clockSize: 88,
        clockWeight: 400,
        clockColor: '#FFFFFF',
        clockFont: 'font-fontInter',

        fontList: [
          { id: 'inter', name: '极简', class: 'font-fontInter' },
          { id: 'outfit', name: '圆润', class: 'font-fontOutfit' },
          { id: 'cinzel', name: '古典', class: 'font-fontCinzel' },
          { id: 'space', name: '极客', class: 'font-fontSpace' },
          { id: 'pacifico', name: '艺术', class: 'font-fontPacifico' }
        ],

        presetColors: [
          { name: '白', value: '#FFFFFF' },
          { name: '黑', value: '#000000' },
          { name: '粉', value: '#FEDFE9' },
          { name: '绿', value: '#EDFFDB' },
          { name: '蓝', value: '#E6F5FF' },
          { name: '黄', value: '#FFF9C5' },
          { name: '紫', value: '#EADCF8' }
        ],

        showPinPad: false,
        isUnlocking: false,
        unlocked: false,
        enteredPin: '',
        pinError: false,
        targetRoute: 'desktop',

        settings: {
          wallpaper: null,
          filterStyle: '',
          vignetteOpacity: 0,
          avatarUrl: 'https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAEYZslqcCTcQieeScfjSsdVHzqnzoHI9QACwSUAApvPgVeH3cYnfM_0nz0E.jpeg',
          unlockMethod: 'pin',
          correctPin: '123456'
        },

        init() {
          const params = new URLSearchParams(window.location.search);
          if (params.get('skipLock') === 'true') {
              this.unlocked = true;
          }

          this.syncWithGlobalConfig();
          window.addEventListener('beautifyConfigChanged', () => {
              this.syncWithGlobalConfig();
          });
          window.addEventListener('storage', (e) => {
              if (e.key === 'beautifyConfig' || e.key === 'BeautifyGlobalConfig_v5') {
                  this.syncWithGlobalConfig();
              }
          });
          this.updateClock();
          setInterval(() => this.updateClock(), 1000);
        },

        syncWithGlobalConfig() {
            const config = typeof loadBeautifyConfig === 'function' ? loadBeautifyConfig() : null;
            if (!config) return;
            const activeScheme = getActiveScheme(config);
            if (activeScheme) {
                this.settings.wallpaper = activeScheme.lockscreen;
                this.clockColor = activeScheme.textColor === 'black' ? '#000000' : '#FFFFFF';
                
                if (typeof getSchemeFilter === 'function') {
                    this.settings.filterStyle = getSchemeFilter(activeScheme, false);
                    this.settings.vignetteOpacity = getVignetteOpacity(activeScheme);
                }
            }
        },

        enableDeviceNameEdit() {
          this.isEditingDeviceName = true;
          this.$nextTick(() => {
            this.$refs.deviceNameInput.focus();
          });
        },

        disableDeviceNameEdit() {
          this.isEditingDeviceName = false;
          if (!this.deviceName.trim()) {
            this.deviceName = '歆歆的 iPhone';
          }
        },

        getGanzhiYear(year) {
          const tianGan = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
          const diZhi = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
          const ganIdx = (year - 4) % 10;
          const zhiIdx = (year - 4) % 12;
          return tianGan[(ganIdx + 10) % 10] + diZhi[(zhiIdx + 12) % 12];
        },

        formatLunarChinese(monthNum, dayNum) {
          const lunarMonths = ["正", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "腊"];
          const monthStr = lunarMonths[monthNum - 1] + "月";

          const dayTens = ["初", "十", "廿", "卅"];
          const dayChars = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
          
          let dayStr = "";
          if (dayNum === 10) dayStr = "初十";
          else if (dayNum === 20) dayStr = "二十";
          else if (dayNum === 30) dayStr = "三十";
          else {
            const ten = Math.floor((dayNum - 1) / 10);
            const unit = (dayNum - 1) % 10;
            dayStr = dayTens[ten] + dayChars[unit];
          }

          return monthStr + dayStr;
        },

        getLunarDateString(now) {
          const weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
          const m = now.getMonth() + 1;
          const d = now.getDate();
          const w = weeks[now.getDay()];

          let lMonth = 7, lDay = 11;
          try {
            const formatter = new Intl.DateTimeFormat('zh-CN-u-ca-chinese', { month: 'numeric', day: 'numeric' });
            const parts = formatter.formatToParts(now);
            parts.forEach(p => {
              if (p.type === 'month') lMonth = parseInt(p.value, 10);
              if (p.type === 'day') lDay = parseInt(p.value, 10);
            });
          } catch (e) {}

          const gzYear = this.getGanzhiYear(now.getFullYear());
          const chineseLunar = this.formatLunarChinese(lMonth, lDay);

          return `${m}月${d}日 ${w} · ${gzYear}年${chineseLunar}`;
        },

        getGregorianDateString(now) {
          const weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
          const m = now.getMonth() + 1;
          const d = now.getDate();
          const w = weeks[now.getDay()];
          return `${m}月${d}日 ${w}`;
        },

        updateClock() {
          const now = new Date();
          const h = String(now.getHours()).padStart(2, '0');
          const m = String(now.getMinutes()).padStart(2, '0');
          this.hourStr = h;
          this.minuteStr = m;
          this.currentTime = `${h}:${m}`;

          this.gregorianPreview = this.getGregorianDateString(now);
          this.lunarPreview = this.getLunarDateString(now);

          if (this.dateMode === 'gregorian') {
            this.currentDate = this.gregorianPreview;
          } else if (this.dateMode === 'custom') {
            this.currentDate = this.customDateText.trim() ? this.customDateText : '自定义文本';
          } else {
            this.currentDate = this.lunarPreview;
          }
        },

        triggerWallpaperPicker() {
          document.getElementById('wallpaperInput').click();
        },

        changeWallpaper(event) {
          const file = event.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
              this.settings.wallpaper = e.target.result;
            };
            reader.readAsDataURL(file);
          }
        },

        triggerAvatarPicker() {
          document.getElementById('avatarInput').click();
        },

        changeAvatar(event) {
          const file = event.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
              this.settings.avatarUrl = e.target.result;
            };
            reader.readAsDataURL(file);
          }
        },

        triggerUnlockFlow(route = 'desktop') {
          this.targetRoute = route;
          if (this.settings.unlockMethod === 'pin') {
            this.showPinPad = true;
          } else {
            this.executeUnlock(route);
          }
        },

        pressPin(num) {
          if (this.enteredPin.length < 6) {
            this.enteredPin += num;
            if (this.enteredPin.length === 6) {
              setTimeout(() => this.verifyPin(), 100);
            }
          }
        },

        deletePin() {
          this.enteredPin = '';
        },

        cancelPin() {
          this.showPinPad = false;
          this.enteredPin = '';
          this.targetRoute = 'desktop';
        },

        verifyPin() {
          if (this.enteredPin === this.settings.correctPin) {
            this.showPinPad = false;
            this.executeUnlock(this.targetRoute);
          } else {
            this.pinError = true;
            setTimeout(() => {
              this.pinError = false;
              this.enteredPin = '';
            }, 500);
          }
        },

        executeUnlock(route) {
          this.targetRoute = route;
          this.isUnlocking = true;
          setTimeout(() => {
            this.unlocked = true;
          }, 350);
        }
      }
    }