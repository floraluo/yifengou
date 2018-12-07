import { get, post } from "../config/request";
import Cookie from "js-cookie";

function getQueryString(name) {
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  let r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return "";
}

let channel = getQueryString("c");
let code = getQueryString("code");

let url =
  "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf0f511ae22ff266c" +
  "&redirect_uri=http%3A%2F%2Fbuy.51zhuanfan.com%3Fc%3D" +
  channel +
  "&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect";

function login () {
  window.location.href = url;
}

let init = function() {
  if (!!code) {
    post("/user/wx/login", { code: code, channel: channel }).then(res => {
      let data = res.data.data;
      console.log("data", data);
      // 存储到本地,用cookie加上前缀buy_h5_userid
      Cookie.set("buy_h5_userid", data.userid, { expires: 7 });
      Cookie.set("buy_h5_token", data.token, { expires: 7 });
      Cookie.set("buy_h5_timestamp", data.timestamp, { expires: 7 });
      window.location.href = "/";
    });
  } else {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }
};

let initData = -1;

let setInitData = b => {
  initData = b;
};

let checkInitData = () => {
  return new Promise((resolve, reject) => {
    let func = function() {
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
  login,
  setInitData,
  checkInitData
};
