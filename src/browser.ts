import puppeteer from 'puppeteer';

export const browser = puppeteer.launch({
  headless: true, // 是否无头模式
  // devtools: true, // 调试工具
  args: [`--remote-debugging-port=8041`],
  defaultViewport: {
    width: 1440,
    height: 780,
  },
});

export const getBrowser = () => browser;

export const newPage = () => browser.then((x) => x.newPage());
