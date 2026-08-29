const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const target = `                  <!-- 明度调节 (默认 100%) -->
                  <div class="flex flex-col space-y-1.5 relative">`;

const alphaSlider = `                  <!-- 不透明度 (默认 100%) -->
                  <div class="flex flex-col space-y-1.5">
                      <div class="flex justify-between items-center text-[12px] text-gray-500 font-medium">
                          <span>不透明度</span>
                          <span class="font-mono text-[12px] font-bold text-gray-900" x-text="androidPicker.alpha + '%'"></span>
                      </div>
                      <div class="relative w-full h-[10px] rounded-[5px] overflow-hidden checkerboard-pattern border border-black/5 flex items-center">
                          <input 
                              type="range" 
                              min="0" 
                              max="100" 
                              x-model.number="androidPicker.alpha"
                              @input="updateColorFromHsb()"
                              class="w-full absolute inset-0 opacity-100 z-10 android-picker-slider"
                              :style="\`background: linear-gradient(to right, transparent, \${androidPicker.currentRgbOpaqueStr});\`"
                          />
                      </div>
                  </div>

                  <!-- 明度调节 (默认 100%) -->
                  <div class="flex flex-col space-y-1.5 relative">`;

html = html.replace(target, alphaSlider);
fs.writeFileSync('index.html', html);
