<template>
  <div class="mo">

  </div>
</template>
<script>
  import  $ from 'jquery'
  export default{
    name:'mo',
    data(){
      return{

      }
    },
    mounted(){
      var x=$(document).height();
      $('.model-b').css({height:x+"px"});
//      $('.statistic').css({height:h+'px',backgroundColor:'#1F1F21'});
    },
    methods:{
      tap(){
        var self=this;
        self.$store.state.c.model=false;
      }
    }
  }
</script>

<style scoped>
  .model-b{
    position: absolute;
    /*width: 100%;*/
    /*height: 100%;*/
    z-index:20;
    background-color: #121214;
    overflow: hidden;
  }
  .model{
    position: absolute;
    z-index:30;
    width: 12rem;
    height: 12rem;
    left:50%;
    top:50%;
    margin-top: -6rem;
    margin-left: -6rem;
    background-color: #F6F6F6;
    border-radius: 0.5rem;
  }
  .model-img img{
    width: 7rem;
    height: 7rem;
    margin-left: 2.5rem;
    margin-top: 1rem;
  }
  .model-text{
    font-size: 0.75rem;
    color:#000000;
    text-align: center;
  }
  .model-content{
    border-top: 1px solid #C9CBD1;
    margin-top: 0.5rem;
    height: 4rem;
    width: 100%;
  }
  .model-btn{
    width: 5rem;
    margin-left: 3.5rem;
    height: 1.5rem;
    border-radius: 1rem;
    background-color: #33B097;
    color: #ffffff;
    font-size: 0.7rem;
    margin-top: 0.5rem;
    text-align: center;
    line-height: 1.5rem;
  }
  .model-b{
    top:0;
    position: absolute;
    width: 100%;
    /*height: 100%;*/
    z-index:20;
    background-color: #000000;
    opacity: 0.5;
  }
</style>
