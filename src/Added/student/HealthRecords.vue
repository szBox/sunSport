<template>
  <div class="content">
    <div class="topbar">
      <img src="../../assets/img/Navigationbar_icon_fanhui.png" @click="goBack">
      <p>健康档案</p>
      <div class="menu" @click="open">
        <img src="../../assets/img/Navigationbar_icon_liebiao.png">
      </div>
    </div>
    <!--
      拉下菜单

    -->
    <vue-pickers :show="show1"
    :selectData="pickData1"
    v-on:cancel="close"
    v-on:confirm="confirmFn"></vue-pickers>

    <div class="banner ban1">
      <!--
        banner
      -->
    </div>
    
    <div class="togBtn">
      <span class="active" @click="toRouter">测量统计</span><span @click="toPlan">健康计划</span>
    </div>
    <router-view />
  </div>
</template>

<script>
import $ from "jquery";
import VuePickers from "vue-pickers";
import int from '../../assets/js/interface'
export default {
  name: "name",
  components: {
    VuePickers
  },
  data: function() {
    return {
      result: [],
      show1: false,
      pickData1: {
        columns: 1, // picker的列数
        // 第一列的数据结构
        pData1: [
        ]
      }
    };
  },
  created() {
    var hei = $(document).height();
    console.log(hei);
    
    $(".content").css({ height: hei + "px", background: "#fff" });
		$("body").css({ height: 0 + "px" , background: "#fff"});
    var vm = this;
    var d = new Date();
    var dTime =
      parseInt(d.getFullYear()) +
      "-" +
      parseInt(d.getMonth() + 1) +
      "-" +
      parseInt(d.getDate());
    this.newTime = dTime;
    $.ajax({
      type: "GET",
      dataType: "jsonp",
//    url: "http://192.168.0.211/index.php?m=content&f=statistics&v=getbmi",
//    url: "http://192.168.0.247/index.php?m=content&f=web_healthy&v=bmi",
			url:int.getdangan,
      data: {
//      card: vm.$store.state.a.data.base.user.card,
				uid:vm.$store.state.a.data.base.user.uid,
				date:(new Date().getFullYear())+'-'+(new Date().getMonth()+1)+'-'+(new Date().getDate()),
				school_opens_time:vm.$store.state.a.startTime,
        projectid: vm.$route.params.id
      },
      success: function(response) {
      	console.log(response)
        // vm.pickData1.pData1 = response.project;
        for (var i = 0; i < response.project.length; i++) {
					vm.pickData1.pData1.push({
						text:response.project[i].projectname,
						val:response.project[i].projectid
					})
        }
      },
      error: function(err) {
        console.log(err);
      }
    });
  },
  methods: {
    toRouter(id) {
      this.$router.replace({ path: "/HealthRecords/" + this.$route.params.id });
    },
    toPlan() {
      this.$router.replace({ path: "/Plan/" + this.$route.params.id });
    },
    goBack() {
      this.$router.go(-1);
    },

    /**下拉触发事件 */
    confirmFn(val) {
//  	console.log(val)
      console.log(val.select1.val);

      var vm = this;
      if(this.$route.params.id!=val.select1.val){
      	this.$router.replace({ path: "/movement/" + val.select1.val });
      }
      
      this.close();
    },
    close() {
      this.show1 = false;
    },
    open() {
      this.show1 = true;
    }
  }
};
</script>

<style scoped>
.content {
		background: #fff;
		/*height: 100vh;*/
		position: absolute;
		height: 100%;
		width: 100%;
		overflow-x: hidden;
	}
.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 2.5rem;
	line-height: 2.5rem;
	padding: 0 3.7vw;
	border-bottom: 1px solid #ddd;
}
.topbar > p {
  font-size: 18px;
}
.topbar h3 {
		flex: 1;
		text-align: center;
		padding-left: 18vw;
		font-size: 22px;
	}
.topbar>img {
		height: 1rem;
		width: 0.75rem;
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
</style>