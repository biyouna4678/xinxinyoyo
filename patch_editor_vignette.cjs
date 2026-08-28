const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const target = `<div 
                            class="absolute inset-0 bg-cover bg-center transition-all duration-75"
                            :style="{ 
                                backgroundImage: \`url(\${editingScheme.desktop || editingScheme.lockscreen})\`,
                                filter: currentEditingFilter
                            }"
                        ></div>`;

const replacement = `<div 
                            class="absolute inset-0 bg-cover bg-center transition-all duration-75"
                            :style="{ 
                                backgroundImage: \`url(\${editingScheme.desktop || editingScheme.lockscreen})\`,
                                filter: currentEditingFilter
                            }"
                        ></div>
                        <div class="absolute inset-0 pointer-events-none transition-opacity duration-75"
                             :style="\`background: radial-gradient(circle, transparent 40%, rgba(0,0,0,\${tempEffects.vignette / 100}) 120%);\`"></div>`;

if(html.indexOf(target) !== -1) {
    html = html.replace(target, replacement);
    console.log("effectEditor vignette patched");
} else {
    // try fallback
    const target2 = `                            :style="{ \n                                backgroundImage: \`url(\${editingScheme.desktop || editingScheme.lockscreen})\`,\n                                filter: currentEditingFilter\n                            }"\n                        ></div>`;
    if(html.indexOf(target2) !== -1) {
        html = html.replace(target2, replacement);
        console.log("effectEditor vignette patched via fallback");
    } else {
        console.log("effectEditor vignette target not found, skipping or needs manual fix");
    }
}
fs.writeFileSync('index.html', html);
