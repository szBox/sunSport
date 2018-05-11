/**
 * Created by Administrator on 2017/8/18.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import $ from 'jquery'
import api from '../fetch/api';
import * as types from '../vuex/type';
Vue.use(Vuex)

const moduleA = {
  state: {
    initweek:'',
    startTime:'',
    movieID: '',
    week:'',
    count:0,
    weeks:[],
    week__s:[],
    loadCount:0,
     data:{
        nowweek:'',
        base:{
          user:{
            name:'',
            sex:'',
            cname:'',
            grade:'',
            card:'',
            class:'',
            sid:'',
            highest:'',
            class_ranking:'',
            grade_ranking:'',
            school_ranking:'',
            uid:'',   //自己新加的,
          },
          qualified:'',
          each_average:{},
          all_average:''
        },
        // basic:{
        //   pic:'../assets/img/tx.png',
        //   name:'',
        //   sex:'',
        //   grade:'',
        //   card:'',
        //   nowdate:'2017上学期第一周',
        //   alldate:['2017上学期第二周','2017上学期第三周','2017上学期第四周','2017上学期第五周','2017上学期第六周',
        //     '2017上学期第七周','2017上学期第八周','2017上学期第九周','2017上学期第十周','2017上学期第十一周','2017上学期第十二周','2017上学期第十三周','2017上学期第十四周',
        //     '2017上学期第十五周','2017上学期第十六周','2017上学期第十七周','2017上学期第十八周','2017上学期第十九周','2017上学期第二十周'
        //     ],
        //   project:[{name: "仰卧起坐",max: 150},
        //     {name: '立定跳远',max: 150},
        //     {name: '引体向上',max: 150},
        //     {name: '肺活量',max: 150},
        //     {name: '跳绳',max: 150},
        //     {name: '1000米跑',max: 150},
        //     {name: '篮球运动',max: 150}],
        //   score:[90,89,70,75,90,100,85],
        //   week:'练习周',
        //   rate:'90%',
        //   average:84.3,
        //   topgrade:92,
        //   classrank:6,
        //   graderank:19,
        //   schoolrank:125
        // },
        // grows:{
        //   user: {
        //     averaged: '',
        //     highest: '',
        //     assessment: '',
        //     qualified: '',
        //     good_rate: '',
        //     excellent_rate: '',
        //     class_ranking: '',
        //     grade_ranking: '',
        //     school_ranking: '',
        //     // linechartdate: ['第一周', '第二周', '第三周', '第四周', '第五周', '第六周', '第七周', '第八周'],
        //   },
        //   my:[],
        //   classid:[]
        // },
        grow:{
          // starttime1:'选择起始时间',
          // starttime:['第一周','第二周','第三周','第四周','第五周','第六周','第七周','第八周','第九周','第十周','第十一周','第十二周','第十三周','第十四周','第十五周','第十六周','第十七周','第十八周','第十九周','第二十周'],
          // endtime1:'选择结束时间',
          // endtime:['第一周','第二周','第三周','第四周','第五周','第六周','第七周','第八周','第九周','第十周','第十一周','第十二周','第十三周','第十四周','第十五周','第十六周','第十七周','第十八周','第十九周','第二十周'],
          // nowproject:'全部项目',
          // allproject:['仰卧起坐','立定跳远','引体向上','肺活量','跳绳','1000米跑','篮球运动'],
          average:'',
          topscore:'',
          assessment:'',
          passrate:'',
          well:'',
          excellent:'',
          classrank:'',
          graderank:'',
          schoolrank:'',
          // linechartdate:['第一周','第二周','第三周','第四周','第五周','第六周','第七周','第八周'],
          linechartdata: {
            // {linedata1:[80, 92, 81, 74, 98, 80, 90,100]},
            // {linedata2:[70, 80, 91, 74, 98, 70, 90,80]}
          }
        },
        // details:{
          // project:[],
          // num:[],
          // score:[],
          // assessment:[],
          // status:[],
          // average:[],
          // fraction:[]
        // },
         detail:[]
        // detail:[
        //     {
        //       project:'立定跳远',
        //       num:'2.75米',
        //       score:'110分',
        //       assessment:'A',
        //       status:1,
        //       fraction:[80, 105, 98],
        //       average:[75, 95, 80]
        //     },
        //     {
        //
        //       project:'引体向上',
        //       num:'45次',
        //       score:'90分',
        //       assessment:'A',
        //       status:0,
        //       fraction:[80, 105, 98],
        //       average:[75, 95, 80]
        //     },
        //     {
        //       project:'仰卧起坐',
        //       num:'45次',
        //       score:'90分',
        //       assessment:'A',
        //       status:0,
        //       fraction:[80, 105, 98],
        //       average:[75, 95, 80]
        //     }
        //   ]

     }
  },
  mutations: {
    [types.STORE_MOVIE_ID]( state, res) {
      state.movieID = res;
    },
  },
  actions: {
      // get_main_data(context){
      //   alert(2);
      //   $.ajax({
      //     type:'get',
      //     url:'120.76.100.48/index.php?m=content&f=statistics&v=index',
      //     success:function(d){
      //       console.log(d);
      //     },
      //     error:function(err) {
      //       console.log("错误信息："+JSON.stringify(err));
      //     }
      //   })
      // }
      storeMovieID({commit}, res) {
        console.log(2);
        //此处是触发mutation的 STORE_MOVIE_ID为"mutation名"
        commit(types.STORE_MOVIE_ID, res);
      }
  }
}

const moduleB = {
  state: {
    initweek:'',
    startTime:'',
    cid:'',
    weeks:[],
    projectname:'',
    week:'',
    projectid:'',
    // rate:'',
    projectnum:[],
    // basic:{
    //   pic:'',
    //   name:'',
    //   sex:'',
    //   grade:'',
    //   card:'',
    //   nowdate:'2017上学期第一周',
    //   alldate:['2017上学期第二周','2017上学期第三周','2017上学期第四周','2017上学期第五周','2017上学期第六周',
    //     '2017上学期第七周','2017上学期第八周','2017上学期第九周','2017上学期第十周','2017上学期第十一周','2017上学期第十二周','2017上学期第十三周','2017上学期第十四周',
    //     '2017上学期第十五周','2017上学期第十六周','2017上学期第十七周','2017上学期第十八周','2017上学期第十九周','2017上学期第二十周'
    //   ],
    //   project:[{name: "仰卧起坐",max: 150},
    //     {name: '立定跳远',max: 150},
    //     {name: '引体向上',max: 150},
    //     {name: '肺活量',max: 150},
    //     {name: '跳绳',max: 150},
    //     {name: '1000米跑',max: 150},
    //     {name: '篮球运动',max: 150}],
    //   score:[90,89,70,75,90,100,85],
    //   week:'练习周',
    //   rate:'90%',
    //   average:84.3,
    //   topgrade:92,
    //   graderank:19,
    //   schoolrank:125
    // },
    basic:{
      card:'',
      uid:'',   //自己新加的,
      project_avg:{},
      project:[],
      score:[],
      average:'',
      rate:'',
      topgrade:'',
      graderank:'',
      schoolrank:''
    },
    grow:{
      average:'',
      topscore:'',
      passrate:'',
      well:'',
      excellent:'',
      assessment:'',
      graderank:'',
      schoolrank:'',
      linechartdata:{}
    },
    // grow:{
    //   starttime1:'选择起始时间',
    //   starttime:['第一周','第二周','第三周','第四周','第五周','第六周','第七周','第八周','第九周','第十周','第十一周','第十二周','第十三周','第十四周','第十五周','第十六周','第十七周','第十八周','第十九周','第二十周'],
    //   endtime1:'选择结束时间',
    //   endtime:['第一周','第二周','第三周','第四周','第五周','第六周','第七周','第八周','第九周','第十周','第十一周','第十二周','第十三周','第十四周','第十五周','第十六周','第十七周','第十八周','第十九周','第二十周'],
    //   nowproject:'全部项目',
    //   allproject:['仰卧起坐','立定跳远','引体向上','肺活量','跳绳','1000米跑','篮球运动'],
    //   average:80,
    //   topscore:110,
    //   assessment:'B',
    //   passrate:'100%',
    //   well:'80%',
    //   excellent:'12%',
    //   classrank:6,
    //   graderank:19,
    //   schoolrank:121,
    //   linechartdate:['第一周','第二周','第三周','第四周','第五周','第六周','第七周','第八周'],
    //   linechartdata:[
    //     {linedata1:[80, 92, 81, 74, 98, 80, 90,100]},
    //     {linedata2:[70, 80, 91, 74, 98, 70, 90,80]}
    //   ]
    // },
    details:[]
      // {
      //   project:'仰卧起坐',
      //   rate:'90%',
      //   average_scores:'50米',
      //   average:'110分',
      //   assessment:'A',
      //   passrate:'100%',
      //   well:'80%',
      //   excellent:'12%',
      //   topscore:110,
      //   graderank:19,
      //   schoolrank:121
      // },
      // {
      //
      //   project:'立定跳远',
      //   rate:'90%',
      //   average_scores:'40个',
      //   average:'110分',
      //   assessment:'A',
      //   passrate:'100%',
      //   well:'80%',
      //   excellent:'12%',
      //   topscore:110,
      //   graderank:19,
      //   schoolrank:121
      // },
      // {
      //
      //   project:'引体向上',
      //   rate:'90%',
      //   average_scores:'40个',
      //   average:'110分',
      //   assessment:'A',
      //   passrate:'100%',
      //   well:'80%',
      //   excellent:'12%',
      //   topscore:110,
      //   graderank:19,
      //   schoolrank:121
      // },
      // {
      //
      //   project:'肺活量',
      //   rate:'90%',
      //   average_scores:'800次',
      //   average:'110分',
      //   assessment:'A',
      //   passrate:'100%',
      //   well:'80%',
      //   excellent:'12%',
      //   topscore:110,
      //   graderank:19,
      //   schoolrank:121
      // },
      // {
      //
      //   project:'跳绳',
      //   rate:'90%',
      //   average_scores:'40个',
      //   average:'110分',
      //   assessment:'A',
      //   passrate:'100%',
      //   well:'80%',
      //   excellent:'12%',
      //   topscore:110,
      //   graderank:19,
      //   schoolrank:121
      // },
      // {
      //
      //   project:'1000米跑',
      //   rate:'90%',
      //   average_scores:'40个',
      //   average:'110分',
      //   assessment:'A',
      //   passrate:'100%',
      //   well:'80%',
      //   excellent:'12%',
      //   topscore:110,
      //   graderank:19,
      //   schoolrank:121
      // },
      // {
      //   project:'篮球运动',
      //   rate:'90%',
      //   average_scores:'40个',
      //   average:'110分',
      //   assessment:'A',
      //   passrate:'100%',
      //   well:'80%',
      //   excellent:'12%',
      //   topscore:110,
      //   graderank:19,
      //   schoolrank:121
      // }
    ,
    single_project_data:{
      // project:'立定跳远',
      // rate:'90%',
      // average:'110分',
      // topscore:110,
      // assessment:'A',
      // gardescore:'90',
      // graderank:19,
      // classname:'四年级一班',
      // classnum:40,
      //
      // no_passrate:'100%',
      // no_passrate_num:5,
      // passrate:'90%',
      // passrate_num:10,
      // well:'80%',
      // well_num:10,
      // excellent:'12%',
      // excellent_num:15,
      // class_score:[80,90,100,70],
      // grade_score:[70,80,80,90]
    },
    failure:{
      time:'2017上学期第一周',
      rate:'90%',
      average_score:'2.17米',
      average:'100',
      status:1,
      assessment:'A',
      all_failure:[
        {
          name:'王大状',
          average_score:'2.17米',
          average:'100',
          status:1,
          assessment:'A',
        },
        {
          name:'王二麻子',
          average_score:'2.17米',
          average:'100',
          status:1,
          assessment:'A',
        }
      ]
    }
  },
  mutations: {

  },
  actions: {

  }
}


const moduleC = {
  state: {
    initweek:'',
    startTime:'',
    model:false,
    count:0,
    weeks:[],
    week_s:[],
    time:'',
    time1:'',
    num:'',
    week:'',
    basic:{
      // pic:'../assets/img/tx.png',
      // name:'',
      // sex:'',
      // grade:'',
      card:'',
      uid:'',   //自己新加的,
      card1:'',
      // nowdate:'2017上学期第一周',
      // alldate:['2017上学期第二周','2017上学期第三周','2017上学期第四周','2017上学期第五周','2017上学期第六周',
      //   '2017上学期第七周','2017上学期第八周','2017上学期第九周','2017上学期第十周','2017上学期第十一周','2017上学期第十二周','2017上学期第十三周','2017上学期第十四周',
      //   '2017上学期第十五周','2017上学期第十六周','2017上学期第十七周','2017上学期第十八周','2017上学期第十九周','2017上学期第二十周'
      // ],
      // project:[{name: "四年级一班",max: 150},
      //   {name: '四年级二班',max: 150},
      //   {name: '四年级三班',max: 150},
      //   {name: '四年级四班',max: 150},
      //   {name: '四年级五班',max: 150},
      //   {name: '四年级六班',max: 150},
      //   {name: '四年级七班',max: 150}],
      // score:[90,89,70,75,90,100,85],
      // week:'练习周',
      // rate:'90%',
      // average:84.3,
      // topscore:92,
      // topclass:'四年级五班'
      project:[],
      score:[],
      topclass:'',
      topscore:'',
      average:'',
      rate:'',
      classid:[]
    },
    statistics:{
      starttime1:'选择起始时间',
      starttime:['第一周','第二周','第三周','第四周','第五周','第六周','第七周','第八周','第九周','第十周','第十一周','第十二周','第十三周','第十四周','第十五周','第十六周','第十七周','第十八周','第十九周','第二十周'],
      endtime1:'选择结束时间',
      endtime:['第一周','第二周','第三周','第四周','第五周','第六周','第七周','第八周','第九周','第十周','第十一周','第十二周','第十三周','第十四周','第十五周','第十六周','第十七周','第十八周','第十九周','第二十周'],
      taught_grade:['一年级','二年级','三年级','四年级'],
      taught_class:['一年级二班','二年级三班','三年级四班','四年级五班'],
      taught_project:['篮球运动','引体向上'],
      allproject:['仰卧起坐','立定跳远','引体向上','肺活量','跳绳','1000米跑','篮球运动'],
      score:[60,80,100,90,50,40,80],
      average:80,
      topscore:110,
      assessment:'B',
      passrate:'100%',
      well:'80%',
      excellent:'12%',
      topscore1:100,
      topgrade:'五年级',
      topclass:'六年级一班',
      linechartdate:['第一周','第二周','第三周','第四周','第五周','第六周','第七周','第八周'],
      linechartdata:[
        {linedata1:[80, 92, 81, 74, 98, 80, 90]},
      ]
    },
    details:[
      {
        project:'立定跳远',
        rate:'90%',
        average:'110分',
        topscore:'110分',
        assessment:'A',
        passrate:'100%',
        well:'80%',
        excellent:'12%',
        topscore1:'92',
        topclass:'四年级五班',
        linechartdata:[
          {
            linedata1:[80, 92, 81, 74, 98, 80, 90]
          },
          {
            linedata2:[80, 92, 81, 74, 98, 80, 90]
          }
        ]
      },
      {
        project:'立定跳远',
        rate:'90%',
        average:'110分',
        topscore:'110分',
        assessment:'A',
        passrate:'100%',
        well:'80%',
        excellent:'12%',
        topscore1:'92',
        topclass:'四年级五班',
        linechartdata:[
          {
            linedata1:[80, 92, 81, 74, 98, 80, 90]
          },
          {
            linedata2:[80, 92, 81, 74, 98, 80, 90]
          }
        ]
      }
    ],
    single_class_data:{
      nowdate:'2017上学期第一周',
      alldate:['2017上学期第二周','2017上学期第三周','2017上学期第四周','2017上学期第五周','2017上学期第六周',
        '2017上学期第七周','2017上学期第八周','2017上学期第九周','2017上学期第十周','2017上学期第十一周','2017上学期第十二周','2017上学期第十三周','2017上学期第十四周',
        '2017上学期第十五周','2017上学期第十六周','2017上学期第十七周','2017上学期第十八周','2017上学期第十九周','2017上学期第二十周'
      ],
      classname:'四年级一班',
      project:[{name: "仰卧起坐",max: 150},
        {name: '立定跳远',max: 150},
        {name: '引体向上',max: 150},
        {name: '肺活量',max: 150},
        {name: '跳绳',max: 150},
        {name: '1000米跑',max: 150},
        {name: '篮球运动',max: 150}],
      score:[90,89,70,75,90,100,85],
      week:'练习周',
      rate:'90%',
      average:84.3,
      topgrade:92,
      graderank:19,
      schoolrank:125
    },
    single_class_detail_data:[
        {
          project:'立定跳远',
            rate:'90%',
          average_scores:'50米',
          average:'110分',
          assessment:'A',
          passrate:'100%',
          well:'80%',
          excellent:'12%',
          topscore:110,
          graderank:19,
          schoolrank:121
        },
        {

          project:'引体向上',
            rate:'90%',
          average_scores:'40个',
          average:'110分',
          assessment:'A',
          passrate:'100%',
          well:'80%',
          excellent:'12%',
          topscore:110,
          graderank:19,
          schoolrank:121
        }
    ],
    classgrow:{
      starttime1:'选择起始时间',
      starttime:['第一周','第二周','第三周','第四周','第五周','第六周','第七周','第八周','第九周','第十周','第十一周','第十二周','第十三周','第十四周','第十五周','第十六周','第十七周','第十八周','第十九周','第二十周'],
      endtime1:'选择结束时间',
      endtime:['第一周','第二周','第三周','第四周','第五周','第六周','第七周','第八周','第九周','第十周','第十一周','第十二周','第十三周','第十四周','第十五周','第十六周','第十七周','第十八周','第十九周','第二十周'],
      nowproject:'全部项目',
      allproject:['仰卧起坐','立定跳远','引体向上','肺活量','跳绳','1000米跑','篮球运动'],
      average:80,
      topscore:110,
      assessment:'B',
      passrate:'100%',
      well:'80%',
      excellent:'12%',
      classrank:6,
      graderank:19,
      schoolrank:121,
      linechartdate:['第一周','第二周','第三周','第四周','第五周','第六周','第七周','第八周'],
      linechartdata:[
        {linedata1:[80, 92, 81, 74, 98, 80, 90,100]},
        {linedata2:[70, 80, 91, 74, 98, 70, 90,80]}
      ]
    },
    single_class_project_data:{
      project:'立定跳远',
      rate:'90%',
      average:'110分',
      topscore:110,
      assessment:'A',
      gardescore:'90',
      graderank:19,
      classname:'四年级一班',
      classnum:40,
      no_passrate:'100%',
      no_passrate_num:5,
      passrate:'90%',
      passrate_num:10,
      well:'80%',
      well_num:10,
      excellent:'12%',
      excellent_num:15,
      class_score:[80,90,100,50],
      grade_score:[70,80,80,90]
    },
    failure:{
      time:'2017上学期第一周',
      rate:'90%',
      average_score:'2.17米',
      average:'100',
      staus:1,
      assessment:'A',
      all_failure:[
        {
          name:'王大状',
          average_score:'2.17米',
          average:'100',
          staus:1,
          assessment:'A',
        },
        {
          name:'王二麻子',
          average_score:'2.17米',
          average:'100',
          staus:1,
          assessment:'A',
        }
      ]
    }
  },
  mutations: {

  },
  actions: {

  }
}

const moduleD = {
  state: {
    initweek:'',
    startTime:'',
    weeks:[],
    week_s:[],
    week__s:[],
    count:0,
    num:0,
    sid:'',
    week:'',
    card:'',
    uid:'',   //自己新加的,
    gid:'',
    cid:'',
    weekb:'',
    weeke:'',
    pid:'',
    sgid:'',
    projectid:[],
    allproject:[],
    allgrade:[],
    gradeid:[],
    allclass:[],
    classid:[],
    basic:{
      // pic:'../assets/img/tx.png',
      // name:'',
      // sex:'',
      // grade:'',
      // card:'',
      // nowdate:'2017上学期第一周',
      // alldate:['2017上学期第二周','2017上学期第三周','2017上学期第四周','2017上学期第五周','2017上学期第六周',
      //   '2017上学期第七周','2017上学期第八周','2017上学期第九周','2017上学期第十周','2017上学期第十一周','2017上学期第十二周','2017上学期第十三周','2017上学期第十四周',
      //   '2017上学期第十五周','2017上学期第十六周','2017上学期第十七周','2017上学期第十八周','2017上学期第十九周','2017上学期第二十周'
      // ],
      project:[],
      score:[],
      week:"",
      rate:'',
      average:'',
      topscore:'',
      topclass:'',
      topgrade:''
    },
    statistics:{
      // starttime1:'选择起始时间',
      // starttime:['第一周','第二周','第三周','第四周','第五周','第六周','第七周','第八周','第九周','第十周','第十一周','第十二周','第十三周','第十四周','第十五周','第十六周','第十七周','第十八周','第十九周','第二十周'],
      // endtime1:'选择结束时间',
      // endtime:['第一周','第二周','第三周','第四周','第五周','第六周','第七周','第八周','第九周','第十周','第十一周','第十二周','第十三周','第十四周','第十五周','第十六周','第十七周','第十八周','第十九周','第二十周'],
      // taught_grade:['一年级','二年级','三年级','四年级','五年级','六年级'],
      // taught_class:['一年级一班','一年级二班班','一年级三班','一年级四班','一年级五班','二年级三班','三年级四班','四年级五班'],
      // taught_project:['仰卧起坐','立定跳远','引体向上','肺活量','跳绳','1000米跑','篮球运动'],
      project:[],
      score:[],
      average:'',
      topscore:'',
      assessment:'',
      passrate:'',
      well:'',
      excellent:'',
      topscore1:'',
      topgrade:'',
      topclass:'',
      linechartdate:[]

    },
    prate:'',
    classname:'',
    single_statistics:{
      topscore:'',
      assessment:'',
      average:'',
      result:'',
      no_passrate:'',
      well:'',
      excellent:'',
      class:[],
      no_passrate_num:'',
      passrate_num:'',
      well_num:'',
      excellent_num:'',
      rank:'',
      grade:[],
      all_student:'',
      absent_student:''
    },

    detail:[

    ],
    single_grade_data:{

      // nowdate:'2017上学期第一周',
      // alldate:['2017上学期第二周','2017上学期第三周','2017上学期第四周','2017上学期第五周','2017上学期第六周',
      //   '2017上学期第七周','2017上学期第八周','2017上学期第九周','2017上学期第十周','2017上学期第十一周','2017上学期第十二周','2017上学期第十三周','2017上学期第十四周',
      //   '2017上学期第十五周','2017上学期第十六周','2017上学期第十七周','2017上学期第十八周','2017上学期第十九周','2017上学期第二十周'
      // ],
      gradename:'',
      project:[],
      score:[],
      classid:[],
      rate:'',
      average:'',
      topscore:'',
      topclass:''
    },
    details:[],
    single_class_detail_data:[
      // {
      //   project:'立定跳远',
      //   rate:'90%',
      //   average_scores:'50米',
      //   average:'110分',
      //   assessment:'A',
      //   passrate:'100%',
      //   well:'80%',
      //   excellent:'12%',
      //   topscore:110,
      //   graderank:19,
      //   schoolrank:121
      // },
      // {
      //
      //   project:'引体向上',
      //   rate:'90%',
      //   average_scores:'40个',
      //   average:'110分',
      //   assessment:'A',
      //   passrate:'100%',
      //   well:'80%',
      //   excellent:'12%',
      //   topscore:110,
      //   graderank:19,
      //   schoolrank:121
      // }
    ],
    classgrow:{
      // starttime1:'选择起始时间',
      // starttime:['第一周','第二周','第三周','第四周','第五周','第六周','第七周','第八周','第九周','第十周','第十一周','第十二周','第十三周','第十四周','第十五周','第十六周','第十七周','第十八周','第十九周','第二十周'],
      // endtime1:'选择结束时间',
      // endtime:['第一周','第二周','第三周','第四周','第五周','第六周','第七周','第八周','第九周','第十周','第十一周','第十二周','第十三周','第十四周','第十五周','第十六周','第十七周','第十八周','第十九周','第二十周'],
      // nowproject:'全部项目',
      // allproject:['仰卧起坐','立定跳远','引体向上','肺活量','跳绳','1000米跑','篮球运动'],
      // average:80,
      // topscore:110,
      // assessment:'B',
      // passrate:'100%',
      // well:'80%',
      // excellent:'12%',
      // classrank:6,
      // graderank:19,
      // schoolrank:121,
      // linechartdate:['第一周','第二周','第三周','第四周','第五周','第六周','第七周','第八周'],
      // linechartdata:[
      //   {linedata1:[80, 92, 81, 74, 98, 80, 90,100]},
      //   {linedata2:[70, 80, 91, 74, 98, 70, 90,80]}
      // ]
    },
    single_class_project_data:{
      // project:'立定跳远',
      // rate:'90%',
      // average:'110分',
      // topscore:110,
      // assessment:'A',
      // gardescore:'90',
      // graderank:19,
      // classname:'四年级一班',
      // classnum:40,
      // no_passrate:'100%',
      // no_passrate_num:5,
      // passrate:'90%',
      // passrate_num:10,
      // well:'80%',
      // well_num:10,
      // excellent:'12%',
      // excellent_num:15,
      // class_score:[80,90,100,50],
      // grade_score:[70,80,80,90]
    },
    failure:{
    //   time:'2017上学期第一周',
    //   rate:'90%',
    //   average_score:'2.17米',
    //   average:'100',
    //   staus:1,
    //   assessment:'A',
    //   all_failure:[
    //     {
    //       name:'王大状',
    //       average_score:'2.17米',
    //       average:'100',
    //       staus:1,
    //       assessment:'A',
    //     },
    //     {
    //       name:'王二麻子',
    //       average_score:'2.17米',
    //       average:'100',
    //       staus:1,
    //       assessment:'A',
    //     }
    //   ]
    }
  },
  mutations: {

  },
  actions: {

  }
}

const moduleE = {
  state: {
    initweek:'',
    startTime:'',
    weeks:[],
    week_s:[],
    week__s:[],
    count:0,
    num:0,
    sid:'',
    week:'',
    card:'',
    uid:'',   //自己新加的,
    gid:'',
    cid:'',
    weekb:'',
    weeke:'',
    pid:'',
    sgid:'',
    projectid:[],
    allproject:[],
    allgrade:[],
    gradeid:[],
    allclass:[],
    classid:[],
    basic:{
      project:[],
      score:[],
      week:"",
      rate:'',
      average:'',
      topscore:'',
      topclass:'',
      topgrade:''
    },
    statistics:{
      project:[],
      score:[],
      average:'',
      topscore:'',
      assessment:'',
      passrate:'',
      well:'',
      excellent:'',
      topscore1:'',
      topgrade:'',
      topclass:'',
      linechartdate:[]

    },
    prate:'',
    classname:'',
    single_statistics:{
      topscore:'',
      assessment:'',
      average:'',
      result:'',
      no_passrate:'',
      well:'',
      excellent:'',
      class:[],
      no_passrate_num:'',
      passrate_num:'',
      well_num:'',
      excellent_num:'',
      rank:'',
      grade:[],
      all_student:'',
      absent_student:''
    },

    detail:[

    ],
    single_grade_data:{
      gradename:'',
      project:[],
      score:[],
      classid:[],
      rate:'',
      average:'',
      topscore:'',
      topclass:''
    },
    details:[],
    single_class_detail_data:[
    
    ],
    classgrow:{
    	
    },
    single_class_project_data:{
    	
    },
    failure:{
   
    }
  },
  mutations: {

  },
  actions: {

  }
}



const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB,
    c: moduleC,
    d: moduleD,
    e: moduleE
  }
})

export default store
// store.state.a // -> moduleA 的状态
// store.state.b // -> moduleB 的状态
