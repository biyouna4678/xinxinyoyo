const fs = require('fs');
let css = fs.readFileSync('public/css/desktop.css', 'utf8');

const newCSS = `
.liquid-glass-icon {
  position: relative;
  background: rgba(255, 255, 255, 0.22);
  border: 1.5px solid rgba(255, 255, 255, 0.7);
  box-shadow: 
    0 8px 12px rgba(0, 0, 0, 0.10),
    inset 0 -2px 4px rgba(0, 0, 0, 0.02),
    inset 0 2px 4px rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  overflow: hidden;
}

.liquid-glass-icon::before {
  content: '';
  position: absolute;
  top: -10%;
  left: -10%;
  width: 120%;
  height: 120%;
  background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.5) 0%, transparent 60%);
  pointer-events: none;
  mix-blend-mode: overlay;
  border-radius: inherit;
}

.liquid-glass-icon::after {
  content: '';
  position: absolute;
  bottom: 6px;
  left: 15%;
  width: 70%;
  height: 6px;
  background: radial-gradient(ellipse at center, rgba(255, 255, 255, 0.4) 0%, transparent 70%);
  filter: blur(2px);
  border-radius: 50%;
  pointer-events: none;
}

.liquid-glass-icon svg {
  filter: drop-shadow(0px 1px 1.5px rgba(0, 0, 0, 0.25));
}
`;

css = css.replace(/\.liquid-glass-icon\s*{[\s\S]*?}\s*\.liquid-glass-icon svg\s*{[\s\S]*?}/, newCSS.trim());
fs.writeFileSync('public/css/desktop.css', css);
