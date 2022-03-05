// import fs from 'fs';
import fs from 'fs-extra';
import path from 'path';
import login from './login';
import getContent from './getContent';
import { getBrowser } from './browser';

// 获取当前时间-年月日时分秒
const now = () => {
  const dt = new Date();
  const date = [[dt.getFullYear(), dt.getMonth() + 1, dt.getDate()].join('-'), [dt.getHours(), dt.getMinutes(), dt.getSeconds()].join(':')].join(' ').replace(/(?=\b\d\b)/g, '0');
  return date.replace(/\D/g, '');
};

const outDir = `report-${now()}`;

/*
目录结构
report-xx时间
  index.html
  dataInfo.js
  pages
    xxx.json
    xxx.html
*/

export const start = async (info: any) => {
  console.log('准备测试，登录中...');
  const page = await login(info);
  await page?.close();
  console.log('登录完成，开始测试！');
  const startTime = Date.now();

  const winStr = 'window.dataInfo=';

  const dataInfo: any = [];

  // 循环获取需要检测的页面信息
  for (let i = 0; i < info.urlList.length; i += 1) {
    console.log(`${info.urlList[i]}`);
    // eslint-disable-next-line no-await-in-loop
    await getContent(`${info.urlList[i]}`, outDir)
      .then((res) => {
        dataInfo.push({ url: info.urlList[i], ...res });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  await (await getBrowser()).close();

  const endTime = Date.now();

  // 消耗时间
  const timeConsumed = ((endTime - startTime) / 1000).toFixed(0);

  const infoText = {
    pageCount: info.urlList.length,
    totalTime: timeConsumed,
    type: info.type,
    pages: dataInfo,
    outDir,
  };

  // console.timeEnd('all time');
  fs.copySync(path.join(__dirname, '..', 'preview.html'), `${outDir}/index.html`);
  fs.outputFileSync(`${outDir}/dataInfo.js`, winStr + JSON.stringify(infoText), 'utf8');
  console.log('测试完成！');
};

export default start;
