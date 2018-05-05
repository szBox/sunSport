<template>
<div class="content">
  <div class="topbar">
    <img src="../../assets/img/Navigationbar_icon_fanhui.png" @click="goBack">
    <p>排行详情</p>
    <div>
    	
    </div>
  </div>
  
  <div class="rota">
	<div class="rank">
		<div class="rankTle">
			<i class="z-icon"></i>
			<span class="fi">增长率排行</span>
			
		</div>
		<div id="map1" style="width: 80%;height:300px;">

		</div>
	</div>
	</div>
</div>
</template>

<script>
	import $ from "jquery";
	import echarts from 'echarts';
	import int from '../../assets/js/interface'
export default {
  name: "name",
  data(){
    return {
    	pid:this.$route.params.id,
    };
  },
  mounted(){
  	var mh = $(window).height() , vm = this;
	$('.content').css('minHeight', mh);
	
	console.log('asdasdasd:',this.$route)

	var myChart1 = echarts.init(document.getElementById('map1'));
			function ajax(){
				$.ajax({
				type: "GET",
				dataType: "jsonp",
				url: int.getdatazengzhang,
				data: {
//					district: vm.Area,
					uid: 171,
					projectid:vm.pid,
					school_opens_time: '2017-09-01'
				},
				success: function(response) {
					
					var types = []; //学校数组
					var nums = []; //学校学生数组

					for(var i = 0; i < response.pass_rate_rank.length; i++) {
						
							nums.push(response.pass_rate_rank[i].passrate); //挨个取出类别并填入类别数组
						
						
					}
					for(var i = 0; i < response.pass_rate_rank.length; i++) {
						
							types.push(response.pass_rate_rank[i].school_name); //挨个取出销量并填入销量数组
						
						
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
    }
  },
  
  
};
</script>

<style scoped>
.content {
		background: #2E2E30;
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