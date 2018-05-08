<template>
  <transition name="slideIn">
    <div class="growUp">
      <div class="top">
        <div class="z" @click="goback">
          <img src="../assets/img/goback.png" height="100%">
        </div>
        <div class="c">班级成长</div>
        <div class="y" @click="gohealth">体质信息</div>
      </div>
      <div class="select1">
        <div class="s">
          <div class="d1">
            <input type="text" id='picker1' class="ftime"  v-bind:value="starttime1"/>
            <div class="im">
              <img src="../assets/img/sdate.png" width="100%">
            </div>
          </div>
          <div class="d2">
              <img src="../assets/img/striping.png" width="100%">
          </div>
          <div class="d1">
            <input type="text" id='picker2' class="ftime"  v-bind:value="endtime1"/>
            <div class="im">
              <img src="../assets/img/sdate.png" width="100%">
            </div>
          </div>
        </div>
      </div>
      <div class="select">
        <div class="s">
          <input type="text" id='picker3' class="c1"  v-bind:value="nowproject"/>
          <!--<div class="r">-->
            <!--<img src="../assets/img/pull_pown.png" width="100%">-->
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
          <div class="npm" style="width: 50%;margin-top: 0.5rem">年级排名<span class="v1">{{list.graderank}}</span></div>
          <div class="xpm" style="width: 50%;margin-top: 0.5rem">全校排名<span class="v1">{{list.schoolrank}}</span></div>

        </div>
      </div>
      <div id="m"></div>
      <v_load v-if="show1"></v_load>
    </div>
  </transition>
</template>
<script>
  import load from '@/assets/commont/loading'
  import api from '../fetch/api'
  import rotate from '@/assets/commont/rotate'
  import echarts from '../assets/js/lineChart'
  import $ from 'jquery'
  import weui from '../assets/js/jquery-weui'
  import int from '../assets/js/interface'
  export default{
    name:'growUp',
    data(){
      return{
        assessment:'A',
        starttime1: '选择起始时间',
        starttime: [],
        endtime1: '选择结束时间',
        endtime: ['第一周', '第二周', '第三周', '第四周', '第五周', '第六周', '第七周', '第八周', '第九周', '第十周', '第十一周', '第十二周', '第十三周', '第十四周', '第十五周', '第十六周', '第十七周', '第十八周', '第十九周', '第二十周'],
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
//     allproject(){
//       var self=this;
//        var project=[];
//       var all=self.$store.state.b.basic.basic.each_average;
//
//        for(var i in all){
//         project.push(api.get_project(i));
//       }
//        return project;
//     }
    },
    mounted(){

      var self=this;
      var num=1;
      var zz='';
      var p=0;
      if(self.$store.state.d.week===0 || self.$store.state.d.week!=0){
        zz=self.$store.state.d.weeks[self.$store.state.d.weeks.length-1];
//        alert(1111);
      }else if(self.$store.state.c.week===0 || self.$store.state.c.week!=0){
        zz=self.$store.state.c.weeks[self.$store.state.c.weeks.length-1];
//        alert(2222);
      }else if(self.$store.state.b.week===0 || self.$store.state.b.week!=0){
        zz=self.$store.state.b.weeks[self.$store.state.b.weeks.length-1];
//        alert(3333);
      }
      var arr=['第一周', '第二周', '第三周', '第四周', '第五周', '第六周', '第七周', '第八周', '第九周', '第十周', '第十一周', '第十二周', '第十三周', '第十四周', '第十五周', '第十六周', '第十七周', '第十八周', '第十九周', '第二十周','第二十一周','第二十二周','第二十三周','第二十四周'];
//      if(self.$store.state.b.weeks){
//
//        alert(1111);
//      }else if(self.$store.state.c.weeks){
//
//        alert(2222);
//      }else if(self.$store.state.d.weeks){
//
//        alert(3333);
//      }
      self.starttime1='第一周';
      console.log(zz);
      self.endtime1=arr[zz-1];
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
                alert('起始时间不能大于结束时间');
              }else{
                zz=i+1;
                self.getdata(num,zz,p);
                self.starttime1=$('#picker1').val();
                self.endtime1=$('#picker2').val();
                self.show1=true;
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
//              var projectid=new Array();
//              var all=self.$store.state.b.basic.basic.each_average;
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

      self.getdata(num,zz,'');
//      var obj = document.getElementById("m");
//      var data1=[80, 92, 81, 74, 98, 80, 90,100];
//      var data2=[70, 80, 91, 74, 98, 70, 90,80];
//      echarts.initDataZ(data1,data2,obj);
//      alert(self.$store.state.b.basic.card);
    },
    methods:{
      getdata(start,end,pro){
        var self=this;
//        alert(self.$store.state.b.basic.card);
        var schooltime='';
        if(self.$store.state.c.week!=0 || self.$store.state.c.week===0){
//          weektime=self.$store.state.c.week+1;
          schooltime=self.$store.state.c.startTime;
//          alert(self.$store.state.c.startTime);
        }else if(self.$store.state.d.week!=0 || self.$store.state.d.week===0){
//          weektime=self.$store.state.d.week+1;
          schooltime=self.$store.state.d.startTime;
//          alert(2222);
        }else if(self.$store.state.b.week!=0 || self.$store.state.b.week===0){
//          weektime=self.$store.state.b.week;
          schooltime=self.$store.state.b.startTime;
//          alert(3333);
        }
        var mainUrl=int.getBgrowup;
        var params={
          school_opens_time:schooltime,
          uid:self.$store.state.b.basic.uid,
          weekbegin:start,
          weekend:end,
          projectcode:pro
        };
//      this.$store.dispatch('storeMovieID',this.$route.params.ID);
        var obj = document.getElementById("m");
        var data1='';
        var data2='';
        api.get_api_data(mainUrl,params,function(d){
          console.log(JSON.stringify(d));
          self.show1=false;
          self.list=d;
          for(var i=0;i<d.project.length;i++){
            self.allproject[i]=d.project[i].projectname;
            self.allprojectid[i]=d.project[i].projectid;
          }
          var array=['第一周', '第二周', '第三周', '第四周', '第五周', '第六周', '第七周', '第八周', '第九周', '第十周', '第十一周', '第十二周', '第十三周', '第十四周', '第十五周', '第十六周', '第十七周', '第十八周', '第十九周', '第二十周','第二十一周','第二十二周','第二十三周','第二十四周'];
          var ar='';
          if(start==1 && end==1){
            ar=array;
          }else{
            ar=array.slice(start-1,end);
          }
          var a1='班级平均分';
          var a2='年级平均分';
          var a3=['班级平均分','年级平均分'];
          data1=d.linechartdata.linedata1;
          data2=d.linechartdata.linedata2;
          echarts.initDataZ(data1,data2,obj,ar,a1,a2,a3);
          self.$store.state.b.grow=d;
        });
      },
      goback(){
        this.$router.go(-1);
      },
      gohealth(){
        this.$router.push({path:'/health'})
      }
    }
  }
</script>
<style scoped>
  .growUp{
    width: 100%;
    height: 100%;
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
  .y{
    width: 30%;
    float: right;
    text-align: right;
    font-size: 0.8rem;
    color: #FFCC00;
  }
  .select1{
    width: 100%;
    height: 3rem;
    background-color: #1F1F21;
  }
  .s{
    width: 90%;
    margin-left: 5%;
    height: 3rem;
  }
  .d1{
    width: 42%;
    float: left;
    height: 2rem;
    margin-top: 0.5rem;
    border: 1px solid #5A5A5C;
  }
  .ftime{
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
  .select{
    width: 100%;
    height: 2rem;
    border-bottom: 0.1rem solid #262628;
  }
  .s{
    width: 90%;
    margin-left: 5%;
  }
  .c1{
    width: 100%;
    float: left;
    background: url('../assets/img/pull_pown.png') no-repeat;
    background-position:100% 0.1rem;
    margin-top: 0.25rem;
    height: 1.5rem;
    /*color: #939394;*/
    font-size: 0.8rem;
    color: #9B9B9B;
    font-weight: bold;
    outline: none;
    border: 0;
    /*background-color: #2E2E31;*/
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
    height:13rem;
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
  #m{
    width: 90%;
    margin-left: 5%;
    height: 12rem;
    margin-bottom: 1rem;
  }
</style>
<style src="../assets/css/rotate.css">

</style>
