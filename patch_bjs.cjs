const fs = require('fs');
let code = fs.readFileSync('js/beautify.js', 'utf8');

// 1. Add new state properties
const stateInjection = `
        editingScheme: {},
        activeEffectAttr: null,
        tempEffects: { blur: 0, saturation: 100, vignette: 0 },
        numericDialog: {
            show: false,
            attr: null,
            value: ''
        },`;
if (!code.includes('editingScheme: {}')) {
    code = code.replace(/activeSchemeIndex: 0,\s*targetUploadSchemeId: null,/, "activeSchemeIndex: 0,\n        targetUploadSchemeId: null," + stateInjection);
}

// 2. Add methods
const methodsInjection = `
        getSchemeFilter(scheme) {
            const effectiveBlur = (!scheme.desktop && (scheme.blur === undefined || scheme.blur === 0)) ? 25 : (scheme.blur || 0);
            const blurPx = Math.round(effectiveBlur * 0.15);
            const sat = scheme.saturation !== undefined ? scheme.saturation : 100;
            return \`blur(\${blurPx}px) saturate(\${sat}%)\`;
        },
        get currentEditingFilter() {
            const blurPx = Math.round((this.tempEffects.blur || 0) * 0.15);
            return \`blur(\${blurPx}px) saturate(\${this.tempEffects.saturation}%)\`;
        },
        openEffectEditor(scheme) {
            this.editingScheme = scheme;
            const defaultBlur = (!scheme.desktop && (scheme.blur === undefined || scheme.blur === 0)) ? 25 : (scheme.blur || 0);
            this.tempEffects = {
                blur: defaultBlur,
                saturation: scheme.saturation !== undefined ? scheme.saturation : 100,
                vignette: scheme.vignette || 0
            };
            this.activeEffectAttr = null;
            this.currentTab = 'effectEditor';
        },
        closeEffectEditor(save = false) {
            if (save && this.editingScheme) {
                this.editingScheme.blur = this.tempEffects.blur;
                this.editingScheme.saturation = this.tempEffects.saturation;
                this.editingScheme.vignette = this.tempEffects.vignette;
                this.saveConfigToStorage();
            }
            this.currentTab = 'wallpaper';
        },
        handleCircleBtnClick(attr) {
            if (this.activeEffectAttr !== attr) {
                this.activeEffectAttr = attr;
            } else {
                this.openNumericDialog(attr);
            }
        },
        openNumericDialog(attr) {
            this.numericDialog.attr = attr;
            this.numericDialog.value = String(this.tempEffects[attr]);
            this.numericDialog.show = true;
        },
        closeNumericDialog() {
            this.numericDialog.show = false;
        },
        getAttrTitle(attr = this.numericDialog.attr) {
            if (attr === 'blur') return '模糊度';
            if (attr === 'saturation') return '饱和度';
            if (attr === 'vignette') return '暗角强度';
            return '数值输入';
        },
        appendDigit(num) {
            if (this.numericDialog.value === '0') {
                this.numericDialog.value = num;
            } else if (this.numericDialog.value.length < 3) {
                this.numericDialog.value += num;
            }
        },
        deleteDigit() {
            this.numericDialog.value = this.numericDialog.value.slice(0, -1);
        },
        confirmNumericDialog() {
            let val = parseInt(this.numericDialog.value || '0', 10);
            if (isNaN(val)) val = 0;
            if (val > 200 && this.numericDialog.attr === 'saturation') val = 200;
            else if (val > 100) val = 100;
            this.tempEffects[this.numericDialog.attr] = val;
            this.closeNumericDialog();
        },
`;

if (!code.includes('openEffectEditor(')) {
    code = code.replace(/init\(\) \{/, methodsInjection + '\n        init() {');
}

// 3. Update resetWallpaperScheme defaults
const newReset = `resetWallpaperScheme() {
            this.config.activeSchemeId = 'scheme_white';
            this.config.schemes = [
                {
                    id: 'scheme_white',
                    name: '浅色壁纸',
                    textColor: 'black',
                    lockscreen: 'https://i.ibb.co/dsrzbzZF/IMG-5707.jpg',
                    desktop: '',
                    blur: 0,
                    saturation: 100,
                    vignette: 0,
                    isPlaceholder: false,
                    isCurrent: true
                },
                {
                    id: 'scheme_black',
                    name: '深色壁纸',
                    textColor: 'white',
                    lockscreen: 'https://i.ibb.co/x86Ch5Fq/IMG-5626.jpg',
                    desktop: '',
                    blur: 15,
                    saturation: 100,
                    vignette: 15,
                    isPlaceholder: false,
                    isCurrent: false
                },
                {
                    id: 'scheme_add_new',
                    name: '添加新壁纸',
                    isPlaceholder: true
                }
            ];
            this.saveConfigToStorage();
            this.scrollToActiveScheme();
            this.triggerToast('已恢复默认壁纸方案');
        }`;
code = code.replace(/resetWallpaperScheme\(\) \{[\s\S]*?this\.triggerToast\('已恢复默认壁纸方案'\);\s*\},/, newReset + ',');


// 4. Update handleLockscreenUpload new scheme addition
let newSchemeMatch = `desktop: '',
                    isPlaceholder: false,`;
let newSchemeReplace = `desktop: '',
                        blur: 25,
                        saturation: 100,
                        vignette: 0,
                        isPlaceholder: false,`;
code = code.replace(newSchemeMatch, newSchemeReplace);

// 5. Update handleDesktopUpload
let handleDesktopUploadMatch = `const imgUrl = event.target.result;
                const scheme = this.config.schemes.find(s => s.id === this.targetUploadSchemeId);
                if (scheme) {
                    scheme.desktop = imgUrl;
                    
                    this.saveConfigToStorage();`;
let handleDesktopUploadReplace = `const imgUrl = event.target.result;
                if (this.editingScheme && this.editingScheme.id === this.targetUploadSchemeId) {
                    this.editingScheme.desktop = imgUrl;
                }
                const scheme = this.config.schemes.find(s => s.id === this.targetUploadSchemeId);
                if (scheme) {
                    scheme.desktop = imgUrl;
                    
                    this.saveConfigToStorage();`;
code = code.replace(handleDesktopUploadMatch, handleDesktopUploadReplace);

fs.writeFileSync('js/beautify.js', code);
console.log('patched beautify.js');
