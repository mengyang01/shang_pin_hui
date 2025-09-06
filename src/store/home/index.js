// Home模块化的小Vuex仓库

import {TypeNav,reqBannerList,reqFloorList} from '@/api' //引入请求发送函数
import {} from '@/api'

const state={
  TypeList:[],
  BannerList:[],
  FloorList:[]
};

const actions={
  async TypeNavList(context){
    let result=await TypeNav()
    // console.log(result)
    if(result.code===200){
      context.commit('TYPENavList',result.data)
    }
  },
  async bannerList({commit}){
    // console.log('store中的actions去获取服务器数据')
    let result=await reqBannerList()
    if(result.code===200)
        commit('BannerList',result.data)
  },
  async floorList({commit}){
    let result=await reqFloorList()
    if(result.code===200){
      commit('FloorList',result.data)
    }
  }
};

const mutations={
  TYPENavList(state,value){
    state.TypeList=value
  },
  BannerList(state,value){
    // console.log('修改了仓库中的bannerlist数据')
    state.BannerList=value
  },
  FloorList(state,value){
    state.FloorList=value
  }
};

const getters={};

export default {
  namespaced:true,//开启命名空间，下面的变量是独立的不混淆
  state,
  actions,
  mutations,
  getters
}