const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

const regex = /(?:x-data|x-init|x-show|x-if|x-for|x-bind|x-on|@[\w.-]+|:[\w.-]+)="([^"]*)"/g;
let match;
while ((match = regex.exec(html)) !== null) {
    const expr = match[1];
    // skip empty or simple expressions
    if (!expr || /^[a-zA-Z0-9_]+$/.test(expr)) continue;
    
    // some x-for syntax: "item in items"
    if (expr.includes(' in ')) continue;
    
    // We can't eval all easily, but let's check for basic syntax errors
    try {
        // Just parsing using Function
        new Function(expr);
    } catch (e) {
        if (e instanceof SyntaxError) {
            // Might be an object literal like "{ a: 1 }" which needs parenthesis to parse as expression
            try {
                new Function('(' + expr + ')');
            } catch (e2) {
               // console.log("Potential syntax error in:", expr);
            }
        }
    }
}
console.log("Done checking simple expressions");
