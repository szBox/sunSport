<template>
<div class="content">
  <div class="topbar">
    <img src="../../assets/img/Navigationbar_icon_fanhui.png" @click="goBack">
    <p>排行详情</p>
    <div>
    	
    </div>
  </div>
  
  <div class="proData">
			<div class="rank">
				<div class="rankTle">
					<i class="i-icon"></i>
					<span class="fi">达标率排行</span>
					
				</div>
				
				<ol class="rankWrap">
					<li class="rankTop">
						<p>名次</p>
						<p>学校</p>
						<p>测试人数</p>
						<p>达标率</p>
					</li>
					<li v-for="(list,index) in result.pass_rate_rank" class="rankTop" v-if="index <= 2">
						<span>{{index+1}}</span>
						<span>{{list.school_name}}</span>
						<span>{{list.all_stu}}</span>
						<span>{{list.passrate}}</span>
					</li>
					<li v-for="(list,index) in result.pass_rate_rank" class="rankTop" v-if="index >= 3 && ss">
						<span>{{index+1}}</span>
						<span>{{list.school_name}}</span>
						<span>{{list.all_stu}}</span>
						<span>{{list.passrate}}</span>
					</li>
				</ol>
			</div>
		</div>
</div>
</template>

<script>
	import $ from "jquery";
	import int from '../../assets/js/interface'
	export default {
		name: "name",
		components:{
		
		},
		data: function() {
			return {
				city: "",
				Area: "",
				result: [],
			};
		},
		mounted() {
			var mh = $(window).height();
			$('.content').css('minHeight', mh);

			let vm = this;
			var a = this.$route.params.id;
			console.log(a)
			var a = a.split("-");
			this.province = a[0];
			this.city = a[1];
			this.Area = a[2];
			
			function ajax(){
				$.ajax({
				type: "GET",
				dataType: "jsonp",
				url: int.getdatazengzhang,
				data: {
//					district: vm.Area,
					uid: vm.$store.state.d.uid,
					
					school_opens_time: '2017-09-01'
				},
				success: function(response) {
					vm.result = response;
				},
				error: function(err) {
					console.log("err" + err);
				}
			});
			
			}
			ajax()
		},
		methods: {
			goBack() {
				this.$router.go(-1);
			},
		},
		destroyed(){
			
		},
		created() {

		}
	};
</script>
</script>

<style scoped>
.content {
		background: #2E2E30;
	}
	
	.topbar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 2vw 3.7vw;
		border-bottom: 2px solid #222224;
	}
	
	.topbar>p {
		/*font-size: 1.3rem;*/
		color: #fff;
	}
	
	.topbar>img {
		height: 1rem;
		width: 0.75rem;
	}
	
	.area {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 5.5vw 4.3vw 5.5vw 6.9vw;
		font-size: 18px;
	}
	
	.area .areaR {
		color: #ffcc00;
		font-size: 10vw;
	}
	
	.area .areaL .proId {
		font-size: 22px;
		color: #fff;
		padding: 3vw 0 2.4vw 0;
		display: inline-block;
	}
	
	.area .areaL .bfb {
		color: #bebebf;
		font-size: 18px;
	}
	
	.area .areaL p:first-child {
		color: #bebebf;
		font-size: 18px;
	}
	
	.area .areaL p:first-child span {
		margin-left: 1.1vw;
	}
	
	.area .areaL p:first-child span:first-child {
		margin-left: 0;
	}
	.project-p>img{
		width: 0.8rem;
		height: 0.8rem;
		vertical-align: middle;
		margin-left: 0.5rem;
	}
	.proData {
		border-top: 1.8vw solid #202022;
		border-bottom: 1.8vw solid #202022;
		padding: 2.1vw 0;
	}
	
	.rank>.rankTle {
		display: flex;
		align-items: center;
		height: 12vw;
		border-bottom: 1px solid #000;
		padding: 0 7.7vw;
	}
	
	.rank>.rankTle>img {
		width: 23px;
		height: 24px;
	}
	
	.rank .i-icon {
		margin: 0 4.2vw 0 0;
		display: inline-block;
		width: 23px;
		height: 23px;
		background: url("../../assets/img/Projectdetails_icon_Standard.png") no-repeat;
		background-size: cover;
	}
	
	.rank .z-icon {
		margin: 0 4.2vw 0 0;
		display: inline-block;
		width: 27px;
		height: 24px;
		background: url("../../assets/img/Projectdetails_icon_increase.png") no-repeat;
		background-size: cover;
	}
	
	.rank .fi {
		flex: 1;
	}
	
	.rank .s-icon {
		margin-left: 1.7vw;
		display: inline-block;
		width: 20px;
		height: 20px;
		background: url('../../assets/img/Projectdetails_icon_Arrow.png') no-repeat;
		background-size: cover;
	}
	
	.rank>.rankTle>span {
		font-size: 0.8rem;
		display: inline-block;
		color: #ccc;
	}
	
	.rank>.rankTle :nth-child(3) {
		color: #ffcc00;
	}
	
	.rank .rankWrap {
		padding: 0 6.6vw;
		font-size: 16px;
	}
	
	.rank .rankWrap .rankTop {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid #000;
		text-align: center;
		height: 9.2vw;
		color: #ccc;
	}
	
	.rank .rankWrap .rankTop :nth-child(1) {
		width: 10vw;
	}
	
	.rank .rankWrap .rankTop :nth-child(2) {
		width: 35vw;
	}
	
	.rank .rankWrap .rankTop :nth-child(3) {
		width: 20vw;
	}
	
	.rank .rankWrap .rankTop :nth-child(4) {
		width: 15vw;
	}
	
	.rank .rankWrap .rankTop:nth-child(2) {
		color: #ffcc00;
	}
	
	.rank .rankWrap .rankTop:nth-child(3) {
		color: #ffcc00;
	}
	
	.rank .rankWrap .rankTop:nth-child(4) {
		color: #ffcc00;
	}
</style>