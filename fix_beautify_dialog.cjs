const fs = require('fs');
let code = fs.readFileSync('js/beautify.js', 'utf8');

const oldConfirm = `        confirmNumericDialog() {
            let val = parseInt(this.numericDialog.value || '0', 10);
            if (isNaN(val)) val = 0;
            if (val > 200 && this.numericDialog.attr === 'saturation') val = 200;
            else if (val > 100) val = 100;
            this.tempEffects[this.numericDialog.attr] = val;
            this.closeNumericDialog();
        },`;

const newConfirm = `        confirmNumericDialog() {
            let val = parseInt(this.numericDialog.value || '0', 10);
            if (isNaN(val)) val = 0;
            if (this.numericDialog.attr === 'saturation') {
                if (val > 200) val = 200;
            } else {
                if (val > 100) val = 100;
            }
            this.tempEffects[this.numericDialog.attr] = val;
            this.closeNumericDialog();
        },`;

if (code.includes(oldConfirm)) {
    code = code.replace(oldConfirm, newConfirm);
    fs.writeFileSync('js/beautify.js', code);
    console.log('Fixed confirmNumericDialog');
} else {
    console.log('Could not find confirmNumericDialog');
}
