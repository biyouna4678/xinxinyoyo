const fs = require('fs');
let js = fs.readFileSync('public/js/desktop.js', 'utf8');

const replacements = {
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
  map: `<svg class="w-[32px] h-[32px] text-white" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <mask id="map-pin-mask">
      <path fill-rule="evenodd" d="M 50,5 C 34.5,5 22,17.5 22,33 C 22,51.5 41.5,73 50,87.5 C 58.5,73 78,51.5 78,33 C 78,17.5 65.5,5 50,5 Z M 50,20 C 57.2,20 63,25.8 63,33 C 63,40.2 57.2,46 50,46 C 42.8,46 37,40.2 37,33 C 37,25.8 42.8,20 50,20 Z" fill="#ffffff" />
      <path fill-rule="evenodd" d="M 50,77 C 25.1,77 5,81.5 5,87 C 5,92.5 25.1,97 50,97 C 74.9,97 95,92.5 95,87 C 95,81.5 74.9,77 50,77 Z M 50,82 C 68.4,82 83.3,84.2 83.3,87 C 83.3,89.8 68.4,92 50,92 C 31.6,92 16.7,89.8 16.7,87 C 16.7,84.2 31.6,82 50,82 Z" fill="#ffffff" />
    </mask>
  </defs>
  <rect x="0" y="0" width="100" height="100" mask="url(#map-pin-mask)" fill="currentColor" />
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
</svg>`,
  music: `<svg class="w-[32px] h-[32px] text-white" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
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
  food: `<svg class="w-[32px] h-[32px] text-white" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <mask id="takeaway-mask">
      <g fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round">
        <path d="M 45,36 V 23 C 45,15 51,10 59,10 C 67,10 72,15 72,23 V 36" stroke-width="4.5" />
        <path d="M 32,36 V 24 C 32,16 38,11 46,11 C 54,11 59,16 59,24 V 36" stroke-width="4.5" />
        <path d="M 21,75 L 27,36 H 73 L 79,75 Z" stroke-width="4.5" />
        <line x1="63" y1="36" x2="69" y2="75" stroke-width="4" />
      </g>
      <path d="M 32,36 V 24 C 32,16 38,11 46,11 C 54,11 59,16 59,24 V 36" fill="none" stroke="#000000" stroke-width="9" stroke-linecap="round" />
      <path d="M 32,36 V 24 C 32,16 38,11 46,11 C 54,11 59,16 59,24 V 36" fill="none" stroke="#ffffff" stroke-width="4.5" stroke-linecap="round" />
      <g fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round">
        <line x1="39" y1="52.5" x2="54" y2="67.5" stroke-width="4" />
        <g transform="translate(39, 52.5) rotate(-45)">
          <line x1="-5" y1="0" x2="5" y2="0" stroke-width="3.5" />
          <line x1="-4" y1="0" x2="-4" y2="-9" stroke-width="3" />
          <line x1="0" y1="0" x2="0" y2="-9.5" stroke-width="3" />
          <line x1="4" y1="0" x2="4" y2="-9" stroke-width="3" />
        </g>
        <line x1="50" y1="52.5" x2="35" y2="67.5" stroke-width="4" />
        <ellipse cx="53.5" cy="49" rx="5" ry="3.8" transform="rotate(-45 53.5 49)" stroke-width="3.2" fill="none" />
      </g>
    </mask>
  </defs>
  <rect x="0" y="0" width="100" height="100" mask="url(#takeaway-mask)" fill="currentColor" />
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
  <path d="M 44.8 17.2 C 29.5 17.2, 16.4 27.0, 12.0 41.4 C 7.0 57.6, 14.6 74.5, 28.7 81.7 C 39.2 87.0, 51.0 85.7, 57.5 78.5 C 61.4 74.1, 62.5 69.3, 59.7 66.0 C 57.3 63.2, 53.0 62.0, 49.8 59.7 C 46.3 57.2, 45.8 53.4, 48.4 50.4 C 50.9 47.5, 55.1 46.0, 57.5 42.7 C 60.6 38.4, 58.8 32.3, 54.5 27.6 C 51.6 24.2, 48.0 20.2, 44.8 17.2 Z" fill="currentColor" />
  <circle cx="31.8" cy="32.5" r="3.7" fill="transparent" />
  <circle cx="24.0" cy="42.0" r="3.7" fill="transparent" />
  <circle cx="22.2" cy="52.8" r="3.7" fill="transparent" />
  <circle cx="28.8" cy="64.5" r="3.7" fill="transparent" />
  <path d="M 84.5 11.0 C 82.3 10.0, 80.3 11.4, 78.5 13.2 L 70.0 22.0 C 66.0 26.2, 65.9 32.5, 69.1 36.8 C 72.3 41.0, 78.3 42.0, 82.4 38.7 C 86.6 35.2, 88.0 29.1, 85.0 24.1 C 82.9 20.5, 83.0 16.6, 84.5 11.0 Z" fill="currentColor" />
  <path d="M 69.0 41.1 L 81.8 42.1 L 80.6 49.7 L 68.3 48.7 Z" fill="currentColor" />
  <path d="M 68.1 51.0 L 80.5 52.0 L 77.8 80.7 C 77.4 84.7, 74.9 87.2, 71.8 87.0 C 68.4 86.8, 66.3 84.2, 66.7 80.5 Z" fill="currentColor" />
</svg>`,
  novel: `<svg class="w-[32px] h-[32px] text-white" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-label="一起来看小说">
  <path d="M 18 28 L 22 28 L 22 69 C 22 70.4, 23.0 71.2, 24.4 71.0 C 32.8 69.7, 41.5 71.7, 48.0 76.6 L 18 76.6 Z" fill="currentColor" />
  <path d="M 82 28 L 78 28 L 78 69 C 78 70.4, 77.0 71.2, 75.6 71.0 C 67.2 69.7, 58.5 71.7, 52.0 76.6 L 82 76.6 Z" fill="currentColor" />
  <path d="M 24.5 21.0 C 34.8 20.7, 43.0 23.2, 48.4 28.0 L 48.4 76.4 C 41.4 71.0, 32.8 68.8, 24.5 70.0 Z" fill="currentColor" />
  <path d="M 75.5 21.0 C 65.2 20.7, 57.0 23.2, 51.6 28.0 L 51.6 76.4 C 58.6 71.0, 67.2 68.8, 75.5 70.0 Z" fill="currentColor" />
  <path d="M 48.4 27.5 C 49.0 27.9, 49.5 28.3, 50 28.8 C 50.5 28.3, 51.0 27.9, 51.6 27.5 L 51.6 76.4 C 51.0 76.9, 50.5 77.4, 50 78.0 C 49.5 77.4, 49.0 76.9, 48.4 76.4 Z" fill="transparent" />
  <path d="M 24.5 70.0 C 33.0 68.7, 41.7 71.1, 48.4 76.4 L 48.4 78.0 C 40.4 72.8, 32.3 71.1, 24.5 72.2 Z" fill="transparent" />
  <path d="M 75.5 70.0 C 67.0 68.7, 58.3 71.1, 51.6 76.4 L 51.6 78.0 C 59.6 72.8, 67.7 71.1, 75.5 72.2 Z" fill="transparent" />
</svg>`
};

for (const [key, value] of Object.entries(replacements)) {
  const regex = new RegExp(`${key}:\\s*\`<svg.*?</svg>\``, 's');
  if (regex.test(js)) {
    js = js.replace(regex, `${key}: \`${value}\``);
  } else {
    console.log(`Failed to match ${key}`);
  }
}

fs.writeFileSync('public/js/desktop.js', js);
