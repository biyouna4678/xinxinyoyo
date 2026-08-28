const fs = require('fs');
let code = fs.readFileSync('js/global-store.js', 'utf8');

const targetStr = `        {
            id: 'scheme_white',
            name: '浅色壁纸',
            textColor: 'black',
            lockscreen: 'https://i.ibb.co/S4zFkqpx/IMG-5625.jpg',
            desktop: '', 
            isPlaceholder: false,
            isCurrent: true
        },
        {
            id: 'scheme_black',
            name: '深色壁纸',
            textColor: 'white',
            lockscreen: 'https://i.ibb.co/x86Ch5Fq/IMG-5626.jpg',
            desktop: '', 
            isPlaceholder: false,
            isCurrent: false
        },`;

const replacementStr = `        {
            id: 'scheme_white',
            name: '浅色壁纸',
            textColor: 'black',
            lockscreen: 'https://i.ibb.co/dsrzbzZF/IMG-5707.jpg',
            desktop: '',
            blur: 0,
            saturation: 100,
            vignette: 0,
            isPlaceholder: false,
            isCurrent: true
        },
        {
            id: 'scheme_black',
            name: '深色壁纸',
            textColor: 'white',
            lockscreen: 'https://i.ibb.co/x86Ch5Fq/IMG-5626.jpg',
            desktop: '',
            blur: 15,
            saturation: 100,
            vignette: 15,
            isPlaceholder: false,
            isCurrent: false
        },`;

code = code.replace(targetStr, replacementStr);

// Let's also update the "恢复默认" function if it exists in beautify.js later.
fs.writeFileSync('js/global-store.js', code);
console.log("global-store.js updated");
