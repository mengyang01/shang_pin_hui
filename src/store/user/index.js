import {reqGetcode,reqRegisterStatus,reqLogin,reqUserdata,reqLogout} from '@/api'
import {storageToken,getstorageToken,removeToken} from '@/utils/token'
const state={
  // 登录验证码
  code:'',
  //  登录token
  token:getstorageToken(),
  // 账户信息
  userdata:{},
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
      return '注册成功'
    }else{
      return Promise.reject(new Error('注册失败'))
    }
  },
  // 登录并获取token业务
  async login({commit},logindata){
    let result=await reqLogin(logindata)
    if(result.code===200){
      commit('LOGIN',result.data.token)
      storageToken(result.data.token)
      return '登录成功'
    }else{
      return Promise.reject(new Error('登录失败'))
    }
  },
  // 将token发给服务器,获取账户全部信息
  async getUserdata({commit,state}){
    // 如果没有token，即未登录，就不请求了  
    if(!state.token)
      return  '没有账户信息'
    let result = await reqUserdata(state.token)
    if(result.code===200){
      commit('GETUSERDATA',result.data)
      return '获取账户信息成功'
    }
    else
      return Promise.reject(new Error('获取账户信息失败'))
  },
  // 退出登录
  async logout({commit,state}){
    let result = await reqLogout()
    if(result.code===200){
      // 清空本地存储的token
      removeToken()
      // 重置数据状态
      commit('LOGOUT')
      return "成功退出"
    }else{
      return Promise.reject(new Error('退出失败'))
    }
  }
}

const mutations={
  // 修改验证码信息
  GETCODE(state,code){
    state.code=code
  },
  // 修改用户登录token
  LOGIN(state,token){
    state.token=token
  },
  // 修改账户信息
  GETUSERDATA(state,userdata){
    state.userdata=userdata
  },
  // 重置账户信息状态
  LOGOUT(state){
    state.token='',
    state.userdata={}
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
