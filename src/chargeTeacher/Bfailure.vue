<template>
  <transition name="slideIn">
  <div class="fail">
    <div class="top">
      <div class="z" @click="goback">
        <img src="../assets/img/goback.png" height="100%">
      </div>
      <div class="c">{{title}}统计</div>
    </div>
    <div class="cont_t" >
      <div class="cont_t_f">
        <div class="f_l">{{nowdate}}</div>
        <div class="f_r">及格率:<span>{{nowrate}}</span></div>
      </div>
    </div>
    <div class="t_l">
      <div class="l1">
        <li >
          <div class="pj">平均分</div>
          <div class="sz">{{list.average_score}}</div>
          <div class="fs">
            <div class="val">{{list.average}}分</div>
            <div class="im">
              <img  v-if="list.status==1" src="../assets/img/rise.png" width="100%">
              <img  v-if="list.status==0" src="../assets/img/decline.png" width="100%">
            </div>
          </div>
          <div class="lx">{{list.assessment}}</div>
        </li>
      </div>
      <div class="l1">
        <li v-for="i in list.all_failure">
          <div class="pj">{{i.name}}</div>
          <div class="sz">{{i.average_score}}</div>
          <div class="fs">
            <div class="val">{{i.average}}分</div>
            <div class="im">
              <img  v-if="i.status==1" src="../assets/img/rise.png" width="100%">
              <img  v-if="i.status==0" src="../assets/img/decline.png" width="100%">
            </div>
          </div>
          <div class="lx">{{i.assessment}}</div>
        </li>
        <!--<li>-->
          <!--<div class="pj">关飞白</div>-->
          <!--<div class="sz">1.7米</div>-->
          <!--<div class="fs">-->
            <!--<div class="val">48分</div>-->
            <!--<div class="im">-->
              <!--<img src="../assets/img/rise.png" width="100%">-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="lx">E</div>-->
        <!--</li>-->
      </div>
    </div>
  </div>
  </transition>
</template>
<script>
  import api from '../fetch/api'
  import $ from 'jquery'
  import int from '../assets/js/interface'
  export default{
    name:'fail',
    data(){
      return{
        title:'',
        list:'',
        alldate:['2017~2018学年 第一周','2017~2018学年 第二周','2017~2018学年 第三周','2017~2018学年 第四周','2017~2018学年 第五周','2017~2018学年 第六周',
          '2017~2018学年 第七周','2017~2018学年 第八周','2017~2018学年 第九周','2017~2018学年 第十周','2017~2018学年 第十一周','2017~2018学年 第十二周','2017~2018学年 第十三周','2017~2018学年 第十四周',
          '2017~2018学年 第十五周','2017~2018学年 第十六周','2017~2018学年 第十七周','2017~2018学年 第十八周','2017~2018学年 第十九周','2017~2018学年 第二十周','2017~2018学年 第二十一周','2017~2018学年 第二十二周','2017~2018学年 第二十三周'
          ,'2017~2018学年 第二十四周'
        ]
      }
    },
    computed:{
      rate(){
        var x=this.$route.params.id;
        return this.$store.state.b.details[x-1]
      },
      nowdate(){
        var self=this;
        var x=self.$store.state.b.week;
        return self.alldate[x-1];
      },
      nowrate(){
        var self=this;
        return self.$store.state.b.rate;
      }
    },
    mounted(){
      var self=this;
      var status='';
      var n=this.$route.params.id;
      if(n==0){
        this.title='不及格';
        status='no_passrate';
      }else if(n==1){
        this.title='及格';
        status='passrate';
      }else if(n==2){
        this.title='良好';
        status='well';
      }else if(n==3){
        this.title='优秀';
        status='excellent'
      }
      var schooltime='';
      if(self.$store.state.c.week){
//        self.$store.state.b.week=self.$store.state.c.week+1;
        schooltime=self.$store.state.c.startTime;
      }else if(self.$store.state.d.week){
//        self.$store.state.b.week=self.$store.state.d.week+1;
        schooltime=self.$store.state.d.startTime;
      }else if(self.$store.state.b.week){
//        self.$store.state.b.week=self.$store.state.b.week;
        schooltime=self.$store.state.b.startTime;
      }
      var mainUrl=int.getBfailure;
      var params={
//        card:'000001791887178',
        school_opens_time:schooltime,
        uid:self.$store.state.b.basic.uid,
        weektime:self.$store.state.b.week,

        projectid:self.$store.state.b.projectid,
        status:status
      };
//      this.$store.dispatch('storeMovieID',this.$route.params.ID);
      api.get_api_data(mainUrl,params,function(d){
          console.log(JSON.stringify(d));
          self.list=d.failure;
//          alert(self.list.all_failure[0].status);
      });



      var h=$(window).height();
      // alert(h);
      $('.fail').css({height:h+'px',backgroundColor:'#1F1F21'});
    },
    methods:{
      goback(){
        this.$router.go(-1);
      }
    }
  }
</script>
<style scoped>
  .fail{
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
    /*height: 20rem;*/
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
    height: 3rem;
    color: #ffffff;
    font-size: 0.7rem;
    line-height: 3rem;
    /*border-top: 1px solid #1F1F21;*/
    border-bottom: 1px solid #1F1F21;
  }
  .f_l{
    width: 60%;
    float: left;
    color: #878788;
  }
  .f_r{
    float: right;
  }
  .f_r span{
    color: #FFCC00;
    margin-left: 0.8rem;
  }
  .t_l{
    /*padding-left: 5%;*/
    /*width: 90%;*/
    /*padding-right: 5%;*/
    margin-top: 0.5rem;
    background-color:  #2E2E31;
  }
  .t_l .l1 li{
    padding-left: 5%;
    width: 100%;
    padding-right: 5%;
    height: 3rem;
    color: #B2B2B3;
    line-height: 3rem;
    font-size: 0.8rem;
    border-bottom: 1px solid #1F1F21;
  }
  .t_l .l1 li .pj,.sz,.fs,.lx{
    width: 25%;
    float: left;
  }
  .t_l .l1 li .sz,.fs{
    text-align: center;
    box-sizing: border-box;
  }
  .t_l .l1 li .fs{
    width: 30%;
  }
  .t_l .l1 li .fs .val{
    /*width: 2.5rem;*/
    float: left;
    padding-left: 1.5rem;
  }
  .t_l .l1 li .fs .im{
    width: 1rem;
    height: 2rem;
    float: left;
    margin-top: -0.1rem;
  }
  .t_l .l1 li .lx{
    width: 20%;
    text-align: right;
    color: #FAC802;
    font-size: 1rem;
  }
  .t_l .l2 li{
    margin-left: 5%;
    width: 90%;
    /*padding-right: 5%;*/
    height: 3rem;
    color: #B2B2B3;
    line-height: 3rem;
    font-size: 0.8rem;
    border-bottom: 1px solid #1F1F21;
  }
  .t_l .l2 li .pj,.sz,.fs,.lx{
    width: 25%;
    float: left;
  }
  .t_l .l2 li .sz,.fs{
    text-align: center;
    box-sizing: border-box;
  }
  .t_l .l2 li .fs{
    width: 30%;
  }
  .t_l .l2 li .fs .val{
    width: 2rem;
    float: left;
    padding-left: 2rem;
  }
  .t_l .l2 li .fs .im{
    width: 1rem;
    height: 2rem;
    float: left;
    margin-top: -0.1rem;
  }
  .t_l .l2 li .lx{
    width: 20%;
    text-align: right;
    color: #FAC802;
    font-size: 1rem;
  }
</style>
