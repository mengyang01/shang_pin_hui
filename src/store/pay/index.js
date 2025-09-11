import {reqOrderBuyInfo,reqPayStatus} from '@/api'

const state={
  // 订单支付信息
  orderBuyInfo:{}
}

const mutations={
  // 支付订单信息
  ORDERBUYINFO(state,info){
    state.orderBuyInfo=info
  },
}
const actions={
  // 根据支付交易号查找支付信息
  async getOrderBuyInfo({commit},orderId){
    let result = await reqOrderBuyInfo(orderId)
    if(result.code===200){
      commit('ORDERBUYINFO',result.data)
      return '获取支付信息成功'
    }else{
      return Promise.reject(new Error('获取支付信息失败'))
    }
  },
  // 查询支付状态
  async getPayStatus({commit},orderId){
    let result = await reqPayStatus(orderId)
      // console.log('服务器返回结果了',result.code)
    return result.code
  }
}

const getters={}

export default {
  namespaced:true,
  state,
  mutations,
  actions,
  getters
}