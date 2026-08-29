const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const panelHTML = `
  <!-- 自建色彩选择器面板 (Android / Web) -->
  <div 
      x-show="showAndroidColorPicker"
      class="fixed inset-0 z-[100] flex flex-col justify-end overflow-hidden"
      style="display: none;"
  >
      <!-- 遮罩 -->
      <div 
          x-show="showAndroidColorPicker"
          x-transition:enter="transition ease-out duration-200"
          x-transition:enter-start="opacity-0"
          x-transition:enter-end="opacity-100"
          x-transition:leave="transition ease-in duration-200"
          x-transition:leave-start="opacity-100"
          x-transition:leave-end="opacity-0"
          @click="closeAndroidColorPicker(false)"
          class="absolute inset-0 bg-black/40 backdrop-blur-sm"
      ></div>

      <!-- 卡片主体 -->
      <div 
          x-show="showAndroidColorPicker"
          x-transition:enter="transition ease-out duration-300 transform"
          x-transition:enter-start="translate-y-full"
          x-transition:enter-end="translate-y-0"
          x-transition:leave="transition ease-in duration-200 transform"
          x-transition:leave-start="translate-y-0"
          x-transition:leave-end="translate-y-full"
          class="relative w-full max-w-md mx-auto bg-white rounded-t-[32px] shadow-2xl flex flex-col pt-3 px-6 pb-[max(20px,env(safe-area-inset-bottom))] z-[101] max-h-[94vh] overflow-y-auto no-scrollbar font-sans"
      >
          <!-- 顶部操作栏 -->
          <div class="flex flex-col items-center shrink-0 mb-3">
              <div class="w-9 h-1 bg-gray-300 rounded-full mb-3"></div>
              <div class="w-full flex items-center justify-between px-1">
                  <button 
                      @click="resetColor()"
                      class="text-[12px] font-medium text-gray-400 hover:text-gray-900 active:opacity-60 transition-colors px-1 py-0.5 flex items-center space-x-1"
                  >
                      <svg class="w-3.5 h-3.5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                      <span>重置</span>
                  </button>

                  <h2 class="font-serif font-semibold text-[17px] text-gray-900">自定义取色</h2>
                  
                  <button 
                      @click="closeAndroidColorPicker(true)"
                      class="text-[15px] font-medium text-blue-500 active:opacity-60 transition-opacity px-1 py-0.5"
                  >
                      完成
                  </button>
              </div>
          </div>

          <!-- 主控制面板 -->
          <div class="bg-[#F8F8FA] rounded-[24px] p-4 sm:p-5 border border-black/5 flex flex-col items-center">
              
              <!-- 点进去的满数值彩虹色盘 -->
              <div class="relative w-56 h-56 flex items-center justify-center my-1 select-none">
                  <div 
                      class="relative w-52 h-52 rounded-full cursor-crosshair touch-none flex items-center justify-center"
                      @pointerdown="startDrag($event)"
                      @pointermove="onDrag($event)"
                      @pointerup="stopDrag()"
                      @pointercancel="stopDrag()"
                      x-ref="wheelContainer"
                  >
                      <canvas x-ref="colorCanvas" width="220" height="220" class="w-full h-full drop-shadow-sm"></canvas>
                      
                      <!-- 拾取光标 -->
                      <div 
                          class="absolute w-6 h-6 rounded-full border-2 border-white shadow-md -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-100 ease-out flex items-center justify-center"
                          :class="androidPicker.isDragging ? 'scale-125 shadow-lg' : 'scale-100'"
                          :style="{ left: androidPicker.pointerPos.x + 'px', top: androidPicker.pointerPos.y + 'px', backgroundColor: androidPicker.currentRgbOpaqueStr }"
                      >
                          <div class="w-1.5 h-1.5 rounded-full bg-white shadow-sm"></div>
                      </div>
                  </div>
              </div>

              <!-- 调节控制区 -->
              <div class="w-full space-y-3.5 mt-2 px-1">
                  
                  <!-- 饱和度调节 (默认 100%) -->
                  <div class="flex flex-col space-y-1.5">
                      <div class="flex justify-between items-center text-[12px] text-gray-500 font-medium">
                          <span>饱和度调节</span>
                          <div class="flex items-center space-x-0.5">
                              <input 
                                  type="number" 
                                  min="0" 
                                  max="100" 
                                  x-model.number="androidPicker.saturation" 
                                  @input="onSaturationInput()"
                                  class="w-8 font-mono text-right text-[12px] font-bold text-gray-900 bg-transparent outline-none"
                              />
                              <span class="font-mono text-[12px] text-gray-900">%</span>
                          </div>
                      </div>
                      <input 
                          type="range" 
                          min="0" 
                          max="100" 
                          x-model.number="androidPicker.saturation"
                          @input="updateColorFromHsb()"
                          class="w-full android-picker-slider"
                          :style="\`background: linear-gradient(to right, \${satTrackBg.left}, \${satTrackBg.right});\`"
                      />
                  </div>

                  <!-- 明度调节 (默认 100%) -->
                  <div class="flex flex-col space-y-1.5 relative">
                      <div class="flex justify-between items-center text-[12px] text-gray-500 font-medium">
                          <span>明度调节</span>
                          <div class="flex items-center space-x-0.5">
                              <input 
                                  type="number" 
                                  min="0" 
                                  max="100" 
                                  x-model.number="androidPicker.brightness" 
                                  @input="updateColorFromHsb()"
                                  class="w-8 font-mono text-right text-[12px] font-bold text-gray-900 bg-transparent outline-none"
                              />
                              <span class="font-mono text-[12px] text-gray-900">%</span>
                          </div>
                      </div>
                      <div class="relative w-full flex items-center">
                          <div 
                              class="absolute -top-7 bg-black text-white px-2 py-0.5 rounded-full text-[10px] font-mono font-bold shadow-md -translate-x-1/2 pointer-events-none transition-all duration-75 z-20"
                              :style="{ left: brightnessBubblePos + '%' }"
                          >
                              <span x-text="androidPicker.brightness + '%'"></span>
                          </div>
                          <input 
                              type="range" 
                              min="0" 
                              max="100" 
                              x-model.number="androidPicker.brightness"
                              @input="updateColorFromHsb()"
                              class="w-full android-picker-slider"
                              style="background: linear-gradient(to right, #000000, #FFFFFF);"
                          />
                      </div>
                  </div>

                  <!-- 色相与 Hex 输入栏 -->
                  <div class="flex items-center justify-between pt-2 border-t border-gray-200/60 mt-1.5">
                      <div class="flex items-center space-x-1 mt-1.5">
                          <span class="text-[12px] text-gray-500 font-medium">色相</span>
                          <input 
                              type="number" 
                              min="0" 
                              max="360" 
                              x-model.number="androidPicker.hue"
                              @input="onHueInput()"
                              class="w-10 font-mono text-[12px] font-bold text-gray-900 bg-white px-1.5 py-0.5 rounded border border-black/10 outline-none text-center"
                          />
                          <span class="text-[12px] text-gray-500 font-medium">°</span>
                      </div>
                      
                      <div class="flex items-center space-x-1 bg-white px-2.5 py-1 rounded-lg border border-black/10 mt-1.5">
                          <span class="text-[12px] font-mono font-semibold text-gray-400">#</span>
                          <input 
                              type="text" 
                              x-model="androidPicker.hexInput"
                              @input="onHexInput($event)"
                              maxlength="8"
                              class="w-20 font-mono text-[12px] font-semibold text-gray-900 outline-none uppercase bg-transparent"
                          />
                      </div>
                  </div>

              </div>

              <!-- 最近使用颜色栏 -->
              <div class="w-full mt-3 pt-2.5 border-t border-gray-200/60">
                  <div class="text-[12px] text-gray-500 font-medium mb-1.5 px-1">最近使用</div>
                  <div class="flex items-center space-x-2.5 overflow-x-auto no-scrollbar py-0.5">
                      <template x-for="(c, idx) in androidPicker.recentColors" :key="idx">
                          <button 
                              @click="selectPresetColor(c)"
                              class="w-6 h-6 rounded-full shadow-sm border border-black/10 shrink-0 checkerboard-pattern relative overflow-hidden active:scale-110 transition-transform"
                          >
                              <div class="absolute inset-0" :style="{ backgroundColor: c }"></div>
                          </button>
                      </template>
                  </div>
              </div>

              <!-- 预设调色板切换 -->
              <div class="w-full mt-3 pt-2.5 border-t border-gray-200/60">
                  <div class="flex items-center justify-between mb-3 px-1">
                      <span class="text-[12px] text-gray-500 font-medium">预设调色板</span>
                      <div class="flex items-center bg-gray-200/70 p-0.5 rounded-lg text-[11px] font-medium text-gray-600">
                          <button 
                              @click="androidPicker.presetMode = 'circle'"
                              :class="androidPicker.presetMode === 'circle' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'"
                              class="px-3 py-0.5 rounded-md transition-all"
                          >
                              圆形
                          </button>
                          <button 
                              @click="androidPicker.presetMode = 'grid'"
                              :class="androidPicker.presetMode === 'grid' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'"
                              class="px-3 py-0.5 rounded-md transition-all"
                          >
                              网格
                          </button>
                      </div>
                  </div>

                  <!-- 圆形模式 -->
                  <div x-show="androidPicker.presetMode === 'circle'" class="w-full py-1">
                      <div class="flex flex-col space-y-2.5 w-full">
                          <template x-for="r in 8" :key="r">
                              <div class="flex justify-between items-center w-full">
                                  <template x-for="c in 10" :key="c">
                                      <button 
                                          @click="selectP2Color(r - 1, c - 1)"
                                          class="w-6 h-6 rounded-full border border-black/5 active:scale-125 transition-transform shrink-0 focus:outline-none shadow-sm"
                                          :style="{ backgroundColor: getP2Color(r - 1, c - 1) }"
                                      ></button>
                                  </template>
                              </div>
                          </template>
                      </div>
                  </div>

                  <!-- 网格模式 -->
                  <div x-show="androidPicker.presetMode === 'grid'" class="w-full py-1">
                      <div class="flex flex-col space-y-1.5 w-full">
                          <template x-for="(row, rIdx) in androidPicker.horizontalGridRows" :key="rIdx">
                              <div class="flex w-full h-4 rounded-sm overflow-hidden border border-black/5">
                                  <template x-for="(hex, cIdx) in row" :key="cIdx">
                                      <button 
                                          @click="selectPresetColor(hex)"
                                          class="flex-1 h-full active:opacity-80 transition-opacity"
                                          :style="{ backgroundColor: hex }"
                                      ></button>
                                  </template>
                              </div>
                          </template>
                      </div>
                  </div>

              </div>

          </div>

          <!-- 确认按钮 -->
          <div class="mt-4 mb-2 shrink-0">
              <button 
                  @click="closeAndroidColorPicker(true)"
                  class="w-full h-[48px] rounded-[16px] bg-blue-500 text-white font-medium text-[15px] active:scale-[0.98] transition-transform shadow-sm flex items-center justify-center"
              >
                  确认使用
              </button>
          </div>

      </div>
  </div>
`;

html = html.replace('<!-- ================= END LOCKSCREEN ================= -->', panelHTML + '\n  <!-- ================= END LOCKSCREEN ================= -->');

fs.writeFileSync('index.html', html);
