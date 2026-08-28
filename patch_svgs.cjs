const fs = require('fs');
let js = fs.readFileSync('public/js/desktop.js', 'utf-8');

// Fix theme icon blobs
js = js.replace(/<circle cx="7.5" cy="8.5" r="1.2" fill="currentColor"\/>/g, '<circle cx="7.5" cy="8.5" r="1.2" fill="currentColor" stroke="none"/>');
js = js.replace(/<circle cx="11.5" cy="6.5" r="1.2" fill="currentColor"\/>/g, '<circle cx="11.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/>');
js = js.replace(/<circle cx="15.5" cy="8.5" r="1.2" fill="currentColor"\/>/g, '<circle cx="15.5" cy="8.5" r="1.2" fill="currentColor" stroke="none"/>');
js = js.replace(/<circle cx="17.5" cy="12.5" r="1.2" fill="currentColor"\/>/g, '<circle cx="17.5" cy="12.5" r="1.2" fill="currentColor" stroke="none"/>');

// Fix anniversary icon blobs (make the inner star thinner)
js = js.replace(/<path d="M12 14l1 2 2 1-2 1-1 2-1-2-2-1 2-1z"\/>/g, '<path d="M12 14l1 2 2 1-2 1-1 2-1-2-2-1 2-1z" stroke-width="1.2" stroke-linejoin="miter"/>');

fs.writeFileSync('public/js/desktop.js', js);
