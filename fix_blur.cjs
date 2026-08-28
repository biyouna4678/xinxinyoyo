const fs = require('fs');

let indexHtml = fs.readFileSync('index.html', 'utf8');

// Replace the :class approach with a mixed :class and :style approach to ensure blur is applied
indexHtml = indexHtml.replace(
  /:class="\{\s*'blur-xl scale-110': desktopSettings\.isBlurred\s*\}"/,
  `:class="desktopSettings.isBlurred ? 'scale-110' : ''"`
);
indexHtml = indexHtml.replace(
  /:style="(\`background-image: url\('\\\$?\{desktopSettings\.wallpaperUrl\}'\);\`)"/,
  `:style="desktopSettings.isBlurred ? \`background-image: url('\${desktopSettings.wallpaperUrl}'); filter: blur(40px);\` : \`background-image: url('\${desktopSettings.wallpaperUrl}');\`"`
);

fs.writeFileSync('index.html', indexHtml);
console.log("Blur style patched");
