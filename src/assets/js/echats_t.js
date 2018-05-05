/**
 * Created by Administrator on 2017/9/17.
 */
/**
 * Created by Administrator on 2017/8/11.
 */
import $ from 'jquery'
var echarts=require('echarts');
var mm=(function () {
  return {
    initDataY: function (x,y,ob,self,classid,arr) {
      // var v1dom = document.getElementById("main");
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
        trigger:'',
        color: [],
        backgroundColor: '#2E2E31',
        // legend: {
        //   bottom: 0,
        //   orient: 'horizontal',
        //   itemWidth: 30,
        //   itemHeight: 20,
        //
        //   data: [{
        //     name: '19-35岁',
        //     icon: 'circle',
        //     textStyle: {
        //       color: "#fc20ff"
        //     }
        //   }]
        // },
        tooltip: {
          trigger: 'item',
          textStyle:{
            color:'#ffffff',
            fontSize:10,
            width:50,
            textShadowOffsetX:10,
            textShadowOffsetY:10,
            lineHeight:10
          },
          formatter: function() {
            var res ='<br/>';
            for (var i = 0; i < indicatorData.length; i++) {
              res+= indicatorData[i].name;
              for(var j=0;j<arr.length;j++){
                if(i==j){
                  res+="："+arr[j]+"分"+"<br/>"
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
          triggerEvent:true,
          name: {
            textStyle: {
              color: 'silver',
              fontSize: 10
            },
            show:true
          },
          splitLine: {

            lineStyle: {
              color: '#4f8bbe',
              opacity: 0.5
            }
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: '#212121',
              opacity: 1
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#39393B',
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
              color: "#39393B",
              width: 1,
              opacity: 1,

            }
          },
          data: [
            [150,150,150, 150, 150,150, 150,150,150,150,150, 150,150,150,150]
          ],

          itemStyle: {
            normal: {
              opacity: 0

            }
          },
          areaStyle: {
            normal: {
              color: '#0d6dba',
              opacity: 0.1
            }
          }
        }, {
          name: '雷达线2',
          type: 'radar',
          silent: true,
          lineStyle: {
            normal: {
              type: 'solid',
              color: "#39393B",
              width: 1,
              opacity: 0.8,

            }
          },
          data: [
            [120, 120, 120, 120, 120, 120,120,120,120,120,120,120,120,120,120]
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
          name: '雷达线3',
          type: 'radar',
          silent: true,
          lineStyle: {
            normal: {
              type: 'solid',
              color: "#39393B",
              width: 1,
              opacity: 0.6,

            }
          },
          data: [
            [90, 90, 90, 90, 90,90,90,90,90,90,90,90,90,90,90]
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
          name: '雷达线4',
          type: 'radar',
          silent: true,
          lineStyle: {
            normal: {
              type: 'solid',
              color: "#39393B",
              width: 1,
              opacity: 0.4,

            }
          },
          data: [
            [60, 60, 60, 60, 60, 60, 60,60,60,60,60, 60,60,60,60]
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
          name: '雷达线5',
          type: 'radar',
          silent: true,
          lineStyle: {
            normal: {
              type: 'solid',
              color: "#39393B",
              width: 1,
              opacity: 0.2,

            }
          },
          data: [
            [30, 30, 30, 30, 30, 30, 30,30,30,30,30, 30,30,30,30]
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
              borderColor: '#FFCC00',
              borderWidth: 1,
              opacity:0

            }
          },
          areaStyle: {
            normal: {
              color: '#FFCC00',
              opacity: 1
            }
          }
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
            // [6, 5, 6, 4, 2]
          ],

          itemStyle: {
            normal: {
              opacity: 0

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
      v1.on('click', function (params) {
        var arr=new Array();
        for(var i in indicatorData){
          arr.push(indicatorData[i].name);
        }
        for(var m=0;m<arr.length;m++){
          if(params.name==arr[m]){
            // alert(params.name);
            self.$router.push({path:'/single/'+classid[m]});
            self.$store.state.c.count++;
            // alert(self.$store.state.c.count);
          }
        }
        //
        // if(params.name=='四年级一班'){
        //   self.$router.push({path:'/single/0'});
        // }
        // if(params.name=='四年级二班'){
        //   self.$router.push({path:'/single/1'});
        // }
        // if(params.name=='四年级三班'){
        //   self.$router.push({path:'/single/2'});
        // }
        // if(params.name=='四年级四班'){
        //   self.$router.push({path:'/single/3'});
        // }
        // if(params.name=='四年级五班'){
        //   self.$router.push({path:'/single/4'});
        // }
        // if(params.name=='四年级六班'){
        //   self.$router.push({path:'/single/5'});
        // }
        // if(params.name=='四年级七班'){
        //   self.$router.push({path:'/single/6'});
        // }
        // if(params.name=='四年级'){
        //   self.$router.push({path:'/lsingle'});
        // }
        // if(params.name=='一年级'){
        //   self.$router.push({path:'/main'});
        // }
        // if(params.name=='二年级'){
        //   self.$router.push({path:'/main'});
        // }
        // if(params.name=='三年级'){
        //   self.$router.push({path:'/main'});
        // }
        // if(params.name=='四年级'){
        //   self.$router.push({path:'/main'});
        // }
        // if(params.name=='五年级'){
        //   self.$router.push({path:'/main'});
        // }
        // if(params.name=='六年级'){
        //   self.$router.push({path:'/main'});
        // }
      });
    }

  }
})()
export default mm
