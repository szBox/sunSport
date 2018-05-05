<template>
  <div class="lun" style="padding-top: 1rem;height: 10rem">
    <div class="li">
        <ul class="u1">
          <m_rotate percent="100%" tit="出勤率"></m_rotate>
        </ul>
        <!--<ul class="u2">-->
          <!--<m_rotate v-bind:percent="list.qualified" tit="达标率" ></m_rotate>-->
        <!--</ul>-->
      <ul class="u2">
      <m_rotate v-bind:percent="list.qualified" tit="及格率" ></m_rotate>
      </ul>
        <ul class="u3">
          <m_rotate v-bind:percent="list.all_average" tit="平均分" ></m_rotate>
        </ul>

    </div>
    <div class="ma" style="width: 50%">班级最高分<span class="v1">{{list.user.highest}}</span></div>
    <div class="npm" style="width: 50%">班级排名<span class="v1">{{list.user.class_ranking}}</span></div>
    <div class="xpm" style="width: 50%;margin-bottom: 1rem">年级排名<span class="v1">{{list.user.grade_ranking}}</span></div>
    <div class="xpm" style="width: 50%;margin-bottom: 1rem">全校排名<span class="v1">{{list.user.school_ranking}}</span></div>
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
        return this.$store.state.a.data.base
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
//      var db=$('.val1').html().split('%')[0];
//      var pj=$('.val2').html();
//      this.rates(db);
//      this.average(pj);
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
