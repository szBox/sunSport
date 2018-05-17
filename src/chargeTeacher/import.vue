<template>
  <div class="import">
    <div class="im_top">
      <div class="im_z" @click="goback">
        <img src="../assets/img/goback.png" height="100%">
      </div>
      <div class="im_c">导入成绩</div>
    </div>
    <div class="im_li">
      <ul>
        <li>
          <div class="s2">
            <label>选择城市:</label>
            <select>
              <option >深圳市</option>
              <option >惠州市</option>
            </select>
          </div>
          <div class="s1">
            <label>体育项目:</label>
            <select>
              <option >200米</option>
              <option >800米</option>
              <option >1000米</option>
              <option >跳绳</option>
              <option >立定跳远</option>
              <option >50米跑</option>
              <option >引体向上</option>
              <option >肺活量</option>
            </select>
          </div>
          <div class="inp1">
            <label>学生学号:</label>
            <input type="text">
          </div>
          <div class="inp2">
            <label>学生成绩:</label>
            <input type="text">
          </div>
          <!--<div class="shanchu" @click="shanchu()">删除</div>-->
        </li>
      </ul>
    </div>
    <div class="queding" @click="queding">确定</div>
    <div class="quxiao" @click="quxiao">取消</div>
    <div class="model">
      <div class="dagou">
        <img src="../assets/img/queding.png" width="100%">
      </div>
      <div class="tishi">
        操作成功
      </div>
    </div>
  </div>
</template>
<script>
  import api from '../fetch/api'
  import $ from 'jquery'
  import weui from '../assets/js/jquery-weui'
  import int from '../assets/js/interface'
  export default{
    name:'import',
    data(){
      return{

      }
    },
    methods:{
      queding(){
      	 var self=this;
//        $('.model').css({display:'block'});
        var cityid='';
        var ll=$('.im_li ul .s2 select option:selected').val();
        if(ll=='深圳市'){
          cityid=2;
        }else if(ll=='惠州市'){
          cityid=1;
        }
        var projectid='';
        var xx=$('.im_li ul .s1 select option:selected').val();

        if(xx=='200米'){
          projectid=11;
        }else if(xx=='800米'){
          projectid=10;
        }else if(xx=='1000米'){
          projectid=9;
        }else if(xx=='跳绳'){
          projectid=22;
        }else if(xx=='立定跳远'){
          projectid=6;
        }else if(xx=='50米跑'){
          projectid=24;
        }else if(xx=='引体向上'){
          projectid=7;
        }else if(xx=='肺活量'){
          projectid=2;
        }
        var sno=$('.inp1 input').val();
        var score=$('.inp2 input').val();
        var mainUrl=int.getimport;
        var params={
          sid:window.iosParams.sid,
          city:cityid,
          stuno:sno,
          projectid:projectid,
          uid:self.$store.state.b.cid, //新加的
          result:score,
          proportion:self.$store.state.b.proportion
        };
        if(sno=='' || score==''){
          alert('请输入学号和成绩');
        }else{
          api.get_api_data(mainUrl,params,function(d){
            if(d.code==2){
              $('.model').css({display:'block'});
              var time=setTimeout(function () {
                $('.model').css({display:'none'});
              },2000);
            }else if(d.code==5){
              alert('学号错误');
            }
          })
        }

      },
      goback(){
        this.$router.go(-1);
      },
      quxiao(){
        this.$router.go(-1);
      }
    }
  }
</script>
<style src="../assets/css/main.css"></style>
<style>
  .im_top{
    color: #ffffff;
    height: 2.5rem;
    line-height: 2.5rem;
    margin-left: 5%;
    width: 90%;
  }
  .im_z{
    float: left;
    width: 1rem;
    height: 1.5rem;
    font-size: 1.5rem;
    margin-top: -0.1rem;
    color: #9C9C9E;
  }
  .im_c{
    position: absolute;
    /*left: 40%;*/
    text-align: center;
    width: 90%;
    font-weight: bold;
    z-index:-1;
  }
  .im_li{
    border-top:1px solid #000000;
  }
  .im_li li{
    margin-top: 0.5rem;
    height: 10rem;
    border-bottom: 1px solid #000000;
  }
  .im_li li .s2 label{
    display:block;
    float: left;
    width: 30%;
    font-size: 0.8rem;
    text-align: center;
    color: silver;
  }
  .im_li li .s1 label{
    display:block;
    float: left;
    width: 30%;
    font-size: 0.8rem;
    text-align: center;
    color: silver;
  }

  .im_li li select{
    float: left;
    width: 61%;
    margin-left: 5%;
    background-color: #2E2E31;
    height: 1.5rem;
    color: #ffffff;
    font-size: 1rem;
    outline: none;
  }
  .im_li li .s1{
    width: 90%;
    height: 2rem;
    margin-left: 5%;
  }
  .im_li li .s2{
    width: 90%;
    height: 2rem;
    margin-left: 5%;
  }
  .im_li li .inp1{
    width: 90%;
    height: 2.5rem;
    margin-left: 5%;
  }
  .im_li li .inp2{
    width: 90%;
    height: 2.5rem;
    margin-left: 5%;
  }
  .im_li li .inp1 label{
    width: 30%;
    text-align: center;
    margin-top: 0.75rem;
    display: block;
    color: silver;
    float: left;
    font-size: 0.8rem;
    /*margin-left: 5%;*/
  }
  .im_li li .inp1 input{
    margin-top: 0.5rem;
    float: left;
    width: 60%;
    margin-left: 5%;
    height: 1.5rem;
    /*padding-left: 0.5rem;*/
    background-color: #2E2E31;
    color: #ffffff;
    font-size: 1rem;
  }
  .im_li li .inp2 label{
    width: 30%;
    text-align: center;
    font-size: 0.8rem;
    margin-top: 0.75rem;
    display: block;
    color: silver;
    float: left;
    /*margin-left: 5%;*/
  }
  .im_li li .inp2 input{
    margin-top: 0.5rem;
    float: left;
    width:60%;
    margin-left: 5%;
    height: 1.5rem;
    /*padding-left: 0.5rem;*/
    background-color: #2E2E31;
    color: #ffffff;
    font-size: 1rem;
  }
  .shanchu{
    width: 90%;
    text-align: center;
    color: #ffffff;
    background-color: darkgray;
    border-radius: 0.25rem;
    font-size: 0.8rem;
    height: 2rem;
    line-height: 2rem;
    margin-left: 5%;
  }
  .queding{
    width: 35%;
    left:10%;
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
  .quxiao{
    width: 35%;
    left:55%;
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
  .model{
    display: none;
    background-color: #686869;
    opacity: 0.7;
    position: absolute;
    width: 6rem;
    height: 6rem;
    /*border: 1px solid red;*/
    left: 50%;
    top: 50%;
    border-radius: 0.25rem;
    margin-left: -3rem;
    margin-top: -3rem;
    text-align: center;
    line-height: 4rem;
    color: #ffffff;
    font-size: 2rem;
  }
  .dagou{
    /*height: 2rem;*/
    /*width: 3rem;*/
    /*margin-left: 1.5rem;*/
  }
  .dagou img{
    margin-top: -0.7rem;
  }
  .tishi{
    margin-top: -2.5rem;
    height: 2rem;
    width: 6rem;
    font-size: 0.8rem;
    text-align: center;
    color: #ffffff;
  }
</style>
