<!--健康计划-->
<template>
  <div class="content">
    <div class="topbar">
      <img src="../../assets/img/Navigationbar_icon_fanhui.png" @click="goBack">
      <p>菁菁达人</p>
      <div class="menu">
      </div>
    </div>
    <!--
      拉下菜单

    -->

    <div class="banner ban2">
      <!--
        banner
      -->
    </div>

    <div class="togBtn">
      <span @click="toRouter">测量统计</span><span @click="toPlan" class="active">运动计划</span>
    </div>





    <ol class="day">
      <!--<li v-for="(Day,index,key) in week" :key="key" class="weekDay" :class="{'active': index == result.data.period}"> {{Day}} </li>-->
      <li class="weekDay" >{{weekDay}}</li>
    </ol>

    <div class="Suggest">
      <div class="Stitle">
        <div>
          <img src="../../assets/img/Healthplan_icon_proposal.png" alt="">
          <span>健康建议</span>
        </div>
        <ol v-if="datashow">
          <li v-for="(item,index) in result">
          </li>
        </ol>
        <button @click="toRec" class="recommend">查看我的推荐</button>
      </div>
      <ol class="Scontent" v-if="datashow">
        <li v-for="item in result.data.diet_plan">{{item}}</li>
      </ol>
    </div>

    <div class="Suggest">
      <div class="Stitle">
        <div>
          <img src="../../assets/img/Healthplan_icon_consume.png" alt="">
          <span>消耗建议</span>
        </div>
      </div>
      <ol class="Scontent add" v-if="datashow">
        <li v-for="item in result.data.sport_plan">{{item}}</li>
      </ol>
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
      week: ["周末", "周一", "周二", "周三", "周四", "周五", "周六"],
      result: [],
      weekDay:'',
      datashow:false,
    };
  },
  methods: {
    toRec() {
    	var self=this;
    	self.$root.eventHub.$emit('Vloading',true)
      this.$router.push("/Recommend1/" + this.$route.params.id);
    },
    toRouter() {
    	var self=this;
    	self.$root.eventHub.$emit('Vloading',true)
      this.$router.replace({ path: "/movement/" + this.$route.params.id });
    },
    toPlan() {
      this.$router.replace({ path: "/Plan1/" + this.$route.params.id });
    },
    goBack() {
      this.$router.go(-1);
    }
  },
  created() {
    var vm = this;
    var stugid=localStorage.getItem('stugid');
     var a = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
		var weekNow = new Date().getDay(); 
		var weeks=a[weekNow];
		
		vm.weekDay=weeks
    $.ajax({
      type: "POST",
      dataType: "jsonp",
//    url:int.getplan2,
			url:int.getPl,
      data: {
        // card: vm.$store.state.a.data.base.user.card,
//      card: "000001535217002",
				uid:vm.$store.state.a.data.base.user.uid,
        recommend: 0,
        project:this.$route.params.id,
        proportion:vm.$store.state.a.data.base.user.proportion,
        gid:stugid,
        sex:vm.$store.state.a.data.base.user.sex
      },
      success: function(response) {
      	vm.$root.eventHub.$emit('Vloading',false)
      	if(response.data){
      		console.log(response)
	        console.log(response.data.period);
	        vm.result = response;
	        vm.week[response.data.period] = "今天";
	        vm.datashow=true
      	}

      },
      error: function(err) {
        console.log(err);
      }
    });
  }
};
</script>

<style scoped>
.day {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f7e7d8;
}
.day li {
  flex: 1;
  font-size: 13px;
  color: #e494eb;
  background: #f7e7d8;
  padding: 1.6vw 0;
  text-align: center;
}
.day li.active {
  border-bottom: 2px solid #e24651;
  color: #e24651;
}
.recommend {
  font-size: 0.7rem;
  background: #f60;
  border: none;
  color: #fff;
  border-radius: 0.5vw;
 	padding:0.2rem 0.5rem;
  border-radius: 0.2rem;
}
.Suggest {
  margin: 0 3.7vw;
  font-size: 16px;
}
.Suggest > .Stitle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #E4E2E2;
}
.Suggest > .Stitle > div {
  padding: 6.1vw 0 5.3vw 0;
}
.Suggest > .Stitle > div > span {
  font-size: 18px;
}
.Suggest > .Stitle > div > img {
  width: 1.2rem;
  margin-right: 0.8rem;
  float: left;
}
.Scontent li {
  padding-top: 2vw;
  color: #666;
}
.add {
  padding-bottom: 6vw;
}

.content {
  background: #fff;
 	position: absolute;
	height: 100%;
	width: 100%;
  overflow-x: hidden;
}
.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
 padding: 0 3.7vw;
  height: 2.5rem;
	line-height: 2.5rem;
	/*border-bottom: 1px solid #ddd;*/
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
.topbar>img {
		height: 1rem;

	}
.menu{
  width: 28px;
  height: 20px;
}
.togBtn {
	text-align: center;
	color: #000;
	width: 66%;
	margin: 7.7vw auto;
	 border: 1px solid #ccc;
	  border-radius:0.2rem;
}
.togBtn span {
  width: 50%;
  display: inline-block;
  line-height: 8.3vw;
  font-size: 0.8rem;
  text-align: center;
  /* background: linear-gradient(to right, #2cdea0, #10be3b);
  color: #fff; */
}

.active {
  background: linear-gradient(to left, #23c9b1, #2bc893);
  color: #fff;
  border: none !important;
}
.menu img {
  width: 28px;
  height: 20px;
}
.banner {
  width: 100%;
  height: 46vw;
}
.banner.ban1 {
  background: url("../../assets/img/archives_banner.png") no-repeat;
  background-size: cover;
}
.banner.ban2 {
  background: url("../../assets/img/Healthplan_banner.png") no-repeat;
  background-size: cover;
}
</style>
