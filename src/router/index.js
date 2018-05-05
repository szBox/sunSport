import Vue from 'vue'
import Router from 'vue-router'
import Teacher from '@/chargeTeacher/BTeacher'
import Grow from '@/chargeTeacher/BgrowUp'
import details from '@/chargeTeacher/Bdetails'
import Zdetails from '@/chargeTeacher/Bgeneral_details'
import Fail from '@/chargeTeacher/Bfailure'
import Health from '@/chargeTeacher/health'
import Healthdetail from '@/chargeTeacher/healthdetail'

import Main from '@/teacher/Tmain'
import Single from '@/teacher/Tsingle'

import Statistics from '@/teacher/Tstatistics'
import Lstatistics from '@/leader/Lstatistics'
import General from '@/teacher/Tgeneral'
import Lmain from '@/leader/Lmain'
import Lsingle from '@/leader/Lsingle'
import Lgeneral from '@/leader/Lgeneral'
import Lgeneral1 from '@/leader/Lgeneral1'
import Lfailure from '@/leader/Lfailure'

//import Fmain from '@/family/Fmain'//old
import Fgeneral from '@/family/Fgeneral'
import index from '@/family/main'
import Fgrow from '@/family/Fgrow'
import Bmi from '@/family/bmi'
import Ranking from '@/chargeTeacher/ranking'
import Submit from '@/chargeTeacher/submit'
import Import from '@/chargeTeacher/import'
import Ranklist from '@/chargeTeacher/ranklist'



import Inquire from '@/Added/Inquire'
/**学生 */
import Fmain from '@/Added/student/Homepage'  //刘胜凯
//import Fmain from '@/Added/student/Homepage1'   //测试
import HealthRecords from '@/Added/student/HealthRecords'
import Plan from '@/Added/student/Plan'
import PlanI from '@/Added/student/Plan1'
import Measure from '@/Added/student/Measure'
import Recommend from '@/Added/student/Recommend'
import RecommendI from '@/Added/student/Recommend1'
import RecommendII from '@/Added/student/Recommend2'
import movement from '@/Added/student/movement'
/**区长 */
import QHomepage from '@/Added/Mayor/Homepage'
import ProDetails from '@/Added/Mayor/ProDetails'
import Increase from '@/Added/Mayor/Increase'
import allData from '@/Added/Mayor/allData'
// import Model from '../assets/commont/model'
Vue.use(Router);

export default new Router({
  routes: [

    {
      path: '/',
      name: 'main',
      component: index
    },
    {
      path: '/teacher/:id',
      name: 'teacher',
      component: Teacher
    },
    {
      path: '/growUp',
      name: 'grow',
      component: Grow
    },
    {
      path: '/details/:id',
      name: 'details',
      component: details
    },
    {
      path: '/ranklist/:id',
      name: 'ranklist',
      component: Ranklist
    },
    {
      path: '/general_details/:id',
      name: 'detail',
      component: Zdetails
    },
    {
      path: '/fail/:id',
      name: 'fail',
      component: Fail
    },
    {
      path: '/main/:id',
      name: 'main',
      component: Main
    },
    {
      path: '/single/:id',
      name: 'single',
      component: Single
    },
    {
      path: '/statistics',
      name: 'statistics',
      component: Statistics
    },
    {
      path: '/lstatistics',
      name: 'lstatistics',
      component: Lstatistics
    },
    {
      path: '/general/:id',
      name: 'general',
      component: General
    },
    {
      path: '/lmain/:id',
      name: 'lmian',
      component: Lmain
    },
    {
      path: '/lsingle/:id',
      name: 'lsingle',
      component: Lsingle
    },
    {
      path: '/lgeneral/:id',
      name: 'lgeneral',
      component: Lgeneral
    },
    {
      path: '/lgeneral_grade/:id',
      name: 'lgeneral',
      component: Lgeneral1
    },
    {
      path: '/fmain/:id',
      name: 'fmain',
      component: Fmain
    },
    {
      path: '/fgeneral/:id',
      name: 'fgeneral',
      component: Fgeneral
    },

    {
      path: '/fgrow',
      name: 'fgrow',
      component: Fgrow
    },
    {
      path: '/lfail/:id',
      name: 'fgrow',
      component: Lfailure
    },
    {
      path: '/ranking/:id',
      name: 'ranking',
      component: Ranking
    },
    {
      path: '/submit',
      name: 'submit',
      component: Submit
    },
    {
      path: '/import',
      name: 'import',
      component: Import
    },
    {
      path: '/bmi',
      name: 'bmi',
      component: Bmi
    },
    {
      path: '/health',
      name: 'health',
      component: Health
    },
    {
      path: '/healthdetail/:id',
      name: 'healthdetail',
      component: Healthdetail
    },
    /*
      新增路由配置
    */
    /**成绩添加 */
    {
      path: '/Inquire',
      name: 'Inquire',
      component: Inquire
    },

    /**学生页面 */
    {
      path: '/HealthRecords/:id',
      name: 'HealthRecords',
      component: HealthRecords,
      children: [
        {
          path: '/',
          component: Measure
        }
      ]
    },
    {
      path: '/Plan/:id',
      name: 'Plan',
      component: Plan
    },
    {
      path: '/Plan1/:id',
      name: 'Plan1',
      component: PlanI
    },
    {
      path: '/movement/:id',
      name: 'movement',
      component: movement,
      children: [
        {
          path: '/',
          component: movement
        }
      ]
    },

    {
      path: '/recommend/:id',
      name: 'recommend',
      component: Recommend
    },
    {
      path: '/recommend1/:id',
      name: 'recommend1',
      component: RecommendI
    },
    {
      path: '/recommend2/:id',
      name: 'recommend2',
      component: RecommendII
    },
    /**区长页面 */
    {
      path: '/QHomepage/:id',
      name: 'QHomepage',
      component: QHomepage
    },
    {
      path: '/ProDetails/:id',
      name: 'ProDetails',
      component: ProDetails
    },
    {
      path: '/Increase/:id',
      name: 'Increase',
      component: Increase
    },
    {
      path: '/allData/:id',
      name: 'allData',
      component: allData
    }
  ]
})
