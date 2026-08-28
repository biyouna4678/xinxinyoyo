const fs = require('fs');

global.window = {
    addEventListener: () => {},
    removeEventListener: () => {},
    localStorage: { getItem: () => null, setItem: () => {} },
    location: { search: '' },
    open: () => {},
    matchMedia: () => ({ matches: false }),
    ResizeObserver: class { observe(){} unobserve(){} disconnect(){} }
};
global.document = {
    addEventListener: () => {},
    querySelector: () => ({ content: '' }),
    querySelectorAll: () => [],
    getElementById: () => ({ style: {} }),
    createElement: () => ({ style: {} }),
    body: { classList: { add: () => {}, remove: () => {} } }
};
global.localStorage = global.window.localStorage;
global.setInterval = () => {};
global.setTimeout = () => {};

const globalStore = fs.readFileSync('public/js/global-store.js', 'utf8');
eval(globalStore);
const beautify = fs.readFileSync('public/js/beautify.js', 'utf8');
eval(beautify);
const lockscreen = fs.readFileSync('public/js/lockscreen.js', 'utf8');
eval(lockscreen);
const desktop = fs.readFileSync('public/js/desktop.js', 'utf8');
eval(desktop);

console.log("Evaluating init...");
try {
  let b = beautifyApp();
  b.init();
  console.log("beautifyApp initialized");
  
  let l = lockScreenApp();
  l.init();
  console.log("lockScreenApp initialized");
  
  let d = desktopApp();
  d.init();
  console.log("desktopApp initialized");
} catch(e) {
  console.error("Error:", e);
}
