const fs = require('fs');
let indexHtml = fs.readFileSync('index.html', 'utf8');

indexHtml = indexHtml.replace(
  '<link rel="stylesheet" href="css/lockscreen.css">',
  '<link rel="stylesheet" href="css/lockscreen.css">\n  <link rel="stylesheet" href="css/beautify.css">'
);

fs.writeFileSync('index.html', indexHtml);
console.log('beautify.css injected');
