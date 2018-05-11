<template>
<div class="content">
  <div class="topbar">
    <img src="../../assets/img/Navigationbar_icon_fanhui.png" @click="goBack">
    <p>体质监测</p>
    <div class="menu" >
        
    </div>
  </div>
  <div class="area">
    <div class="areaL" @click="">
      <!--
        地区选择
      -->
      <p>
        <span>{{result.province}}</span>
        <span>{{result.city}}</span>
      </p>
      <p>
        <span class="city">{{result.district}}</span>
        
      </p>
      <p class="bfb">总体达标率</p>
    </div>
    <div class="areaR">
      {{ result.passrate_all }}%
    </div>
  </div>
  <div class="proData">
    <div id="ect" @click="open()">
				<span>{{trem_on}}</span>
				<img src="../../assets/img/archives_icon_Arrow.png" alt="" />
    </div>
    <div id="map1" style="width:100%;height:300px;">

		</div>
    <div class="eBtn" @click="toDate()">
      查看消息数据
    </div>
  </div>

  <div class="rank">
    <div class="rankTle">
      <i class="i-icon"></i>
      <span>达标率排行</span>
    </div>
    <ol class="rankWrap">
      <li class="rankTop">
        <p>名次</p>
        <p>学校</p>
        <p>测试人数</p>
        <p>达标率</p>
      </li>
      <li v-for="(list,index) in result.school" class="rankTop" @click="Lmain(list.uid)">
        <span>{{index+1}}</span>
        <span>{{list.school_name}}</span>
        <span>{{list.all_stu}}</span>
        <span>{{list.passrate}}</span>
      </li>
    </ol>
  </div>
  <vue-pickers :show="show1"
            :selectData="pickData1"
            v-on:cancel="close"
            v-on:confirm="confirmFn">
  </vue-pickers>
</div>
</template>

<script>
import $ from "jquery";
import echarts from 'echarts';
import int from "../../assets/js/interface";
import api from "../../fetch/api";

import VuePickers from "vue-pickers";
//import { provs_data, citys_data, dists_data } from "vue-pickers/lib/areaData";

export default {
  name: "name",
  data: function() {
    return {
      show1: false,
      result: [],
      trem_on:'',
			trem_time:'',
			district:'',
      pickData1: {
				columns: 1, // picker的列数
				// 第一列的数据结构
				pData1: [
					
				]
			},
//    province: "广东省",
//    city: "深圳市",
//    Area: "龙华新区",
//    local: '广东省-深圳市-龙华新区',
    };
  },
  components: {
    VuePickers
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    selectCt() {
      this.show1 = true;
    },
    toDate() {
    	var vm=this;
    	
      this.$router.push({path: "/ProDetails/" + vm.district})
    },
   
   
    Lmain(val) {
      var self = this;
      var time = this.$route.params.id;
      
      var mainUrl_l = int.getweek;
      var params_l = {
        uid: val,
        school_opens_time: time
      };
      //通过周期切换去清楚当前的周期;d
      self.$store.state.d.weeks = [];
      api.get_api_data(mainUrl_l, params_l, function(d) {
        //将当前接口返回的数据：（有数据的周期数组）进行缓存;
        for (var i = 0; i < d.length; i++) {
          self.$store.state.d.weeks[i] = d[i];
        }
        //缓存最新一次测试的周期数值
        self.$store.state.d.initweek = d[d.length - 1];
        //缓存界面跳转的周期
        self.$store.state.d.week = self.$store.state.d.initweek - 1;
        var mainUrl = int.goLeader;
        var params = {
          school_opens_time: time,
          uid: val,
          weektime: d[d.length - 1]
        };
        api.get_api_data(mainUrl, params, function(d) {
          self.$store.state.d.basic = d;
          self.$store.state.d.uid = val;
          self.$store.state.d.startTime = time;
          self.show = false;
          self.$router.push({ path: "/lmain/" + time });
        });
      });
    },
    open(){
				this.show1=true;
		},
		close() {
			this.show1 = false;
		},
		confirmFn(val) {
			let vm=this;
			vm.trem_on = val.select1.text;
			vm.trem_time = val.select1.val;
			console.log(vm.trem_on+'---'+vm.trem_time);
			var myChart1 = echarts.init(document.getElementById('map1'));
		var nums=[];
		var types=[];
    $.ajax({
      type: "GET",
      dataType: "jsonp",
      data:{
      	uid:vm.$store.state.e.uid,
      	school_opens_time:vm.trem_time
      },
      url: int.getalldatas,
      success: function(response) {
        vm.result = response;
        console.log(response);
        vm.district=response.district;
        for(var i=0; i<response.project.length; i++){
					types.push({   //图表的 运动项目
							text:response.project[i].projectname, // 不要数值的
//							text:response.project[i].passrate+'\n'+response.project[i].projectname,
							max:100
							});
					nums.push(response.project[i].passrate); //图表的 运动项目的分数
				}
   
        myChart1.setOption({ //加载数据图表
				
				tooltip: {
					trigger: 'item',
				},
				 grid:{
            left:'2%',
           
        },
				polar: [{
					nameGap: 25, // 图中工艺等字距离图的距离
					
					name: {
						formatter: function(text) {
                text = text.replace(/\S{5}/g, function(match) {
                    return match + '\n'
                })
                return text
            },
						show: true, // 是否显示工艺等文字
					},
					
					indicator:types,
					 radius : '60%',
					axisLine: { // 坐标轴线
						show: false // 默认显示，属性show控制显示与否
						,lineStyle: {
			                color: '#F4F4F5'
			            }
					},


					splitArea: {
						show: true,
						areaStyle: {
							color: ["#2E2E30"] // 图表背景网格的颜色
						}
					},
					splitLine: {
						show: true,
						lineStyle: {
							width: 1,
							color: '#444446' // 图表背景网格线的颜色
						}
					},

				}],

				series: [{
//						symbol:'none', // 去点
						type: 'radar',
						
						tooltip: {
							trigger: 'item'
						},
//						areaStyle:{color:'rgba(255, 204, 0, 1)'},
						lineStyle:{
							normal:{
                color:"#F7A305",
                width:2
           		}
						},
						
						data: [{
							value:nums,
							name: '分数',
							areaStyle:{
								normal: {
									opacity:1,
									color:'#FFCC00'
								}
								
							},
							
						}],
						borderColor:['#fff'],
						width :0,
						
					},

				]

			});
	
      },
      error: function(err) {
        console.log(err);
      }
    });
    this.close();
		}
  },
  mounted() {
    var vm = this;
    var myChart1 = echarts.init(document.getElementById('map1'));
		var nums=[];
		var types=[];

    $.ajax({
      type: "GET",
      dataType: "jsonp",
      data:{
      	uid:vm.$store.state.e.uid,
      	school_opens_time:vm.$route.params.id
      },
      url: int.getalldatas,
      success: function(response) {
        vm.result = response;
        vm.district=response.district;
        console.log(response);
        for(var i=0; i<response.project.length; i++){
					types.push({   //图表的 运动项目
							text:response.project[i].projectname, // 不要数值的
//							text:response.project[i].passrate+'\n'+response.project[i].projectname,
							max:100
							});
					nums.push(response.project[i].passrate); //图表的 运动项目的分数
				}
        for(var i=0; i<response.term.length; i++){
        	vm.pickData1.pData1.push({							//切换 运动 选择器
							text:response.term[i].name,
							val:response.term[i].starttime			
					})
        	if(vm.$route.params.id==response.term[i].starttime){
        		 vm.trem_on=vm.pickData1.pData1[i].text;  //选择器默认 选择
        		 vm.trem_time=vm.pickData1.pData1[i].val;  //选择器默认 选择
        	}
        }
       
//      vm.trem_on=vm.pickData1.pData1[0].text;  //选择器默认 选择
//				vm.trem_time=vm.pickData1.pData1[0].val;  //选择器默认 选择
        myChart1.setOption({ //加载数据图表
				
				tooltip: {
					trigger: 'item',
				},
				 grid:{
            left:'2%',
           
        },
				polar: [{
					nameGap: 25, // 图中工艺等字距离图的距离

					name: {
						show: true, // 是否显示工艺等文字
						formatter: function(text){
                text = text.replace(/\S{5}/g, function(match) {
                    return match + '\n'
                })
                return text
           	}
					},
					indicator:types,
					 radius : '60%',
					axisLine: { // 坐标轴线
						show: false // 默认显示，属性show控制显示与否
						,lineStyle: {
			                color: '#F4F4F5'
			            }
					},


					splitArea: {
						show: true,
						areaStyle: {
							color: ["#2E2E30"] // 图表背景网格的颜色
						}
					},
					splitLine: {
						show: true,
						lineStyle: {
							width: 1,
							color: '#444446' // 图表背景网格线的颜色
						}
					},

				}],

				series: [{
//						symbol:'none', // 去点
						type: 'radar',
						radius:'160%',
						tooltip: {
							trigger: 'item'
						},
//						areaStyle:{color:'rgba(255, 204, 0, 1)'},
						lineStyle:{
							normal:{
                color:"#F7A305",
                width:2
           		}
						},
						
						data: [{
							value:nums,
							name: '分数',
							areaStyle:{
								normal: {
									opacity:1,
									color:'#FFCC00'
								}
								
							},
							
						}],
						borderColor:['#fff'],
						width :0,
						
					},

				]

			});
			
      },
      error: function(err) {
        console.log(err);
      }
    });
  }
};
</script>

<style scoped>
	.content{
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
 padding: 0 3.7vw;
  height: 2.5rem;
	line-height: 2.5rem;
	border-bottom: 1px solid #222224;
}
.topbar > p {
	color: #fff;
  font-size: 18px;
  font-weight: bold;
   padding-left: 0.9rem;
}
.topbar>img {
		height: 1rem;
	
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
.area .areaL .bfb {
  color: #bebebf;
  font-size: 18px;
}
.area .areaL .city {
  color: #fff;
  font-size: 22px;
  padding: 3vw 0 2.4vw 0;
  display: inline-block;
}
.area .areaL p:first-child {
  color: #bebebf;
  font-size: 18px;
}
.area .areaL p:first-child span:last-child {
  margin-left: 3.1vw;
}
.proData {
  border-top: 1.8vw solid #202022;
  border-bottom: 1.8vw solid #202022;
}

.rank > .rankTle {
  display: flex;
  align-items: center;
  height: 12vw;
  border-bottom: 1px solid #000;
}
.rank > .rankTle > img {
  width: 23px;
  height: 24px;
}
.rank .i-icon {
  margin: 0 4.2vw 0 7.7vw;
  display: inline-block;
  width: 23px;
  height: 23px;
  background: url("../../assets/img/Projectdetails_icon_Standard.png") no-repeat;
  background-size: cover;
}
.rank > .rankTle > span {
  font-size: 0.8rem;
  display: inline-block;
  color: #ccc;
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
#ect {
  color: #fff;
  height: 2rem;
  line-height: 2rem;

  padding: 0 4.3vw 0 6.9vw;
  
  /*width: 600px;*/
  /*height: 400px;*/
}
#ect img{
	float: right;
	width: 1rem;
	margin-top:0.5rem ;
}
#ect span{
	color: #bebebf;
	font-size: 0.8rem;
}
.cIcon img {
  vertical-align: middle;
}
.eBtn {
  width: 90vw;
  text-align: center;
  color: #fff;
  margin: 0 auto;
  background: #00b77c;
  height: 11.7vw;
  line-height: 11.7vw;
  border-radius: 0.7vw;
}

</style>