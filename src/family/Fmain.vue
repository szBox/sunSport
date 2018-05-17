<template>
  <transition name="slideIn">
    <div class="teacher">

      <div class="top">
        <div class="z" @click="goback">
          <img src="../assets/img/goback.png"  height="100%">
        </div>
        <!--<div class="c">体质监测</div>-->
        <div class="c">菁菁达人</div>
        <div class="y" @click="goGrowUp">我的成长</div>
      </div>
      <div class="n">
        <div class="tx" @click="goimg">
          <img src="../assets/img/tx.png" width="100%">
        </div>
        <div class="xx">
          <div><span class="a2">姓名:</span><span class="a1">{{list.name}}</span></div>
          <div><span class="a2">性别:</span><span class="a1">{{list.sex}}</span></div>
          <div><span class="a2">年级:</span><span class="a1">{{list.grade}}</span></div>
          <div><span class="a2">卡号:</span><span class="a1">{{list.card}}</span></div>
        </div>
      </div>
      <hello-div></hello-div>
      <lun-div></lun-div>
    </div>
  </transition>
</template>
<script>
  import api from '../fetch/api'
  import HelloDiv from '../family/FselectDate.vue'
  import LunDiv from '../family/Frotate.vue'
  export default{
    name:'teacher',
    data(){

      return{

      }
    },
    mounted(){
      var self=this;

//        .then(res => {
//          this.list = res.data;
//          console.log(this.list);
//          console.log('调用封装后的axios成功');
//        })
      if(this.$store.state.a.data.base.user.name==''){
//        alert(1);
        this.$router.push({path:'/'})
      }
    },
    computed:{
      list(){
        return this.$store.state.a.data.base.user
      }
    },
    components:{
      HelloDiv,
      LunDiv
    },
    methods:{
      goGrowUp(){
        var self=this;
        self.$router.push({path:'/fgrow'});
        self.$store.state.a.count--;
      },
      goback(){
//        if(window.GreenSchool){
//          window.GreenSchool.goBack();
//        }else{
//          window.external.goBack();
//        }
        this.$router.replace({path:'/'});
      },
      goimg(){
        var self=this;
//        alert(1);
//        var val=window.iosParams.stuTid;
        self.$router.push({path:'/bmi'});
//        location.href='http://school.jingjing100.com/html5/health/myGrow.html?stuid='+val+'&from=ygty';
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
  .n{
    width: 90%;
    padding-left: 5%;
    padding-right: 5%;
    height: 10rem;
    border-top: 0.1rem solid #262628;
  }
  .n .tx{
    width: 6rem;
    height: 8rem;
    margin-top: 1rem;
    float: left;
  }
  .n .xx{
    /*width: 9.2rem;*/
    float: left;
    /*margin-left: 1rem;*/
    font-size: 0.7rem;
    color: #A4A4A5;
    line-height: 2rem;
    margin-top: 1rem;
  }
  .n .xx .a2{
    width: 3rem;
    padding-left: 1rem;
  }
  .n .xx .a1{
    color: #ffffff;
    margin-left: 1rem;
    /*width: 10rem;*/
    font-size: 0.7rem;
  }
</style>
