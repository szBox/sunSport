<template>
  <transition name="slideIn">
    <div class="teacher">
      <div class="top">
        <div class="z" @click="goback">
          <img src="../assets/img/goback.png" height="100%">
        </div>
        <!--<div class="c">体质监测</div>-->
        <div :title="school" class="c">{{school}}</div>
        <div class="y" @click="gostatistic">数据统计</div>
      </div>
      <hello-div></hello-div>
      <lun-div></lun-div>
    </div>
  </transition>
</template>
<script>
  import HelloDiv from '../leader/LselectDate.vue'
  import LunDiv from '../leader/Lrotate.vue'
  export default{
    name:'teacher',
    data(){
      return{
					school:''
      }
    },
    components:{
      HelloDiv,
      LunDiv
    },
    created(){
    	var self=this;
    	var schoolName=localStorage.getItem('schoolName');
    	if(!schoolName){
    		self.school='菁菁达人'
    	}else{
    		
    		self.school=schoolName
    	}
    	
    },
    methods:{
      goGrowUp(){
        this.$router.push({path:'/growUp'})
      },
      goback(){
//        if(window.GreenSchool){
//          window.GreenSchool.goBack();
//        }else{
//          window.external.goBack();
//        }
//			
			
        this.$router.go(-1);
      },
      gostatistic(){
        var self=this;
        self.$root.eventHub.$emit('Vloading',true);
        self.$store.state.d.count--;
        self.$router.push({path:'/lstatistics'});
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
    left: 50%;
    height: 2.5rem;
    -webkit-transform: translateX(-50%);
      -moz-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    -o-transform: translateX(-50%);
    transform: translateX(-50%);
    text-align: center;
    width: 60%;
    font-weight: bold;
    overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		  -webkit-line-clamp: 1;
  }
  .y{
    float: right;
    text-align: right;
    font-size: 0.8rem;
    color: #FFCC00;
  }
</style>
