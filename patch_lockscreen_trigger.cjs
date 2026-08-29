const fs = require('fs');

let js = fs.readFileSync('js/lockscreen.js', 'utf8');

js = js.replace(/triggerUnlockFlow\(route = 'desktop'\) \{\s*this\.targetRoute = route;\s*this\.executeUnlock\(route\);\s*\}/, 
`triggerUnlockFlow(route = 'desktop') {
          this.targetRoute = route;
          if (this.settings.unlockMethod === 'pin') {
            this.showPinPad = true;
          } else {
            this.executeUnlock(route);
          }
        }`);

fs.writeFileSync('js/lockscreen.js', js);
