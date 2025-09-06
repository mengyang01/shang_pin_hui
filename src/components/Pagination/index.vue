<template>
  <div class="pagination">
    <!-- 上=起始页码、省略号处理 -->
    <button :disabled="pageNo==1" @click="pageChange(pageNo-1)">上一页</button>
    <button v-if="Continues_Start_End.start>1" @click="pageChange(1)" :class="{active:pageNo==1}">1</button>
    <button v-if="Continues_Start_End.start>2">···</button>
    <!-- 中=连续页码的遍历 -->
    <button 
      v-for="(page,index) in showContinuesPages" 
      :key="index" 
      @click="pageChange(page)"
      :class="{active:pageNo==page}"
      >
        {{ page }}
    </button>
    <!-- 下=结尾页码、省略号的处理 -->
    <button v-if="Continues_Start_End.end<totalPage-1">···</button>
    <button v-if="Continues_Start_End.end<totalPage" @click="pageChange(totalPage)" :class="{active:pageNo==totalPage}">{{ totalPage }}</button>
    <button :disabled="pageNo==totalPage" @click="pageChange(pageNo+1)">下一页</button>
    <button style="margin-left: 30px">共 {{ total }} 条数据</button>
    <div>{{ Continues_Start_End }}--现在pageNo={{ pageNo }}</div>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["total", "pageSize", "pageNo", "continues"],
  computed: {
    // 总页数
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    // 连续页码的开始与结束页码值的确定
    Continues_Start_End() {
      const { pageNo, continues, totalPage } = this;
      let start = 0,end = 0;
      // 总页数小于等于连续页码数
      if (totalPage <= continues) {
        start = 1;
        end = totalPage;
      } 
      else {
        start = pageNo - Math.floor(continues / 2);
        end = pageNo + Math.floor(continues / 2);
        // 处理连续页码边界值
        if (start < 1) {
          start = 1;
          end = continues;
        }

        if (end > totalPage) {
          end = totalPage;
          start = totalPage - continues + 1;
        }
      }
      return { start, end };
    },
    // 是否显示连续页码
    showContinuesPages(){
      const pages = [];
      for (let i = this.Continues_Start_End.start; i <= this.Continues_Start_End.end; i++) {
        pages.push(i);
      }
      return pages;
    }
  },
  methods:{
    pageChange(page){
      this.$emit("pageChange",page);
    }
  }
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
