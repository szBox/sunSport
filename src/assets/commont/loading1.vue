<template>
  <div class="load">
    <!--<div class="wrapper" style="box-sizing:border-box;position: absolute;left: 50%;top:50%;margin-left: -50px;margin-top: -100px;z-index:5">-->
    <!--<div class="row cf" style="">-->
    <!--&lt;!&ndash;<div class="span">&ndash;&gt;-->
    <!--&lt;!&ndash;<div class="timer"></div>&ndash;&gt;-->
    <!--&lt;!&ndash;</div>&ndash;&gt;-->
    <!--&lt;!&ndash;<div class="span">&ndash;&gt;-->
    <!--&lt;!&ndash;<div class="typing_loader"></div>&ndash;&gt;-->
    <!--&lt;!&ndash;</div>&ndash;&gt;-->
    <!--&lt;!&ndash;<div class="span">&ndash;&gt;-->
    <!--&lt;!&ndash;<div class="location_indicator"></div>&ndash;&gt;-->
    <!--&lt;!&ndash;</div>&ndash;&gt;-->
    <!--<div class="span">-->
    <!--<div class="dashboard"></div>-->
    <!--<div style="color: silver">正在加载</div>-->
    <!--</div>-->
    <!--</div>-->


    <!--&lt;!&ndash;<div class="row cf">&ndash;&gt;-->
    <!--&lt;!&ndash;<div class="span">&ndash;&gt;-->
    <!--&lt;!&ndash;<div class="battery"></div>&ndash;&gt;-->
    <!--&lt;!&ndash;</div>&ndash;&gt;-->
    <!--&lt;!&ndash;<div class="span">&ndash;&gt;-->
    <!--&lt;!&ndash;<div class="magnifier"></div>&ndash;&gt;-->
    <!--&lt;!&ndash;</div>&ndash;&gt;-->
    <!--&lt;!&ndash;<div class="span">&ndash;&gt;-->
    <!--&lt;!&ndash;<div class="help"></div>&ndash;&gt;-->
    <!--&lt;!&ndash;</div>&ndash;&gt;-->
    <!--&lt;!&ndash;<div class="span">&ndash;&gt;-->
    <!--&lt;!&ndash;<div class="cloud"></div>&ndash;&gt;-->
    <!--&lt;!&ndash;</div>&ndash;&gt;-->
    <!--&lt;!&ndash;</div>&ndash;&gt;-->

    <!--&lt;!&ndash;<div class="row cf">&ndash;&gt;-->
    <!--&lt;!&ndash;<div class="span">&ndash;&gt;-->
    <!--&lt;!&ndash;<div class="eye"></div>&ndash;&gt;-->
    <!--&lt;!&ndash;</div>&ndash;&gt;-->
    <!--&lt;!&ndash;<div class="span">&ndash;&gt;-->
    <!--&lt;!&ndash;<div class="coffee_cup"></div>&ndash;&gt;-->
    <!--&lt;!&ndash;</div>&ndash;&gt;-->
    <!--&lt;!&ndash;<div class="span">&ndash;&gt;-->
    <!--&lt;!&ndash;<div class="square"></div>&ndash;&gt;-->
    <!--&lt;!&ndash;</div>&ndash;&gt;-->
    <!--&lt;!&ndash;<div class="span">&ndash;&gt;-->
    <!--&lt;!&ndash;<div class="circle"></div>&ndash;&gt;-->
    <!--&lt;!&ndash;</div>&ndash;&gt;-->
    <!--&lt;!&ndash;</div>&ndash;&gt;-->

    <!--</div>-->
    <div class="bj" style="position: absolute;top:0;width: 100%;height:100%;background-color: #000000;opacity: 0.7;z-index:4"></div>
    <div class="container">
      <section>
        <div class="loader loader-1">
          <div class="loader-outter"></div>
          <div class="loader-inner"></div>
          <div style="color: #f1f1f1;font-size: 0.6rem;line-height: 60px;text-align: center">正在加载</div>
        </div>
      </section>
      <!--<section>-->
      <!--<div class="loader loader-2">-->
      <!--<svg class="loader-star" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">-->
      <!--<polygon points="29.8 0.3 22.8 21.8 0 21.8 18.5 35.2 11.5 56.7 29.8 43.4 48.2 56.7 41.2 35.1 59.6 21.8 36.8 21.8 " fill="#18ffff" />-->
      <!--</svg>-->
      <!--<div class="loader-circles"></div>-->
      <!--</div>-->
      <!--</section>-->
      <!--<section>-->
      <!--<div class="loader loader-21">-->
      <!--<div class="css-times times1"></div>-->
      <!--<div class="css-times times2"></div>-->
      <!--<div class="css-times times3"></div>-->
      <!--</div>-->
      <!--</section>-->
      <!--<section>-->
      <!--<div class="loader loader-7">-->
      <!--<div class="line line1"></div>-->
      <!--<div class="line line2"></div>-->
      <!--<div class="line line3"></div>-->
      <!--</div>-->
      <!--</section>-->
      <!--<section>-->
      <!--<div class="loader loader-18">-->
      <!--<div class="css-star star1"></div>-->
      <!--<div class="css-star star2"></div>-->
      <!--<div class="css-star star3"></div>-->
      <!--<div class="css-star star4"></div>-->
      <!--<div class="css-star star5"></div>-->
      <!--<div class="css-star star6"></div>-->
      <!--<div class="css-star star7"></div>-->
      <!--<div class="css-star star8"></div>-->
      <!--</div>-->
      <!--</section>-->
      <!--<section>-->
      <!--<div class="loader loader-5">-->
      <!--<div class="loader-pacman"></div>-->
      <!--</div>-->
      <!--</section>-->

      <!--<section>-->
      <!--<div class="loader loader-4"></div>-->
      <!--</section>-->
      <!--<section>-->
      <!--<div class="loader loader-17">-->
      <!--<div class="css-square square1"></div>-->
      <!--<div class="css-square square2"></div>-->
      <!--<div class="css-square square3"></div>-->
      <!--<div class="css-square square4"></div>-->
      <!--<div class="css-square square5"></div>-->
      <!--<div class="css-square square6"></div>-->
      <!--<div class="css-square square7"></div>-->
      <!--<div class="css-square square8"></div>-->
      <!--</div>-->
      <!--</section>-->
    </div>
  </div>
  </div>
</template>
<script>
  import  $ from 'jquery'
  export default{
    name:'load',
    data(){
      return{}
    },
    mounted(){
      var x=$(document).height();
      $('.bj').css({height:x+"px"});
//      $('.statistic').css({height:h+'px',backgroundColor:'#1F1F21'});
    }
  }
</script>

