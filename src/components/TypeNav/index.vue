<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="ListLeave" @mouseenter="ListShow">
        <!--事件委托，共同的父亲掌管离开事件-->
        <h2 class="all">全部商品分类</h2>
        <transition name="sort">
          <div class="sort" @click="jumpRoute"  v-show="listShow">
            <div class="all-sort-list2">
              <div
                class="item"
                v-for="(t1, index) in TypeList"
                :key="t1.id"
                @mouseenter="hov(index)"
                :class="{ hov: hovIndex === index }"
              >
                <h3>
                  <a href="javascript:void(0)" :data-TypeName="t1.name" :data-TypeId1="t1.id"
                    >{{ t1.name }}---{{ index }}</a
                  >
                </h3>
                <div
                  class="item-list"
                  :style="{ display: hovIndex === index ? 'block' : 'none' }"
                >
                  <div class="subitem" v-for="t2 in t1.children" :key="t2.id">
                    <dl class="fore">
                      <dt>
                        <a
                          href="javascript:void(0)"
                          :data-TypeName="t2.name"
                          :data-TypeId2="t2.id"
                          >{{ t2.name }}</a
                        >
                      </dt>
                      <dd>
                        <em v-for="t3 in t2.children" :key="t3.id">
                          <a
                            href="javascript:void(0)"
                            :data-TypeName="t3.name"
                            :data-TypeId3="t3.id"
                            >{{ t3.name }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="javascript:void(0)">服装城</a>
        <a href="javascript:void(0)">美妆馆</a>
        <a href="javascript:void(0)">尚品汇超市</a>
        <a href="javascript:void(0)">全球购</a>
        <a href="javascript:void(0)">闪购</a>
        <a href="javascript:void(0)">团购</a>
        <a href="javascript:void(0)">有趣</a>
        <a href="javascript:void(0)">秒杀</a>
      </nav>
    </div>
  </div>
</template>


<script>
import { mapState } from "vuex";
import throttle from "lodash/throttle";

export default {
  name: "TypeNav",
  data() {
    return {
      hovIndex: -1,
      listShow: this.$route.path === "/home" ? true : false,
    };
  },
  computed: {
    ...mapState({
      TypeList: (state) => state.home.TypeList,
    }),
  },
  methods: {
    hov: throttle(function (index) {
      this.hovIndex = index;
    }, 100),

    jumpRoute(e) {
      e.preventDefault();
      const { typename, typeid1, typeid2, typeid3 } = e.target.dataset;

      if (typename) {
        let location = { name: "search" };
        let query = { typename: typename };
        if (typeid1) {
          query.typeid1 = typeid1;
        } else if (typeid2) {
          query.typeid2 = typeid2;
        } else {
          query.typeid3 = typeid3;
        }

        location.query = query;
        if(this.$route.params){
          location.params=this.$route.params
        }
        this.$router.push(location);
      }
    },
    ListShow() {
      if (this.$route.path !== "/home") {
        this.listShow = true;
      }
    },
    ListLeave() {
      this.hovIndex = -1;
      if (this.$route.path !== "/home") {
        this.listShow = false;
      }
    },
  },
  mounted(){
    if(this.$route.path!=='/home')
      this.listShow=false
  }
};
</script>


<style  lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      background: #fafafa;
      z-index: 999;
    
      &-enter-active,
        &-leave-active{
          transition:all .5s;
      }
      &-enter-from,
        &-leave-to{
          height:0px;
        }
      &-enter-to,
        &-leave-from{
          height: 461px;
        }
      

      .all-sort-list2 {
        // 悬浮时标签背景变色
        .hov {
          background-color: skyblue;
        }
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            position: absolute;
            width: 734px;
            min-height: 460px;
            _height: 200px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
