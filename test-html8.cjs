const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  page.on('console', msg => console.log('LOG:', msg.text()));
  page.on('response', res => {
    if(!res.ok()) console.log('ERR:', res.status(), res.url());
  });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await browser.close();
})();
