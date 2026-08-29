const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const oldBtn = `<div class="relative shrink-0">
          <button class="w-[36px] h-[36px] rounded-full macaron-picker-btn border-2 border-white/80 flex items-center justify-center active:scale-95 transition-transform shadow-sm">
          </button>
          <input type="color" 
                 x-model="clockColor" 
                 class="absolute inset-0 opacity-0 w-full h-full cursor-pointer" 
                 title="选择自定义颜色" />
        </div>`;

const newBtn = `<!-- iOS：系统原生取色器 -->
        <template x-if="platform === 'ios'">
          <div class="relative shrink-0">
            <button class="w-[36px] h-[36px] rounded-full dopamine-picker-btn border-2 border-white/80 flex items-center justify-center shadow-sm">
            </button>
            <input type="color" 
                   x-model="clockColor" 
                   class="absolute inset-0 opacity-0 w-full h-full cursor-pointer" />
          </div>
        </template>

        <!-- Android / 其他：自建色彩选择器 -->
        <template x-if="platform !== 'ios'">
          <button @click="openAndroidColorPicker()" 
                  class="w-[36px] h-[36px] rounded-full dopamine-picker-btn border-2 border-white/80 flex items-center justify-center shadow-sm active:scale-95 transition-transform">
          </button>
        </template>`;

html = html.replace(oldBtn, newBtn);
fs.writeFileSync('index.html', html);
