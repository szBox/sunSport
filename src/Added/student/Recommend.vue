
<!--
  推荐
-->
<template>
<div class="content">
  <div class="topbar">
    <img src="../../assets/img/Navigationbar_icon_fanhui.png" @click="goBack">
    <!--<p>推荐食谱</p>-->
    <p>菁菁达人</p>
    <div class="menu">
    	<!--<img src="../../assets/img/Navigationbar_icon_liebiao.png">-->
    </div>
  </div>
  <!--
    barnner1
  -->
  <div class="bannerI">
  </div>
  <ol class="breakfast">
    <div>
      <span class="Bicon">
        <img src="../../assets/img/Recommend_icon_Hamburger.png" alt="">
      </span>
      <span class="rmTitle">
        早餐
      </span>
    </div>

    <li v-for="item in result" class="list">
      <p> {{item.name}} </p>
      <p>  {{item.num}} </p>
    </li>
  </ol>

  <!--
    barnner2
  -->
  <div class="bannerII">
  </div>
  <ol class="breakfast">
    <div>
      <span class="Bicon">
        <img src="../../assets/img/Recommend_icon_Noodles.png" alt="">
      </span>
      <span class="rmTitle">
        午餐
      </span>
    </div>

    <li v-for="item in result2" class="list">
      <p> {{item.name}} </p>
      <p>  {{item.num}} </p>
    </li>
  </ol>


</div>
</template>

<script>
import $ from 'jquery'
import int from '../../assets/js/interface'
export default {
  name: "name",
  data: function() {
    return {
      result: [],
      result2:[]
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  },
  created(){
    var vm = this;
    var tjid=localStorage.getItem('tjid');
    $.ajax({
      type: 'POST',
      dataType: 'jsonp',
      url:int.getrecommend,
      data:{
//      "card": vm.$store.state.a.data.base.user.card,
        id:tjid,
        'recommend': 1,
        proportion:vm.$store.state.a.data.base.user.proportion
      },
      success:function (response){
      	vm.$root.eventHub.$emit('Vloading',false)
      	console.log(response)
        vm.result = response.data.breakfast;
        vm.result2=	response.data.lunch;
//			console.log(vm.result);

      }
    })
  }
};
</script>

<style scoped>
.content {
  background: #fff;
  height: 100vh;
}
.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
 padding: 0 3.7vw;
  height: 2.5rem;
	line-height: 2.5rem;
	border-bottom: 1px solid #ddd;
}
.topbar > p {
  font-size: 18px;
  
   font-weight: bold;
   position: absolute;
    left: 50%;
    -webkit-transform: translateX(-50%);
    -moz-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    -o-transform: translateX(-50%);
    transform: translateX(-50%);
}
.topbar h3 {
  flex: 1;
  text-align: center;
  padding-left: 18vw;
   font-weight: bold;

}
.topbar>img {
		height: 1rem;

	}
.menu{
  width: 28px;
  height: 20px;
}
.breakfast{
  margin: 0 3.8vw;
  padding-bottom: 4.9vw;
}
.breakfast>div{
  padding: 5.3vw 0;
  border-bottom: 1px solid #ddd;
}
.breakfast>div>span{
  vertical-align:  middle;
}
.breakfast .rmTitle {
  font-size: 0.75rem;
  padding: 0.1rem 0.5rem;
  color: #fff;
  background: linear-gradient(to right, #53b0fe, #367bfd);
  border-radius: 0.2rem;
  /*height: 2.2rem;*/
 /* line-height: 2.2rem;*/
  display: inline-block;
}
.breakfast .Bicon {
  display: inline-block;

}
.Bicon img{
		width: 1.2rem;
		height: 1.2rem;
		margin-right: 0.2rem;
}
.bannerI {
  width: 100vw;
  height: 29vw;
  background: url("../../assets/img/Recommend_banner1.png") no-repeat;
  background-size: cover;
}
.bannerII {
  width: 100vw;
  height: 29vw;
  background: url("../../assets/img/Recommend_banner2.png") no-repeat;
  background-size: cover;
}
.list{
  display: flex;
  align-items: center;
  justify-content: space-between;
 padding: 0.6rem 0;
  border-bottom: 1px solid #ddd;
  font-size: 15px;
}
.list :last-child{
  color: #999;
}
</style>
