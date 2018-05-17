<template>
  <transition name="slideIn">
  <div class="ranking">
    <div class="ran_top">
      <div class="ran_z" @click="goback">
        <img src="../assets/img/goback.png" height="100%">
      </div>
      <div class="ran_c">{{nowname}}</div>
    </div>
    <!--<div class="ran_select">-->
      <!--<div class="ran_s">-->
        <!--<input type="text" data-toggle='date' class="ran_c1" id="my-input" v-bind:value="nowdate"/>-->
        <!--&lt;!&ndash;<input type="text" id='datetime-picker' class="ran_c1" v-model="nowdate"/>&ndash;&gt;-->
        <!--<div class="ran_r">-->
          <!--<img src="../assets/img/pull_pown.png" width="100%">-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
    <div class="ran_select2">
      <div class="s_l">
        <input type="text" id='my-input' class="s_c"  v-bind:value="nowdate"/>
        <div class="s_i">
          <img src="../assets/img/xl.png" width="100%">
        </div>
      </div>
      <div class="s_l">
        <input type="text" id='my-input1' class="s_c"  v-bind:value="nowdate1"/>
        <div class="s_i">
          <img src="../assets/img/xl.png" width="100%">
        </div>
      </div>
    </div>
    <div class="s_n">
      <input type="text" id='pickerp' class="s_c"  v-bind:value="initgrade"/>
      <!--<div class="s_i">-->
        <!--<img src="../assets/img/xl.png" width="100%">-->
      <!--</div>-->
    </div>
    <div class="s_n">
      <input type="text" id='pickerx' class="s_c"  v-bind:value="initproject"/>
      <!--<div class="s_i">-->
      <!--<img src="../assets/img/xl.png" width="100%">-->
      <!--</div>-->
    </div>
    <div class="s_n">
      <input type="text" id='pickers' class="s_c"  v-bind:value="initsex"/>
      <!--<div class="s_i">-->
      <!--<img src="../assets/img/xl.png" width="100%">-->
      <!--</div>-->
    </div>
    <div class="s_n">
      <input type="text" id='pickeri' class="s_c"  v-bind:value="initstandard"/>
      <!--<div class="s_i">-->
      <!--<img src="../assets/img/xl.png" width="100%">-->
      <!--</div>-->
    </div>
    <div class="ran_li">
      <ul>
        <li>
          <div class="ran_name">排名</div>
          <div class="ran_zhi">姓名</div>
          <div class="ran_fenshu">班级</div>
          <div class="ran_sex">成绩</div>
          <!--<div class="ran_paiming">分数</div>-->
        </li>
        <li v-for="i in list">
          <div class="ran_name">{{i.rank}}</div>
          <div class="ran_zhi">{{i.name}}</div>
          <div class="ran_fenshu">{{i.classname}}</div>
          <div class="ran_sex">{{i.result}}</div>
          <!--<div class="ran_paiming">{{i.bak2}}</div>-->
        </li>
      </ul>
    </div>
    <div class="ran_btn0" @click="daochu">导出</div>
    <div class="ran_btn1" @click="daoru">导入</div>
    <div class="ran_btn2" @click="gosubmit">提交</div>
    <v_load v-if="show1"></v_load>
  </div>
  </transition>
</template>
<script>
  import load from '@/assets/commont/loading'
  import api from '../fetch/api'
  import $ from 'jquery'
  import weui from '../assets/js/jquery-weui'
  import int from '../assets/js/interface'
  export default{
    name:'ramking',
    data(){
      return{
        show1:false,
        list:'',
        nowdate:this.now(),
        nowdate1:this.now1(),
        initgrade:'全部年级',
        grade:['全部年级','一年级','二年级','三年级','四年级','五年级','六年级','七年级','八年级','九年级'],
        initproject:'全部项目',
        project:['全部项目','200米','800米','1000米','跳绳','肺活量','立定跳远','引体向上','1分钟仰卧起坐','50米跑','坐位体前屈','身高体重'],
        initsex:'性别',
        sex:['性别','男','女'],
        initstandard:'默认标准',
        standard:['默认标准','中考标准','体质标准']
//        time:'2017-11-13 13:00'
      }
    },
    components:{
//      m_rotate:rotate,
      v_load:load
    },
    mounted(){
      var self=this;
      var date1=self.nowdate;
      var date2=self.nowdate1;
      var grade='';
      var project='';
      var sex='';
//      var hh=$(window).height();
//      var zz=$('html').css('fontSize').split('p')[0]*9.5;
//      var mm=hh-zz;
//      // alert(z);
//      $('.ran_li').css({height:m+'px'});
//      $("#datetime-picker").datetimePicker();
      $("#my-input").datetimePicker({
        title:'请选择起始时间',
        cols: [
          {
            datetimeSplit:'-',
            monthSplit:'-',
            dateSplit:' ',
            textAlign: 'center'
//            values: '2017-10-26 13:11'
          }
        ],

        onChange(p,value){
          date1=value[0]+"-"+value[1]+"-"+value[2]+" "+value[3]+":"+value[4];
          var d=new Date(date1);
          var d1=new Date(date2);
          var x=d.getTime();
          var y=d1.getTime();
          if(x<y){
            self.getdata(date1,date2,grade);
            self.nowdate=value[0]+"-"+value[1]+"-"+value[2]+" "+value[3]+":"+value[4];
            self.nowdate1=date2;
          }else{
            console.log('起始时间大于结束时间')
          }
        }

      });
      $("#my-input1").datetimePicker({
        title:'请选择结束时间',
        cols: [
          {
            datetimeSplit:'-',
            monthSplit:'-',
            dateSplit:' ',
            textAlign: 'center'
//            values: '2017-10-26 13:11'
          }
        ],
        onChange(p,value){
          date2=value[0]+"-"+value[1]+"-"+value[2]+" "+value[3]+":"+value[4];
          var d=new Date(date1);
          var d1=new Date(date2);
          var x=d.getTime();
          var y=d1.getTime();
          if(x<y){
            self.getdata(date1,date2,grade);
            self.nowdate1=value[0]+"-"+value[1]+"-"+value[2]+" "+value[3]+":"+value[4];
            self.nowdate=date1;
          }else{
            console.log('起始时间需小于结束时间')
          }
        }
      });

      $("#pickerp").picker({
        title: "请选择年级",
        cols: [
          {
            textAlign: 'center',
            values: self.grade
          }
        ],

//      rotateEffect:true,
        onClose:function () {
//          self.shows=true;
//          console.log(self.$store.state.d.allproject);
          for(var i=0;i<self.grade.length;i++){
            if($('#pickerp').val()==self.grade[i]){
              if(i==0){
                grade='';
                self.getdata(date1,date2,grade);
                self.initgrade='全部年级';
                self.nowdate=date1;
                self.nowdate1=date2;
              }else if(i==1){
                grade=1;
                self.getdata(date1,date2,grade);
                self.initgrade='一年级';
                self.nowdate=date1;
                self.nowdate1=date2;
              }else if(i==2){
                grade=2;
                self.getdata(date1,date2,grade);
                self.initgrade='二年级';
                self.nowdate=date1;
                self.nowdate1=date2;
              }else if(i==3){
                grade=3;
                self.getdata(date1,date2,grade);
                self.initgrade='三年级';
                self.nowdate=date1;
                self.nowdate1=date2;
              }else if(i==4){
                grade=4;
                self.getdata(date1,date2,grade);
                self.initgrade='四年级';
                self.nowdate=date1;
                self.nowdate1=date2;
              }else if(i==5){
                grade=5;
                self.getdata(date1,date2,grade);
                self.initgrade='五年级';
                self.nowdate=date1;
                self.nowdate1=date2;
              }else if(i==6){
                grade=6;
                self.getdata(date1,date2,grade);
                self.initgrade='六年级';
                self.nowdate=date1;
                self.nowdate1=date2;
              }else if(i==7){
                grade=7;
                self.getdata(date1,date2,grade);
                self.initgrade='七年级';
                self.nowdate=date1;
                self.nowdate1=date2;
              }else if(i==8){
                grade=9;
                self.getdata(date1,date2,grade);
                self.initgrade='八年级';
                self.nowdate=date1;
                self.nowdate1=date2;
              }else if(i==9){
                grade=10;
                self.getdata(date1,date2,grade);
                self.initgrade='九年级';
                self.nowdate=date1;
                self.nowdate1=date2;
              }
            }
          }
        }
      });
      $("#pickerx").picker({
        title: "请选择项目",
        cols: [
          {
            textAlign: 'center',
            values: self.project
          }
        ],

//      rotateEffect:true,
        onClose:function () {
//          self.shows=true;
//          console.log(self.$store.state.d.allproject);
          for(var i=0;i<self.project.length;i++){
            if($('#pickerx').val()==self.project[i]) {
              self.initproject=self.project[i];
//              if ($('#pickerx').val() == '200米') {
////                project = 11;
////                self.nowdate = date1;
////                self.nowdate1 = date2;
////                self.initgrade=grade;
//                self.initproject = '200米';
//              } else if ($('#pickerx').val() == '800米') {
//                self.nowdate = date1;
//                self.nowdate1 = date2;
////                self.initgrade=grade;
//                self.initproject = '800米';
//                project = 10;
//              } else if ($('#pickerx').val() == '1000米') {
//                self.nowdate = date1;
//                self.nowdate1 = date2;
////                self.initgrade=grade;
//                self.initproject = '1000米';
//                project = 9;
//              } else if ($('#pickerx').val() == '跳绳') {
//                self.nowdate = date1;
//                self.nowdate1 = date2;
////                self.initgrade=grade;
//                self.initproject = '跳绳';
//                project = 22;
////              self.daochu(date1,date2,grade,project,sex);
//              }
            }
          }
        }
      });

      $("#pickers").picker({
        title: "请选择性别",
        cols: [
          {
            textAlign: 'center',
            values: self.sex
          }
        ],

//      rotateEffect:true,
        onClose:function () {
//          self.shows=true;
//          console.log(self.$store.state.d.allproject);
          for(var i=0;i<self.sex.length;i++){
            if($('#pickers').val()==self.sex[i]){
              self.initsex=self.sex[i];
//              if($('#pickers').val()=='男'){
//                self.nowdate=date1;
//                self.nowdate1=date2;
////                self.initgrade=grade;
////                self.initgrade=project;
//                self.initsex='男';
//                sex='男';
////                self.daochu(date1,date2,grade,project,sex);
//              }else if($('#pickers').val()=='女'){
//                self.nowdate=date1;
//                self.nowdate1=date2;
////                self.initgrade=grade;
////                self.initgrade=project;
//                self.initsex='女';
//                sex='女';
////                self.daochu(date1,date2,grade,project,sex);
//              }else if($('#pickers').val()=='性别'){
//                self.nowdate=date1;
//                self.nowdate1=date2;
////                self.initgrade=grade;
////                self.initgrade=project;
//                self.initsex='性别';
//                sex='';
////                self.daochu(date1,date2,grade,project,sex);
//              }
            }

          }
        }
      });
      $("#pickeri").picker({
        title: "请选择评分标准",
        cols: [
          {
            textAlign: 'center',
            values: self.standard
          }
        ],

//      rotateEffect:true,
        onClose:function () {
//          self.shows=true;
//          console.log(self.$store.state.d.allproject);
          for(var i=0;i<self.standard.length;i++){
            if($('#pickeri').val()==self.standard[i]){
              self.initstandard=self.standard[i];
//              if($('#pickers').val()=='男'){
//                self.nowdate=date1;
//                self.nowdate1=date2;
////                self.initgrade=grade;
////                self.initgrade=project;
//                self.initsex='男';
//                sex='男';
////                self.daochu(date1,date2,grade,project,sex);
//              }else if($('#pickers').val()=='女'){
//                self.nowdate=date1;
//                self.nowdate1=date2;
////                self.initgrade=grade;
////                self.initgrade=project;
//                self.initsex='女';
//                sex='女';
////                self.daochu(date1,date2,grade,project,sex);
//              }else if($('#pickers').val()=='性别'){
//                self.nowdate=date1;
//                self.nowdate1=date2;
////                self.initgrade=grade;
////                self.initgrade=project;
//                self.initsex='性别';
//                sex='';
////                self.daochu(date1,date2,grade,project,sex);
//              }
            }

          }
        }
      });


      var dt=new Date();
      var mo='';
      var dy='';
//      if((dt.getMonth()+1)<10){
//        mo='0'+dt.getMonth();
//      }else{
//        mo=dt.getMonth()+1;
//      }
      if((dt.getMonth()+1)==1){
        mo='0'+(dt.getMonth()+1);
      }else
      if((dt.getMonth()+1)<10){
        mo='0'+(dt.getMonth()+1);
      }else{
        mo=dt.getMonth()+1;
      }



      if(dt.getDate()<10){
        dy='0'+dt.getDate();
      }else{
        dy=dt.getDate();
      }
      var starttime=dt.getFullYear()+"-"+mo+"-"+dy+" 00:00";
      var endtime=dt.getFullYear()+"-"+mo+"-"+dy+" 23:59";
      self.getdata(starttime,endtime,'');



      var h=$(window).height();
      $('.ranking').css({height:h+'px'});
      var z=$('html').css('fontSize').split('p')[0]*9.5;
      var m=h-z;
      $('.ran_li').css({height:m+'px'});
    },
    computed:{
      nowname(){
        return this.$store.state.b.projectname;
      }
    },
    methods:{
      now(){
        var dt=new Date();
        console.log(dt.getMonth());
        var mo='';
        var dy='';
        if((dt.getMonth()+1)==1){
          mo='0'+(dt.getMonth()+1);
        }else
        if((dt.getMonth()+1)<10){
          mo='0'+(dt.getMonth()+1);
        }else{
          mo=dt.getMonth()+1;
        }
        if(dt.getDate()<10){
          dy='0'+dt.getDate();
        }else{
          dy=dt.getDate();
        }
        return dt.getFullYear()+"-"+mo+"-"+dy+" 00:00";
//        var endtime=dt.getFullYear()+"-"+mo+"-"+dy+" 23:59";
//        var date=new Date();
//        var month='';
//        var day='';
//        var minute='';
//        var hours='';
//        if((date.getMonth()+1)<10){
//          month='0'+date.getMonth();
//        }else{
//          month=date.getMonth()+1;
//        }
//        if(date.getDate()<10){
//          day='0'+date.getDate();
//        }else{
//          day=date.getDate();
//        }
//        if(date.getHours()<10){
//          hours='0'+date.getHours();
//        }else{
//          hours=date.getHours();
//        }
//        if(date.getMinutes()<10){
//          minute='0'+date.getMinutes();
//        }else{
//          minute=date.getMinutes();
//        }
//        return date.getFullYear()+"-"+month+'-'+day+" "+date.getHours()+":"+minute
      },
      now1(){
        var dt = new Date();
        var mo = '';
        var dy = '';
        if((dt.getMonth()+1)==1){
          mo='0'+(dt.getMonth()+1);
        }else
        if((dt.getMonth()+1)<10){
          mo='0'+(dt.getMonth()+1);
        }else{
          mo=dt.getMonth()+1;
        }
        if (dt.getDate() < 10) {
          dy = '0' + dt.getDate();
        } else {
          dy = dt.getDate();
        }
//        var starttime = dt.getFullYear() + "-" + mo + "-" + dy + " 00:00";
        return dt.getFullYear() + "-" + mo + "-" + dy + " 23:59";
      },
      goback(){
        this.$router.go(-1);
      },
      gosubmit(){
        this.$router.push({path:'/submit'});
      },
      daoru(){
        this.$router.push({path:'/import'});
      },
      getdata(start,end,grade){
        var self=this;
        var mainUrl=int.getranking;
        var params={
          sid:window.iosParams.sid,
          begintime:start+':00',
          endtime:end+':00',
          projectid:self.$route.params.id,
          uid:self.$store.state.b.cid,
          gid:grade,
          proportion:self.$store.state.b.proportion
        };
        api.get_api_data(mainUrl,params,function(d){
//          self.show1=false;
          self.list=d;
          console.log(JSON.stringify(d));
        })
      },
      daochu(){
//        nowdate:this.now(),
//          nowdate1:this.now1(),
//          initgrade:'全部年级',
//          grade:['全部年级','七年级','八年级','九年级'],
//          initproject:'全部项目',
//          project:['全部项目','200米','800米','1000米','跳绳'],
//          initsex:'性别',
//          sex:['性别','男','女'],
        var self=this;
        var start=self.nowdate;
        var end=self.nowdate1;
        var grade=self.initgrade;
        var project=self.initproject;
        var sex=self.initsex;
        var stand=self.initstandard;
        if(grade=='全部年级'){
          grade='';
        }else if(grade=='一年级'){
          grade=1;
        }else if(grade=='二年级'){
          grade=2;
        }else if(grade=='三年级'){
          grade=3;
        }else if(grade=='四年级'){
          grade=4;
        }else if(grade=='五年级'){
          grade=5;
        }else if(grade=='六年级'){
          grade=6;
        }else if(grade=='七年级'){
          grade=7;
        }else if(grade=='八年级'){
          grade=9;
        }else if(grade=='九年级'){
          grade=10;
        }
        if(sex=='男'){
          sex='男';
        }else if(sex=='女'){
          sex='女';
        }else if(sex=='性别'){
          sex='';
        }
        if(stand=='中考标准'){
          stand=1;
        }else if(stand=='体质标准'){
          stand=2;
        }else if(stand=='默认标准'){
          stand='';
        }


        if(project=='身高体重'){
         window.location.href=int.host+'/PHPExcel/Examples/download_bmi.php?gid='+grade+'&sex='+sex+'&sid='+window.iosParams.sid;
//          window.location.href=int.host+'/PHPExcel/Examples/download_xlsx.php?begintime='+start+":00"+'&endtime='+end+":00"+'&projectid='+project+'&sex='+sex+'&gid='+grade+"&sid="+window.iosParams.sid;
        }else{

          if(project=='全部项目'){
            project='';
          }else if(project=='200米'){
            project=11;
          }else if(project=='800米'){
            project=10;
          }else if(project=='1000米'){
            project=9;
          }else if(project=='肺活量'){
            project=2;
          }else if(project=='立定跳远'){
            project=6;
          }else if(project=='引体向上'){
            project=7;
          }else if(project=='1分钟仰卧起坐'){
            project=8;
          }else if(project=='跳绳'){
            project=22;
          }else if(project=='50米跑'){
            project=24;
          }else if(project=='坐位体前屈'){
            project=25;
          }
          window.location.href=int.host+'/PHPExcel/Examples/download_xlsx.php?begintime='+start+":00"+'&endtime='+end+":00"+'&projectid='+project+'&sex='+sex+'&gid='+grade+'&bmi='+stand+'&sid='+window.iosParams.sid;
//        api.get_api_data(mainUrl,params,function(d){
////          self.show1=false;
////          self.list=d;ss
//          console.log(JSON.stringify(d));
//        })
          console.log(int.host+'/PHPExcel/Examples/download_xlsx.php?begintime='+start+":00"+'&endtime='+end+":00"+'&projectid='+project+'&sex'+sex+'&gid'+grade);
        }
      }

    }
  }
</script>
<style>
  .ranking{
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
    width: 30%;
    /*color: #FAC802;*/
  }
  .ran_li li .ran_fenshu{
    float: left;
    width: 25%;
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
  .ran_btn0{
    width: 25%;
    left:6.25%;
    position: fixed;
    bottom: 0.5rem;
    height: 2rem;
    line-height: 2rem;
    background-color: red;
    border-radius: 0.25rem;
    text-align: center;
    color: #ffffff;
    font-size: 0.8rem;
  }
  /*.ran_btn2{*/
    /*width: 25%;*/
    /*left:3%;*/
    /*position: fixed;*/
    /*bottom: 0.5rem;*/
    /*height: 2rem;*/
    /*line-height: 2rem;*/
    /*background-color:silver;*/
    /*border-radius: 0.25rem;*/
    /*text-align: center;*/
    /*color: #ffffff;*/
    /*font-size: 0.8rem;*/
  /*}*/
  .ran_btn1{
    width: 25%;
    left:37.5%;
    position: fixed;
    bottom: 0.5rem;
    height: 2rem;
    line-height: 2rem;
    background-color: #00e676;
    border-radius: 0.25rem;
    text-align: center;
    color: #ffffff;
    font-size: 0.8rem;
  }
  .ran_btn2{
    width: 25%;
    left:68.75%;
    position: fixed;
    bottom: 0.5rem;
    height: 2rem;
    line-height: 2rem;
    background-color:silver;
    border-radius: 0.25rem;
    text-align: center;
    color: #ffffff;
    font-size: 0.8rem;
  }
</style>
