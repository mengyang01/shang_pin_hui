import {reqDetailInfo} from '@/api'
import {reqAddToShopCart} from '@/api'

const state={
  // 商品详情
  goodDetailInfo:{}
}
const actions={
  // 获取商品详情
  async getGoodDetailInfo({commit},skuId){
    const result=await reqDetailInfo(skuId)
    if(result.code===200){
      commit('GETGOODDETAILINFO',result.data)
    }
  },
  // 添加到购物车
  async addToShopCart({commit},{skuId,skuNum}){
    const result=await reqAddToShopCart(skuId,skuNum)
    if(result.code===200)
      return "成功"
    else{
      return Promise.reject(new Error("加入失败"))
    }
  }
}
const mutations={
  // 获取商品详情
  GETGOODDETAILINFO(state,goodDetailInfo){
    state.goodDetailInfo=goodDetailInfo
  }
}
const getters={
  // 路径面包屑
  categoryView(state){
    return state.goodDetailInfo.categoryView||{}
  },
  // 商品信息
  skuInfo(state){
    return state.goodDetailInfo.skuInfo||{}
  },
  // 商品售卖属性
  spuSaleAttrList(state){
    return state.goodDetailInfo.spuSaleAttrList||[]
  },
  
}

export default{
  namespaced:true,
  state,
  actions,
  mutations,
  getters
}
