// 这里书写 统一管理API的代码
import requests from "./API_request";
import mock from './Mock_request'

// 三级联动-商品分类导航API请求,暴露成函数形式，到时候直接函数调用即可完成请求
export const TypeNav = () => {
  return requests({
    url: "/product/TypeNavList",
    method: "get",
  })
}

// 轮播图-mock模拟数据api请求
export const reqBannerList = function () {
  return mock({
    url: '/banner',
    method: 'post'
  })
}

//floor底部轮播获取数据api
export const reqFloorList = () => mock.get('/floors')

//Search页面的相关API请求
export const reqSearchList = (metadata) => mock({
  url: '/searchlist',
  method: 'post',
  data: metadata
})

//Detail中获取商品详情信息的mock请求
export const reqDetailInfo=(skuId)=>mock({
  url:`/item`,
  method:'get',
  data:skuId
})
// 添加到购物车mock接口
export const reqAddToShopCart=(skuId,skuNum)=>mock({
  url:`/cart/addToCart/${skuId}/${skuNum}`,
  method:'post',
})
// 从购物车中拿到用户数据mock接口
export const reqShopCartList=()=>mock({
  url:'/cart/cartList',
  method:'get'
})
// 删除购物车商品数据的mock接口
export const reqDeleteCart=(skuId)=>mock({
  url:`/cart/deleteCart/${skuId}`,
  method:'delete'
})

// 修改商品选中状态mock接口
export const reqChangeChecked=(skuId,isChecked)=>mock({
  url:`/cart/checkCart/${skuId}/${isChecked}`,
  method:'get'
})

// 注册时发送验证码
export const reqGetcode=(phone)=>mock({
  url:`/user/passport/sendCode/${phone}`,
  method:'get',
})

// 完成注册
export const reqRegisterStatus=(userdata)=>mock({
  url:'/user/passport/register',
  method:'post',
  data:userdata
})
