import axios from "axios";
import qs from "qs";
// axios.defaults.crossDomain = true;
// axios.defaults.withCredentials  = true;
let BASE_URL = process.env.BASE_URL;

// post方法
let post = (url, data) => {
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
    return new Promise((resolve, reject) => {
      axios
        .get(BASE_URL + url, { params })
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  };
  
  export { post, get };