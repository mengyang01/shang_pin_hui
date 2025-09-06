<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="(good, index) in cartInfoList"
          :key="good.id"
        >
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="good.isChecked" @click="changeChecked(good.skuId,$event)"/>
          </li>
          <li class="cart-list-con2">
            <img :src="good.imgUrl" />
            <div class="item-msg">{{ good.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ good.cartPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <!-- 这里的加减需要发送服务器请求，让服务器知道调整后的最终的个数----因此不能直接简单的写skuNum++这样的逻辑了，就需要用函数来进行数目、请求的处理 -->
            <a
              href="javascript:void(0)"
              class="mins"
              @click="changeNum('sub', -1, good)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="good.skuNum"
              minnum="1"
              class="itxt"
              @change="changeNum('change', $event.target.value * 1, good)"
            />
            <!-- $event.target.value*1将字符串转换为数字 -->
            <a
              href="javascript:void(0)"
              class="plus"
              @click="changeNum('add', 1, good)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ good.cartPrice * good.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a  class="sindelet" @click="deleteCart(good.skuId)"
              >删除</a
            >
            <br />
            <a >移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="totalchoosed"  @change="changeAllChecked"/>
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllChecked">删除选中的商品</a>
        <a >移到我的关注</a>
        <a >清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ totalNum }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import throttle from "lodash/throttle";

export default {
  name: "ShopCart",
  mounted() {
    this.$store.dispatch("shopcart/shopCartList");
  },
  computed: {
    ...mapGetters("shopcart", ["cartInfoList"]),
    totalNum() {
      return this.cartInfoList.reduce((sum, item) => sum + item.skuNum, 0);
    },
    totalPrice() {
      return this.cartInfoList.reduce(
        (sum, item) => sum + item.skuNum * item.cartPrice,
        0
      );
    },
    totalchoosed() {
      return this.cartInfoList.every((item) => item.isChecked);
    },
  },
  methods: {
    // 获取购物车数据
    getCartData() {
      this.$store.dispatch("shopcart/shopCartList");
    },
    // 改变数目
    changeNum: throttle(async function (type, disnum, good) {
      // type 表示类别
      // disnum 表示数目变化量
      // good 表示商品信息【哪个商品需要变】
      switch (type) {
        case "add":
          disnum = 1;
          break;
        case "sub":
          disnum = good.skuNum <= 1 ? 0 : -1;
          break;
        case "change":
          if (disnum < 1 || isNaN(disnum)) disnum = 0;
          else {
            disnum = parseInt(disnum) - good.skuNum;
          }
          break;
      }
      // 向修改产品数目的服务器发请求说明我这边修改数据了
      try {
        await this.$store.dispatch("detail/addToShopCart", {
          skuId: good.skuId,
          skuNum: disnum,
        });

        // 重新请求获取更新后的购物车数据
        this.getCartData();
      } catch (e) {
        alert(e);
      }
    }, 1000),
    // 删除商品
    async deleteCart(skuId) {
      try {
        let result = await this.$store.dispatch("shopcart/deleteCart", skuId);
        // console.log(result)
        // 重新申请数据
        this.getCartData();
      } catch (e) {
        alert(e);
      }
    },
    // 修改商品选中状态
    async changeChecked(skuId,$event){
      let isChecked=$event.target.checked?1:0
      try{
        await this.$store.dispatch('shopcart/changeChecked',{skuId,isChecked})
        // 重新申请服务器数据
        this.getCartData()
      }catch(e){
        alert(e)
      }
    },
    // 删除全部勾选内容
    async deleteAllChecked(){
      try{
        await this.$store.dispatch('shopcart/deleteAllChecked')
        // 重新获取数据
        this.getCartData
      }catch(e){
        alert(e)
      }
    },
    // 点击全部勾选改变所有产品勾选状态
    async changeAllChecked(e){
      try{
        await this.$store.dispatch('shopcart/changeAllChecked',e.target.checked)  
        // 重新发送请求
        this.getCartData()
      }catch(e){
        alert(e)
      }
    }
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>