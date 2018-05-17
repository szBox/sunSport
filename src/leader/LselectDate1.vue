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
          <!--<span>  {{Hinfo.gradename}} </span>-->
          <!--<span>  年级总人数 : {{Hinfo.grade_stu}} </span>-->
          <!--<span>  达标率 : {{Hinfo.passrate}} </span>-->
        <!--</div>-->
        <!--<div class="nav">-->
          <!--<div>-->
            <!--班级-->
          <!--</div>-->
          <!--<div>-->
            <!--总人数-->
          <!--</div>-->
          <!--<div class="score">-->
            <!--<div><p>优秀</p><p class="num">(90~100)</p></div>-->
            <!--<div><p>优良</p><p class="num">(80~100)</p></div>-->
            <!--<div><p>及格</p><p class="num">(60~100)</p></div>-->
          <!--</div>-->
          <!--<div class="eq">平均分</div>-->
        <!--</div>-->
        <!--<ul>-->
          <!--<li class="lists" v-for="(item,index,key) in result" :key="key" @click="routerTo(result[index].card)">-->
            <!--<div>{{result[index].classname}}</div>-->
            <!--<div>  {{result[index].class_stu}}</div>-->
            <!--<div class="score">-->
              <!--<div><span> {{result[index].excellent}} </span>/<span class="num">  {{result[index].excellent_rate}} </span></div>-->
              <!--<div><span>  {{result[index].well}} </span>/<span class="num">  {{result[index].well_rate}} </span></div>-->
              <!--<div><span>  {{result[index].qualified}} </span>/<span class="num">  {{result[index].qualified_rate}} </span></div>-->
            <!--</div>-->
            <!--<div class="eq">{{result[index].avg_score}}</div>-->
          <!--</li>-->
        <!--</ul>-->
      <!--</div>-->
    <!--</div>-->
    <div class="pos">
      <div class="wrap"  v-show="Lists">
        <div class="andTop">
          <span style="text-align: left">{{Hinfo.gradename}}</span>
          <span style="text-align: center">年级总人数 : {{Hinfo.grade_stu}}</span>
          <span style="text-align: right">及格率 : {{Hinfo.passrate}}</span>
        </div>
        <div class="listTopBar clearfix">

          <div class="gradeGroup">班级(人数)</div>
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
          <div class="averGroup" >
            <span>平均分</span>
          </div>

        </div>



        <ul>
          <li class="listContent clearfix" v-for="(item,index,key) in result" @click="routerTo(result[index].uid)" :key="key">
            <div class="gradeGroup"><span>{{result[index].classname}}</span><span>({{result[index].class_stu}})</span></div>
            <div class="evelGroup">
          <span>
            <span>{{result[index].excellent | lineFilter}}</span> <span>{{result[index].excellent_rate}}</span>
          </span>
              <span>
            <span>{{result[index].well | lineFilter}}</span>  <span>{{result[index].well_rate}}</span>
          </span>
              <span>
            <span>{{result[index].qualified | lineFilter}}</span>  <span>{{result[index].qualified_rate}}</span>
          </span>
            </div>
            <div class="averGroup">
              {{result[index].avg_score}}
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="togBtn" v-text="text" @click="toggle()"></div>

    <!--以上-->

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
  import echarts from '../assets/js/echarts_2'
  import echartsh from '../assets/js/histogram_5'
  import int from '../assets/js/interface'
export default {
  name: 'hello',
  data () {
    return {
      nowdate:'',
      alldate:['2017~2018学年 第一周','2017~2018学年 第二周','2017~2018学年 第三周','2017~2018学年 第四周','2017~2018学年 第五周','2017~2018学年 第六周',
        '2017~2018学年 第七周','2017~2018学年 第八周','2017~2018学年 第九周','2017~2018学年 第十周','2017~2018学年 第十一周','2017~2018学年 第十二周','2017~2018学年 第十三周','2017~2018学年 第十四周',
        '2017~2018学年 第十五周','2017~2018学年 第十六周','2017~2018学年 第十七周','2017~2018学年 第十八周','2017~2018学年 第十九周','2017~2018学年 第二十周','2017~2018学年 第二十一周','2017~2018学年 第二十二周','2017~2018学年 第二十三周'
        ,'2017~2018学年 第二十四周'
      ],
      arr:[],
      text: "图表显示",
      chart: false,
      Lists: true,
      result: [
//      {
//        avg_score: "",
//        cid:"",
//        class_stu: "",
//        classname: "",
//        excellent: "",
//        excellent_rate: "",
//        qualified: "",
//        qualified_rate: "",
//        well: "",
//        well_rate: ""
//      }
      ],
      Hinfo : {
        classname:'',
        class_stu:'',
        passrate:''
      }
    };

  },
  created(){
    var self=this;
    var mainUrl_l=int.getweek;
    var params_l={
      school_opens_time:self.$store.state.d.startTime,
      gid:self.$route.params.id,
      sid:self.$store.state.d.sid,
      uid:self.$store.state.d.uid,
      proportion:self.$store.state.d.proportion
    };
    api.get_api_data(mainUrl_l,params_l,function(d) {
    	self.$root.eventHub.$emit('Vloading',false)
      self.$store.state.d.week_s.length=0;
      for(var i=0;i<d.length;i++){
        self.$store.state.d.week_s[i]=d[i];
      }
    });

  },
  mounted(){
    var self=this;
    var hei=$(document).height();
    $('.model-b').css({height:hei+"px"});
    var mainUrl_l=int.getweek;
    var params_l={
      school_opens_time:self.$store.state.d.startTime,
      gid:self.$route.params.id,
      sid:self.$store.state.d.sid,
      uid:self.$store.state.d.uid,
      proportion:self.$store.state.d.proportion
    };
    api.get_api_data(mainUrl_l,params_l,function(d) {
    	self.$root.eventHub.$emit('Vloading',false)
      for(var i=0;i<d.length;i++){
        self.arr.push(self.alldate[d[i]-1]);
      }
    });

//    alert(self.$store.state.d.week_s);
//    setTimeout(function () {
//      for(var i in self.$store.state.d.week_s){
//        arr.push(self.alldate[self.$store.state.d.week_s[i]-1]);
//      }
//    },500);
//    alert(arr+"ssssss");

//    var arr=self.alldate;
    var time=self.$store.state.d.week;
    if(self.$store.state.d.week===0 && self.$store.state.d.week!=0){
//      time=api.getweek();
      self.nowdate=self.alldate[time];
    }else{
      self.nowdate=self.alldate[time];
    }


    self.$store.state.d.gid=self.$route.params.id;
    self.getdata(time);
    /**********************/
    self.getlist(time);
    /**********************/

    $("#picker").picker({
      title: "请选择周期",
      cols: [
        {
          textAlign: 'center',
          values: self.arr
        }
      ],
//      rotateEffect:true,
      onClose:function () {
//        alert();
        for(var i=0;i<self.arr.length;i++){
          if($('#picker').val()==self.arr[i]){
            self.nowdate=self.arr[i];
//            alert(arr[i]);
            self.getdata(self.$store.state.d.week_s[i]-1);
            self.getlist(self.$store.state.d.week_s[i]-1);
            self.$store.state.d.week=self.$store.state.d.week_s[i]-1;
          }
        }
      }
    });
//



//     var obj = document.getElementById("main");
//    var dataBJ = [[90,71,93,76,81,87,92]];
//    var indicatorData = [
//      {name: "四年级一班",max: 150},
//      {name: '四年级二班',max: 150},
//      {name: '四年级三班',max: 150},
//      {name: '四年级四班',max: 150},
//      {name: '四年级五班',max: 150},
//      {name: '四年级六班',max: 150},
//      {name: '四年级七班',max: 150}
//    ];
//    echarts.initDataY(dataBJ,indicatorData,obj,self);
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
    close(){
      $('.modell').css({display:'none'});
      $('.model-b').css({display:'none'});
    },
    /*路由跳转*/
    routerTo(gid) {
    	var self=this;
    	 self.$root.eventHub.$emit('Vloading',true)
      this.$router.push({ path: "/single/" + gid });
    },
    /* 显隐切换 */
    toggle() {
      var self=this;
      if (self.text === "图表显示") {
        self.text = "列表显示";
        self.selectData(self.$store.state.d.single_grade_data);
        $('.chart').css({opacity:1});
//        self.chart = true;
        self.Lists = false;
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
      this.$router.push({path:'/lgeneral_grade/'+x})
    },
    selectData(val){
      var self=this;
//      var dataBJ=[];
//      var indicatorData=[];
      var newProject=[];
      var classid=val.tuid;
      var obj1 = document.getElementById("main");
      var time=setInterval(function () {
      if(val.score==null || val.score == '' || val.score==undefined || val.project==null || val.project==''|| val.project==undefined){
//        alert('本周未测试数据');
// 旧       $('#main').css({opacity:0,zIndex:-10});
        $('.modell').css({display:'block'});
        $('.model-b').css({display:'block'});
        $('#mainh').css({display: 'none'});
        $('#mainw').css({display: 'block'});
        $('#main').css({display: 'none'});
        clearInterval(time);
      }else if(val.score.length<3){
        for(var i=0;i<val.score.length;i++){
//        gradeId.push(i);
          newProject.push(val.project[i].name);
        }
        $('#mainh').css({display:'block'});
        $('#mainw').css({display:'none'});
        $('#main').css({display:'none'});
        var obj = document.getElementById("mainh");
//              var newproject=[];
//              for(var z=0;z<val.basic.score.length;z++){
//                newproject.push(val.basic.project[z].name);
//              }
        var a1='';
        var a2='';
        var a3=newProject;
        var x=val.score;
        var y='';
//          var id=gradeId;
//          alert(newProject);
        echartsh.initDataH(x,y,obj,a1,a2,a3,self,classid);
        clearInterval(time);
      }else{
        for(var i=0;i<val.score.length;i++){
//        gradeId.push(i);
          newProject.push(val.project[i].name);
        }
//        $('#main').css({opacity:1,zIndex:0});
//        dataBJ = [val.score];
//        indicatorData = val.project;
//        classid=val.classid;
        $('#mainh').css({display: 'none'});
        $('#main').css({display: 'block'});
        $('#mainw').css({display:'none'});
        var dataBJ = [val.score];
        var indicatorData = val.project;
        echarts.initDataY(dataBJ, indicatorData, obj1, self, classid, val.score);
        clearInterval(time);
        }
      },100);
//      echarts.initDataY(dataBJ,indicatorData,obj1,self,classid,val.score);
    },
    getdata(index){
      var self=this;
      var week=index+1;
//      console.log(self.$store.state.b.basic.card);
      var mainUrl=int.getGrade;
      var params={
//        card:'000001791887178',
        school_opens_time:self.$store.state.d.startTime,
        gid:self.$route.params.id,
        sid:self.$store.state.d.sid,
        weektime:week,
        uid:self.$store.state.d.uid,
        proportion:self.$store.state.d.proportion
      };

//      this.$store.dispatch('storeMovieID',this.$route.params.ID);
      api.get_api_data(mainUrl,params,function(d){
 			self.$root.eventHub.$emit('Vloading',false)
        self.$store.state.d.single_grade_data=d;
        self.selectData(d);

      })
    },
    getlist(time){
      var self=this;
      $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: int.getgradelist,
        data: {
          school_opens_time: self.$store.state.d.startTime,
          weektime:time+1,
          gid:self.$route.params.id,
          sid:self.$store.state.d.sid,
          uid:self.$store.state.d.uid,
          proportion:self.$store.state.d.proportion
        },
        success: function(response) {
          self.Hinfo = response;
          self.result = response.data;
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
    /*color: #ffffff;*/
    font-size: 0.8rem;
    outline: none;
    border: 0;
    color: #9B9B9B;
    font-weight: bold;
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
  /*!*List style*!*/
  /*.listWrap {*/
    /*width: 90%;*/
    /*position: absolute;*/
    /*top:5rem;*/
    /*!*margin-left: 5%;*!*/
    /*!*width: 90%;*!*/
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
  /*.classesBar{*/
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
    padding: 1rem 0vw 0.5rem 5vw;
    border-bottom: 2px solid rgb(31, 31, 33);
  }

  .listTopBar>div {
    float: left;
  }

  .listTopBar .gradeGroup {
    width: 21vw;
  }

  .listTopBar .evelGroup {
    width: 50vw;
  }

  .listTopBar .averGroup {
    width: 10vw;
    text-align: right;
  }

  .listTopBar .evelGroup>span {
    float: left;
    width: 33.33%;
    text-align: center;
  }

  /*  content */

  .listContent {
    margin: 0 5vw;
    border-bottom: 2px solid rgb(31, 31, 33);
    list-style: none;
    padding: 1rem 0rem;
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
    width: 21vw;
    color: #c6c6c6;
  }

  .listContent .evelGroup {
    width: 50vw;
  }

  .listContent .averGroup {
    width: 10vw;
    text-align: right;
    color: #efc42d;
  }
  .wrap .andTop{
    display: flex;
    justify-content: space-between;
    align-items: center;
    /*text-align: center;*/
    color:#9B9B9B;
    font-size: 1rem;
    padding: 0.8rem 0;
    border-bottom: 2px solid rgb(31, 31, 33);
    padding-left: 1rem;
  }
  .wrap .andTop>span{
    flex:1;
  }


</style>
