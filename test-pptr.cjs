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
        <div x-data="{ total: 3 }">
            <template x-for="i in total" :key="i">
                <div class="test" x-text="i"></div>
            </template>
        </div>
    </body>
    </html>
  `);
  await new Promise(r => setTimeout(r, 2000));
  const html = await page.evaluate(() => document.body.innerHTML);
  console.log("HTML:", html);
  await browser.close();
})();
