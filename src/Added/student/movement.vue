<template>
  <div class="content">
    <div class="topbar">
      <img src="../../assets/img/Navigationbar_icon_fanhui.png" @click="goBack">
      <p>{{prohead}}</p>
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
      <span class="active" @click="toRouter">测量统计</span><span @click="toPlan">运动计划</span>
    </div>






    <div class="dateSelection">
      <div class="dateFn">
        <img src="../../assets/img/archives_icon_Calendar.png" alt="">
        <!--
          日期选择组件
        -->
        <DatePicker type="date"  :transfer='true' :editable="false" placeholder="最近测试  (查看日期)" class="DPicker" style="width: 73vw" @on-change="getTime"></DatePicker>
      </div>
      <div class="dateIcon">
        <img src="../../assets/img/archives_icon_Arrow.png">
      </div>
    </div>

    <div class="dataList">
      <ul v-if='result.mark.length'>
        <li v-for="item in result.mark">
          <div class="infoText">
            <img src="../../assets/img/Ropeskipping_icon_time.png" alt="">
            <p>{{item.createdate}}</p>
          </div>
          <div class="Val">
            <p>测量值 <span>{{item.result}}</span></p>
            <p></p>
          </div>
          <div class="result bmiIcon" v-if="item.text=='达标'">
            <!--<p>{{item.text}}</p>-->
            <img src="../../assets/img/Ropeskipping_icon_Standard.png" alt="" style="width: 2.5rem;"/>
          </div>
           <div class="result bmiIcon" v-if="item.text=='未达标'">
            <!--<p>{{item.text}}</p>-->
            <img src="../../assets/img/Ropeskipping_icon_no.png" alt="" style="width: 3rem;"/>
          </div>
        </li>
      </ul>

  	 <ul v-if='!result.mark.length'>
        <li>
          <div class="infoText">
            <img src="../../assets/img/Ropeskipping_icon_time.png" alt="">
            <p></p>
          </div>
          <div class="Val">
            <p>测量值: <span style="font-size: 16px;">暂无数据</span></p>
            <p></p>
          </div>
          <div class="result">

          </div>
        </li>
  	</ul>

    </div>
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
      newTime: '',
      show1: false,
      prohead:'',
      resultImg:'',
      pickData1: {
        columns: 1, // picker的列数
        // 第一列的数据结构
        pData1: [

        ]
      }
    };
  },
  mounted(){
  	 var hei = $(window).height();
     $(".content").css({ height: hei + "px", background: "#fff" });
		$("body").css({ height: 0 + "px"});
  },
  created() {
    var vm = this;
    var pHead=localStorage.getItem('proheads')
		vm.prohead=pHead;
		var stugid=localStorage.getItem('stugid')
    var d = new Date();
    var dTime =
      parseInt(d.getFullYear()) +
      "-" +
      parseInt(d.getMonth() + 1) +
      "-" +
      parseInt(d.getDate());
    $.ajax({
      type: "GET",
      dataType: "jsonp",
      url: int.getplan,
      data: {
        uid: vm.$store.state.a.data.base.user.uid,
        // date: dTime
//      date:(new Date().getFullYear())+'-'+(new Date().getMonth()+1)+'-'+(new Date().getDate()),
        projectid: vm.$route.params.id,
        proportion:vm.$store.state.a.data.base.user.proportion,
        sex:vm.$store.state.a.data.base.user.sex,
        gid:stugid
      },
      success: function(response) {
				vm.$root.eventHub.$emit('Vloading',false)
      	console.log(response)
//    	for(var i = 0; i < response.mark.length; i++ ){
//    		if(response.mark[i].text=='达标'){
//						vm.resultImg=require('../../assets/img/Ropeskipping_icon_Standard.png')
//					}else if(response.mark[i].text=='未达标'){
//						vm.resultImg=require('../../assets/img/Ropeskipping_icon_no.png')
//					}
//    	}
				
        vm.result = response
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
    toRouter() {
//    this.$router.replace({ path: "/HealthRecords/" + this.$route.params.id });
    },
    getTime(t) {
//  	alert(t)
      this.newTime = t
      var vm = this;
      $.ajax({
        type: "GET",
        dataType: "jsonp",
//      url: host+"/index.php?m=content&f=statistics&v=getbmi",
				 url:int.getdangan,
        data: {
          uid: vm.$store.state.a.data.base.user.uid,
          date: t,
          school_opens_time:vm.$store.state.a.startTime,
          projectid:vm.$route.params.id
        },
        success: function(response) {
          vm.result = response;
          console.log(response);

        },
        error: function(err) {
          console.log(err);
        }
      });
    },
    toPlan() {
    	var self=this;
    	self.$root.eventHub.$emit('Vloading',true)
      this.$router.replace({ path: "/Plan1/" +this.$route.params.id });
    },
    goBack() {
      this.$router.go(-1);
    },

    /**下拉触发事件 */
    confirmFn(val) {
    	console.log(val);
      console.log(val.select1.val);
			
      var vm = this;
      
      if(val.select1.text=='身高体重'){
      	vm.$root.eventHub.$emit('Vloading',true)
      	this.$router.replace({ path: "/HealthRecords/" + val.select1.val });
      }
      else{
      	$('.ivu-input').val('')
      	vm.$root.eventHub.$emit('Vloading',true)
      		localStorage.setItem('proheads',val.select1.text)
      		 var pHead=localStorage.getItem('proheads')
					vm.prohead=pHead;
      	 this.$router.replace({ path: "/movement/" + val.select1.val });
			      var vm = this;
			      var times='';
			      var stugid=localStorage.getItem('stugid')
//			      判断时间有没有选择时间,没有选择就用今天的
						console.log('选择的时间'+this.newTime);
						if(this.newTime!=''){
							times=this.newTime
						}else{
							times=""
						}
			      $.ajax({
			        type: "GET",
			        dataType: "jsonp",
							 url:int.getdangan,
			        data: {
			          uid: vm.$store.state.a.data.base.user.uid,
//			          date: times,
			          school_opens_time:vm.$store.state.a.startTime,
			          projectid:val.select1.val,
			          sex:vm.$store.state.a.data.base.user.sex,
        				gid:stugid
			        },
			        success: function(response) {
			        	vm.$root.eventHub.$emit('Vloading',false)
			          vm.result = response;
			          console.log(response);

			        },
			        error: function(err) {
			          console.log(err);
			        }
			      });

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
.topbar>img {
		height: 1rem;
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
  width: 20px;
  height: 16px;
}
.banner {
  width: 100%;
  height: 46vw;
}
.banner.ban1 {
  background: url("../../assets/img/Ropeskipping_banner.png") no-repeat;
  background-size: cover;
}

.dateSelection {

  padding: 5vw 7.5vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #e5e5e5;
  height: 9.2vw;
  position: relative;
}
.dateSelection .dateFn > * {
  vertical-align: middle;
}
.dateSelection .dateIcon {
  position: absolute;
  right: 7.6vw;
  top: calc(5vw - 12px);
  z-index: 1;
}
.dateSelection .dateIcon img {
  width: 15px;
  height: 10px;
}
.dateSelection .dateFn img {
  margin: 0 2.7vw 0 0;
  width: 1.2rem;
}
.dataList > ul > li {
  display: flex;
  align-items: flex-end;
  font-size: 14px;
  border-bottom: 1px solid #E0E0E0;
  padding: 5vw 3vw;
  justify-content: space-between;
}
.dataList > ul > li .infoText {
  text-align: center;
}
.dataList > ul > li .infoText img {
  padding-bottom: 0.3rem;
  width: 1.2rem;
}
.dataList > ul > li > div:nth-child(1) {
  border-right: 1px solid #E0E0E0;
  width: 20vw;
}

.dataList > ul > li > div:nth-child(2) {
  flex: 1;
  padding-left: 1rem;
}
.dataList > ul > li > div:nth-child(2) > p:last-child {
  color: #adadad;
}
.dataList > ul > li > div:nth-child(2) > p:first-child {
  font-size: 18px;
  padding-bottom: 0.3rem;
}
.dataList > ul > li > div:nth-child(3) {
  color: #ccc;
}
.dataList > ul > li > div.bmiIcon img{

}
.dataList > ul > li > div.bmiIcon > p {
  border-radius: 50%;
  background: #2e2e2e;
  width: 10vw;
  height: 10vw;
  line-height: 10vw;
  text-align: center;
  background: #2ac895;
  overflow: hidden;
  color: #fff;
  font-size: 0.6rem;
}
.Val span,.Val i{
	color: #0EB0CD;
}
.Val span{
	font-size: 1.2rem;
	
}
.dataList > ul > li > div.bmiIconNo > p{
	background: #555;
}
.dataList > ul > li > div.bmiIconOk > p{
	background: #2e2e2e;
}
</style>
