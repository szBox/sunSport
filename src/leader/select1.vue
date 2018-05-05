<template>
  <div class="select1">
    <div class="cont_t">
      <div class="cont_t_f">
        <!--<div class="f_l">22</div>-->
        <div class="f_r">及格率:<span>{{list.standard}}</span></div>
      </div>
      <div class="cont_t_s">
        <div class="con_t">
          <div class="con_t_l">
            <div class="con_t_l_t">平均成绩</div>
            <div class="con_t_l_b">{{list.result}}</div>
          </div>
          <div class="con_t_c">
            <div class="con_t_l_t">平均分数</div>
            <div class="con_t_l_b">{{list.average}}</div>
          </div>
          <div class="con_t_r">
            <div class="con_t_l_t">综合评价</div>
            <div class="con_t_l_b">{{list.assessment}}</div>
          </div>
        </div>
        <div class="npm">班级最高分<span class="v1">{{list.topscore}}</span></div>
        <div class="xpm">年级排名<span class="v1">{{list.rank}}</span></div>
      </div>
    </div>
    <div class="cont_c">
      <div class="cont_c_t">
        <div class="t_b">{{classname}}</div>
        <div class="t_r">(应测<span>{{list.all_student}}</span>人 实测<span>{{list.absent_student}}</span>人)</div>
      </div>
      <div class="cont_c_c">
        <li @click="gofail(0)">
          <div class="c_img">
            <img src="../assets/img/fail.png" width="100%">
          </div>
          <div class="c_cont">
            不及格(<span>{{list.no_passrate}}</span>)
          </div>
          <div class="c_right">
            <div class="c_num">{{list.no_passrate_num}}人</div>
            <div class="c_img2">
              <img src="../assets/img/advance.png" width="100%">
            </div>
          </div>
        </li>
        <li @click="gofail(1)">
          <div class="c_img">
            <img src="../assets/img/pass.png" width="100%">
          </div>
          <div class="c_cont">
            及格(<span>{{list.passrate}}</span>)
          </div>
          <div class="c_right">
            <div class="c_num">{{list.passrate_num}}人</div>
            <div class="c_img2">
              <img src="../assets/img/advance.png" width="100%">
            </div>
          </div>
        </li>
        <li @click="gofail(2)">
          <div class="c_img">
            <img src="../assets/img/well.png" width="100%">
          </div>
          <div class="c_cont">
            良好(<span>{{list.well}}</span>)
          </div>
          <div class="c_right">
            <div class="c_num">{{list.well_num}}人</div>
            <div class="c_img2">
              <img src="../assets/img/advance.png" width="100%">
            </div>
          </div>
        </li>
        <li @click="gofail(3)">
          <div class="c_img">
            <img src="../assets/img/excellent.png" width="100%">
          </div>
          <div class="c_cont">
            优秀(<span>{{list.excellent}}</span>)
          </div>
          <div class="c_right">
            <div class="c_num">{{list.excellent_num}}人</div>
            <div class="c_img2">
              <img src="../assets/img/advance.png" width="100%">
            </div>
          </div>
        </li>
      </div>
    </div>
    <div class="cont_b">
      <div id="h"></div>
    </div>
  </div>
</template>
<script>

  export default{
    data(){
      return{

      }
    },
    computed:{
      list(){
        return this.$store.state.d.single_statistics
      },
      classname(){
        return this.$store.state.d.classname
      }
    },
    methods:{
      gofail(val){
        this.$router.push({path:'/lfail/'+val})
      }
    }
  }
</script>
<style scoped>
  .cont_t{
    margin-top: 0.1rem;
    height: 11rem;
    /*border-bottom: 1px solid #ffffff;*/
    background-color: #2E2E31;
    width:100%;
    /*padding-left: 5%;*/
    /*padding-right: 5%;*/
  }
  .cont_t_f{
    padding-left: 5%;
    width: 90%;
    padding-right: 5%;
    height: 2rem;
    color: #ffffff;
    font-size: 0.8rem;
    line-height: 2rem;
    border-top: 0.1rem solid #1F1F21;
    border-bottom: 0.05rem solid #1F1F21;
  }
  .f_l{
    width: 60%;
    float: left;
  }
  .f_r{
    float: right;
  }
  .f_r span{
    color: #FFCC00;
    margin-left: 0.8rem;
  }
  .con_t{
    margin-top: 1rem;
    width: 90%;
    margin-left: 5%;
    height: 3rem;
  }
  .con_t_l{
    text-align: center;
    width: 33.3%;
    float: left;
  }
  .con_t_c{
    text-align: center;
    width: 33.3%;
    float: left;
  }
  .con_t_r{
    text-align: center;
    width: 33.3%;
    float: left;
  }
  .con_t_l_t{
    color: #A6A6A7;
    font-size: 0.8rem;
    height: 1rem;
  }
  .con_t_l_b{
    color: #FFCC00;
    font-size: 1rem;
    margin-top: 0.5rem;
    height: 1.5rem;
    line-height: 1.5rem;
  }
  .npm{
    margin-top: 2rem;
    width: 49.5%;
    float: left;
    font-size:0.8rem;
    color: #767677;
    text-align: center;
    border-right: 1px solid #636365;
  }
  .xpm{
    margin-top: 2rem;
    width: 50%;
    float: left;
    font-size: 0.8rem;
    color: #767677;
    text-align: center;
  }
  .v1{
    color: #F8C702;
    font-size: 1rem;
    margin-left: 0.5rem;
  }
  .cont_c{
    background-color: #2E2E31;
    margin-top: 0.5rem;
    height: 12.6rem;
    /*border-bottom: 1px solid #ffffff;*/
  }
  .cont_c_t{
    padding-left: 5%;
    width: 90%;
    padding-right: 5%;
    height: 2.5rem;
    color: #A0A0A2;
    font-size: 0.8rem;
    line-height: 2.5rem;
    border-bottom: 1px solid #1F1F21;
  }
  .cont_c_c{
    width: 90%;
    padding-left: 5%;
    padding-right: 5%;
  }
  .t_b{
    float: left;
    width: 4.5rem;
  }
  .t_r{
    float: left;
    color: #707072;
  }
  .cont_c_c li{
    border-bottom: 1px solid #1F1F21;
    height: 2.5rem;
    line-height: 2.5rem;
  }
  .cont_c_c li .c_img{
    width: 1.5rem;
    height: 1.5rem;
    margin-top: -0.1rem;
    float: left;
  }
  .cont_c_c li .c_cont{
    float: left;
    color: #A0A0A2;
    font-size: 0.8rem;
    margin-left: 0.5rem;
    width: 40%;
  }
  .cont_c_c li .c_right{
    float: right;
    width: 30%;
  }
  .cont_c_c li .c_right .c_num{
    float: left;
    width:3rem;
    color: #69696B;
    font-size: 0.9rem;
    text-align: right;
    margin-left: 1rem;
  }
  .cont_c_c li .c_right .c_img2{
    margin-top: -0.1rem;
    float: right;
    width: 1rem;
    height: 1.5rem;
  }
  .cont_b{
    background-color: #2E2E31;
    margin-top: 0.5rem;
    width: 100%;
    height: 15rem;
    /*border-bottom: 1px solid #ffffff;*/
  }
  #h{
    width: 90%;
    margin-left: 5%;
    height: 15rem;
  }
</style>
