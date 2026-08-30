const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace('x-cloak x-show="!isEditingDeviceName"', 'x-show="!isEditingDeviceName"');
html = html.replace('x-cloak x-show="!isEditing"', 'x-show="!isEditing"');
fs.writeFileSync('index.html', html);
console.log("Removed x-cloak from default-visible elements");
