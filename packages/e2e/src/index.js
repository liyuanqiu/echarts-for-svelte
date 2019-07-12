"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_core_1 = __importDefault(require("puppeteer-core"));
const path_1 = require("path");
(async () => {
    const browser = await puppeteer_core_1.default.launch({
        executablePath: path_1.join(__dirname, '..', 'chrome-mac', 'Chromium.app', 'Contents', 'MacOS', 'Chromium'),
        defaultViewport: {
            width: 1920,
            height: 1080,
        },
    });
    const page = await browser.newPage();
    async function screenshot(name) {
        await page.screenshot({
            path: path_1.join(__dirname, '..', '__screenshots', `${name}.png`),
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
//# sourceMappingURL=index.js.map