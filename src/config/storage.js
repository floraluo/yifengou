// 本地存储辅助函数，本项目只用来存储滚动距离，为Number类型
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

let local = new localEvent("scrollTop");
export default local;
