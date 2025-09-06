import {reqShopCartList,reqDeleteCart,reqChangeChecked} from '@/api/index'
// 引入生成uuid的函数
import getuuidtoken from '@/utils/getuuidToken'

const state={
  shopCartList:{},
  // 临时用户身份id
  tempId:getuuidtoken()
}

const actions={
  // 获取购物车数据
  async shopCartList({commit}){
    let result = await reqShopCartList()
    if(result.code===200){
      commit('SHOPCARTLIST',result.data[0])
    }
  },
  // 删除商品
  async deleteCart({commit},skuId){
    let result=await reqDeleteCart(skuId)
    if(result.code===200){
      return '删除成功'
    }else{
      return Promise.reject(new Error('删除失败'))
    }
  },
  // 修改产品选中状态
  async changeChecked({commit},{skuId,isChecked}){
    let result=await reqChangeChecked(skuId,isChecked)
    if(result.code===200)
      return '修改成功'
    else{
      return Promise.reject(new Error('修改失败'))
    }
  },
  // 删除全部选中的商品
  deleteAllChecked({getters,dispatch}){
    // 记录所有的promise,用于后续Promise.all判断是否全部成功
    let promiseAll=[]

    let cartInfoList=getters.cartInfoList
    // 遍历cartInfoList，并且调用上方deleteCart进行删除被勾选的产品
    cartInfoList.forEach(item => {
      if(item.isChecked){
        // 调用当前仓库actions中的action方法去请求删除商品接口
        let promise=dispatch('deleteCart',item.skuId)
        // 将状态都记录下来
        promiseAll.push(promise)
      }
    });
    // 如果所有promise都为成功状态，那么最后返回的也是个成功的Promise结构
    return Promise.all(promiseAll)
  },
  // 点击全部勾选改变所有产品勾选状态
  changeAllChecked({getters,dispatch},isAllChecked){
    let cartInfoList=getters.cartInfoList
    let promiseAll=[]
    cartInfoList.forEach(item=>{
      if(item.isChecked!==isAllChecked){
        let promise=dispatch('changeChecked',{skuId:item.skuId,isChecked:isAllChecked?1:0})
        promiseAll.push(promise)
      }
    })

    return Promise.all(promiseAll)
  }
}

const mutations={
  SHOPCARTLIST(state,shopcartlist){
    state.shopCartList=shopcartlist
  }
}

const getters={
  cartInfoList(state){
    return state.shopCartList.cartInfoList||[{}]
  }
}

export default {
  namespaced:true,
  state,
  actions,
  mutations,
  getters
}