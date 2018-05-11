<template>
<div class="content">
  <div class="topbar">
    <img src="../../assets/img/Navigationbar_icon_fanhui.png" @click="goBack">
    <p>推荐方法</p>
    <div class="menu"></div>
  </div>
  <div class="c3posi">
  	<div class="c3Box">
			<div class="typing_loader"></div>
		</div>
  </div>
	
  <ol v-show="status">
    <li class="list" v-for="item in result">
    	<div class="len" v-for="(middle,index) in item">
    		<p class="lTitle">
	        {{middle.title}}
	      </p>
	      <div class="Limgs" v-if="middle.type==0" @click="toRoute(middle.id)">
	        <!--<img :src="item.image">-->
	       	<div v-for="imgs in middle.image">
	       		<img :src="imgs" alt="" />
	       	</div>
	      </div>
	      <div class="videos" v-if="middle.type==1">
	      	<div class="video-img">
	      		<img class="video-bg"  @click="mp4(middle.id)" :src="middle.image" alt="" :data-bg="middle.id"/>
	      	</div>
	        <div class="video-div">
	        	<video  width="100%" height="200px" preload controls :data-video="middle.id">
	        		<source :src="middle.videourl" type="video/mp4"></source>
	        		<source :src="middle.videourl" type="video/ogg"></source>
	        		<source :src="middle.videourl" type="video/webm"></source>
	        	</video>
	        </div>
	      </div>
	      <div class="Lcontent" v-if="middle.type == 0" @click="toRoute(middle.id)">
	        {{middle.content}} 
	      </div>
    	</div>
      
    </li>
  </ol>
  <div v-show="status" class="more-btn" @click="next && more() ">{{next_text}}</div>
  
  <div class="no-data" v-show='!status'>
  	暂无数据
  </div>
</div>
</template>

<script>
import $ from 'jquery'
import int from '../../assets/js/interface'
export default {
    name: 'name',
    data: function() {	
        return {
          result: [],
          status:false,
          page:1,
          next_text:'加载更多',
          next:true,
        }
    },
    methods: {
      goBack(){
        this.$router.go(-1)
      },
      toRoute(id){
        console.log(id);
        this.$router.push({path: '/Recommend2/' + id})
      },
    	mp4(u){
				$('[data-video="'+u+'"]').trigger("play");
				$('[data-video!="'+u+'"]').trigger("pause");
				$('[data-bg="'+u+'"]').parent('.video-img').hide();
				$('[data-bg!="'+u+'"]').parent('.video-img').show();
    	},
    	more(){
    		var vm = this;
				vm.page++;
				$('.c3posi').show();
				vm.getAjax();

    	},
    	getAjax(){
    		var vm = this;
    		$.ajax({
        type: 'POST',
        dataType: 'jsonp',
        data:{
          uid: vm.$store.state.a.data.base.user.uid,
          project: vm.$route.params.id,
          recommend: 1,
          page: vm.page,

        },
        url:int.getrecommend1,
//      url: 'http://192.168.0.247/index.php?m=content&f=web_healthy&v=project&recommend=1',
        success: function (response){
          console.log(response);
          if(response.status=='success'){
          	vm.result.push(response.data);
						console.log(vm.result)
          	vm.status=true;
          	$('.c3posi').hide();
          }
         	else if(response.status=='fail'){
         		$('.c3posi').hide();
         		vm.next=false;
         		vm.next_text='没有更多了'
         	}
          
        },
        error(err){
          console.log('err' + err);
          
        }
      })
    	}
    },
    created(){
      var vm = this;
			vm.getAjax()
      
    }
}
</script>

<style scoped>
.content{
  background: #fff !important;
  position: absolute;
	height: 100%;
	width: 100%;
  overflow-x: hidden;
}
.topbar {
  display: flex;
  justify-content: space-between;
   border-bottom: 1px solid #ddd;
  align-items: center;
 padding: 0 3.7vw;
  height: 2.5rem;
	line-height: 2.5rem;
}
.topbar > p {
  font-size: 18px;
   font-weight: bold;
    padding-left: 0.9rem;
}
.topbar>img {
		height: 1rem;

	}
.menu{
  width: 28px;
  height: 20px;
}	
.list{
  padding: 4vw;
  border-bottom: 1px solid #ddd;
}
.list .lTitle{
  /*text-align: center;*/
  padding: 2vw 0;
}

.list .Limgs{
  overflow: hidden;
  display: flex;
  flex-wrap:wrap ;
  justify-content: space-around;
  margin: 0.75rem;
}
.list .Limgs div{
  /*float: left;*/
}
.list .Limgs img{
 
  width: 5rem;
  height: 3.5rem;
}

.video-div{
	/*position: relative;*/
}
.videos{
	position: relative;
}
.video-img{
	position: absolute;
	width: 100%;
	height: 200px;
}
.video-bg{
	position: absolute;
	width: 100%;
	height: 100%;
	z-index: 33;
}
.Lcontent{
	font-size: 0.7rem;
}
.more-btn{
	text-align: center;
	padding: 0.75rem;
	font-size: 0.7rem;
}
.c3posi{
	position:fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: block;
	z-index: 99;
}
.c3Box {
				
				width: 100px;
				/*background-color: rgba(0,0,0, 0.02);*/
				height: 100px;
				vertical-align: middle;
				border-radius: 1px;
				position: absolute;
				top: 50%;
				left: 50%;
				-webkit-transform: translate(-50%, -50%);
				-moz-transform: translate(-50%, -50%);
				-ms-transform: translate(-50%, -50%);
				-o-transform: translate(-50%, -50%);
				transform: translate(-50%, -50%);
				
			}
			
			.typing_loader {
				width: 16px;
				height: 16px;
				border-radius: 50%;
				-webkit-animation: typing 1s linear infinite alternate;
				-moz-animation: Typing 1s linear infinite alternate;
				animation: typing 1s linear infinite alternate;
				margin: 46px auto;
				position: relative;
				left: -12px;
			}
			
			@-webkit-keyframes typing {
				0% {
					background-color: rgba(0, 169, 217, 1);
					box-shadow: 18px 0px 0px 0px rgba(0, 169, 217, 0.2), 36px 0px 0px 0px rgba(0, 169, 217, 0.2);
				}
				25% {
					background-color: rgba(0, 169, 217, 0.4);
					box-shadow: 18px 0px 0px 0px rgba(0, 169, 217, 2), 36px 0px 0px 0px rgba(0, 169, 217, 0.2);
				}
				75% {
					background-color: rgba(0, 169, 217, 0.4);
					box-shadow: 18px 0px 0px 0px rgba(0, 169, 217, 0.2), 36px 0px 0px 0px rgba(0, 169, 217, 1);
				}
			}
			
			@-moz-keyframes typing {
				0% {
					background-color: rgba(0, 169, 217, 1);
					box-shadow: 18px 0px 0px 0px rgba(0, 169, 217, 0.2), 36px 0px 0px 0px rgba(0, 169, 217, 0.2);
				}
				25% {
					background-color: rgba(0, 169, 217, 0.4);
					box-shadow: 18px 0px 0px 0px rgba(0, 169, 217, 2), 36px 0px 0px 0px rgba(0, 169, 217, 0.2);
				}
				75% {
					background-color: rgba(0, 169, 217, 0.4);
					box-shadow: 18px 0px 0px 0px rgba(0, 169, 217, 0.2), 36px 0px 0px 0px rgba(0, 169, 217, 1);
				}
			}
			
			@keyframes typing {
				0% {
					background-color: rgba(0, 169, 217, 1);
					box-shadow: 18px 0px 0px 0px rgba(0, 169, 217, 0.2), 36px 0px 0px 0px rgba(0, 169, 217, 0.2);
				}
				25% {
					background-color: rgba(0, 169, 217, 0.4);
					box-shadow: 18px 0px 0px 0px rgba(0, 169, 217, 2), 36px 0px 0px 0px rgba(0, 169, 217, 0.2);
				}
				75% {
					background-color: rgba(0, 169, 217, 0.4);
					box-shadow: 18px 0px 0px 0px rgba(0, 169, 217, 0.2), 36px 0px 0px 0px rgba(0, 169, 217, 1);
				}
			}
</style>