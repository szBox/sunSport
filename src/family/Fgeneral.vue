<template>
  <div class="general">
    <div class="top">
      <div class="z" @click="goback">
        <img src="../assets/img/goback.png" height="100%">
      </div>
      <!--<div class="c">详细数据</div>-->
      <div class="c">菁菁达人</div>
      <!--<div class="y" @click="goGrowUp">我的成长</div>-->
    </div>
    <div class="t_l" v-for="(i,index) in list" v-bind:class="index>=1? 'active0' :'active1'">
        <div class="l1">
          <li>
            <div class="pj" style="font-size: 0.8rem;width: 45%">{{i.project}}</div>
            <div class="sz" style="width: 15%">{{i.num}}</div>
            <div class="fs" style="width: 30%">
              <div class="val">{{i.score}}</div>
              <div class="im">
                <img  v-if="i.status==1" src="../assets/img/rise.png" width="100%">
                <img  v-if="i.status==0" src="../assets/img/decline.png" width="100%">
              </div>
            </div>
            <div class="lx" style="width: 10%">{{i.assessment}}</div>
          </li>
        </div>
      <div v-bind:id="'h'+index"></div>
    </div>
    <!--<div class="t_l" style="margin-top: 0.4rem">-->
      <!--<div class="l1">-->
        <!--<li>-->
          <!--<div class="pj">引体向上</div>-->
          <!--<div class="sz">45次</div>-->
          <!--<div class="fs">-->
            <!--<div class="val">90分</div>-->
            <!--<div class="im">-->
              <!--<img src="../assets/img/decline.png" width="100%">-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="lx">B</div>-->
        <!--</li>-->
      <!--</div>-->
      <!--<div id="h1"></div>-->
    <!--</div>-->

  </div>
</template>
<script>
  import api from '../fetch/api'
  import $ from 'jquery'
  import echarts from '../assets/js/histogram_famliy'
  import int from '../assets/js/interface'
  export default{
    name:'general',
    data(){
      return{
//        list:''
      }
    },
    computed:{
      list(){
        return this.$store.state.a.data.detail
      }
//      filter(val){
//          var zz='';
//          if(val.split(':')[0]!=null || val.split(':')[0]!=''){
//          var mm=val.split('（')[1].split('）')[0];
//          if(parseInt(val.split(':')[0])>0){
//            zz=parseInt(val.split(':')[0])*60+parseInt(val.split(':')[1].split('（')[0])+"("+mm+")";
//            alert(1);
//          }else{
//            zz=parseInt(val.split(':')[1].split('（')[0])+"("+mm+")";
//            alert(2);
//          }
//        }
//      return zz
//      }
    },
    mounted(){
			var mh = $(window).height();
			$('.general').css({'minHeight': mh+'px',backgroundColor:'#2E2E31'});
			$('body').css({backgroundColor:'#2E2E31'})
//			var maxH=$('.topbar').height()+$('.area').height()+$('.proData').height()+$('.rota').height();
//			alert(maxH)
//			if(maxH>mh){
//				$('.general').css('height', maxH)
//			}


      var self=this;
      var week=self.$route.params.id;
      var mainUrl=int.getFdetail;
      var params={
        school_opens_time:self.$store.state.a.startTime,
        uid:self.$store.state.a.data.base.user.uid,
        weektime:week,
        proportion:self.$store.state.a.proportion
      };
      var arr=new Array();
//      this.$store.dispatch('storeMovieID',this.$route.params.ID);
      api.get_api_data(mainUrl,params,function(d){
      	self.$root.eventHub.$emit('Vloading',false)
      	console.log(d)
        self.$store.state.a.data.detail=d.detail;


				var len=d.detail.length;
        var time=setInterval(function(){
            if($('.pj').html()!=null){
              for(var i=0;i<len;i++){
                var obj=document.getElementById("h"+i);
                var a1='我的分数';
                var a2='平均分';
                var a3=['班级', '年级', '学校'];
                var x=d.detail[i].fraction;
                var y=d.detail[i].average;
                echarts.initDataH(x,y,obj,a1,a2,a3);
              }
              clearInterval(time);
            }
        },100);

      });







//
//        var project=new Array();
//        var average=d.user.projectcode;
//        for(var i in average){
//          project.push(api.get_project(average[i]));
//        }
////        console.log("xxxx"+project[0]);
//        var maxproject=new Array();
//        var num=d.user.new_mark;
//        var nums=new Array();
//        var score=d.user.average;
//        var scores=new Array();
//        var statu=d.user.progress;
//        var status=new Array();
//        for(var i in num){
//          nums.push(num[i]);
//        }
//        console.log(nums);
//        for(var i in score){
//          scores.push(scores[i]);
//        }
//        for(var i in statu){
//          scores.push(status[i]);
//        }
//        for(var l=0;l<project.length;l++) {
//          var ob={
//            project:'',num:'',score:'',assessment:'A',status:'',average:[],fraction:[]
//          }
//          ob.project = project[l];
//          ob.num=nums[l];
//          ob.score=scores[l];
//          ob.status=status[l];
//          console.log('ob:'+ob)
//          maxproject.push(ob);
//
//        }
//
//        console.log(maxproject);








      var h=$(window).height();
      // alert(h);
      $('.general').css({backgroundColor:'#2E2E31'});
//      var data1=this.list[0].fraction;
//      alert(data1);
//      var data2=this.list.average;
//      var obj = document.getElementById("h0");
//      echarts.initDataH(data1,data2,obj);
//      var data3=[80, 105, 98];
//      var data4=[75, 95, 80];
//      var obj1 = document.getElementById("h1");
//      echarts.initDataH(data3,data4,obj1);

    },
    methods:{
      goback(){
        this.$router.go(-1);
      },
      filter(val){
        var zz='';
        console.log(val);
        if(val.indexOf(":")>-1){
          var mm=val.split('(')[1].split(')')[0];
          if(parseInt(val.split(':')[0])>0){
            zz=(parseInt(val.split(':')[0])*60+parseFloat(val.split(':')[1].split('(')[0])).toFixed(2) +"("+mm+")";
//            alert(parseInt(val.split(':')[0])*60+parseFloat(val.split(':')[1].split('(')[0]));
          }else{
            if(val.indexOf("(")>-1){
              zz=val.split(':')[1].split('(')[0]+"("+mm+")";
            }else{
              zz=val;
            }

          }
        }else{
          zz=val;
        }
        return zz
      }
    }
  }
</script>
<style scoped>
  .general{
    width: 100%;
    height: 100%;
  }
  .top{
    background-color: #2E2E31;
    color: #ffffff;
    height: 2.5rem;
    line-height: 2.5rem;
    padding-left: 5%;
    padding-right: 5%;
  }
  .z{
    float: left;
    width: 1rem;
    height: 1.5rem;
    font-size: 1.5rem;
    margin-top: -0.1rem;
    color: #9C9C9E;
  }
  .active0{
    margin-top: 0.5rem;
  }
  .active1{
    margin-top: 0.1rem;
  }
  .c{
    font-size: 18px;
   font-weight: bold;
    position: absolute;
    left: 50%;
    color: #fff;
    -webkit-transform: translateX(-50%);
    -moz-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    -o-transform: translateX(-50%);
    transform: translateX(-50%);
  }
  .y{
    width: 30%;
    float: right;
    text-align: right;
    font-size: 0.8rem;
    color: #FFCC00;
  }
  .t_l{
    /*padding-left: 5%;*/
    /*width: 90%;*/
    /*padding-right: 5%;*/
    height: 15rem;
    /*margin-top: 0.1rem;*/
    background-color:  #2E2E31;
  }
  .t_l .l1 li{
    padding-left: 5%;
    width: 100%;
    padding-right: 5%;
    height: 3rem;
    color: #B2B2B3;
    line-height: 3rem;
    font-size: 0.8rem;
    /*border-top: 1px solid #1F1F21;*/
  }
  .t_l .l1 li .pj,.sz,.fs,.lx{
    width: 25%;
    float: left;
  }
  .t_l .l1 li .sz,.fs{
    text-align: center;
    box-sizing: border-box;
  }
  .t_l .l1 li .fs{
    width: 30%;
  }
  .t_l .l1 li .fs .val{
  
    float: left;
    padding-left: 1.5rem;
  }
  .t_l .l1 li .fs .im{
    width: 1rem;
    height: 2rem;
    float: left;
    margin-top: -0.1rem;
  }
  .t_l .l1 li .lx{
    width: 20%;
    text-align: right;
    color: #FAC802;
    font-size: 1rem;
  }
  #h0{
    margin: 0 4% 0 6%;
    width: 90%;
    height: 12rem;
  }
  #h1{
    margin: 0 4% 0 6%;
    width: 90%;
    height: 12rem;
  }
  #h2{
     margin: 0 4% 0 6%;
    width: 90%;
    height: 12rem;
  }
  #h3{
   margin: 0 4% 0 6%;
    width: 90%;
    height: 12rem;
  }
  #h4{
   margin: 0 4% 0 6%;
    width: 90%;
    height: 12rem;
  }
  #h5{
   margin: 0 4% 0 6%;
    width: 90%;
    height: 12rem;
  }
  #h6{
    margin: 0 4% 0 6%;
    width: 90%;
    height: 12rem;
  }
  #h7{
    margin: 0 4% 0 6%;
    width: 90%;
    height: 12rem;
  }
  #h8{
    margin: 0 4% 0 6%;
    width: 90%;
    height: 12rem;
  }
  #h9{
  margin: 0 4% 0 6%;
    width: 90%;
    height: 12rem;
  }
</style>
