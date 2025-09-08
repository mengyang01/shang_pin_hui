// mock模拟接口axios二次封装

import axios from "axios";

import nProgress from "nprogress";
import 'nprogress/nprogress.css'
import store from '@/store'

const requests=axios.create({
  baseURL:'/mock',
  timeout:3000
})

requests.interceptors.request.use(
  (config)=>{
    nProgress.start()
    if(store.state.shopcart.tempId){
      // 请求头添加一个字段，该字段需要与后端沟通好
      config.headers.userTempId=store.state.shopcart.tempId
    }
    if(store.state.user.token)
      config.headers.token=store.state.user.token
    return config
  },

  (err)=>{
    return Promise.reject(err)
  }
)

requests.interceptors.response.use(
  (res)=>{
      nProgress.done()
      return res.data
  },

  (err)=>{
    return Promise.reject(err)
  }
)

export default requests