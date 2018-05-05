<template>
  <div class="select">
    <div id="tz"></div>
    <div class="cont">
      <div class="con_t">
        <div class="con_t_l">
          <div class="con_t_l_t">平均分数</div>
          <div class="con_t_l_b">{{list.average}}</div>
        </div>
        <div class="con_t_c">
          <div class="con_t_l_t">最高分数</div>
          <div class="con_t_l_b">{{list.topscore1}}</div>
        </div>
        <div class="con_t_r">
          <div class="con_t_l_t">综合评价</div>
          <div class="con_t_l_b">{{list.assessment}}</div>
        </div>
      </div>
      <div class="lun" style="margin-top: 2rem;border-top: 0;">
        <div class="li">
          <ul class="u1">
            <!--<div class="l4">-->
            <!--<div class="val1">{{list.qualified}}</div>-->
            <!--<div class="n">及格率</div>-->
            <!--</div>-->
            <m_rotate v-if="sss" v-bind:percent="list.passrate" tit="及格率"></m_rotate>


          </ul>
          <ul class="u2">
            <!--<div class="l4">-->
            <!--<div class="val1">{{list.good_rate}}</div>-->
            <!--<div class="n">良好</div>-->
            <!--</div>-->
            <m_rotate v-if="sss" v-bind:percent="list.well" tit="良好率" ></m_rotate>
          </ul>
          <ul class="u3">
            <!--<div class="l4">-->
            <!--<div class="val1">{{list.excellent_rate}}</div>-->
            <!--<div class="n">优秀率</div>-->
            <!--</div>-->
            <m_rotate v-if="sss" v-bind:percent="list.excellent" tit="优秀率" ></m_rotate>
          </ul>

        </div>
        <div class="ma" style="text-align:left;margin-top: 1rem;margin-left: 1rem">最高分<span class="v1">{{list.topscore}}</span></div>
        <div class="npm" style="width: 55%;margin-top: 1rem">得分最高年级<span class="v1">{{list.topgrade}}</span></div>
        <div class="xpm" style="text-align:left;width: 100%;margin-left: 1rem">得分最高班级<span class="v1">{{list.topclass}}</span></div>
      </div>
    </div>
    <div id="tzz"></div>
  </div>
</template>
<script>
  import echarts from '../assets/js/echarts'
//  import echarts1 from '../assets/js/lineChart1'
  import rotate from '@/assets/commont/rotate'
  export default{
    name:'select',
    data(){
      return{
        sss:false
//        list:this.$store.state.d.statistics
      }
    },
    computed:{
      list(){
        return this.$store.state.d.statistics
      }
    },
    components:{
      m_rotate:rotate
    },
    mounted(){
      var self=this;
      setTimeout(function () {
        self.sss=true
      },500);
//          if(self.$store.state.d.statistics.score!=null || self.$store.state.d.statistics.score!=''){
//            var obj = document.getElementById("tz");
//            var dataBJ = [self.$store.state.d.statistics.score];
//            var indicatorData =self.$store.state.d.statistics.project;
//            echarts.initDataY(dataBJ,indicatorData,obj,'');
//            var obj1 = document.getElementById("tzz");
//            var data1=self.$store.state.d.statistics.linechartdata;
//            var data2=[];
//            echarts1.initDataZ(data1,data2,obj1);
//          }
    }
  }
</script>
<style scoped>
  #tz{
    /*width: 90%;*/
    /*padding-left: 5%;*/
    /*padding-right: 5%;*/
    height: 15rem;
    /*margin-top: 0.05rem;*/
    border-top: 0.05rem solid #1F1F21;
    border-bottom: 0.2rem solid #1F1F21;
  }
  .cont{
    width: 100%;
    height:17rem;
    border-bottom: 0.5rem solid #1F1F21;
    background-color: #2E2E31;
    /*padding-top: 1rem;*/
  }
  .con_t{
    padding-top: 1rem;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
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
  #tzz{
    margin-top: 0.5rem;
    width: 90%;
    margin-left: 5%;
    height: 12rem;
    margin-bottom: 1rem;
  }
</style>
<style src="../assets/css/rotate.css">
</style>
