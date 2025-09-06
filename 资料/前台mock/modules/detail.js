import Mock from "mockjs";
import { goodsInfo, shopCartInfo } from "./detailData";

// /\/mock\/item\/\d+/ --> 正则表达式, 当有path参数时，需要写成这种方式
Mock.mock(/\/mock\/item\/\d+/, "get", function (options) {
  const skuId = options.url.match(/\/mock\/item\/(\d+)/)[1];

  // TODO 这里可以添加根据 skuId 返回不同数据的逻辑
  // 例如：
  // if(skuId === "1") return goodsInfo1;
  // else if(skuId === "2") return goodsInfo2;

  return goodsInfo;
});

// 模拟添加购物车接口
Mock.mock(/\/mock\/cart\/addToCart\/\d+\/-?\d+/, "post", function (options) {
  // 从URL中提取参数
  const urlParts = options.url.split("/");
  const skuId = urlParts[4];
  const skuNum = parseInt(urlParts[5]);

  return {
    code: 200,
    message: "添加购物车成功",
    data: null,
  };
});

Mock.mock("/mock/cart/cartList", "get", (options) => {
  return shopCartInfo;
});

// 删除商品
Mock.mock(/\/mock\/cart\/deleteCart\/\d+/, "delete", function (options) {
  return {
    code: 200,
    message: "成功",
    data: null,
    ok: true,
  };
});


Mock.mock(/\/mock\/cart\/checkCart\/\d+\/[01]/, "get", function(options) {
  // 从URL中解析参数
  const urlParts = options.url.split('/');
  const skuId = parseInt(urlParts[urlParts.length - 2]);
  const isChecked = urlParts[urlParts.length - 1] === '1';
  
  return {
    code: 200,
    message: "操作成功",
    data: {
      skuId: skuId,
      isChecked: isChecked,
      updateTime: new Date().toISOString()
    },
    ok: true
  };
});