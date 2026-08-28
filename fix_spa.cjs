const fs = require('fs');

let indexHtml = fs.readFileSync('index.html', 'utf8');

// Remove the injected style and script that caused the black screen problem
indexHtml = indexHtml.replace(/<style>[\s\S]*?<\/style>/, '');
indexHtml = indexHtml.replace(/<script>\s*if\s*\(window\.location\.search\.includes\('skipLock=true'\)\)[\s\S]*?<\/script>/, '');

fs.writeFileSync('index.html', indexHtml);

console.log("Cleaned up injected spa styles");
