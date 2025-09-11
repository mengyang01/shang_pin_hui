import {reqMyOreder} from '@/api'

const state={
  myorderInfo:{}
}
const mutations={
  // 我的订单数据
  GETMYORDER(state,data){
    state.myorderInfo=data
  }
}
const actions={
  // 获取我的订单内容
  async getMyOrder({commit},{page,limit}){
    let result=await reqMyOreder(page,limit)
    if(result.code==200){
      commit('GETMYORDER',result.data)
    }
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
