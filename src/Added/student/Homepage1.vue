<template>
	<div class="content">
		

		<!--学生信息-->
		
		

		<div class="echart-div">
			<div>
				<canvas id="" width="" height="400px"></canvas>
			</div>
			<div class="data-btn"  @click="pickSwitch()">
				查看详细数据
			</div>
		</div>

		<div class="rank">
			<div class="ranging">
				<p>51</p>
				<p>平均分</p>
			</div>
			<div class="ranging">
				<p>13</p>
				<p>班级排名</p>
			</div>
			<div class="ranging">
				<p>75</p>
				<p>全校排名</p>
			</div>
		</div>

		<!--选择器-->
		<vue-pickers :show="show1" :selectData="pickData1" v-on:cancel="close" v-on:confirm="confirmFn"></vue-pickers>
	</div>

</template>

<script>
	import $ from "jquery";
	// import echart from "echarts";
	import echarts from "../../assets/js/ect";
	import echartsh from "../../assets/js/ect1";
	import weui from "../../assets/js/jquery-weui";
	import int from "../../assets/js/interface";
	import api from "../../fetch/api";
	import VuePickers from "vue-pickers";

	export default {
		name: "name",
		data() {
			return {
				show1: false,
				pickData1: {
					columns: 1, // picker的列数
					default: [ // 默认显示哪一个字段
						{
							text: 2002,
							value: 2002
						}
					],
					// 第一列的数据结构
					pData1: [{
							text: 1999,
							value: 1999
						},
						{
							text: 2001,
							value: 2001
						},
						{
							text: 2002,
							value: 2002
						},
						{
							text: 2003,
							value: 2003
						},
						{
							text: 2004,
							value: 2004
						},
						{
							text: 2005,
							value: 2005
						},
					]
				}
			}
		},
		components: {
			VuePickers
		},
		methods: {
			pickSwitch() {
				//选择器开关
				this.show1 = true
			},
			close(){
				this.show1 = false;
			},
			goUp() {
				this.$router.go("/");
			},
			goGrowUp() {
				var self = this;
				self.$router.push({
					path: "/fgrow"
				});
				self.$store.state.a.count--;
			},

		}
	};
</script>

<style scoped>
	.topbar {
		position: relative;
		background: #fff;
		width: 100%;
		line-height: 2.5rem;
	}
	
	.topbar+div {}
	
	.topbar>p,
	.topbar>div {
		position: absolute;
		top: 50%;
		-webkit-transform: translateY(-50%);
		-moz-transform: translateY(-50%);
		-ms-transform: translateY(-50%);
		-o-transform: translateY(-50%);
		transform: translateY(-50%);
		;
	}
	
	.topbar>p {
		left: 0.75rem;
	}
	
	.topbar>div {
		right: 0.75rem;
		color: #ffcc00;
		font-size: 0.7rem;
	}
	
	.topbar>p>img {
		width: 0.7rem;
	}
	
	.topbar>h3 {
		text-align: center;
	}
	
	.student-top {
		display: flex;
		-webkit-box-pack: justify;
		-ms-flex-pack: justify;
		justify-content: space-between;
		padding: 0.75rem;
		border: 0.75rem solid;
		border-bottom: 0;
		-o-border-image: linear-gradient(#40f6dd, #0ebe2b) 30 30;
		border-image: linear-gradient(#40f6dd, #0ebe2b) 30 30;
		position: relative;
		/*height: 100px;*/
		background: #fff;
		padding: 0.75rem;
		padding-bottom: 1.5rem;
	}
	
	.student-info {
		width: 100%;
	}
	
	.student-img {
		float: left;
		position: relative;
	}
	
	.student-img>img {
		width: 5.5rem;
		height: 7.5rem;
	}
	
	.student-img>p {
		background: linear-gradient(to right, #ffc617, #ffa510);
		color: #fff;
		font-size: 0.65rem;
		width: 80%;
		margin: 0 auto;
		line-height: 1.2rem;
		text-align: center;
		position: absolute;
		bottom: -10px;
		left: 10%;
		z-index: 2;
		border-radius: 0.8rem;
	}
	
	.student-xinxi {
		float: left;
		margin-left: 1.5rem;
	}
	
	.student-xinxi p {
		margin-top: 0.8rem;
		font-size: 0.7rem;
	}
	
	.select-week {
		height: 3rem;
		background: #fff;
		position: relative;
		border: 0.75rem solid;
		border-bottom: 0;
		border-top: 0;
		border-image: linear-gradient(#0ebe2b, #0ebe2b)0 30 0 30
	}
	
	.icon-san {
		border-top: 0.5rem solid transparent;
		border-left: 0.5rem solid #0ebe2b;
		border-right: 0.5rem solid transparent;
		border-bottom: 0.5rem solid transparent;
		position: absolute;
		z-index: 1;
	}
	
	.san-left {
		left: -1px;
	}
	
	.san-right {
		border-top: 0.5rem solid transparent;
		border-right: 0.5rem solid #0ebe2b;
		border-left: 0.5rem solid transparent;
		border-bottom: 0.5rem solid transparent;
		right: -1px;
	}
	
	.pick-btn {
		margin: 0 0.75rem;
		border-bottom: 1px solid #DEDEDE;
		overflow: hidden;
		height: 1.5rem;
		line-height: 1.5rem;
	}
	
	.pick-btn p {
		width: 100%;
		float: left;
		font-size: 0.7rem;
		color: #888;
	}
	
	.pick-btn img {
		float: right;
		margin-top: -1rem;
		width: 0.6rem;
		height: 0.4rem;
	}
	
	.echart-div {
		background: #fff;
		/*height: 100px;*/
	}
	
	.data-btn {
		font-size: 1rem;
		height: 2rem;
		line-height: 2rem;
		border-radius: 2.5rem;
		font-size: 0.75rem;
		/*width: 80%;*/
		margin: 0 0.75rem;
		text-align: center;
		box-shadow: 0.08rem 0.17rem 0.15rem #90d1b2;
		background: linear-gradient(to right, #2cdea0, #10be3b);
		color: #fff;
	}
	
	.rank {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		-webkit-box-pack: justify;
		-ms-flex-pack: justify;
		justify-content: space-between;
		padding: 2rem 0;
		background: #fff;
	}
	
	.rank .ranging {
		-webkit-box-flex: 1;
		-ms-flex: 1;
		flex: 1;
		text-align: center;
		border-right: 1px dotted #999;
	}
	
	.rank .ranging:last-child {
		border: none;
	}
	
	.rank .ranging p:first-child {
		font-size: 1.5rem;
		color: #000;
		padding-bottom: 1rem;
	}
	
	.rank .ranging p:last-child {
		font-size: 0.7rem;
		color: #999;
	}
</style>