<!--
  成绩查询(新增)
  像素单位使用vw,vh,
--> 
<template>
  <div id="Inquire" :class="{cur: active}">
    <div class="topbar clearfix">
      <img src="../assets/img/goback.png" alt="" @click="toRet">
      <h3>成绩添加</h3>
    </div>
    <div class="info">
      <div class="infoWrap">
        <label for="inquireName">姓名:</label>
        <input type="text" id="inquireName" v-model="studentName" v-bind="{disabled: max}">
      </div>
      <div class="infoWrap">
        <label for="inquireScholar">学号:</label>
        <input type="text" id="inquireScholar" v-bind="{disabled: max}" v-model="studentXH">
      </div>
      <div class="infoWrap">
        <label for="inquireCard">卡号:</label>
        <input type="text" id="inquireCard" v-bind="{disabled: max}" v-model="studentCard">
      </div>
      <div class="infoWrap">
        <label for="inquireClasses">班级:</label>
        <input type="text" id="inquireClasses" v-bind="{disabled: max}" v-model="studentClasses">
      </div>
      <div class="infoWrap">
        <label for="Infoproject">项目:</label>
        <select id="Infoproject" v-bind="{disabled: max}" @change="test($event)">
          <option v-for="(items,index,key) in project" :key="key">{{items.name}}</option>
        </select>
      </div>
      <div class="infoWrap">
        <label for="inquireAchievement">成绩:</label>
        <input type="text" id="inquireAchievement" v-bind="{disabled: max}" v-model="studentScore">
      </div>
      <div>
        <input type="text" v-model="tip" disabled id="tip">
      </div>
    </div>
    <div class="foot">
      <button class="btn" @click="submit" v-bind="{disabled: max}">提交</button>
      <button class="btn" @click="inquire" v-bind="{disabled: max}">查询</button>
    </div>

    <!--
      提交，查询模态框
    -->
    <div class="module" id="Get" v-show="sub">
      <h3>是否确认提交</h3>
      <span @click="close" class="closeX">x</span>
      <div class="Mwrap">
        <p>
          <span>项目:</span>
          <span v-if="project[Eindex].name != undefined">{{project[Eindex].name}}</span>
        </p>
        <p>
          <span>成绩:</span>
          <span v-text="studentScore"></span>
        </p>
        <p>
          <span>评分:</span>
          <span v-text="studentScoreI"></span>
        </p>
      </div>
      <div class="btns">
        <button class="btn" @click="Yes">确认</button>
        <button class="btn" @click="close">取消</button>
      </div>
    </div>
    
    <div class="module maxH" v-show="inq">
      <h3 v-text="info"></h3>
      <span @click="close" class="closeX">x</span>
      <div class="listTop">
        <span class="inquireName">姓名</span>
        <span class="inquireScholar">学号</span>
        <span class="inquireClasses">班级</span>
        <span class="">操作</span>
      </div>
      <ol class="lists">
        <li v-for="(lists,index,key) in inqData" @click="selecting(index)">
          <span class="inquireName">{{ lists.NAME }}</span>
          <span class="inquireScholar">{{ lists.STUDENT_ID }}</span>
          <span class="inquireClasses">{{ lists.CLASSNAME }}</span>
          <span class="" @click="selecting(index)">选择</span>
        </li>
      </ol>
    </div>


    <div class="modell" v-show="motai">
      <div class="model-img">
        <img src="../assets/img/xinxitu@2x.png" width="100%">
      </div>
      <div class="model-text">
        请输入成绩
      </div>
      <div class="model-content" >
        <div class="model-btn" @click="close">知道了</div>
      </div>
    </div>

    <div class="model-status" v-show="modelGet">
      <div class="model-text">
        提交成功
      </div>
      <div class="model-content" >
        <div class="model-btn" @click="close">知道了</div>
      </div>
    </div>

    <div class="model-status" v-show="modelFas">
      <div class="model-text">
        提交失败
      </div>
      <div class="model-content" >
        <div class="model-btn" @click="close">知道了</div>
      </div>
    </div>
    
  </div>
</template>

<script>
import $ from "jquery";
import int from "../assets/js/interface";

export default {
  name: "Inquire",
  data() {
    return {
      modelFas: false,
      modelGet: false,
      motai: false,
      tips: [],
      tip: "",
      studentScoreI: "",
      max: false,
      Eindex: 0,
      active: false,
      info: "学生列表",
      studentName: "",
      studentXH: "",
      studentCard: "",
      studentClasses: "",
      studentScore: "",
      project: {},
      sub: false,
      inq: false,
      inqData: []
    };
  },
  methods: {
    toRet() {
      this.$router.go(-1);
    },
    test(e) {
      this.Eindex = e.target.selectedIndex;
      this.tip = this.project[this.Eindex].tip;
    },
    submit() {
      var vm = this;
      vm.sub = true;
      vm.active = true;
      vm.max = true;
      if (this.studentScore == "") {
        vm.motai = true;
        vm.sub = false;
        vm.active = false;
        vm.max = false;
      } else {
        $.ajax({
          url: int.addStore,
          dataType: "jsonp",
          data: {
            sid: window.iosParams.sid,
            project_id: vm.project[vm.Eindex].id,
            card_no: vm.studentCard,
            tmp: vm.studentScore
          },
          success: function(response) {
            vm.studentScoreI = response.score;
          },
          error: function(err) {
            console.log("err" + err);
          }
        });
      }
    },
    Yes() {
      var vm = this;
      $.ajax({
        url:
          int.Inq1,
        dataType: "jsonp",
        data: {
          sid: window.iosParams.sid,
          project_id: vm.project[vm.Eindex].id,
          card_no: vm.studentCard,
          tmp: vm.studentScore,
          score: vm.studentScoreI
        },
        success: function(response) {
          vm.modelGet = true;
          vm.inq = false;
          vm.active = false;
          vm.max = false;
          vm.sub = false;
          vm.studentScoreI = "";
          vm.studentName = "";
          vm.studentXH = "";
          vm.studentCard = "";
          vm.studentClasses = "";
          vm.studentScore = "";
        },
        error: function(err) {
          vm.modelFas = true;
          console.log("err" + err);
        }
      });
    },
    inquire() {
      var vm = this;
      vm.inq = true;
      vm.active = true;
      vm.max = true;
      $.ajax({
        url:int.Inq2,
        data: {
          name: vm.studentName,
          stu_id: vm.studentXH,
          card_no: vm.studentCard,
          sid: window.iosParams.sid
        },
        dataType: "jsonp",
        success: function(response) {
          if (response.data.student.length == 1) {
            vm.inq = false;
            vm.active = false;
            vm.max = false;
            vm.sub = false;
            vm.studentName = response.data.student[0].NAME;
            vm.studentXH = response.data.student[0].STUDENT_ID;
            vm.studentCard = response.data.student[0].card_no;
            vm.studentClasses = response.data.student[0].CLASSNAME;
          } else {
            vm.inqData = response.data.student;
          }
        },
        error: function(err) {
          console.log("error:" + err);
        }
      });
    },
    close() {
      this.modelFas = false;
      this.modelGet = false;
      this.motai = false;
      this.inq = false;
      this.active = false;
      this.max = false;
      this.sub = false;
    },
    selecting(index) {
      this.inq = false;
      this.active = false;
      this.max = false;
      this.sub = false;
      this.studentName = this.inqData[index].NAME;
      this.studentXH = this.inqData[index].STUDENT_ID;
      this.studentCard = this.inqData[index].card_no;
      this.studentClasses = this.inqData[index].CLASSNAME;
    }
  },
  created() {
    var vm = this;
    $.ajax({
      url:
        int.Inq3,
      data: {
        sid: window.iosParams.sid
      },
      dataType: "jsonp",
      success: function(response) {
        vm.project = response.data;
        vm.tip = response.data[vm.Eindex].tip;
      },
      error: function(err) {
        console.log("error:" + err);
      }
    });
  }
};
</script>

<style scoped>
/*scc reset*/
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
*::after {
  box-sizing: border-box;
}
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
ol,
ul,
li {
  list-style: none;
}
a {
  text-decoration: none;
}

#Inquire {
  position: relative;
  width: 100vw;
  height: 100vh;
  /* background: #2e2e31; */
  color: #888;
}
#Inquire.cur {
  background: #2e2e31;
}
#Inquire.cur input {
  background: #ccc;
}
#Inquire.cur select {
  background: #2e2e31;
}
#Inquire .topbar {
  height: 9vh;
  border-bottom: 1px solid #ccc;
  line-height: 8vh;
}
#Inquire .topbar img {
  float: left;
  height: 4vh;
  margin: 2vh 0 2vh 1vw;
}
#Inquire .topbar > h3 {
  color: #ccc;
  vertical-align: middle;
  text-align: center;
}
#Inquire .info {
  height: 80vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-bottom: 3vh;
}
#Inquire .info > div {
  margin-top: 3vh;
}
#Inquire .info > div > input {
  border: none;
  outline: none;
  width: 50vw;
  height: 5vh;
  min-height: 32px;
  font-size: 14px;
  text-indent: 1vw;
  border-radius: 1vw;
  color: #888;
  margin-left: 2vw;
  border: 1px solid #ccc;
  border-radius: 1vw;
}
#Inquire .info > div > select {
  border: none;
  outline: none;
  width: 50vw;
  height: 4vh;
  font-size: 14px;
  text-indent: 1vw;
  border-radius: 1vw;
  color: #888;
  margin-left: 2vw;
  border: 1px solid #ccc;
  border-radius: 1vw;
  min-height: 32px;
}

#Inquire .foot {
  height: 11vh;
  display: flex;
  justify-content: space-around;
  text-align: center;
  align-items: center;
  padding-bottom: 6vh;
}
#Inquire .foot .btn {
  background-color: #00b77c;
  color: #ffffff;
  text-align: center;
  font-size: 0.8rem;
  border: none;
  display: inline-block;
  width: 30vw;
  height: 5vh;
  border-radius: 1vw;
  outline: none;
  min-height: 33px;
}

#Inquire .module {
  font-size: 12px;
  color: #000;
  position: absolute;
  z-index: 7;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 1vw;
  width: 80vw;
  background: #fff;
  padding: 2.5vh 0 4vh 0;
}
#Inquire .module > h3 {
  text-align: center;
  font-size: 16px;
}
#Inquire .module .listTop {
  font-size: 12px;
  margin: 0 3vw;
  padding: 2vh 0 1vh 0;
  border-bottom: 1px solid #ccc;
}
#Inquire .module ol {
  font-size: 12px;
  background: #fff;
}
#Inquire .module li {
  font-size: 12px;
  margin: 0 3vw;
  padding: 2vh 0 1vh 0;
  border-bottom: 1px solid #ccc;
}
#Inquire .module span {
  font-size: 12px;
  display: inline-block;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
#Inquire .module .inquireName {
  width: 13vw;
}
#Inquire .module .inquireScholar {
  width: 23vw;
}
#Inquire .module .inquireClasses {
  width: 21vw;
}
.closeX {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 16px;
  width: 5vw;
  height: 5vw;
  border-bottom: 1px solid #000;
  border-left: 1px solid #000;
  text-align: center;
  line-height: 5vw;
}
#Inquire .module .Mwrap > p {
  text-align: center;
  font-size: 16px;
  padding-top: 1vh;
  color: #888;
}
#Inquire .module .btns {
  text-align: center;
  margin-top: 4vh;
}
#Inquire .module .btn {
  display: inline-block;
  width: 30vw;
  height: 5vh;
  line-height: 5vh;
  border: 1px solid #ccc;
  background: transparent;
  border: 1px solid #000;
  border-radius: 1vw;
  outline: none;
}
#Inquire input#tip {
  width: 100vw;
  text-align: center;
  appearance: none;
  border: none;
  background: none;
  color: red;
}

.modell {
  position: absolute;
  z-index: 30;
  width: 12rem;
  height: 13rem;
  left: 50%;
  top: 50%;
  margin-top: -6.5rem;
  margin-left: -6rem;
  background-color: #f6f6f6;
  border-radius: 0.5rem;
}
.model-img img {
  width: 7rem;
  height: 8rem;
  margin-left: 2.5rem;
  margin-top: 1rem;
}
.model-text {
  font-size: 0.75rem;
  color: #000000;
  text-align: center;
}
.model-content {
  border-top: 1px solid #c9cbd1;
  margin-top: 0.5rem;
  height: 4rem;
  width: 100%;
}
.model-btn {
  width: 5rem;
  margin-left: 3.5rem;
  height: 1.5rem;
  border-radius: 1rem;
  background-color: #33b097;
  color: #ffffff;
  font-size: 0.7rem;
  margin-top: 0.5rem;
  text-align: center;
  line-height: 1.5rem;
}
.model-b {
  top: 0;
  position: absolute;
  width: 100%;
  /*height: 100%;*/
  z-index: 20;
  background-color: #000000;
  opacity: 0.7;
}
.main-btn {
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
.main-title {
  color: #fff;
  text-align: center;
  padding-top: 5rem;
}
.model-status {
  position: absolute;
  z-index: 35;
  width: 12rem;
  left: 50%;
  top: 50%;
  margin-top: -6.5rem;
  margin-left: -6rem;
  background-color: #f6f6f6;
  border-radius: 0.5rem;
}
.model-status .model-text {
  padding: 2vh;
}
.maxH {
  height: 100vh;
}
</style>
