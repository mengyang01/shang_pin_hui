import Mock from "mockjs";

// 设置 Mock 请求超时时间
Mock.setup({
  // 随机延迟 200-600ms，模拟网络请求
  timeout: "200-600",
});

// 动态导入所有 mock 模块
const context = require.context("./modules", false, /\.js$/);
context.keys().forEach((key) => {
  context(key);
});