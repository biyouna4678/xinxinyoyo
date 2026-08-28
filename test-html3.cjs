const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  page.on('response', async response => {
    if (response.url().includes('desktop.css')) {
      const text = await response.text();
      console.log('TYPE:', response.headers()['content-type']);
      console.log('CONTENT:', text.substring(0, 50));
    }
  });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await browser.close();
})();
