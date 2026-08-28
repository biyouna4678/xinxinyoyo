const fs = require('fs');
let css = fs.readFileSync('public/css/desktop.css', 'utf8');

// The incorrect block looks like:
// color: #ffffff !important;
// .liquid-glass-icon { ... }
// }

// Let's remove the .liquid-glass-icon block from inside matte-frosted-icon
css = css.replace(/\.liquid-glass-icon\s*{[\s\S]*?}\s*\.liquid-glass-icon svg\s*{[\s\S]*?}/, '');

// And append it correctly
const correctBlock = `
.liquid-glass-icon {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px) saturate(120%);
  -webkit-backdrop-filter: blur(10px) saturate(120%);
  border: 1.5px solid rgba(255, 255, 255, 0.75);
  box-shadow: 
    inset 1.5px 1.5px 3px rgba(255, 255, 255, 0.9),
    inset -1.5px -1.5px 3px rgba(0, 0, 0, 0.12),
    inset 0 -6px 10px rgba(255, 255, 255, 0.3),
    0 12px 20px rgba(0, 0, 0, 0.1);
}

.liquid-glass-icon svg {
  filter: drop-shadow(0px 1px 1.5px rgba(0, 0, 0, 0.25));
}
`;

css += correctBlock;
fs.writeFileSync('public/css/desktop.css', css);
