<template>
  <div class="hello" >
    <div class="select">
      <div class="s">
        <li class="li-1">
          <!--<div class="c">-->
            <!--{{nowdate}}-->
          <!--</div>-->
          <input type="text" id='picker' class="c"  v-model="nowdate"/>
          <!--<div class="r">-->
            <!--<img src="../assets/img/pull_pown.png" width="100%">-->
          <!--</div>-->
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
    <div id="main" style="display: block;"></div>
    <div id="mainh" style="display: none;"></div>
    <div id="mainw" style="display: none;"></div>
    <div class="modell" style="display: none;">
      <div class="model-img">
        <img src="../assets/img/xinxitu@2x.png" width="100%">
      </div>
      <div class="model-text">
        本周未测试数据
      </div>
      <div class="model-content" >
        <div class="model-btn" @click="close">知道了</div>
      </div>
    </div>

    <div class="model-b" style="display: none;"></div>
    <div class="btn" @click="godetails">
      查看项目详情
    </div>
  </div>
</template>

<script>

  import api from '../fetch/api'
  import $ from 'jquery'
  import weui from '../assets/js/jquery-weui'
  import echarts from '../assets/js/echarts'
  import echartsh from '../assets/js/fhistogram'
  import int from '../assets/js/interface'
export default {
  name: 'hello',
  data () {
    return {
//      nowdate:'',
      loadCount:0,
      num:0,
      week:'',
      alldate:['2017~2018学年 第一周','2017~2018学年 第二周','2017~2018学年 第三周','2017~2018学年 第四周','2017~2018学年 第五周','2017~2018学年 第六周',
        '2017~2018学年 第七周','2017~2018学年 第八周','2017~2018学年 第九周','2017~2018学年 第十周','2017~2018学年 第十一周','2017~2018学年 第十二周','2017~2018学年 第十三周','2017~2018学年 第十四周',
        '2017~2018学年 第十五周','2017~2018学年 第十六周','2017~2018学年 第十七周','2017~2018学年 第十八周','2017~2018学年 第十九周','2017~2018学年 第二十周','2017~2018学年 第二十一周','2017~2018学年 第二十二周','2017~2018学年 第二十三周'
        ,'2017~2018学年 第二十四周'],
      show:false
    }
  },
  computed:{
      nowdate(){
        var self=this;
        var week=self.$store.state.a.weeks[self.$store.state.a.weeks.length-1];
        if(self.$store.state.a.count>0){
          if(self.$store.state.a.week || self.$store.state.a.week===0){
            self.week=self.$store.state.a.week;
            self.$store.state.a.count++;
          }else{
            self.week=self.$store.state.a.weeks[self.$store.state.a.weeks.length-1];
            self.$store.state.a.count++;
//            self.$on('onn',function (msg) {
//              self.week=msg;
//            });
          }
        }else{
          self.$store.state.a.count++;
          self.$store.state.a.week=self.$store.state.a.weeks[self.$store.state.a.weeks.length-1];
          console.log(self.$store.state.a.week+"xxxxxxxxxxxxxx");
          self.week=self.$store.state.a.weeks[self.$store.state.a.weeks.length-1]-1;
          console.log(self.$store.state.a.weeks[self.$store.state.a.weeks.length-1]-1+"xxxxxx");
//          self.$on('onn',function (msg) {
//            self.week=msg;
//          });
        }
        self.$store.state.a.week=self.week;
        return self.alldate[self.week];
      }
  },
  created(){
//    var week=parseInt(api.getweek());
//    this.nowdate=this.alldate[week];

  },
  mounted(){
    var self=this;
    var arr=[];

    for(var i=0;i<self.$store.state.a.weeks.length;i++){
       arr[i]=self.alldate[self.$store.state.a.weeks[i]-1];
    }
    console.log(arr);
    var hei=$(document).height();
    $('.model-b').css({height:hei+"px"});
//    var x=$(document).height();
//    $('.model-b').css({height:x+"px"});

    var time='';
    if(self.$store.state.a.week){
      time=self.$store.state.a.week;
    }else{
//      time=api.getweek();
      time=self.$store.state.a.weeks[self.$store.state.a.weeks.length-1]-1;
    }
    self.getdata(time);
//    var time=api.getweek();
//    self.nowdate=self.alldate[time];
//    self.getweek(time);
//    self.$on('onn',function (msg) {
//      self.week=msg;
////      self.getdata(msg);
//    });



    //展示当前周数据正常显示，有数据的一周展示颜色加深
    $("#picker").picker({
      title: "请选择周期",
      cols: [
        {
          textAlign: 'center',
          values: arr,
        }
      ],

//      rotateEffect:true,
      onClose:function () {
//        alert();
        for(var i=0;i<arr.length;i++){
          if($('#picker').val()==arr[i]){
//            self.$store.state.a.week=i;
//            self.getdata(i);
            self.$store.state.a.week=self.$store.state.a.weeks[i]-1;
            self.getdata(self.$store.state.a.weeks[i]-1);
            self.$store.state.a.count++;
          }
        }
      }
    });
//    self.selectData(self.$store.state.a.data.base);
  },
  methods:{
    close(){
      $('.modell').css({display:'none'});
      $('.model-b').css({display:'none'});
    },
    selectData(val){
      var self=this;
      var project=[];
      var score=new Array();
      var average=val.each_average;
      for(var i in average){
//        console.log(typeof i);
        project.push(api.get_project(i));
        score.push(average[i]);
      }
      var newArr=[];
      var newProject=[];
      for(var z=0;z<score.length;z++){
        if(score[z]==0){

        }else{
          newArr.push(score[z]);
          newProject.push(project[z]);
        }
      }
      var time=setInterval(function () {
        if(newArr.length==0){
          $('.modell').css({display:'block'});
          $('.model-b').css({display:'block'});
          $('#mainh').css({display:'none'});
          $('#main').css({display:'none'});
          $('#mainw').css({display: 'block'});
//          var obj = document.getElementById("main");
//          var maxproject=new Array();
//          for(var m=0;m<project.length;m++){
//            var ob={name:'',max:150};
//            ob.name=project[m];
//            maxproject.push(ob);
//          }
////          console.log(maxproject);
//
////      var dataBJ=[{value:['24','24','24','24','24','24'],name:'平均分',val:[]}];
//          var dataBJ = [{
//            value:score,
//            name:'平均分'
//          }];
//          var indicatorData = maxproject;
//          echarts.initDataY(dataBJ,indicatorData,obj,'',score);
//          alert('本周未有测试数据');
          clearInterval(time);
//          clearInterval(time);
        }
        else if(newArr.length<3){
//          console.log(11);
          $('#mainh').css({display:'block'});
          $('#main').css({display:'none'});
          $('#mainw').css({display: 'none'});
          var obj = document.getElementById("mainh");
          var a1='';
          var a2='';
          var a3=newProject;
          var x=newArr;
          var y='';
          echartsh.initDataH(x,y,obj,a1,a2,a3);
          clearInterval(time);
        }else{
//          console.log(22);
          $('#mainh').css({display:'none'});
          $('#main').css({display:'block'});
          $('#mainw').css({display: 'none'});
          var obj = document.getElementById("main");
          var maxproject=new Array();
          for(var m=0;m<project.length;m++){
            var ob={name:'',max:150};
            ob.name=project[m];
            maxproject.push(ob);
          }
//          console.log(maxproject);

//      var dataBJ=[{value:['24','24','24','24','24','24'],name:'平均分',val:[]}];
          var dataBJ = [{
            value:score,
            name:'平均分'
          }];
          var indicatorData = maxproject;
          echarts.initDataY(dataBJ,indicatorData,obj,'',score);
          clearInterval(time);
        }

      },100);

// self.$store.state.a.data.allproject=project;

    },
    godetails(){
      var self=this;
      var arr=self.alldate;
      var  x=1;
      for(var i=0;i<arr.length;i++){
        if($('#picker').val()==arr[i]){
          x=i+1;
        }
      }
      self.$store.state.a.week=x-1;
      this.$router.push({path:'/fgeneral/'+x})
    },
    ale(){
      var self=this;
//      self.show==true;
      if(self.show==false){
        $('.lr').slideDown(500);
        $('.ll').slideDown(500);
        self.show=true;
      }else if(self.show==true){
        $('.lr').slideUp(500);
        $('.ll').slideUp(500);
        self.show=false;
      }
    },
//    close(val){
////      alert(val);
//      $('.li-1 .c').html(val);
//      $('.lr').slideUp(500);
//      $('.ll').slideUp(500);
//      self.show=true;
//    },
    getdata(index){

      var self=this;
      var week=index+1;
//      console.log(week);
      var mainUrl=int.gofamily;
      var params={
        school_opens_time:self.$route.params.id,
        uid:self.$store.state.a.data.base.user.uid,
        weektime:week,
        proportion:self.$store.state.a.proportion
      };
//      this.$store.dispatch('storeMovieID',this.$route.params.ID);
      api.get_api_data(mainUrl,params,function(d) {

        self.$store.state.a.data.base = d;
        self.selectData(d);

      })
    },
    getweek(index){

      var self=this;
      var week=index+1;
      var nArr=[];
//      console.log(self.$store.state.b.basic.card);
//      var val=self.$store.state.d.card;
      var mainUrl=int.gofamily;
      var params={
//        card:'000001791887178',
        uid:self.$store.state.a.data.base.user.uid,
        weektime:week
      };

//      this.$store.dispatch('storeMovieID',this.$route.params.ID);
      api.get_api_data(mainUrl,params,function(d){


//        console.log(d.each_average);
        if(d.each_average==null){

          self.num=index-1;
          if(self.num<0){
          }else{
            self.getweek(self.num);
          }
        }else{
          self.num=index;
          self.$emit('onn',self.num);
//          var time=setInterval(function () {
//
//          },500);

          //展示有数据的周数；
//          var arrDate=[];
////        console.log(self.alldate);
////        setInterval(function () {
//          for (var i = 0; i < d.user.week.length; i++) {
//            arrDate.push(self.allDate[d.user.week[i]-1]);
//          }
////          console.log(arrDate);
//          $("#picker").picker({
//            title: "请选择周期",
//            cols: [
//              {
//                textAlign: 'center',
//                values: arrDate
////                  cssClass:'background:red'
//              }
//            ],
//            //      rotateEffect:true,
//            onClose:function () {
//              for(var i=0;i<arrDate.length;i++){
//                if($('#picker').val()==arrDate[i]){
////                  console.log(d.user.week[0]);
//                  self.$store.state.a.week=d.user.week[i]-1;
//                  self.getdata(d.user.week[i]-1);
//                  self.$store.state.a.count++;
//                }
//              }
//            }
//          });
        }
      })
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .hello{
    /*padding-top: 2rem;*/
    /*background-color: #000000;*/
    height: 20.6rem;
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
    width: 100%;
    float: left;
    /*background-color: #2E2E31;*/
    background: url('../assets/img/pull_pown.png') no-repeat;
    background-position:100% 0.1rem;
    height: 1.5rem;
    /*background-color: #2E2E31;*/
    /*line-height: 2rem;*/
    margin-top: 0.25rem;
    /*line-height: 2rem;*/
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
  #main{
    width: 90%;
    margin-left: 5%;
    height: 15rem;
  }
  #mainh{
    width: 90%;
    margin-left: 5%;
    height: 15rem;
  }
  #mainw{
    width: 90%;
    margin-left: 5%;
    height: 15rem;
  }
  .btn{
    width: 90%;
    margin-left:5%;
    background-color: #00B77C;
    color: #ffffff;
    text-align: center;
    height: 2.5rem;
    line-height: 2.5rem;
    font-size: 0.8rem;
  }
  .active{
    position:relative;
    /*z-index:1;*/
    width: 100%;
    z-index:11;
    /*display: none;*/
    border-bottom: 1px solid #979798;

  }
  .ll{
    display: none;
    height: 10rem;
    overflow: auto;
  }
  .lr{
    height: 10rem;
    display: none;
    background-color: #2E2E31;
    opacity: 0.9;
    position: absolute;
    width: 90%;
    z-index:10;
    /*border-bottom: 1px solid #979798;*/
  }
  /*.model-b{*/
    /*position: absolute;*/
    /*!*width: 100%;*!*/
    /*!*height: 100%;*!*/
    /*z-index:20;*/
    /*background-color: #121214;*/
    /*overflow: hidden;*/
  /*}*/
  .modell{
    position: absolute;
    z-index:100;
    width: 12rem;
    height: 13rem;
    left:50%;
    top:50%;
    margin-top: -6.5rem;
    margin-left: -6rem;
    background-color: #F6F6F6;
    border-radius: 0.5rem;
  }
  .model-img img{
    width: 7rem;
    height: 8rem;
    margin-left: 2.5rem;
    margin-top: 1rem;
  }
  .model-text{
    font-size: 0.75rem;
    color:#000000;
    text-align: center;
  }
  .model-content{
    border-top: 1px solid #C9CBD1;
    margin-top: 0.5rem;
    height: 4rem;
    width: 100%;
  }
  .model-btn{
    width: 5rem;
    margin-left: 3.5rem;
    height: 1.5rem;
    border-radius: 1rem;
    background-color: #33B097;
    color: #ffffff;
    font-size: 0.7rem;
    margin-top: 0.5rem;
    text-align: center;
    line-height: 1.5rem;
  }
  .model-b{
    top:0;
    position: absolute;
    width: 100%;
    /*height: 100%;*/
    z-index:20;
    background-color: #000000;
    opacity: 0.7;
  }

</style>

