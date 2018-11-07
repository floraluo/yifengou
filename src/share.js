let share = (get, wx) => {
  // share.js改写版
  var chars = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z"
  ];

  function generateMixed(n) {
    var res = "";
    for (var i = 0; i < n; i++) {
      var id = Math.ceil(Math.random() * 35);
      res += chars[id];
    }
    return res;
  }
  var timestamp = Math.floor(new Date().getTime() / 1000);
  var nonceStr = generateMixed(16);
  var url = "http://buy.51zhuanfan.com";

  get("http://47.96.17.80:9400/h5/wx/config", {
    timestamp,
    nonceStr,
    url: location.href.split("#")[0]
  }).then(res => {
    // console.log("测试分享api", res);
    var appId = res.data.data.appId;
    var signature = res.data.data.signature;
    wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，
      // 若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: appId + "", // 必填，公众号的唯一标识
      timestamp: timestamp + "", // 必填，生成签名的时间戳
      nonceStr: nonceStr + "", // 必填，生成签名的随机串
      signature: signature + "", // 必填，签名，见附录1
      jsApiList: [
        "onMenuShareTimeline",
        "onMenuShareAppMessage",
        "onMenuShareQQ"
      ]
      // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
    wx.error(function(res) {
      // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
      console.log("验证失败：", res);
    });
    wx.ready(function() {
      var imgurl = "http://dl.buy.51zhuanfan.com/res/img/share-20180816.jpg";
      var title = "双十一翻海购";
      var desc = "余欢";
      wx.onMenuShareTimeline({
        title: title, // 分享标题
        desc: desc, // 分享描述
        link: url, // 分享链接
        imgUrl: imgurl, // 分享图标
        success: function() {
          // 用户确认分享后执行的回调函数
        },
        cancel: function() {
          // 用户取消分享后执行的回调函数
        }
      });

      wx.onMenuShareAppMessage({
        title: title, // 分享标题
        desc: desc, // 分享描述
        link: url, // 分享链接
        imgUrl: imgurl, // 分享图标
        type: "link", // 分享类型,music、video或link，不填默认为link
        dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
        success: function() {
          // 用户确认分享后执行的回调函数
        },
        cancel: function() {
          // 用户取消分享后执行的回调函数
        }
      });

      wx.onMenuShareQQ({
        title: title, // 分享标题
        desc: desc, // 分享描述
        link: url, // 分享链接
        imgUrl: imgurl, // 分享图标
        success: function() {
          // 用户确认分享后执行的回调函数
        },
        cancel: function() {
          // 用户取消分享后执行的回调函数
        }
      });
    });
  });
};

export default share;
