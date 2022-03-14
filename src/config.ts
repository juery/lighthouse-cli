// 输出配置
export const outPutInfo = {
  extends: 'lighthouse:default', // 默认参数
  settings: {
    // 自定义设置属性
    formFactor: 'desktop', // 类型 mobile ｜ desktop
    // locale: 'zh', // 语言
    screenEmulation: {
      // 类型对应尺寸等参数
      mobile: false,
      width: 1440,
      height: 780,
      deviceScaleFactor: 1,
      disabled: false,
    },
  },
};

// 需要检测的参数
export const innerParams = [
  'first-contentful-paint', // FCP
  'speed-index', // 首屏展现平均值
  'interactive', // TTI
  'largest-contentful-paint', // 最大绘图时间
  'cumulative-layout-shift', //
  'diagnostics', // 页面诊断信息
  'metrics', // 可用信息
  'network-requests', // 加载信息
];
