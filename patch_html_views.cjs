const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
let v2Views = fs.readFileSync('v2_app.html', 'utf8');

const startMarker = '<!-- 1. 壁纸设置视图 -->';
const endMarker = '<!-- 3. 全局主题色视图 -->';

let startIndex = html.indexOf(startMarker);
let endIndex = html.indexOf(endMarker);

if(startIndex !== -1 && endIndex !== -1) {
    const before = html.substring(0, startIndex);
    const after = html.substring(endIndex);
    
    html = before + startMarker + '\n' + v2Views + '\n            ' + after;
    fs.writeFileSync('index.html', html);
    console.log('patched index views');
} else {
    console.log('markers not found');
}
