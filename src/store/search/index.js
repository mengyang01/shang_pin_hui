// Search模块化的小Vuex仓库

import {reqSearchList} from '@/api'

const state={
  searchList:{}
};

const actions={
  async searchList({commit},metadata={}){
    let result=await reqSearchList(metadata)
    if(result.code>=200&&result.code<300){
      commit('SearchList',result.data)
    }
  }
};

const mutations={
  SearchList(state,val){
    state.searchList=val
  }
};

const getters={
  goodsList(state){
    return state.searchList.goodsList || []
  },
  trademarkList(state){
    return state.searchList.trademarkList || []
  },
  attrsList(state){
    return state.searchList.attrsList || []
  }
};

export default {
  namespaced:true,//开启命名空间，下面的变量是独立的不混淆
  state,
  actions,
  mutations,
  getters
}