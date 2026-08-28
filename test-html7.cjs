const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  page.on('console', msg => console.log('LOG:', msg.text()));
  page.on('pageerror', err => console.log('ERR:', err.message));
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  
  const bgClass = await page.evaluate(() => {
    return document.querySelector('.default-grey-wallpaper')?.className;
  });
  console.log('Class:', bgClass);
  const bgColor = await page.evaluate(() => {
    return window.getComputedStyle(document.querySelector('.default-grey-wallpaper')).background;
  });
  console.log('Background:', bgColor);
  
  await browser.close();
})();
