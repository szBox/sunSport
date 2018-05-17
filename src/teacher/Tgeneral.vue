<template>
  <div class="general">

    <div class="top">
      <div class="z" @click="goback">
        <img src="../assets/img/goback.png" height="100%">
      </div>
      <!--<div class="c">详细数据</div>-->
      <div class="c">菁菁达人</div>
    </div>
    <li>
      <div class="cont_t">
        <div class="cont_t_f">
          <div class="f_l">四年级一班</div>
          <div class="f_r">达标率:<span>90%</span></div>
        </div>
        <div class="cont_t_s">
          <div class="con_t">
            <div class="con_t_l">
              <div class="con_t_l_t">平均分数</div>
              <div class="con_t_l_b">80</div>
            </div>
            <div class="con_t_c">
              <div class="con_t_l_t">最高分数</div>
              <div class="con_t_l_b">110</div>
            </div>
            <div class="con_t_r">
              <div class="con_t_l_t">综合评价</div>
              <div class="con_t_l_b">B</div>
            </div>
          </div>
        </div>
      </div>
      <div class="lun" style="margin-top:-1rem;border-top: 0;margin-left:0;height: 9rem;border-bottom: 1px solid #1F1F21;padding-left: 5%;padding-right: 5%">
        <div class="li">
          <ul class="u1">
            <!--<div class="l4">-->
            <!--<div class="val1">{{list.qualified}}</div>-->
            <!--<div class="n">及格率</div>-->
            <!--</div>-->
            <m_rotate percent="32%" tit="及格率"></m_rotate>


          </ul>
          <ul class="u2">
            <!--<div class="l4">-->
            <!--<div class="val1">{{list.good_rate}}</div>-->
            <!--<div class="n">良好</div>-->
            <!--</div>-->
            <m_rotate percent="97%" tit="良好率" ></m_rotate>
          </ul>
          <ul class="u3">
            <!--<div class="l4">-->
            <!--<div class="val1">{{list.excellent_rate}}</div>-->
            <!--<div class="n">优秀率</div>-->
            <!--</div>-->
            <m_rotate percent="11.5" tit="优秀率" ></m_rotate>
          </ul>

        </div>
        <div class="ma" style="margin-top: 1rem">最高分<span class="v1">92</span></div>
        <div class="npm" style="width: 65%;margin-top: 1rem">得分最高班级<span class="v1">四年级五班</span></div>
        <!--<div class="xpm">全校排名<span class="v1">12</span></div>-->

      </div>
      <div class="cont_b">
        <div id="hh"></div>
      </div>
    </li>
    <li>
      <div class="cont_t">
        <div class="cont_t_f">
          <div class="f_l">四年级二班</div>
          <div class="f_r">达标率:<span>90%</span></div>
        </div>
        <div class="cont_t_s">
          <div class="con_t">
            <div class="con_t_l">
              <div class="con_t_l_t">平均分数</div>
              <div class="con_t_l_b">80</div>
            </div>
            <div class="con_t_c">
              <div class="con_t_l_t">最高分数</div>
              <div class="con_t_l_b">110</div>
            </div>
            <div class="con_t_r">
              <div class="con_t_l_t">综合评价</div>
              <div class="con_t_l_b">B</div>
            </div>
          </div>
        </div>
      </div>
      <div class="lun" style="margin-top: 0;border-top: 0;margin-left:0;height: 12rem;border-bottom: 1px solid #1F1F21;padding-left: 5%;padding-right: 5%">
        <div class="li">
          <ul class="u1">
            <!--<div class="l4">-->
            <!--<div class="val1">{{list.qualified}}</div>-->
            <!--<div class="n">及格率</div>-->
            <!--</div>-->
            <m_rotate percent="32%" tit="及格率"></m_rotate>


          </ul>
          <ul class="u2">
            <!--<div class="l4">-->
            <!--<div class="val1">{{list.good_rate}}</div>-->
            <!--<div class="n">良好</div>-->
            <!--</div>-->
            <m_rotate percent="97%" tit="良好率" ></m_rotate>
          </ul>
          <ul class="u3">
            <!--<div class="l4">-->
            <!--<div class="val1">{{list.excellent_rate}}</div>-->
            <!--<div class="n">优秀率</div>-->
            <!--</div>-->
            <m_rotate percent="11.5" tit="优秀率" ></m_rotate>
          </ul>

        </div>
        <div class="ma" style="margin-top: 1rem">最高分<span class="v1">92</span></div>
        <div class="npm" style="width: 65%;margin-top: 1rem">得分最高班级<span class="v1">四年级六班</span></div>
        <!--<div class="xpm">全校排名<span class="v1">12</span></div>-->

      </div>
      <div class="cont_b">
        <div id="hh1"></div>
      </div>
    </li>

  </div>
</template>
<script>
  import api from '../fetch/api'
  import rotate from '@/assets/commont/rotate'
  import echarts from '../assets/js/histogram'
  import $ from 'jquery'
  export default{
    name:'general',
    data(){
      return{

      }
    },
    components:{
      m_rotate:rotate
    },
    mounted(){
//      for(var i=0;i<36;i++){
//        $('.li .u1').append("<li class='l1' name="+i+" style='transform:rotate("+(i*10)+"deg)'></li>");
//        $('.li .u1').append("<li class='l2' name="+i+" style='transform:rotate("+(i*10)+"deg)'></li>");
//        $('.li .u2').append("<li class='l1' name="+i+" style='transform:rotate("+(i*10)+"deg)'></li>");
//        $('.li .u2').append("<li class='l2' name="+i+" style='transform:rotate("+(i*10)+"deg)'></li>");
//        $('.li .u3').append("<li class='l1' name="+i+" style='transform:rotate("+(i*10)+"deg)'></li>");
//        $('.li .u3').append("<li class='l2' name="+i+" style='transform:rotate("+(i*10)+"deg)'></li>");
//      }
//
//      var x=Math.floor(36/100*100);
////      alert(Math.floor(x));
//      for(var m=0;m<x;m++){
//        $('.u1 .l1[name='+m+']').css({zIndex:2});
//      }
//      this.rates(80);
//      this.average(38);

      var data1=[80, 105, 98, 110,101,98];
      var data2=[75, 95, 80, 96,80,80];
      var obj = document.getElementById("hh");
      echarts.initDataH(data1,data2,obj);
      var data3=[80, 105, 98, 110,101,98];
      var data4=[75, 95, 80, 96,80,80];
      var obj1 = document.getElementById("hh1");
      echarts.initDataH(data3,data4,obj1);
    },
    methods:{
      rates(val){
        var x=Math.floor(36/100*val);
        for(var m=0;m<x;m++){
          $('.u2 .l1[name='+m+']').css({zIndex:2});
        }
      },
      average(val){
        var x=Math.floor(36/100*val);
        for(var m=0;m<x;m++){
          $('.u3 .l1[name='+m+']').css({zIndex:2});
        }
      },
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
    font-size: 2rem;
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
    font-size: 0.8rem;
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
  #hh,#hh1{
    width: 90%;
    margin-left: 5%;
    height: 15rem;
  }
</style>
<style src="../assets/css/rotate.css">

</style>
