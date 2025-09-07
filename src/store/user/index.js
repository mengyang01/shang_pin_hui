import {reqGetcode,reqRegisterStatus} from '@/api'

const state={
  code:''
}
const actions={
  // 注册时发送验证码
  async getCode({commit},phone){
    let result=await reqGetcode(phone)
    if(result.code===200){
      console.log('验证码',result)
      commit('GETCODE',result.data)
      return '获取成功'
    }else{
      return Promise.reject(new Error('获取失败'))
    }
  },
  // 完成注册
  async doneRegister({commit},userdata){
    let result=await reqRegisterStatus(userdata)
    if(result.code===200){
      console.log('注册状态',result)
      return '注册成功'
    }else{
      return Promise.reject(new Error('注册失败'))
    }
  }
}
const mutations={
  GETCODE(state,code){
    state.code=code
  }
}
const getters={}

export default {
  namespaced:true,
  state,
  actions,
  mutations,
  getters
}
