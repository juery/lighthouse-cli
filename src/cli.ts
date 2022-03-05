/* eslint-disable no-console */
import fs from 'fs';
import { resolve } from 'path';
import { start } from './index';

const args = process.argv.slice(2);

const isInit = args.some((it) => it === 'init');
const isHelp = args.some((it) => /--?h(elp)?/.test(it));
const isVersion = args.some((it) => /--?v(ersion)?/.test(it));

const cfgPath = resolve(process.cwd(), 'site.jsonc');
const cfgJson = `
// 检测配置
{
  /** 检测的项目类型 取值 yunoa｜mes|srm */
  "type": "mes",
  /** 登录用户名 */
  "user": "登录用户名",
  /** 登录密码 */
  "password": "登录密码",
  /** 选择的工厂 */
  "factory": "工厂",
  /** 登录访问地址 */
  "host": "域名",
  /** 需要检测的链接地址 */
  "urlList": [
    "需要检测的链接地址",
  ]
}
`.trim();

const help = `
lighthouse 性能检测工具

使用:
 lh [option] <command>

command:
  init            生成配置

option:
  -h, --help      显示帮助
  -v, --version   显示版本
`;

if (isInit) {
  fs.writeFileSync(cfgPath, cfgJson, 'utf8');
  process.exit(0);
}

if (isHelp) {
  console.log(help);
  process.exit(0);
}

if (isVersion) {
  const { version } = require('../package.json'); // eslint-disable-line
  console.log(version);
  process.exit(1);
}

if (!fs.existsSync(cfgPath)) {
  console.log('配置不存在, 请执行 lh init');
  process.exit(2);
}

// console.log('检测中...');

const loadJsonc = (file: string) => {
  const code = fs.readFileSync(file, 'utf8');
  // eslint-disable-next-line @typescript-eslint/no-implied-eval
  return Function(`return (${code})`)();
};

start(loadJsonc(cfgPath)); // eslint-disable-line
