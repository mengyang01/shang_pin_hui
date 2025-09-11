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
import Trade from '@/pages/Trade'
import Pay from "@/pages/Pay"
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'

// 二级路由
import MyOrder from '@/pages/Center/MyOrder'
import GroupOrder from '@/pages/Center/GroupOrder'

// 引入仓库
import store from '@/store'

const router=new VueRouter({
  // 路由内容
  routes:[
    {
      // 主页
      path:'/home',
      component:Home,
      meta:{
        isFooterShow:true
      }
    },
      // 搜索页
    {
      path:'/search/:keyword?',
      name:'search',
      component:Search,
      meta:{
        isFooterShow:true
      }
    },
      // 登录页
    {
      path:'/login',
      component:Login,
      meta:{
        isFooterShow:false
      }
    },
      // 注册页
    {
      path:'/register',
      component:Register,
      meta:{
        isFooterShow:false
      }
    },
      // 商品详情页
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
    // 购物车信息
    {
      path:'/shopcart',
      component:ShopCart,
      name:'ShopCart',
      meta:{
        isFooterShow:true
      }
    },
    // 交易订单
    {
      path:'/trade',
      component:Trade,
      name:'Trade',
      meta:{
        isFooterShow:true
      }
    },
    // 支付页
    {
      path:'/pay',
      component:Pay,
      name:'Pay',
      meta:{
        isFooterShow:true
      }
    },
    // 成功支付页
    {
      path:'/paysuccess',
      component:PaySuccess,
      name:'PaySuccess',
      meta:{
        isFooterShow:true
      }
    },
    // 我的订单--二级路由处理
    {
      path:'/center',
      name:'Center',
      component:Center,
      meta:{
        isFooterShow:true
      },
      children:[
        // 二级路由path要么写全，要么不写父级只写自己名字(不带/)
        {
          path:'/center/myorder',
          component:MyOrder,
        },
        {
          path:'grouporder',
          component:GroupOrder,
        },
      ],
      // 重定向
      redirect:'/center/myorder'
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
     if(to.path==='/login'||to.path==='/register'){
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
          // 这里与上面的有token进入home页的设置并不冲突，因为会logout先删除token，然后就可以进入到登录页了
          next('/login')
        }
      }
     }
  }
  // 没有token，代表没有登录，不能去购物车页面，点击加入购物车后跳转到登录界面
  else{ 
    // 【加入购物车】、【查看购物车数据】时跳转到登录界面
    if(to.path==='/addcartsuccess'||to.path==='/shopcart'||to.path==='/trade'||to.path==='/pay'||to.path==='/paysuccess'||to.path==='/center')
      next('/login')
    // 其他页面正常访问
    else
      next()
  }
})

export default router