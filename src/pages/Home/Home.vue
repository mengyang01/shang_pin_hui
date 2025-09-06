<template>
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <TodayRecommend></TodayRecommend>
    <Like></Like>
    <Rank></Rank>
    <Floor v-for="carousel in FloorList" :key="carousel.id" :list="carousel"/>
    <Brand></Brand>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Brand from './Brand/Brand.vue';
import Floor from   './Floor/Floor.vue'
import Like from './Like/Like.vue';
import ListContainer from './ListContainer/ListContainer.vue';
import Rank from './Rank/Rank.vue';
import TodayRecommend from './TodayRecommend/TodayRecommend.vue';


export default {
  name:'Home',
  components:{Brand,Floor,Like,ListContainer,Rank,TodayRecommend},
  computed:{
    ...mapState({
      FloorList:state=>state.home.FloorList
    })
  },
  mounted(){
    this.$store.dispatch('home/floorList');
    // console.log(this.FloorList)
  },
}
</script>

<style>

</style>