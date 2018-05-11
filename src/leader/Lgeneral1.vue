<template>
  <div class="general">

    <div class="top">
      <div class="z" @click="goback">
        <img src="../assets/img/goback.png" height="100%">
      </div>
      <div class="c">详细数据</div>
    </div>
    <li v-for="(i,index) in list">
      <div class="cont_t">
        <div class="cont_t_f">
          <div class="f_l">{{i.project}}</div>
          <div class="f_r">达标率:<span>{{i.rate}}</span></div>
        </div>
        <div class="cont_t_s">
          <div class="con_t">
            <div class="con_t_l">
              <div class="con_t_l_t">平均分值</div>
              <div class="con_t_l_b">{{i.result}}</div>
            </div>
            <div class="con_t_c">
              <div class="con_t_l_t">平均分数</div>
              <div class="con_t_l_b">{{i.average}}</div>
            </div>
            <div class="con_t_r">
              <div class="con_t_l_t">综合评价</div>
              <div class="con_t_l_b">{{i.assessment}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="lun" style="margin-top: 0;border-top: 0;margin-left:0;height: 9rem;border-bottom: 1px solid #1F1F21;padding-left: 5%;padding-right: 5%">
        <div class="li">
          <ul class="u1">
            <!--<div class="l4">-->
            <!--<div class="val1">{{list.qualified}}</div>-->
            <!--<div class="n">及格率</div>-->
            <!--</div>-->
            <m_rotate v-bind:percent="i.passrate" tit="及格率"></m_rotate>


          </ul>
          <ul class="u2">
            <!--<div class="l4">-->
            <!--<div class="val1">{{list.good_rate}}</div>-->
            <!--<div class="n">良好</div>-->
            <!--</div>-->
            <m_rotate v-bind:percent="i.well" tit="良好率" ></m_rotate>
          </ul>
          <ul class="u3">
            <!--<div class="l4">-->
            <!--<div class="val1">{{list.excellent_rate}}</div>-->
            <!--<div class="n">优秀率</div>-->
            <!--</div>-->
            <m_rotate v-bind:percent="i.excellent" tit="优秀率" ></m_rotate>
          </ul>

        </div>
        <div class="ma" style="margin-top: 1rem;text-align: left">最高分<span class="v1">{{i.topscore}}</span></div>
        <div class="npm" style="width: 65%;margin-top: 1rem">得分最高班级<span class="v1">{{i.topclass}}</span></div>
        <!--<div class="xpm" style="margin-top: 1rem;text-align: left">得分最高年级<span class="v1">{{i.topgrade}}</span></div>-->
      </div>
      <div class="cont_b">
        <div v-bind:id="'h'+index"></div>
      </div>
    </li>


  </div>
</template>
<script>
  import api from '../fetch/api'
  import rotate from '@/assets/commont/rotate'
  import echarts from '../assets/js/histogram_2'
  import $ from 'jquery'
  import int from '../assets/js/interface'
  export default{
    name:'general',
    data(){
      return{

      }
    },
    computed:{
      list(){
        return this.$store.state.d.details
      }
    },
    mounted(){
      var self=this;
      var week=self.$route.params.id;
      var mainUrl=int.getgeneral1;
      var params={
        school_opens_time:self.$store.state.d.startTime,
        sid:self.$store.state.d.sid,
        gid:self.$store.state.d.gid,
        uid:self.$store.state.d.uid,
        weektime:week
      };
      var arr=new Array();
//      this.$store.dispatch('storeMovieID',this.$route.params.ID);
      api.get_api_data(mainUrl,params,function(d){
        console.log(JSON.stringify(d));
        self.$store.state.d.details=d.details;
        var len=d.details.length;
        var time=setInterval(function(){
          if($('.f_l').html()!=null){
            for(var i=0;i<len;i++){
              var obj=document.getElementById("h"+i);
              var name=new Array();
              var score=new Array();
              for(var j=0;j<d.details[i].class_avg.length;j++){
                name.push(d.details[i].class_avg[j].name);
                score.push(d.details[i].class_avg[j].score);
              }
              console.log(name);
              var x=score;
              var y=d.details[i].grade_avg;
              var a1='班级平均分';
              var a2='年级平均分';
              echarts.initDataH(x,y,obj,a1,a2,name)
            }
            clearInterval(time);
          }
        },100);

      });
    },
    components:{
      m_rotate:rotate
    },
    methods:{
      goback(){
        this.$router.go(-1);
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
    height: 8rem;
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
    border-top: 1px solid #1F1F21;
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
    font-size: 1rem;
    margin-top: 0.5rem;
  }
  .npm{
    margin-top: 2rem;
    width: 49.5%;
    float: left;
    font-size:0.8rem;
    color: #767677;
    text-align: center;
    /*border-right: 1px solid #636365;*/
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
  .cont_b{
    background-color: #2E2E31;
    margin-top: 0.5rem;
    width: 100%;
    height: 15rem;
    /*border-bottom: 1px solid #ffffff;*/
    /*margin-bottom: 0.5rem;*/
  }
  /*#hh,#hh1{*/
  /*width: 90%;*/
  /*margin-left: 5%;*/
  /*height: 15rem;*/
  /*}*/
  #h0{
    padding-left: 5%;
    padding-right: 5%;
    width: 90%;
    height: 15rem;
  }
  #h1{
    padding-left: 5%;
    padding-right: 5%;
    width: 90%;
    height: 15rem;
  }
  #h2{
    padding-left: 5%;
    padding-right: 5%;
    width: 90%;
    height: 15rem;
  }
  #h3{
    padding-left: 5%;
    padding-right: 5%;
    width: 90%;
    height: 15rem;
  }
  #h4{
    padding-left: 5%;
    padding-right: 5%;
    width: 90%;
    height: 15rem;
  }
  #h5{
    padding-left: 5%;
    padding-right: 5%;
    width: 90%;
    height: 15rem;
  }
  #h6{
    padding-left: 5%;
    padding-right: 5%;
    width: 90%;
    height: 15rem;
  }
  #h7{
    padding-left: 5%;
    padding-right: 5%;
    width: 90%;
    height: 15rem;
  }
  #h8{
    padding-left: 5%;
    padding-right: 5%;
    width: 90%;
    height: 15rem;
  }
  #h9{
    padding-left: 5%;
    padding-right: 5%;
    width: 90%;
    height: 15rem;
  }
</style>
<style src="../assets/css/rotate.css">

</style>
