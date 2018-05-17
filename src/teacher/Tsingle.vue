<template>
  <transition name="slideIn">
    <div class="teacher">
      <div class="top">
        <div class="z" @click="goback">
          <img src="../assets/img/goback.png" height="100%">
        </div>
        <!--<div class="c">体质监测</div>-->
        <div class="c">菁菁达人</div>
        <div class="y" @click="goGrowUp">班级成长</div>
      </div>
      <hello-div></hello-div>
      <lun-div></lun-div>
    </div>
  </transition>
</template>
<script>
  import HelloDiv from './TselectDate1.vue'
  import LunDiv from './Trotate1.vue'
  export default{
    name:'teacher',
    data(){
      return{

      }
    },
    components:{
      HelloDiv,
      LunDiv
    },
    methods:{
      goGrowUp(){
        this.$router.push({path:'/growUp'})
      },
      goback(){
        this.$router.go(-1);
      }
    }
  }
</script>
<style scoped>
  .teacher{
    width: 100%;
    height: 100%;
  }
  .top{
    color: #ffffff;
    height: 2.5rem;
    line-height: 2.5rem;
    margin-left: 5%;
    width: 90%;
  }
  .z{
    float: left;
    width: 1rem;
    height: 1.5rem;
    font-size: 1.5rem;
    margin-top: -0.1rem;
    color: #9C9C9E;
  }
  .c{
    position: absolute;
    left: 40%;
    text-align: center;
    /*width: 50%;*/
    font-weight: bold;
  }
  .y{
    width: 30%;
    float: right;
    text-align: right;
    font-size: 0.8rem;
    color: #FFCC00;
  }
</style>
