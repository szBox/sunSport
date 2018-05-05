<template>

  <div class="rotate-box">


    <!--<span style="color:#fff">{{ rotateList }}</span>-->


    <div class="rotate-con">
      <div v-if="!type">{{ conText.num }}</div>
      <p>{{ conText.tit }}</p>
    </div>

    <transition-group tag="ul"
                      v-on:before-enter="beforeEnter"
                      v-on:enter="enter"
    >
      <li v-for="(i,index) in rotateList"
          :class="i.status"
          :style="{ transform:'rotate('+index*10+'deg)' }"
          :key="index"
          :data-id="index"
          :data-status="i.status"
          v-if="show"></li>

    </transition-group>
  </div>


</template>
<script>
    export default({
      name: 'rotate',
      props:{
        percent:{
//          type:String,
          default:''
        },
        tit:{
//          type:String,
          default:''
        },
        type:{
          type:String,
          default:''
        }
      },
      data(){
        return {
          show:false
        }
      },
      computed:{
        rotateList(){
          let vm = this ,x = parseInt(vm.percent) , y = 100 , arr = [] , sum = 36 , num = parseInt((x/y)*36);

          if(vm.type == '1'){
            for(var i = 0;i<sum;i++){
              arr.push({
                status:'light'
              })
            }

          }else{
            for(var i = 0;i<sum;i++){

              if(i<num){
                arr.push({
                  status:'light'
                })
              }else{
                arr.push({
                  status:'dark'
                })
              }

            }
          }
//          console.log('xxxx:'+JSON.stringify(arr))
          return arr
        },
        conText(){
          let vm = this;
          console.log(vm.percent);
          return{
            num:vm.percent,
            tit:vm.tit
          }
        }
      },
      methods:{
        beforeEnter:function(el){
          el.className = 'dark'
        },
        enter:function(el){
          let delay = el.dataset.id , status = el.dataset.status;
          setTimeout(function(){
            if(status == 'light'){
              el.className = 'light'
            }
          },20*delay)
        }
      },
      mounted(){
        this.show = true
      }
    })
</script>
<style scoped>
  .rotate-box{
    width:5rem;
    height:5rem;
    position:relative;
  }
  .rotate-box ul{
    width:100%;
    height:100%;
    position:relative;
  }
  .rotate-box ul > li{
    width:0.2rem;
    height:0.4rem;
    transform-origin:0rem 2.5rem;
    position:absolute;
    left:2.5rem;
  }
  .rotate-box .light{
    background:#FFCC00;
  }
  .rotate-box .dark{
    background:#433E2C;
  }
  .rotate-box .rotate-con{
    position:absolute;
    width:100%;
    height:100%;
    left:0;
    top:0;
    color:#fff;
    display:flex;
    flex-wrap:wrap;
    justify-content:center;
    align-content: center;
    font-size:0.8rem;
    align-items: center;
  }
  .rotate-box .rotate-con>div,.rotate-box .rotate-con>p{
    line-height:1.5rem;
  }
  .rotate-box .rotate-con>div{
    width:3rem;
    border-bottom:1px solid #58585A;
    text-align:center;

  }
  .rotate-box .rotate-con>p{
    font-size:0.8rem;
    text-align: center;
    width: 100%;
    color: #A2A2A3;
  }
</style>
