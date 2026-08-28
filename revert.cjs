// Revert changes just to be absolutely compliant with "do not integrate yet".
const fs = require('fs');
fs.writeFileSync('index.html', fs.readFileSync('index.html.bak', 'utf8').replace('fake', 'fake')); // Wait, I don't have a backup.
