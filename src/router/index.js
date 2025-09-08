import Vue from "vue";
import VueRouter from "vue-router";

//使用VueRouter
Vue.use(VueRouter)

// 重写push与replace方法
const originPush=VueRouter.prototype.push
const originReplace=VueRouter.prototype.replace
VueRouter.prototype.push=function(localData,resolve,reject){
  if(resolve&&reject){
    originPush.call(this,localData,resolve,reject)//关键的一步，改变this指向，否则originPush直接调用的话，里面的this指向的是window
  }else{
    originPush.call(this,localData,()=>{},()=>{})
  }
}
VueRouter.prototype.replace=function(localData,resolve,reject){
  if(resolve&&reject){
    originReplace.call(this,localData,resolve,reject)//关键的一步，改变this指向，否则originReplace直接调用的话，里面的this指向的是window
  }else{
    originReplace.call(this,localData,()=>{},()=>{})
  }
}

// 引入外部路由组件
import Home from "@/pages/Home/Home.vue"; 
import Search from "@/pages/Search";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Detail from "@/pages/Detail/index.vue";
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'

// 引入仓库
import store from '@/store'

const router=new VueRouter({
  // 路由内容
  routes:[
    {
      path:'/home',
      component:Home,
      meta:{
        isFooterShow:true
      }
    },
    {
      path:'/search/:keyword?',
      name:'search',
      component:Search,
      meta:{
        isFooterShow:true
      }
    },
    {
      path:'/login',
      component:Login,
      meta:{
        isFooterShow:false
      }
    },
    {
      path:'/register',
      component:Register,
      meta:{
        isFooterShow:false
      }
    },
    {
      path:'/detail/:skuid?',//:skuid为params占位符，可以传递商品id;“?”表示参数可传可不传
      component:Detail,
      name:'Detail',
      meta:{
        isFooterShow:true
      }
    },
    // 加入购物车是否成功页面
    { 
      path:'/addcartsuccess',
      name:'AddCartSuccess',
      component:AddCartSuccess,
      meta:{
        isFooterShow:true
      }
    },
    {
      path:'/shopcart',
      component:ShopCart,
      name:'ShopCart',
      meta:{
        isFooterShow:true
      }
    },
    // 来个重定向，一点进网址就是首页,意思就是访问"/"根文件时，导到"/home"路径上
    {
      path:'/',
      redirect:'/home'
    }
  ],
  // 滚动行为控制
  scrollBehavior(to,from,savedPosition){
    //返回的y=0代表滚动条在最上方
    return {y:0}
  }
})


// 添加全局路由前置守卫，负责每次路由跳转前去申请账户数据、防止登录后重复跳转的问题
router.beforeEach(async (to,from,next)=>{
  // 获取token、userdata
  let {token}=store.state.user
  let {userdata}=store.state.user
  // 如果有token，说明已经登录了，此时需要完成功能：1、禁止回到登录页；2、路由跳转前获取账户信息
  if(token){
    // 登录后试图再次进入登录页，导到home页去
     if(to.path==='/login'){
      next('/home')
     }
    // 登录后进入其他页，正常放行，同时要完成对账户信息的确保
     else{
      // 如果已经有数据，那么就不用再发请求了，直接放行【注意，空对象{}、空数组[]会被判断为真】
      if(userdata.name)
        next()
      // 如果没有数据，那么就重新派发申请拿到账户信息
      else{
        try{
          await store.dispatch('user/getUserdata')
          next()
        }catch(e){
          // 如果获取用户信息失败，那么只能说明token过期了，首先清空过期的token和用户数据
          // 之后需要重新登录获取token了
          await store.dispatch('user/logout')
          next('/login')
        }
      }
     }
  }
  // 没有token，代表没有登录，不能去购物车页面，点击加入购物车后跳转到登录界面
  else{ 
    // 【加入购物车】、【查看购物车数据】时跳转到登录界面
    if(to.path==='/addcartsuccess'||to.path==='/shopcart')
      next('/login')
    // 其他页面正常访问
    else
      next()
  }
})

export default router