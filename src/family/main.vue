<template>
  <transition name="slideIn">
      <div class="main">
        <div class="teacher">
          <div class="top">
            <div class="z" @click="goback">
              <img src="../assets/img/goback.png" height="100%">
            </div>
            <div class="c">请选择学期</div>
            <!--<div class="y" @click="gostatistic">数据统计</div>-->
          </div>
          <!--<hello-div></hello-div>-->
          <!--<lun-div></lun-div>-->
        </div>
        <!--<div class="title">选择学期</div>-->
        <!--<div class="j" @click='goj'>2017~2018第一学期</div>-->
        <!--<div class="j" @click='goj'>2017~2018第二学期</div>-->
        <!--<div class="s" @click='gos'>授课老师</div>-->
        <!--<div class="b" @click='gob'>班主任</div>-->
        <!--<div class="l" @click='gol'>领导</div>-->
        <!--<v_load v-if="show"></v_load>-->
        <div class="main-title">
        	<p data-type='1' :class="{'type-on':activeType==1}" @click="typec(1)">后台体侧标准</p>
        	<p data-type='2' :class="{'type-on':activeType==2}" @click="typec(2)">国家体侧标准</p>
        </div>
        <button class="main-btn" v-for="(item,index,key) in result" :key="key" @click="routerTo(item.starttime)">{{ item.name }}</button>
        <div class="modell" style="display: none;">
          <div class="model-img">
            <img src="../assets/img/xinxitu@2x.png" width="100%">
          </div>
          <div class="model-text">
            用户没有权限或者未绑定卡号
          </div>
          <div class="model-content" >
            <div class="model-btn" @click="close">知道了</div>
          </div>
        </div>
        <div class="model-b" style="display: none;"></div>


        <!--成绩查询-->
        <div class="main-btn" @click="toInq" id="possss" v-show="addcj">
          成绩添加
      </div>
      </div>
  </transition>
</template>
<script>
  import load from '../assets/commont/loading.vue'
  import $ from 'jquery'
  import weui from '../assets/js/jquery-weui'
  import api from '../fetch/api'
  import int from '../assets/js/interface'
  export default{
    name:'main',
    data(){
      return{
        addcj: false,
        show:true,
        activeType:'1',
        result: [
          {
            name: '',
            starttime: ''
          }
        ]
      }
    },
    created (){
      var self = this;
      console.log('登录uid---'+self.$router.currentRoute.params.uid);
      window.iosParams.stuTid=self.$router.currentRoute.params.uid;
      $.ajax({
        type: "GET",
        dataType: "jsonp",
        url:int.getxueqi,
        success: function(response) {
        	console.log(response)
          self.result = response;
        },
        error: function(err) {
          console.log(err);
        }
      });
    },
    mounted(){
      this.closebtn();
      var h=$(window).height();
      $('.main').css({height:h+'px',backgroundColor:'#2E2E31'});
    },
    components:{
      v_load:load
    },
    methods:{
    		typec(index){
    			this.activeType=index;
    		},
      /**新增代码 */
        toInq(){
          this.$router.push({path: 'Inquire'})
        },

/**之前的代码 */


        goback(){
//      if(window.GreenSchool){
//        window.GreenSchool.goBack();
//      }else{
//        window.external.goBack();
//      }
				this.$router.go(-1);
      },
      routerTo(time) {
        var vm = this;
        if(window.iosParams.stuTid==0){
          this.got();
        }else{
          var self=this;
          var mainUrl=int.getCard;
          var params={
            uid:window.iosParams.stuTid,
            coursename:'体育'
          };
//
          api.get_api_data(mainUrl,params,function(s){
          	console.log(s)
            if(s.type=='student'){
//            vm.addcj = false;
              self.go(s.uid,time);  // 新 传uid
              /*if(s.card==" " || s.card==null || s.card==undefined ){
                $('.modell').css({display:'block'});
                $('.model-b').css({display:'block'});
              }else{
//              self.go(s.card,time);
              }*/
							
              //班主任
//          alert('你是一名学生')
            }else if(s.type=='headteacher'){
            	
//            alert('你是一名班主任');
                self.gob(s.uid,time);
              //授课老师
            }else if(s.type=='physical'){
            	
//            alert('你是一名体育老师');
              self.got(s.uid,time);

//          self.$router.push({path:'/main'});
              //领导
            }else if(s.type=='manager'){
    
                self.gol(s.uid,time);

            }else if(s.type=='other'){
              $('.modell').css({display:'block'});
              $('.model-b').css({display:'block'});
//            alert('用户没有权限或者未绑定卡号');
//              self.show=false;

            }else if(s.type == 'district_manager'){
             		//区长的
//              vm.$router.push({path: '/QHomepage/'+time})
								
								self.goa(s.uid,time);
            }
          });
        }
      },
      closebtn(){
          var self=this;
//        $('.main').css({backgroundColor:'#2E2E31'});
          var mainUrl=int.getCard;
          var params={
            uid:window.iosParams.stuTid,
            coursename:'体育'
          };
           api.get_api_data(mainUrl,params,function(s){
            if(s.type=='student'){
//            self.addcj = false;
             /* if(s.card==" " || s.card==null || s.card==undefined ){
              }else{
              }*/
              //班主任
//          alert('你是一名学生')
            }else if(s.type=='headteacher'){
//            alert('你是一名班主任');
              /*if(s.card==" " || s.card==null || s.card==undefined ){
              
              }else{
               
              }*/

              //授课老师
            }else if(s.type=='physical'){
//            alert('你是一名体育老师');
              /*if(s.card==" " || s.card==null || s.card==undefined ){
              
              }else{
              
              }*/

//          self.$router.push({path:'/main'});
              //领导
            }else if(s.type=='manager,district_manager' ){
              
             /* if(s.card==" " || s.card==null || s.card==undefined ){
              
              }else{
              
              }*/

            }else if(s.type=='other'){
            
//            alert('用户没有权限或者未绑定卡号');
//              self.show=false;

            }
          });
      },
      close(){
        $('.modell').css({display:'none'});
        $('.model-b').css({display:'none'});
        if(window.GreenSchool){
          window.GreenSchool.goBack();
        }else{
          window.external.goBack();
        }
      },
      go(val,time){
        var self=this;
        var mainUrl_f=int.getweek;
        var params_f={
          school_opens_time:time,
//        card:val   //替换一下
					uid:val
        };
        self.$store.state.a.weeks=[];
        api.get_api_data(mainUrl_f,params_f,function(d){
        	
          console.log(JSON.stringify(d));
          for(var i=0;i<d.length;i++){
            self.$store.state.a.weeks[i]=d[i];
          }
          self.$store.state.a.initweek=d[d.length-1];
          self.$store.state.a.week=self.$store.state.a.initweek-1;
          var mainUrl=int.gofamily;
          var params={
//          card:val,  //替换一下
						uid:val,
            school_opens_time:time,
            weektime:d[d.length-1]
          };
          api.get_api_data(mainUrl,params,function(d) {
          	console.log(d);
            self.$store.state.a.data.base=d;
//          self.$store.state.a.data.base.user.card=val; //替换一下
            self.$store.state.a.data.base.user.uid=val;
            self.$store.state.a.startTime=time;
            
            
            
            self.show=false;
//          self.$router.replace({path:'/fmain/'+time});
             self.$router.push({path:'/fmain/'+time});
          });

        });

      },
      gob(val,time){
        var self=this;

        var mainUrl_b=int.getweek;
        var params_b={
          uid:val,  //替换一下
          school_opens_time:time
        };
        self.$store.state.b.weeks=[];
        api.get_api_data(mainUrl_b,params_b,function(d){
          console.log(JSON.stringify(d));
          for(var i=0;i<d.length;i++){
            self.$store.state.b.weeks[i]=d[i];
          }
          self.$store.state.b.initweek=d[d.length-1];
          self.$store.state.b.week=self.$store.state.b.initweek;
          var mainUrl=int.goclassTeacher;
          var params={
            school_opens_time:time,
            uid:val,
            weektime:d[d.length-1]
          };
          api.get_api_data(mainUrl,params,function(d) {
            self.$store.state.b.basic=d;
            self.$store.state.b.basic.uid=val;  //替换一下
            self.$store.state.b.startTime=time;
            self.show=false;
            self.$router.push({path:'/teacher/'+time});
          });

        });
      },
      got(val,time){
        var self=this;
        var mainUrl_t=int.getweek;
        var params_t={
          uid:val,  //替换一下
          school_opens_time:time
        };
        self.$store.state.c.weeks=[];
        api.get_api_data(mainUrl_t,params_t,function(d){

            for(var i=0;i<d.length;i++){
              self.$store.state.c.weeks[i]=d[i];
            }
            self.$store.state.c.initweek=d[d.length-1];
            self.$store.state.c.week=self.$store.state.c.initweek-1;
          var mainUrl=int.goTeacher;
          var params={
            school_opens_time:time,
            uid:val,  //替换一下
            weektime:d[d.length-1]
          };
            api.get_api_data(mainUrl,params,function(d) {
              self.$store.state.c.basic=d;
              self.$store.state.c.basic.uid=val;  //替换一下
              self.$store.state.c.startTime=time;
              self.show=false;
              self.$router.push({path:'/main/'+time});
            });
        });
      },
      gol(val,time){
        var self=this;
        var mainUrl_l=int.getweek;
        var params_l={
          uid:val,  //替换一下
          school_opens_time:time
        };
        //通过周期切换去清楚当前的周期;
        self.$store.state.d.weeks=[];
        api.get_api_data(mainUrl_l,params_l,function(d){
          console.log(JSON.stringify(d));
          //将当前接口返回的数据：（有数据的周期数组）进行缓存;
          for(var i=0;i<d.length;i++){
            self.$store.state.d.weeks[i]=d[i];
          }
          //缓存最新一次测试的周期数值
          self.$store.state.d.initweek=d[d.length-1];
          
          //缓存界面跳转的周期
          self.$store.state.d.week=self.$store.state.d.initweek-1;
          var mainUrl=int.goLeader;
          var params={
            school_opens_time:time,
            uid:val,  //替换一下
            weektime:d[d.length-1]
          };
          api.get_api_data(mainUrl,params,function(d) {
            self.$store.state.d.basic=d;
            self.$store.state.d.uid=val;  //替换一下
            self.$store.state.d.startTime=time;
            self.show=false;
            self.$router.push({path:'/lmain/'+time});
          });

        });
      },
       goa(val,time){
        var self=this;
        var mainUrl_l=int.getweek;
        var params_l={
          uid:val,  //替换一下
          school_opens_time:time
        };
        //通过周期切换去清楚当前的周期;
       
        self.$store.state.e.weeks=[];
        api.get_api_data(mainUrl_l,params_l,function(d){
          console.log(JSON.stringify(d));
          //将当前接口返回的数据：（有数据的周期数组）进行缓存;
          for(var i=0;i<d.length;i++){
            self.$store.state.e.weeks[i]=d[i];
          }
          //缓存最新一次测试的周期数值
          self.$store.state.e.initweek=d[d.length-1];
          
          //缓存界面跳转的周期
          self.$store.state.e.week=self.$store.state.e.initweek-1;
          var mainUrl=int.goLeader;
          var params={
            school_opens_time:time,
            uid:val,  //替换一下
            weektime:d[d.length-1]
          };
          api.get_api_data(mainUrl,params,function(d) {
            self.$store.state.e.basic=d;
            self.$store.state.e.uid=val;  //替换一下
            self.$store.state.e.startTime=time;
            self.show=false;
            self.$router.push({path:'/QHomepage/'+time});
          });

        });
      },
    }
  }
</script>
<!--<style src="../assets/css/jquery-weui.css"></style>-->
<style scoped>
  .main{
    width: 100%;
    height: 100%;
  }
  .title{
    width: 100%;
    text-align: center;
    padding-top:2rem;
    color: #ffffff;
  }
  .j{
    width: 90%;
    margin-left: 5%;
    background-color: #00B77C;
    height: 2rem;
    line-height: 2rem;
    color: #ffffff;
    font-size: 0.8rem;
    text-align: center;
    margin-top: 2rem;
    border-radius: 0.25rem;
  }
  .s{
    width: 90%;
    margin-left: 5%;
    background-color:#008AB7;
    height: 2rem;
    line-height: 2rem;
    color: #ffffff;
    font-size: 0.8rem;
    text-align: center;
    margin-top: 2rem;
    border-radius: 0.25rem;
  }
  .b{
    width: 90%;
    margin-left: 5%;
    background-color:salmon;
    height: 2rem;
    line-height: 2rem;
    color: #ffffff;
    font-size: 0.8rem;
    text-align: center;
    margin-top: 2rem;
    border-radius: 0.25rem;
  }
  .l{
    width: 90%;
    margin-left: 5%;
    background-color:mediumslateblue;
    height: 2rem;
    line-height: 2rem;
    color: #ffffff;
    font-size: 0.8rem;
    text-align: center;
    margin-top: 2rem;
    border-radius: 0.25rem;
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
    z-index:30;
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
  .main-btn{
    width: 90%;
    margin-left: 5%;
    background-color: #00b77c;
    color: #ffffff;
    text-align: center;
    height: 2rem;
    line-height: 2rem;
    font-size: 0.8rem;
    display: block;
    border: none;
    border-radius: 0.2rem;
    margin-top: 2rem;
  }
  .main-title{
    color: #fff;
    text-align: center;
 		height: 2.2rem;
 		line-height: 2.2rem;
		overflow: hidden;
		border: 1px solid #ffcc00;
		margin: 1rem 5% 3rem;
		border-radius: 0.2rem;
  }
  .type-on{
  	background: #ffcc00;
  	color: #333;
  	font-weight: bold;
  }
  .main-title p{
  	float: left;
  	width: 50%;
  	font-size: 0.8rem;
  }
  .teacher{
    width: 100%;
    /*height: 100%;*/
    border-bottom: 0.1rem solid #262628;
  }
  .top{
    color: #ffffff;
    height: 2.5rem;
    line-height: 2.5rem;
    margin-left: 5%;
    width: 90%;
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
  .y{
    width: 30%;
    float: right;
    text-align: right;
    font-size: 0.8rem;
    color: #FFCC00;
  }
  #possss{
    position: absolute;
    bottom: 5vh;
  }
</style>

