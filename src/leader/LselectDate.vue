<template>
  <div class="hello">
    <div class="select">
      <div class="s">
        <input type="text" id='picker' class="c" v-model="nowdate"/>
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


    <!--新增列表图表切换-->
    <!--<div class="listWrap" v-show="Lists">-->
      <!--<div class="list">-->
        <!--<div class="nav">-->
          <!--<div>年级</div>-->
          <!--<div class="score">-->
            <!--<div><p>优秀</p><p class="num">(90~100)</p></div>-->
            <!--<div><p>优良</p><p class="num">(80~100)</p></div>-->
            <!--<div><p>及格</p><p class="num">(60~100)</p></div>-->
          <!--</div>-->
          <!--<div class="eq">平均分</div>-->
        <!--</div>-->
        <!--<ul>-->
          <!--<li class="lists" v-for="(item,index,key) in result" @click="routerTo(result[index].gid)" :key="key">-->
            <!--<div><span> {{ result[index].gradename }} </span><span> ({{ result[index].grade_stu }}) </span></div>-->
            <!--<div class="score">-->
              <!--<div><span>{{ result[index].excellent }}</span>/<span>{{  result[index].excellent_rate }}</span></div>-->
              <!--<div><span>{{  result[index].well }}</span>/<span>{{  result[index].well_rate }}</span></div>-->
              <!--<div><span>{{  result[index].qualified }}</span>/<span>{{  result[index].qualified_rate }}</span></div>-->
            <!--</div>-->
            <!--<div class="eq">{{  result[index].avg_score }}</div>-->
          <!--</li>-->
        <!--</ul>-->
      <!--</div>-->
    <!--</div>-->
    <div class="pos">
      <div class="wrap"  v-show="Lists">
        <div class="listTopBar clearfix">

          <div class="gradeGroup">年级(人数)</div>
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
          <li class="listContent clearfix" v-for="(item,index,key) in result" @click="routerTo(result[index].gid,result[index].gradename)" :key="key">
            <div class="gradeGroup"><span>{{ result[index].gradename }}</span><span>({{ result[index].grade_stu }})</span></div>
            <div class="evelGroup">
          <span>
            <span>{{ result[index].excellent | lineFilter }}</span>  <span>{{  result[index].excellent_rate }}</span>
          </span>
              <span>
            <span>{{  result[index].well | lineFilter }}</span>    <span>{{  result[index].well_rate }}</span>
          </span>
              <span>
            <span>{{  result[index].qualified | lineFilter }}</span>  <span>{{  result[index].qualified_rate }}</span>
          </span>
            </div>
            <div class="averGroup">
              {{  result[index].avg_score }}
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!--**************************************************-->
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
  import $ from 'jquery'
  import api from '../fetch/api'
  import weui from '../assets/js/jquery-weui'
  import echarts from '../assets/js/echarts_l'
  import echartsh from '../assets/js/histogram_4'
  import int from '../assets/js/interface'
export default {
  name: 'hello',
  data () {
    return {
      num:0,
      week:'',
      alldate:['2017~2018学年 第一周','2017~2018学年 第二周','2017~2018学年 第三周','2017~2018学年 第四周','2017~2018学年 第五周','2017~2018学年 第六周',
        '2017~2018学年 第七周','2017~2018学年 第八周','2017~2018学年 第九周','2017~2018学年 第十周','2017~2018学年 第十一周','2017~2018学年 第十二周','2017~2018学年 第十三周','2017~2018学年 第十四周',
        '2017~2018学年 第十五周','2017~2018学年 第十六周','2017~2018学年 第十七周','2017~2018学年 第十八周','2017~2018学年 第十九周','2017~2018学年 第二十周','2017~2018学年 第二十一周','2017~2018学年 第二十二周','2017~2018学年 第二十三周'
,'2017~2018学年 第二十四周'
      ],
      show:false,
      text: "图表显示",
      chart: false,
      Lists: true,
      result: [
//      {
//        avg_score: "",
//        excellent: "",
//        excellent_rate: "",
//        gid: "",
//        grade_stu: "",
//        gradename: "",
//        qualified: "",
//        qualified_rate: "",
//        well: "",
//        well_rate: ""
//      }
      ]
    }
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
  computed:{
    nowdate(){
      var self=this;
//        var week=api.getweek();
      if(self.$store.state.d.count>0){
        if(self.$store.state.d.week || self.$store.state.d.week===0){
          self.week=self.$store.state.d.week;
          self.$store.state.d.count++;
        }else{
//          self.week=api.getweek();
          self.week=self.$store.state.d.weeks[self.$store.state.d.weeks.length-1];
          self.$store.state.d.count++;
//          self.$on('onn',function (msg) {
//            self.week=msg;
//          });
        }
      }else{
        self.$store.state.d.count++;
        self.week=self.$store.state.d.weeks[self.$store.state.d.weeks.length-1]-1;
//        self.$on('onn',function (msg) {
//          self.week=msg;
//        });

      }
      self.$store.state.d.week=self.week;
//      if(self.$route.params.id)
//      console.log(self.$route.params.id);
//      if()


      return self.alldate[self.week];
    }
  },
  mounted(){
    var hei=$(document).height();
    $('.model-b').css({height:hei+"px"});
    var self=this;
    var arr=[];
    for(var i=0;i<self.$store.state.d.weeks.length;i++){
      arr[i]=self.alldate[self.$store.state.d.weeks[i]-1];
    }
    /*var arr=self.alldate;*/
    var time='';
    if(self.$store.state.d.week===0){
      time=self.$store.state.d.week;
    }else
    if(self.$store.state.d.week){
      time=self.$store.state.d.week;
    }else{
//      time=api.getweek();
      time=self.$store.state.d.weeks[self.$store.state.d.weeks.length-1]-1;
    }

    /***********************/
    self.getlist(time);

    /***********************/
    self.getdata(time);
//    self.getweek(time);
//    self.$on('onn',function (msg) {
//      self.getdata(msg);
//    });
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
//        alert();
        for(var i=0;i<arr.length;i++){
          if($('#picker').val()==arr[i]){
//            alert(i+1);
//            self.$store.state.a.data.nowweek=i;
            self.getdata(self.$store.state.d.weeks[i]-1);
            self.getlist(self.$store.state.d.weeks[i]-1);
            self.$store.state.d.week=self.$store.state.d.weeks[i]-1;
            self.$store.state.d.count++;
          }
        }
      }
    });
//
  },
  methods:{

    close(){
      $('.modell').css({display:'none'});
      $('.model-b').css({display:'none'});
    },
    routerTo(gid,grade){
    	var self=this;
    	 localStorage.setItem('gradeName',grade)
    	self.$root.eventHub.$emit('Vloading',true)
      this.$router.push({ path: "/lsingle/" + gid})
    },
    toggle() {
      var self=this;
      if (self.text === "图表显示") {
        this.text = "列表显示";
//        self.chart = true;
        $('.chart').css({opacity:1});
        self.Lists = false;
        self.selectData(self.$store.state.d.basic);
      } else {
        self.text = "图表显示";
        self.Lists = true;
        $('.chart').css({opacity:0});
//        self.chart = false;
      }
    },
    godetails(){
      var self=this;
      self.$root.eventHub.$emit('Vloading',true)
      var arr=self.alldate;
      var  x=1;
      for(var i=0;i<arr.length;i++){
        if($('#picker').val()==arr[i]){
          x=i+1;
        }
      }
      self.$store.state.d.week=x-1;
      this.$router.push({path:'/lgeneral/'+x})
    },
    selectData(val){
      var self=this;
      var obj1 = document.getElementById("main");
      var gradeId=[],score=[],newProject=[];
//      for(var z=0;z<val.basic.score.length;z++){
//        if(val.basic.score[z]==0){
//
//        }else{
//          newArr.push(val.basic.score[z]);
//          newProject.push(val.basic.project[z].name);
//        }
//      }
      for(var i=0;i<val.basic.score.length;i++){
//        gradeId.push(i);
        newProject.push(val.basic.project[i].name);
        for(var j in val.basic.score[i]){
          gradeId.push(j);
          score.push(val.basic.score[i][j]);
        }
      }
      var time=setInterval(function () {
        if (score == null || score == '' || score == undefined || val.basic.project == null || val.basic.project == '' || val.basic.project == undefined) {
//        $('#main').css({opacity:0,zIndex:-10});
          $('.modell').css({display:'block'});
          $('.model-b').css({display:'block'});
          $('#mainh').css({display: 'none'});
          $('#mainw').css({display: 'block'});
          $('#main').css({display: 'none'});
          clearInterval(time);
        } else if (score.length < 3) {
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
        var x=score;
        var y='';
//          var id=gradeId;
//          alert(newProject);
        echartsh.initDataH(x,y,obj,a1,a2,a3,self,gradeId);
        clearInterval(time);
//        $('#main').css({opacity:1,zIndex:0});
//        var dataBJ = [score];
//        var indicatorData = val.basic.project;
//        echarts.initDataY(dataBJ,indicatorData,obj1,self,gradeId,score);
        } else {
//        $('#main').css({opacity:1,zIndex:0});
          $('#mainh').css({display: 'none'});
          $('#main').css({display: 'block'});
          $('#mainw').css({display: 'none'});
          var dataBJ = [score];
          var indicatorData = val.basic.project;
          echarts.initDataY(dataBJ, indicatorData, obj1, self, gradeId, score);
          clearInterval(time);
        }
//      if(score.length==0){
//        $('#mainh').css({display:'none'});
//        $('#main').css({display:'block'});
//        var obj1 = document.getElementById("main");
//        var dataBJ = [val.basic.score];
//        var indicatorData = val.basic.project;
//        echarts.initDataY(dataBJ,indicatorData,obj1,self,val.basic.score);
//        alert('本周未测试数据');
//        clearInterval(time);
//      }else
//      if(newArr.length<3){
//        $('#mainh').css({display:'block'});
//        $('#main').css({display:'none'});
//        var obj = document.getElementById("mainh");
////              var newproject=[];
////              for(var z=0;z<val.basic.score.length;z++){
////                newproject.push(val.basic.project[z].name);
////              }
//        var a1='';
//        var a2='';
//        var a3=newProject;
//        var x=newArr;
//        var y='';
//        echartsh.initDataH(x,y,obj,a1,a2,a3,self);
//        clearInterval(time);
//      }else{
//        $('#mainh').css({display:'none'});
//        $('#main').css({display:'block'});
//        var obj1 = document.getElementById("main");
//        var dataBJ = [val.basic.score];
//        var indicatorData = val.basic.project;
//        echarts.initDataY(dataBJ,indicatorData,obj1,self,val.basic.score);
//        clearInterval(time);
//      }
      },100)
    },
    getdata(index){
//      alert(index);
      var self=this;
      var week=index+1;
//      console.log(self.$store.state.b.basic.card);
      var val=self.$store.state.d.uid;
      var mainUrl=int.goLeader;
      var params={
//        card:'000001791887178',
        school_opens_time:self.$route.params.id,
        uid:self.$store.state.d.uid,
        weektime:week,
        proportion:self.$store.state.d.proportion
      };

//      this.$store.dispatch('storeMovieID',this.$route.params.ID);
      api.get_api_data(mainUrl,params,function(d){
      	self.$root.eventHub.$emit('Vloading',false)
        console.log(JSON.stringify(d));
        self.$store.state.d.basic=d;
        self.$store.state.d.uid=val;
        self.$store.state.d.sid=d.basic.sid;
        self.selectData(d);
//        alert(JSON.stringify(d));
      })
    },
    getlist(index){
      var self=this;
      $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: int.getleaderlist,
        data: {
          uid:self.$store.state.d.uid,
          school_opens_time: self.$route.params.id,
          weektime:index+1,
          proportion:self.$store.state.d.proportion
        },
        success: function(response) {
          self.result = response;
          console.log(response);
        },
        error: function(err) {
          console.log("err:" + err);
        }
      });
    }
//    ,
//    getweek(index){
//      var self=this;
//      var week=index+1;
//      var nArr=[];
////      console.log(self.$store.state.b.basic.card);
//      var val=self.$store.state.d.card;
//      var mainUrl=int.goLeader;
//      var params={
////        card:'000001791887178',
//        card:self.$store.state.d.card,
//        weektime:week
//      };
//
////      this.$store.dispatch('storeMovieID',this.$route.params.ID);
//      api.get_api_data(mainUrl,params,function(d){
//        for(var i=0;i<d.basic.score.length;i++){
//          if(d.basic.score[i]==0){
//          }else{
//            nArr.push(d.basic.score[i]);
//          }
//        }
//        if(nArr.length>0){
////          var time=setInterval(function () {
////            for(var i=0;i<d.basic.week.length;i++){
////              $('.picker-items-col-wrapper .picker-item').eq(d.basic.week[i]-1).css({color:'#FFCC00'});
////            }
////          },500);
//          self.num=index;
//          self.$emit('onn',self.num);
//          console.log('22222xxxx'+self.num);
//        }else{
//
//          self.num=index-1;
//          if(self.num<0){
//          }else{
//            self.getweek(self.num);
//          }
//
//          console.log('11111xxxx'+self.num);
//        }
//      })
//    }
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
    /*position: absolute;*/
    /*top:5rem;*/
    /*margin-left: 5%;*/
    /*width: 90%;*/
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
    /*padding: 0.8rem 0;*/
    /*border-bottom: 2px solid #ccc;*/
    /*color: #ccc;*/
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
  /*.list .nav .score .eq{*/
    /*color: #ccc;*/
  /*}*/
  /*.list .nav .score .num {*/
    /*font-size: 0.5rem;*/
    /*color: #848686;*/
  /*}*/

  /*.list .lists {*/
    /*display: flex;*/
    /*justify-content: space-between;*/
    /*align-items: center;*/
    /*font-size: 0.5rem;*/
    /*padding: 0.8rem 0;*/
    /*border-bottom: 2px solid #ccc;*/
    /*overflow-y: auto;*/
    /*cursor: pointer;*/
    /*color: #959595;*/
  /*}*/
  /*.list .lists > div {*/
    /*flex: 1;*/
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
  /*.list .lists .eq{*/
    /*color: #d6ad0b;*/
  /*}*/
  .togBtn {
    position: absolute;
    right: 5vw;
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
    overflow-x: hidden;
    padding-left: 5%;
  }

  .clearfix:after {
    content: '';
    display: block;
    clear: both;
  }

  /*topbar*/

  .listTopBar {
    padding: 1rem 5vw 0.7rem 5vw;
    border-bottom: 1px solid #222225;
  }

  .listTopBar>div {
    float: left;
  }

  .listTopBar .gradeGroup {
    width: 17vw;
  }

  .listTopBar .evelGroup {
    width: 50vw;
  }

  .listTopBar .averGroup {
    width: 13vw;
    text-align: right;
  }

  .listTopBar .evelGroup>span {
    float: left;
    width: 33.33%;
    text-align: center;
  }

  /*  content */

  .listContent {
    /*margin: 0 5vw;*/
    border-bottom: 1px solid #222225;
    list-style: none;
    padding: 1rem 5vw;
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
    width: 17vw;
    color: #c6c6c6;
  }

  .listContent .evelGroup {
    width: 50vw;
  }

  .listContent .averGroup {
    width: 13vw;
    text-align: right;
    color: #efc42d;
    padding-right: 10px;
  }
</style>
