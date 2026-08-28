const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');
const userViews = fs.readFileSync('user_views.html', 'utf8');

// The current views in index.html start at <!-- 2. 壁纸管理视图 --> and end at <!-- 3. 全局主题色视图 -->
const startMarker = '<!-- 2. 壁纸管理视图 -->';
const endMarker = '<!-- 3. 全局主题色视图 -->';

let startIndex = indexHtml.indexOf(startMarker);
let endIndex = indexHtml.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
    const before = indexHtml.substring(0, startIndex);
    const after = indexHtml.substring(endIndex);
    
    // insert the new views exactly as they are in user_views.html
    const newHtml = before + startMarker + '\n' + userViews + '\n            ' + after;
    fs.writeFileSync('index.html', newHtml);
    console.log('Successfully patched index.html with exact user views!');
} else {
    console.log('Markers not found in index.html');
}
