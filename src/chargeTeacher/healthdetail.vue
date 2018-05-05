<template>
  <transition name="slideIn">
  <div class="bmi">
    <div class="ran_top">
      <div class="ran_z" @click="goback">
        <img src="../assets/img/goback.png" height="100%">
      </div>
      <div class="ran_c">{{title}}学生信息</div>
    </div>
    <!--<div class="select">-->
      <!--<div class="s">-->
        <!--<li class="li-1">-->
          <!--&lt;!&ndash;<div class="c">&ndash;&gt;-->
          <!--&lt;!&ndash;{{nowdate}}&ndash;&gt;-->
          <!--&lt;!&ndash;</div>&ndash;&gt;-->
          <!--<input type="text" id='picker' class="c"  v-model="nowdate"/>-->
          <!--<div class="r">-->
            <!--<img src="../assets/img/pull_pown.png" width="100%">-->
          <!--</div>-->
        <!--</li>-->
        <!--&lt;!&ndash;<div class="lr"></div>&ndash;&gt;-->
        <!--&lt;!&ndash;<div class="ll" >&ndash;&gt;-->
        <!--&lt;!&ndash;<li class="active" v-for="(i,index) in alldate" @click="close(i);getdata(index)">&ndash;&gt;-->
        <!--&lt;!&ndash;<div class="c">&ndash;&gt;-->
        <!--&lt;!&ndash;{{i}}&ndash;&gt;-->
        <!--&lt;!&ndash;</div>&ndash;&gt;-->
        <!--&lt;!&ndash;</li>&ndash;&gt;-->
        <!--&lt;!&ndash;</div>&ndash;&gt;-->
      <!--</div>-->
    <!--</div>-->
    <div class="ran_li">
      <ul>
        <li>
          <div class="ran_name">学生姓名</div>
          <div class="ran_zhi">身高(cm)</div>
          <div class="ran_fenshu">体重(kg)</div>
          <div class="ran_sex">体质指数BMI</div>
          <!--<div class="ran_paiming">分数</div>-->
        </li>
        <transition-group name="list"
                          v-on:before-enter="beforeEnter"
                          v-on:enter="enter"

        >
            <li v-for="(i,index) in list" v-bind:key="index" v-bind:data-id="index">
              <div class="ran_name">{{i.name}}</div>
              <div class="ran_zhi">{{i.height}}</div>
              <div class="ran_fenshu">{{i.weight}}</div>
              <div class="ran_sex">{{i.corporeity}}</div>
              <!--<div class="ran_paiming">{{i.bak2}}</div>-->
            </li>
        </transition-group>
      </ul>
    </div>
  </div>
    </transition>
</template>
<script>
  import api from '../fetch/api'
  import $ from 'jquery'
//  import weui from '../assets/js/jquery-weui'
  import int from '../assets/js/interface'
  export default{
    name:'bmi',
    data(){
      return{
        title:'',
        list:'',
        show:true,
        stop:true,
//        initdate:'',
        arr:['2017~2018学年 第一周','2017~2018学年 第二周','2017~2018学年 第三周','2017~2018学年 第四周','2017~2018学年 第五周','2017~2018学年 第六周',
          '2017~2018学年 第七周','2017~2018学年 第八周','2017~2018学年 第九周','2017~2018学年 第十周','2017~2018学年 第十一周','2017~2018学年 第十二周','2017~2018学年 第十三周','2017~2018学年 第十四周',
          '2017~2018学年 第十五周','2017~2018学年 第十六周','2017~2018学年 第十七周','2017~2018学年 第十八周','2017~2018学年 第十九周','2017~2018学年 第二十周','2017~2018学年 第二十一周','2017~2018学年 第二十二周','2017~2018学年 第二十三周'
          ,'2017~2018学年 第二十四周']
      }
    },
    computed:{
//      nowdate(){
//        var self=this;
//        var week=api.getweek();
//        return self.arr[week];
////          if(self.$store.state.a.week || self.$store.state.a.week==0){
////            self.week=self.$store.state.a.week;
////            self.$store.state.a.count++;
////          }else{
//
//      }
    },
    mounted(){
      var self=this;
      var n=self.$route.params.id;
      if(n==0){
        this.title='偏瘦';
      }else if(n==1){
        this.title='正常';
      }else if(n==2){
        this.title='过重';
      }else if(n==3){
        this.title='肥胖';
      }else if(n==4){
        this.title='非常肥胖';
      }

      self.getdata();
//      var time=api.getweek();
//      self.getdata(time);
//      $("#picker").picker({
//        title: "请选择学期",
//        cols: [
//          {
//            textAlign: 'center',
//            values: self.arr
//          }
//        ],
//
////      rotateEffect:true,
//        onClose:function () {
////          self.shows=true;
////          console.log(self.$store.state.d.allproject);
//          for(var i=0;i<self.arr.length;i++){
//            if($('#picker').val()==self.arr[i]){
//              self.getdata(i);
//            }
//          }
//        }
//      });
    },
    methods:{
      beforeEnter: function (el) {
        el.style.opacity = 0;
        el.style.transition="all 0.5s";
        el.style.transform="translateX(500px)";
      },
      enter: function (el) {
        console.log(el.dataset.id);
        var dlay=el.dataset.id;
        el.style.opacity=1;
        el.style.duration=500;
        setTimeout(function () {
          el.style.transform="translateX(0px)";
        },100*dlay)
      },
      goback(){
        this.$router.go(-1);
      },
      getdata(){
        var self=this;
        var mainUrl=int.getbmidetail;
        var params={
          school_opens_time:self.$store.state.d.startTime,
          cid:self.$store.state.b.cid,
          type:parseInt(self.$route.params.id)+1
        };
        api.get_api_data(mainUrl,params,function(d){
//        self.$store.state.a.data.base=d;
//        self.selectData(d);
          self.list=d;
          console.log(JSON.stringify(d));
        })
      }
    }
  }
</script>
<style scoped>
  .bmi{
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
    /*left: 35%;*/
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
    width:25%;
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
    width: 20%;
    color: #FAC802;
  }
  .ran_li li .ran_sex{
    float: left;
    width: 35%;

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
  /*.list-enter-active, .list-leave-active {*/
    /*transition: all 0.5s;*/
  /*}*/
  /*.list-enter, .list-leave-to*/
    /*!* .list-leave-active for below version 2.1.8 *! {*/
    /*opacity: 0;*/
    /*transform: translateX(400px);*/
  /*}*/
</style>
