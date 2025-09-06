const express=require('express')

const app =express()

const data1 = [
    // 原始数据（保留）
    {
      id: 11,
      name: '电子书',
      children: [
        {
          id: 21,
          name: '小说',
          children: [
            { id: 31, name: '校园青春' },
            { id: 32, name: '武侠奇幻' }
          ]
        },
        {
          id: 22,
          name: '自传',
          children: [
            { id: 33, name: '人生成长' },
            { id: 34, name: '解密人物' }
          ]
        }
      ]
    },
    {
      id: 12,
      name: '家电',
      children: [
        {
          id: 23,
          name: '厨房用具',
          children: [
            { id: 35, name: '抽油烟机' },
            { id: 36, name: '电磁炉' }
          ]
        },
        {
          id: 24,
          name: '卫生用具',
          children: [
            { id: 37, name: '洗衣机' },
            { id: 38, name: '烘干机' }
          ]
        }
      ]
    },
  
    // 新增的 14 个一级分类（完整扩展至 16 个）
    {
      id: 13,
      name: '服饰',
      children: [
        {
          id: 25,
          name: '男装',
          children: [
            { id: 39, name: 'T恤' },
            { id: 40, name: '裤子' }
          ]
        },
        {
          id: 26,
          name: '女装',
          children: [
            { id: 41, name: '连衣裙' },
            { id: 42, name: '外套' }
          ]
        }
      ]
    },
    {
      id: 14,
      name: '食品',
      children: [
        {
          id: 27,
          name: '零食',
          children: [
            { id: 43, name: '膨化食品' },
            { id: 44, name: '坚果' }
          ]
        },
        {
          id: 28,
          name: '饮品',
          children: [
            { id: 45, name: '果汁' },
            { id: 46, name: '碳酸饮料' }
          ]
        }
      ]
    },
    {
      id: 15,
      name: '美妆',
      children: [
        {
          id: 29,
          name: '护肤',
          children: [
            { id: 47, name: '面膜' },
            { id: 48, name: '精华液' }
          ]
        },
        {
          id: 30,
          name: '彩妆',
          children: [
            { id: 49, name: '口红' },
            { id: 50, name: '眼影' }
          ]
        }
      ]
    },
    {
      id: 16,
      name: '运动',
      children: [
        {
          id: 31,
          name: '运动服饰',
          children: [
            { id: 51, name: '运动T恤' },
            { id: 52, name: '运动短裤' }
          ]
        },
        {
          id: 32,
          name: '运动器材',
          children: [
            { id: 53, name: '哑铃' },
            { id: 54, name: '瑜伽垫' }
          ]
        }
      ]
    },
    {
      id: 17,
      name: '数码',
      children: [
        {
          id: 33,
          name: '手机',
          children: [
            { id: 55, name: '智能手机' },
            { id: 56, name: '配件' }
          ]
        },
        {
          id: 34,
          name: '电脑',
          children: [
            { id: 57, name: '笔记本' },
            { id: 58, name: '台式机' }
          ]
        }
      ]
    },
    {
      id: 18,
      name: '家居',
      children: [
        {
          id: 35,
          name: '家纺',
          children: [
            { id: 59, name: '床品四件套' },
            { id: 60, name: '窗帘' }
          ]
        },
        {
          id: 36,
          name: '装饰',
          children: [
            { id: 61, name: '摆件' },
            { id: 62, name: '墙画' }
          ]
        }
      ]
    },
    {
      id: 19,
      name: '母婴',
      children: [
        {
          id: 37,
          name: '奶粉',
          children: [
            { id: 63, name: '一段奶粉' },
            { id: 64, name: '二段奶粉' }
          ]
        },
        {
          id: 38,
          name: '玩具',
          children: [
            { id: 65, name: '积木' },
            { id: 66, name: '玩偶' }
          ]
        }
      ]
    },
    {
      id: 20,
      name: '图书',
      children: [
        {
          id: 39,
          name: '教材',
          children: [
            { id: 67, name: '小学教材' },
            { id: 68, name: '中学教材' }
          ]
        },
        {
          id: 40,
          name: '童书',
          children: [
            { id: 69, name: '绘本' },
            { id: 70, name: '故事书' }
          ]
        }
      ]
    },
    {
      id: 21,
      name: '宠物',
      children: [
        {
          id: 41,
          name: '宠物食品',
          children: [
            { id: 71, name: '狗粮' },
            { id: 72, name: '猫粮' }
          ]
        },
        {
          id: 42,
          name: '宠物用品',
          children: [
            { id: 73, name: '猫砂' },
            { id: 74, name: '牵引绳' }
          ]
        }
      ]
    },
    {
      id: 22,
      name: '汽车',
      children: [
        {
          id: 43,
          name: '汽车配件',
          children: [
            { id: 75, name: '轮胎' },
            { id: 76, name: '机油' }
          ]
        },
        {
          id: 44,
          name: '车载用品',
          children: [
            { id: 77, name: '行车记录仪' },
            { id: 78, name: '车载充电器' }
          ]
        }
      ]
    },
    {
      id: 23,
      name: '办公',
      children: [
        {
          id: 45,
          name: '办公设备',
          children: [
            { id: 79, name: '打印机' },
            { id: 80, name: '投影仪' }
          ]
        },
        {
          id: 46,
          name: '文具',
          children: [
            { id: 81, name: '笔记本' },
            { id: 82, name: '笔类' }
          ]
        }
      ]
    },
    {
      id: 24,
      name: '游戏',
      children: [
        {
          id: 47,
          name: '主机游戏',
          children: [
            { id: 83, name: 'PS5游戏' },
            { id: 84, name: 'Switch游戏' }
          ]
        },
        {
          id: 48,
          name: 'PC游戏',
          children: [
            { id: 85, name: '单机游戏' },
            { id: 86, name: '网络游戏' }
          ]
        }
      ]
    },
    {
      id: 25,
      name: '户外',
      children: [
        {
          id: 49,
          name: '露营装备',
          children: [
            { id: 87, name: '帐篷' },
            { id: 88, name: '睡袋' }
          ]
        },
        {
          id: 50,
          name: '登山用品',
          children: [
            { id: 89, name: '登山杖' },
            { id: 90, name: '冲锋衣' }
          ]
        }
      ]
    },
    {
      id: 26,
      name: '乐器',
      children: [
        {
          id: 51,
          name: '弦乐器',
          children: [
            { id: 91, name: '吉他' },
            { id: 92, name: '小提琴' }
          ]
        },
        {
          id: 52,
          name: '键盘乐器',
          children: [
            { id: 93, name: '钢琴' },
            { id: 94, name: '电子琴' }
          ]
        }
      ]
    }];


// 多级导航的服务器
app.all('/api/product/TypeNavList',(request,response)=>{
  // response.setHeader('Access-Control-Allow-Origin','*')
  const Data1={
    code:200,
    message:'Success',
    data:data1
  }
  setTimeout(()=>{
    response.send(Data1)
  },500)
})


app.listen(5000,()=>{
  console.log('服务器已在5000端口开启')
})