<template>
  <div class="submit">
    <div class="ran_top">
      <div class="ran_z" @click="goback">
        <img src="../assets/img/goback.png" height="100%">
      </div>
      <div class="ran_c">提交时间</div>
    </div>
    <div class="sub_li">
      <ul>
        <li v-for="(i,index) in list">
          <div class="s1">
            <label>体育项目:</label>
            <select>
              <option name="xx11">200米</option>
              <option name="xx10">800米</option>
              <option name="xx9">1000米</option>
            </select>
          </div>
          <div class="inp1">
            <label>起始时间:</label>
            <input type="text" v-bind:value="i.start">
          </div>
          <div class="inp2">
            <label>结束时间:</label>
            <input type="text" v-bind:value="i.end">
          </div>
          <div class="shanchu" @click="shanchu(index)">删除</div>
        </li>

      </ul>
    </div>
    <div class="tianjia" @click="add">添加</div>
    <div class="tijiao" @click="tijiao">提交</div>
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
  export default{
    name:'submit',
    data(){
      return{
        list:''
      }
    },
    mounted(){
      var self=this;
      self.getdata();



    },
//    computed:{
//      list(){
//        return this.$store.state.b.projectname;
//      }
//    },
    methods:{
      goback(){
        this.$router.go(-1);
      },
      getdata(){
        var self=this;
        var mainUrl='https://school.jingjing100.com/physical_cardinfo.do?method=getRunSet';
        var params={
          stuid:window.iosParams.stuTid,
        };
        api.get_api_data(mainUrl,params,function(d){
//          self.show1=false;
//        self.list=d;
          console.log(JSON.stringify(d));

          if(d.error=='error'){
            alert('此学校未设置任务');
          }else if(d.error=='success'){
            self.list=d.data;
            var len=d.data.length;
            for(var i=0;i<len;i++){
//              if(d.data[i].value==10){
//                var time=setTimeout(function () {
//                  var x=$('.sub_li ul li').html();
//                },100)
//
//              }
            }
          }
        })
      },
      shanchu(index){
        $('.sub_li ul li:eq('+index+')').remove();
      },
      tijiao(){

        var num=$('.sub_li ul li').length;
        var xx='';
        var nn='';
        var start='';
        var end='';
        for(var i=0;i<num;i++){
          if(i==num-1){
            xx+=$('.sub_li ul li:eq('+i+') select option:selected').val();
            start+=$('.sub_li ul li:eq('+i+') .inp1 input').val();
            end+=$('.sub_li ul li:eq('+i+') .inp2 input').val();
//            if(mm=='200米'){
//              xx+=11;
//            }else if(mm=='800米'){
//              xx+=10;
//            }else if(mm='1000米'){
//              xx+=9;
//            }
          }else{
            xx+=$('.sub_li ul li:eq('+i+') select option:selected').val()+",";
            start+=$('.sub_li ul li:eq('+i+') .inp1 input').val()+',';
            end+=$('.sub_li ul li:eq('+i+') .inp2 input').val()+',';

          }
        }
        var zz=xx.split(',');
        for(var k=0;k<zz.length;k++){
          if(k==zz.length){
            if(zz[k]=='200米'){
              nn+=11;
            }else if(zz[k]=='800米'){
              nn+=10;
            }else if(zz[k]='1000米'){
              nn+=9;
            }
          }else{
            if(zz[k]=='200米'){
              nn+=11+",";
            }else if(zz[k]=='800米'){
              nn+=10+",";
            }else if(zz[k]='1000米'){
              nn+=9+",";
            }
          }
        }
//        alert(nn);
        var mainUrl='https://school.jingjing100.com/physical_cardinfo.do?method=addRunSet';
        var params={
          stuid:window.iosParams.stuTid,
          value:nn,
          start:start,
          end:end
        };
        api.get_api_data(mainUrl,params,function(d){
          $('.model').css({display:'block'});
          var time=setTimeout(function () {
            $('.model').css({display:'none'});
          },1000);
          console.log(d);
//          self.show1=false;
//        self.list=d;
//          console.log(JSON.stringify(d));
//          if(d.error=='error'){
//            alert('此学校未设置任务');
//          }
        })
      },
      add(){
        var x='<li>'
          +'<div class="s1">'
          +'<label>体育项目:</label>'
          +'<select>'
          +'<option>200米</option>'
          +'<option>800米</option>'
          +'<option>1000米</option>'
          +'</select>'
          +'</div>'
          +'<div class="inp1">'
          +'<label>起始时间:</label>'
          +'<input type="text">'
          +'</div>'
          +'<div class="inp2">'
          +'<label>结束时间:</label>'
          +'<input type="text">'
          +'</div>'
          +'<div class="shanchu">删除</div>'
          +'</li>';
        $('.sub_li ul').html($('.sub_li ul').html()+x);
      }
    }
  }
</script>
<style>
  .submit{
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
    /*left: 40%;*/
    text-align: center;
    width: 90%;
    font-weight: bold;
    z-index: -1;
  }
  .sub_li{

    border-top:1px solid #000000;
  }
  .sub_li li{
    margin-top: 0.5rem;
    height: 10.5rem;
    border-bottom: 1px solid #000000;
  }
  .sub_li li .s1 label{
    display:block;
    float: left;
    width: 30%;
    font-size: 0.8rem;
    text-align: center;
    color: silver;
  }
  .sub_li li select{
    float: left;
    width: 60%;
    margin-left: 5%;
    background-color: #2E2E31;
    height: 1.5rem;
    color: #ffffff;
    font-size: 1rem;
    outline: none;
  }
  .sub_li li .s1{
    width: 90%;
    height: 2rem;
    margin-left: 5%;
  }
  .sub_li li .inp1{
    width: 90%;
    height: 3rem;
    margin-left: 5%;
  }
  .sub_li li .inp2{
    width: 90%;
    height: 3rem;
    margin-left: 5%;
  }
  .sub_li li .inp1 label{
    width: 30%;
    text-align: center;
    margin-top: 0.75rem;
    display: block;
    color: silver;
    float: left;
    font-size: 0.8rem;
    /*margin-left: 5%;*/
  }
  .sub_li li .inp1 input{
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
  .sub_li li .inp2 label{
    width: 30%;
    text-align: center;
    font-size: 0.8rem;
    margin-top: 0.75rem;
    display: block;
    color: silver;
    float: left;
    /*margin-left: 5%;*/
  }
  .sub_li li .inp2 input{
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
  .tianjia{
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
  .tijiao{
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
    background-color: #000000;
    opacity: 0.5;
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
