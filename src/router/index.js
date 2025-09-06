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
import Login from "@/pages/Login/Login.vue";
import Register from "@/pages/Register/Register.vue";
import Detail from "@/pages/Detail/index.vue";
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'

export default new VueRouter({
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
  scrollBehavior(to,from,savedPosition){
    //返回的y=0代表滚动条在最上方
    return {y:0}
  }
})