// 服务器axios的二次封装
import axios from "axios";

import nProgress from "nprogress";  // 引入进度条
import 'nprogress/nprogress.css' ;  // 引入进度条样式
import store from '@/store'
// request就是axios，我们封装用,这里创建一个axios
const requests=axios.create({
  baseURL:'/api',
  timeout:3000
})
// 请求拦截器:发请求之前，请求拦截器可以检测到。从而在请求之前处理一些业务 || 开启进度条
requests.interceptors.request.use(
  (config)=>{// 成功的回调
      nProgress.start()// 开始进度条计时
        // config：配置对象，包含headers请求头
      if(store.state.shopcart.shopCartList){
        config.headers.userTempId=store.state.shopcart.shopCartList
      }
        
      return config   // 返回这个配置对象，如果没有返回，这个请求就不会发送出去

  },
  (err)=>{
      // 失败的回调，返回失败状态的Promise类型数据
      return Promise.reject(err)
  }
)

//响应拦截器，服务器返回数据以后，响应拦截器检测到，可以数据返回时处理一些事情 || 关闭进度条
requests.interceptors.response.use(
  (res)=>{
      nProgress.done()// 结束进度条计时
      // 成功的回调
      return res.data //返回里面的数据，在使用这个axios时，获取到的东西就是这里返回的东西
  },
  
  (err)=>{
      // 失败的回调，返回错误信息
      return Promise.reject(err)
  }
)

export default requests
