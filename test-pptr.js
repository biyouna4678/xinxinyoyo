const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({args: ['--no-sandbox']});
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  await page.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
        <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
    </head>
    <body>
        <div x-data="{ total: 365 }">
            <template x-for="i in total" :key="i">
                <div x-text="i"></div>
            </template>
        </div>
    </body>
    </html>
  `);
  await page.waitForTimeout(2000);
  await browser.close();
})();
