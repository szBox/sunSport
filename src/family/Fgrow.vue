<template>
  <transition name="slideIn">
    <div class="growUp">
      <div class="top">
        <div class="z" @click="goback">
          <img src="../assets/img/goback.png" height="100%">
        </div>
        <div class="c">我的成长</div>
      </div>
      <div class="select1">
        <div class="s1">

            <div class="d1" @click="ale">
              <!--<div class="ftime">{{starttime1}}</div>-->
              <input type="text" id='picker1' class="ftime"  v-bind:value="starttime1"/>
              <div class="im">
                <img src="../assets/img/sdate.png" width="100%">
              </div>
            </div>
          <div class="d2">
            <img src="../assets/img/striping.png" width="100%">
          </div>
          <div class="d1 ad" @click="ale1">
            <input type="text" id='picker2' class="ftime"  v-bind:value="endtime1"/>
            <div class="im">
              <img src="../assets/img/sdate.png" width="100%">
            </div>
          </div>
        </div>
        <!--<div class="ss">-->
          <!--<div class="s3" style=""></div>-->
          <!--<div class="s2" style="">-->
            <!--<div class="d3 act" v-for="i in starttime" @click="clo(i)">-->
              <!--<div class="ftime ">{{i}}</div>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="s5"></div>-->
          <!--<div class="s4">-->
            <!--<div class="d3 act" v-for="i in endtime" @click="clo(i)">-->
              <!--<div class="ftime ">{{i}}</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      </div>
      <div class="select">
        <div class="s">
          <li class="li-1" @click="alert">
            <input type="text" id='picker3' class="c1"  v-bind:value="nowproject"/>
            <div class="r">
              <img src="../assets/img/pull_pown.png" width="100%">
            </div>
          </li>
          <!--<div class="lr"></div>-->
          <!--<div class="ll" >-->
            <!--<li class="active" v-for="(i,index) in allproject" @click="close(i)">-->
              <!--<div class="c1">-->
                <!--{{i}}-->
              <!--</div>-->
            <!--</li>-->
          <!--</div>-->
        </div>
      </div>
      <div class="cont">
        <div class="con_t">
          <div class="con_t_l">
            <div class="con_t_l_t">平均分数</div>
            <div class="con_t_l_b">{{list.average}}</div>
          </div>
          <div class="con_t_c">
            <div class="con_t_l_t">最高分数</div>
            <div class="con_t_l_b">{{list.topscore}}</div>
          </div>
          <div class="con_t_r">
            <div class="con_t_l_t">综合评价</div>
            <div class="con_t_l_b">{{list.assessment}}</div>
          </div>
        </div>
        <div class="lun" style="margin-top: 2rem;border-top: 0">
          <div class="li">
            <ul class="u1">
              <!--<div class="l4">-->
                <!--<div class="val1">{{list.qualified}}</div>-->
                <!--<div class="n">及格率</div>-->
              <!--</div>-->
              <m_rotate v-bind:percent="list.passrate" tit="及格率"></m_rotate>


            </ul>
            <ul class="u2">
              <!--<div class="l4">-->
                <!--<div class="val1">{{list.good_rate}}</div>-->
                <!--<div class="n">良好</div>-->
              <!--</div>-->
              <m_rotate v-bind:percent="list.well" tit="良好率" ></m_rotate>
            </ul>
            <ul class="u3">
              <!--<div class="l4">-->
                <!--<div class="val1">{{list.excellent_rate}}</div>-->
                <!--<div class="n">优秀率</div>-->
              <!--</div>-->
              <m_rotate v-bind:percent="list.excellent" tit="优秀率" ></m_rotate>
            </ul>

          </div>
          <div class="ma">班级排名<span class="v1">{{list.classrank}}</span></div>
          <div class="npm">年级排名<span class="v1">{{list.graderank}}</span></div>
          <div class="xpm">全校排名<span class="v1">{{list.schoolrank}}</span></div>

        </div>
      </div>
      <div id="m"></div>
      <v_load v-if="show1"></v_load>
    </div>
  </transition>
</template>
<script>
  import load from '@/assets/commont/loading'
  import rotate from '@/assets/commont/rotate'
  import $ from 'jquery'
  import weui from '../assets/js/jquery-weui'
  import api from '../fetch/api'
  import echarts from '../assets/js/lineChart'
  import int from '../assets/js/interface'
//  import $ from 'jquery'
  export default{
    name:'growUp',
    data(){
      return{
        assessment:'A',
        starttime1: '选择起始时间',
        starttime: [],
        endtime1: '选择结束时间',
        endtime: ['第一周', '第二周', '第三周', '第四周', '第五周', '第六周', '第七周', '第八周', '第九周', '第十周', '第十一周', '第十二周', '第十三周', '第十四周', '第十五周', '第十六周', '第十七周', '第十八周', '第十九周', '第二十周','第二十一周','第二十二周','第二十三周','第二十四周'],
        nowproject: '全部项目',
        allproject:[],
        allprojectid:[],
        list:'',
        show:false,
        dataO:'',
        dataT:'',
        show1:false
      }
    },
    components:{
      m_rotate:rotate,
      v_load:load
    },
    computed:{
//      allproject(){
//        console.log()
//        var self=this;
//        var project=[];
//        var all=self.$store.state.a.data.base.each_average;
//        for(var i in all){
//          project.push(api.get_project(i));
//        }
//        return project;
//      }
    },
    mounted(){
      var self=this;
      var num=1;
      var zz=self.$store.state.a.weeks[self.$store.state.a.weeks.length-1];
      var p=0;
      var arr=['第一周', '第二周', '第三周', '第四周', '第五周', '第六周', '第七周', '第八周', '第九周', '第十周', '第十一周', '第十二周', '第十三周', '第十四周', '第十五周', '第十六周', '第十七周', '第十八周', '第十九周', '第二十周','第二十一周','第二十二周','第二十三周'];
//      var allproject=['仰卧起坐', '立定跳远', '引体向上', '肺活量', '跳绳', '1000米跑', '篮球运动'];
      self.starttime1='第一周';
      self.endtime1=arr[self.$store.state.a.weeks[self.$store.state.a.weeks.length-1]-1];
      self.getdata(num,zz,'');
      $("#picker1").picker({
        title: "请选择周期",
        cols: [
          {
            textAlign: 'center',
            values: arr
          }
        ],
//      rotateEffect:true,
        onClose:function () {
//        alert();
          self.starttime1='第一周';
          for(var i=0;i<arr.length;i++){
            if($('#picker1').val()==arr[i]){
              num=i+1;
              if(num>zz){
                alert('起始时间需小于结束时间');
              }else{
                self.getdata(num,zz,p);
                self.starttime1=$('#picker1').val();
                self.endtime1=$('#picker2').val();
              }
            }
          }
        }
      });

      $("#picker2").picker({
        title: "请选择周期",
        cols: [
          {
            textAlign: 'center',
            values: arr
          }
        ],
//      rotateEffect:true,
        onClose:function () {
//        alert();
          self.endtime1='第一周';
          for(var i=0;i<arr.length;i++){
            if($('#picker2').val()==arr[i]){
//              alert(num+'xxxxxx'+(i+1));
              if(num>i+1){
                alert('起始时间需小于结束时间')
              }else{
                zz=i+1;
                self.show1=true;
                self.getdata(num,zz,p);
                self.starttime1=$('#picker1').val();
                self.endtime1=$('#picker2').val();
              }
            }
          }
        }
      });

      $("#picker3").picker({
        title: "请选择项目",
        cols: [
          {
            textAlign: 'center',
            values: self.allproject
          }
        ],
//      rotateEffect:true,
        onClose:function () {
//        alert();
          for(var i=0;i<self.allproject.length;i++){
            if($('#picker3').val()==self.allproject[i]){
//              var all=self.$store.state.a.data.base.each_average;
//              for(var n in all){
//                projectid.push(n);
//              }
              self.show1=true;
              p=self.allprojectid[i];
              self.getdata(num,zz,p);
              self.nowproject=$('#picker3').val();
            }
          }
        }
      });





//      for(var i=0;i<36;i++){
//        $('.li .u1').append("<li class='l1' name="+i+" style='transform:rotate("+(i*10)+"deg)'></li>");
//        $('.li .u1').append("<li class='l2' name="+i+" style='transform:rotate("+(i*10)+"deg)'></li>");
//        $('.li .u2').append("<li class='l1' name="+i+" style='transform:rotate("+(i*10)+"deg)'></li>");
//        $('.li .u2').append("<li class='l2' name="+i+" style='transform:rotate("+(i*10)+"deg)'></li>");
//        $('.li .u3').append("<li class='l1' name="+i+" style='transform:rotate("+(i*10)+"deg)'></li>");
//        $('.li .u3').append("<li class='l2' name="+i+" style='transform:rotate("+(i*10)+"deg)'></li>");
//      }
//      var x=Math.floor(36/100*100);
////      alert(Math.floor(x));
//      for(var m=0;m<x;m++){
//        $('.u1 .l1[name='+m+']').css({zIndex:2});
//      }
//      this.rates(80);
//      this.average(12);

    },
    methods:{
      getdata(start,end,pro){
        var self=this;
//        self.allproject=[];
//        self.allprojectid=[];
        var mainUrl=int.getFgrowup;
        var params={
          school_opens_time:self.$store.state.a.startTime,
          uid:self.$store.state.a.data.base.user.uid,
          weekbegin:start,
          weekend:end,
          projectcode:pro,
          sex:self.$store.state.a.data.base.user.sex,
          class:self.$store.state.a.data.base.user.class,
          grade:self.$store.state.a.data.base.user.grade,
          sid:self.$store.state.a.data.base.user.sid
        };
//      this.$store.dispatch('storeMovieID',this.$route.params.ID);
        var obj = document.getElementById("m");
        var data1='';
        var data2='';
        api.get_api_data(mainUrl,params,function(d){
          self.show1=false;
          self.list=d.grow;

          for(var i=0;i<d.grow.project.length;i++){
            self.allproject[i]=d.grow.project[i].projectname;
            self.allprojectid[i]=d.grow.project[i].projectid;
          }
//          console.log(d.grow.project[0].projectname);
          var array=['第一周', '第二周', '第三周', '第四周', '第五周', '第六周', '第七周', '第八周', '第九周', '第十周', '第十一周', '第十二周', '第十三周', '第十四周', '第十五周', '第十六周', '第十七周', '第十八周', '第十九周', '第二十周','第二十一周','第二十二周','第二十三周','第二十四周'];
          var ar='';
          if(start==1 && end==1){
            ar=array;
          }else{
            ar=array.slice(start-1,end);
          }
          var a1='我的平均分';
          var a2='班级平均分';
          var a3=['我的平均分','班级平均分'];
          data1=d.grow.linechartdata.linedata1;
          data2=d.grow.linechartdata.linedata2;
          echarts.initDataZ(data1,data2,obj,ar,a1,a2,a3);
          self.$store.state.a.data.grows=d;
        });
      },
      goback(){
        this.$router.go(-1);
      },
      alert(){
        var self=this;
//      self.show==true;
        if(self.show==false){
          $('.lr').slideDown(500);
          $('.ll').slideDown(500);
          self.show=true;
        }else if(self.show==true){
          $('.lr').slideUp(500);
          $('.ll').slideUp(500);
          self.show=false;
        }
      },
      close(val){
//      alert(val);
        $('.li-1 .c1').html(val);
        $('.lr').slideUp(500);
        $('.ll').slideUp(500);
        if($('.li-1 .c1').html !='全部项目'){
          $('.con_t_l_t').html('我的分数')
        }else{
          $('.con_t_l_t').html('平均分数')
        }
        self.show=true;
      },
      ale(){
        var self=this;
//      self.show==true;
        if(self.show==false){
          $('.s2').slideDown(500);
          $('.s3').slideDown(500);
          self.show=true;
        }else if(self.show==true){
          $('.s2').slideUp(500);
          $('.s3').slideUp(500);
          self.show=false;
        }
      },
      clo(val){
//      alert(val);
        $('.d1 .ftime').html(val);
        $('.s2').slideUp(500);
        $('.s3').slideUp(500);

        self.show=true;
      },
      ale1(){
        var self=this;
//      self.show==true;
        if(self.show==false){
          $('.s4').slideDown(500);
          $('.s5').slideDown(500);
          self.show=true;
        }else if(self.show==true){
          $('.s4').slideUp(500);
          $('.s5').slideUp(500);
          self.show=false;
        }
      },
      clo1(val){
//      alert(val);
        $('.ad .ftime').html(val);
        $('.s4').slideUp(500);
        $('.s5').slideUp(500);

        self.show=true;
      }

    }
  }
</script>
<style scoped>
  .growUp{
    width: 100%;
    height: 100%;
    background: #2E2E31;
  }
  .top{
    color: #ffffff;
    height: 2.5rem;
    line-height: 2.5rem;
    margin-left: 5%;
    width: 90%;
  }
  .z{
    float: left;
    width: 1rem;
    height: 1.5rem;
    font-size: 1.5rem;
    margin-top: -0.1rem;
    color: #9C9C9E;
  }
  .c{
    position: absolute;
    left: 40%;
    text-align: center;
    /*width: 50%;*/
    font-weight: bold;
  }
  .select1{
    width: 100%;
    height: 3rem;
    background-color: #1F1F21;
  }
  .s1{
    width: 90%;
    margin-left: 5%;
    height: 2rem;
  }
  .act{
    clear: both;
    /*margin-top: 0;*/
    /*border-top: 0;*/
    position: relative;
    z-index:41;
    width: 100%;
    height: 2rem;
  }
  .s2{
    width: 38.1%;
    margin-left: 5%;
    height: 10rem;
    overflow: auto;
    display: none;
  }
  .s3{
    margin-top: 0.6rem;
    width: 38.5%;
    margin-left: 5%;
    height: 10rem;
    position: absolute;
    background-color:#2E2E31 ;
    opacity: 0.9;
    z-index:40;
    display: none;
  }
  .s4{
    width: 38.3%;
    margin-left: 56.2%;
    height: 10rem;
    overflow: auto;
    margin-top: -9.98rem;
    display: none;
  }
  .s5{
    margin-top: 0.6rem;
    width: 38.5%;
    margin-left: 56.1%;
    height: 10rem;
    position: absolute;
    background-color:#2E2E31 ;
    opacity: 0.9;
    z-index:40;
    /*margin-top: -9.9rem;*/
    display: none;
  }
  .s1 li{
    /*color: #939394;*/
    /*height: 3rem;*/
  }
  .d1{
    width: 42%;
    float: left;
    height: 2rem;
    margin-top: 0.5rem;
    border: 1px solid #5A5A5C;
  }
  .ftime{
    /*color: #777778;*/
    font-size: 0.8rem;
    line-height: 1.9rem;
    margin-left: 0.5rem;
    width: 70%;
    float: left;
    background-color: #1F1F21;
    outline: none;
    border: 0;
    color: #9B9B9B;
    font-weight: bold;
  }
  .im{
    width: 1rem;
    height: 1rem;
    margin-top:0.25rem;
    float:right;
    margin-right: 0.5rem;

  }
  .d2{
    width: 10%;
    margin-left: 2%;
    margin-right: 2.5%;
    float: left;
    margin-top: 0.75rem;
  }
  .d3{

    width: 99%;
    float: left;
    height: 2rem;
    /*margin-top: 0.5rem;*/
    border: 1px solid #5A5A5C;
    border-top: 0;
    position: relative;
    z-index:41;
  }
  .d3{

    width: 99%;
    float: left;
    height: 2rem;
    /*margin-top: 0.5rem;*/
    border: 1px solid #5A5A5C;
    border-top: 0;
    position: relative;
    z-index:41;
  }
  .select{
    width: 100%;
    height: 2rem;
    border-bottom: 0.1rem solid #262628;
  }
  .s{
    width: 90%;
    margin-left: 5%;
  }
  .s li{
    color: #939394;
    height: 2rem;
  }
  .c1{
    width: 90%;
    float: left;
    line-height: 1.9rem;
    /*color: #939394;*/
    font-size: 0.8rem;
    color: #9B9B9B;
    font-weight: bold;
    outline: none;
    border: 0;
    background-color: #2E2E31;
  }
  .r{
    width: 1.5rem;
    height: 1.5rem;
    float: right;
    /*margin-right: 0.8rem;*/
    margin-top: 0.25rem;
  }
  .cont{
    width: 100%;
    height:14rem;
    border-bottom: 1px solid #28282A;
  }
  .con_t{
    margin-top: 1rem;
    width: 90%;
    margin-left: 5%;
    height: 3rem;
  }
  .con_t_l{
    text-align: center;
    width: 33.3%;
    float: left;
  }
  .con_t_c{
    text-align: center;
    width: 33.3%;
    float: left;
  }
  .con_t_r{
    text-align: center;
    width: 33.3%;
    float: left;
  }
  .con_t_l_t{
    color: #A6A6A7;
    font-size: 0.8rem;
    height: 1rem;
  }
  .con_t_l_b{
    color: #FFCC00;
    font-size: 2rem;

  }
  .active{
    position:relative;
    /*z-index:1;*/
    width: 100%;
    z-index:11;
    /*display: none;*/
    border-bottom: 1px solid #979798;
  }
  .ll{
    display: none;
    height: 10rem;
    overflow: auto;
  }
  .lr{
    height: 10rem;
    display: none;
    background-color: #2E2E31;
    opacity: 0.9;
    position: absolute;
    width: 90%;
    z-index:10;
    /*border-bottom: 1px solid #979798;*/
  }
  #m{
    width: 90%;
    margin-left: 5%;
    height: 12rem;
    margin-bottom: 1rem;
  }
</style>
<style src="../assets/css/rotate.css">

</style>
