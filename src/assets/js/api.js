/**
 * Created by Administrator on 2017/9/5.
 */
import axios from 'axios'
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// export function fetch(url, params) {
//     axios.post(url, params)
//       .then(response => {
//         console.log(response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       })
// }
//
// export default {
//   // 获取我的页面的后台数据
//   // mineBaseMsgApi() {
//   //   // alert('进入api.js')
//   //   return fetch('/api/getBoardList');
//   // },
//   commonApi(url, params) {
//     return fetch(url, params)
//   }
// }
import $ from 'jquery'
var data=(function () {
    return {
      get_api_data: function (ur, params, callback) {
        $.ajax({
          type: 'POST',
          url: ur,
          data: params,
          dataType: 'jsonp',
          async:false,
          success: function (d) {
               console.log(d);
            if (callback) {
              callback(d);
            }
          },
          error: function (err) {
            console.log('错误信息：' + JSON.stringify(err));
          }
        })
      },

      get_project: function (val) {
        if (val == '2') {
          return '肺活量'
        } else if (val == '3') {
          return '握力'
        } else if (val == '4') {
          return '篮球运动'
        } else if (val == '5') {
          return '掷实心球'
        } else if (val == '6') {
          return '立定跳远'
        } else if (val == '7') {
          return '引体向上'
        } else if (val == '8') {
          return '1分钟仰卧起坐'
        } else if (val == '9') {
          return '1000米跑'
        } else if (val == '10') {
          return '800米跑'
        } else if (val == '11') {
          return '200米'
        } else if (val == '22') {
          return '跳绳'
        } else if (val == '23') {
          return '体重指数(BMI)'
        } else if (val == '24') {
          return '50米跑'
        } else if (val == '25') {
          return '坐位体前屈'
        } else if (val == '26') {
          return '耐力跑'
        }else if(val=='28'){
          return '50×8往返跑'
        }else if(val=='27'){
          return '400米跑'
        }
      },
      get_nowproject: function (val) {
        if (val == '2') {
          return '肺活量'
        } else if (val == '3') {
          return '握力'
        } else if (val == '4') {
          return '篮球运动'
        } else if (val == '5') {
          return '掷实心球'
        } else if (val == '6') {
          return '立定跳远'
        } else if (val == '7') {
          return '引体向上（男）'
        } else if (val == '8') {
          return '1分钟仰卧起坐（女）'
        } else if (val == '9') {
          return '1000米跑（男）'
        } else if (val == '10') {
          return '800米跑（女）'
        } else if (val == '11') {
          return '200米跑'
        } else if (val == '22') {
          return '跳绳'
        } else if (val == '23') {
          return '体重指数(BMI)'
        } else if (val == '24') {
          return '50米跑'
        } else if (val == '25') {
          return '坐位体前屈'
        } else if (val == '26') {
          return '耐力跑'
        }else if(val=='28'){
          return '50x8往返跑'
        }else if(val=='27'){
          return '400米跑'
        }
      },
      get_projectid: function (val) {
        if (val == '肺活量') {
          return 2
        } else if (val == '握力') {
          return 3
        } else if (val == '篮球运动') {
          return 4
        } else if (val == '掷实心球') {
          return 5
        } else if (val == '立定跳远') {
          return 6
        } else if (val == '引体向上（男）') {
          return 7
        } else if (val == '1分钟仰卧起坐（女）') {
          return 8
        } else if (val == '1000米跑（男）') {
          return 9
        } else if (val == '800米跑（女）') {
          return 10
        } else if (val == '200米跑') {
          return 11
        } else if (val == '跳绳') {
          return 22
        } else if (val == '体重指数(BMI)') {
          return 23
        } else if (val == '50米跑') {
          return 24
        } else if (val == '坐位体前屈') {
          return 25
        } else if (val == '耐力跑') {
          return 26
        }else if(val=='50x8往返跑'){
          return 28
        }else if(val=='400米跑'){
          return 27
        }
      },
      getweek:function(){
        var d = new Date();
        d=d.getTime();
        var d2=new Date('2017/8/28 00:00:00');
        d2=d2.getTime();
        var x=d-d2;
        // alert(d+'xxxxx'+d2+'xxxxxx'+x);
        var day=24*60*60*1000;
        var m=parseInt(x/(day*7));
        // var seperator1 = "-";
        // var seperator2 = ":";
        // var month = date.getMonth() + 1;
        // var strDate = date.getDate();
        // if (month >= 1 && month <= 9) {
        //   month = "0" + month;
        // }
        // if (strDate >= 0 && strDate <= 9) {
        //   strDate = "0" + strDate;
        // }
        // var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
        // currentdate=currentdate.getTime();
        //
        return m;
      }
    }
})();
export default data
