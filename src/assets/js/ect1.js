/**
 * Created by Administrator on 2017/11/22.
 */
/**
 * Created by Administrator on 2017/8/17.
 */
/**
 * Created by Administrator on 2017/8/15.
 */
import $ from 'jquery'
import api from './api.js'
var echarts=require('echarts');
var zz=(function(){
  return{
    initDataH:function (x,y,ob,a1,a2,a3,self) {
      var data1=x;
      var data2=y;
      var v1 = echarts.init(ob);
      var option = {
        title:{

        },
        backgroundColor: '#2E2E31',
        tooltip: { //提示框组件
          trigger: 'axis',
// 		formatter: '{b}<br />{a0}: {c0}<br />{a1}: {c1}',
          axisPointer: {
            type: 'shadow',
// 			label: {
// 				backgroundColor: 'red'
// 			}
          },

        },
        grid: {

        },
        legend: {//图例组件，颜色和名字
          // right:10,
          // top:0,
          left:0,
          itemGap: 16,
          itemWidth: 18,
          itemHeight: 18,
          data:[{
            name:a1,
            //icon:'image://../wwwroot/js/url2.png', //路径
          },
            {
              name:a2,
            }
          ],
          textStyle: {
            color: '#a8aab0',
            fontStyle: 'normal',
            fontFamily: '微软雅黑',
            fontSize: 12,
          }
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: true,//坐标轴两边留白
            data: a3,
            axisLabel: { //坐标轴刻度标签的相关设置。
              interval: 0,//设置为 1，表示『隔一个标签显示一个标签』
              margin:15,
              textStyle: {
                // color: '#E8E8E8',
                color: '#000000',                
                fontStyle: 'normal',
                fontFamily: '微软雅黑',
                fontSize: 12,

              }
            },
            axisTick:{//坐标轴刻度相关设置。
              show: false,
            },
            axisLine:{//坐标轴轴线相关设置
              lineStyle:{
                // color:'#fff',
                color: '#000',
                
                opacity:0.2
              }
            },
            splitLine: { //坐标轴在 grid 区域中的分隔线。
              show: false,
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            splitNumber: 5,
            max: 120,
            min: 0,
            interval: 30,
            axisLabel: {
              textStyle: {
                color: '#585859',
                fontStyle: 'normal',
                fontFamily: '微软雅黑',
                fontSize: 12,
              }
            },
            axisLine:{
              show: true
            },
            axisTick:{
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: ['#000'],
                opacity: 0.25
              }
            }

          }
        ],
        dataZoom:[
        ],
        series : [
          {
            name:a1,
            type:'bar',
            data:data1,
            barWidth: 15,
            barGap:0.4,//柱间距离
            label: {//图形上的文本标签
              normal: {
                show: true,
                position: 'top',
                textStyle: {
                  color: '#a8aab0',
                  fontStyle: 'normal',
                  fontFamily: '微软雅黑',
                  fontSize: 12,
                },
              },
            },
            itemStyle: {//图形样式
              normal: {
                barBorderRadius: [5, 5, 0, 0],
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 1, color: '#FFCC00'
                },{
                  offset: 0.9, color: '#EDCB12'
                },{
                  offset: 0.31, color: '#14C1EB'
                },{
                  offset: 0.15, color: '#14C1EB'
                }, {
                  offset: 0, color: '#14C1EB'
                }], false),
              },
            },
          },
          {
            name:a2,
            type:'bar',
            data:data2,
            barWidth: -11,
            barGap:0.5,//柱间距离
            label: {//图形上的文本标签
              normal: {
                show: true,
                position: 'top',
                textStyle: {
                  color: '#a8aab0',
                  fontStyle: 'normal',
                  fontFamily: '微软雅黑',
                  fontSize: 12,
                },
              },
            },
            itemStyle: {//图形样式
              normal: {
                barBorderRadius: [5, 5, 0, 0],
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 1, color: '#BEBEBF'
                },{
                  offset: 0.9, color: '#BEBEBF'
                },{
                  offset: 0.25, color: '#BEBEBF'
                }, {
                  offset: 0, color: '#BEBEBF'
                }], false),
              },
            },
          }
        ]
      };
      v1.setOption(option);
      v1.on('click',function (params) {
        for(var i=0;i<a3.length;i++){
          if(params.name==a3[i]){
            self.$router.push({path:'/ranklist/'+api.get_projectid(a3[i])});
          }
        }

      })


    }
  }
})();
export default zz
