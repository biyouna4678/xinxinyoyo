const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Find the panel HTML
const panelStart = '  <!-- 自建色彩选择器面板 (Android / Web) -->';
const panelEnd = '  <!-- ================= END LOCKSCREEN ================= -->';

const panelStartIndex = html.indexOf(panelStart);
const panelEndIndex = html.indexOf(panelEnd, panelStartIndex);

if (panelStartIndex !== -1 && panelEndIndex !== -1) {
    const panelHTML = html.substring(panelStartIndex, panelEndIndex);
    
    // Remove the panel HTML from its current position
    html = html.substring(0, panelStartIndex) + html.substring(panelEndIndex);
    
    // Find the end of the lockscreen app div
    const scriptDiv = '  <script src="js/lockscreen.js"></script>\n  </div>';
    
    // Insert the panelHTML before scriptDiv
    html = html.replace(scriptDiv, panelHTML + scriptDiv);
    
    fs.writeFileSync('index.html', html);
    console.log("Fixed!");
} else {
    console.log("Could not find panel HTML");
}
