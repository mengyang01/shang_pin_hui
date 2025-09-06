// 三级联动mock数据
export const productCategoryData = {
  code: 200,
  message: "成功",
  data: [
    {
      categoryChild: [
        {
          categoryChild: [
            { categoryName: "电子书", categoryId: 11 },
            { categoryName: "网络原创", categoryId: 12 },
            { categoryName: "数字杂志", categoryId: 13 },
            { categoryName: "多媒体图书", categoryId: 14 },
          ],
          categoryName: "电子书刊",
          categoryId: 1,
        },
        {
          categoryChild: [
            { categoryName: "小说", categoryId: 21 },
            { categoryName: "文学", categoryId: 22 },
            { categoryName: "青春文学", categoryId: 23 },
            { categoryName: "传记", categoryId: 24 },
          ],
          categoryName: "音像",
          categoryId: 2,
        },
        {
          categoryChild: [
            { categoryName: "科普", categoryId: 31 },
            { categoryName: "IT", categoryId: 32 },
            { categoryName: "经管", categoryId: 33 },
            { categoryName: "励志", categoryId: 34 },
          ],
          categoryName: "英文原版",
          categoryId: 3,
        },
      ],
      categoryName: "图书、音像、电子书刊",
      categoryId: 1,
    },
    {
      categoryChild: [
        {
          categoryChild: [
            { categoryName: "手机通讯", categoryId: 41 },
            { categoryName: "运营商", categoryId: 42 },
            { categoryName: "手机配件", categoryId: 43 },
          ],
          categoryName: "手机",
          categoryId: 4,
        },
        {
          categoryChild: [
            { categoryName: "摄影摄像", categoryId: 51 },
            { categoryName: "数码配件", categoryId: 52 },
            { categoryName: "智能设备", categoryId: 53 },
          ],
          categoryName: "数码",
          categoryId: 5,
        },
        {
          categoryChild: [
            { categoryName: "电脑整机", categoryId: 61 },
            { categoryName: "电脑配件", categoryId: 62 },
            { categoryName: "外设产品", categoryId: 63 },
          ],
          categoryName: "电脑、办公",
          categoryId: 6,
        },
      ],
      categoryName: "家用电器",
      categoryId: 2,
    },
    {
      categoryChild: [
        {
          categoryChild: [
            { categoryName: "大家电", categoryId: 71 },
            { categoryName: "厨房电器", categoryId: 72 },
            { categoryName: "生活电器", categoryId: 73 },
          ],
          categoryName: "家电",
          categoryId: 7,
        },
        {
          categoryChild: [
            { categoryName: "厨具", categoryId: 81 },
            { categoryName: "家装建材", categoryId: 82 },
            { categoryName: "家具", categoryId: 83 },
          ],
          categoryName: "家居",
          categoryId: 8,
        },
        {
          categoryChild: [
            { categoryName: "男装", categoryId: 91 },
            { categoryName: "女装", categoryId: 92 },
            { categoryName: "内衣", categoryId: 93 },
          ],
          categoryName: "服饰、内衣",
          categoryId: 9,
        },
      ],
      categoryName: "家居、家具、家装、厨具",
      categoryId: 3,
    },
    {
      categoryChild: [
        {
          categoryChild: [
            { categoryName: "女鞋", categoryId: 101 },
            { categoryName: "男鞋", categoryId: 102 },
            { categoryName: "运动鞋", categoryId: 103 },
          ],
          categoryName: "鞋靴",
          categoryId: 10,
        },
        {
          categoryChild: [
            { categoryName: "箱包", categoryId: 111 },
            { categoryName: "钟表", categoryId: 112 },
            { categoryName: "珠宝", categoryId: 113 },
          ],
          categoryName: "奢侈品",
          categoryId: 11,
        },
        {
          categoryChild: [
            { categoryName: "运动服", categoryId: 121 },
            { categoryName: "运动鞋", categoryId: 122 },
            { categoryName: "骑行运动", categoryId: 123 },
          ],
          categoryName: "运动户外",
          categoryId: 12,
        },
      ],
      categoryName: "服饰、鞋靴、奢侈品",
      categoryId: 4,
    },
    {
      categoryChild: [
        {
          categoryChild: [
            { categoryName: "奶粉", categoryId: 131 },
            { categoryName: "营养辅食", categoryId: 132 },
            { categoryName: "尿裤湿巾", categoryId: 133 },
          ],
          categoryName: "母婴",
          categoryId: 13,
        },
        {
          categoryChild: [
            { categoryName: "洗护用品", categoryId: 141 },
            { categoryName: "美容工具", categoryId: 142 },
            { categoryName: "香水彩妆", categoryId: 143 },
          ],
          categoryName: "美妆个护",
          categoryId: 14,
        },
        {
          categoryChild: [
            { categoryName: "零食", categoryId: 151 },
            { categoryName: "酒类", categoryId: 152 },
            { categoryName: "生鲜", categoryId: 153 },
          ],
          categoryName: "食品饮料",
          categoryId: 15,
        },
      ],
      categoryName: "母婴、美妆、食品",
      categoryId: 5,
    },
    {
      categoryChild: [
        {
          categoryChild: [
            { categoryName: "汽车用品", categoryId: 161 },
            { categoryName: "汽车配件", categoryId: 162 },
            { categoryName: "汽车电子", categoryId: 163 },
          ],
          categoryName: "汽车用品",
          categoryId: 16,
        },
        {
          categoryChild: [
            { categoryName: "玩具", categoryId: 171 },
            { categoryName: "模型", categoryId: 172 },
            { categoryName: "动漫", categoryId: 173 },
          ],
          categoryName: "玩具乐器",
          categoryId: 17,
        },
        {
          categoryChild: [
            { categoryName: "鲜花", categoryId: 181 },
            { categoryName: "绿植", categoryId: 182 },
            { categoryName: "园艺", categoryId: 183 },
          ],
          categoryName: "鲜花绿植",
          categoryId: 18,
        },
      ],
      categoryName: "汽车、玩具、鲜花",
      categoryId: 6,
    },
    {
      categoryChild: [
        {
          categoryChild: [
            { categoryName: "医药", categoryId: 191 },
            { categoryName: "保健品", categoryId: 192 },
            { categoryName: "医疗器械", categoryId: 193 },
          ],
          categoryName: "医药保健",
          categoryId: 19,
        },
        {
          categoryChild: [
            { categoryName: "旅游", categoryId: 201 },
            { categoryName: "酒店", categoryId: 202 },
            { categoryName: "机票", categoryId: 203 },
          ],
          categoryName: "旅游出行",
          categoryId: 20,
        },
        {
          categoryChild: [
            { categoryName: "理财", categoryId: 211 },
            { categoryName: "贷款", categoryId: 212 },
            { categoryName: "保险", categoryId: 213 },
          ],
          categoryName: "金融理财",
          categoryId: 21,
        },
      ],
      categoryName: "医药、旅游、金融",
      categoryId: 7,
    },
    {
      categoryChild: [
        {
          categoryChild: [
            { categoryName: "教育培训", categoryId: 221 },
            { categoryName: "图书音像", categoryId: 222 },
            { categoryName: "考试", categoryId: 223 },
          ],
          categoryName: "教育培训",
          categoryId: 22,
        },
        {
          categoryChild: [
            { categoryName: "房产", categoryId: 231 },
            { categoryName: "装修", categoryId: 232 },
            { categoryName: "家居", categoryId: 233 },
          ],
          categoryName: "房产家居",
          categoryId: 23,
        },
        {
          categoryChild: [
            { categoryName: "宠物", categoryId: 241 },
            { categoryName: "水族", categoryId: 242 },
            { categoryName: "宠物用品", categoryId: 243 },
          ],
          categoryName: "宠物生活",
          categoryId: 24,
        },
      ],
      categoryName: "教育、房产、宠物",
      categoryId: 8,
    },
    {
      categoryChild: [
        {
          categoryChild: [
            { categoryName: "办公设备", categoryId: 251 },
            { categoryName: "办公耗材", categoryId: 252 },
            { categoryName: "文具", categoryId: 253 },
          ],
          categoryName: "办公用品",
          categoryId: 25,
        },
        {
          categoryChild: [
            { categoryName: "乐器", categoryId: 261 },
            { categoryName: "音乐", categoryId: 262 },
            { categoryName: "影视", categoryId: 263 },
          ],
          categoryName: "音乐影视",
          categoryId: 26,
        },
        {
          categoryChild: [
            { categoryName: "游戏", categoryId: 271 },
            { categoryName: "电竞", categoryId: 272 },
            { categoryName: "周边", categoryId: 273 },
          ],
          categoryName: "游戏电竞",
          categoryId: 27,
        },
      ],
      categoryName: "办公、音乐、游戏",
      categoryId: 9,
    },
    {
      categoryChild: [
        {
          categoryChild: [
            { categoryName: "工业品", categoryId: 281 },
            { categoryName: "工具", categoryId: 282 },
            { categoryName: "安防", categoryId: 283 },
          ],
          categoryName: "工业品",
          categoryId: 28,
        },
        {
          categoryChild: [
            { categoryName: "农业", categoryId: 291 },
            { categoryName: "农资", categoryId: 292 },
            { categoryName: "农机", categoryId: 293 },
          ],
          categoryName: "农业",
          categoryId: 29,
        },
        {
          categoryChild: [
            { categoryName: "商业", categoryId: 301 },
            { categoryName: "服务", categoryId: 302 },
            { categoryName: "租赁", categoryId: 303 },
          ],
          categoryName: "商业服务",
          categoryId: 30,
        },
      ],
      categoryName: "工业、农业、商业",
      categoryId: 10,
    },
    {
      categoryChild: [
        {
          categoryChild: [
            { categoryName: "艺术品", categoryId: 311 },
            { categoryName: "收藏品", categoryId: 312 },
            { categoryName: "古董", categoryId: 313 },
          ],
          categoryName: "艺术品",
          categoryId: 31,
        },
        {
          categoryChild: [
            { categoryName: "二手书", categoryId: 321 },
            { categoryName: "二手数码", categoryId: 322 },
            { categoryName: "二手家电", categoryId: 323 },
          ],
          categoryName: "二手商品",
          categoryId: 32,
        },
        {
          categoryChild: [
            { categoryName: "租赁", categoryId: 331 },
            { categoryName: "维修", categoryId: 332 },
            { categoryName: "回收", categoryId: 333 },
          ],
          categoryName: "租赁维修",
          categoryId: 33,
        },
      ],
      categoryName: "艺术、二手、租赁",
      categoryId: 11,
    },
    {
      categoryChild: [
        {
          categoryChild: [
            { categoryName: "本地生活", categoryId: 341 },
            { categoryName: "家政", categoryId: 342 },
            { categoryName: "婚庆", categoryId: 343 },
          ],
          categoryName: "本地服务",
          categoryId: 34,
        },
        {
          categoryChild: [
            { categoryName: "健康", categoryId: 351 },
            { categoryName: "医疗", categoryId: 352 },
            { categoryName: "养生", categoryId: 353 },
          ],
          categoryName: "健康医疗",
          categoryId: 35,
        },
        {
          categoryChild: [
            { categoryName: "公益", categoryId: 361 },
            { categoryName: "慈善", categoryId: 362 },
            { categoryName: "志愿者", categoryId: 363 },
          ],
          categoryName: "公益慈善",
          categoryId: 36,
        },
      ],
      categoryName: "服务、健康、公益",
      categoryId: 12,
    },
    {
      categoryChild: [
        {
          categoryChild: [
            { categoryName: "科技", categoryId: 371 },
            { categoryName: "创新", categoryId: 372 },
            { categoryName: "研发", categoryId: 373 },
          ],
          categoryName: "科技创新",
          categoryId: 37,
        },
        {
          categoryChild: [
            { categoryName: "环保", categoryId: 381 },
            { categoryName: "节能", categoryId: 382 },
            { categoryName: "再生", categoryId: 383 },
          ],
          categoryName: "环保节能",
          categoryId: 38,
        },
        {
          categoryChild: [
            { categoryName: "法律", categoryId: 391 },
            { categoryName: "咨询", categoryId: 392 },
            { categoryName: "公证", categoryId: 393 },
          ],
          categoryName: "法律服务",
          categoryId: 39,
        },
      ],
      categoryName: "科技、环保、法律",
      categoryId: 13,
    },
    {
      categoryChild: [
        {
          categoryChild: [
            { categoryName: "媒体", categoryId: 401 },
            { categoryName: "出版", categoryId: 402 },
            { categoryName: "广告", categoryId: 403 },
          ],
          categoryName: "媒体出版",
          categoryId: 40,
        },
        {
          categoryChild: [
            { categoryName: "宗教", categoryId: 411 },
            { categoryName: "信仰", categoryId: 412 },
            { categoryName: "用品", categoryId: 413 },
          ],
          categoryName: "宗教用品",
          categoryId: 41,
        },
        {
          categoryChild: [
            { categoryName: "成人", categoryId: 421 },
            { categoryName: "情趣", categoryId: 422 },
            { categoryName: "保健", categoryId: 423 },
          ],
          categoryName: "成人用品",
          categoryId: 42,
        },
      ],
      categoryName: "媒体、宗教、成人",
      categoryId: 14,
    },
    {
      categoryChild: [
        {
          categoryChild: [
            { categoryName: "虚拟", categoryId: 431 },
            { categoryName: "点卡", categoryId: 432 },
            { categoryName: "充值", categoryId: 433 },
          ],
          categoryName: "虚拟商品",
          categoryId: 43,
        },
        {
          categoryChild: [
            { categoryName: "定制", categoryId: 441 },
            { categoryName: "手工", categoryId: 442 },
            { categoryName: "DIY", categoryId: 443 },
          ],
          categoryName: "定制手工",
          categoryId: 44,
        },
        {
          categoryChild: [
            { categoryName: "其他", categoryId: 451 },
            { categoryName: "杂项", categoryId: 452 },
            { categoryName: "未分类", categoryId: 453 },
          ],
          categoryName: "其他分类",
          categoryId: 45,
        },
      ],
      categoryName: "虚拟、定制、其他",
      categoryId: 15,
    },
  ],
  ok: true,
};

// 首页轮播图
export const bannerList = {
  code: 200,
  data: [
    { id: "1", imgUrl: "/images/banner1.jpg" },
    { id: "2", imgUrl: "/images/banner2.jpg" },
    { id: "3", imgUrl: "/images/banner3.jpg" },
    { id: "4", imgUrl: "/images/banner4.jpg" },
  ],
};

// floor
export const floorList = {
  code: 200,
  data: [
    {
      id: "001",
      bigImg: "/images/floor-1-4.png",
      imgUrl: "/images/floor-1-1.png",
      name: "家用电器",
      carouselList: [
        { id: "0011", imgUrl: "/images/floor-1-b01.png" },
        { id: "0012", imgUrl: "/images/floor-1-b02.png" },
        { id: "0013", imgUrl: "/images/floor-1-b03.png" },
      ],
      keywords: ["节能补贴", "8K电视", "空气净化器", "IH电饭煲", "滚筒洗衣机", "电热水器"],
      navList: [
        { url: "#", text: "冷门" },
        { url: "#", text: "小家电" },
        { url: "#", text: "生活电器" },
        { url: "#", text: "厨房电器" },
        { url: "#", text: "应季电器" },
        { url: "#", text: "空气/净水" },
      ],
      recommendList: ["/images/floor-1-2.png", "/images/floor-1-3.png", "/images/floor-1-5.png", "/images/floor-1-6.png"],
    },
    {
      id: "002",
      bigImg: "/images/floor-1-4.png",
      imgUrl: "/images/floor-1-1.png",
      name: "家用电器",
      carouselList: [
        { id: "0011", imgUrl: "/images/floor-1-b01.png" },
        { id: "0012", imgUrl: "/images/floor-1-b02.png" },
        { id: "0013", imgUrl: "/images/floor-1-b03.png" },
      ],
      keywords: ["节能补贴", "4K电视", "空气净化器", "IH电饭煲", "滚筒洗衣机", "电热水器"],
      navList: [
        { url: "#", text: "热门" },
        { url: "#", text: "大家电" },
        { url: "#", text: "生活电器" },
        { url: "#", text: "厨房电器" },
        { url: "#", text: "应季电器" },
        { url: "#", text: "空气/净水" },
      ],
      recommendList: ["/images/floor-1-6.png", "/images/floor-1-3.png", "/images/floor-1-5.png", "/images/floor-1-2.png"],
    },
  ],
};
