const fs = require('fs');

let indexHtml = fs.readFileSync('index.html', 'utf8');
let v2AppHtml = fs.readFileSync('v2_app.html', 'utf8');

// Extract from v2AppHtml (everything from the first <div x-show="currentTab === 'wallpaper'" to the end of numericDialog)
// v2_app.html is exactly just the views, so we can just trim it.
let replacementText = v2AppHtml;

// find the start in indexHtml
const startTag = `            <div 
                x-show="currentTab === 'wallpaper'"`;
const endTagMarker = `<!-- 3. 全局主题色视图 -->`;

let startIndex = indexHtml.indexOf(startTag);
let endIndex = indexHtml.indexOf(endTagMarker);

if (startIndex === -1 || endIndex === -1) {
    console.log("Could not find start or end tags", startIndex, endIndex);
} else {
    // We want to replace from startIndex up to the character right before endIndex
    let newIndexHtml = indexHtml.substring(0, startIndex) + replacementText + '\n            ' + indexHtml.substring(endIndex);
    fs.writeFileSync('index.html', newIndexHtml);
    console.log("Replaced successfully!");
}
