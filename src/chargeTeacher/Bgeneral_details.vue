<template>
  <transition name="slideIn">
  <div class="detail">
    <div class="top">
      <div class="z" @click="goback">
        <img src="../assets/img/goback.png" height="100%">
      </div>
      <!--<div class="c">详细数据</div>-->
      <div class="c">菁菁达人</div>
    </div>
 
    <div class="cont_t" @click="godetails(get_projectid(i.project))" v-for="(i,index) in list">
      <div class="cont_t_f">
        <div class="f_l">{{i.project}}</div>
        <div class="f_r">及格率:<span>{{i.rate}}</span></div>
      </div>
      <div class="cont_t_s">
        <div class="con_t">
          <div class="con_t_l">
            <div class="con_t_l_t">平均成绩</div>
            <div class="con_t_l_b">{{i.average_scores}}</div>
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
        <div class="lun" style="margin-top:1rem;border-top: 0">
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
          <div class="ma">最高分<span class="v1">{{i.topscore}}</span></div>
          <div class="npm">年级排名<span class="v1">{{i.graderank}}</span></div>
          <div class="xpm">全校排名<span class="v1">{{i.schoolrank}}</span></div>
        </div>
        <!--<div class="npm">班级最高分<span class="v1">92</span></div>-->
        <!--<div class="xpm">年级排名<span class="v1">3</span></div>-->
      </div>
    </div>
    </div>
  </div>
  </transition>
</template>
<script>
  import api from '../fetch/api'
  import rotate from '@/assets/commont/rotate'
  import $ from 'jquery'
  import int from '../assets/js/interface'

  export default{
    name:'detail',
    data(){
      return{
        list:'',
      
      }
    },
    computed:{
//      list(){
//        return this.$store.state.b.details.detail
//      }
    },
    created(){
    	 console.log(this.$store.state.b.basic)
//      alert(this.$route.params.id);
    },
    components:{
      m_rotate:rotate,
   
    },
    mounted(){
      this.getdata();
      var h=$(window).height();
      $('.detail').css({backgroundColor:'#1F1F21'});

    },
    methods:{
      get_projectid(val){
        console.log(val);
        console.log(api.get_projectid(val));
        return api.get_projectid(val)
      },
      godetails(val){
      	var self=this;
         self.$root.eventHub.$emit('Vloading',true)
        this.$router.push({path:'/ranklist/'+val})
      },
      goback(){
        this.$router.go(-1);
      },
      getdata(){
      	
        var self=this;
       var proportion='';
        var week=self.$route.params.id;
        var schooltime='';
          if(self.$store.state.c.week){
//          weektime=self.$store.state.c.week+1;
          schooltime=self.$store.state.c.startTime;
          proportion=self.$store.state.c.proportion;
        }else if(self.$store.state.d.week){
//          weektime=self.$store.state.d.week+1;
          schooltime=self.$store.state.d.startTime;
          proportion=self.$store.state.d.proportion;
        }else if(self.$store.state.b.week){
//          weektime=self.$store.state.b.week;
          schooltime=self.$store.state.b.startTime;
          proportion=self.$store.state.b.proportion;
        }
//      console.log(self.$store.state.b.basic.card);
        var val=self.$store.state.b.basic.uid;
        var mainUrl=int.getBgeneral;
        var params={
          school_opens_time:schooltime,
          uid:self.$store.state.b.basic.uid,
          weektime:week,
          proportion:proportion
        };

        api.get_api_data(mainUrl,params,function(d){
        	self.$root.eventHub.$emit('Vloading',false)
          var arr=new Array();
          console.log('dddddd',d)
          for(var i=0;i<d.detail.length;i++){
            arr[i]=api.get_projectid(d.detail[i].project);
          }
          self.$store.state.b.projectnum=arr;
          self.list=d.detail;
          for(var i in d.detail){
            self.$store.state.b.details[i]=d.detail[i];
          }


        })
      }
    }
  }
</script>
<style scoped>
  .detail{
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
    width: 100%;
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
    height:16rem;
    /*border-bottom: 1px solid #ffffff;*/

    background-color: #2E2E31;
    width:100%;
    /*padding-left: 5%;*/
    /*padding-right: 5%;*/
  }
  .cont_t_f{
    padding-left: 5%;
    width: 100%;
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
    margin-top: 0.5rem;
    color: #FFCC00;
    font-size: 1rem;
  }
  /*.npm{*/
    /*margin-top: 2rem;*/
    /*width: 49.5%;*/
    /*float: left;*/
    /*font-size:0.8rem;*/
    /*color: #767677;*/
    /*text-align: center;*/
    /*border-right: 1px solid #636365;*/
  /*}*/
  /*.xpm{*/
    /*margin-top: 2rem;*/
    /*width: 50%;*/
    /*float: left;*/
    /*font-size: 0.8rem;*/
    /*color: #767677;*/
    /*text-align: center;*/
  /*}*/
  /*.v1{*/
    /*color: #F8C702;*/
    /*font-size: 1rem;*/
    /*margin-left: 0.5rem;*/
  /*}*/
</style>
<style src="../assets/css/rotate.css">
</style>
