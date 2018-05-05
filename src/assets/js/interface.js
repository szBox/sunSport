/**
 * Created by Administrator on 2017/11/22.
 */
//let host='http://112.74.100.48';
// let host='http://120.24.178.171';
let host='http://192.168.0.211';
export default {

  //main.vue  判断角色类型
  host:host,
  getCard:host+"/index.php?m=content&f=leader&v=getuser",
  gofamily:host+'/index.php?m=content&f=statistics&v=index',
  goclassTeacher:host+"/index.php?m=content&f=statistics&v=head_teacher_index",
  goTeacher:host+"/index.php?m=content&f=statistics&v=sports_teacher",
  goLeader:host+"/index.php?m=content&f=leader&v=index",

  //leader
  getGrade:host+"/index.php?m=content&f=leader&v=grade_index",
  getfailure:host+"/index.php?m=content&f=leader&v=get_student_detail",
  getgeneral:host+"/index.php?m=content&f=leader&v=school_detail",
  getgeneral1:host+"/index.php?m=content&f=leader&v=grade_detail",
  getproject:host+"/index.php?m=content&f=leader&v=get_project",
  getgrowup:host+"/index.php?m=content&f=leader&v=grow_up",

  //teacher
  getsport:host+"/index.php?m=content&f=statistics&v=sports_teacher",
  getheaderteacher:host+"/index.php?m=content&f=statistics&v=head_teacher_index",

  //chargeTeacher
  getBdetails:host+"/index.php?m=content&f=statistics&v=head_teacher_project_detail",
  getBfailure:host+"/index.php?m=content&f=statistics&v=head_teacher_student_detail",
  getBgeneral:host+"/index.php?m=content&f=statistics&v=head_teacher_detail",
  getBgrowup:host+"/index.php?m=content&f=statistics&v=head_teacher_growup",
  getimport:host+"/index.php?m=content&f=corporeityapi&v=webadd",
  getranking:host+"/index.php?m=content&f=leader&v=get_student_all_mark",
  getranklist:host+"/index.php?m=content&f=statistics&v=get_student_week_mark",
  /*submit接口中调用的是java方面的输入时间的接口*/


  //family
  getbmi:host+"/index.php?m=content&f=statistics&v=getbmi",
  getbmi_week:host+"/index.php?m=content&f=statistics&v=getbmi_week",
  getFdetail:host+"/index.php?m=content&f=statistics&v=getdetail",
  getFgrowup:host+"/index.php?m=content&f=statistics&v=getgrowup",

  //成长
  getclassbmi:host+"/index.php?m=content&f=statistics&v=getclassbmi",
  getbmidetail:host+"/index.php?m=content&f=statistics&v=getbmidetail",


  //获取有数据的周
  getweek:host+'/index.php?m=content&f=leader&v=get_data_week',

  //主界面学期列表
  getxueqi:host+"/index.php?m=content&f=statistics&v=get_term",
  //主界面列表展示数据
  //leader
  getleaderlist:host+'/index.php?m=content&f=leader&v=school_index_list',
  getgradelist:host+'/index.php?m=content&f=leader&v=grade_index_list',
  //teacher
  getsportlist:host+'/index.php?m=content&f=statistics&v=sports_teacher_list',
  getsportindexlist:host+'/index.php?m=content&f=statistics&v=head_teacher_index_list',
  //header teacher
  getheaderlist:host+"/index.php?m=content&f=statistics&v=head_teacher_index_list",

  /**新增功能 */
  addStore: host+"/index.php?m=content&f=web_add&v=calc",
  Inq1:host+"/index.php?m=content&f=web_add&v=add",
  Inq2: host+"/index.php?m=content&f=web_add&v=show&stat=1",
  Inq3: host+"/index.php?m=content&f=web_add&v=show&stat=0",
  
  
  //学生端
  
	//健康档案
	getdangan:host+'/index.php?m=content&f=statistics&v=getbmi',
	//统计-计划
	getplan:host+'/index.php?m=content&f=statistics&v=getbmi',
	getplan2:host+'/index.php?m=content&f=web_healthy&v=bmi&recommend=0',
	
	getrecommend:host+'/index.php?m=content&f=web_healthy&v=bmi&recommend=1&callback',
	getrecommend1:host+'/index.php?m=content&f=web_healthy&v=project&recommend=1',
	getrecommend2:host+'/index.php?m=content&f=web_healthy&v=detail',
  //区长
  	//数据图表
  	getalldatas:host+'/index.php?m=content&f=leader&v=district_index',
  	//增长率详情
  	getdatazengzhang:host+'/index.php?m=content&f=leader&v=district_detail',
}
