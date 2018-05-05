<template>
  <transition name="slideIn">
  <div class="details">
    <div class="top">
      <div class="z" @click="goback">
        <img src="../assets/img/goback.png" height="100%">
      </div>
      <div class="c">统计详情</div>
      <!--<div class="y" @click="goRanking">成绩导入导出</div>-->
    </div>
    <div class="cont_t">
      <div class="cont_t_f">
          <div class="f_l">{{da.projectname}}</div>
          <div class="f_r">及格率:<span>{{da.standard}}</span></div>
      </div>
      <div class="cont_t_s">
        <div class="con_t">
          <div class="con_t_l">
            <div class="con_t_l_t">平均分数</div>
            <div class="con_t_l_b">{{da.avg}}</div>
          </div>
          <div class="con_t_c">
            <div class="con_t_l_t">最高分数</div>
            <div class="con_t_l_b">{{da.topscore}}</div>
          </div>
          <div class="con_t_r">
            <div class="con_t_l_t">综合评价</div>
            <div class="con_t_l_b">{{da.assessment}}</div>
          </div>
        </div>
        <div class="npm">年级排名<span class="v1">{{da.grade_ranking}}</span></div>
        <div class="xpm">全校排名<span class="v1">{{da.school_ranking}}</span></div>
      </div>
    </div>
    <div class="cont_c">
      <div class="cont_c_t">
        <div class="t_b">{{da.classname}}</div>
        <div class="t_r">(应测<span>{{da.classnum}}</span>人 实测<span>{{da.absence_stu}}</span>人)</div>
      </div>
      <div class="cont_c_c">
          <li @click="gofail(0)">
            <div class="c_img">
              <img src="../assets/img/fail.png" width="100%">
            </div>
            <div class="c_cont">
              不及格(<span>{{da.no_passrate}}</span>)
            </div>
            <div class="c_right">
              <div class="c_num">{{da.no_passrate_num}}人</div>
              <div class="c_img2">
                <img src="../assets/img/advance.png" width="100%">
              </div>
            </div>
          </li>
        <li @click="gofail(1)">
          <div class="c_img">
            <img src="../assets/img/pass.png" width="100%">
          </div>
          <div class="c_cont">
            及格(<span>{{da.passrate}}</span>)
          </div>
          <div class="c_right">
            <div class="c_num">{{da.passrate_num}}人</div>
            <div class="c_img2">
              <img src="../assets/img/advance.png" width="100%">
            </div>
          </div>
        </li>
        <li @click="gofail(2)">
          <div class="c_img">
            <img src="../assets/img/well.png" width="100%">
          </div>
          <div class="c_cont">
            良好(<span>{{da.well}}</span>)
          </div>
          <div class="c_right">
            <div class="c_num">{{da.well_num}}人</div>
            <div class="c_img2">
              <img src="../assets/img/advance.png" width="100%">
            </div>
          </div>
        </li>
        <li @click="gofail(3)">
          <div class="c_img">
            <img src="../assets/img/excellent.png" width="100%">
          </div>
          <div class="c_cont">
            优秀(<span>{{da.excellent}}</span>)
          </div>
          <div class="c_right">
            <div class="c_num">{{da.excellent_num}}人</div>
            <div class="c_img2">
              <img src="../assets/img/advance.png" width="100%">
            </div>
          </div>
        </li>
      </div>
    </div>
    <div class="cont_b">
      <div id="h"></div>
    </div>
  </div>
  </transition>
</template>
<script>
  import api from '../fetch/api'
  import echarts from '../assets/js/histogram'
  import $ from 'jquery'
  import int from '../assets/js/interface'
  export default{
    name:'details',
    data(){
      return{
        da:''
      }
    },
    computed:{
//      list(){
//        var x=this.$route.params.id;
//        var len=this.$store.state.b.projectnum.length;
//        for(var i=0;i<len;i++){
//          if(x==this.$store.state.b.projectnum[i]){
//            x=i;
//          }
//        }
//        return this.$store.state.b.details[x];
//      }
    },
    mounted(){
      var self=this;
      var h=$(window).height();
      $('.details').css({height:h+'px',backgroundColor:'#1F1F21'});
//      if(self.$route.params.id==9 || self.$route.params.id==10){
//        $('.y').css({display:'block'});
//      }else{
//        $('.y').css({display:'none'});
//      }



      var all=self.$store.state.b.basic.basic.each_average;
      var allproject=new Array();
      var projectid=new Array();
      for(var i in all){
        allproject.push(api.get_project(i));
        projectid.push(i);
      }
      var num=0;
      for(var i=0;i<allproject.length;i++){
        if($('.f_l').html().split('(')[1]!=null || $('.f_l').html().split('(')[1] !=''){
          if($('.f_l').html().split('(')[0]==allproject[i]){
              num=projectid[i];
          }
        }else{
            if($('.f_l').html()==allproject[i]){
                num=projectid[i];
              }
            }
        }
      self.$store.state.b.projectid=self.$route.params.id;
//      console.log(num);
//      var x=self.$route.params.id;
      var schooltime='';
      if(self.$store.state.c.week){
        self.$store.state.b.week=self.$store.state.c.week+1;
        schooltime=self.$store.state.c.startTime;
      }else if(self.$store.state.d.week){
        self.$store.state.b.week=self.$store.state.d.week+1;
        schooltime=self.$store.state.d.startTime;
      }else if(self.$store.state.b.week){
        self.$store.state.b.week=self.$store.state.b.week;
        schooltime=self.$store.state.b.startTime;
      }
//      alert(self.$store.state.b.week);
//      alert(self.$store.state.b.basic.card);
      var mainUrl=int.getBdetails;
      var params={
//        card:'000001791887178',
        school_opens_time:schooltime,
        uid:self.$store.state.b.basic.uid,
        weektime:self.$store.state.b.week,
        projectid:self.$route.params.id
      };
//      this.$store.dispatch('storeMovieID',this.$route.params.ID);
      api.get_api_data(mainUrl,params,function(d){
          self.da=d.single_project_data;
          var rate=d.single_project_data.standard;
          self.$store.state.b.rate=rate;
          var data1=d.single_project_data.class_score;
          var data2=d.single_project_data.grade_score;
          var obj = document.getElementById("h");
          var a1='本班数值';
          var a2='年级数值';
          var a3=['不及格率', '及格率', '良好率', '优秀率'];
          echarts.initDataH(data1,data2,obj,a1,a2,a3);

      })


//      var data1=[80, 105, 98, 110];

//      var data2=[75, 95, 80, 96];

    },
    methods:{
      goRanking(){
        var self=this;
        this.$router.push({path:'/ranking/'+self.$route.params.id});
        var name=$('.f_l').text();
        self.$store.state.b.projectname=name;
//        alert(self.$route.params.id)
      },
      gofail(val){
        this.$router.push({path:'/fail/'+val})
      },
      goback(){
        this.$router.go(-1);
      }
    }
  }
</script>
<style scoped>
  .details{
    width: 100%;
    height:100%;
  }
  .top{
    background-color: #2E2E31;
    color: #ffffff;
    height: 2.5rem;
    line-height: 2.5rem;
    /*margin-left: 5%;*/
    padding-left: 5%;
    padding-right: 5%;
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
  .cont_t{
    margin-top: 0.1rem;
    height: 11rem;
    /*border-bottom: 1px solid #ffffff;*/
    background-color: #2E2E31;
    width:100%;
    /*padding-left: 5%;*/
    /*padding-right: 5%;*/
  }
  .cont_t_f{
    padding-left: 5%;
    width: 90%;
    padding-right: 5%;
    height: 2rem;
    color: #ffffff;
    font-size: 0.8rem;
    line-height: 2rem;
    /*border-top: 1px solid #1F1F21;*/
    border-bottom: 1px solid #1F1F21;
  }
  .f_l{
    width: 60%;
    float: left;
  }
  .f_r{
    float: right;
  }
  .f_r span{
    color: #FFCC00;
    margin-left: 0.8rem;
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
    font-size: 1.5rem;
  }
  .npm{
    margin-top: 2rem;
    width: 49.5%;
    float: left;
    font-size:0.8rem;
    color: #767677;
    text-align: center;
    border-right: 1px solid #636365;
  }
  .xpm{
    margin-top: 2rem;
    width: 50%;
    float: left;
    font-size: 0.8rem;
    color: #767677;
    text-align: center;
  }
  .v1{
    color: #F8C702;
    font-size: 1rem;
    margin-left: 0.5rem;
  }
  .cont_c{
    background-color: #2E2E31;
    margin-top: 0.5rem;
    height: 12.6rem;
    /*border-bottom: 1px solid #ffffff;*/
  }
  .cont_c_t{
    padding-left: 5%;
    width: 90%;
    padding-right: 5%;
    height: 2.5rem;
    color: #A0A0A2;
    font-size: 0.8rem;
    line-height: 2.5rem;
    border-bottom: 1px solid #1F1F21;
  }
  .cont_c_c{
    width: 90%;
    padding-left: 5%;
    padding-right: 5%;
  }
  .t_b{
    float: left;
    width: 4.5rem;
  }
  .t_r{
    float: left;
    color: #707072;
  }
  .cont_c_c li{
    border-bottom: 1px solid #1F1F21;
    height: 2.5rem;
    line-height: 2.5rem;
  }
  .cont_c_c li .c_img{
    width: 1.5rem;
    height: 1.5rem;
    margin-top: -0.1rem;
    float: left;
  }
  .cont_c_c li .c_cont{
    float: left;
    color: #A0A0A2;
    font-size: 0.8rem;
    margin-left: 0.5rem;
    width: 40%;
  }
  .cont_c_c li .c_right{
    float: right;
    width: 30%;
  }
  .cont_c_c li .c_right .c_num{
    float: left;
    width:3rem;
    color: #69696B;
    font-size: 0.9rem;
    text-align: right;
    margin-left: 1rem;
  }
  .cont_c_c li .c_right .c_img2{
    margin-top: -0.1rem;
    float: right;
    width: 1rem;
    height: 1.5rem;
  }
  .cont_b{
    background-color: #2E2E31;
    margin-top: 0.5rem;
    width: 100%;
    height: 15rem;
    /*border-bottom: 1px solid #ffffff;*/
  }
  #h{
    width: 90%;
    margin-left: 5%;
    height: 15rem;
  }
  .y{
    width: 30%;
    float: right;
    text-align: right;
    font-size: 0.6rem;
    color: #FFCC00;
    cursor: pointer;
  }
</style>
