const fs = require('fs');
let code = fs.readFileSync('js/beautify.js', 'utf8');

// replace the state vars
code = code.replace(/editingScheme: \{\},\n\s*activeEffectAttr: null,\n\s*tempEffects: \{ blur: 0, saturation: 100, vignette: 0 \},\n\n\s*numericDialog: \{\n\s*show: false,\n\s*attr: null,\n\s*value: ''\n\s*\},/g, '');

// remove the methods
const methodStart = "getSchemeFilter(scheme) {";
const methodEnd = "this.closeNumericDialog();\n        },";
// find index of getSchemeFilter
let startIndex = code.indexOf(methodStart);
if(startIndex !== -1) {
    let endIndex = code.indexOf(methodEnd, startIndex) + methodEnd.length;
    code = code.substring(0, startIndex) + code.substring(endIndex);
}

// remove desktop handle logic for editing scheme
code = code.replace(`if (this.editingScheme && this.editingScheme.id === scheme.id) {
                        this.editingScheme.desktop = imgUrl;
                    }`, '');

// remove blur properties from resetWallpaperScheme and newScheme
code = code.replace(/blur: \d+,/g, '');
code = code.replace(/saturation: \d+,/g, '');
code = code.replace(/vignette: \d+,/g, '');

code = code.replace(/desktop: '',\s+isPlaceholder/g, "desktop: '',\n                    isPlaceholder");

fs.writeFileSync('js/beautify.js', code);
console.log("beautify.js reverted");
