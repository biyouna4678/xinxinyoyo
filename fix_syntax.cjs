const fs = require('fs');
let lockCode = fs.readFileSync('js/lockscreen.js', 'utf8');
lockCode = lockCode.replace('        }\n        }\n\n        enableDeviceNameEdit() {', '        },\n\n        enableDeviceNameEdit() {');
fs.writeFileSync('js/lockscreen.js', lockCode);
