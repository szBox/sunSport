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

    <div class="pos">
      <div class="wrap"  v-show="Lists">
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
          <div class="averGroup">
            <span>平均分</span>
          </div>

        </div>



        <ul>
          <li class="listContent clearfix" v-for="(item,index,key) in result" @click="routerTo(result[index].uid)" :key="key">
            <div class="gradeGroup"><span>{{ result[index].classname }}</span><span>({{ result[index].class_stu }})</span></div>
            <div class="evelGroup">
          <span>
            <span>{{ result[index].excellent | lineFilter }}</span> <span>{{  result[index].excellent_rate }}</span>
          </span>
              <span>
            <span>{{  result[index].well | lineFilter }}</span> <span>{{  result[index].well_rate }}</span>
          </span>
              <span>
            <span>{{  result[index].qualified | lineFilter }}</span> <span>{{  result[index].qualified_rate }}</span>
          </span>
            </div>
            <div class="averGroup">
              {{  result[index].avg_score }}
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="togBtn" v-text="text" @click="toggle()"></div>
    <!--<v_model v-if="model"></v_model>-->
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
    <!--<div class="btn" @click="gogeneral">-->
      <!--查看详细数据-->
    <!--</div>-->
  </div>
</template>

<script>
  import model from '../assets/commont/model.vue'
  import api from '../fetch/api'
  import $ from 'jquery'
  import echarts from '../assets/js/echats_t'
  import echartsh from '../assets/js/histogram_5'
  import int from '../assets/js/interface'
export default {
  name: 'hello',
  data () {
    return {
      msg: '',
//      nowdate:'',
      week:'',
      alldate:['2017~2018学年 第一周','2017~2018学年 第二周','2017~2018学年 第三周','2017~2018学年 第四周','2017~2018学年 第五周','2017~2018学年 第六周',
        '2017~2018学年 第七周','2017~2018学年 第八周','2017~2018学年 第九周','2017~2018学年 第十周','2017~2018学年 第十一周','2017~2018学年 第十二周','2017~2018学年 第十三周','2017~2018学年 第十四周',
        '2017~2018学年 第十五周','2017~2018学年 第十六周','2017~2018学年 第十七周','2017~2018学年 第十八周','2017~2018学年 第十九周','2017~2018学年 第二十周','2017~2018学年 第二十一周','2017~2018学年 第二十二周','2017~2018学年 第二十三周'
        ,'2017~2018学年 第二十四周'],
      show:false,
      text: "图表显示",
      chart: false,
      Lists: true,
      result: [
        {
          avg_score: "",
          excellent: "",
          excellent_rate: "",
          gid: "",
          grade_stu: "",
          gradename: "",
          qualified: "",
          qualified_rate: "",
          well: "",
          well_rate: ""
        }
      ]
    }
  },
  components:{
    v_model:model
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
      if(self.$store.state.c.count>0){
        if(self.$store.state.c.week!=0 || self.$store.state.c.week===0){
          self.week=self.$store.state.c.week;
          self.$store.state.c.count++;

        }else{
//          self.week=api.getweek();
//          self.$store.state.c.count++;
//          self.$on('onn',function (msg) {
//            self.week=msg;
//          });
//          self.$store.state.c.week=self.$store.state.c.weeks[self.$store.state.c.weeks.length-1];
          self.week=self.$store.state.c.weeks[self.$store.state.c.weeks.length-1];

        }
      }else{
        self.$store.state.c.count++;
//        self.$on('onn',function (msg) {
//          self.week=msg;
//          self.$store.state.c.week=msg;
//        });
        self.$store.state.c.week=self.$store.state.c.weeks[self.$store.state.c.weeks.length-1]-1;
        self.week=self.$store.state.c.weeks[self.$store.state.c.weeks.length-1]-1;


      }
//      self.$store.state.c.week=self.$store.state.c.weeks[self.$store.state.c.weeks.length-1]-1;
      return self.alldate[self.week];
    }
  },
  mounted(){
    var self=this;
    var x=$(document).height();
    $('.model-b').css({height:x+"px"});
    var arr=[];
    for(var i=0;i<self.$store.state.c.weeks.length;i++){
      arr[i]=self.alldate[self.$store.state.c.weeks[i]-1];
    }
//    var arr=self.alldate;
    var time='';
//    alert(self.$store.state.c.week);
//    if(self.$store.state.c.week===0){
////      alert(111);
//      time=self.$store.state.c.week;
//      alert('4xxxx');
//    }else
//    if(self.$store.state.c.week){
////      alert(222)
//      time=self.$store.state.c.week;
//      alert('5xxxx');
//    }else{
////      alert(333)
////      time=api.getweek();
//
//      alert('6xxxx');
//    }
    if(self.$store.state.c.week===0 || self.$store.state.c.week!=0){
      time=self.$store.state.c.week;
    }else{
      time=self.$store.state.c.weeks[self.$store.state.c.weeks.length-1];
    }

    self.getdata(time);
    self.getlist(time);
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
//            alert(arr[i]);

            self.$store.state.c.week=self.$store.state.c.weeks[i]-1;
            self.getdata(self.$store.state.c.weeks[i]-1);
            self.getlist(self.$store.state.c.weeks[i]-1);
            self.$store.state.c.count++;
          }
        }
      }
    });
//    self.selectData(self.$store.state.c.basic);
//
//     var obj = document.getElementById("main");
//    var dataBJ = [[70,74,92,76,81,87,92]];
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
  methods:{
//    con(){
//      var self=this;
//      self.$root.event.$on('tao',function () {
//        alert(22222);
//      })
//    },
    routerTo(gid){
      this.$router.push({ path: "/single/" + gid})
    },
    toggle() {
      var self=this;
      if (self.text === "图表显示") {
        this.text = "列表显示";
//        self.chart = true;
        $('.chart').css({opacity:1});
        self.Lists = false;
        self.selectData(self.$store.state.c.basic);
      } else {
        self.text = "图表显示";
        self.Lists = true;
        $('.chart').css({opacity:0});
//        self.chart = false;
      }
    },
    close(){
      $('.modell').css({display:'none'});
      $('.model-b').css({display:'none'});
    },
    gogeneral(){
      this.$router.push({path:'/general'})
    },

    selectData(val){
//      var self=this;
//      var obj1 = document.getElementById("main");
//      if(self.$store.state.c.basic.score==''|| self.$store.state.c.basic.score==null){
//        alert('本周未测试数据');
//        $('#main').css({opacity:0,zIndex:-10})
//      }else{
//        $('#main').css({opacity:1,zIndex:0});
//        var dataBJ = [val.score];
//        var indicatorData = val.project;
//        var classid=val.classid;
//        echarts.initDataY(dataBJ,indicatorData,obj1,self,classid,val.score);
//      }
      var self=this;
//      var dataBJ=[];
//      var indicatorData=[];
      var newProject=[];
      var classid=val.classid;
      var obj1 = document.getElementById("main");
      var time=setInterval(function () {
        if(val.score==null || val.score == '' || val.score==undefined || val.project==null || val.project==''|| val.project==undefined){
//          alert('本周未测试数据');
          $('.modell').css({display:'block'});
          $('.model-b').css({display:'block'});
// 旧       $('#main').css({opacity:0,zIndex:-10});
          $('#mainh').css({display: 'none'});
          $('#main').css({display: 'none'});
          $('#mainw').css({display: 'block'});
          clearInterval(time);
        }else if(val.score.length<3){
          for(var i=0;i<val.score.length;i++){
            newProject.push(val.project[i].name);
          }
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
          $('#mainw').css({display: 'none'});
          var dataBJ = [val.score];
          var indicatorData = val.project;
          echarts.initDataY(dataBJ, indicatorData, obj1, self, classid, val.score);
          clearInterval(time);
        }
      },100);

    },
    getdata(index){
      var self=this;
      var week=index+1;
//      console.log(self.$store.state.b.basic.card);
      var val=self.$store.state.c.basic.uid;
      var mainUrl=int.getsport;
      var params={
//        card:'000001791887178',
        school_opens_time: self.$route.params.id,
        uid:self.$store.state.c.basic.uid,
        weektime:week
      };

//      this.$store.dispatch('storeMovieID',this.$route.params.ID);
      api.get_api_data(mainUrl,params,function(d){
        console.log(JSON.stringify(d));
        self.$store.state.c.basic=d;
        self.$store.state.c.basic.uid=val;
        self.selectData(d);
//        alert(JSON.stringify(d));
      })
    },
    getlist(index){
      var self=this;
      $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: int.getsportlist,
        data: {
          uid:self.$store.state.c.basic.uid,
          school_opens_time: self.$route.params.id,
          weektime:index+1
        },
        success: function(response) {
          self.result = response;
          console.log(response);
        },
        error: function(err) {
          console.log("err:" + err);
        }
      });
    },
    getweek(index){
      var self=this;
      var week=index+1;
      var nArr=[];
//      console.log(self.$store.state.b.basic.card);
      var val=self.$store.state.c.basic.uid;
      var mainUrl=int.getsport;
      var params={
//        card:'000001791887178',
        uid:self.$store.state.c.basic.uid,
        weektime:week
      };

//      this.$store.dispatch('storeMovieID',this.$route.params.ID);
      api.get_api_data(mainUrl,params,function(d){
//        console.log(d);
        if(d.score ==null || d.score== ''|| d.score==undefined){

        }else{
          for(var i=0;i<d.score.length;i++){
          console.log(d.score);
        }
          if(d.score[i]==0){

          }else{
            nArr.push(d.score[i]);
          }
        }
        if(nArr.length>0){
//          alert(nArr.length);
          self.num=index;
          self.$emit('onn',self.num);
//          var time=setInterval(function () {
//
//            for(var i=0;i<d.basic.week.length;i++){
//              $('.picker-items-col-wrapper .picker-item').eq(d.basic.week[i]-1).css({color:'#FFCC00'});
//            }
//          },500);
          console.log('22222xxxx'+self.num);
        }else{
          self.num=index-1;
          if(self.num<0){
          }else{
            self.getweek(self.num);
          }
          console.log('11111xxxx'+self.num);
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
    height: 18rem;
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

  /*.model img{*/
    /*width: ;*/
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
    padding: 1rem 5vw 0.7rem 5vw;
    border-bottom: 2px solid rgb(31, 31, 33);
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
    margin: 0 5vw;
    border-bottom: 2px solid rgb(31, 31, 33);
    list-style: none;
    padding: 1rem 0;
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
  }
</style>
