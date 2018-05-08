<template>
  <transition name="slideIn">
    <div class="statistic">
      <div class="top">
        <div class="z" @click="goback">
          <img src="../assets/img/goback.png" height="100%">
        </div>
        <div class="c">数据统计</div>
      </div>
      <div class="select1">
        <div class="s">
          <div class="d1">
            <input type="text" id='picker1' class="ftime"  v-bind:value="starttime1"/>
            <div class="im">
              <img src="../assets/img/sdate.png" width="100%">
            </div>
          </div>
          <div class="d2">
            <img src="../assets/img/striping.png" width="100%">
          </div>
          <div class="d1">
            <input type="text" id='picker2' class="ftime"  v-bind:value="endtime1"/>
            <div class="im">
              <img src="../assets/img/sdate.png" width="100%">
            </div>
          </div>
        </div>
      </div>
      <div class="select2">
        <div class="s_l">
          <input type="text" id='pickern' class="s_c"  v-bind:value="initgrade"/>
          <div class="s_i">
            <img src="../assets/img/xl.png" width="100%">
          </div>
        </div>
        <div class="s_l">
          <input type="text" id='pickerc' class="s_c"  v-bind:value="initclass"/>
          <div class="s_i">
            <img src="../assets/img/xl.png" width="100%">
          </div>
        </div>
        <div class="s_l">
          <input type="text" id='pickerp' class="s_c"  v-bind:value="initproject"/>
          <div class="s_i">
            <img src="../assets/img/xl.png" width="100%">
          </div>
        </div>
      </div>
      <s_select v-if="show"></s_select>
      <ss_select v-else="show"></ss_select>
      <s_loading v-if="shows"></s_loading>
    </div>
  </transition>
</template>
<script>
  import loading from '@/assets/commont/loading1'
  import select from '@/leader/select'
  import select1 from '@/leader/select1'
  import api from '../fetch/api'
  import rotate from '@/assets/commont/rotate'
  import echarts2 from '../assets/js/histogram'
  import echarts from '../assets/js/echarts'
  import echarts1 from '../assets/js/lineChart'
  import $ from 'jquery'
  import weui from '../assets/js/jquery-weui'
  import int from '../assets/js/interface'
  export default{
    name:'statistic',
    data(){
      return{
        starttime1:'选择起始时间',
        endtime1:'选择结束时间',
        initgrade:'全部年级',
        initclass:'全部班级',
        initproject:'全部项目',
//        projectid:[],
//        allproject:[],
//        allgrade:[],
//        gradeid:[],
//        allclass:[],
//        classid:[],
        show:true,
        shows:true
      }
    },
    components:{
      m_rotate:rotate,
      s_select:select,
      ss_select:select1,
      s_loading:loading
    },

    mounted(){
      var self=this;
      var arr=['第一周', '第二周', '第三周', '第四周', '第五周', '第六周', '第七周', '第八周', '第九周', '第十周', '第十一周', '第十二周', '第十三周', '第十四周', '第十五周', '第十六周', '第十七周', '第十八周', '第十九周', '第二十周','第二十一周','第二十二周','第二十三周','第二十四'];

      console.log(self.$store.state.d.cid+"1"+self.$store.state.d.weekb+"2"+self.$store.state.d.weeke+"3"+self.$store.state.d.pid+"4"+self.$store.state.d.sgid);
      var num='',zz='',gg='',cc='',pp='';
      if(self.$store.state.d.num==1){
        num=self.$store.state.d.weekb;
        zz=self.$store.state.d.weeke;
        gg=self.$store.state.d.sgid;
        cc=self.$store.state.d.cid;
        pp=self.$store.state.d.pid;
        self.starttime1=arr[num-1];
        self.endtime1=arr[zz-1];
        for(var i=0;i<self.$store.state.d.gradeid.length;i++){
          if(gg==self.$store.state.d.gradeid[i]){
            self.initgrade=self.$store.state.d.allgrade[i];
          }
        }
        for(var j=0;j<self.$store.state.d.classid.length;j++){
          if(cc==self.$store.state.d.classid[j]){
            self.initclass=self.$store.state.d.allclass[j];
          }
        }
        for(var z=0;z<self.$store.state.d.projectid.length;z++){
          if(pp==self.$store.state.d.projectid[z]){
            self.initproject=self.$store.state.d.allproject[z];
          }
        }
      }else if(self.$store.state.d.num==0){
        self.getgrade();
        num=1;
        zz=self.$store.state.d.weeks[self.$store.state.d.weeks.length-1];
        gg='';
        cc='';
        pp='';
        self.starttime1='第一周';
        self.endtime1=arr[self.$store.state.d.weeks[self.$store.state.d.weeks.length-1]-1];
      }
      self.getdata(num,zz,gg,cc,pp);

      $("#picker1").picker({
        title: "请选择周期",
        cols: [
          {
            textAlign: 'center',
            values: arr
          }
        ],
//      rotateEffect:true,
        onClose:function () {
          self.starttime1='第一周';
          for(var i=0;i<arr.length;i++){
            if($('#picker1').val()==arr[i]){
              num=i+1;
              if(num>zz){
                alert('起始时间需小于结束时间');
              }else if(zz!=1){
                self.shows=true;
                self.getdata(num,zz,gg,cc,pp);
                self.starttime1=$('#picker1').val();
                self.endtime1=$('#picker2').val();
              }
            }
          }
        }
      });

      $("#picker2").picker({
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
          self.endtime1='第一周';
          for(var i=0;i<arr.length;i++){

            if($('#picker2').val()==arr[i]){
//              alert(num+'xxxxxx'+(i+1));
              self.shows=true;
              zz=i+1;
              self.getdata(num,zz,gg,cc,pp);
              self.starttime1=$('#picker1').val();
              self.endtime1=$('#picker2').val();
            }
          }
        }
      });

      $("#pickern").picker({
        title: "请选择年级",
        cols: [
          {
            textAlign: 'center',
            values: self.$store.state.d.allgrade
          }
        ],

//      rotateEffect:true,
        onClose:function () {
//        alert();
          self.shows=true;
          for(var i=0;i<self.$store.state.d.allgrade.length;i++){
            if($('#pickern').val()==self.$store.state.d.allgrade[i]){
              self.initgrade=$('#pickern').val();
              self.getclass(parseInt(self.$store.state.d.gradeid[i]));
              self.initclass='全部班级';
              self.initproject='全部项目';
              gg=self.$store.state.d.gradeid[i];
              cc='';
              pp='';
              self.getdata(num,zz,gg,cc,pp);
            }else if($('#pickern').val()=='全部年级'){
              gg='';
              cc='';
              pp='';
              self.getdata(num,zz,gg,cc,pp);
            }
          }
        }
      });

      $("#pickerc").picker({
        title: "请选择班级",
        cols: [
          {
            textAlign: 'center',
            values: self.$store.state.d.allclass
          }
        ],
//      rotateEffect:true,
        onClose:function () {
          if(self.class!='' || self.class!=null){
            for(var i=0;i<self.$store.state.d.allclass.length;i++){
              if($('#pickerc').val()==self.$store.state.d.allclass[i]){
                self.shows=true;
                self.initclass=$('#pickerc').val();
                cc=self.$store.state.d.classid[i];
                self.getdata(num,zz,gg,cc,pp);
              }else if($('#pickerc').val()=='全部班级'){
                self.shows=true;

                cc='';
                self.getdata(num,zz,gg,cc,pp);
              }
            }
          }
        }
      });

      $("#pickerp").picker({
        title: "请选择项目",
        cols: [
          {
            textAlign: 'center',
            values: self.$store.state.d.allproject
          }
        ],
//      rotateEffect:true,
        onClose:function () {
          self.shows=true;
          console.log(self.$store.state.d.allproject);
          for(var i=0;i<self.$store.state.d.allproject.length;i++){
            if($('#pickerp').val()==self.$store.state.d.allproject[i]){
              self.initproject=$('#pickerp').val();
              pp=self.$store.state.d.projectid[i];
              self.getdata(num,zz,gg,cc,pp);
            }else if($('#pickerp').val()=='全部项目'){
              pp='';
              self.getdata(num,zz,gg,cc,pp);
            }
          }
        }
      });
//      var h=$(window).height();
      // alert(h);
//      $('.statistic').css({height:h+'px',backgroundColor:'#1F1F21'});
    },
    methods:{
      goback(){
        this.$router.go(-1);
        this.$store.state.d.num=0;
      },
      selectdate(){

      },
      getgrade(){
        var self=this;
        var mainUrl=int.getproject;
        var params={
          school_opens_time:self.$store.state.d.startTime,
          sid:self.$store.state.d.sid,
          uid:self.$store.state.d.uid,
        };
        api.get_api_data(mainUrl,params,function(d){
          var len=d.statistics.taught_grade.length;
          for(var i=0;i<len;i++){
            for(var j in d.statistics.taught_grade[i]){
              self.$store.state.d.gradeid[i]=j;
              self.$store.state.d.allgrade[i]=d.statistics.taught_grade[i][j];
            }
          }
          var len1=d.statistics.school_pro.length;
          for(let m=0;m<len1;m++){
            for(let n in d.statistics.school_pro[m]){
              self.$store.state.d.projectid[m]=n;
              self.$store.state.d.allproject[m]=d.statistics.school_pro[m][n];
            }
          }
        })
      },
      getclass(val){
        var self=this;
        var mainUrl=int.getproject;
        var params={
          school_opens_time:self.$store.state.d.startTime,
          sid:self.$store.state.d.sid,
          uid:self.$store.state.d.uid
        };
        api.get_api_data(mainUrl,params,function(d){
          var len=d.statistics.taught_class.length;
          self.$store.state.d.allclass.length=0;
          for(let i=0;i<len;i++){
            for(let j in d.statistics.taught_class[i]){
              if(val==j){
                for(let m=0;m<d.statistics.taught_class[i][j].length;m++){
                  for(let n in d.statistics.taught_class[i][j][m]){
                    self.$store.state.d.classid[m]=n;
                    self.$store.state.d.allclass[m]=d.statistics.taught_class[i][j][m][n];
//                    alert(self.allclass[m]);
                  }
                }
              }
            }
          }

          var len1=d.statistics.each_project.length;
          self.$store.state.d.allproject.length=0;
          for(let i=0;i<len1;i++){
            for(let j in d.statistics.each_project[i]){
              if(val==j){
                for(let m=0;m<d.statistics.each_project[i][j].length;m++){
                  for(let n in d.statistics.each_project[i][j][m]){
                    self.$store.state.d.projectid[m]=n;
                    self.$store.state.d.allproject[m]=d.statistics.each_project[i][j][m][n];
                  }
                }
              }
            }
          }

        });
      },
//      getproject(val){
//        var self=this;
//        var mainUrl='http://112.74.100.48/index.php?m=content&f=leader&v=get_project';
//        var params={
//          sid:self.$store.state.d.sid,
//        };
//
//        api.get_api_data(mainUrl,params,function(d){
//
//
//        });
//      },
      getdata(b,e,g,c,p){
        var self=this;
        var mainUrl=int.getgrowup;
        var params={
          school_opens_time:self.$store.state.d.startTime,
          sid:self.$store.state.d.sid,
          weekbegin:b,
          weekend:e,
          gid:g,
          cid:c,
          projectid:p,
          uid:self.$store.state.d.uid
        };
        if(g!=''&&c!=''&&p!=''){
          self.show=false;
          self.$store.state.d.cid=c;
          self.$store.state.d.weekb=b;
          self.$store.state.d.weeke=e;
          self.$store.state.d.pid=p;
          self.$store.state.d.sgid=g;
          var classname=$('#pickerc').val();
          self.$store.state.d.classname=classname;
          api.get_api_data(mainUrl,params,function(d){
            self.$store.state.d.num=1;
            console.log(JSON.stringify(d));
            self.$store.state.d.single_statistics=d.statistics;
            self.$store.state.d.prate=d.statistics.standard;
            var obj = document.getElementById("h");
            var data1=d.statistics.class;
            var c=[];
            var g=[];
            for(var i=0;i<data1.length;i++){
              c[i]=data1[i].split('%')[0];
            }
            var data2=d.statistics.grade;
            for(var j=0;j<data2.length;j++){
              g[j]=data2[j].split('%')[0];
            }
            var a1='本班数值';
            var a2='年级数值';
            var a3=['不及格率', '及格率', '良好率', '优秀率'];
            echarts2.initDataH(c,g,obj,a1,a2,a3);
            self.shows=false;
          });
        }else{
          self.show=true;
          api.get_api_data(mainUrl,params,function(d){
            self.$store.state.d.statistics=d.statistics;
            if(self.$store.state.d.statistics.score==null || self.$store.state.d.statistics.score==''){
              alert('该项目暂未测试数据');
              self.shows=false;
            }else{
              var obj = document.getElementById("tz");
              var dataBJ = [self.$store.state.d.statistics.score];
              var indicatorData =self.$store.state.d.statistics.project;
              echarts.initDataY(dataBJ,indicatorData,obj,'',self.$store.state.d.statistics.score);
              var obj1 = document.getElementById("tzz");
              var data1=self.$store.state.d.statistics.linechartdata;
              var data2=[];
              var array=['第一周', '第二周', '第三周', '第四周', '第五周', '第六周', '第七周', '第八周', '第九周', '第十周', '第十一周', '第十二周', '第十三周', '第十四周', '第十五周', '第十六周', '第十七周', '第十八周', '第十九周', '第二十周','第二十一周','第二十二周','第二十周三'];
              var ar='';
              if(b==1 && e==1){
                ar=array;
              }else{
                ar=array.slice(b-1,e);
              }
              var a1='平均分';
              var a2='';
              var a3=['平均分',''];
              echarts1.initDataZ(data1,data2,obj1,ar,a1,a2,a3);
              self.shows=false;
            }
          });
        }
      }
    }
  }
</script>
<style scoped>
  .statistic{
    width: 100%;
    height: 100%;
  }
  .top{
    color: #ffffff;
    height: 2.5rem;
    line-height: 2.5rem;
    padding-left: 5%;
    padding-right: 5%;
    width: 90%;
    background-color: #2E2E31;
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
  .select1{
    width: 100%;
    height: 3rem;
    background-color: #1F1F21;
  }
  .s{
    width: 90%;
    margin-left: 5%;
    height: 3rem;
  }
  .d1{
    width: 42%;
    float: left;
    height: 2rem;
    margin-top: 0.5rem;
    border: 1px solid #5A5A5C;
  }
  .ftime{
    font-size: 0.8rem;
    line-height: 1.9rem;
    margin-left: 0.5rem;
    width: 70%;
    float: left;
    background-color: #1F1F21;
    outline: none;
    border: 0;
    color: #9B9B9B;
    font-weight: bold;
  }
  .im{
    width: 1rem;
    height: 1rem;
    margin-top:0.25rem;
    float:right;
    margin-right: 0.5rem;

  }
  .d2{
    width: 10%;
    margin-left: 2%;
    margin-right: 2.5%;
    float: left;
    margin-top: 0.75rem;
  }
  .select2{
    height: 2.5rem;
    width: 90%;
    padding-left: 5%;
    padding-right: 5%;
    background-color: #2E2E31;
  }
  .select2 .s_l{
    width: 33%;
    float: left;
    box-sizing: border-box;
    /*border-bottom: 1px solid #1F1F21;*/
  }
  .select2 .s_l .s_c{
    font-size: 0.6rem;
    width: 70%;
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
  .select2 .s_l .s_i{
    width: 20%;
    margin-top: 0.7rem;
    float: left;
    /*width: 1rem;*/
    height: 1rem;
  }

</style>
<style src="../assets/css/rotate.css">

</style>
