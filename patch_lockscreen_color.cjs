const fs = require('fs');

let js = fs.readFileSync('js/lockscreen.js', 'utf8');

// Insert detectPlatform and platform state
js = js.replace('function lockScreenApp() {\n      return {', `function lockScreenApp() {
      return {
        platform: 'web',
        detectPlatform() {
          const ua = navigator.userAgent;
          if (/iPhone|iPad|iPod/.test(ua)) return 'ios';
          if (/Android/.test(ua)) return 'android';
          return 'web';
        },`);

// Init detectPlatform
js = js.replace('init() {', `init() {\n          this.platform = this.detectPlatform();`);

// Insert androidPicker state
const androidPickerState = `
        showAndroidColorPicker: false,
        androidPicker: {
          selectedColor: '#FFFFFF',
          initialColor: '#FFFFFF',
          currentRgbaStr: 'rgba(255,255,255,1)',
          currentRgbOpaqueStr: 'rgb(255,255,255)',
          hexInput: 'FFFFFF',
          presetMode: 'circle',
          hue: 0,
          saturation: 0,
          brightness: 100,
          alpha: 100,
          pointerPos: { x: 110, y: 110 },
          isDragging: false,
          recentColors: ['#00FFCC', '#FF0055', '#7000FF', '#FFB3BA', '#BAFFC9', '#BAE1FF'],
          horizontalGridRows: [
            ['#FFEEEF', '#FFCDD2', '#EF9A9A', '#E57373', '#EF5350', '#F44336', '#D32F2F', '#C62828', '#B71C1C'],
            ['#FCE4EC', '#F8BBD0', '#F48FB1', '#F06292', '#EC407A', '#E91E63', '#C2185B', '#AD1457', '#880E4F'],
            ['#F3E5F5', '#E1BEE7', '#CE93D8', '#BA68C8', '#AB47BC', '#9C27B0', '#7B1FA2', '#6A1B9A', '#4A148C'],
            ['#EDE7F6', '#D1C4E9', '#B39DDB', '#9575CD', '#7E57C2', '#673AB7', '#512DA8', '#4527A0', '#311B92'],
            ['#E8EAF6', '#C5CAE9', '#9FA8DA', '#7986CB', '#5C6BC0', '#3F51B5', '#303F9F', '#283593', '#1A237E'],
            ['#E3F2FD', '#BBDEFB', '#90CAF9', '#64B5F6', '#42A5F5', '#2196F3', '#1976D2', '#1565C0', '#0D47A1'],
            ['#E0F7FA', '#B2EBF2', '#80DEEA', '#4DD0E1', '#26C6DA', '#00BCD4', '#0097A7', '#00838F', '#006064'],
            ['#E0F2F1', '#B2DFDB', '#80CBC4', '#4DB6AC', '#26A69A', '#009688', '#00796B', '#00695C', '#004D40'],
            ['#E8F5E9', '#C8E6C9', '#A5D6A7', '#81C784', '#66BB6A', '#4CAF50', '#388E3C', '#2E7D32', '#1B5E20'],
            ['#F1F8E9', '#DCEDC8', '#C5E1A5', '#AED581', '#9CCC65', '#8BC34A', '#689F38', '#558B2F', '#33691E'],
            ['#FFFDE7', '#FFF9C4', '#FFF59D', '#FFEE58', '#FFEE33', '#FDD835', '#FBC02D', '#F57F17', '#F57F00'],
            ['#FFF8E1', '#FFECB3', '#FFE082', '#FFD54F', '#FFCA28', '#FFC107', '#FFA000', '#FF8F00', '#FF6F00'],
            ['#FFF3E0', '#FFE0B2', '#FFCC80', '#FFB74D', '#FFA726', '#FF9800', '#FB8C00', '#F57C00', '#E65100'],
            ['#FBE9E7', '#FFCCBC', '#FFAB91', '#FF8A65', '#FF7043', '#FF5722', '#E64A19', '#D84315', '#BF360C'],
            ['#EFEBE9', '#D7CCC8', '#BCAAA4', '#A1887F', '#8D6E63', '#795548', '#6D4C41', '#5D4037', '#3E2723'],
            ['#FAFAFA', '#F5F5F5', '#EEEEEE', '#E0E0E0', '#BDBDBD', '#9E9E9E', '#757575', '#616161', '#212121']
          ]
        },
`;

js = js.replace('presetColors: [', androidPickerState + '\n        presetColors: [');

// Insert androidPicker methods at the end before returning
const androidPickerMethods = `
        get brightnessBubblePos() {
            return Math.max(5, Math.min(95, this.androidPicker.brightness));
        },

        get satTrackBg() {
            const left = this.hsbToRgbStr(this.androidPicker.hue, 0, this.androidPicker.brightness);
            const right = this.hsbToRgbStr(this.androidPicker.hue, 100, this.androidPicker.brightness);
            return { left, right };
        },

        openAndroidColorPicker() {
            this.showAndroidColorPicker = true;
            this.androidPicker.initialColor = this.clockColor;
            this.androidPicker.selectedColor = this.clockColor;
            
            // Try to initialize picker state from current clockColor if it's hex
            if (this.clockColor.startsWith('#')) {
                this.selectPresetColor(this.clockColor);
            }
            
            this.$nextTick(() => {
                this.drawDiscreteColorWheel();
                this.updateColorFromHsb();
            });
        },

        closeAndroidColorPicker(apply = false) {
            if (apply) {
                this.androidPicker.selectedColor = this.androidPicker.currentRgbaStr;
                this.addRecentColor(this.androidPicker.currentRgbaStr);
                
                // Extract RGB and convert to hex for clockColor (ignore alpha)
                const matches = this.androidPicker.currentRgbaStr.match(/rgba?\\((\\d+),\\s*(\\d+),\\s*(\\d+)/);
                if (matches) {
                    const r = parseInt(matches[1]);
                    const g = parseInt(matches[2]);
                    const b = parseInt(matches[3]);
                    this.clockColor = "#" + this.toHex(r) + this.toHex(g) + this.toHex(b);
                }
            }
            this.showAndroidColorPicker = false;
        },

        resetColor() {
            this.selectPresetColor(this.androidPicker.initialColor);
        },

        drawDiscreteColorWheel() {
            const canvas = this.$refs.colorCanvas;
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            const width = canvas.width;
            const center = width / 2;
            const outerRadius = center - 5;
            const innerRadius = 15;

            ctx.clearRect(0, 0, width, width);

            const sectorCount = 24;
            const ringCount = 6;
            const angleStep = (Math.PI * 2) / sectorCount;
            const ringWidth = (outerRadius - innerRadius) / ringCount;

            const currentB = this.androidPicker.brightness;
            const satFactor = this.androidPicker.saturation / 100;

            for (let r = 0; r < ringCount; r++) {
                const rIn = innerRadius + r * ringWidth;
                const rOut = rIn + ringWidth;
                const ringSat = Math.round(((r + 1) / ringCount) * 100 * satFactor);

                for (let s = 0; s < sectorCount; s++) {
                    const startAngle = s * angleStep - Math.PI / 2;
                    const endAngle = startAngle + angleStep;
                    const hueDeg = Math.round((s / sectorCount) * 360);

                    const rgb = this.hsbToRgb(hueDeg, ringSat, currentB);

                    ctx.beginPath();
                    ctx.arc(center, center, rOut, startAngle, endAngle, false);
                    ctx.arc(center, center, rIn, endAngle, startAngle, true);
                    ctx.closePath();

                    ctx.fillStyle = \`rgb(\${rgb.r}, \${rgb.g}, \${rgb.b})\`;
                    ctx.fill();
                    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }

            ctx.beginPath();
            ctx.arc(center, center, innerRadius, 0, Math.PI * 2);
            ctx.fillStyle = '#FFFFFF';
            ctx.fill();
            ctx.strokeStyle = 'rgba(0,0,0,0.05)';
            ctx.stroke();
        },

        startDrag(e) {
            this.androidPicker.isDragging = true;
            e.target.setPointerCapture(e.pointerId);
            this.updatePointerFromEvent(e);
        },

        onDrag(e) {
            if (!this.androidPicker.isDragging) return;
            this.updatePointerFromEvent(e);
        },

        stopDrag() {
            this.androidPicker.isDragging = false;
        },

        updatePointerFromEvent(e) {
            const rect = this.$refs.wheelContainer.getBoundingClientRect();
            const radius = rect.width / 2;
            let x = e.clientX - rect.left - radius;
            let y = e.clientY - rect.top - radius;

            const dist = Math.sqrt(x * x + y * y);
            if (dist > radius) {
                x = (x / dist) * radius;
                y = (y / dist) * radius;
            }

            this.androidPicker.pointerPos = { x: x + radius, y: y + radius };

            let angle = Math.atan2(y, x) * (180 / Math.PI) + 90;
            if (angle < 0) angle += 360;

            this.androidPicker.hue = Math.round(angle);
            this.androidPicker.saturation = Math.min(100, Math.round((Math.min(dist, radius) / radius) * 100));
            this.updateColorFromHsb(false);
        },

        onHueInput() {
            this.androidPicker.hue = Math.max(0, Math.min(360, this.androidPicker.hue || 0));
            this.syncPointerFromHsb();
            this.updateColorFromHsb(false);
        },

        onSaturationInput() {
            this.androidPicker.saturation = Math.max(0, Math.min(100, this.androidPicker.saturation || 0));
            this.syncPointerFromHsb();
            this.updateColorFromHsb(false);
        },

        syncPointerFromHsb() {
            const radius = 104;
            const rad = ((this.androidPicker.hue - 90) * Math.PI) / 180;
            const dist = (this.androidPicker.saturation / 100) * radius;
            this.androidPicker.pointerPos = {
                x: radius + dist * Math.cos(rad),
                y: radius + dist * Math.sin(rad)
            };
        },

        updateColorFromHsb(updatePointer = true) {
            if (updatePointer) this.syncPointerFromHsb();

            this.drawDiscreteColorWheel();

            const rgb = this.hsbToRgb(this.androidPicker.hue, this.androidPicker.saturation, this.androidPicker.brightness);
            const a = (this.androidPicker.alpha / 100).toFixed(2);
            
            this.androidPicker.currentRgbOpaqueStr = \`rgb(\${rgb.r}, \${rgb.g}, \${rgb.b})\`;
            this.androidPicker.currentRgbaStr = \`rgba(\${rgb.r}, \${rgb.g}, \${rgb.b}, \${a})\`;
            
            const hexRgb = \`\${this.toHex(rgb.r)}\${this.toHex(rgb.g)}\${this.toHex(rgb.b)}\`;
            if (this.androidPicker.alpha < 100) {
                const hexA = this.toHex(Math.round(this.androidPicker.alpha * 2.55));
                this.androidPicker.hexInput = \`\${hexRgb}\${hexA}\`.toUpperCase();
            } else {
                this.androidPicker.hexInput = hexRgb.toUpperCase();
            }
        },

        onHexInput(e) {
            let val = e.target.value.replace(/[^0-9A-Fa-f]/g, '');
            this.androidPicker.hexInput = val;

            if (val.length === 6 || val.length === 8) {
                const r = parseInt(val.substring(0, 2), 16);
                const g = parseInt(val.substring(2, 4), 16);
                const b = parseInt(val.substring(4, 6), 16);
                if (val.length === 8) {
                    this.androidPicker.alpha = Math.round((parseInt(val.substring(6, 8), 16) / 255) * 100);
                }
                
                const hsb = this.rgbToHsb(r, g, b);
                this.androidPicker.hue = hsb.h;
                this.androidPicker.saturation = hsb.s;
                this.androidPicker.brightness = hsb.b;
                
                this.syncPointerFromHsb();
                this.drawDiscreteColorWheel();
                this.androidPicker.currentRgbOpaqueStr = \`rgb(\${r}, \${g}, \${b})\`;
                this.androidPicker.currentRgbaStr = \`rgba(\${r}, \${g}, \${b}, \${(this.androidPicker.alpha/100).toFixed(2)})\`;
            }
        },

        getP2Color(row, col) {
            const h = Math.round((col / 9) * 360);
            const s = 15 + (row * 11);
            const b = 100 - (row * 6);
            const rgb = this.hsbToRgb(h, s, b);
            return \`rgb(\${rgb.r}, \${rgb.g}, \${rgb.b})\`;
        },

        selectP2Color(row, col) {
            this.androidPicker.hue = Math.round((col / 9) * 360);
            this.androidPicker.saturation = 15 + (row * 11);
            this.androidPicker.brightness = 100 - (row * 6);
            this.updateColorFromHsb();
        },

        selectPresetColor(colorStr) {
            if (colorStr.startsWith('#')) {
                let hex = colorStr.substring(1);
                if (hex.length === 6 || hex.length === 8) {
                    const r = parseInt(hex.substring(0, 2), 16);
                    const g = parseInt(hex.substring(2, 4), 16);
                    const b = parseInt(hex.substring(4, 6), 16);
                    if (hex.length === 8) {
                        this.androidPicker.alpha = Math.round((parseInt(hex.substring(6, 8), 16) / 255) * 100);
                    } else {
                        this.androidPicker.alpha = 100;
                    }
                    const hsb = this.rgbToHsb(r, g, b);
                    this.androidPicker.hue = hsb.h;
                    this.androidPicker.saturation = hsb.s;
                    this.androidPicker.brightness = hsb.b;
                    this.updateColorFromHsb();
                }
            } else if (colorStr.startsWith('rgba')) {
                const matches = colorStr.match(/rgba?\\((\\d+),\\s*(\\d+),\\s*(\\d+)(?:,\\s*([\\d.]+))?\\)/);
                if (matches) {
                    const r = parseInt(matches[1]);
                    const g = parseInt(matches[2]);
                    const b = parseInt(matches[3]);
                    this.androidPicker.alpha = matches[4] !== undefined ? Math.round(parseFloat(matches[4]) * 100) : 100;
                    const hsb = this.rgbToHsb(r, g, b);
                    this.androidPicker.hue = hsb.h;
                    this.androidPicker.saturation = hsb.s;
                    this.androidPicker.brightness = hsb.b;
                    this.updateColorFromHsb();
                }
            }
        },

        addRecentColor(colorStr) {
            this.androidPicker.recentColors = [colorStr, ...this.androidPicker.recentColors.filter(c => c !== colorStr)].slice(0, 8);
        },

        toHex(n) { return n.toString(16).padStart(2, '0').toUpperCase(); },

        hsbToRgb(h, s, b) {
            s /= 100; b /= 100;
            const k = (n) => (n + h / 60) % 6;
            const f = (n) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
            return {
                r: Math.round(f(5) * 255),
                g: Math.round(f(3) * 255),
                b: Math.round(f(1) * 255)
            };
        },

        hsbToRgbStr(h, s, b) {
            const rgb = this.hsbToRgb(h, s, b);
            return \`rgb(\${rgb.r}, \${rgb.g}, \${rgb.b})\`;
        },

        rgbToHsb(r, g, b) {
            r /= 255; g /= 255; b /= 255;
            const max = Math.max(r, g, b), min = Math.min(r, g, b);
            const d = max - min;
            let h, s = max === 0 ? 0 : d / max;
            const v = max;

            if (max === min) {
                h = 0;
            } else {
                switch (max) {
                    case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                    case g: h = (b - r) / d + 2; break;
                    case b: h = (r - g) / d + 4; break;
                }
                h /= 6;
            }
            return {
                h: Math.round(h * 360),
                s: Math.round(s * 100),
                b: Math.round(v * 100)
            };
        },
`;

js = js.replace(/        pressPin\(num\) \{/, androidPickerMethods + '\n        pressPin(num) {');

fs.writeFileSync('js/lockscreen.js', js);
