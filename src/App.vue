<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    	<s_loading v-if="shows"></s_loading>
    <router-view></router-view>
  
  </div>
</template>

<script>
  import $ from 'jquery'
  import resize from '../src/assets/js/resize'
  
  import loading from '@/assets/commont/loading1'
  export default {
    name: 'app',
   data(){
   	return{
   		shows:false
   	}
   },
    created(){
      resize.getFontSzie();
      resize.root();
      resize.getHeight();
      var vm=this
      this.$root.eventHub.$on('Vloading',function(t){
      	vm.shows=	t
      })
    },
    
    components:{
			 s_loading:loading
    },
  }

</script>

<style>
  .c{
    font-size: 18px !important;
  }
  .ivu-picker-panel-body{
  	font-size: 0.7rem;
  }
  .ivu-date-picker-header span{
  	margin-top: 10px;
  }
  .ivu-date-picker-header span .ivu-icon{
		display: block !important;
}
	.ivu-icon.ivu-icon-ios-close.ivu-input-icon.ivu-input-icon-normal,
	.ivu-icon.ivu-icon-ios-calendar-outline.ivu-input-icon.ivu-input-icon-normal{
		display: none;
	}
	.area_ctrl{
		position: fixed !important;
	}
</style>
<style src="./assets/css/main.css"></style>
<!--<style src="./assets/css/m.css"></style>-->
<!--<style src="./assets/css/m1.css"></style>-->

