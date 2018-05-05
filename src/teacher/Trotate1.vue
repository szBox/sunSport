<template>
  <div class="lun" style="padding-top: 1rem">
    <div class="li">
      <ul class="u1">
        <!--<div class="l4">-->
        <!--<div class="val1">{{list.qualified}}</div>-->
        <!--<div class="n">及格率</div>-->
        <!--</div>-->
        <m_rotate percent="100%" tit="出勤率"></m_rotate>


      </ul>
      <ul class="u2">
        <!--<div class="l4">-->
        <!--<div class="val1">{{list.good_rate}}</div>-->
        <!--<div class="n">良好</div>-->
        <!--</div>-->

        <m_rotate v-bind:percent="list.basic.rate" tit="及格率" ></m_rotate>
      </ul>
      <ul class="u3">
        <!--<div class="l4">-->
        <!--<div class="val1">{{list.excellent_rate}}</div>-->
        <!--<div class="n">优秀率</div>-->
        <!--</div>-->
        <m_rotate v-bind:percent="list.basic.average" tit="平均分" ></m_rotate>
      </ul>

    </div>
    <div class="ma">班级最高分<span class="v1">{{list.basic.topgrade}}</span></div>
    <div class="npm">年级排名<span class="v1">{{list.basic.graderank}}</span></div>
    <div class="xpm">全校排名<span class="v1">{{list.basic.schoolrank}}</span></div>

  </div>
</template>
<script>
  import rotate from '@/assets/commont/rotate'
  import $ from 'jquery'
  export default{
    name:'lun',
    data(){
      return{
      }
    },
    computed:{
      list(){
        return this.$store.state.b.basic
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
//
//      var x=Math.floor(36/100*65);
////      alert(Math.floor(x));
//      for(var m=0;m<x;m++){
//        $('.u1 .l1[name='+m+']').css({zIndex:2});
//      }
//      this.rates(100);
//      this.average(84.3);
    },
    methods:{
//      rates(val){
//        var x=Math.floor(36/100*val);
//        for(var m=0;m<x;m++){
//          $('.u2 .l1[name='+m+']').css({zIndex:2});
//        }
//      },
//      average(val){
//        var x=Math.floor(36/100*val);
//        for(var m=0;m<x;m++){
//          $('.u3 .l1[name='+m+']').css({zIndex:2});
//        }
//      }
    }
  }
</script>
<style src="../assets/css/rotate.css">

</style>
