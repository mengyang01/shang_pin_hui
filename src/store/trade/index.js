import {reqAddress,reqTradeInfo,reqsubmitOrder} from '@/api'

const state={
  addressInfo:[],
  // 交易信息
  tradeInfo:{},
  // 支付订单号
  orderId:''
}
const mutations={
  // 修改地址信息
  GETADDRESS(state,addressInfo){
    state.addressInfo=addressInfo
  },
  // 订单信息
  TRADEINFO(state,tradeInfo){
    state.tradeInfo=tradeInfo
  },
  // 交易订单号
  SUBMITORDER(state,orderId){
    state.orderId=orderId
  }
}
const actions={
  // 请求获取地址信息
  async getAddress({commit}){
    let result = await reqAddress()
    if(result.code===200){
      commit('GETADDRESS',result.data)
    }
  },
  // 获取交易商品详细信息
  async getTradeInfo({commit}){
    let result = await reqTradeInfo()
    if(result.code===200)
      commit('TRADEINFO',result.data)
  },
  // 提交订单，并传递订单信息
  async submitOrder({commit},{tradeNo,data}){
    let result = await reqsubmitOrder(tradeNo,data)
    if(result.code===200){
      commit('SUBMITORDER',result.data)
      return '提交订单成功'
    }else{
      return Promise.reject(new Error('提交订单失败'))
    }
  }
}
const getters={
  // 简化获取tradeInfo中的商品内容
  tradeGoodList(state){
    return state.tradeInfo.detailArrayList||[]
  },
  // 商品总数
  totalNum(state){
    return state.tradeInfo.totalNum
  },
  // 商品总价
  totalPrice(state){
    return state.tradeInfo.totalAmount
  }
}

export default {
  namespaced:true,
  state,
  mutations,
  actions,
  getters
}