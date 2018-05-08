// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import store from './Vuex/store'
import iView from 'iview';
import echarts from 'echarts'

import 'iview/dist/styles/iview.css';
import '@/assets/js/rem.js';
import '@/assets/js/echart.min.js';

//import  '@/assets/js/jquery-weui'
//import  '@/assets/css/jquery-weui'


Vue.use(iView);
Vue.use(Vuex);
// var echarts=require('echarts');
Vue.config.productionTip = false;

/* eslint-disable no-new */
var u = navigator.userAgent;
if(!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
  var time=setInterval(function() {
    if (window.iosParams.stuTid) {
      // alert(window.iosParams.stuTid);
      window.external.changeNavBarColor('#2E2E31,Y');
      new Vue({
        el: '#app',
        router,
        store,
        template: '<App/>',
        components: { App }
      });
      clearInterval(time);
    }
  },100);

}else if(window.GreenSchool){
  window.iosParams.sid=window.GreenSchool.getSchoolId();
  window.iosParams.userid=window.GreenSchool.getUserID();
  window.iosParams.stuTid=window.GreenSchool.getStudentId();
  window.GreenSchool.showTitleBar(false);
  window.GreenSchool.setStatusBarAndActionBarColor('#2E2E31');

  new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
  })
  // alert(window.iosParams.stuTid+"xxxx"+window.iosParams.sid+"xxxx"+window.iosParams.userid);
//  alert(1);
}else{
//  alert(2);
    //家长
    // window.iosParams.stuTid=89625;
  // window.iosParams.sid=114;
  // window.iosParams.stuTid=958685038;//可园学校老师
  window.iosParams.sid=119;
//   window.iosParams.stuTid=171;  //171测试区长帐号
  // window.iosParams.stuTid=454466819;  //171测试学校领导
//window.iosParams.stuTid=185;    //学生
//window.iosParams.stuTid; 


    //班主任
  // window.iosParams.stuTid=652973116;   //171测试学校班主任


  // 领导
  // window.iosParams.stuTid=868994376;    //SZ中学 梁佑1 班主任  96
  // window.iosParams.stuTid=873007600;
    //测试学生

    // window.iosParams.stuTid=89617;
  // window.iosParams.stuTid=978545527;
  // alert(11111);
  new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
  })
}




//
// if(window.GreenSchool){
//   // window.iosParams.sid=window.GreenSchool.getSchoolId();
//   window.GreenSchool.showTitleBar(false);
//   // alert(window.iosParams.sid);
//   new Vue({
//     el: '#app',
//     router,
//     template: '<App/>',
//     components: { App }
//   })
// }else{
//   // alert(window.iosParams.sid);
//   new Vue({
//     el: '#app',
//     router,
//     template: '<App/>',
//     components: { App }
//   })
// }
