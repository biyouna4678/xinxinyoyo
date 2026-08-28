const fs = require('fs');
let content = fs.readFileSync('js/desktop.js', 'utf8');
content = content.replace(/handleAppClick\(app\) \{[\s\S]*?this\.openApp\(app\.name, app\.desc\);\s*\}/, 
`handleAppClick(app) {
          if (this.isEditing) return;
          if (app.id === 'theme') {
              window.location.href = 'beautify.html';
              return;
          }
          this.openApp(app.name, app.desc);
        }`);
fs.writeFileSync('js/desktop.js', content);
console.log("Patched");
