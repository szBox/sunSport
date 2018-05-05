<template>
  <div class="lun" style="padding-top: 1rem">
    <div class="li">
      <ul class="u1">
        <m_rotate percent="100%" tit="出勤率"></m_rotate>
      </ul>
      <ul class="u2">

        <m_rotate v-bind:percent="list.rate" tit="及格率" ></m_rotate>
      </ul>
      <ul class="u3">
        <m_rotate v-bind:percent="list.average" tit="平均分" ></m_rotate>
      </ul>

    </div>
    <div class="ma" style="margin-top: 1rem">最高分<span class="v1">{{list.topscore}}</span></div>
    <div class="npm" style="width: 65%;margin-top: 1rem">得分最高班级<span class="v1">{{list.topclass}}</span></div>
    <!--<div class="xpm">全校排名<span class="v1">12</span></div>-->

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
        return this.$store.state.d.single_grade_data
      }
    },
    mounted(){
    },
    components:{
      m_rotate:rotate
    },
    methods:{
    }
  }
</script>
<style src="../assets/css/rotate.css">

</style>
