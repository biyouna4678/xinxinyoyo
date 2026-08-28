const fs = require('fs');
let js = fs.readFileSync('public/js/desktop.js', 'utf8');

const replacements = {
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
