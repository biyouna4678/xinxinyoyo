const fs = require('fs');
const newContent = `const BeautifyGlobalConfig = {
    themeColor: '#2A2A2A',
    schemes: [
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
    ]
};

function migrateScheme(scheme) {
    if (scheme.isPlaceholder) return scheme;
    if (scheme.blur === undefined) scheme.blur = 0;
    if (scheme.saturation === undefined) scheme.saturation = 100;
    if (scheme.vignette === undefined) scheme.vignette = 0;
    return scheme;
}

function loadConfig() {
    const saved = localStorage.getItem('beautifyConfig') || localStorage.getItem('BeautifyGlobalConfig');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            
            // 数据迁移和修复
            if (parsed && parsed.schemes) {
                parsed.schemes = parsed.schemes.map(migrateScheme);
                parsed.schemes.forEach(s => {
                    if (s.lockscreen === 'https://i.ibb.co/S4zFkqpx/IMG-5625.jpg') {
                        s.lockscreen = 'https://i.ibb.co/dsrzbzZF/IMG-5707.jpg';
                    }
                });
            }
            if (parsed.schemes) {
                const hasCurrent = parsed.schemes.some(s => s.isCurrent);
                if (!hasCurrent && parsed.activeSchemeId) {
                    parsed.schemes.forEach(s => {
                        if (!s.isPlaceholder) {
                            s.isCurrent = (s.id === parsed.activeSchemeId);
                        }
                    });
                }
            }
            return parsed;
        } catch (e) {
            console.error('Error parsing config', e);
        }
    }
    return JSON.parse(JSON.stringify(BeautifyGlobalConfig));
}

function saveConfig(config) {
    localStorage.setItem('beautifyConfig', JSON.stringify(config));
    window.dispatchEvent(new Event('beautifyConfigChanged'));
}

function getActiveScheme(config) {
    if (!config || !config.schemes) return null;
    const active = config.schemes.find(s => s.isCurrent === true);
    if (active) return active;
    if (config.activeSchemeId) return config.schemes.find(s => s.id === config.activeSchemeId);
    return config.schemes[0];
}

// 保持兼容旧版调用
function getActiveWallpaperScheme(config) {
    return getActiveScheme(config);
}

function getSchemeFilter(scheme, isDesktop) {
    if (!scheme || scheme.isPlaceholder) return 'none';
    const effectiveBlur = (isDesktop && !scheme.desktop && (scheme.blur === undefined || scheme.blur === 0)) 
        ? 25 
        : (scheme.blur || 0);
    const blurPx = Math.round(effectiveBlur * 0.15);
    const saturation = scheme.saturation !== undefined ? scheme.saturation : 100;
    return \`blur(\${blurPx}px) saturate(\${saturation}%)\`;
}

function getVignetteOpacity(scheme) {
    if (!scheme || scheme.isPlaceholder) return 0;
    return (scheme.vignette || 0) / 100;
}

function applyThemeColor(color) {
    document.documentElement.style.setProperty('--theme-accent', color);
}
`;
fs.writeFileSync('js/global-store.js', newContent);
console.log('patched js/global-store.js');
