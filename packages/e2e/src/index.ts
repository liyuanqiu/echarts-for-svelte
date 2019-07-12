import puppeteer from 'puppeteer-core';
import { join } from 'path';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: join(
      __dirname,
      '..',
      'chrome-mac',
      'Chromium.app',
      'Contents',
      'MacOS',
      'Chromium',
    ),
    defaultViewport: {
      width: 1920,
      height: 1080,
    },
  });
  const page = await browser.newPage();
  async function screenshot(name: string) {
    await page.screenshot({
      path: join(__dirname, '..', '__screenshots', `${name}.png`),
    });
  }
  await page.goto('http://localhost:5000');
  await screenshot('first');
  await page.click('body > div:nth-child(4) > button:nth-child(1)');
  await screenshot('change-style');
  await page.click('body > div:nth-child(4) > button:nth-child(2)');
  await screenshot('change-option');
  await page.click('body > div:nth-child(4) > button:nth-child(3)');
  await screenshot('change-echarts');
  await page.click('body > div:nth-child(4) > button:nth-child(4)');
  await screenshot('change-className');
  await page.click('body > div:nth-child(4) > button:nth-child(5)');
  await screenshot('remove-bar-merge');
  await page.click('body > div:nth-child(4) > button:nth-child(6)');
  await screenshot('change-notMerge');
  await browser.close();
})();
