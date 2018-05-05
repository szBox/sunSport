<!--健康计划-->
<template>
  <div class="content">
    <div class="topbar">
      <img src="../../assets/img/Navigationbar_icon_fanhui.png" @click="goBack">
      <p>健康档案</p>
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
      <span @click="toRouter">测量统计</span><span @click="toPlan" class="active">健康计划</span>
    </div>





    <ol class="day">
      <li v-for="(Day,index,key) in week" :key="key" class="weekDay" :class="{'active': index == result.data.period}"> {{Day}} </li>
    </ol>

    <div class="Suggest">
      <div class="Stitle">
        <div>
          <img src="../../assets/img/Healthplan_icon_proposal.png" alt="">
          <span>健康建议</span>
        </div>
        <ol>
          <li v-for="(item,index) in result">
          </li>
        </ol>
        <button @click="toRec" class="recommend">查看我的推荐</button>
      </div>
      <ol class="Scontent">
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
      <ol class="Scontent add">
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
      result: []
    };
  },
  methods: {
    toRec() {
      this.$router.push({ path: "/Recommend/" + this.$route.params.id });
      
    },
    toRouter() {
      this.$router.replace({ path: "/HealthRecords/" + this.$route.params.id });
    },
    toPlan() {
      this.$router.replace({ path: "/Plan/" + this.$route.params.id });
    },
    goBack() {
      this.$router.go(-1);
    }
  },
  created() {
    var vm = this;
    $.ajax({
      type: "POST",
      dataType: "jsonp",
      url:int.getplan2,
      data: {
        // card: vm.$store.state.a.data.base.user.card,
//      card: "000001535217002",
				uid:185,
        recommend: 0
      },
      success: function(response) {
      	console.log(response);
        console.log(response.data.period);

        vm.result = response;
        vm.week[response.data.period] = "今天";
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
  font-size: 3vw;
  background: #f60;
  border: none;
  color: #fff;
  border-radius: 0.5vw;
  height: 6.4vw;
  line-height: 6.4vw;
  width: 24vw;
}
.Suggest {
  margin: 0 3.7vw;
  font-size: 16px;
}
.Suggest > .Stitle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
}
.Suggest > .Stitle > div {
  padding: 6.1vw 0 5.3vw 0;
}
.Suggest > .Stitle > div > span {
  font-size: 20px;
}
.Suggest > .Stitle > div > img {
  width: 1.2rem;
  margin-right: 0.4rem;
}
.Scontent li {
  padding-top: 3.7vw;
}
.add {
  padding-bottom: 6vw;
}

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
}
.topbar>img {
		height: 1rem;
		width: 0.75rem;
	}
.menu{
  width: 28px;
  height: 20px;
}	
.togBtn {
  padding: 7.7vw 0;
  text-align: center;
  color: #000;
}
.togBtn span {
  border: 1px solid #ccc;
  width: 32vw;
  height: 8.3vw;
  display: inline-block;
  line-height: 8.3vw;
  font-size: 0.8rem;
  text-align: center;
  /* background: linear-gradient(to right, #2cdea0, #10be3b);
  color: #fff; */
}
.togBtn span:last-child {
  border-radius: 0 0.2rem 0.2rem 0;
  border-left: 0;
}
.togBtn span:first-child {
  border-radius: 0.2rem 0 0 0.2rem;
  border-right: 0;
}
.active {
  background: linear-gradient(to left, #23c9b1, #2bc893);
  color: #fff;
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