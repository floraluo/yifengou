webpackJsonp([8],{NHnr:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=e("7+uW"),i=e("X9xH"),o={name:"App",methods:{initView:function(){var t=this;console.log("-------111"),this.$get("/init").then(function(n){if(console.log("init",n),200===n.data.code){var e=JSON.parse(n.data.data.text);t.$store.commit("addTextList",e),t.$store.commit("addBanner",n.data.data.bannerTopList);var a=n.data.data.invite;t.$store.commit("addInvite",a),t.$store.commit("addShareImg",n.data.data.shareImage),i.a.setInitData(1)}else i.a.setInitData(0)}).catch(function(){i.a.setInitData(0)})}},mounted:function(){i.a.init(),this.initView()}},r={render:function(){var t=this.$createElement,n=this._self._c||t;return n("div",{attrs:{id:"app"}},[n("keep-alive",[this.$route.meta.keepAlive?n("router-view"):this._e()],1),this._v(" "),this.$route.meta.keepAlive?this._e():n("router-view")],1)},staticRenderFns:[]};var u=e("VU/8")(o,r,!1,function(t){e("yBqn")},null,null).exports,c=e("/ocq");a.a.use(c.a);var s=new c.a({routes:[{path:"/",name:"Home",meta:{keepAlive:!0},component:function(){return Promise.all([e.e(0),e.e(2)]).then(e.bind(null,"FP3a"))}},{path:"/rule",name:"Rule",component:function(){return Promise.all([e.e(0),e.e(6)]).then(e.bind(null,"hI2a"))}},{path:"/order",name:"Rule",component:function(){return Promise.all([e.e(0),e.e(5)]).then(e.bind(null,"0wiy"))}},{path:"/refund",name:"Rule",component:function(){return Promise.all([e.e(0),e.e(4)]).then(e.bind(null,"0Jzp"))}},{path:"/cart",name:"Cart",component:function(){return Promise.all([e.e(0),e.e(3)]).then(e.bind(null,"qJko"))}},{path:"/invite",name:"Invite",component:function(){return e.e(1).then(e.bind(null,"6LbQ"))}}]}),p=e("NYxO");a.a.use(p.a);var d=new p.a.Store({state:{cartCount:0,scrollTop:0,indexList:[],ruleList:[],bindList:[],bannerTopList:[],invite:null,shareImg:""},mutations:{addCartCount:function(t,n){t.cartCount=n},addTextList:function(t,n){t.indexList=n.index_list,t.ruleList=n.rule_list,t.bindList=n.bind_list},addBanner:function(t,n){t.bannerTopList=n},addInvite:function(t,n){t.invite=n},addShareImg:function(t,n){t.shareImg=n}}}),l=e("fxnj"),h=e.n(l),f=function(t,n,e){var a=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];var i=Math.floor((new Date).getTime()/1e3),o=function(t){for(var n="",e=0;e<t;e++){var i=Math.ceil(35*Math.random());n+=a[i]}return n}(16),r="http://buy.51zhuanfan.com";t("http://47.96.17.80:9400/h5/wx/config",{timestamp:i,nonceStr:o,url:location.href.split("#")[0]}).then(function(t){var a=t.data.data.appId,u=t.data.data.signature;n.config({debug:!1,appId:a+"",timestamp:i+"",nonceStr:o+"",signature:u+"",jsApiList:["onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ"]}),n.error(function(t){console.log("验证失败：",t)}),n.ready(function(){var t=e,a="千万爆品，一分抄底；全民嗨购，狂欢24小时。";n.onMenuShareTimeline({title:"点我优惠购",desc:a,link:r,imgUrl:t,success:function(){},cancel:function(){}}),n.onMenuShareAppMessage({title:"点我优惠购",desc:a,link:r,imgUrl:t,type:"link",dataUrl:"",success:function(){},cancel:function(){}}),n.onMenuShareQQ({title:"点我优惠购",desc:a,link:r,imgUrl:t,success:function(){},cancel:function(){}})})})},m=e("bqTm"),_=e.n(m),v=e("WocE"),b=e("7QTg"),g=e.n(b),w=(e("v2ns"),e("muQq"),e("e195"),e("1BT9")),y=e.n(w);a.a.use(g.a),a.a.use(_.a),a.a.use(y.a),a.a.prototype.$get=v.a,a.a.prototype.$post=v.c,a.a.prototype.get2=v.b,a.a.prototype.wx=h.a,a.a.prototype.share=f,a.a.config.productionTip=!1,new a.a({el:"#app",router:s,store:d,components:{App:u},template:"<App/>"})},WocE:function(t,n,e){"use strict";e.d(n,"c",function(){return l}),e.d(n,"a",function(){return h}),e.d(n,"b",function(){return f});var a=e("//Fk"),i=e.n(a),o=e("mtWM"),r=e.n(o),u=e("mw3O"),c=e.n(u),s=e("lbHh"),p=e.n(s),d="http://freei.51zhuanfan.com/h5",l=function(t,n){n=n||{};var e=p.a.get("buy_h5_userid"),a=p.a.get("buy_h5_timestamp"),o=p.a.get("buy_h5_token");return e&&a&&o&&(n._userid=e,n._timestamp=a,n._token=o),n._h5=1,new i.a(function(e,a){r.a.post(d+t,c.a.stringify(n),{headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(t){e(t)}).catch(function(t){a(t)})})},h=function(t,n){n=n||{};var e=p.a.get("buy_h5_userid"),a=p.a.get("buy_h5_timestamp"),o=p.a.get("buy_h5_token");return e&&a&&o&&(n._userid=e,n._timestamp=a,n._token=o),n._h5=1,new i.a(function(e,a){r.a.get(d+t,{params:n}).then(function(t){e(t)}).catch(function(t){a(t)})})},f=function(t,n){return n._h5=1,new i.a(function(e,a){r.a.get(t,{params:n}).then(function(t){e(t)}).catch(function(t){a(t)})})}},X9xH:function(t,n,e){"use strict";var a=e("//Fk"),i=e.n(a),o=e("WocE"),r=e("lbHh"),u=e.n(r);function c(t){var n=new RegExp("(^|&)"+t+"=([^&]*)(&|$)","i"),e=window.location.search.substr(1).match(n);return null!=e?unescape(e[2]):""}var s=c("c"),p=c("code"),d="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf9fbb515384aa6c0&redirect_uri=http%3A%2F%2Fbuy.51zhuanfan.com%3Fc%3D"+s+"&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect",l=-1;n.a={init:function(){p?Object(o.c)("/user/wx/login",{code:p,channel:s}).then(function(t){var n=t.data.data;console.log("data",n),u.a.set("buy_h5_userid",n.userid,{expires:7}),u.a.set("buy_h5_token",n.token,{expires:7}),u.a.set("buy_h5_timestamp",n.timestamp,{expires:7}),window.location.href="/"}):Object(o.a)("/user/info",{}).then(function(t){600!==t.data.code&&700!==t.data.code||(window.location.href=d)})},setInitData:function(t){l=t},checkInitData:function(){return new i.a(function(t,n){!function e(){1===l&&t(),-1===l&&setTimeout(function(){e()},10),0===l&&n()}()})}}},e195:function(t,n){},muQq:function(t,n){},v2ns:function(t,n){},yBqn:function(t,n){}},["NHnr"]);
//# sourceMappingURL=app.eb0448728c5ac613e84e.js.map