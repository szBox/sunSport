<template>
<div class="content">
	<div class="topbar">
    <img src="../../assets/img/Navigationbar_icon_fanhui.png" @click="goBack">
    <p>{{result.title}}</p>
    <div class="menu"></div>
  </div>

 
  <div class="typeO" v-html="result.content" v-if="result.type == 0"></div>
  <div class="typeI" v-if="result.type == 1">
   
  </div>
</div>
</template>

<script>
import $ from "jquery";
import int from '../../assets/js/interface'
export default {
  name: "name",
  data: function() {
    return {
      result: []
    };
  },
  methods: {
  	 goBack(){
        this.$router.go(-1)
      },
  },
  created() {
    var vm = this;

    $.ajax({
      type: "POST",
      dataType: "jsonp",
      url:int.getrecommend2,
      data:{
        id: this.$route.params.id

      },
      success: function(response){
      	console.log(response)
        vm.result = response.data;
        
      },
      error: function (err){
        console.log('err' + err);
      }
    });
  }
};
</script>

<style scoped>
.content{
  background: #fff;
  height: 100vh;
}
.title{
  text-align: center;
  padding: 4vw 0;
  border-bottom: 1px solid #ddd;
}
.typeO{
  padding: 3vw;
}
.typeI{
  width: 90vw;
  text-align: center;
  margin: 0 auto;
}
.topbar {
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 3.7vw;
  height: 2.5rem;
	line-height: 2.5rem;
}
.topbar p{
	overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    width: 70%;
    text-align: center;
     font-weight: bold;
     
      padding-left: 0.9rem;
}
.topbar>img {
		height: 1rem;

	}
.menu{
  width: 28px;
  height: 20px;
}	
</style>