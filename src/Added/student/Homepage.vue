<template>
	<div class="content">
		<div class="topbar">
			<img src="../../assets/img/Navigationbar_icon_fanhui.png" @click="goUp()">
			<!--<h3>体质监测</h3>-->
			<h3>菁菁达人</h3>
			<div class="y" @click="goGrowUp">我的成长</div>
		</div>
		<div id="aa">
		</div>
		<div class="info">
			<div class="iLeft"></div>
			<div class="iRight"></div>
			<div class="photo">
				<img :src="img" alt="">
				
				<div class="file-btn" @click="toFile">健康档案</div>
			</div>
			<div class="perInfo">
				<p>
					<span>姓名:</span>
					<span> {{list.user.name}} </span>
				</p>
				<p>
					<span>性别:</span>
					<span> {{list.user.sex}} </span>
				</p>
				<p>
					<span>年级:</span>
					<span> {{list.user.grade}} </span>
				</p>
				<p>
					<span>权重总分:</span>
					<span> {{list.power_all}} </span>
				</p>
			</div>
		</div>

		<div class="laBtn" @click="open">
			<p>{{m}}</p>
			<p>
				<img src="../../assets/img/archives_icon_Arrow.png" alt="">
			</p>
		</div>

		<div class="infoData">
			<div id="main" style="display: block;"></div>
			<div id="mainh" style="display: none;">

			</div>
			<div id="mainw" style="display: none;"></div>
		</div>

		<div class="dataBtn" @click="godetails">
			查看详细数据
		</div>
		<div class="rank">
			<div class="ranging">
				<p>{{all_average}}</p>
				<p>平均分</p>
			</div>
			<div class="ranging">
				<p>{{banji}}</p>
				<p>班级排名</p>
			</div>
			<div class="ranging">
				<p>{{quanxiao}}</p>
				<p>全校排名</p>
			</div>
		</div>
		

			  <!--
      下拉组件
    -->
		<div class="modell" style="display: none;">
        <div class="model-img">
          <img src="../../assets/img/xinxitu@2x.png" width="100%">
        </div>
        <div class="model-text">
          <!--用户没有权限或者未绑定卡号-->
        </div>
        <div class="model-content" >
          <div class="model-btn" @click="closeBtn">知道了</div>
        </div>
      </div>	
    <vue-pickers :show="show1"
    :selectData="pickData1"
    v-on:cancel="close"
    v-on:confirm="confirmFn"></vue-pickers>

	
	</div>


</template>

<script>
	import $ from "jquery";
	// import echart from "echarts";
	import echarts from "../../assets/js/ect";
	import echartsh from "../../assets/js/ect1";
	import weui from "../../assets/js/jquery-weui";
	import int from "../../assets/js/interface";
	import api from "../../fetch/api";
	import VuePickers from "vue-pickers";

	export default {
		name: "name",
		data: function() {
			return {
				m: "",
				img:'',
				banji:'',
				quanxiao:'',
				all_average:'',
				list:{},
				show1: false,
				alldate: [
					"2017~2018学年 第一周",
					"2017~2018学年 第二周",
					"2017~2018学年 第三周",
					"2017~2018学年 第四周",
					"2017~2018学年 第五周",
					"2017~2018学年 第六周",
					"2017~2018学年 第七周",
					"2017~2018学年 第八周",
					"2017~2018学年 第九周",
					"2017~2018学年 第十周",
					"2017~2018学年 第十一周",
					"2017~2018学年 第十二周",
					"2017~2018学年 第十三周",
					"2017~2018学年 第十四周",
					"2017~2018学年 第十五周",
					"2017~2018学年 第十六周",
					"2017~2018学年 第十七周",
					"2017~2018学年 第十八周",
					"2017~2018学年 第十九周",
					"2017~2018学年 第二十周",
					"2017~2018学年 第二十一周",
					"2017~2018学年 第二十二周",
					"2017~2018学年 第二十三周",
					"2017~2018学年 第二十四周"
				],
				pickData1: {
					columns: 1, // picker的列数
					// 第一列的数据结构
					pData1: [
					]
				}
			};
		},
		created(){
			var self = this;
			console.log("开始时间"+self.$store.state.a.startTime);
			
			$('body').css({background:'#fff'})
			var mainUrl = int.getweek;
			var params = {
				school_opens_time: self.$store.state.a.startTime,
				uid: self.$store.state.a.data.base.user.uid,
        proportion:self.$store.state.a.data.base.user.proportion
			};
			api.get_api_data(mainUrl, params, function(d) {
				self.$root.eventHub.$emit('Vloading',false)
				console.log(d)
//				self.$store.state.a.weeks = d;
//				self.selectData(d);
			});
		},
		mounted() {
			
			var self = this;
			
			
			this.list=this.$store.state.a.data.base;
			
			if(this.$store.state.a.data.base.user.name == "") {
				this.$router.push({
					path: "/"
				});
			}
			
			
			var arr = [];
			console.log(self.$store.state.a.weeks)
			for(var i = 0; i < self.$store.state.a.weeks.length; i++) {
				arr[i] = self.alldate[self.$store.state.a.weeks[i] - 1];
//				self.pickData1.pData1[i].text = arr[i];
//				self.pickData1.pData1[i].val = self.$store.state.a.weeks[i]
				self.pickData1.pData1.push({
					text:arr[i],
					val :self.$store.state.a.weeks[i]
				})

			}
			var index = parseInt(arr.length - 1);

			self.m = arr[index];

			//  var hei = $(document).height();
			//  $(".content").css({ height: hei + 'px', background: "#fff" });
			//		console.log(hei)
			var time = "";
			if(self.$store.state.a.week) {
				time = self.$store.state.a.week+1;

			} else {
				time =
					self.$store.state.a.weeks[self.$store.state.a.weeks.length - 1] - 1;
			}
			self.getdata(time);
		},
		computed: {
//			list() {
//				return this.$store.state.a.data.base;
//			}
		},
		components: {
			VuePickers
		},
		methods: {
//			/**下拉触发事件 */
			confirmFn(val) {
				this.m = val.select1.text;
				this.val = val.select1.val;
				console.log(this.val);

				var self = this;
				this.getdata(val.select1.val)
				this.close();
			},
			godetails() {
				var vm = this;
				
				if(vm.val == undefined&&vm.$store.state.a.week!=NaN) {
					vm.$root.eventHub.$emit('Vloading',true)
					vm.$router.push({
						path: '/fgeneral/' + parseInt(vm.$store.state.a.week +1)
					})
				}else if(vm.$store.state.a.week==NaN){
					
					$(".modell").css({
							display: "block"
						});
					$('.model-text').html('暂无测试成绩');
				}
				else {
					vm.$root.eventHub.$emit('Vloading',true)
					vm.$router.push({
						path: '/fgeneral/' + vm.val
					})
				}

			},

			goUp() {
//				alert('返回')
				this.$router.go(-1);
			},
			goGrowUp() {
				var self = this;
				self.$root.eventHub.$emit('Vloading',true)
				self.$router.push({
					path: "/fgrow"
				});
				self.$store.state.a.count--;
			},
			toFile(id) {
				var self=this;
				self.$root.eventHub.$emit('Vloading',true)
				this.$router.push({
					path: "/HealthRecords/" +23
//					path: "/HealthRecords/" +23+'?time='+this.$route.params.id
				});
			},
			selectData(val) {
				var self = this;
				var project = [];
				var score = new Array();
				var average = val.each_average;

				for(var i in average) {
					project.push(api.get_project(i));
					score.push(average[i]);

				}
				var newArr = [];
				var newProject = [];
				for(var z = 0; z < score.length; z++) {
					if(score[z] == 0) {} else {
						newArr.push(score[z]);
						newProject.push(project[z]);
					}
				}

				var time = setInterval(function() {
					if(newArr.length == 0) {
						$(".modell").css({
							display: "block"
						});
						$('.model-text').html('暂无测试成绩');
						$(".model-b").css({
							display: "block"
						});
						$("#mainh").css({
							display: "none"
						});
						$("#main").css({
							display: "none"
						});
						$("#mainw").css({
							display: "block"
						});
						clearInterval(time);
					} else if(newArr.length < 3) {
						$("#mainh").css({
							display: "block"
						});
						$("#main").css({
							display: "none"
						});
						$("#mainw").css({
							display: "none"
						});
						var obj = document.getElementById("mainh");
						var a1 = "";
						var a2 = "";
						var a3 = newProject;
						var x = newArr;
						var y = "";
						echartsh.initDataH(x, y, obj, a1, a2, a3);
						clearInterval(time);
					} else {
						$("#mainh").css({
							display: "none"
						});
						$("#main").css({
							display: "block"
						});
						$("#mainw").css({
							display: "none"
						});
						var obj = document.getElementById("main");
						var maxproject = new Array();
						for(var m = 0; m < project.length; m++) {
//							console.log(project)
							var ob = {
								name: "",
								max: 150
							};
							ob.name = project[m];
							maxproject.push(ob);
						}
						var dataBJ = [{
							value: score,
							name: "平均分"
						}];
						var indicatorData = maxproject;
						echarts.initDataY(dataBJ, indicatorData, obj, "", score);
						clearInterval(time);
					}
				}, 100);
			},
			getdata(index) {
				var self = this;
				var week = index;
				var mainUrl = int.gofamily;
				var params = {
					school_opens_time: self.$store.state.a.startTime,
					uid: self.$store.state.a.data.base.user.uid,
//					uid:171,
					weektime: week,
//       			 proportion:self.$store.state.a.data.base.user.proportion
					proportion:self.$store.state.a.proportion    //p 修改
				};
				api.get_api_data(mainUrl, params, function(d) {
					
					console.log(d)
					self.all_average=d.all_average;
					if(d.user.sex=='男'){
						self.img=require('../../assets/img/boy.png')
					}else if(d.user.sex=='女'){
						self.img=require('../../assets/img/girl.png')
					}
					if(d.all_average==0){
		//				alert('111')
						self.quanxiao=0;
						self.banji=0;
					}else{
						
						self.quanxiao=d.user.school_ranking;
						self.banji=d.user.class_ranking;
					}
          if(d.each_average==null){

					}else{

					}
//					alert(d.each_average);
//					self.$store.state.a.data.base = d;     覆盖参数
					self.selectData(d);
				});
			},

				 closeBtn(){
        $('.modell').css({display:'none'});
        $('.model-b').css({display:'none'});
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
	.pick-div{
		position: fixed;
		background: khaki;
		height: auto;
    width: 100%;
	}
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
		align-items: center;
		justify-content: space-between;
	    height: 2.5rem;
		line-height: 2.5rem;
		padding: 0 3.7vw;
		border-bottom: 1px solid #ddd;
	}

	.topbar h3 {
		flex: 1;
		text-align: center;
		
		font-size: 18px;
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

	.info {
		display: flex;
		justify-content: space-between;
		padding: 4.4vw 3.1vw 5.4vw 3.1vw;
		border: 3.7vw solid;
		
		border-bottom: 0;
		border-image: linear-gradient(#40f6dd, #0ebe2b) 30 30;
		position: relative;
	}

	.info::after {
		content: "";
		display: inline-block;
		position: absolute;
		left: -3.7vw;
		bottom: -5rem;
		background: linear-gradient(#0ebe2b, #0ebe2b);
		width: 3.7vw;
		height: 5rem;
	}

	.info::before {
		content: "";
		display: inline-block;
		position: absolute;
		right: -3.7vw;
		bottom: -5rem;
		background: linear-gradient(#0ebe2b, #0ebe2b);
		width: 3.7vw;
		height: 5rem;
	}

	.info .iLeft {
		border-top: 0.5rem solid transparent;
		border-left: 0.5rem solid #0ebe2b;
		border-right: 0.5rem solid transparent;
		border-bottom: 0.5rem solid transparent;
		position: absolute;
		z-index: 1;
		left: -1px;
		bottom: -0.5rem;
	}

	.info .iRight {
		border-top: 0.5rem solid transparent;
		border-right: 0.5rem solid #0ebe2b;
		border-left: 0.5rem solid transparent;
		border-bottom: 0.5rem solid transparent;
		position: absolute;
		z-index: 1;
		right: -1px;
		bottom: -0.5rem;
	}

	.info .file-btn {
		width: 22vw;
		font-size: 0.7rem;
    height: 7vw;
    line-height: 7vw;
		text-align: center;
		border-radius: 10vw;
		background: linear-gradient(to right, #ffc617, #ffa510);
		position: absolute;
		left: 4vw;
		color: #fff;
		bottom: -3.1vw;
	}

	.info .photo {
		position: relative;
		width: 30vw;
		height: 41vw;
	}

	.info .photo img {
		width: 30vw;
		height: 41vw;
	}

	.info .perInfo {
		flex: 1;
		padding-left: 8.3vw;
		font-size: 0.8rem;
	}

	.info .perInfo>p {
		padding-top: 4vw;
	}

	.infoData {
		padding: 3vw 0 3vw 0;

	}

	.dataBtn {
		font-size: 0.8rem;
		height: 9.8vw;
		line-height: 9.8vw;
		border-radius: 10vw;
		width: 85vw;
		margin: 0vw auto;
		text-align: center;
		box-shadow: 0.08rem 0.17rem 0.15rem #90d1b2;
		background: linear-gradient(to right, #2cdea0, #10be3b);
		color: #fff;
	}

	.rank {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 2rem 0;
	}

	.rank .ranging {
		flex: 1;
		text-align: center;
		border-right: 1px dashed #E5E5E5;
	}

	.rank .ranging:last-child {
		border-right: none;
	}

	.rank .ranging>p {
		color: #A3A3A3;
		font-size: 0.7rem;
	}

	.rank .ranging :first-child {
		font-size: 2rem;
		color: #000;
		padding-bottom: 4vw;
	}

	.sWeek .sShow {
		margin: 0 7vw;
		border-bottom: 1px solid #ccc;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1vw 1vw;
	}

	.sWeek .sShow .sTle {
		color: #ccc;
		flex: 1;
	}

	.sWeek .sHide {
		height: 0;
		width: 100vw;
		position: fixed;
		bottom: 0;
		left: 0;
	}

	.sWeek .sHide .tle {
		font-size: 16px;
		border-top: 1px solid #fff;
		border-bottom: 1px solid #fff;
		padding: 0.8rem;
		text-align: center;
		position: relative;
	}

	.sWeek .sHide .tle .okBtn {
		color: #0ebe2b;
		position: absolute;
		right: 0.8rem;
	}

	.sWeek .sHide.weekDate {
		height: 18rem;
		transition: all 1s;
	}

	.sWeek .sHide .cent {
		text-align: center;
		overflow: auto;
		height: 15rem;
		padding: 0.8rem 0;
	}

	.y {
		font-size: 0.8rem;
		color: #ffcc00;
		width: 20vw;
		text-align: right;
	}

	/*#main {*/
		/*width: 85% !important;*/
		/*margin-left: 5%;*/
		/*height: 15rem;*/
		/*background: #fff !important;*/
	/*}*/

	/*#mainh {*/
		/*width: 85% !important;*/
		/*margin-left: 5%;*/
		/*height: 15rem;*/
		/*background: #fff !important;*/
		/*color: #000 !important;*/
	/*}*/

	/*#mainw {*/
		/*width: 85% !important;*/
		/*margin-left: 5% !important;*/
		/*height: 15rem !important;*/
	/*}*/
  #main {
  width: 90%;
  margin-left: 5%;
  height: 15rem;
  background: #fff !important;
  }

  #mainh {
  width: 90%;
  margin-left: 5%;
  height: 15rem;
  background: #fff !important;
  color: #000 !important;
  }

  #mainw {
  width: 90%;
  margin-left: 5% ;
  height: 15rem !important;
  }
	/**/

	.laBtn {
		color: #888;
		border-bottom: 1px solid #D1D1D1;
		margin: 3vw 7vw 0 7vw;
		padding: 0.5rem 0.5vw;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.laBtn p {
		font-size: 0.8rem;
	}

	.laBtn>p>img {
		width: 0.6rem;
		height: 0.4rem;
		margin-bottom: 0.4rem;
	}
 .modell{
    position: fixed;
    z-index: 30;
    width: 12rem;
    height: 13rem;
    left: 50%;
    top: 50%;
    margin-top: -6.5rem;
    margin-left: -6rem;
    background-color: #F6F6F6;
    border-radius: 0.5rem;
    }
    .model-img img{
    width: 7rem;
    height: 8rem;
    margin-left: 2.5rem;
    margin-top: 1rem;
	}
	.model-text{
    font-size: 0.75rem;
    color: #000000;
    text-align: center;
}
.model-content{
    border-top: 1px solid #C9CBD1;
    margin-top: 0.5rem;
    height: 4rem;
    width: 100%;
}
.model-btn{
    width: 5rem;
    margin-left: 3.5rem;
    height: 1.5rem;
    border-radius: 1rem;
    background-color: #33B097;
    color: #ffffff;
    font-size: 0.7rem;
    margin-top: 0.5rem;
    text-align: center;
    line-height: 1.5rem;
}
</style>
