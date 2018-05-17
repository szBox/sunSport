/**
 * Created by Administrator on 2017/8/11.
 */
import $ from 'jquery'
import api from './api.js'
var echarts = require('echarts');
var mm = (function() {
	return {
		initDataY: function(x, y, ob, self, arr) {
			var v1 = echarts.init(ob);
			var dataBJ = x;

			var indicatorData = y;
			var lineStyle = {
				normal: {
					width: 2,
					opacity: 1
				}
			};

			var option = {
				trigger: '',
				color: [],
				backgroundColor: '#2E2E31',

				tooltip: {
					trigger: 'item',
					textStyle: {
						color: '#ffffff',
						fontSize: 10,
						width: 50,
						textShadowOffsetX: 10,
						textShadowOffsetY: 10,
						lineHeight: 10
					},
					formatter: function() {
						var res = '<br/>';
						for(var i = 0; i < indicatorData.length; i++) {
							res += indicatorData[i].name;
							for(var j = 0; j < arr.length; j++) {
								if(i == j) {
									res += "：" + arr[j] + "分" + "<br/>"
								}
							}
						}
						return res;
					}
				},
				radar: {
					center: ['50%', '50%'],
					indicator: indicatorData,
					radius: '60%',
					splitNumber: 1,
					triggerEvent: true,
					nameGap: 10,
					name: {
						textStyle: {
							color: '#999',
							fontSize: 12
						},
						show: true,

					},
					splitLine: {

						lineStyle: {
							//                color: '#f00',
							opacity: 0.5,
								normal:{
				                width:2
	           				}
						}
					},
					splitArea: {
						show: true,
						areaStyle: {
							color: '#fff',
							opacity: 1
						}
					},
					axisLine: {
						show: true,
						lineStyle: {
							color: '#E4E4E4',
							opacity: 0.5
						}
					}

				},
				series: [{
						name: '雷达线ALL',
						type: 'radar',
						silent: true,
						lineStyle: {
							normal: {
								type: 'solid',
								borderColor: '#FFFAB0',
								borderWidth: 1,

								width: 1,
								opacity: 1,

							}
						},
						data: [
							[150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150]
						],

						itemStyle: {
							normal: {
								opacity: 0

							}
						},
						areaStyle: {
							normal: {
								color: '#F5F5F5',
								opacity: 1
							}
						}
					}, {
						name: '雷达线2',
						type: 'radar',
						silent: true,
						lineStyle: {
							normal: {
								type: 'solid',
								color: "e4e4e4",
								width: 1,
								opacity: 0.8,

							}
						},
						data: [
							[120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120]
						],

						itemStyle: {
							normal: {
								opacity: 0

							}
						},
						areaStyle: {
							normal: {
								color: '#FFFFFF',
								opacity: 1
							}
						}
					}, {
						name: '雷达线3',
						type: 'radar',
						silent: true,
						lineStyle: {
							normal: {
						
								color: '#F5F5F5',
								opacity: 1,
//								width: 1,
							

							}
						},
						data: [
							[90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90]
						],

						itemStyle: {
							normal: {
								opacity: 0

							}
						},
						areaStyle: {
							normal: {
								color: '#F5F5F5',
								opacity: 1
							}
						}
					}, {
						name: '雷达线4',
						type: 'radar',
						silent: true,
						lineStyle: {
							normal: {
								type: 'solid',
								color: "#e4e4e4",
								width: 1,
								opacity: 1,

							}
						},
						data: [
							[60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60]
						],

						itemStyle: {
							normal: {
								
								color:'#fff',
								opacity: 0,
							}
						},
						areaStyle: {
							normal: {
//								color: 'rgba(0,0,0,0)',
//								opacity: 0.1
							}
						}
					}, {
						name: '雷达线5',
						type: 'radar',
						silent: true,
						lineStyle: {
							normal: {
								type: 'solid',
								color: "#e4e4e4",
								width: 1,
								opacity: 1,

							}
						},
						data: [
							[30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30]
						],

						itemStyle: {
							normal: {
								opacity: 0

							}
						},
						areaStyle: {
							normal: {
								color: 'rgba(0,0,0,0)',
								opacity: 0.1
							}
						}
					}, {
						name: '',
						type: 'radar',
						lineStyle: lineStyle,
						data: dataBJ,

						symbolSize: 4,
						itemStyle: {
							normal: {
								borderColor: '#FFFAB0',
								borderWidth: 1,
								opacity: 0,
							}
						},

						areaStyle: {
							normal: {
								color: '#ffcc00',
								opacity: 1
							}
						},

					}, {
						name: '雷达线',
						type: 'radar',
						silent: true,
						lineStyle: {
							normal: {
								type: 'dotted',
								width: 4,
								opacity: 0.3,

							}
						},
						data: [

						],

						itemStyle: {
							normal: {
								opacity: 1,
								lineStyle: {
                                    
                                },

							}
						},
						areaStyle: {
							normal: {
								color: '#a7c0dc',
								opacity: 0.2
							}
						}
					}

				]
			};
			v1.setOption(option);
			v1.on('click', function(params) {
				var arr = new Array();
				for(var i in indicatorData) {
					arr.push(indicatorData[i].name);
				}

				for(var m = 0; m < arr.length; m++) {
					if(params.name == arr[m]) {
						self.$router.push({
							path: '/ranklist/' + api.get_projectid(arr[m])
						});
					}
				}
			});
		}

	}
})()
export default mm