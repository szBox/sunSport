<template>
	<div class="content">
		<div class="topbar">
			<img src="../../assets/img/Navigationbar_icon_fanhui.png" @click="goUp()">
			<h3>体质监测</h3>
			<div class="y" @click="goGrowUp">我的成长</div>
		</div>
		<div id="aa">
		</div>
		<div class="info">
			<div class="iLeft"></div>
			<div class="iRight"></div>
			<div class="photo">
				<img src="https://tse4-mm.cn.bing.net/th?id=OIP.8yA2OemtTh9D72qTLpypgAHaKV&w=200&h=280&c=7&o=5&pid=1.7" alt="">
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
					<span>卡号:</span>
					<span> {{list.user.uid}} </span>
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
				<p>{{list.all_average}}</p>
				<p>平均分</p>
			</div>
			<div class="ranging">
				<p>{{list.user.class_ranking}}</p>
				<p>班级排名</p>
			</div>
			<div class="ranging">
				<p>{{list.user.school_ranking}}</p>
				<p>全校排名</p>
			</div>
		</div>
		
			  <!--
      下拉组件
    -->
  
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
					pData1: [{
							text: "",
							val: ''
						},
						{
							text: "",
							val: ''
						},
						{
							text: "",
							val: ''
						},
						{
							text: "",
							val: ''
						},
						{
							text: "",
							val: ''
						},
						{
							text: "",
							val: ''
						},
						{
							text: "",
							val: ''
						},
						{
							text: "",
							val: ''
						},
						{
							text: "",
							val: ''
						},
						{
							text: "",
							val: ''
						},
						{
							text: "",
							val: ''
						},
						{
							text: "",
							val: ''
						},
						{
							text: "",
							val: ''
						},
						{
							text: "",
							val: ''
						},
						{
							text: "",
							val: ''
						},
						{
							text: "",
							val: ''
						},
						{
							text: "",
							val: ''
						},
						{
							text: "",
							val: ''
						},
						{
							text: "",
							val: ''
						},
						{
							text: "",
							val: ''
						},
						{
							text: "",
							val: ''
						},
						{
							text: "",
							val: ''
						},
						{
							text: "",
							val: ''
						},
						{
							text: "",
							val: ''
						}
					]
				}
			};
		},
		created(){
			var self = this;
			console.log("开始时间"+self.$store.state.a.startTime)
			var mainUrl = int.getweek;
			var params = {
				school_opens_time: self.$store.state.a.startTime,
				uid: self.$store.state.a.data.base.user.uid,
			};
			api.get_api_data(mainUrl, params, function(d) {
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
				self.pickData1.pData1[i].text = arr[i];
				self.pickData1.pData1[i].val = self.$store.state.a.weeks[i]

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
			/**下拉触发事件 */
			confirmFn(val) {
				this.m = val.select1.text;
				this.val = val.select1.val
				console.log(this.val);

				var self = this;
				this.getdata(val.select1.val)
				this.close();
			},
			godetails() {
				var vm = this;
				
				if(vm.val == undefined) {
					vm.$router.push({
						path: '/fgeneral/' + parseInt(vm.$store.state.a.week +1)
					})
				} else {
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
				self.$router.push({
					path: "/fgrow"
				});
				self.$store.state.a.count--;
			},
			toFile(id) {
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
					weektime: week
				};
				api.get_api_data(mainUrl, params, function(d) {
					console.log(d);
					
					if(d.each_average==null){
						
					}else{
						
					}
//					alert(d.each_average);
					self.$store.state.a.data.base = d;
					self.selectData(d);
				});
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
		padding-left: 18vw;
		font-size: 18px;
		font-weight: normal;
	}
	
	.topbar>img {
		height: 1rem;
		width: 0.75rem;
	}
	
	.info {
		display: flex;
		justify-content: space-between;
		padding: 4.4vw 3.1vw 14.4vw 3.1vw;
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
		font-size: 0.5rem;
		height: 6vw;
		line-height: 6vw;
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
		padding-top: 4.6vw;
	}
	
	.infoData {
		padding: 8vw 0 6vw 0;
		
	}
	
	.dataBtn {
		font-size: 1rem;
		height: 9.8vw;
		line-height: 9.8vw;
		border-radius: 10vw;
		width: 85vw;
		margin: 10vw auto;
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
		border-right: 1px dotted;
	}
	
	.rank .ranging:last-child {
		border-right: none;
	}
	
	.rank .ranging>p {
		color: #888;
		font-size: 0.6rem;
	}
	
	.rank .ranging :first-child {
		font-size: 1.5rem;
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
	
	#main {
		width: 85% !important;
		margin-left: 5%;
		height: 15rem;
		background: #fff !important;
	}
	
	#mainh {
		width: 85% !important;
		margin-left: 5%;
		height: 15rem;
		background: #fff !important;
		color: #000 !important;
	}
	
	#mainw {
		width: 85% !important;
		margin-left: 5% !important;
		height: 15rem !important;
	}
	/**/
	
	.laBtn {
		color: #888;
		border-bottom: 1px solid #888;
		margin: 3vw 7vw 0 7vw;
		padding: 0 0.5vw;
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
	
</style>