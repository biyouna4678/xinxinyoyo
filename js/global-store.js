// 全局美化配置数据层

const DEFAULT_BEAUTIFY_CONFIG = {
  activeSchemeId: 'scheme_white',
  themeColor: '#2A2A2A',
  schemes: [
    {
      id: 'scheme_white',
      name: '浅色壁纸',
      textColor: 'black',
      lockscreen: '',
      desktop: '',
      blur: 0,
      saturation: 100,
      vignette: 0,
      isPlaceholder: false
    },
    {
      id: 'scheme_black',
      name: '深色壁纸',
      textColor: 'white',
      lockscreen: '',
      desktop: '',
      blur: 15,
      saturation: 100,
      vignette: 15,
      isPlaceholder: false
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

function loadBeautifyConfig() {
  try {
    const saved = localStorage.getItem('BeautifyGlobalConfig_v5');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.schemes) {
        parsed.schemes = parsed.schemes.map(migrateScheme);
      }
      return { ...DEFAULT_BEAUTIFY_CONFIG, ...parsed };
    }
  } catch (e) {
    console.error('读取美化配置失败:', e);
  }
  return JSON.parse(JSON.stringify(DEFAULT_BEAUTIFY_CONFIG));
}

function saveBeautifyConfig(config) {
  try {
    localStorage.setItem('BeautifyGlobalConfig_v5', JSON.stringify(config));
  } catch (e) {
    console.error('保存美化配置失败:', e);
  }
}

function getActiveScheme(config) {
  return config.schemes.find(s => s.id === config.activeSchemeId);
}

function getSchemeFilter(scheme, isDesktop = false) {
  const effectiveBlur = (isDesktop && !scheme.desktop && !scheme.blur) 
    ? 25 
    : (scheme.blur || 0);
  const blurPx = Math.round(effectiveBlur * 0.15);
  const saturation = scheme.saturation || 100;
  return `blur(${blurPx}px) saturate(${saturation}%)`;
}

function getVignetteOpacity(scheme) {
  return (scheme.vignette || 0) / 100;
}
