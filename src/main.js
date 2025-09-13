import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false


import "../server/mock/mockServer.js" //启动mock模拟服务器

//引入swiper样式
import 'swiper/css/swiper.css';
// 按需引入element-ui组件
import { Button ,MessageBox} from 'element-ui';
// 引入vue-lazyload
import VueLazyload from 'vue-lazyload'
// 引入占位图片
import loadingGif from './assets/1.gif'
import errorGif from './assets/2.gif'
Vue.use(VueLazyload,{
  loading:loadingGif,//加载中占位图片
  error:errorGif//加载失败占位图片
})


// 定义全局组件，其他人直接用即可，无需二次注册
import  TypeNav  from '@/components/TypeNav/index.vue'
import Banner from '@/components/Banner' 
import Pagination from '@/components/Pagination' 

// 注册全局组件,第一个参数：组件名字，第二个参数：哪个组件
Vue.component(TypeNav.name,TypeNav)   //TypeNav三级分类
Vue.component(Banner.name,Banner)//Banner轮播图
Vue.component(Pagination.name,Pagination)//分页器
Vue.component(Button.name,Button)//Element-ui按需引入并注册
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

import router from './router' // 引入路由配置
import store from './store'   //引入Vuex大仓库




new Vue({
  beforeCreate(){
    Vue.prototype.$bus=this;
  },
  render: h => h(App),
  router,
  store,
}).$mount(' #app')
