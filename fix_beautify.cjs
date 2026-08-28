const fs = require('fs');
let code = fs.readFileSync('public/js/beautify.js', 'utf8');

// Insert isOpen: false,
if (!code.includes('isOpen:')) {
    code = code.replace("return {", "return {\n        isOpen: false,\n        toast: { show: false, message: '' },\n        presetColors: [\n            { hex: '#D1506D', name: '绛紫' },\n            { hex: '#8C5A6F', name: '深梅' },\n            { hex: '#E07C94', name: '粉雾' },\n            { hex: '#A37286', name: '灰紫' },\n            { hex: '#4A5B73', name: '雾蓝' },\n            { hex: '#5E7869', name: '松绿' },\n            { hex: '#A89274', name: '暮卡' },\n            { hex: '#2C2C2C', name: '暗夜' }\n        ],");
    fs.writeFileSync('public/js/beautify.js', code);
    console.log("Fixed public/js/beautify.js");
} else {
    console.log("Already fixed");
}
