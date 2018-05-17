<template>
  <div class="hello">
    <div class="select">
      <div class="s">
        <input type="text" id='picker' class="c"  v-model="nowdate"/>
        <!--<div class="r">-->
          <!--<img src="../assets/img/pull_pown.png" width="100%">-->
        <!--</div>-->
      </div>
    </div>
    <div class="chart" style="opacity: 0">
      <div id="main"></div>
      <div id="mainh" style="display: none;"></div>
      <div id="mainw" style="display: none;"></div>
    </div>

    <!--新增内容-->

    <!--<div class="listWrap" v-show="Lists">-->
      <!--<div class="list">-->
        <!--<div class="classesBar">-->
          <!--<span> {{Hinfo.classname}}  </span>-->
          <!--<span>  总人数 : {{Hinfo.class_stu}} </span>-->
          <!--<span>  达标率 : {{Hinfo.passrate}} </span>-->
        <!--</div>-->
        <!--<div class="nav">-->
          <!--<div>-->
            <!--项目-->
          <!--</div>-->
          <!--<div>-->
            <!--项目总人数-->
          <!--</div>-->
          <!--<div class="score">-->
            <!--<div><p>优秀</p><p class="num">(90~100)</p></div>-->
            <!--<div><p>优良</p><p class="num">(80~100)</p></div>-->
            <!--<div><p>及格</p><p class="num">(60~100)</p></div>-->
          <!--</div>-->
          <!--<div class="eq">平均分</div>-->
        <!--</div>-->
        <!--<ul>-->
          <!--<li class="lists" v-for="(item,index,key) in result" :key="key" @click="routerTo(result[index].projectid)">-->
            <!--<div>{{result[index].projectname}}</div>-->
            <!--<div>-->
              <!--<p>应测 {{ result[index].should_be_tested }}</p>-->
              <!--<p>实测 {{ result[index].real_test }}</p>-->
            <!--</div>-->
            <!--<div class="score">-->
              <!--<div><span> {{result[index].excellent}} </span>/<span class="num">  {{result[index].excellent_rate}} </span></div>-->
              <!--<div><span>  {{result[index].well}} </span>/<span class="num">  {{result[index].well_rate}} </span></div>-->
              <!--<div><span>  {{result[index].qualified}} </span>/<span class="num">  {{result[index].qualified_rate}} </span></div>-->
            <!--</div>-->
            <!--<div class="eq">{{result[index].avg}}</div>-->
          <!--</li>-->
        <!--</ul>-->
      <!--</div>-->
    <!--</div>-->
    <div class="pos">

      <div class="wrap"  v-show="Lists">
        <div class="andTop">
          <span>{{Hinfo.classname}}</span>
          <span style="text-align: center">班级总人数 : {{Hinfo.class_stu}}</span>
          <span style="text-align: right">及格率 : {{Hinfo.passrate}} </span>
        </div>
        <div class="listTopBar clearfix">

          <div class="gradeGroup">项目</div>
          <div class="renshu" style="margin-left:-0.4rem">总人数</div>
          <div class="evelGroup">
        <span>
          <p>优秀</p>
          <p style="color: #9D9D9E">90~120</p>
        </span>
            <span>
          <p>优良</p>
          <p style="color: #9D9D9E">80~120</p>
        </span>
            <span>
          <p>及格</p>
          <p style="color: #9D9D9E">60~120</p>
        </span>
          </div>
          <div class="averGroup">
            <span>平均分</span>
          </div>

        </div>



        <ul>
          <li class="listContent clearfix" v-for="(item,index,key) in result" @click="routerTo(result[index].projectid)" :key="key">
            <div class="gradeGroup"><span>{{result[index].projectname}}</span>
            </div>
            <div class="renshu">
              <p style="margin-top: -0.35rem">应测 {{ result[index].should_be_tested }}</p>
              <p>实测 {{ result[index].real_test }}</p>
            </div>
            <div class="evelGroup">
          <span>
            <span>{{result[index].excellent | lineFilter}}</span><span>{{result[index].excellent_rate}}</span>
          </span>
              <span>
            <span>{{result[index].well | lineFilter}}</span><span>{{result[index].well_rate}}</span>
          </span>
              <span>
            <span>{{result[index].qualified | lineFilter}}</span><span>{{result[index].qualified_rate}}</span>
          </span>
            </div>
            <div class="averGroup">
              {{result[index].avg}}
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="togBtn" v-text="text" @click="toggle()"></div>



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
  import echartsh from '../assets/js/histogram_3'
  import int from '../assets/js/interface'
  export default {
    name: 'hello',
    data () {
      return {
        msg: '',
        week:'',
//        nowdate:'',
        alldate:['2017~2018学年 第一周','2017~2018学年 第二周','2017~2018学年 第三周','2017~2018学年 第四周','2017~2018学年 第五周','2017~2018学年 第六周',
          '2017~2018学年 第七周','2017~2018学年 第八周','2017~2018学年 第九周','2017~2018学年 第十周','2017~2018学年 第十一周','2017~2018学年 第十二周','2017~2018学年 第十三周','2017~2018学年 第十四周',
          '2017~2018学年 第十五周','2017~2018学年 第十六周','2017~2018学年 第十七周','2017~2018学年 第十八周','2017~2018学年 第十九周','2017~2018学年 第二十周','2017~2018学年 第二十一周','2017~2018学年 第二十二周','2017~2018学年 第二十三周'
          ,'2017~2018学年 第二十四周'],
        text: "图表显示",
        chart: false,
        Lists: true,
        result: [
          {
            avg: "",
            excellent: "",
            excellent_rate: "",
            projectid: "",
            projectname: "",
            qualified: "",
            qualified_rate: "",
            real_test: "",
            should_be_tested: "",
            well: "",
            well_rate: ""
          }
        ],
        Hinfo: {
          classname: "",
          class_stu: "",
          passrate: ""
        }
      }
    },
    computed:{
      nowdate(){
        var self=this;
//        if(self.$store.state.c.week=='' && self.$store.state.d.week=='' && self.$store.state.c.week!=0 && self.$store.state.d.week!=0){
//          self.$store.state.c.week=self.$store.state.d.initweek;
//          self.$store.state.d.week=self.$store.state.d.initweek;
//          self.week=self.$store.state.d.initweek;
//          alert(1111);
//        }else{
//          if(self.$store.state.c.week===0 && self.$store.state.d.week===0 ){
//            self.week=0;
//            alert(2222);
//          }else
//           if(self.$store.state.c.week){
//            self.week=self.$store.state.c.week;
//             alert(333);
//          }else if(self.$store.state.d.week){
//            self.week=self.$store.state.d.week;
//             alert(444);
//          }else{
//            self.week=self.$store.state.d.initweek;
//             alert(555);
//          }
//        }
        if(self.$store.state.d.week!=0 || self.$store.state.d.week===0){
          self.week=self.$store.state.d.week;
//          alert(11111);
        }else if(self.$store.state.c.week!=0 || self.$store.state.c.week===0){
          self.week=self.$store.state.c.week;
//          alert(2222);
        }
        return self.alldate[self.week];
      }
    },
    created(){
      var self=this;
//      alert(self.$store.state.c.basic.proportion);
      var schooltime='';
      var proportion='';
      if(self.$store.state.d.week!=0 || self.$store.state.d.week===0){
        schooltime=self.$store.state.d.startTime;
        proportion=self.$store.state.d.proportion;
      }else if(self.$store.state.c.week!=0 || self.$store.state.c.week===0){
        schooltime=self.$store.state.c.startTime;
        proportion=self.$store.state.c.proportion;
      }
      var mainUrl_t=int.getweek;
      var params_t={
        uid:self.$route.params.id,
        school_opens_time: schooltime,
        proportion: proportion
      };
      api.get_api_data(mainUrl_t,params_t,function(d) {
      	 self.$root.eventHub.$emit('Vloading',false)
        if(self.$store.state.c.week===0 || self.$store.state.c.week!=0){
          self.$store.state.c.week_s.length=0;
          for(var i=0;i<d.length;i++){
            self.$store.state.c.week_s[i]=d[i];
            console.log(self.$store.state.c.week_s+'xxxxx'+i);
          }
        }
        else if(self.$store.state.d.week===0 || self.$store.state.d.week!=0) {
          self.$store.state.d.week__s.length=0;
          for(var i=0;i<d.length;i++){
            self.$store.state.d.week__s[i]=d[i];
          }
        }
      });
    },
    mounted(){
      var hei=$(document).height();
      $('.model-b').css({height:hei+"px"});
      var self=this;
//      alert(self.$store.state.c.week);
      var arr=[];
      setTimeout(function () {
        if(self.$store.state.c.week===0 || self.$store.state.c.week!=0){
          for(var i  in self.$store.state.c.week_s){
            arr[i]=self.alldate[self.$store.state.c.week_s[i]-1];
          }
        }else if(self.$store.state.d.week===0 || self.$store.state.d.week!=0){
          for(var i  in self.$store.state.d.week__s){
            arr.push(self.alldate[self.$store.state.d.week__s[i]-1]);
          }
        }
      },500);

      var time='';
      if(self.$store.state.c.week){
        time=self.$store.state.c.week;
      }
      else if(self.$store.state.d.week){
        time=self.$store.state.d.week;
      }else{
        time=api.getweek();
      }
      self.getdata(time);
      self.$store.state.b.basic.uid=self.$route.params.id;

      /*******************************/
      self.getlist(time);
      /*******************************/


      $("#picker").picker({
        title: "请选择周期",
        cols: [
          {
            textAlign: 'center',
            values: arr
          }
        ],
//      rotateEffect:true,
        onClose:function () {
          for(var i=0;i<arr.length;i++){
            if($('#picker').val()==arr[i]){

              if(self.$store.state.c.week===0 || self.$store.state.c.week!=0){
                self.getdata(self.$store.state.c.week_s[i]-1);
                self.getlist(self.$store.state.c.week_s[i]-1);
                self.$store.state.c.week=self.$store.state.c.week_s[i]-1;

              }else if(self.$store.state.d.week===0 || self.$store.state.d.week!=0){
                self.$store.state.d.week=self.$store.state.d.week__s[i]-1;
                self.getdata(self.$store.state.d.week__s[i]-1);
                self.getlist(self.$store.state.d.week__s[i]-1);
              }
              self.$store.state.b.week=i+1;
            }
          }
        }
      });
//      self.selectData(self.$store.state.b.basic);
    },
    filters:{
      lineFilter(val){
        if(val === 0){
          return val + "/"
        }
        if(val == undefined || val == ''){
          return ''
        }else{
          return val + '/'
        }
      }
    },
    methods:{
      /*路由跳转*/
      routerTo(gid) {
        this.$router.push({ path: "/ranklist/" + gid });
      },
      /* 显隐切换 */
      toggle() {
        var self=this;
        if (self.text === "图表显示") {
          self.text = "列表显示";
          self.selectData(self.$store.state.b.basic);
//          self.chart = true;
          $('.chart').css({opacity:1});
          self.Lists = false;
        } else {
          self.text = "图表显示";
          self.Lists = true;
          $('.chart').css({opacity:0});
//          self.chart = false;
        }
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
        self.$store.state.b.week=x;
        this.$router.push({path:'/general_details/'+x})
      },
      selectData(val){
      var self=this;
        var time=setInterval(function () {
          var newArr=[];
          var newProject=[];
          for(var z=0;z<val.basic.score.length;z++){
            if(val.basic.score[z]==0){

            }else{
              newArr.push(val.basic.score[z]);
              newProject.push(val.basic.project[z].name);
            }
          }
          if(newArr.length==0){
//            $('#mainh').css({display:'none'});
//            $('#main').css({display:'block'});
            $('.modell').css({display:'block'});
            $('.model-b').css({display:'block'});
// 旧       $('#main').css({opacity:0,zIndex:-10});
            $('#mainh').css({display: 'none'});
            $('#main').css({display: 'none'});
            $('#mainw').css({display: 'block'});
//            var obj1 = document.getElementById("main");
//            var dataBJ = [val.basic.score];
//            var indicatorData = val.basic.project;
//            echarts.initDataY(dataBJ,indicatorData,obj1,self,val.basic.score);
//            alert('本周未测试数据');
            clearInterval(time);
          }else
            if(newArr.length<3){
              $('#mainh').css({display:'block'});
              $('#main').css({display:'none'});
              $('#mainw').css({display: 'none'});
              var obj = document.getElementById("mainh");
//              var newproject=[];
//              for(var z=0;z<val.basic.score.length;z++){
//                newproject.push(val.basic.project[z].name);
//              }
              var a1='';
              var a2='';
              var a3=newProject;
              var x=newArr;
              var y='';
              echartsh.initDataH(x,y,obj,a1,a2,a3,self);
              clearInterval(time);
            }else{
              $('#mainh').css({display:'none'});
              $('#main').css({display:'block'});
              $('#mainw').css({display: 'none'});
              var obj1 = document.getElementById("main");
              var dataBJ = [val.basic.score];
              var indicatorData = val.basic.project;
              echarts.initDataY(dataBJ,indicatorData,obj1,self,val.basic.score);
              clearInterval(time);
            }
        },100)

      },
      close(){
        $('.modell').css({display:'none'});
        $('.model-b').css({display:'none'});
      },
      getdata(index){
        var self=this;
        var week=index+1;
//      console.log(self.$store.state.b.basic.card);
        var val=self.$route.params.id;
        var mainUrl=int.getheaderteacher;
        var schooltime='';
        var proportion='';
        if(self.$store.state.d.week!=0 || self.$store.state.d.week===0){
          schooltime=self.$store.state.d.startTime;
          proportion=self.$store.state.d.proportion;
        }else if(self.$store.state.c.week!=0 || self.$store.state.c.week===0){
          schooltime=self.$store.state.c.startTime;
          proportion=self.$store.state.c.proportion;
        }
        var params={
          school_opens_time: schooltime,
          uid:self.$route.params.id,
          weektime:week,
          proportion:proportion
        };

//      this.$store.dispatch('storeMovieID',this.$route.params.ID);
        api.get_api_data(mainUrl,params,function(d){
        	 self.$root.eventHub.$emit('Vloading',false)
          console.log(JSON.stringify(d));
          self.$store.state.b.basic=d;
          self.$store.state.b.basic.uid=val;
          self.selectData(d);
//          $('.picker-items-col-wrapper .picker-item').css({color:'#2E2E31'});
//          var time=setInterval(function () {
//            for(var i=0;i<d.basic.week.length;i++){
//              $('.picker-items-col-wrapper .picker-item').eq(d.basic.week[i]-1).css({color:'#FFCC00'});
//            }
//          },500);
//        alert(JSON.stringify(d));
        })
      },
      getlist(time){
        var self=this;
        var schooltime='';
        var proportion='';
        if(self.$store.state.d.week!=0 || self.$store.state.d.week===0){
          schooltime=self.$store.state.d.startTime;
          proportion=self.$store.state.d.proportion;
        }else if(self.$store.state.c.week!=0 || self.$store.state.c.week===0){
          schooltime=self.$store.state.c.startTime;
          proportion=self.$store.state.c.proportion;
        }
        $.ajax({
          type: "GET",
          dataType: "jsonp",
          url:int.getsportindexlist,
          data: {
            uid: self.$route.params.id,
            school_opens_time:schooltime,
            weektime: time+1,
            proportion:proportion
          },
          success: function(response) {
            self.result = response.data;
            self.Hinfo = response;
          },
          error: function(err) {
            console.log("err:" + err);
          }
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .hello{
    /*padding-top: 2rem;*/
    /*background-color: #000000;*/
    height: 20.5rem;
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
  .c{
    width: 100%;
    float: left;
    background: url('../assets/img/pull_pown.png') no-repeat;
    background-position:100% 0.1rem;
    height: 1.5rem;
    /*background-color: #2E2E31;*/
    /*line-height: 2rem;*/
    margin-top: 0.25rem;
    /*background-color: #2E2E31;*/
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
  /*List style*/
  /*.listWrap {*/
    /*width: 90%;*/
    /*position: absolute;*/
    /*top:5rem;*/
  /*}*/
  /*.list {*/
    /*overflow-y: auto;*/
    /*height: 15rem;*/
  /*}*/
  /*.list .eq {*/
    /*text-align: center;*/
  /*}*/
  /*.list .score > div {*/
    /*padding: 0 0.5rem;*/
  /*}*/
  /*.list .nav {*/
    /*display: flex;*/
    /*justify-content: space-between;*/
    /*align-items: center;*/
    /*font-size: 0.5rem;*/
    /*padding: 0.4rem 0;*/
    /*border-bottom: 1px solid #ccc;*/
    /*color: #ccc;*/
    /*margin-left: 5%;*/
  /*}*/
  /*.list .nav > div {*/
    /*flex: 1;*/
  /*}*/
  /*.list .nav .score {*/
    /*flex: 1;*/
    /*display: flex;*/
    /*justify-content: space-around;*/
    /*align-items: center;*/
    /*text-align: center;*/
  /*}*/
  /*.list .nav .score .eq {*/
    /*color: #ccc;*/
  /*}*/
  /*.list .nav .score .num {*/
    /*font-size: 0.4rem;*/
    /*color: #848686;*/
  /*}*/

  /*.list .lists {*/
    /*display: flex;*/
    /*justify-content: space-between;*/
    /*align-items: center;*/
    /*font-size: 0.5rem;*/
    /*padding: 0.4rem 0;*/
    /*border-bottom: 1px solid #ccc;*/
    /*overflow-y: auto;*/
    /*cursor: pointer;*/
    /*color: #959595;*/
    /*margin-left: 5%;*/
  /*}*/

  /*.list .lists .score {*/
    /*display: flex;*/
    /*justify-content: space-around;*/
    /*align-items: center;*/
    /*text-align: center;*/
    /*color: #ccc;*/
  /*}*/
  /*.list .lists .score .num {*/
    /*font-size: 0.5rem;*/
    /*color: #cbbcbb;*/
  /*}*/
  /*.list .lists .eq {*/
    /*color: #d6ad0b;*/
  /*}*/
  /*.classesBar {*/
     /*display: flex;*/
     /*justify-content: space-between;*/
     /*align-items: center;*/
     /*font-size: 0.5rem;*/
     /*padding: 0.8rem 0;*/
     /*border-bottom: 1px solid #ccc;*/
     /*color: #ccc;*/
   /*}*/
  .togBtn {
    position: absolute;
    right: 5%;
    top:18rem;
    color: #138760;
    cursor: pointer;
    /*padding: 0.5rem;*/
    font-size: 0.8rem;
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: 10px;
  }

  .pos{
    position: relative;

  }
  .wrap {
    color: #fff;
    position: absolute;
    top: -15rem;
    height: 13rem;
    overflow: auto;
    padding-left: 5%;
  }

  .clearfix:after {
    content: '';
    display: block;
    clear: both;
  }

  /*topbar*/

  .listTopBar {
    padding: 1rem 0vw 0.5rem 7vw;
    border-bottom: 2px solid rgb(31, 31, 33);
  }

  .listTopBar>div {
    float: left;
  }

  .listTopBar .gradeGroup {
    width: 13vw;
  }

  .listTopBar .evelGroup {
    width: 46vw;
  }

  .listTopBar .averGroup {
    width: 11vw;
    text-align: right;
  }

  .listTopBar .evelGroup>span {
    float: left;
    width: 33.33%;
    text-align: center;
    padding-right: 1vw;
  }

  /*  content */

  .listContent {
    border-bottom: 2px solid rgb(31, 31, 33);
    list-style: none;
    padding: 1rem 3vw;
    cursor: pointer;
  }

  .listContent>div {
    float: left;
  }

  .listContent .evelGroup>span {
    float: left;
    width: 33.33%;
    text-align: center;
  }

  .listContent .gradeGroup {
    width: 15vw;
    color: #c6c6c6;
  }
  .renshu{
    width: 14vw;
  }

  .listContent .evelGroup {
    width: 46vw;
  }

  .listContent .averGroup {
    width: 8vw;
    text-align: right;
    color: #efc42d;
  }
  .wrap .andTop{
    display: flex;
    justify-content: space-between;
    align-items: center;
    /*text-align: center;*/
    padding: 0.8rem 0;
    border-bottom: 1px solid #27272A;
    padding-left: 1rem;
    color: #9B9B9B;
    font-size: 1rem;
  }
  .wrap .andTop>span{
    flex:1;
  }
</style>
