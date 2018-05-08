<template>
	<div class="content">
		<div class="topbar">
			<img src="../../assets/img/Navigationbar_icon_fanhui.png" @click="goBack">
			<p>体质监测</p>
			<div class="menu">

			</div>
		</div>
		<div class="area">
			<div class="areaL">
				<!--
        地区选择
      -->

				<p>
					<span>{{province}}</span>
					<span>{{city}}</span>
					<span class="city">{{Area}}</span>
				</p>
				<p class="project-p" @click="open()">
					<span class="proId" >{{project_on}}</span>
					<img src="../../assets/img/Projectxia.png" alt="" />
				</p>
				<p class="bfb">项目达标率</p>
			</div>
			<div class="areaR">
				{{result.passrate_all}}%
			</div>
		</div>

		<div class="proData">
			<div class="rank">
				<div class="rankTle">
					<i class="i-icon"></i>
					<span class="fi">达标率排行</span>
					<span @click="togAll()">查看全部</span>
					
				</div>
				
				<ol class="rankWrap">
					<li class="rankTop">
						<p>名次</p>
						<p>学校</p>
						<p>测试人数</p>
						<p>达标率</p>
					</li>
					<li v-for="(list,index) in result.pass_rate_rank" class="rankTop" v-if="index <= 2">
						<span>{{index+1}}</span>
						<span>{{list.school_name}}</span>
						<span>{{list.all_stu}}</span>
						<span>{{list.passrate}}</span>
					</li>
					<li v-for="(list,index) in result.pass_rate_rank" class="rankTop" v-if="index >= 3 && ss">
						<span>{{index+1}}</span>
						<span>{{list.school_name}}</span>
						<span>{{list.all_stu}}</span>
						<span>{{list.passrate}}</span>
					</li>
				</ol>
			</div>
		</div>

		<div class="rota">
			<div class="rank">
				<div class="rankTle">
					<i class="z-icon"></i>
					<span class="fi">增长率排行</span>
					<span @click="route()">查看全部</span>
				</div>
				<div id="map1" style="width: 80%;height:300px;">

				</div>
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
	import echarts from 'echarts';
	import VuePickers from "vue-pickers";
	import int from '../../assets/js/interface'
	export default {
		name: "name",
		components:{
			VuePickers
		},
		data: function() {
			return {
				ss: false,
				show1:false,
				province: "",
				city: "",
				Area: "",
				result: [],
				project_on:'',
				project_id:'',
				pickData1: {
					columns: 1, // picker的列数
					// 第一列的数据结构
					pData1: [
						
					]
				}
			};
		},
		mounted() {
			var mh = $(window).height();
			$('.content').css('minHeight', mh);
			var maxH=$('.topbar').height()+$('.area').height()+$('.proData').height()+$('.rota').height();
//			alert(maxH)
			if(maxH>mh){
				$('.content').css('height', maxH)
			}
			
			//			console.log($('.proId').height())
			let vm = this;
			var a = this.$route.params.id;
			console.log(a)
			var a = a.split("-");
			this.province = a[0];
			this.city = a[1];
			this.Area = a[2];
			var myChart1 = echarts.init(document.getElementById('map1'));
			function ajax(){
				$.ajax({
				type: "GET",
				dataType: "jsonp",
				url: int.getdatazengzhang,
				data: {
//					district: vm.Area,
					uid: vm.$store.state.d.uid,
					
					school_opens_time: '2017-09-01'
				},
				success: function(response) {
					vm.result = response;
					console.log(vm.result);
					var project_text =[]; //选择项目的  项目名称
					var project_val=[];	  //选择项目的  项目ID
					var types = []; //学校数组
					var nums = []; //学校学生数组
				
					for(var i in response.project_arr){
						vm.pickData1.pData1.push({
							text:response.project_arr[i],
							val:i
						});
					}
//					if(response.projectid)
					vm.project_on=vm.pickData1.pData1[response.projectid].text;  //选择器默认 选择
					vm.project_id=vm.pickData1.pData1[response.projectid].val;  //选择器默认 选择
					for(var i = 0; i < response.pass_rate_rank.length; i++) {
						if(i<5){
							nums.push(response.pass_rate_rank[i].passrate); //挨个取出类别并填入类别数组
						}
						
					}
					for(var i = 0; i < response.pass_rate_rank.length; i++) {
						if(i<5){
							types.push(response.pass_rate_rank[i].school_name); //挨个取出销量并填入销量数组
						}
						
					}
					
					myChart1.setOption({ //加载数据图表

						tooltip: {
							trigger: 'item',
							color: '#fff',

						},

						grid: {
							left: '3%',
							right: '4%',
							bottom: '3%',
							containLabel: true,
						},
						xAxis: {
							type: 'value',
							boundaryGap: [0, 0.01],
							
							splitLine: {
								show: false //去掉横线
							},
					
							gridIndex: 0,
							min: 0,
							max: 100,
							axisLabel:{
						        formatter:function(val) {
						            return val+'%'
						        },
					         //修改 坐标字体颜色     
			                    textStyle: {
			                        color: "#aaa"
			                    }
		               		
						    },
						    axisLine:{
		                        lineStyle:{
		                            color:'#ccc',
		               
		                        }
		                    } 
						},
						yAxis: {
							type: 'category',
							data: types,
							axisTick: {
								show: false //去掉坐标刻度
							},
							axisLabel: {
		                      //  修改 坐标字体颜色     
			                    textStyle: {
			                        color: "#ccc"
			                    }
		                    },
		                    axisLine:{
		                        lineStyle:{
		                            color:'#ccc',
		                 
		                        }
                    } 
						},
						series: [{
							type: 'bar',
							data: nums,
							
							//设置柱子的宽度
							barWidth: 25,
							//配置样式
							itemStyle: {

								//鼠标悬停时：
								emphasis: {
									shadowBlur: 10,
									shadowOffsetX: 0,
									shadowColor: 'rgba(0, 0, 0, 0.5)'
								},

								normal: {
									//		                        color:'#ffcc00',
									barBorderRadius: [0, 20, 20, 0],
									color: new echarts.graphic.LinearGradient(
										0, 0, 1, 0, [{
												offset: 0,
												color: '#FBF6A2'
											},
											{
												offset: 1,
												color: '#ffcc00'
											}

										]
									)
								},

							},
							label: {
								normal: {
									show: true,
									position: 'right',
									color: '#F6CD00'
								}
							},
						}],
					});

				},
				error: function(err) {
					console.log("err" + err);
				}
			});
			
			}
			ajax()
		},
		methods: {
			goBack() {
				this.$router.go(-1);
			},
			togss() {
				this.ss = true;
			},
			route() {
			
				this.$router.push({path:'/allData/'+this.project_id})
			},
			togAll() {
				
				this.$router.push({path:'/Increase/'+this.project_id})
			},
			open(){
				this.show1=true;
			},
			close() {
				this.show1 = false;
			},
			/**下拉触发事件 */
			confirmFn(val) {
				let vm =this;
				
				this.project_on = val.select1.text;
				this.project_id = val.select1.val
				
				var myChart1 = echarts.init(document.getElementById('map1'));
				$.ajax({
				type: "GET",
				dataType: "jsonp",
				url: int.getdatazengzhang,
				data: {
//					district: vm.Area,
					uid: vm.$store.state.d.uid,
					projectid:this.project_id,
					school_opens_time: '2017-09-01'
				},
				success: function(response) {
					
					console.log(response)
					var project_text =[]; //选择项目的  项目名称
					var project_val=[];	  //选择项目的  项目ID
					var types = []; //学校数组
					var nums = []; //学校学生数组
				
					for(var i in response.project_arr){
						vm.pickData1.pData1.push({
							text:response.project_arr[i],
							val:i
						});
					}
					
					for(var i = 0; i < response.pass_rate_rank.length; i++) {
						if(i<5){
							nums.push(response.pass_rate_rank[i].passrate); //挨个取出类别并填入类别数组
						}
						
					}
					for(var i = 0; i < response.pass_rate_rank.length; i++) {
						if(i<5){
							types.push(response.pass_rate_rank[i].school_name); //挨个取出销量并填入销量数组
						}
						
					}
					
					myChart1.setOption({ //加载数据图表

						tooltip: {
							trigger: 'item',
							color: '#fff',

						},

						grid: {
							left: '3%',
							right: '4%',
							bottom: '3%',
							containLabel: true,
						},
						xAxis: {
							type: 'value',
							boundaryGap: [0, 0.01],
							
							splitLine: {
								show: false //去掉横线
							},
					
							gridIndex: 0,
							min: 0,
							max: 100,
							axisLabel:{
						        formatter:function(val) {
						            return val+'%'
						        },
					         //修改 坐标字体颜色     
			                    textStyle: {
			                        color: "#aaa"
			                    }
		               		
						    },
						    axisLine:{
		                        lineStyle:{
		                            color:'#ccc',
		               
		                        }
		                    } 
						},
						yAxis: {
							type: 'category',
							data: types,
							axisTick: {
								show: false //去掉坐标刻度
							},
							axisLabel: {
		                      //  修改 坐标字体颜色     
			                    textStyle: {
			                        color: "#ccc"
			                    }
		                    },
		                    axisLine:{
		                        lineStyle:{
		                            color:'#ccc',
		                 
		                        }
                    } 
						},
						series: [{
							type: 'bar',
							data: nums,
							
							//设置柱子的宽度
							barWidth: 25,
							//配置样式
							itemStyle: {

								//鼠标悬停时：
								emphasis: {
									shadowBlur: 10,
									shadowOffsetX: 0,
									shadowColor: 'rgba(0, 0, 0, 0.5)'
								},

								normal: {
									//		                        color:'#ffcc00',
									barBorderRadius: [0, 20, 20, 0],
									color: new echarts.graphic.LinearGradient(
										0, 0, 1, 0, [{
												offset: 0,
												color: '#FBF6A2'
											},
											{
												offset: 1,
												color: '#ffcc00'
											}

										]
									)
								},

							},
							label: {
								normal: {
									show: true,
									position: 'right',
									color: '#F6CD00'
								}
							},
						}],
					});

				},
				error: function(err) {
					console.log("err" + err);
				}
			});
				this.close();
			},
			
		},
		destroyed(){
			
		},
		created() {

		}
	};
</script>

<style scoped>
	.content {
		background: #2E2E30;
		position: absolute;
		height: 100%;
		width: 100%;
		overflow-x: hidden;
	}
	
	.topbar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 2vw 3.7vw;
		border-bottom: 2px solid #222224;
	}
	
	.topbar>p {
		/*font-size: 1.3rem;*/
		color: #fff;
	}
	
	.topbar>img {
		height: 1rem;
		width: 0.75rem;
	}
	
	.area {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 5.5vw 4.3vw 5.5vw 6.9vw;
		font-size: 18px;
	}
	
	.area .areaR {
		color: #ffcc00;
		font-size: 10vw;
	}
	
	.area .areaL .proId {
		font-size: 22px;
		color: #fff;
		padding: 3vw 0 2.4vw 0;
		display: inline-block;
	}
	
	.area .areaL .bfb {
		color: #bebebf;
		font-size: 18px;
	}
	
	.area .areaL p:first-child {
		color: #bebebf;
		font-size: 18px;
	}
	
	.area .areaL p:first-child span {
		margin-left: 1.1vw;
	}
	
	.area .areaL p:first-child span:first-child {
		margin-left: 0;
	}
	.project-p>img{
		width: 0.8rem;
		height: 0.8rem;
		vertical-align: middle;
		margin-left: 0.5rem;
	}
	.proData {
		border-top: 1.8vw solid #202022;
		border-bottom: 1.8vw solid #202022;
		padding: 2.1vw 0;
	}
	
	.rank>.rankTle {
		display: flex;
		align-items: center;
		height: 12vw;
		border-bottom: 1px solid #000;
		padding: 0 7.7vw;
	}
	
	.rank>.rankTle>img {
		width: 23px;
		height: 24px;
	}
	
	.rank .i-icon {
		margin: 0 4.2vw 0 0;
		display: inline-block;
		width: 23px;
		height: 23px;
		background: url("../../assets/img/Projectdetails_icon_Standard.png") no-repeat;
		background-size: cover;
	}
	
	.rank .z-icon {
		margin: 0 4.2vw 0 0;
		display: inline-block;
		width: 27px;
		height: 24px;
		background: url("../../assets/img/Projectdetails_icon_increase.png") no-repeat;
		background-size: cover;
	}
	
	.rank .fi {
		flex: 1;
	}
	
	.rank .s-icon {
		margin-left: 1.7vw;
		display: inline-block;
		width: 20px;
		height: 20px;
		background: url('../../assets/img/Projectdetails_icon_Arrow.png') no-repeat;
		background-size: cover;
	}
	
	.rank>.rankTle>span {
		font-size: 0.8rem;
		display: inline-block;
		color: #ccc;
	}
	
	.rank>.rankTle :nth-child(3) {
		color: #ffcc00;
	}
	
	.rank .rankWrap {
		padding: 0 6.6vw;
		font-size: 16px;
	}
	
	.rank .rankWrap .rankTop {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid #000;
		text-align: center;
		height: 9.2vw;
		color: #ccc;
	}
	
	.rank .rankWrap .rankTop :nth-child(1) {
		width: 10vw;
	}
	
	.rank .rankWrap .rankTop :nth-child(2) {
		width: 35vw;
	}
	
	.rank .rankWrap .rankTop :nth-child(3) {
		width: 20vw;
	}
	
	.rank .rankWrap .rankTop :nth-child(4) {
		width: 15vw;
	}
	
	.rank .rankWrap .rankTop:nth-child(2) {
		color: #ffcc00;
	}
	
	.rank .rankWrap .rankTop:nth-child(3) {
		color: #ffcc00;
	}
	
	.rank .rankWrap .rankTop:nth-child(4) {
		color: #ffcc00;
	}
</style>