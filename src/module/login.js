import {get, post} from '../config/request'


function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return '';
}

var channel = getQueryString('c');
var code = getQueryString('code');

var url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf9fbb515384aa6c0"
  + "&redirect_uri=http%3A%2F%2Fbuy.51zhuanfan.com%3Fc%3D" + channel
  + "&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect";


var login = function () {
  window.location.href = url;
};

var init = function () {

  if (code) {
    get('/user/wx/login', {code: code, channel: channel}).then(res => {
      console.log(res.data)
      // 存储到本地,用cookie加上前缀buy_h5_userid
      // window.location.href = "/";
    });
  } else {
    get('/user/info', {}).then(res => {
      if (res.data.code === 600 || res.data.code === 700) {
        // 重新登录
        login();
      }
    });
  }

};

export default {
  init
}
