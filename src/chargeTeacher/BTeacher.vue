<template>
  <transition name="slideIn">
      <div class="teacher">
      	
          <div class="top">
            <div class="z" @click="goback">
              <img src="../assets/img/goback.png" height="100%">
            </div>
            <!--<div class="c">体质监测</div>-->
            <div class="c">菁菁达人</div>
            <!--<div class="y" @click="goGrowUp">班级成长</div>-->
          </div>
          <hello-div></hello-div>
          <lun-div></lun-div>
          
           
      </div>
  </transition>
</template>
<script>
  import HelloDiv from '../chargeTeacher/BselectDate.vue'
  import LunDiv from '../chargeTeacher/Brotate.vue'
  
  export default{
    name:'teacher',
    data(){
      return{
				
      }
    },
    components:{
      HelloDiv,
      LunDiv,
     
    },
    methods:{
      goGrowUp(){
      	var self=this;
      	self.$root.eventHub.$emit('Vloading',true);
        this.$router.push({path:'/growUp'})
      },
      goback(){
//        if(window.GreenSchool){
//          window.GreenSchool.goBack();
//        }else{
//          window.external.goBack();
//        }
          this.$router.go(-1);
//      this.$router.replace({path:'/'});
      }
   },
   mounted(){
// 	console.log(this.$store.state.b.basic)
   console.log(this.$store.state.b.basic)
   
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
    font-size: 18px;
   font-weight: bold;
    position: absolute;
    left: 50%;
    color: #fff;
    -webkit-transform: translateX(-50%);
    -moz-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    -o-transform: translateX(-50%);
    transform: translateX(-50%);
  }
  .y{
    width: 30%;
    float: right;
    text-align: right;
    font-size: 0.8rem;
    color: #FFCC00;
  }
</style>
