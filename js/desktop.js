    // 强制锁死移动端手动缩放
    document.addEventListener('gesturestart', function(e) { e.preventDefault(); });
    document.addEventListener('touchstart', function(e) { if (e.touches.length > 1) { e.preventDefault(); } }, { passive: false });
    document.addEventListener('touchmove', function(e) { if (e.touches.length > 1) { e.preventDefault(); } }, { passive: false });

    // 解决 iOS 自动放大后无法缩小的问题：在输入框失去焦点时强行重置 viewport
    document.addEventListener('focusout', function(e) {
      if (e.target && e.target.getAttribute('contenteditable') !== null) {
        const meta = document.querySelector('meta[name="viewport"]');
        if (meta) {
          // 强行把 minimum-scale 和 maximum-scale 都设为 1.0 迫使 Safari 重置缩放
          meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, viewport-fit=cover';
          // 延迟一点时间恢复基础设置，并重置滚动位置
          setTimeout(() => {
            meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover';
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
          }, 150);
        }
      }
    });

    // 全局图标数据：所有应用 / Dock 图标的 SVG 独立存放，供下方数据定义引用
    const APP_ICONS = {
      novel: `<svg class="w-[32px] h-[32px] text-white" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-label="一起来看小说">
  <path d="M 18 28 L 22 28 L 22 69 C 22 70.4, 23.0 71.2, 24.4 71.0 C 32.8 69.7, 41.5 71.7, 48.0 76.6 L 18 76.6 Z" fill="currentColor" />
  <path d="M 82 28 L 78 28 L 78 69 C 78 70.4, 77.0 71.2, 75.6 71.0 C 67.2 69.7, 58.5 71.7, 52.0 76.6 L 82 76.6 Z" fill="currentColor" />
  <path d="M 24.5 21.0 C 34.8 20.7, 43.0 23.2, 48.4 28.0 L 48.4 76.4 C 41.4 71.0, 32.8 68.8, 24.5 70.0 Z" fill="currentColor" />
  <path d="M 75.5 21.0 C 65.2 20.7, 57.0 23.2, 51.6 28.0 L 51.6 76.4 C 58.6 71.0, 67.2 68.8, 75.5 70.0 Z" fill="currentColor" />
  <path d="M 48.4 27.5 C 49.0 27.9, 49.5 28.3, 50 28.8 C 50.5 28.3, 51.0 27.9, 51.6 27.5 L 51.6 76.4 C 51.0 76.9, 50.5 77.4, 50 78.0 C 49.5 77.4, 49.0 76.9, 48.4 76.4 Z" fill="transparent" />
  <path d="M 24.5 70.0 C 33.0 68.7, 41.7 71.1, 48.4 76.4 L 48.4 78.0 C 40.4 72.8, 32.3 71.1, 24.5 72.2 Z" fill="transparent" />
  <path d="M 75.5 70.0 C 67.0 68.7, 58.3 71.1, 51.6 76.4 L 51.6 78.0 C 59.6 72.8, 67.7 71.1, 75.5 72.2 Z" fill="transparent" />
</svg>`,
      shop: `<svg class="w-[32px] h-[32px] text-white" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <mask id="cart-mask">
      <g fill="#ffffff">
        <rect x="14" y="20" width="16" height="6.5" rx="3.25" />
        <path d="M 24,23.2 L 35.8,55 L 38.6,55 L 27.5,23.2 Z" />
        <path d="M 28,30 H 83.5 L 76.5,60 H 38.5 Z" />
        <rect x="36" y="60.5" width="46" height="6.5" rx="3.25" />
        <circle cx="41.5" cy="71.5" r="8" />
        <circle cx="70.5" cy="71.5" r="8" />
      </g>
      <g fill="#000000">
        <polygon points="31,33 80.5,33 74,57 37.5,57" fill="#ffffff" />
        <rect x="47" y="33" width="4.5" height="24" fill="#000000" />
        <rect x="63" y="33" width="4.5" height="24" fill="#000000" />
        <rect x="31" y="44" width="50" height="4.5" fill="#000000" />
        <circle cx="41.5" cy="71.5" r="2.8" fill="#ffffff" />
        <circle cx="70.5" cy="71.5" r="2.8" fill="#ffffff" />
      </g>
    </mask>
  </defs>
  <rect x="0" y="0" width="100" height="100" mask="url(#cart-mask)" fill="currentColor" />
</svg>`,
      food: `<svg class="w-[32px] h-[32px] text-white" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <mask id="takeaway-mask">
      <g fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round">
        <path d="M 45,36 V 23 C 45,15 51,10 59,10 C 67,10 72,15 72,23 V 36" stroke-width="6.5" />
        <path d="M 32,36 V 24 C 32,16 38,11 46,11 C 54,11 59,16 59,24 V 36" stroke-width="6.5" />
        <path d="M 21,75 L 27,36 H 73 L 79,75 Z" stroke-width="6.5" />
        <line x1="63" y1="36" x2="69" y2="75" stroke-width="6" />
      </g>
      <path d="M 32,36 V 24 C 32,16 38,11 46,11 C 54,11 59,16 59,24 V 36" fill="none" stroke="#000000" stroke-width="12" stroke-linecap="round" />
      <path d="M 32,36 V 24 C 32,16 38,11 46,11 C 54,11 59,16 59,24 V 36" fill="none" stroke="#ffffff" stroke-width="6.5" stroke-linecap="round" />
      <g fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round">
        <line x1="39" y1="52.5" x2="54" y2="67.5" stroke-width="6" />
        <g transform="translate(39, 52.5) rotate(-45)">
          <line x1="-5" y1="0" x2="5" y2="0" stroke-width="5" />
          <line x1="-4" y1="0" x2="-4" y2="-9" stroke-width="4.5" />
          <line x1="0" y1="0" x2="0" y2="-9.5" stroke-width="4.5" />
          <line x1="4" y1="0" x2="4" y2="-9" stroke-width="4.5" />
        </g>
        <line x1="50" y1="52.5" x2="35" y2="67.5" stroke-width="6" />
        <ellipse cx="53.5" cy="49" rx="5" ry="3.8" transform="rotate(-45 53.5 49)" stroke-width="5" fill="none" />
      </g>
    </mask>
  </defs>
  <rect x="0" y="0" width="100" height="100" mask="url(#takeaway-mask)" fill="currentColor" />
</svg>`,
      forum: `<svg class="w-[32px] h-[32px] text-white" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <mask id="forum-mask">
      <g fill="#ffffff">
        <circle cx="31" cy="35" r="13" />
        <path d="M 15,65 C 15,53.5 22.5,47 31,47 C 39.5,47 47,53.5 47,65 V 68 H 15 Z" />
        <circle cx="69" cy="35" r="13" />
        <path d="M 53,65 C 53,53.5 60.5,47 69,47 C 77.5,47 85,53.5 85,65 V 68 H 53 Z" />
      </g>
      <g fill="#000000">
        <circle cx="50" cy="42.5" r="16.5" />
        <path d="M 30.5,75 C 30.5,60 40,53 50,53 C 60,53 69.5,60 69.5,75 V 78 H 30.5 Z" />
      </g>
      <g fill="#ffffff">
        <circle cx="50" cy="42.5" r="13" />
        <path d="M 34,75 C 34,63 42,56.5 50,56.5 C 58,56.5 66,63 66,75 V 78 H 34 Z" />
      </g>
    </mask>
  </defs>
  <rect x="0" y="0" width="100" height="100" mask="url(#forum-mask)" fill="currentColor" />
</svg>`,
      phone: `<svg class="w-[32px] h-[32px] text-white" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <mask id="phone-mask">
      <rect x="29" y="14" width="42" height="72" rx="10" fill="#ffffff" />
      <g fill="#000000">
        <rect x="33" y="18" width="34" height="64" rx="6" fill="#000000" />
        <path d="M 41,18 H 59 C 59,21.5 57,21.5 57,21.5 H 43 C 43,21.5 41,21.5 41,18 Z" fill="#ffffff" />
        <rect x="43" y="78" width="14" height="3" rx="1.5" fill="#ffffff" />
      </g>
    </mask>
  </defs>
  <rect x="0" y="0" width="100" height="100" mask="url(#phone-mask)" fill="currentColor" />
</svg>`,
      theme: `<svg class="w-[32px] h-[32px] text-white" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-label="艺术">
  <defs>
    <mask id="theme-mask">
      <rect x="0" y="0" width="100" height="100" fill="#ffffff" />
      <circle cx="31.8" cy="32.5" r="3.7" fill="#000000" />
      <circle cx="24.0" cy="42.0" r="3.7" fill="#000000" />
      <circle cx="22.2" cy="52.8" r="3.7" fill="#000000" />
      <circle cx="28.8" cy="64.5" r="3.7" fill="#000000" />
    </mask>
  </defs>
  <path d="M 44.8 17.2 C 29.5 17.2, 16.4 27.0, 12.0 41.4 C 7.0 57.6, 14.6 74.5, 28.7 81.7 C 39.2 87.0, 51.0 85.7, 57.5 78.5 C 61.4 74.1, 62.5 69.3, 59.7 66.0 C 57.3 63.2, 53.0 62.0, 49.8 59.7 C 46.3 57.2, 45.8 53.4, 48.4 50.4 C 50.9 47.5, 55.1 46.0, 57.5 42.7 C 60.6 38.4, 58.8 32.3, 54.5 27.6 C 51.6 24.2, 48.0 20.2, 44.8 17.2 Z" fill="currentColor" mask="url(#theme-mask)" />
  <path d="M 84.5 11.0 C 82.3 10.0, 80.3 11.4, 78.5 13.2 L 70.0 22.0 C 66.0 26.2, 65.9 32.5, 69.1 36.8 C 72.3 41.0, 78.3 42.0, 82.4 38.7 C 86.6 35.2, 88.0 29.1, 85.0 24.1 C 82.9 20.5, 83.0 16.6, 84.5 11.0 Z" fill="currentColor" />
  <path d="M 69.0 41.1 L 81.8 42.1 L 80.6 49.7 L 68.3 48.7 Z" fill="currentColor" />
  <path d="M 68.1 51.0 L 80.5 52.0 L 77.8 80.7 C 77.4 84.7, 74.9 87.2, 71.8 87.0 C 68.4 86.8, 66.3 84.2, 66.7 80.5 Z" fill="currentColor" />
</svg>`,
      anniversary: `<svg class="w-[32px] h-[32px] text-white" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <mask id="calendar-mask">
      <rect x="12" y="20" width="76" height="68" rx="16" fill="#ffffff" />
      <rect x="24" y="10" width="18" height="22" rx="9" fill="#000000" />
      <rect x="58" y="10" width="18" height="22" rx="9" fill="#000000" />
      <rect x="20" y="38" width="60" height="42" rx="7" fill="#000000" />
      <path d="M 50,71.5 C 47.5,69 35.5,59.5 35.5,52.5 C 35.5,48 39,44.5 43.5,44.5 C 46.5,44.5 48.6,46.2 50,48.5 C 51.4,46.2 53.5,44.5 56.5,44.5 C 61,44.5 64.5,48 64.5,52.5 C 64.5,59.5 52.5,69 50,71.5 Z" fill="#ffffff" />
    </mask>
  </defs>
  <rect x="0" y="0" width="100" height="100" mask="url(#calendar-mask)" fill="currentColor" />
  <rect x="29" y="6" width="8" height="20" rx="4" fill="currentColor" />
  <rect x="63" y="6" width="8" height="20" rx="4" fill="currentColor" />
</svg>`,
      music: `<svg class="w-[32px] h-[32px] text-white" viewBox="12 4 76 76" xmlns="http://www.w3.org/2000/svg">
  <path d="M 25.5,50 C 25.5,23 35,16 50,16 C 65,16 74.5,23 74.5,50 C 69,48 61,23.5 50,23.5 C 39,23.5 31,48 25.5,50 Z" fill="currentColor" />
  <rect x="20.5" y="49" width="3.5" height="15" rx="1.75" fill="currentColor" />
  <rect x="76" y="49" width="3.5" height="15" rx="1.75" fill="currentColor" />
  <rect x="25.5" y="46.5" width="8" height="20" rx="4" fill="currentColor" />
  <rect x="66.5" y="46.5" width="8" height="20" rx="4" fill="currentColor" />
  <rect x="48.75" y="44" width="2.5" height="24" rx="1.25" fill="currentColor" />
  <rect x="44" y="47" width="2.5" height="18" rx="1.25" fill="currentColor" />
  <rect x="53.5" y="47" width="2.5" height="18" rx="1.25" fill="currentColor" />
  <rect x="39.25" y="49" width="2.5" height="14" rx="1.25" fill="currentColor" />
  <rect x="58.25" y="49" width="2.5" height="14" rx="1.25" fill="currentColor" />
  <rect x="35" y="51.5" width="2" height="9" rx="1" fill="currentColor" />
  <rect x="63" y="51.5" width="2" height="9" rx="1" fill="currentColor" />
</svg>`,
      couples: `<svg class="w-7 h-7 text-white" viewBox="0 0 32 32" fill="none"><path d="M11 8 C6 4, 1 9, 11 19 C21 9, 16 4, 11 8" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M22 15 C19 12, 16 16, 22 22 C28 16, 25 12, 22 15" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
      memory: `<svg class="w-7 h-7 text-white" viewBox="-2 -2 28 28" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 12c-2.333-3-4.667-5-7.5-5-2.5 0-4.5 2-4.5 5s2 5 4.5 5c2.833 0 5.167-2 7.5-5zm0 0c2.333 3 4.667 5 7.5 5 2.5 0 4.5-2 4.5-5s-2-5-4.5-5c-2.833 0-5.167 2-7.5 5z"/></svg>`,
      map: `<svg class="w-[32px] h-[32px] text-white" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <mask id="map-pin-mask">
      <path fill-rule="evenodd" d="M 50,5 C 34.5,5 22,17.5 22,33 C 22,51.5 41.5,73 50,87.5 C 58.5,73 78,51.5 78,33 C 78,17.5 65.5,5 50,5 Z M 50,20 C 57.2,20 63,25.8 63,33 C 63,40.2 57.2,46 50,46 C 42.8,46 37,40.2 37,33 C 37,25.8 42.8,20 50,20 Z" fill="#ffffff" />
      <path fill-rule="evenodd" d="M 50,77 C 25.1,77 5,81.5 5,87 C 5,92.5 25.1,97 50,97 C 74.9,97 95,92.5 95,87 C 95,81.5 74.9,77 50,77 Z M 50,82 C 68.4,82 83.3,84.2 83.3,87 C 83.3,89.8 68.4,92 50,92 C 31.6,92 16.7,89.8 16.7,87 C 16.7,84.2 31.6,82 50,82 Z" fill="#ffffff" />
    </mask>
  </defs>
  <rect x="0" y="0" width="100" height="100" mask="url(#map-pin-mask)" fill="currentColor" />
</svg>`,
      period: `<svg class="w-7 h-7 text-white" viewBox="0 0 36 36">
              <defs>
                <mask id="periodMask">
                  <g fill="white">
                    <circle cx="18" cy="10" r="5.5"/>
                    <circle cx="18" cy="26" r="5.5"/>
                    <circle cx="10" cy="18" r="5.5"/>
                    <circle cx="26" cy="18" r="5.5"/>
                    <circle cx="12.3" cy="12.3" r="5.5"/>
                    <circle cx="23.7" cy="23.7" r="5.5"/>
                    <circle cx="12.3" cy="23.7" r="5.5"/>
                    <circle cx="23.7" cy="12.3" r="5.5"/>
                  </g>
                  <g fill="black">
                    <circle cx="18" cy="13" r="3.5"/>
                    <circle cx="18" cy="23" r="3.5"/>
                    <circle cx="13" cy="18" r="3.5"/>
                    <circle cx="23" cy="18" r="3.5"/>
                    <circle cx="14.5" cy="14.5" r="3.5"/>
                    <circle cx="21.5" cy="21.5" r="3.5"/>
                    <circle cx="14.5" cy="21.5" r="3.5"/>
                    <circle cx="21.5" cy="14.5" r="3.5"/>
                  </g>
                  <circle cx="18" cy="18" r="3.5" fill="white"/>
                </mask>
              </defs>
              <rect width="36" height="36" fill="currentColor" mask="url(#periodMask)"/>
            </svg>`,
      chat: `<svg class="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><line x1="8" y1="9" x2="16" y2="9"/><line x1="8" y1="13" x2="13" y2="13"/></svg>`,
      world: `<svg class="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
      sms: `<svg class="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
      setting: `<svg class="w-[32px] h-[32px] text-white" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <mask id="gear-mask">
      <g fill="#ffffff">
        <rect x="44" y="2" width="12" height="96" rx="3.5" transform="rotate(0 50 50)" />
        <rect x="44" y="2" width="12" height="96" rx="3.5" transform="rotate(30 50 50)" />
        <rect x="44" y="2" width="12" height="96" rx="3.5" transform="rotate(60 50 50)" />
        <rect x="44" y="2" width="12" height="96" rx="3.5" transform="rotate(90 50 50)" />
        <rect x="44" y="2" width="12" height="96" rx="3.5" transform="rotate(120 50 50)" />
        <rect x="44" y="2" width="12" height="96" rx="3.5" transform="rotate(150 50 50)" />
        <circle cx="50" cy="50" r="41" />
      </g>
      <circle cx="50" cy="50" r="30" fill="#000000" />
      <circle cx="50" cy="50" r="22" fill="#ffffff" />
      <circle cx="50" cy="50" r="12" fill="#000000" />
    </mask>
  </defs>
  <rect x="0" y="0" width="100" height="100" mask="url(#gear-mask)" fill="currentColor" />
</svg>`
    };

    // 各类型占用的行列跨度
    const SPAN_MAP = {
      app:  { spanRow: 1, spanCol: 1 },
      '2x2': { spanRow: 2, spanCol: 2 },
      'love_anniversary_2x2': { spanRow: 2, spanCol: 2 },
      'year_progress_2x2': { spanRow: 2, spanCol: 2 },
      'pure_vinyl_2x2': { spanRow: 2, spanCol: 2 },
      'overlapping_polaroids_2x2': { spanRow: 2, spanCol: 2 },
      'creamy_film_2x4': { spanRow: 3, spanCol: 2 },
      'pink_gameboy_2x4': { spanRow: 3, spanCol: 2 },
      '4x2': { spanRow: 2, spanCol: 4 },
      'word_photo_4x2': { spanRow: 2, spanCol: 4 },
      'music_player_4x2': { spanRow: 2, spanCol: 4 },
      'player_v2_4x2': { spanRow: 2, spanCol: 4 },
      'ins_music_4x2': { spanRow: 2, spanCol: 4 },
      'acrylic_collection_4x2': { spanRow: 2, spanCol: 4 },
      '4x4': { spanRow: 4, spanCol: 4 },
      'shop_4x4': { spanRow: 4, spanCol: 4 },
      'media_4x4': { spanRow: 4, spanCol: 4 },
      'profile_4x4': { spanRow: 4, spanCol: 4 }
    };

    // 拖拽镜像卡片实际像素尺寸
    const WIDGET_PIXEL_SIZE = {
      '2x2': { w: 156, h: 156 },
      'love_anniversary_2x2': { w: 156, h: 156 },
      'year_progress_2x2': { w: 156, h: 156 },
      'pure_vinyl_2x2': { w: 156, h: 156 },
      'overlapping_polaroids_2x2': { w: 156, h: 156 },
      'creamy_film_2x4': { w: 156, h: 260 },
      'pink_gameboy_2x4': { w: 156, h: 260 },
      '4x2': { w: 335, h: 156 },
      'word_photo_4x2': { w: 335, h: 158 },
      'music_player_4x2': { w: 335, h: 158 },
      'player_v2_4x2': { w: 335, h: 158 },
      'ins_music_4x2': { w: 335, h: 158 },
      'acrylic_collection_4x2': { w: 335, h: 158 },
      '4x4': { w: 335, h: 335 },
      'shop_4x4': { w: 335, h: 335 },
      'media_4x4': { w: 335, h: 335 },
      'profile_4x4': { w: 335, h: 335 }
    };

    const GRID_COLS = 4;
    const MAX_ROWS = 6;     // 核心应用区域最大行数 —— 对应设计中"页面指示器上方"的可视边界，图标与组件都不能超出这个范围
    const ROW_PITCH = 88;   // 单元行高（需与 grid-auto-rows 保持一致）
    const ROW_GAP = 20;     // 需与 row-gap 保持一致
    const COL_GAP = 12;     // 需与 column-gap 保持一致

    function desktopApp() {
      return {
        currentTime: '14:01',
        desktopSettings: { wallpaperUrl: '', isBlurred: false, textColor: 'white', filterStyle: '', vignetteOpacity: 0 },
        isEditing: false,
        longPressTimer: null,
        poppingId: null,
        placementFailedId: null,

        showWidgetPicker: false,

        currentPage: 0,
        totalPages: 2,
        edgeTimer: null,

        pointerX: 0,
        pointerY: 0,
        startX: null,
        startY: null,

        // ---- 统一拖拽状态（Dock 与 Desktop 网格共用） ----
        dragState: {
          item: null,        // 被拖拽的数据对象（App 或 Widget）
          source: null,      // 'dock' | 'desktop'
          index: null,       // Dock 模式下的数组索引
          originRow: null,   // Desktop 模式下的原始行
          originCol: null,   // Desktop 模式下的原始列
          originPage: null,  // Desktop 模式下的原始页
          hoverRow: null,    // Desktop 模式下的当前悬停行
          hoverCol: null,    // Desktop 模式下的当前悬停列
          hoverPage: null,   // Desktop 模式下的当前悬停页
          moved: false       // 是否发生了实际移动
        },

        activeAppModal: false,
        activeAppName: '',
        activeAppDesc: '',

        // 统一网格数据模型：items 是唯一真源。渲染直接遍历 items（用 id 作为 key），
        // 不再维护额外的二维 cells 派生结构 —— 避免了"位置索引式 key 在拖拽移动后跟丢 DOM 节点"的问题
        desktopGrid: {
          rows: 5,
          items: []
        },

        // 初始 12 个应用图标的定义（仅用于网格初始化播种，不再单独维护数组）
        appDefs: [
          { id: 'novel', name: '一起看小说', desc: '和角色同步阅读，边看边聊', delay: -120, svg: APP_ICONS.novel },
          { id: 'shop', name: '商城', desc: '虚拟礼物商店', delay: -40, svg: APP_ICONS.shop },
          { id: 'food', name: '外卖', desc: '模拟点餐 + MCP 跳转真实平台', delay: -90, svg: APP_ICONS.food },
          { id: 'forum', name: '论坛', desc: '角色社交社区，记忆互通', delay: -210, svg: APP_ICONS.forum },
          { id: 'phone', name: '查手机', desc: '双向手机镜像', delay: -70, svg: APP_ICONS.phone },
          { id: 'theme', name: '美化', desc: 'CSS 自定义入口', delay: -150, svg: APP_ICONS.theme },
          { id: 'anniversary', name: '纪念日', desc: '重要日期记录与提醒', delay: -30, svg: APP_ICONS.anniversary },
          { id: 'music', name: '音乐', desc: '共同听歌，共享歌单', delay: -180, svg: APP_ICONS.music },
          { id: 'couples', name: '情侣空间', desc: '关系确认后的专属互动空间', delay: -110, svg: APP_ICONS.couples },
          { id: 'memory', name: '记忆', desc: '聊天片段收藏回顾', delay: -60, svg: APP_ICONS.memory },
          { id: 'map', name: '地图', desc: '一件匹配角色世界观地区行政图', delay: -140, svg: APP_ICONS.map },
          { id: 'period', name: '经期记录', desc: '角色陪伴与情绪关怀', delay: -80, svg: APP_ICONS.period }
        ],

        dockApps: [
          { id: 'chat', name: '聊天', desc: '四 Tab 核心（消息/通讯录/朋友圈/我）', delay: -130, svg: APP_ICONS.chat },
          { id: 'world', name: '世界书', desc: '动态背景信息库', delay: -250, svg: APP_ICONS.world },
          { id: 'sms', name: '短信', desc: '角色发来的系统级通知信箱', delay: -70, svg: APP_ICONS.sms },
          { id: 'setting', name: '设置', desc: '全局配置', delay: -180, svg: APP_ICONS.setting }
        ],

        // ============ 初始化 ============
        init() {
          this.syncWithGlobalConfig();
          window.addEventListener('beautifyConfigChanged', () => {
              this.syncWithGlobalConfig();
          });
          window.addEventListener('storage', (e) => {
              if (e.key === 'beautifyConfig' || e.key === 'BeautifyGlobalConfig_v5') {
                  this.syncWithGlobalConfig();
              }
          });
          this.updateClock();
          setInterval(() => this.updateClock(), 1000);
          this.initGrid();
        },

        syncWithGlobalConfig() {
            const config = typeof loadBeautifyConfig === 'function' ? loadBeautifyConfig() : null;
            if (!config) return;
            const activeScheme = typeof getActiveScheme === 'function' ? getActiveScheme(config) : null;
            if (activeScheme) {
                if (config.themeColor && typeof applyThemeColor === 'function') {
                    applyThemeColor(config.themeColor);
                }
                                if (activeScheme.desktop) {
                    this.desktopSettings.wallpaperUrl = activeScheme.desktop;
                    this.desktopSettings.isBlurred = false;
                } else if (activeScheme.lockscreen) {
                    this.desktopSettings.wallpaperUrl = activeScheme.lockscreen;
                    this.desktopSettings.isBlurred = true;
                } else {
                    this.desktopSettings.wallpaperUrl = '';
                    this.desktopSettings.isBlurred = false;
                }
                if (typeof getSchemeFilter === 'function') {
                    this.desktopSettings.filterStyle = getSchemeFilter(activeScheme, true);
                    this.desktopSettings.vignetteOpacity = getVignetteOpacity(activeScheme);
                }
                this.desktopSettings.textColor = activeScheme.textColor || 'white';
                if (this.desktopSettings.textColor === 'black') {
                    document.body.classList.add('theme-light-wallpaper');
                } else {
                    document.body.classList.remove('theme-light-wallpaper');
                }
            }
        },

        updateClock() {
          const now = new Date();
          const h = String(now.getHours()).padStart(2, '0');
          const m = String(now.getMinutes()).padStart(2, '0');
          this.currentTime = `${h}:${m}`;
        },

        initGrid() {
          this.desktopGrid.items = [];
          let r = 0, c = 0, p = 0;
          this.appDefs.forEach(def => {
            this.desktopGrid.items.push({
              type: 'app',
              id: def.id,
              spanRow: 1,
              spanCol: 1,
              originRow: r,
              originCol: c,
              page: p,
              name: def.name,
              desc: def.desc,
              svg: def.svg,
              delay: def.delay
            });
            c++;
            if (c >= GRID_COLS) { c = 0; r++; }
            if (r >= MAX_ROWS) { r = 0; p++; }
          });
          this.recalcRows();
        },

        // ============ 网格基础工具（items 是唯一真源，行数固定为 MAX_ROWS，不可突破） ============

        // 把行数固定为区域最大行数（不再随内容动态增长——核心应用区域大小是硬边界）
        recalcRows() {
          this.desktopGrid.rows = MAX_ROWS;
        },

        // 用矩形相交判断目标区域内（排除 excludeItem）重叠到的所有对象
        occupantsInRect(row, col, spanRow, spanCol, page, excludeItem = null) {
          const set = new Set();
          this.desktopGrid.items.forEach(it => {
            if (it === excludeItem || it.page !== page) return;
            const overlap = !(
              it.originCol + it.spanCol <= col ||
              col + spanCol <= it.originCol ||
              it.originRow + it.spanRow <= row ||
              row + spanRow <= it.originRow
            );
            if (overlap) set.add(it);
          });
          return set;
        },

        isRectFree(row, col, spanRow, spanCol, page, ignoreItem = null) {
          if (row < 0 || col < 0 || col + spanCol > GRID_COLS || row + spanRow > MAX_ROWS) return false;
          return this.occupantsInRect(row, col, spanRow, spanCol, page, ignoreItem).size === 0;
        },

        // 从上到下、从左到右扫描第一个可容纳指定尺寸的位置
        findFirstFit(spanRow, spanCol, page) {
          for (let r = 0; r <= MAX_ROWS - spanRow; r++) {
            for (let c = 0; c <= GRID_COLS - spanCol; c++) {
              if (this.isRectFree(r, c, spanRow, spanCol, page)) return { row: r, col: c, page };
            }
          }
          return null;
        },

        // ============ 小组件添加 / 删除 ============
        addWidget(type, label) {
          const span = SPAN_MAP[type];
          if (!span) return;
          const pos = this.findFirstFit(span.spanRow, span.spanCol, this.currentPage);
          if (!pos) {
            alert('当前页面空间不足');
            return;
          }
          const item = {
            type: 'widget',
            id: 'widget_' + Date.now(),
            widgetType: type,
            label: label,
            spanRow: span.spanRow,
            spanCol: span.spanCol,
            originRow: pos.row,
            originCol: pos.col,
            page: pos.page
          };
          this.desktopGrid.items.push(item);
          this.recalcRows();
          this.showWidgetPicker = false;
        },

        removeWidget(item) {
          this.desktopGrid.items = this.desktopGrid.items.filter(it => it !== item);
          this.recalcRows();
        },

        mirrorSize(item) {
          return WIDGET_PIXEL_SIZE[item.widgetType] || { w: 156, h: 156 };
        },

        // ============ 统一 Pointer 工具 ============
        getPointer(e) {
          return e.touches ? e.touches[0] : e;
        },

        startLongPress(callback, delay) {
          this.cancelLongPress();
          this.longPressTimer = setTimeout(callback, delay);
        },

        cancelLongPress() {
          if (this.longPressTimer) {
            clearTimeout(this.longPressTimer);
            this.longPressTimer = null;
          }
        },

        isDragging(entity) {
          return this.dragState.item === entity;
        },

        // ============ 空白区域长按触发编辑模式（统一 touch/mouse） ============
        handlePointerDown(e) {
          const pointer = this.getPointer(e);
          if (pointer) {
            this.startX = pointer.clientX;
            this.startY = pointer.clientY;
          }
          if (e.target.closest('[data-group]') || e.target.closest('[data-grid-item]') || e.target.closest('#dock-grid-container') || e.target.closest('button')) return;
          this.startLongPress(() => {
            this.isEditing = true;
          }, 500);
        },

        handlePointerUp(e) {
          this.cancelLongPress();
        },

        // ============ Dock 图标拖拽（保持原逻辑，独立于网格） ============
        handleDockPressStart(e, index) {
          this.cancelLongPress();

          const pointer = this.getPointer(e);
          this.startX = pointer.clientX;
          this.startY = pointer.clientY;
          this.pointerX = pointer.clientX;
          this.pointerY = pointer.clientY;

          if (this.isEditing) {
            this.activateDockDrag(index);
          } else {
            const id = this.dockApps[index].id;
            this.startLongPress(() => {
              this.isEditing = true;
              this.poppingId = id;
              setTimeout(() => { this.poppingId = null; }, 150);
              this.activateDockDrag(index);
            }, 500);
          }
        },

        activateDockDrag(index) {
          this.dragState.item = this.dockApps[index];
          this.dragState.source = 'dock';
          this.dragState.index = index;
          this.dragState.moved = false;
        },

        updateDockPointerAndReorder(x, y) {
          const targetEl = document.elementFromPoint(x, y);
          if (!targetEl) return;

          const card = targetEl.closest('[data-group="dock"]');
          if (card) {
            const targetIndex = parseInt(card.getAttribute('data-index'));
            if (targetIndex !== this.dragState.index && !isNaN(targetIndex)) {
              const movedItem = this.dockApps.splice(this.dragState.index, 1)[0];
              this.dockApps.splice(targetIndex, 0, movedItem);
              this.dragState.index = targetIndex;
            }
          }
        },

        // ============ 网格图标 / 小组件拖拽（新逻辑） ============
        handleGridPressStart(e, cell) {
          this.cancelLongPress();

          const pointer = this.getPointer(e);
          this.startX = pointer.clientX;
          this.startY = pointer.clientY;
          this.pointerX = pointer.clientX;
          this.pointerY = pointer.clientY;

          if (this.isEditing) {
            this.activateGridDrag(cell);
          } else {
            this.startLongPress(() => {
              this.isEditing = true;
              this.poppingId = cell.id;
              setTimeout(() => { this.poppingId = null; }, 150);
              this.activateGridDrag(cell);
            }, 500);
          }
        },

        activateGridDrag(cell) {
          this.dragState.item = cell;
          this.dragState.source = 'desktop';
          this.dragState.originRow = cell.originRow;
          this.dragState.originCol = cell.originCol;
          this.dragState.originPage = cell.page;
          this.dragState.hoverRow = cell.originRow;
          this.dragState.hoverCol = cell.originCol;
          this.dragState.hoverPage = cell.page;
          this.dragState.moved = false;
        },

        // 根据指针坐标换算目标行列（无需 elementFromPoint，纯几何计算）
        pointerToCell(x, y) {
          const grids = document.querySelectorAll('.page-grid');
          const gridEl = grids[this.currentPage];
          if (!gridEl) return null;
          const rect = gridEl.getBoundingClientRect();
          const colWidth = (rect.width - COL_GAP * (GRID_COLS - 1)) / GRID_COLS;

          let col = Math.floor((x - rect.left) / (colWidth + COL_GAP));
          let row = Math.floor((y - rect.top) / (ROW_PITCH + ROW_GAP));

          col = Math.max(0, Math.min(GRID_COLS - 1, col));
          // 悬停行严格钳制在核心应用区域最大行数以内，指针拖到线下方也不会越界
          row = Math.max(0, Math.min(MAX_ROWS - 1, row));
          return { row, col, page: this.currentPage };
        },

        handlePointerMove(e) {
          const pointer = this.getPointer(e);
          if (!pointer) return;

          const isTouch = !!e.touches;

          if (this.dragState.item) {
            if (isTouch && e.cancelable) e.preventDefault();
          } else if (this.longPressTimer) {
            const dist = Math.hypot(pointer.clientX - this.startX, pointer.clientY - this.startY);
            if (dist > 8) this.cancelLongPress();
          }

          this.updatePointer(pointer.clientX, pointer.clientY);
        },

        // 根据 dragState.source 自动分发到 Dock 排序逻辑或 Desktop 网格放置逻辑
        updatePointer(x, y) {
          this.pointerX = x;
          this.pointerY = y;
          if (!this.dragState.item) return;
          this.dragState.moved = true;

          if (this.dragState.source === 'dock') {
            this.updateDockPointerAndReorder(x, y);
          } else if (this.dragState.source === 'desktop') {
            this.updateGridPointer(x, y);
          }
        },

        updateGridPointer(x, y) {
          const pos = this.pointerToCell(x, y);
          if (pos) {
            this.dragState.hoverRow = pos.row;
            this.dragState.hoverCol = pos.col;
            this.dragState.hoverPage = pos.page;
          }

          const screenW = window.innerWidth;
          if (x < 40 && this.currentPage > 0 && !this.edgeTimer) {
             this.edgeTimer = setTimeout(() => { this.currentPage--; this.edgeTimer = null; }, 600);
          } else if (x > screenW - 40 && this.currentPage < this.totalPages - 1 && !this.edgeTimer) {
             this.edgeTimer = setTimeout(() => { this.currentPage++; this.edgeTimer = null; }, 600);
          } else if (x >= 40 && x <= screenW - 40 && this.edgeTimer) {
             clearTimeout(this.edgeTimer);
             this.edgeTimer = null;
          }
        },

        endDrag(e) {
          this.cancelLongPress();
          
          if (!this.dragState.item && this.startX !== null && e) {
            const pointer = (e.changedTouches && e.changedTouches.length > 0) ? e.changedTouches[0] : (e.clientX !== undefined ? e : null);
            if (pointer && pointer.clientX !== undefined) {
              const diff = pointer.clientX - this.startX;
              if (diff > 40 && this.currentPage > 0) this.currentPage--;
              else if (diff < -40 && this.currentPage < this.totalPages - 1) this.currentPage++;
            }
          }

          if (this.dragState.source === 'desktop' && this.dragState.item) {
            this.attemptGridPlacement();
          }
          this.dragState = {
            item: null, source: null, index: null,
            originRow: null, originCol: null, originPage: null,
            hoverRow: null, hoverCol: null, hoverPage: null,
            moved: false
          };
          this.startX = null;
          this.startY = null;
          if (this.edgeTimer) {
            clearTimeout(this.edgeTimer);
            this.edgeTimer = null;
          }
        },

        attemptGridPlacement() {
          const item = this.dragState.item;
          if (!this.dragState.moved || this.dragState.hoverRow === null || this.dragState.hoverCol === null) return;

          let targetCol = Math.min(this.dragState.hoverCol, GRID_COLS - item.spanCol);
          targetCol = Math.max(0, targetCol);
          const targetRow = Math.max(0, this.dragState.hoverRow);
          const targetPage = this.dragState.hoverPage;

          if (targetRow === item.originRow && targetCol === item.originCol && targetPage === item.page) return;

          const success = this.tryPlaceItem(item, targetRow, targetCol, targetPage);
          if (!success) {
            const failId = item.id;
            this.placementFailedId = failId;
            setTimeout(() => {
              if (this.placementFailedId === failId) this.placementFailedId = null;
            }, 320);
          }
        },

        // 核心放置逻辑：空位直接移动 / 同尺寸交换 / 应用图标让位给小组件 / 小组件与多个应用图标整体互换
        // 关键点：占用判断始终对 items（唯一真源）做矩形相交计算，不依赖 cells 数组是否同步 —— 从根源杜绝"组件与图标重叠"；
        // 且只有在确认可以成功放置时才修改 items 并 recalcRows，失败时不产生任何副作用，也绝不会扩大网格行数 —— 从根源杜绝"网格无限膨胀"。
        tryPlaceItem(item, targetRow, targetCol, targetPage) {
          const spanRow = item.spanRow, spanCol = item.spanCol;
          if (targetRow < 0 || targetCol < 0 || targetCol + spanCol > GRID_COLS || targetRow + spanRow > MAX_ROWS) return false;

          const overlapping = this.occupantsInRect(targetRow, targetCol, spanRow, spanCol, targetPage, item);

          // 情况一：目标区域为空 —— 直接移动
          if (overlapping.size === 0) {
            item.originRow = targetRow;
            item.originCol = targetCol;
            item.page = targetPage;
            this.recalcRows();
            return true;
          }

          // 情况二：目标区域恰好被一个对象占据
          if (overlapping.size === 1) {
            const other = [...overlapping][0];

            // 二 a：尺寸完全相同 —— 直接交换
            if (other.spanRow === spanRow && other.spanCol === spanCol) {
              const itemOriginRow = item.originRow, itemOriginCol = item.originCol, itemPage = item.page;
              other.originRow = itemOriginRow;
              other.originCol = itemOriginCol;
              other.page = itemPage;
              item.originRow = targetRow;
              item.originCol = targetCol;
              item.page = targetPage;
              this.recalcRows();
              return true;
            }

            // 二 b：应用图标拖到被小组件占据的位置 —— 让位到下一个空格，而非失败
            if (item.type === 'app' && other.type === 'widget') {
              return this.relocateAppToNextEmpty(item, targetPage);
            }
          }

          // 情况三：目标区域被多个 1×1 应用图标占据 —— 整体互换
          const overlapArr = [...overlapping];
          const allApps1x1 = overlapArr.every(o => o.type === 'app' && o.spanRow === 1 && o.spanCol === 1);
          if (allApps1x1) {
            const originRow = item.originRow, originCol = item.originCol, originPage = item.page;
            const originSpanRow = item.spanRow, originSpanCol = item.spanCol;

            // 找出组件移动后“腾出”的那些格子（即原本在占据，但新目标不再覆盖的格子）
            const freedCells = [];
            for (let r = originRow; r < originRow + originSpanRow; r++) {
              for (let c = originCol; c < originCol + originSpanCol; c++) {
                if (targetPage !== originPage || r < targetRow || r >= targetRow + item.spanRow || c < targetCol || c >= targetCol + item.spanCol) {
                  freedCells.push({ row: r, col: c, page: originPage });
                }
              }
            }

            item.originRow = targetRow;
            item.originCol = targetCol;
            item.page = targetPage;

            for (let k = 0; k < overlapArr.length; k++) {
              if (k < freedCells.length) {
                overlapArr[k].originRow = freedCells[k].row;
                overlapArr[k].originCol = freedCells[k].col;
                overlapArr[k].page = freedCells[k].page;
              } else {
                 // 理论上如果不超出范围，腾出的格子数量等于新占的格子数，但做个兜底以防万一
                 this.relocateAppToNextEmpty(overlapArr[k], targetPage);
              }
            }
            this.recalcRows();
            return true;
          }

          // 其余情况（例如目标区域混合了不同尺寸的小组件）：放置失败，items 完全不变，弹回原位
          return false;
        },

        // 应用图标被小组件挡住时，寻找下一个空格落位；只在 MAX_ROWS 范围内找，
        // 找不到就说明区域已经放满了，直接放置失败（弹回原位），绝不会越过边界新起一行
        relocateAppToNextEmpty(item, targetPage) {
          for (let rr = 0; rr < MAX_ROWS; rr++) {
            for (let cc = 0; cc < GRID_COLS; cc++) {
              if (rr === item.originRow && cc === item.originCol && item.page === targetPage) continue;
              if (this.isRectFree(rr, cc, 1, 1, targetPage, item)) {
                item.originRow = rr;
                item.originCol = cc;
                item.page = targetPage;
                this.recalcRows();
                return true;
              }
            }
          }
          return false;
        },

        // ============ 编辑模式退出 ============
        handleBackgroundClick(e) {
          if (this.isEditing && !e.target.closest('#top-grid-container') && !e.target.closest('#dock-grid-container')) {
            this.exitEditing();
          }
        },

        exitEditing() {
          this.isEditing = false;
          this.showWidgetPicker = false;
          this.endDrag();
        },

        // ============ 应用打开 / 关闭 ============
        handleAppClick(app) {
          if (this.isEditing) return;
          this.openApp(app.name, app.desc);
        },

        openApp(name, desc) {
          this.activeAppName = name;
          this.activeAppDesc = desc;
          this.activeAppModal = true;
        },

        closeApp() {
          this.activeAppModal = false;
        }
      }
    }

    document.addEventListener('DOMContentLoaded', () => {
      // lucide observer removed since we now use inline SVGs
    });
