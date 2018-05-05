<template>
  <div class="bmi">
    <div class="ran_top">
      <div class="ran_z" @click="goback">
        <img src="../assets/img/goback.png" height="100%">
      </div>
      <div class="ran_c">体质信息</div>
    </div>
    <div class="select">
      <div class="s">
        <li class="li-1">
          <!--<div class="c">-->
          <!--{{nowdate}}-->
          <!--</div>-->
          <input type="text" id='picker' class="c"  v-model="nowdate"/>
          <div class="r">
            <img src="../assets/img/pull_pown.png" width="100%">
          </div>
        </li>
        <!--<div class="lr"></div>-->
        <!--<div class="ll" >-->
        <!--<li class="active" v-for="(i,index) in alldate" @click="close(i);getdata(index)">-->
        <!--<div class="c">-->
        <!--{{i}}-->
        <!--</div>-->
        <!--</li>-->
        <!--</div>-->
      </div>
    </div>
    <div class="ran_li">
      <ul>
        <li>
          <div class="ran_name">身高(cm)</div>
          <div class="ran_zhi">体重(kg)</div>
          <div class="ran_fenshu">体质指数BMI</div>
          <div class="ran_sex">结果</div>
          <!--<div class="ran_paiming">分数</div>-->
        </li>
        <li v-for="i in list">
        <div class="ran_name">{{i.height}}</div>
        <div class="ran_zhi">{{i.weight}}</div>
        <div class="ran_fenshu">{{i.bmi}}</div>
        <div class="ran_sex">{{i.evaluate}}</div>
        <!--<div class="ran_paiming">{{i.bak2}}</div>-->
      </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import api from '../fetch/api'
  import $ from 'jquery'
  import weui from '../assets/js/jquery-weui'
  import int from '../assets/js/interface'
  export default{
    name:'bmi',
    data(){
      return{
        list:'',
        initdate:'',
        time:'',
        arr:
          ['2017~2018学年 第一周','2017~2018学年 第二周','2017~2018学年 第三周','2017~2018学年 第四周','2017~2018学年 第五周','2017~2018学年 第六周',
            '2017~2018学年 第七周','2017~2018学年 第八周','2017~2018学年 第九周','2017~2018学年 第十周','2017~2018学年 第十一周','2017~2018学年 第十二周','2017~2018学年 第十三周','2017~2018学年 第十四周',
            '2017~2018学年 第十五周','2017~2018学年 第十六周','2017~2018学年 第十七周','2017~2018学年 第十八周','2017~2018学年 第十九周','2017~2018学年 第二十周','2017~2018学年 第二十一周','2017~2018学年 第二十二周','2017~2018学年 第二十三周'
            ,'2017~2018学年 第二十四周']
      }
    },
    computed:{
      nowdate(){
        var self=this;
        var week='';
//        return self.arr[week];
          if(self.time==''){
            week=self.$store.state.a.initweek-1;

          }else {
            week=self.time;
          }
        console.log(week);
        return self.arr[week];
//          if(self.$store.state.a.week || self.$store.state.a.week==0){
//            self.week=self.$store.state.a.week;
//            self.$store.state.a.count++;
//          }else{
          }
    },
    created(){
      var self=this;
      var mainUrl_t=int.getbmi_week;
      var params_t={
        school_opens_time:self.$store.state.a.startTime,
        uid:self.$store.state.a.data.base.user.uid
      };
      api.get_api_data(mainUrl_t,params_t,function(d) {

        self.$store.state.a.week__s.length=0;
        for(var i=0;i<d.length;i++){
          self.$store.state.a.week__s[i]=d[i];
          console.log(self.$store.state.a.week__s+'xxxxx'+i);
        }
        self.time=self.$store.state.a.week__s[self.$store.state.a.week__s.length-1]-1;
      });
    },
    mounted(){
      var self=this;
      setTimeout(function () {
        var time=self.$store.state.a.week__s[self.$store.state.a.week__s.length-1]-1;
        self.getdata(time);
      },500);
      $("#picker").picker({
        title: "请选择学期",
        cols: [
          {
            textAlign: 'center',
            values: self.arr
          }
        ],

//      rotateEffect:true,
        onClose:function () {
//          self.shows=true;
//          console.log(self.$store.state.d.allproject);
          for(var i=0;i<self.arr.length;i++){
            if($('#picker').val()==self.arr[i]){
              self.time=i;
              self.getdata(i);
            }
          }
        }
      });
    },
    methods:{
      goback(){
        this.$router.go(-1);
      },
      getdata(index){
        var self=this;
        var week=index+1;
        console.log(week);
        var mainUrl=int.getbmi;
        var params={
          uid:self.$store.state.a.data.base.user.uid,
          weektime:week
        };
//      this.$store.dispatch('storeMovieID',this.$route.params.ID);
        api.get_api_data(mainUrl,params,function(d){
          console.log(d);
//        self.$store.state.a.data.base=d;
//        self.selectData(d);
          self.list=d;
//        alert(JSON.stringify(d));
        })
      }
    }
  }
</script>
<style scoped>
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
    /*left: 90%;*/
    text-align: center;
    width: 90%;
    font-weight: bold;
    z-index:-1;
  }
  .ran_y{
    width: 30%;
    float: right;
    text-align: right;
    font-size: 0.8rem;
    color: #FFCC00;
  }
  .ran_select{
    width: 100%;
    height: 2rem;
    border-top: 0.1rem solid #262628;
    border-bottom: 0.1rem solid #262628;
  }
  .ran_s{
    width: 90%;
    margin-left: 5%;
  }
  .ran_c1{
    width: 90%;
    float: left;
    background-color: #2E2E31;
    line-height: 2rem;
    color: #9B9B9B;
    font-weight: bold;
    font-size: 0.8rem;
    outline: none;
    border: 0;
    /*margin-left: 0.8rem;*/
  }

  .ran_r{
    width: 1.5rem;
    height: 1.5rem;
    float: right;
    /*margin-right: 0.8rem;*/
    margin-top: 0.25rem;
  }
  .toolbar{
    background-color: #000000;
    color: #ffffff;
  }
  .ran_li{
    overflow: auto;
    width: 90%;
    margin-left: 5%;
    margin-bottom: 3rem;
  }
  .ran_li li{
    height: 2rem;
    line-height: 2rem;
    border-bottom: 1px solid #262628;
    color: #878788;
    text-align: center;
    font-size: 0.75rem;
  }
  .ran_li li .ran_name{
    float: left;
    width:20%;
    text-align: center;
    color: #FAC802;
  }
  .ran_li li .ran_zhi{
    float: left;
    width: 20%;
    /*color: #FAC802;*/
  }
  .ran_li li .ran_fenshu{
    float: left;
    width: 35%;
    color: #FAC802;
  }
  .ran_li li .ran_sex{
    float: left;
    width: 25%;

  }
  .ran_li li .ran_paiming{
    float: left;
    width: 15%;
    color: #FAC802;
    text-align: right;
  }
  .ran_select2{
    border-bottom: 1px solid #000000;
    border-top: 1px solid #000000;
    height: 2.5rem;
    width: 90%;
    padding-left: 5%;
    padding-right: 5%;
    background-color: #2E2E31;
  }
  .ran_select2 .s_l{
    width: 50%;
    float: left;
    box-sizing: border-box;
    /*border-bottom: 1px solid #1F1F21;*/
  }
  .s_n{
    height: 2rem;
    width: 90%;
    /*padding-left: 5%;*/
    /*padding-right: 5%;*/
    box-sizing: border-box;
    /*border-bottom: 1px solid #000000;*/
  }
  .s_n .s_c{

    height: 2rem;
    font-size: 0.6rem;
    width: 100%;
    /*color: #ffffff;*/
    padding-left: 5%;
    padding-right: 5%;
    /*color: #AAAAAC;*/
    line-height: 2rem;
    /*padding-left: 1rem;*/
    text-align: center;
    /*font-size: 0.8rem;*/
    /*line-height: 2rem;*/
    /*margin-left: 0.5rem;*/
    /*width: 70%;*/
    /*float: left;*/
    background-color: #2E2E31;
    outline: none;
    border: 0;
    color: #9B9B9B;
    font-weight: bold;
    border-bottom: 1px solid #000000;
  }
  .ran_select2 .s_l .s_c{
    font-size: 0.75rem;
    width: 75%;
    float: left;
    /*color: #ffffff;*/
    padding-left: 5%;
    padding-right: 5%;
    /*color: #AAAAAC;*/
    line-height: 2.5rem;
    /*padding-left: 1rem;*/
    text-align: center;
    /*font-size: 0.8rem;*/
    /*line-height: 2rem;*/
    /*margin-left: 0.5rem;*/
    /*width: 70%;*/
    /*float: left;*/
    background-color: #2E2E31;
    outline: none;
    border: 0;
    color: #9B9B9B;
    font-weight: bold;
  }
  .ran_select2 .s_l .s_i{
    width: 15%;
    margin-top: 0.44rem;
    float: left;
    /*width: 1rem;*/
    height: 1rem;
  }
  .select{
    width: 100%;
    height: 2rem;
    border-top: 0.1rem solid #262628;
    border-bottom: 0.1rem solid #262628;
  }
  .s{
    width: 90%;
    margin-left: 5%;
  }
  .s li{
    color: #939394;
    height: 2rem;
  }
  .c{
    width: 90%;
    float: left;
    background-color: #2E2E31;
    line-height: 2rem;
    color: #9B9B9B;
    font-weight: bold;
    font-size: 0.8rem;
    outline: none;
    border: 0;
    /*margin-left: 0.8rem;*/
  }
  .r{
    width: 1.5rem;
    height: 1.5rem;
    float: right;
    /*margin-right: 0.8rem;*/
    margin-top: 0.25rem;
  }
</style>
