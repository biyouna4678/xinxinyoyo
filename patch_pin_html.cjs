const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');
if (!html.includes('id="pin-pad"')) {
    const pinPadHTML = `
  <!-- 密码输入界面 (Pin Pad) -->
  <div id="pin-pad" x-show="showPinPad" 
       x-transition:enter="transition ease-out duration-300"
       x-transition:enter-start="opacity-0 backdrop-blur-none"
       x-transition:enter-end="opacity-100 backdrop-blur-2xl"
       x-transition:leave="transition ease-in duration-200"
       x-transition:leave-start="opacity-100 backdrop-blur-2xl"
       x-transition:leave-end="opacity-0 backdrop-blur-none"
       class="fixed inset-0 z-[10000] flex flex-col items-center pt-24 pb-12 px-6 font-sans bg-black/40 backdrop-blur-2xl">
    
    <div class="text-white text-[16px] mb-8 font-medium tracking-widest text-center"
         :class="pinError ? 'animate-pulse text-red-300' : ''">
      <span x-text="pinError ? '密码错误' : '输入密码'"></span>
    </div>

    <!-- 密码点 -->
    <div class="flex gap-4 mb-20" :class="pinError ? 'jiggle-anim' : ''">
      <template x-for="i in 6">
        <div class="w-[14px] h-[14px] rounded-full border border-white/60 transition-all duration-200 flex items-center justify-center"
             :class="enteredPin.length >= i ? 'bg-white border-white' : 'bg-transparent'">
        </div>
      </template>
    </div>

    <!-- 数字键盘 -->
    <div class="grid grid-cols-3 gap-x-6 gap-y-4 max-w-[280px] mx-auto mb-auto">
      <template x-for="num in ['1','2','3','4','5','6','7','8','9']">
        <button @click="pressPin(num)"
                class="w-[75px] h-[75px] rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 backdrop-blur-md flex items-center justify-center text-[32px] text-white font-light transition-all active:scale-95 shadow-sm">
          <span x-text="num"></span>
        </button>
      </template>
      <div class="w-[75px] h-[75px]"></div> <!-- Empty for spacing -->
      <button @click="pressPin('0')"
              class="w-[75px] h-[75px] rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 backdrop-blur-md flex items-center justify-center text-[32px] text-white font-light transition-all active:scale-95 shadow-sm">
        0
      </button>
      <button @click="deletePin()"
              class="w-[75px] h-[75px] rounded-full flex items-center justify-center text-[16px] text-white/80 font-medium active:scale-95 hover:text-white transition-all">
        清除
      </button>
    </div>

    <!-- 底部取消 -->
    <button @click="cancelPin()"
            class="mt-auto text-[16px] text-white/80 font-medium active:scale-95 hover:text-white transition-all">
      取消
    </button>
  </div>
`;
    const insertTarget = '  <!-- 日期模式弹窗 -->';
    html = html.replace(insertTarget, pinPadHTML + '\n  ' + insertTarget);
    fs.writeFileSync('index.html', html);
    console.log("PIN Pad injected");
} else {
    console.log("PIN Pad already exists");
}
