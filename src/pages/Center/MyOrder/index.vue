<template>
  <div class="order-right">
    <div class="order-content">
      <div class="title">
        <h3>我的订单</h3>
      </div>
      <!-- 表头 -->
      <div class="chosetype">
        <table>
          <thead>
            <tr>
              <th width="29%">商品</th>
              <th width="31%">订单详情</th>
              <th width="13%">收货人</th>
              <th>金额</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
        </table>
      </div>
      <!-- 订单内容 -->
      <div class="orders">
        <table
          class="order-item"
          v-for="item in myorderInfo.records"
          :key="item.id"
        >
          <!-- 订单日期与编号 -->
          <thead>
            <tr>
              <th colspan="5">
                <span class="ordertitle"
                  >{{ item.createTime }}　订单编号：{{ item.outTradeNo }}
                  <span class="pull-right delete"
                    ><img src="../images/delete.png" /></span
                ></span>
              </th>
            </tr>
          </thead>
          <!-- 订单内容 -->
          <tbody>
            <tr v-for="(good, index) in item.orderDetailList" :key="good.skuId">
              <td width="60%">
                <div class="typographic">
                  <img :src="good.imgUrl" style="width: 100px; height: 100px" />
                  <a href="#" class="block-text">{{ good.skuName }}</a>
                  <span>x{{ good.skuNum }}</span>
                  <a href="#" class="service">售后申请</a>
                </div>
              </td>
              <td
                :rowspan="item.orderDetailList.length"
                v-if="index == 0"
                width="8%"
                class="center"
              >
                {{ item.consignee }}
              </td>
              <td
                :rowspan="item.orderDetailList.length"
                v-if="index == 0"
                width="13%"
                class="center"
              >
                <ul class="unstyled">
                  <li>总金额¥{{ item.totalAmount }}.00</li>
                  <li>{{ item.paymentWay }}</li>
                </ul>
              </td>
              <td
                :rowspan="item.orderDetailList.length"
                v-if="index == 0"
                width="8%"
                class="center"
              >
                <a href="#" class="btn">{{ item.orderStatusName }} </a>
              </td>
              <td
                :rowspan="item.orderDetailList.length"
                v-if="index == 0"
                width="13%"
                class="center"
              >
                <ul class="unstyled">
                  <li>
                    <a href="mycomment.html" target="_blank">评价|晒单</a>
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 分页器 -->
      <div class="choose-order">
        <Pagination
          :pageNo="page"
          :pageSize="limit"
          :total="myorderInfo.total"
          :continues="5"
          @pageChange="pageChange"
        />
      </div>

      <!--猜你喜欢-->
      <div class="like">
        <h4 class="kt">猜你喜欢</h4>
        <ul class="like-list">
          <li class="likeItem">
            <div class="p-img">
              <img src="../images/itemlike01.png" />
            </div>
            <div class="attr">
              <em>DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</em>
            </div>
            <div class="price">
              <em>¥</em>
              <i>3699.00</i>
            </div>
            <div class="commit">已有6人评价</div>
          </li>
          <li class="likeItem">
            <div class="p-img">
              <img src="../images/itemlike02.png" />
            </div>
            <div class="attr">Apple苹果iPhone 6s/6s Plus 16G 64G 128G</div>
            <div class="price">
              <em>¥</em>
              <i>4388.00</i>
            </div>
            <div class="commit">已有700人评价</div>
          </li>
          <li class="likeItem">
            <div class="p-img">
              <img src="../images/itemlike03.png" />
            </div>
            <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</div>
            <div class="price">
              <em>¥</em>
              <i>4088.00</i>
            </div>
            <div class="commit">已有700人评价</div>
          </li>
          <li class="likeItem">
            <div class="p-img">
              <img src="../images/itemlike04.png" />
            </div>
            <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</div>
            <div class="price">
              <em>¥</em>
              <i>4088.00</i>
            </div>
            <div class="commit">已有700人评价</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import  Pagination  from "@/components/Pagination";
import { mapState } from "vuex";

export default {
  name: "MyOrder",
  component: { Pagination },
  data() {
    return {
      page: 1,
      limit: 3,
    };
  },
  mounted() {
    this.getMyOrder();
  },
  computed: {
    ...mapState("center", ["myorderInfo"]),
  },
  methods: {
    // 获取订单信息
    async getMyOrder() {
      await this.$store.dispatch("center/getMyOrder", {
        page: this.page,
        limit: this.limit,
      });
    },
    // 接收自定义事件拿到的新页数，并且修改，重新请求服务器
    pageChange(receivePage) {
      this.page = receivePage;
      this.getMyOrder();
    },
  },
};
</script>

<style>
</style>