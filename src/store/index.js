import Vue from "vue";
import Vuex from 'vuex'

Vue.use(Vuex)

// 引入各个小仓库
import home from "./home";
import search from "./search";
import detail from "./detail";
import shopcart from './shopcart'
import user from './user'
import trade from './trade'
import pay from './pay'

export default new Vuex.Store({
  modules:{
    home,
    search,
    detail,
    shopcart,
    user,
    trade,
    pay
  }
})