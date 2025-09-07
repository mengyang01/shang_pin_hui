<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <Footer></Footer>
  </div>
  
</template>

<script>
import Header  from "./components/Header/index.vue"
import Footer from "./components/Footer/index.vue";
export default {
  name:'App',
  components:{Header,Footer},
  mounted() {
    // 请求三级联动数据，公用的
    this.$store.dispatch("home/TypeNavList");
    if (this.$route.path !== "/home") {
      this.listShow = false;
    }
  },
}
</script>

<style>

</style>