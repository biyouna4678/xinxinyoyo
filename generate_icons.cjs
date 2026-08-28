const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  if (!fs.existsSync('icons')) {
    fs.mkdirSync('icons');
  }
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { margin: 0; display: flex; justify-content: center; align-items: center; background: #2A2A2A; height: 100vh; }
        .text { color: white; font-family: sans-serif; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="text">星</div>
    </body>
    </html>
  `;

  await page.setContent(html);

  // 512x512
  await page.setViewport({ width: 512, height: 512 });
  await page.evaluate(() => { document.querySelector('.text').style.fontSize = '300px'; });
  await page.screenshot({ path: 'icons/icon-512.png' });

  // 192x192
  await page.setViewport({ width: 192, height: 192 });
  await page.evaluate(() => { document.querySelector('.text').style.fontSize = '120px'; });
  await page.screenshot({ path: 'icons/icon-192.png' });

  await browser.close();
  console.log('Icons generated successfully.');
})();
