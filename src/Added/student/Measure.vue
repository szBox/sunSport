<!--
  测量统计
-->

<template>
  <div>
    <div class="dateSelection">
      <div class="dateFn" >
        <img src="../../assets/img/archives_icon_Calendar.png" alt="">
        <!--
          日期选择组件
        -->
        <DatePicker type="date" :transfer='true' :editable="false" placeholder="最近测试  (查看日期)" class="DPicker" style="width: 73vw;" @on-change="getTime"></DatePicker>
      </div>
      <div class="dateIcon">
        <img src="../../assets/img/archives_icon_Arrow.png">
      </div>
    </div>

    <div class="dataList">
    	
      <ul v-if='result.bmi.bmi!=null'>
        <li>
          <div class="infoText">
            <img src="../../assets/img/archives_icon_height.png" alt="">
            <p>{{result.height.projectname}}</p>
          </div>
          <div class="Val">
            <p>测量值 <span>{{result.height.height}}</span><i>cm</i></p>
            <p></p>
          </div>
          <div class="result">
            <!--{{result.height.text}}-->
          </div>
        </li>

        <li>
          <div class="infoText">
            <img src="../../assets/img/archives_icon_weight.png" alt="">
            <p>{{result.weight.projectname}}</p>
          </div>
          <div class="Val">
            <p>测量值 <span>{{result.weight.weight}}</span><i>kg</i></p>
            <p></p>
          </div>
          <div class="result">
            <!--{{result.weight.text}}-->
          </div>
        </li>

        <li>
          <div class="infoText">
            <img src="../../assets/img/archives_icon_bmi.png" alt="">
            <p>{{result.bmi.projectname}}</p>
          </div>
          <div class="Val">
            <p>测量值 <span>{{result.bmi.bmi}}</span></p>
            <p>测量标准值 {{result.bmi.normal_range}}</p>
          </div>
          <div class="result bmiIcon">
            <p>{{result.bmi.text}}</p>
          </div>
        </li>
      </ul>
       <ul  v-else>
        <li>
          <div class="infoText">
            <img src="../../assets/img/Ropeskipping_icon_time.png" alt="">
            <p></p>
          </div>
          <div class="Val">
            <p>测量值: <span style="font-size: 16px;">暂无数据</span></p>
            <p></p>
          </div>
          <div class="result">

          </div>
        </li>
  	</ul>
    </div>
  </div>

</template>

<script>
import $ from "jquery";
import int from '../../assets/js/interface'
export default {
  name: "name",
  data: function() {
    return {
      result: [],
      newTime: ''
    };
  },
  created() {
    var vm = this;
    console.log(vm.$route)
    var d = new Date()
    var dTime = parseInt(d.getFullYear()) + '-' + parseInt(d.getMonth()+1) + '-' + parseInt(d.getDate());
    $.ajax({
      type: "GET",
      dataType: "jsonp",
//    url: "http://192.168.0.211/index.php?m=content&f=statistics&v=getbmi",
      url:int.getdangan,
      data: {
        uid: vm.$store.state.a.data.base.user.uid,
        // date: dTime
//      date:(new Date().getFullYear())+'-'+(new Date().getMonth()+1)+'-'+(new Date().getDate()),
        proportion:vm.$store.state.a.data.base.user.proportion
      },
      success: function(response) {
      	vm.$root.eventHub.$emit('Vloading',false)
        console.log(response);

        vm.result = response;
      },
      error: function(err) {
        console.log(err);
      }
    });
  },
  methods: {
    getTime(t) {
//  	alert(t)
      this.newTime = t
      var vm = this;
      $.ajax({
        type: "GET",
        dataType: "jsonp",
//      url: host+"/index.php?m=content&f=statistics&v=getbmi",
				 url:int.getdangan,
        data: {
          uid: vm.$store.state.a.data.base.user.uid,
          date: t,
          school_opens_time:vm.$store.state.a.startTime,
          projectid:vm.$route.params.id,
          proportion:vm.$store.state.a.data.base.user.proportion
        },
        success: function(response) {
          vm.result = response;
          console.log(response)
        },
        error: function(err) {
          console.log(err);
        }
      });
    }
  }
};
</script>

<style scoped>
.dateSelection {

  padding: 5vw 7.5vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #e5e5e5;
  height: 9.2vw;
  position: relative;
}
.dateSelection .dateFn > * {
  vertical-align: middle;
}
.dateSelection .dateIcon{
  position: absolute;
  right: 7.6vw;
  top: calc(5vw - 12px);
  z-index: 1;
}
.dateSelection .dateIcon img{
  width: 15px;
  height: 10px;
}
.dateSelection .dateFn img {
  margin: 0 2.7vw 0 0;
  width: 1.2rem;
}
.dataList > ul > li {
  display: flex;
  align-items: flex-end;
  font-size: 14px;
  border-bottom: 1px solid #E0E0E0;
  padding: 5vw 3vw;
  justify-content: space-between;
}
.dataList > ul > li .infoText {
  text-align: center;
}
.dataList > ul > li .infoText img {
	width:1.2rem;
  padding-bottom: 0.3rem;
}
.dataList > ul > li > div:nth-child(1) {
  border-right: 1px solid #E0E0E0;
  width: 20vw;
}

.dataList > ul > li > div:nth-child(2) {
  flex: 1;
  padding-left: 1rem;
}
.dataList > ul > li > div:nth-child(2) > p:last-child {
  color: #adadad;
}
.dataList > ul > li > div:nth-child(2) > p:first-child {
  font-size: 18px;
  padding-bottom: 0.3rem;
}
.dataList > ul > li > div:nth-child(3) {
  color: #ccc;
}
.dataList > ul > li > div.bmiIcon {
  border: 1px solid #2ac895;
  border-radius: 50%;
  padding: 2px;
}
.dataList > ul > li > div.bmiIcon > p {
  border-radius: 50%;
  background: #2e2e2e;
  width: 10vw;
  height: 10vw;
  line-height: 10vw;
  text-align: center;
  background: #2ac895;
  overflow: hidden;
  color: #fff;
  font-size: 0.6rem;
}

.Val span,.Val i{
	color: #0EB0CD;
}
.Val span{
	font-size: 1.2rem;
	
}


</style>
