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
    <div id="tz"></div>
    <div class="cont">
      <div class="con_t">
        <div class="con_t_l">
          <div class="con_t_l_t">平均分数</div>
          <div class="con_t_l_b">80</div>
        </div>
        <div class="con_t_c">
          <div class="con_t_l_t">最高分数</div>
          <div class="con_t_l_b">110</div>
        </div>
        <div class="con_t_r">
          <div class="con_t_l_t">综合评价</div>
          <div class="con_t_l_b">B</div>
        </div>
      </div>
      <div class="lun" style="margin-top: 2rem;border-top: 0;">
        <div class="li">
          <ul class="u1">
            <!--<div class="l4">-->
            <!--<div class="val1">{{list.qualified}}</div>-->
            <!--<div class="n">及格率</div>-->
            <!--</div>-->
            <m_rotate percent="32%" tit="及格率"></m_rotate>


          </ul>
          <ul class="u2">
            <!--<div class="l4">-->率
            <!--<div class="val1">{{list.good_rate}}</div>-->
            <!--<div class="n">良好</div>-->
            <!--</div>-->
            <m_rotate percent="97%" tit="良好" ></m_rotate>
          </ul>
          <ul class="u3">
            <!--<div class="l4">-->
            <!--<div class="val1">{{list.excellent_rate}}</div>-->
            <!--<div class="n">优秀率</div>-->
            <!--</div>-->
            <m_rotate percent="11.5" tit="优秀率" ></m_rotate>
          </ul>

        </div>
        <div class="ma" style="text-align:left;margin-top: 1rem;margin-left: 1rem">最高分<span class="v1">92</span></div>
        <div class="npm" style="width: 50%;margin-top: 1rem">得分最高年级<span class="v1">五年级</span></div>
        <div class="xpm" style="text-align:left;width: 100%;margin-left: 1rem">得分最高班级<span class="v1">六年级一班</span></div>
      </div>
    </div>
    <div id="tzz"></div>
  </div>
  </transition>
</template>
<script>
  import rotate from '@/assets/commont/rotate'
  import echarts from '../assets/js/echarts'
  import echarts1 from '../assets/js/lineChart'
  import $ from 'jquery'
  import weui from '../assets/js/jquery-weui'
  export default{
    name:'statistic',
    data(){
      return{
        starttime1:'选择起始时间',
        endtime1:'选择结束时间',
        initgrade:'全部年级',
        initclass:'全部班级',
        initproject:'全部项目'
      }
    },
    components:{
      m_rotate:rotate
    },
    mounted(){
      var self=this;
      var num=1;
      var zz=1;
      var arr=['第一周', '第二周', '第三周', '第四周', '第五周', '第六周', '第七周', '第八周', '第九周', '第十周', '第十一周', '第十二周', '第十三周', '第十四周', '第十五周', '第十六周', '第十七周', '第十八周', '第十九周', '第二十周'];
      var allproject=['仰卧起坐', '立定跳远', '引体向上', '肺活量', '跳绳', '1000米跑', '篮球运动'];
      var allgrade=['一年级','二年级','三年级','四年级','五年级','六年级'];
      var allclass=['一班','二班','三班','四班','五班','六班']
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
//        alert();
          for(var i=0;i<arr.length;i++){
            if($('#picker1').val()==arr[i]){
              num=i+1;
              if(zz!==1){
//                self.getdata(num,zz,'');
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
          for(var i=0;i<arr.length;i++){
            if($('#picker2').val()==arr[i]){
//              alert(num+'xxxxxx'+(i+1));
              zz=i+1;
//              self.getdata(num,zz,'');
              self.starttime1=$('#picker1').val();
              self.endtime1=$('#picker2').val();
            }
          }
        }
      });

      $("#pickern").picker({
        title: "请选择周期",
        cols: [
          {
            textAlign: 'center',
            values: allgrade
          }
        ],
//      rotateEffect:true,
        onClose:function () {
//        alert();
          for(var i=0;i<allgrade.length;i++){
            if($('#pickern').val()==allgrade[i]){
//              alert(num+'xxxxxx'+(i+1));
              alert(i);
//              alert(zz);
//              self.getdata(num,zz,'');
              self.initgrade=$('#pickern').val();
              self.initclass=$('#pickerc').val();
            }
          }
        }
      });

      $("#pickerc").picker({
        title: "请选择周期",
        cols: [
          {
            textAlign: 'center',
            values: allclass
          }
        ],
//      rotateEffect:true,
        onClose:function () {
//        alert();
          for(var i=0;i<allclass.length;i++){
            if($('#pickerc').val()==allclass[i]){
//              alert(num+'xxxxxx'+(i+1));
              zz=i+1;
//              self.getdata(num,zz,'');
              self.initgrade=$('#pickern').val();
              self.initclass=$('#pickerc').val();
            }
          }
        }
      });

      $("#pickerp").picker({
        title: "请选择周期",
        cols: [
          {
            textAlign: 'center',
            values: allproject
          }
        ],
//      rotateEffect:true,
        onClose:function () {
//        alert();
          for(var i=0;i<allproject.length;i++){
            if($('#pickerp').val()==allproject[i]){
//              alert(num+'xxxxxx'+(i+1));
              zz=i+1;
//              self.getdata(num,zz,'');
              self.initproject=$('#pickerp').val();
            }
          }
        }
      });






      var h=$(window).height();
      // alert(h);
      $('.statistic').css({height:h+'px',backgroundColor:'#1F1F21'});

      var obj = document.getElementById("tz");
      var dataBJ = [[90,71,93,76,81,87,92]];
      var indicatorData = [
        {name: "仰卧起坐",max: 150},
        {name: '立定跳远',max: 150},
        {name: '引体向上',max: 150},
        {name: '肺活量',max: 150},
        {name: '跳绳',max: 150},
        {name: '100米跑',max: 150},
        {name: '篮球运动',max: 150}
      ];
      echarts.initDataY(dataBJ,indicatorData,obj,self);
//      for(var i=0;i<36;i++){
//        $('.li .u1').append("<li class='l1' name="+i+" style='transform:rotate("+(i*10)+"deg)'></li>");
//        $('.li .u1').append("<li class='l2' name="+i+" style='transform:rotate("+(i*10)+"deg)'></li>");
//        $('.li .u2').append("<li class='l1' name="+i+" style='transform:rotate("+(i*10)+"deg)'></li>");
//        $('.li .u2').append("<li class='l2' name="+i+" style='transform:rotate("+(i*10)+"deg)'></li>");
//        $('.li .u3').append("<li class='l1' name="+i+" style='transform:rotate("+(i*10)+"deg)'></li>");
//        $('.li .u3').append("<li class='l2' name="+i+" style='transform:rotate("+(i*10)+"deg)'></li>");
//      }
//
//
//      var x=Math.floor(36/100*100);
////      alert(Math.floor(x));
//      for(var m=0;m<x;m++){
//        $('.u1 .l1[name='+m+']').css({zIndex:2});
//      }
//      this.rates(80);
//      this.average(84.3);

      var obj1 = document.getElementById("tzz");
      var data1=[80, 92, 81, 74, 98, 80, 90,100];
      var data2=[];
      echarts1.initDataZ(data1,data2,obj1);
    },
    methods:{
      rates(val){
        var x=Math.floor(36/100*val);
        for(var m=0;m<x;m++){
          $('.u2 .l1[name='+m+']').css({zIndex:2});
        }
      },
      average(val){
        var x=Math.floor(36/100*val);
        for(var m=0;m<x;m++){
          $('.u3 .l1[name='+m+']').css({zIndex:2});
        }
      },
      goback(){
        this.$router.go(-1);
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
    line-height: 2rem;
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
    font-size: 0.8rem;
    width: 60%;
    float: left;
    /*color: #AAAAAC;*/
    line-height: 2.5rem;
    padding-left: 1rem;
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
    margin-top: 0.5rem;
    float: left;
    width: 1rem;
    height: 1rem;
  }
  #tz{
    /*width: 90%;*/
    /*padding-left: 5%;*/
    /*padding-right: 5%;*/
    height: 15rem;
    margin-top: 0.05rem;
  }
  .cont{
    width: 100%;
    height:18rem;
    border-bottom: 0.5rem solid #1F1F21;
    background-color: #2E2E31;
    /*padding-top: 1rem;*/
  }
  .con_t{
    padding-top: 1rem;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    width: 90%;
    margin-left: 5%;
    height: 3rem;
  }
  .con_t_l{
    text-align: center;
    width: 33.3%;
    float: left;
  }
  .con_t_c{
    text-align: center;
    width: 33.3%;
    float: left;
  }
  .con_t_r{
    text-align: center;
    width: 33.3%;
    float: left;
  }
  .con_t_l_t{
    color: #A6A6A7;
    font-size: 0.8rem;
    height: 1rem;
  }
  .con_t_l_b{
    color: #FFCC00;
    font-size: 2rem;
  }
  #tzz{
    margin-top: 0.5rem;
    width: 90%;
    margin-left: 5%;
    height: 12rem;
    margin-bottom: 1rem;
  }
</style>
<style src="../assets/css/rotate.css">

</style>
