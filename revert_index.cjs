const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// desktop background
const newDesktopBgTemplate = `<template x-if="desktopSettings && desktopSettings.wallpaperUrl">
      <div>
          <div class="absolute inset-0 bg-cover bg-center transition-all duration-500"
               :class="desktopSettings.isBlurred ? 'scale-110' : ''"
               :style="\`background-image: url('\${desktopSettings.wallpaperUrl}'); filter: \${desktopSettings.filterStyle};\`"></div>
          <div class="absolute inset-0 pointer-events-none transition-opacity duration-500"
               :style="\`background: radial-gradient(circle, transparent 40%, rgba(0,0,0,\${desktopSettings.vignette / 100}) 120%);\`"></div>
      </div>
    </template>`;

const oldDesktopBgTemplate = `<template x-if="desktopSettings && desktopSettings.wallpaperUrl">
      <div class="absolute inset-0 bg-cover bg-center transition-all duration-500"
           :class="desktopSettings.isBlurred ? 'scale-125' : ''"
           :style="desktopSettings.isBlurred ? \`background-image: url('\${desktopSettings.wallpaperUrl}'); filter: blur(40px); transform: scale(1.15);\` : \`background-image: url('\${desktopSettings.wallpaperUrl}');\`"></div>
    </template>`;

html = html.replace(newDesktopBgTemplate, oldDesktopBgTemplate);

// preview card inside beautify tab
const v2PreviewCard = `<!-- 2. 桌面预览：统一 P3 规范，点击可更换桌面壁纸 -->
                                        <div class="relative w-[146px] h-[300px] rounded-[28px] overflow-hidden shadow-preview bg-black/5 flex flex-col justify-between p-3 cursor-pointer group">
                                            <!-- 桌面壁纸渲染 -->
                                            <div
                                                class="absolute inset-0 bg-cover bg-center transition-transform duration-300"
                                                :style="{ 
                                                    backgroundImage: \`url(\${scheme.desktop || scheme.lockscreen})\`,
                                                    filter: getSchemeFilter(scheme)
                                                }"
                                            ></div>
                                            
                                            <!-- 调节特效胶囊按钮 -->
                                            <div class="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 flex justify-center mb-1">
                                                <button 
                                                    @click.stop="openEffectEditor(scheme)"
                                                    class="px-2.5 py-0.5 rounded-full bg-white/40 hover:bg-white/60 backdrop-blur-md border border-white/40 text-[10px] font-sans font-medium text-text-main shadow-xs active:scale-95 transition-all flex items-center space-x-1"
                                                >
                                                    <svg class="w-3 h-3 stroke-[2]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                        <circle cx="12" cy="12" r="3"></circle>
                                                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                                                    </svg>
                                                    <span>调节特效</span>
                                                </button>
                                            </div>`;

const v1PreviewCard = `<!-- 2. 桌面预览：统一 P3 规范，点击可更换桌面壁纸 -->
                                        <div
                                            @click="triggerDesktopPicker(scheme.id)"
                                            class="relative w-[146px] h-[300px] rounded-[28px] overflow-hidden shadow-preview bg-black/5 flex flex-col justify-between p-3 cursor-pointer group"
                                        >
                                            <div
                                                class="absolute inset-0 bg-cover bg-center transition-transform duration-300"
                                                :style="{ backgroundImage: \`url(\${scheme.desktop || scheme.lockscreen})\` }"
                                            ></div>`;

html = html.replace(v2PreviewCard, v1PreviewCard);

// The full editor section
const effectEditorSectionStart = `<!-- 视图 2：全屏调节编辑模式 -->`;
const effectEditorSectionEnd = `<!-- 3. 全局主题色视图 -->`;

let startIdx = html.indexOf(effectEditorSectionStart);
if(startIdx !== -1) {
    let endIdx = html.indexOf(effectEditorSectionEnd);
    if(endIdx !== -1) {
        html = html.substring(0, startIdx) + html.substring(endIdx);
    }
}

fs.writeFileSync('index.html', html);
console.log("index.html reverted");
