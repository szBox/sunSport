<template>
  <transition name="slideIn">
    <div class="ranklist">
      <div class="ran_top">
        <div class="ran_z" @click="goback">
          <img src="../assets/img/goback.png" height="100%">
        </div>
        <div class="ran_c" style="font-size: 0.8rem;font-weight: bold">成绩排行榜</div>
      </div>
      <div class="ran_project">
        <div class="ran_project_con">
          <div class="ran_p_name">{{nowproject}}</div>
          <div class="ran_p_detail" @click="godetail">统计详情</div>
        </div>
      </div>
      <div class="ran_rank_top">
        <div class="ran_rank_bj">
          <div class="ran_rank_l">
            <div class="ran_rank_l_con">
              <div class="ran_l_img">
                <img src="../assets/img/2@2x.png" width="100%">
              </div>
              <div class="ran_l_name">{{num_two.name}}</div>
            </div>
            <div class="ran_l_describe">
              <div class="ran_l_grade">成绩：{{num_two.result}}</div>
              <div class="ran_l_score">分数：{{num_two.score}}</div>
              <div class="ran_l_evaluate">评价：{{num_two.assessment}}</div>
            </div>
          </div>
          <div class="ran_rank_c">
            <div class="ran_rank_c_con">
              <div class="ran_l_img">
                <img src="../assets/img/1@2x.png" width="100%">
              </div>
              <div class="ran_l_name">{{num_one.name}}</div>
            </div>
            <div class="ran_l_describe">
              <div class="ran_l_grade">成绩：{{num_one.result}}</div>
              <div class="ran_l_score">分数：{{num_one.score}}</div>
              <div class="ran_l_evaluate">评价：{{num_one.assessment}}</div>
            </div>
          </div>
          <div class="ran_rank_r">
            <div class="ran_rank_r_con">
              <div class="ran_l_img">
                <img src="../assets/img/3@2x.png" width="100%">
              </div>
              <div class="ran_l_name">{{num_three.name}}</div>
            </div>
            <div class="ran_l_describe">
              <div class="ran_l_grade">成绩：{{num_three.result}}</div>
              <div class="ran_l_score">分数：{{num_three.score}}</div>
              <div class="ran_l_evaluate">评价：{{num_three.assessment}}</div>
            </div>
          </div>
        </div>
        <!--<div class="ran_sort">-->
          <!--<div @click="sort">排序</div>-->
          <!--<img @click="sort" src="../assets/img/icon_sunxu@2x.png" width="100%">-->
        <!--</div>-->
      </div>
      <div class="ran_rank_list">
        <li v-for="i in list">
          <div class="r_count">{{i.num}}</div>
          <div class="r_name">{{i.name}}</div>
          <div class="r_grade">{{i.result}}</div>
          <div class="r_score">{{i.score}}</div>
          <div class="r_statu">
            <img  v-if="i.status==2" src="../assets/img/rise.png" width="100%">
            <img  v-if="i.status==1" src="../assets/img/decline.png" width="100%">
            <!--<img src="../assets/img/rise.png" width="100%">-->
          </div>
          <div class="r_assessment">{{i.assessment}}</div>
        </li>
      </div>
    </div>
  </transition>
</template>
<script>
  import api from '../fetch/api'
  import $ from 'jquery'
  import int from '../assets/js/interface'
  export default{
    name:'ranklist',
    data(){
      return{
        type:1,
        num_one:'',
        num_two:'',
        num_three:'',
        list:""
      }
    },
    computed:{
      nowproject(){
        var self=this;
        var x=self.$route.params.id;
        return api.get_nowproject(x);
      }
    },
    mounted(){
        var self=this;
        self.getdata(self.type);

        var h=$(window).height();

        var z=$('html').css('fontSize').split('p')[0]*19.1;
        var m=h-z;
        $('.ran_rank_list').css({height:m+'px'});
    },
    methods:{
      sort(){
        var self=this;
        if(self.type==1){
          self.type=2;
          self.getdata(self.type)
        }else if(self.type==2){
          self.type=1;
          self.getdata(self.type);
        }
      },
      getdata(type){
        var self = this;
        var mainUrl = int.getranklist;
        var weektime='';
        var schooltime='';
        var proportion='';
        if(self.$store.state.c.week !=0 || self.$store.state.c.week===0){
          weektime=self.$store.state.c.week+1;
          schooltime=self.$store.state.c.startTime;
          proportion=self.$store.state.c.proportion;
        }else if(self.$store.state.d.week!=0 || self.$store.state.d.week===0){
          weektime=self.$store.state.d.week+1;
          schooltime=self.$store.state.d.startTime;
          proportion=self.$store.state.d.proportion;
        }else if(self.$store.state.b.week!=0 || self.$store.state.b.week===0){
          weektime=self.$store.state.b.week;
          schooltime=self.$store.state.b.startTime;
          proportion=self.$store.state.b.proportion;
        }
        var params = {
          school_opens_time: schooltime,
          uid:self.$store.state.b.basic.uid,
          weektime:weektime,
          projectid:self.$route.params.id,
          type:type,
          proportion:proportion
        };

//      this.$store.dispatch('storeMovieID',this.$route.params.ID);
        api.get_api_data(mainUrl, params, function (d) {
        	self.$root.eventHub.$emit('Vloading',false)
            console.log(d.length);
            if(d.length==1){
              self.num_one=d[0]
            }else if(d.length==2){
              self.num_one=d[0];
              self.num_two=d[1];
            }else if(d.length==3){
              self.num_one=d[0];
              self.num_two=d[1];
              self.num_three=d[2];
            }else if(d.length>3){
              self.num_one=d[0];
              self.num_two=d[1];
              self.num_three=d[2];
              self.list=d.splice(3,d.length);
            }
        })
      },
      goback(){
        this.$router.go(-1);
      },
      godetail(){
        var self=this;
        self.$root.eventHub.$emit('Vloading',true)
        var val=self.$route.params.id;
        self.$router.push({path:'/details/'+val})
      }


    }
  }
</script>
<style scoped>
  .ranklist{
    width: 100%;
    height: 100%;
  }
  .ran_top{
    color: #ffffff;
    height: 2.5rem;
    line-height: 2.5rem;
    margin-left: 5%;
    width: 90%;
  }
  .ran_z{
    float: left;
    width: 1rem;
    height: 1.5rem;
    font-size: 1.5rem;
    margin-top: -0.1rem;
    color: #9C9C9E;
  }
  .ran_c{
    position: absolute;
    /*left: 3%;*/
    text-align: center;
    width: 90%;
    font-weight: bold;
    z-index:-1;
  }
  .ran_project{
    width: 100%;
    height: 2.5rem;
    line-height: 2.5rem;
    border-top:0.1rem solid #262628;
  }
  .ran_project_con{
    width: 90%;
    margin-left: 5%;
    font-size: 0.8rem;
  }
  .ran_p_name{
    float: left;
    color: #ffffff;
  }
  .ran_p_detail{
    color: #989899;
    float: right;
  }
  .ran_rank_top{
    /*margin-top: 1rem;*/
    position: relative;
    width: 100%;
    height: 14rem;
    background-color: #1F1F21;
    /*background: url('../assets/img/BG_Ranking@2x.png') no-repeat;*/
  }
  .ran_rank_bj{
    position: absolute;
    top:1rem;
    width: 90%;
    margin-left: 5%;
    /*border: 1px solid red;*/
    height: 12.5rem;
    background: url('../assets/img/BG_Ranking@2x.png') no-repeat;
    background-size: 100% 100%;
  }
  .ran_rank_l{
    width: 33%;
    float: left;
    /*border: 1px solid red;*/
    margin-top: 3.7rem;
    color: #DEDEDE;
    font-size: 0.6rem;
  }
  .ran_rank_c{
    width: 34%;
    float: left;
    /*border: 1px solid red;*/
    margin-top: 1rem;
    color: #DEDEDE;
    font-size: 0.6rem;
  }
  .ran_rank_r{
    width: 33%;
    float: left;
    /*border: 1px solid red;*/
    margin-top: 4.5rem;
    color: #DEDEDE;
    font-size: 0.6rem;
  }
  .ran_rank_l_con{
    width: 60%;
    margin-left: 20%;
    /*height: 7rem;*/
  }
  .ran_rank_r_con{
    width: 60%;
    margin-left: 20%;
    /*height: 7rem;*/
  }
  .ran_rank_c_con{
    width: 70%;
    margin-left: 15%;
    /*height: 7rem;*/
  }
  .ran_l_describe{
    /*width: 65%;*/
    margin-left: 17.5%;
  }
  .ran_l_name{
    margin-top: 0.5rem;
    text-align: center;
    font-size: 0.8rem;
    color: #ffffff;
    height: 1rem;
  }
  .ran_l_grade{
    text-align: left;
    /*text-align: center;*/
    margin-top: 0.5rem;
  }
  .ran_l_score{

    text-align: left;
    margin-top: 0.2rem;
  }
  .ran_l_evaluate{

    text-align: left;
    margin-top: 0.2rem;
  }
  .ran_rank_list{
    overflow: auto;
  }
  .ran_rank_list li{
    width: 90%;
    margin-left: 5%;
    border-bottom: 1px solid #262628;
    height: 2.5rem;
    line-height: 2.5rem;
    font-size: 0.8rem;
  }
  .ran_rank_list li .r_count{
    float: left;
    width: 10%;
    color:#909092 ;
  }
  .ran_rank_list li .r_name{
    float: left;
    width: 20%;
    color: #C9C9CA;
    /*text-align: center;*/
  }
  .ran_rank_list li .r_grade{
    float: left;
    width: 20%;
    text-align: center;
    color: #C9C9CA;
    margin-left: 5%;
  }
  .ran_rank_list li .r_score{
    float: left;
    width: 20%;
    text-align: right;
    color: #C9C9CA;
  }
  .ran_rank_list li .r_statu{
    float: left;
    margin-left: 3%;
  }
  .ran_rank_list li .r_assessment{
    float: right;
    text-align: right;
    color: #F2C204;
  }
  .ran_sort div{
    position: absolute;
    color: #F2C204;
    right: 10%;
    top:0.5rem;
    font-size: 0.8rem;
  }
  .ran_sort img{
    position: absolute;
    right: 5%;
    top:0.7rem;
    width: 0.7rem;
    height: 0.7rem;
  }
</style>
