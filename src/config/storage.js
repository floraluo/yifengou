// 本地存储辅助函数，本项目只用来存储滚Number，String等基本类型
// 注意：如需存储对象，需要序列化与反序列化操作

let localEvent = function(key) {
  this.get = function() {
    return localStorage.getItem(key) ? localStorage.getItem(key) : "";
  };

  this.set = function(num) {
    localStorage.setItem(key, num);
  };

  this.clear = function() {
    localStorage.removeItem(key);
  };
};
// 保存滚动距离
let localScroll = new localEvent("scrollTop");

// 保存商品类型
let localType = new localEvent("localType")
export default {localScroll,localType};
