<template>
  <transition name="slideIn" id="health">
  <div class="health">
    <div class="top">
      <div class="z" @click="goback">
        <img src="../assets/img/goback.png" height="100%">
      </div>
      <div class="c">体质信息</div>
    </div>
    <div class="cont_c">
      <div class="cont_c_t">
        <div class="t_b">{{list.classname}}</div>
        <div class="t_r">(共<span>{{list.all_stu}}</span>人 缺<span>{{list.lack_stu}}</span>人)</div>
      </div>
      <div class="cont_c_c">
        <li @click="godetail(0)">
          <!--<div class="c_img">-->
            <!--<img src="../assets/img/fail.png" width="100%">-->
          <!--</div>-->
          <div class="c_cont" style="color: #FFCC00">
            偏瘦(<span>{{list.bmi.too_light.percentage}}</span>)
          </div>
          <div class="c_right">
            <div class="c_num">{{list.bmi.too_light.num}}人</div>
            <div class="c_img2">
              <img src="../assets/img/advance.png" width="100%">
            </div>
          </div>
        </li>
        <li @click="godetail(1)">
          <!--<div class="c_img">-->
            <!--<img src="../assets/img/pass.png" width="100%">-->
          <!--</div>-->
          <div class="c_cont" style="color: #1AB99B">
            正常(<span>{{list.bmi.normal.percentage}}</span>)
          </div>
          <div class="c_right">
            <div class="c_num">{{list.bmi.normal.num}}人</div>

            <div class="c_img2">
              <img src="../assets/img/advance.png" width="100%">
            </div>
          </div>
        </li>
        <li @click="godetail(2)">
          <!--<div class="c_img">-->
            <!--<img src="../assets/img/well.png" width="100%">-->
          <!--</div>-->
          <div class="c_cont" style="color:#FF9C00">
            过重(<span>{{list.bmi.overweight.percentage}}</span>)
          </div>
          <div class="c_right">
            <div class="c_num">{{list.bmi.overweight.num}}人</div>
            <div class="c_img2">
              <img src="../assets/img/advance.png" width="100%">
            </div>
          </div>
        </li>
        <li @click="godetail(3)">
          <!--<div class="c_img">-->
            <!--<img src="../assets/img/excellent.png" width="100%">-->
          <!--</div>-->
          <div class="c_cont" style="color:#D54B14">
            肥胖(<span>{{list.bmi.obesity.percentage}}</span>)
          </div>
          <div class="c_right">
            <div class="c_num">{{list.bmi.obesity.num}}人</div>
            <div class="c_img2">
              <img src="../assets/img/advance.png" width="100%">
            </div>
          </div>
        </li>
        <li @click="godetail(4)">
          <!--<div class="c_img">-->
          <!--<img src="../assets/img/excellent.png" width="100%">-->
          <!--</div>-->
          <div class="c_cont" style="color: silver">
            非常肥胖(<span>{{list.bmi.very_fat.percentage}}</span>)
          </div>
          <div class="c_right">
            <div class="c_num">{{list.bmi.very_fat.num}}人</div>
            <div class="c_img2">
              <img src="../assets/img/advance.png" width="100%">
            </div>
          </div>
        </li>
      </div>
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
    name:'health',
    data(){
      return{
        list:''
      }
    },
    mounted(){
      var self=this;
      self.getdata();
    },
    methods:{
      getdata(){
        var self=this;
        var mainUrl=int.getclassbmi;
        var uid='';
        var schooltime='';
        if(self.$store.state.b.basic.uid){
          uid=self.$store.state.b.basic.uid;
          schooltime=self.$store.state.startTime;
        }else if(self.$store.state.c.basic.uid){
          uid=self.$store.state.c.basic.uid;
          schooltime=self.$store.state.c.startTime;
        }else if(self.$store.state.d.basic.uid){
          uid=self.$store.state.d.basic.uid;
          schooltime=self.$store.state.d.startTime;
        }
        var params={
          school_opens_time:schooltime,
          uid:uid
        };
        api.get_api_data(mainUrl,params,function(d){
          self.list=d;
          self.$store.state.b.cid=d.bmi.cid;
//          console.log(d.bmi.cid);
          console.log(JSON.stringify(d));
//          if(d.error=='error'){
//            alert('此学校未设置任务');
//          }
        })
      },
      goback(){
        this.$router.go(-1);
      },
      godetail(val){
        this.$router.push({path:'/healthdetail/'+val})
      }
    }
  }
</script>
<style scoped>
  .health{
    width: 100%;
    height:100%;
  }
  .top{
    color: #ffffff;
    height: 2.5rem;
    line-height: 2.5rem;
    margin-left: 5%;
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
    /*left: 40%;*/
    text-align: center;
    width: 90%;
    font-weight: bold;
    z-index:-1;
  }
  .cont_c{
    background-color: #2E2E31;
    /*margin-top: 0.5rem;*/
    height: 17.6rem;
    border-top: 0.01rem solid #1F1F21;
    /*border-bottom: 1px solid #ffffff;*/
  }
  .cont_c_t{
    padding-left: 5%;
    width: 90%;
    padding-right: 5%;
    height: 2.5rem;
    color: #A0A0A2;
    font-size: 0.8rem;
    line-height: 2.5rem;
    border-bottom: 1px solid #1F1F21;
  }
  .cont_c_c{
    width: 90%;
    padding-left: 5%;
    padding-right: 5%;
  }
  .t_b{
    float: left;
    width: 4.5rem;
  }
  .t_r{
    float: left;
    color: #707072;
  }
  .cont_c_c li{
    border-bottom: 1px solid #1F1F21;
    height: 2.5rem;
    line-height: 2.5rem;
  }
  .cont_c_c li .c_img{
    width: 1.5rem;
    height: 1.5rem;
    margin-top: -0.1rem;
    float: left;
  }
  .cont_c_c li .c_cont{
    float: left;
    color: #A0A0A2;
    font-size: 0.8rem;
    /*margin-left: 0.5rem;*/
    width: 40%;
  }
  .cont_c_c li .c_right{
    float: right;
    width: 35%;
  }
  .cont_c_c li .c_right .c_num{
    float: left;
    width:3rem;
    color: #69696B;
    font-size: 0.9rem;
    text-align: right;
    margin-left: 1rem;
  }
  .cont_c_c li .c_right .c_img2{
    margin-top: -0.1rem;
    float: right;
    width: 1rem;
    height: 1.5rem;
  }
</style>
