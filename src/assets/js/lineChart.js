/**
 * Created by Administrator on 2017/8/15.
 */
var echarts=require('echarts');
var xx=(function () {
      return{
        initDataZ:function(x,y,obj,ar,a1,a2,a3){

          var v1 = echarts.init(obj);
          var data1=x;
          var data2=y;
          var markLineData = [];
          var markLineData1 = [];
          for (var i = 1; i < data1.length; i++) {
            markLineData.push([{
              xAxis: i - 1,
              yAxis: data1[i - 1],
              // value: (data1[i] + data1[i-1]).toFixed(2)
            }, {
              xAxis: i,
              yAxis: data1[i]
            }]);
          }
          for (var m = 1; m < data2.length; m++) {
            markLineData1.push([{
              xAxis: m - 1,
              yAxis: data2[m - 1],
              // value: (data2[m] + data2[m-1]).toFixed(2)
            }, {
              xAxis: m,
              yAxis: data2[m]
            }]);
          }
          var option = {
            title: {
              text: ''
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              itemGap: 16,
              // itemWidth: 18,
              // itemHeight: 18,
              left:'0%',
              top:'5%',
              textStyle:{
                color:"#ffffff",
                fontSize:14,
                fontStyle: 'normal',
                fontFamily: '微软雅黑'
              },
              data:a3
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            toolbox: {
              // feature: {
              //   saveAsImage: {
              //     // color:'red'
              //   }
              // }
            },
            xAxis: {
              type: 'category',
              "axisLine": {
                lineStyle: {
                  color: '#3D3D40'
                }
              },
              "axisTick": {
                // "show": false
              },
              axisLabel: {
                textStyle: {
                  color: '#585859',
                  fontStyle: 'normal',
                  fontFamily: '微软雅黑',
                  fontSize:12,
                }
              },
              // boundaryGap: false,
              data:ar
            },
            yAxis: {
              max: 120,
              min: 0,
              interval: 30,
              "axisLine": {
                lineStyle: {
                  color: '#2E2E31'
                }
              },
              splitLine: {
                lineStyle: {
                  // 使用深浅的间隔色
                  color: "#3B3B3E"
                  // type :'dashed'
                }
              },
              "axisTick": {
                "show": false
              },
              axisLabel: {
                textStyle: {
                  color: '#585859'
                }
              },
              type: 'value'
              // type: 'value'
            },
            series: [
              {
                name:a1,
                type:'line',
                stack: '',
                lineStyle: {
                  normal: {
                    type: 'solid',
                    color: '#FFCC00',
                    width: 1,
                    opacity: 1,
                  },
                },
                symbolSize:10,
                symbol: 'circle',
                'itemStyle':{
                  "normal":{
                    color:'#FFCC00'
                  }
                },
                markLine: {
                  smooth: true,
                  effect: {
                    show: true
                  },
                  distance: 10,
                  label: {
                    normal: {
                      position: 'middle'
                    }
                  },
                  symbol: ['none', 'none'],
                  data: markLineData
                },
                data:data1
              },
              {
                name:a2,
                type:'line',
                stack: '',
                symbolSize:10,
                symbol: 'circle',
                lineStyle: {
                  normal: {
                    type: 'solid',
                    color: '#00B77C',
                    width: 1,
                    opacity: 1,

                  },
                },
                'itemStyle': {
                  "normal": {
                    color: '#00B77C',
                  }
                },
                markLine: {
                  smooth: true,
                  effect: {
                    show: true
                  },
                  distance: 10,
                  label: {
                    normal: {
                      position: 'middle'
                    }
                  },
                  symbol: ['none', 'none'],
                  data: markLineData1
                },
                data:data2
              }
            ]
          };
          v1.setOption(option);
        }
      }
})()
export default xx
