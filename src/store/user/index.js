import {reqGetcode,reqRegisterStatus,reqLogin} from '@/api'

const state={
  // 登录验证码
  code:'',
  // 用户信息
  userdata:{}
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
  async doneRegister({commit},registerdata){
    let result=await reqRegisterStatus(registerdata)
    if(result.code===200){
      console.log('注册状态',result)
      return '注册成功'
    }else{
      return Promise.reject(new Error('注册失败'))
    }
  },
  // 登录业务
  async login({commit},logindata){
    let result=await reqLogin(logindata)
    if(result.code===200){
      commit('LOGIN',result.data)
      return '登录成功'
    }else{
      return Promise.reject(new Error('登录失败'))
    }
  }
}
const mutations={
  // 修改验证码信息
  GETCODE(state,code){
    state.code=code
  },
  // 修改用户信息
  LOGIN(state,userdata){
    state.userdata=userdata
  }
}
const getters={
  // token令牌
  token(state){
    return state.userdata.token
  }
}

export default {
  namespaced:true,
  state,
  actions,
  mutations,
  getters
}
