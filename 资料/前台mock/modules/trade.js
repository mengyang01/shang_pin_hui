import Mock from "mockjs";
import { userAddress, tradeInfo, sumitOrderSuccess, paymentInfo, paySuccessInfo, myOrderInfo } from "./tradeData";

//提取下面mock中的返回数据，单独放js文件里面

// mock获取用户地址信息
Mock.mock("/mock/user/userAddress/auth/findUserAddressList", "get", function (options) {
  return userAddress;
});

// 获取交易页信息
Mock.mock("/mock/order/auth/trade", "get", function (options) {
  return tradeInfo;
});

// 提交订单
Mock.mock(/\/mock\/order\/auth\/submitOrder/, "post", function (options) {
  return sumitOrderSuccess;
});

// /payment/weixin/createNative/${orderId}
Mock.mock(/\/mock\/payment\/weixin\/createNative\/\d+/, "get", function (options) {
  return paymentInfo;
});

// 获取支付订单状态
Mock.mock(/\/mock\/payment\/weixin\/queryPayStatus\/\d+/, "get", function (options) {
  return paySuccessInfo;
});

// // 我的订单： /order/auth/{page}/{limit} get
Mock.mock(/\/mock\/order\/auth\/\d+\/\d+/, "get", function (options) {
  return myOrderInfo;
})
