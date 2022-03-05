import { newPage } from './browser';

const login = async (info: any) => {
  const page = await newPage();
  await page.goto(info.host);

  if (info.type === 'yunoa') {
    // 登录按钮
    await page.waitForSelector('div[class*="login-btn-"]');
    // 等待渲染（否则点击无效）
    await page.waitForTimeout(1000);
    await page.click('div[class*="login-btn-"]');
    // 等待弹窗渲染
    await page.waitForTimeout(500);
  }

  // 输入账号密码
  const uniqueIdElement = await page.waitForSelector('#accountNo');
  await uniqueIdElement?.type(info.user, { delay: 20 });
  const passwordElement = await page.waitForSelector('#password');
  await passwordElement?.type(info.password, { delay: 20 });

  // 点击确定按钮进行登录
  await page.click('.login-form_button');
  await page.waitForTimeout(3000);

  // 单个工厂
  if (/\/home\b/.test(page.url())) {
    // 登录成功
    await page.waitForTimeout(2000);
    return page;
  }

  // 多个工厂需要选择  /oa-inclution/factory
  if (/\/factory\b/.test(page.url())) {
    await page.waitForSelector(`div[title=${info.factory}`);
    await page.waitForTimeout(1000);
    // 选择工厂
    await page.click(`div[title=${info.factory}`);
    await page.waitForTimeout(2000);
    return page;
  }

  return null;
};

export default login;
