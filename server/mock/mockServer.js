import Mock from 'mockjs' //引入mock

// 引入数据
import banner from './banner.json'
import floors from './floors.json'
import goodDetailInfo from './goodDetailInfo.json'
import shopCartInfo from './shopCartInfo'

// 配置数据
Mock.mock('/mock/banner', { code: 200, data: banner })
Mock.mock('/mock/floors', { code: 200, data: floors })



// 下面是searchlist模块
const responseBody = {
  code: 0,
  data: null,
  message: "",
  ok: null,
  timestamp: null,
};

const builder = (data, message, code = 0, headers = {}) => {
  responseBody.data = data;
  if (message !== undefined && message !== null) {
    responseBody.message = message;
  }
  if (code !== undefined && code !== 0) {
    responseBody.code = code;
    responseBody.ok = true;
    responseBody._status = code;
  }
  if (
    headers !== null &&
    typeof headers === "object" &&
    Object.keys(headers).length > 0
  ) {
    responseBody._headers = headers;
  }
  responseBody.timestamp = new Date().getTime();
  return responseBody;
};


const getBody = (options) => {
  return options.body && JSON.parse(options.body);
};

const tmName = ["小米", "苹果", "华为", "VIVO"];

const hw = {
  defaultImg:
    "https://img12.360buyimg.com/n7/jfs/t1/55889/9/25143/34868/66aa333bF2e9ab72a/8b9341da393714cb.jpg",
  title:
    "华为 HUAWEI P40 麒麟990 5G SoC芯片 5000万超感知徕卡三摄 30倍数字变焦 6GB+128GB亮黑色全网通5G手机",
};

const apple = {
  defaultImg:
    "https://img14.360buyimg.com/n7/jfs/t1/135964/5/44400/23847/660df77aF58f3859d/b0e7eda2b1f3675a.jpg.avif",
  title: "Apple iPhone 12 (A2404) 64GB 黑色 支持移动联通电信5G 双卡双待手机",
};

const xm = {
  defaultImg:
    "https://img11.360buyimg.com/n7/jfs/t1/188942/31/11394/618784/60df1b65E2a2dc501/6b865a2677396b4d.png.avif",
  title:
    "Redmi 10X 4G Helio G85游戏芯 4800万超清四摄 5020mAh大电量 小孔全面屏 128GB大存储 8GB+128GB 冰雾白 游戏智能手机 小米 红米",
};

const VIVO = {
  defaultImg:
    "https://img14.360buyimg.com/n7/jfs/t1/257814/39/27437/31528/67c5f26bFc2dbb1fe/891a2b532be72e0c.jpg.avif",
  title:
    "VIVO 至尊纪念版 双模5G 骁龙865 120HZ高刷新率 120倍长焦镜头 120W快充 12GB+256GB 陶瓷黑 游戏手机",
};

const list = [hw, apple, xm, VIVO];



Mock.mock("/mock/searchlist", "post", (options) => {
  const params = getBody(options);
  console.log("传参：", params);
  if (params && !params.pageSize) {
    params.pageSize = 10;
  }
  const data = {
    trademarkList: [],
    attrsList: [
      {
        attrId: 106,
        attrValueList: ["安卓手机", "苹果手机"],
        attrName: "手机一级",
      },
      {
        attrId: 107,
        attrValueList: ["小米", "苹果", "华为"],
        attrName: "二级手机",
      },
    ],
    goodsList: [],
    total: 9999,
    pageSize: params.pageSize,
    pageNo: params.pageNo,
    totalPages: parseInt(9999 / params.pageSize) + 1,
  };

  if (params.keyword) {
    if (tmName.includes(params.keyword)) {
      data.trademarkList.push({
        tmId: tmName.findIndex((item) => item === params.keyword) + 1,
        tmName: params.keyword,
      });
    }
  } else {
    tmName.forEach((item, index) => {
      data.trademarkList.push({
        tmId: index + 1,
        tmName: item,
      });
    });
  }
  for (let i = 0; i < params.pageSize; i++) {
    const num = parseInt(Math.random() * 4, 10);
    const itemDetail = list[num];
    data.goodsList.push({
      id: Mock.mock("@integer(1,999)"),
      defaultImg: itemDetail.defaultImg,
      title: itemDetail.title,
      price: Mock.mock("@integer(1000,9999)"),
      createTime: null,
      tmId: null,
      tmName: null,
      category1Id: null,
      category1Name: null,
      category2Id: null,
      category2Name: null,
      category3Id: null,
      category3Name: null,
      hotScore: 0,
      attrs: null,
    });
  }
  return builder(data);
});


// 下面是detail模块
Mock.mock("/mock/item", "get", (options) => {
  const params = getBody(options);
  if (params === 1) {
    return goodDetailInfo
  }
  else {
    return {
      code: 500,
      message: 'params error',
    }
  }
});

// 添加加入购物车接口
Mock.mock(/\/mock\/cart\/addToCart\/\w+\/\-?\d+/, 'post', (options) => {
  return {
    "code": 200,
    "message": "成功",
    "data": null,
    "ok": true
  }
})

// 添加获取购物车列表接口
Mock.mock("/mock/cart/cartList", "get", (req,res) => {
  return shopCartInfo;
});

// 删除购物车商品信息
Mock.mock(/\/mock\/cart\/deleteCart\/\d+/, "delete", function (options) {
  return {
    code: 200,
    message: "成功",
    data: null,
    ok: true,
  };
});

// 修改购物车产品勾选状态
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


// /user/passport/sendCode
// 发送验证码
Mock.mock(/\/mock\/user\/passport\/sendCode\/\d+/, "get", function (options) {
  return {
    code: 200,
    message: "成功",
    data: "800473",
    ok: true,
  };
});

// 完成注册
// /user/passport/register
Mock.mock("/mock/user/passport/register", "post", function (options) {
  return {
    code: 200,
    message: "成功",
    data: null,
    ok: true,
  };
});

// 登录接口
Mock.mock("/mock/user/passport/login", "post", function (options) {
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

// 获取用户信息
Mock.mock("/mock/user/passport/auth/getUserInfo", "get", function (options) {
  if(options.body==='123456789123456789')
    return {
      code: 200,
      message: "成功",
      data: {
        name: "Admin",
        nickName: "Administrator",
        email: "UPD@qq.com",
        id: 2,
        loginName:"137000000000",
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
