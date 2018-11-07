import { get, post } from "../config/request";
import Cookie from "js-cookie";

function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return "";
}

var channel = getQueryString("c");
var code = getQueryString("code");

var url =
  "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf9fbb515384aa6c0" +
  "&redirect_uri=http%3A%2F%2Fbuy.51zhuanfan.com%3Fc%3D" +
  channel +
  "&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect";

var login = function() {
  window.location.href = url;
};

var init = function() {
  if (code) {
    post("/user/wx/login", { code: code, channel: channel }).then(res => {
      //console.log('init',res)
      let data = res.data.data;
      console.log("data", data);
      // 存储到本地,用cookie加上前缀buy_h5_userid
      Cookie.set("buy_h5_userid", data.userid, { expires: 7 });
      Cookie.set("buy_h5_token", data.token, { expires: 7 });
      Cookie.set("buy_h5_timestamp", data.timestamp, { expires: 7 });
      window.location.href = "/";
    });
  } else {
    get("/user/info", {}).then(res => {
      if (res.data.code === 600 || res.data.code === 700) {
        // 重新登录
        login();
      }
    });
  }
};

var initData = -1;

var setInitData = b => {
  initData = b;
};

var checkInitData = () => {
  return new Promise((resolve, reject) => {
    var func = function() {
      if (initData === 1) {
        resolve();
      }
      if (initData === -1) {
        setTimeout(() => {
          func();
        }, 10);
      }
      if (initData === 0) {
        reject();
      }
    };
    func();
  });
};

export default {
  init,
  setInitData,
  checkInitData
};
