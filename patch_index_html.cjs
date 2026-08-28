const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// First, inject the new filter style and edit button into the desktop preview inside wallpaper tab
// Original: 
/*
                                        <!-- 2. 桌面预览：统一 P3 规范，点击可更换桌面壁纸 -->
                                        <div
                                            @click="triggerDesktopPicker(scheme.id)"
                                            class="relative w-[146px] h-[300px] rounded-[28px] overflow-hidden shadow-preview bg-black/5 flex flex-col justify-between p-3 cursor-pointer group"
                                        >
                                            <div
                                                class="absolute inset-0 bg-cover bg-center transition-transform duration-300"
                                                :style="{ backgroundImage: `url(${scheme.desktop || scheme.lockscreen})` }"
                                            ></div>
*/

const targetDesktopPreview = `                                        <!-- 2. 桌面预览：统一 P3 规范，点击可更换桌面壁纸 -->
                                        <div
                                            @click="triggerDesktopPicker(scheme.id)"
                                            class="relative w-[146px] h-[300px] rounded-[28px] overflow-hidden shadow-preview bg-black/5 flex flex-col justify-between p-3 cursor-pointer group"
                                        >
                                            <div
                                                class="absolute inset-0 bg-cover bg-center transition-transform duration-300"
                                                :style="{ backgroundImage: \`url(\${scheme.desktop || scheme.lockscreen})\` }"
                                            ></div>`;

const replacementDesktopPreview = `                                        <!-- 2. 桌面预览：统一 P3 规范，点击可更换桌面壁纸 -->
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

if(html.indexOf(targetDesktopPreview) !== -1) {
    html = html.replace(targetDesktopPreview, replacementDesktopPreview);
} else {
    console.log("Desktop preview target not found, trying a more flexible replace...");
    // Fallback if formatting differs
    html = html.replace(/<div\s+@click="triggerDesktopPicker\(scheme\.id\)"[\s\S]*?:style="\{ backgroundImage: \`url\(\$\{scheme\.desktop \|\| scheme\.lockscreen\}\)\` \}"\s*><\/div>/, replacementDesktopPreview);
}


// Inject effectEditor and numericDialog before "<!-- 3. 全局主题色视图 -->"
const targetSection = `            <!-- 3. 全局主题色视图 -->`;

const effectEditorSection = `            <!-- 视图 2：全屏调节编辑模式 -->
            <div 
                x-show="currentTab === 'effectEditor'"
                x-transition:enter="transition ease-out duration-300"
                x-transition:enter-start="opacity-0 translate-y-full"
                x-transition:enter-end="opacity-100 translate-y-0"
                x-transition:leave="transition ease-in duration-200"
                x-transition:leave-start="opacity-100 translate-y-0"
                x-transition:leave-end="opacity-0 translate-y-full"
                class="absolute inset-0 z-30 bg-black flex flex-col overflow-hidden"
                style="display: none;"
            >
                <div class="h-14 px-5 flex items-center justify-between shrink-0 z-20">
                    <button @click="closeEffectEditor(false)" class="text-white/80 text-sm font-sans active:opacity-60">
                        取消
                    </button>
                    <button @click="closeEffectEditor(true)" class="px-4 py-1.5 rounded-full bg-accent-blue text-white text-xs font-sans font-semibold active:scale-95 transition-transform">
                        完成
                    </button>
                </div>

                <!-- 全屏预览区域 -->
                <div class="flex-1 flex items-center justify-center px-6 py-2 overflow-hidden">
                    <div class="relative w-full h-full max-h-[560px] rounded-[42px] overflow-hidden bg-gray-900 border border-white/10 shadow-2xl flex flex-col justify-between p-4 pt-6 space-y-4">
                        
                        <div 
                            class="absolute inset-0 bg-cover bg-center transition-all duration-75"
                            :style="{ 
                                backgroundImage: \`url(\${editingScheme.desktop || editingScheme.lockscreen})\`,
                                filter: currentEditingFilter
                            }"
                        ></div>

                        <div class="relative z-10 flex-1 flex flex-col space-y-4 pointer-events-none">
                            <div class="w-full h-[120px] bg-white/20 backdrop-blur-lg rounded-[24px] border border-white/10 shadow-xs shrink-0"></div>
                            <div class="flex items-center justify-between px-1">
                                <div class="w-[120px] h-[120px] bg-white/20 backdrop-blur-lg rounded-[24px] border border-white/10 shadow-xs shrink-0"></div>
                                <div class="grid grid-cols-2 gap-3.5 w-[120px] h-[120px] place-items-center">
                                    <div class="w-[46px] h-[46px] bg-white/30 backdrop-blur-md rounded-[14px] border border-white/10 shadow-xs"></div>
                                    <div class="w-[46px] h-[46px] bg-white/30 backdrop-blur-md rounded-[14px] border border-white/10 shadow-xs"></div>
                                    <div class="w-[46px] h-[46px] bg-white/30 backdrop-blur-md rounded-[14px] border border-white/10 shadow-xs"></div>
                                    <div class="w-[46px] h-[46px] bg-white/30 backdrop-blur-md rounded-[14px] border border-white/10 shadow-xs"></div>
                                </div>
                            </div>
                            <div class="flex items-center justify-between px-1">
                                <div class="grid grid-cols-2 gap-3.5 w-[120px] h-[120px] place-items-center">
                                    <div class="w-[46px] h-[46px] bg-white/30 backdrop-blur-md rounded-[14px] border border-white/10 shadow-xs"></div>
                                    <div class="w-[46px] h-[46px] bg-white/30 backdrop-blur-md rounded-[14px] border border-white/10 shadow-xs"></div>
                                    <div class="w-[46px] h-[46px] bg-white/30 backdrop-blur-md rounded-[14px] border border-white/10 shadow-xs"></div>
                                    <div class="w-[46px] h-[46px] bg-white/30 backdrop-blur-md rounded-[14px] border border-white/10 shadow-xs"></div>
                                </div>
                                <div class="w-[120px] h-[120px] bg-white/20 backdrop-blur-lg rounded-[24px] border border-white/10 shadow-xs shrink-0"></div>
                            </div>
                        </div>

                        <div class="relative z-10 w-full h-[62px] bg-white/20 backdrop-blur-lg rounded-[30px] border border-white/10 flex items-center justify-around px-3 shadow-xs pointer-events-none shrink-0">
                            <div class="w-[46px] h-[46px] rounded-[14px] bg-white/40 border border-white/10 shadow-xs"></div>
                            <div class="w-[46px] h-[46px] rounded-[14px] bg-white/40 border border-white/10 shadow-xs"></div>
                            <div class="w-[46px] h-[46px] rounded-[14px] bg-white/40 border border-white/10 shadow-xs"></div>
                            <div class="w-[46px] h-[46px] rounded-[14px] bg-white/40 border border-white/10 shadow-xs"></div>
                        </div>
                    </div>
                </div>

                <!-- 横向滑动编辑栏 -->
                <div class="w-full px-4 pt-3 pb-8 shrink-0 overflow-hidden">
                    <div class="flex items-center justify-around overflow-x-auto no-scrollbar py-2 px-2 gap-5 font-sans">
                        <div class="flex flex-col items-center space-y-2 shrink-0">
                            <button @click="handleCircleBtnClick('blur')" class="w-[48px] h-[48px] rounded-full aspect-square shrink-0 flex items-center justify-center p-[2px] transition-all duration-200 active:scale-90" :class="activeEffectAttr === 'blur' ? 'bg-accent-blue' : 'bg-white/30'">
                                <div class="w-full h-full rounded-full bg-black flex items-center justify-center text-white overflow-hidden">
                                    <template x-if="activeEffectAttr !== 'blur'">
                                        <div class="w-[32px] h-[32px] flex items-center justify-center">
                                            <svg class="w-5 h-5 stroke-[2]" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg>
                                        </div>
                                    </template>
                                    <template x-if="activeEffectAttr === 'blur'">
                                        <span class="text-[13px] font-bold font-mono text-accent-blue tracking-tighter" x-text="\`\${tempEffects.blur}%\`"></span>
                                    </template>
                                </div>
                            </button>
                            <span class="text-[11px] text-white/70 font-medium tracking-tight">模糊</span>
                        </div>

                        <div class="flex flex-col items-center space-y-2 shrink-0">
                            <button @click="handleCircleBtnClick('saturation')" class="w-[48px] h-[48px] rounded-full aspect-square shrink-0 flex items-center justify-center p-[2px] transition-all duration-200 active:scale-90" :class="activeEffectAttr === 'saturation' ? 'bg-accent-blue' : 'bg-white/30'">
                                <div class="w-full h-full rounded-full bg-black flex items-center justify-center text-white overflow-hidden">
                                    <template x-if="activeEffectAttr !== 'saturation'">
                                        <div class="w-[32px] h-[32px] flex items-center justify-center">
                                            <svg class="w-5 h-5 stroke-[2]" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="9"></circle><path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor"></path></svg>
                                        </div>
                                    </template>
                                    <template x-if="activeEffectAttr === 'saturation'">
                                        <span class="text-[13px] font-bold font-mono text-accent-blue tracking-tighter" x-text="\`\${tempEffects.saturation}%\`"></span>
                                    </template>
                                </div>
                            </button>
                            <span class="text-[11px] text-white/70 font-medium tracking-tight">饱和度</span>
                        </div>

                        <div class="flex flex-col items-center space-y-2 shrink-0">
                            <button @click="handleCircleBtnClick('vignette')" class="w-[48px] h-[48px] rounded-full aspect-square shrink-0 flex items-center justify-center p-[2px] transition-all duration-200 active:scale-90" :class="activeEffectAttr === 'vignette' ? 'bg-accent-blue' : 'bg-white/30'">
                                <div class="w-full h-full rounded-full bg-black flex items-center justify-center text-white overflow-hidden">
                                    <template x-if="activeEffectAttr !== 'vignette'">
                                        <div class="w-[32px] h-[32px] flex items-center justify-center">
                                            <svg class="w-5 h-5 stroke-[2]" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="9"></circle><circle cx="12" cy="12" r="3" fill="currentColor"></circle></svg>
                                        </div>
                                    </template>
                                    <template x-if="activeEffectAttr === 'vignette'">
                                        <span class="text-[13px] font-bold font-mono text-accent-blue tracking-tighter" x-text="\`\${tempEffects.vignette}%\`"></span>
                                    </template>
                                </div>
                            </button>
                            <span class="text-[11px] text-white/70 font-medium tracking-tight">暗角</span>
                        </div>

                        <div class="flex flex-col items-center space-y-2 shrink-0">
                            <button @click="triggerDesktopPicker(editingScheme.id)" class="w-[48px] h-[48px] rounded-full aspect-square shrink-0 flex items-center justify-center p-[2px] bg-white/20 active:scale-90 transition-transform">
                                <div class="w-full h-full rounded-full bg-black flex items-center justify-center text-white overflow-hidden">
                                    <div class="w-[32px] h-[32px] flex items-center justify-center">
                                        <svg class="w-5 h-5 stroke-[2]" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="3" width="18" height="18" rx="3" ry="3"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                                    </div>
                                </div>
                            </button>
                            <span class="text-[11px] text-white/70 font-medium tracking-tight">图片</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 数字键盘对话框 -->
            <div 
                x-show="numericDialog.show"
                x-transition:enter="transition ease-out duration-200"
                x-transition:enter-start="opacity-0 scale-90"
                x-transition:enter-end="opacity-100 scale-100"
                x-transition:leave="transition ease-in duration-150"
                x-transition:leave-start="opacity-100 scale-100"
                x-transition:leave-end="opacity-0 scale-90"
                class="absolute inset-0 z-50 flex items-center justify-center px-6 bg-black/60 backdrop-blur-xs"
                style="display: none;"
            >
                <div class="w-full max-w-[290px] bg-[#2C2C2E] rounded-[28px] p-4 shadow-2xl border border-white/10 text-white font-sans">
                    <div class="flex justify-between items-center mb-3">
                        <span class="text-sm font-semibold text-white/80" x-text="getAttrTitle()">数字输入</span>
                        <button @click="closeNumericDialog()" class="text-white/40 hover:text-white">
                            <svg class="w-5 h-5 stroke-[2]" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                        </button>
                    </div>

                    <div class="bg-[#1C1C1E] rounded-2xl h-14 flex items-center justify-between px-4 mb-4 border border-white/5">
                        <span class="text-2xl font-bold font-mono tracking-wider text-white" x-text="numericDialog.value || '0'"></span>
                        <span class="text-xs font-medium text-white/40">% (0-100)</span>
                    </div>

                    <div class="grid grid-cols-4 gap-2">
                        <template x-for="num in ['7','8','9','4','5','6','1','2','3','0']" :key="num">
                            <button @click="appendDigit(num)" class="h-11 rounded-xl bg-[#3A3A3C] text-white font-semibold text-lg active:bg-[#007AFF] transition-colors flex items-center justify-center" :class="num === '0' ? 'col-span-2' : ''">
                                <span x-text="num"></span>
                            </button>
                        </template>
                        <button @click="deleteDigit()" class="h-11 rounded-xl bg-[#3A3A3C] text-white/80 active:bg-gray-600 transition-colors flex items-center justify-center">
                            <svg class="w-5 h-5 stroke-[2]" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"></path><line x1="18" y1="9" x2="12" y2="15"></line><line x1="12" y1="9" x2="18" y2="15"></line></svg>
                        </button>
                        <button @click="confirmNumericDialog()" class="h-11 rounded-xl bg-[#007AFF] text-white font-semibold text-lg active:opacity-80 transition-opacity flex items-center justify-center col-span-2">
                            <svg class="w-6 h-6 stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- 3. 全局主题色视图 -->`;

html = html.replace(targetSection, effectEditorSection);
fs.writeFileSync('index.html', html);
console.log("index.html updated with editor tabs");
