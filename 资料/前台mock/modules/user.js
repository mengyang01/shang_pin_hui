import Mock from "mockjs";
import {  } from "./userData";

// /user/passport/sendCode
// 删除商品
Mock.mock(/\/mock\/user\/passport\/sendCode\/\d+/, "get", function (options) {
  return {
    code: 200,
    message: "成功",
    data: "800473",
    ok: true,
  };
});


// /api/user/passport/register
Mock.mock("/mock/user/passport/register", "post", function (options) {
  // 
  return {
    code: 200,
    message: "成功",
    data: null,
    ok: true,
  };
});

// /api/user/passport/register
Mock.mock("/mock/user/passport/login", "post", function (options) {
  // 
  return {
    code: 200,
    message: "成功",
    data: {
      name: "18944444444",
      nickName: "18944444444",
      token: "123456789123456789",
      userId: 42222
    },
    ok: true,
  };
});


Mock.mock("/mock/user/passport/auth/getUserInfo", "get", function (options) {
  // 
  return {
    code: 200,
    message: "成功",
    data: {
      name: "Admin",
      nickName: "Administrator",
      email: "UPD@qq.com",
      id: 2,
      loginName:"137000000000"
    },
    ok: true,
  };
});

// 退出登录
Mock.mock("/mock/user/passport/logout", "get", function (options) {
  return {
    code: 200,
    message: "成功",
    data: null,
    ok: true,
  };
});


