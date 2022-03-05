import lighthouse from 'lighthouse';
import fs from 'fs-extra';
import { outPutInfo, innerParams } from './config';

// 获取网页内容
const getContent = async (url: string, outDir: string) => {
  // 参数
  const options = {
    // logLevel: 'info', // 运行输出日志
    output: 'html', // html, JSON
    onlyCategories: ['performance'], // 性能指标
    port: 8041,
    disableStorageReset: true,
    viewport: {
      innerWidth: 1440,
      innerHeight: 780,
    },
  };

  const result = await lighthouse(url, options, outPutInfo);

  const { audits } = JSON.parse(JSON.stringify(result.lhr, null, 2));

  const lhrData: any[] = [];

  // 读取需要的数据
  Object.keys(audits).forEach((key) => {
    if (innerParams.indexOf(`${key}`) > -1) {
      lhrData.push({ id: audits[key].title.replace(/\s+/g, ''), displayValue: audits[key].displayValue || audits[key].details });
    }
  });

  const time = Date.now();

  fs.outputFileSync(`${outDir}/pages/${time}.json`, JSON.stringify(result.lhr, null, 2), 'utf8');
  fs.outputFileSync(`${outDir}/pages/${time}.html`, result.report, 'utf8');

  return { id: time, data: lhrData };
};

export default getContent;
