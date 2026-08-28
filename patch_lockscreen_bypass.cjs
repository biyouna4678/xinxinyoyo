const fs = require('fs');
let content = fs.readFileSync('js/lockscreen.js', 'utf8');
content = content.replace(/init\(\) \{([\s\S]*?)this\.syncWithGlobalConfig\(\);/, `init() {
          const params = new URLSearchParams(window.location.search);
          if (params.get('skipLock') === 'true') {
              this.unlocked = true;
          }
$1this.syncWithGlobalConfig();`);
fs.writeFileSync('js/lockscreen.js', content);
console.log("Patched lockscreen.js");
