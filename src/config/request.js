import axios from "axios";
import qs from "qs";
import login from "../module/login"
import Cookie from "js-cookie";
// axios.defaults.crossDomain = true;
// axios.defaults.withCredentials  = true;
let BASE_URL = process.env.BASE_URL;


// post方法
let post = (url, data) => {
  data = data || {};
  // 获取本地cookie
  // let _userid = Cookie.get("buy_h5_userid");
  // let _timestamp = Cookie.get("buy_h5_timestamp");
  // let _token = Cookie.get("buy_h5_token");
  let _userid = 1;
  let _timestamp = 1542704236935;
  let _token = '96e675ab4f6e5d8d5018a332da4eff78';
  // 如果cookie存在，带入data中
  if (_userid && _timestamp && _token) {
    data["_userid"] = _userid;
    data["_timestamp"] = _timestamp;
    data["_token"] = _token;
  }
  data["_h5"] = 1;
  return new Promise((resolve, reject) => {
    axios
      .post(BASE_URL + url, qs.stringify(data), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
};

// get方法
let get = (url, params) => {
  params = params || {};
  // 获取本地cookie
  // let _userid = Cookie.get("buy_h5_userid");
  // let _timestamp = Cookie.get("buy_h5_timestamp");
  // let _token = Cookie.get("buy_h5_token");
  let _userid = 1;
  let _timestamp = 1542704236935;
  let _token = '96e675ab4f6e5d8d5018a332da4eff78';
  // 如果cookie存在，带入data中
  if (_userid && _timestamp && _token) {
    params["_userid"] = _userid;
    params["_timestamp"] = _timestamp;
    params["_token"] = _token;
  }
  params["_h5"] = 1;

  return new Promise((resolve, reject) => {
    axios
      .get(BASE_URL + url, { params })
      .then(res => {
        console.log(res, '---------------------888-------')
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
};


//  不带base_url的get方法
let get2 = (url, params) => {
  params["_h5"] = 1;
  return new Promise((resolve,reject)=>{
    axios
    .get(url,{params})
    .then(res=>{
      resolve(res);
    })
    .catch(error=>{
      reject(error);
    })
  })
}

// 添加响应拦截器
axios.interceptors.response.use(function (res) {
  // 对响应数据做点什么
  console.log('=====response======', res);
  if (res.data.code === 700) {
    login();
  } else {
    return res.data;
  }
}, function (error) {
  // 对响应错误做点什么
  console.log('=====response error======', error);
  return Promise.reject(error);
});
export { post, get, get2 };
