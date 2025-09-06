<template>
  <div class="spec-preview">
    <img :src="defaultImage.imgUrl" />
    <div class="event" @mousemove="maskmove"></div>
    <div class="big">
      <img :src="defaultImage.imgUrl" ref="bigImg"/>
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",
    props:['skuImageList'],
    data(){
      return{
        currentIndex:0
      }
    },
    computed:{
      defaultImage(){
        return this.skuImageList[this.currentIndex]||{};
      }
    },
    mounted(){
      this.$bus.$on('chooseImg',(index)=>{
        this.currentIndex=index
      })
    },
    methods:{
      maskmove(e){
        let mask=this.$refs.mask
        let leftmove=0,topmove=0
        leftmove=e.offsetX-mask.offsetWidth/2
        topmove=e.offsetY-mask.offsetHeight/2
        
        if(leftmove<0) leftmove=0
        if(leftmove>mask.clientWidth) leftmove=mask.clientWidth
        if(topmove<0) topmove=0
        if(topmove>mask.clientHeight) topmove=mask.clientHeight

        this.$refs.mask.style.left=leftmove+'px'
        this.$refs.mask.style.top=topmove+'px'

        this.$refs.bigImg.style.left=-2*leftmove+'px'
        this.$refs.bigImg.style.top=-2*topmove+'px'
    }
  }
}
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>