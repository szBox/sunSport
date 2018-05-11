<template>
	<div class="login-box">
		<div class="tips-div">
			<p>2018年丰台区中小学国家体制健康</p>
			<p>标准测试赛查询平台</p>
		</div>
		<div class="login-img">
			<img src="../assets/img/logins.png" alt="" />
			<p>菁菁达人</p>
		</div>
		
		<div class="form-login">
			<div class="form-div">
				<img src="../assets/img/icon_uname.png"/>
				<div>
					<input type="text" @input="YZphone(phone)"  v-model="phone" placeholder="请输入您的账号" @keyup.enter="login()" maxlength="11"/>
					<p class="errtips">
						{{phone_tips}}
					</p>
				</div>
				
				
			</div>
			<div class="form-div">
				<img src="../assets/img/icon_pwd.png"/>
				<div>
					<input type="password" @input="YZpassword(password)" v-model="password" @keyup.enter="login()"  placeholder="请输入您的密码" />
					<p class="errtips">
						{{password_tips}}
					</p>
				</div>
			</div>
			<div class="btn-login" @click="login()">登录</div>
		</div>
	
	</div>
</template>

<script>
	
	
	import $ from 'jquery'
	import api from "../fetch/api";
  	import int from '../assets/js/interface'
	export default({
		name:'login',
		data(){
			return{
				phone:'',
				password:'',
				phone_tips:'',
				password_tips:''
				
			}
		},
		components:{
			
		},
		mounted(){
		  var _this=this;
		  _this.phone=localStorage.getItem('phone');
		  _this.password=localStorage.getItem('password');
	     $(".login-box,body").css({background: "#2E2E31" });
			 
		},
		created(){
			 var hei = $(document).height();
			    console.log(hei);
			    
			    $(".login-box").css({ height: hei + "px", background: "#fff" });
					$("body").css({ height: 0 + "px" });
		},
		methods:{
			YZphone(phone){
				if(!phone){
					this.phone_tips='请输入账号';
				}else{
					this.phone_tips='';
				}
			},
			YZpassword(password){
				if(!password){
					this.password_tips='请输入密码';
				}else{
					this.password_tips='';
				}
			},
			login(){
				
				if(!this.phone){
					this.phone_tips='请输入账号'
				}
//				else if(!/^(13[0-9]\d{8}|17[0-9]\d{8}|15[0-35-9]\d{8}|18[0-9]\d{8}|14[0-9]\d{8})$/.test(this.phone)){
//					this.phone_tips='账号格式不对'
//				}
				else if(!this.password){
					this.password_tips='请输入密码'
				}
				
				else{
					let _this=this;
//					let md5_password=$.md5(_this.password);
				var mainUrl = int.getlogin;
				var params = {
					username:_this.phone,
					password:_this.password 
				};

				api.get_api_data(mainUrl, params, function(d) {
					
					console.log(d);
					if(d.status==1){
//						跳页面
//						window.iosParams.stuTid=d.uid
//						_this.$store.state.e.uid=d.uid;
						_this.phone=localStorage.setItem('phone',_this.phone);
						_this.password=localStorage.setItem('password',_this.password);
						_this.$router.push({ // 你需要接受路由的参数再跳转
                      		 path:'/mainSel/'+d.uid
//                    		 path:'/main'
// 							 path:'/main'+'?uid='+d.uid
                		});
					}else{
						_this.password_tips=d.msg;
					}
					});
				
				}
				
			}
		}
	})
</script>

<style scoped>
	.login-img{
		margin: 3rem auto 2rem;
		width: 5rem;
		text-align: center;
	}
	.login-img>img{
		width: 4rem;
		height: 4rem;
		border-radius: 1rem;
	}
	.login-img>p{
		font-size: 0.9rem;
		color: #fff;
		margin-top: 0.75rem
	}
	.form-login{
		margin: 0 12%;
	}
	
	.btn-login{
		background: #00b77c;
		color: #fff;
	    height: 2rem;
    	line-height: 2rem;
	    font-size: 0.8rem;
	    text-align: center;
        border-radius: 1.2rem;
        margin-top: 3.5rem;
	}
	.form-div{
		margin-bottom: 1.8rem;
	}
	
	.form-div img{
		width: 1.3rem;
		height: 1.2rem;
	}
	.form-div>div{
		float: right;
		width: 88%;
		padding-bottom: 0.4rem;
		border-bottom: 1px solid #7C7C7E;
		position: relative;
	}
	.errtips{
		color: #fff;
		position: absolute;
		bottom:-1rem;
		left: 0;
		color: #F7C108;
	}
	.form-div input{
		width: 100%;
		border: none;
		background: none;
		color: #fff;
	}
	.tips-div{
		text-align: center;
		color: #fff;
		font-size: 0.9rem;
		margin-top: 1.5rem;
	}
	::-webkit-input-placeholder{color: #959595;font-size: 0.7rem;}    /* 使用webkit内核的浏览器 */
	:-moz-placeholder{color: #959595;font-size: 0.7rem;}                  /* Firefox版本4-18 */
	::-moz-placeholder{color: #959595;font-size: 0.7rem;}                  /* Firefox版本19+ */
	:-ms-input-placeholder{color: #959595;font-size: 0.7rem;}           /* IE浏览器 */
	
</style>