const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const regex = /x-data="({[\s\S]*?})"/g;
let match;
let count = 0;
while ((match = regex.exec(html)) !== null) {
    count++;
    const expr = match[1];
    try {
        new Function('return (' + expr + ')');
    } catch (e) {
        console.log("Error in x-data:");
        console.log(e.message);
        console.log(expr.substring(0, 200) + '...');
        console.log("-----------------------");
    }
}
console.log("Matched " + count + " x-data blocks.");
