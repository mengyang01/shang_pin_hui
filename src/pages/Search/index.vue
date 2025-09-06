<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread面包屑部分-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-if="goodSearch.typename">
              {{ goodSearch.typename }}<i @click="removeQuery">×</i>
            </li>
            <li class="with-x" v-if="goodSearch.keyword">
              {{ goodSearch.keyword }}<i @click="removeParams">×</i>
            </li>
            <li class="with-x" v-if="goodSearch.trademark">
              {{ goodSearch.trademark.split(':')[1] }}<i @click="removeTrademark">×</i>
            </li>
            <!-- 这里是prop数组，数组有多少内容就有多少个面包屑，因此不使用v-if来展示 -->
            <li
              class="with-x"
              v-for="(prop, index) in goodSearch.props"
              :key="index"
            >
              {{ prop.split(':')[1] }}<i @click="removeAttr(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkinfo="trademarkinfo" @attrinfo="attrinfo" />

        <!--details排序及商品展示部分-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <!-- 商品排序部分 -->
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{'active':isOne}" @click="changeOrder('1')">
                  <a href="#">综合 <span v-show="isOne" :class="['iconfont',`icon-direction-${sort}`]"></span></a>
                </li>
                <li :class="{'active':isTwo}" @click="changeOrder('2')">
                  <a href="#">销量 <span v-show="isTwo" :class="['iconfont',`icon-direction-${sort}`]"></span></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 商品列表部分 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
              >
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/1`">
                      <img src="./images/mobile01.png"/>
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>999.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="#"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >苹果手机最新款</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页组件 -->
           <Pagination :pageNo="goodSearch.pageNo" :pageSize="goodSearch.pageSize" :total="301" :continues="5" @pageChange="pageChange"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector";
export default {
  name: "Search",
  components: { SearchSelector },
  data() {
    return {
      goodSearch: {
        typeid1: "", // 1级导航
        typeid2: "", // 2级导航
        typeid3: "", //3级导航
        typename: "", //分类名字
        keyword: "", //关键字
        order: "1:desc", //排序,默认为综合降序
        pageNo: 2, //第几页
        pageSize: 10, //一页展示几个
        props: [], //平台售卖属性
        trademark: "", //品牌
      },
    };
  },
  beforeMount() {
    // 复杂写法
    // this.typeid1=this.$route.query.typeid1 || ''
    // this.typeid2=this.$route.query.typeid1 || ''
    // this.typeid3=this.$route.query.typeid1 || ''
    // ......
    // 使用ES6的Object.assign合并对象方法简化
    Object.assign(this.goodSearch, this.$route.query, this.$route.params);
  },
  mounted() {
    this.search();
  },
  computed: {
    // list:state=>state.search.searchList.goodsList  //太过复杂
    ...mapGetters("search", ["goodsList", "trademarkList", "attrsList"]),//获得goodsList、trademarkList、attrsList三个数据
    isOne(){
      return this.goodSearch.order.split(':')[0]=='1'
    },
    isTwo(){
      return this.goodSearch.order.split(':')[0]=='2'
    },
    sort(){
      if(this.goodSearch.order.split(':')[1]=='asc')
        return "up"
      else 
        return "down"
    },
  },
  methods: {
    search() {
      this.$store.dispatch("search/searchList", this.goodSearch);
    },
    removeQuery() {
      // 清空导航参数,用ndefined好处：当参数值为空时，就直接不传递当前参数了
      this.goodSearch.typename = undefined;
      this.goodSearch.typeid1 = undefined;
      this.goodSearch.typeid2 = undefined;
      this.goodSearch.typeid3 = undefined;
      this.goodSearch.typename = undefined;
      // 重新发送请求,改变商品展示数据
      this.search();
      // 改变路由信息(改变地址栏),但是要注意上面清空的只是query信息
      if (this.$route.params) {
        this.$router.push({ name: "search", params: this.$route.params });
      } else this.$router.push({ name: "search" });
    },
    removeParams() {
      // 清空导航参数,用ndefined好处：当参数值为空时，就直接不传递当前参数了
      this.goodSearch.keyword = undefined;
      // 重新发送请求,改变商品展示数据
      this.search();
      // 通知header组件清空搜索框
      this.$bus.$emit("clear");
      // 改变路由信息(改变地址栏),但是要注意上面清空的只是query信息
      if (this.$route.query) {
        this.$router.push({ name: "search", query: this.$route.query });
      } else this.$router.push({ name: "search" });
    },
    trademarkinfo(trademark) {
      this.goodSearch.trademark = trademark;
      this.search();
    },
    removeTrademark() {
      this.goodSearch.trademark = undefined;
      this.search();
    },
    attrinfo(attr) {
      if (this.goodSearch.props.indexOf(attr) == -1) {
        this.goodSearch.props.push(attr);
        this.search();
      }
    },
    removeAttr(index) {
      this.goodSearch.props.splice(index, 1);
      this.search();
    },
    changeOrder(flag){
      let originOrder=this.goodSearch.order
      let originFlag=originOrder.split(':')[0]
      let originSort=originOrder.split(':')[1]
      let newOrder=''
      if(flag==originFlag){
        newOrder=flag+':'+(originSort=='asc'?'desc':'asc')
      }else{
        newOrder=flag+":desc"
      }
      this.goodSearch.order=newOrder
      this.search()
    },
    pageChange(pageNo){
      this.goodSearch.pageNo=pageNo
      this.search()
    }
  },
  watch: {
    $route(newVal, oldVal) {
      //必须在发送请求之前先清空一下已经有的之前的id参数
      this.goodSearch.typeid1 = undefined;
      this.goodSearch.typeid2 = undefined;
      this.goodSearch.typeid3 = undefined;
      // 发送请求前需要再次整理参数
      Object.assign(this.goodSearch, this.$route.query, this.$route.params);
      // 重新发送请求
      this.search();
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>