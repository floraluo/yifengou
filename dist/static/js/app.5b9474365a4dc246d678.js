webpackJsonp([8],{NHnr:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=e("7+uW"),i=e("X9xH"),o={name:"App",methods:{initView:function(){var n=this;this.$get("/init").then(function(t){if(console.log("init",t),200===t.data.code){var e=JSON.parse(t.data.data.text);n.$store.commit("addTextList",e),n.$store.commit("addBanner",t.data.data.bannerTopList);var a=t.data.data.invite;n.$store.commit("addInvite",a),a||n.$router.push("/invite"),n.$store.commit("addShareImg",t.data.data.shareImage)}})}},mounted:function(){i.a.init(),this.initView()}},r={render:function(){var n=this.$createElement,t=this._self._c||n;return t("div",{attrs:{id:"app"}},[t("keep-alive",[this.$route.meta.keepAlive?t("router-view"):this._e()],1),this._v(" "),this.$route.meta.keepAlive?this._e():t("router-view")],1)},staticRenderFns:[]};var u=e("VU/8")(o,r,!1,function(n){e("U1/A")},null,null).exports,c=e("/ocq");a.a.use(c.a);var s=new c.a({routes:[{path:"/",name:"Home",meta:{keepAlive:!0},component:function(){return Promise.all([e.e(0),e.e(2)]).then(e.bind(null,"FP3a"))}},{path:"/rule",name:"Rule",component:function(){return Promise.all([e.e(0),e.e(6)]).then(e.bind(null,"hI2a"))}},{path:"/order",name:"Rule",component:function(){return Promise.all([e.e(0),e.e(5)]).then(e.bind(null,"0wiy"))}},{path:"/refund",name:"Rule",component:function(){return Promise.all([e.e(0),e.e(4)]).then(e.bind(null,"0Jzp"))}},{path:"/cart",name:"Cart",component:function(){return Promise.all([e.e(0),e.e(3)]).then(e.bind(null,"qJko"))}},{path:"/invite",name:"Invite",component:function(){return e.e(1).then(e.bind(null,"6LbQ"))}}]}),p=e("NYxO");a.a.use(p.a);var d=new p.a.Store({state:{cartCount:0,scrollTop:0,indexList:[],ruleList:[],bindList:[],bannerTopList:[],invite:null,shareImg:""},mutations:{addCartCount:function(n,t){n.cartCount=t},addTextList:function(n,t){n.indexList=t.index_list,n.ruleList=t.rule_list,n.bindList=t.bind_list},addBanner:function(n,t){n.bannerTopList=t},addInvite:function(n,t){n.invite=t},addShareImg:function(n,t){n.shareImg=t}}}),l=e("fxnj"),h=e.n(l),f=function(n,t){var e=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];var a=Math.floor((new Date).getTime()/1e3),i=function(n){for(var t="",a=0;a<n;a++){var i=Math.ceil(35*Math.random());t+=e[i]}return t}(16),o="http://buy.51zhuanfan.com";n("http://47.96.17.80:9400/h5/wx/config",{timestamp:a,nonceStr:i,url:location.href.split("#")[0]}).then(function(n){var e=n.data.data.appId,r=n.data.data.signature;t.config({debug:!1,appId:e+"",timestamp:a+"",nonceStr:i+"",signature:r+"",jsApiList:["onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ"]}),t.error(function(n){console.log("验证失败：",n)}),t.ready(function(){var n="http://dl.buy.51zhuanfan.com/free/img/share_2018110201.jpg",e="千万爆品，一分抄底；全民嗨购，狂欢24小时。";t.onMenuShareTimeline({title:"点我优惠购",desc:e,link:o,imgUrl:n,success:function(){},cancel:function(){}}),t.onMenuShareAppMessage({title:"点我优惠购",desc:e,link:o,imgUrl:n,type:"link",dataUrl:"",success:function(){},cancel:function(){}}),t.onMenuShareQQ({title:"点我优惠购",desc:e,link:o,imgUrl:n,success:function(){},cancel:function(){}})})})},m=e("bqTm"),_=e.n(m),v=e("WocE"),g=e("7QTg"),b=e.n(g),w=(e("v2ns"),e("muQq"),e("e195"),e("1BT9")),y=e.n(w);a.a.use(b.a),a.a.use(_.a),a.a.use(y.a),a.a.prototype.$get=v.a,a.a.prototype.$post=v.c,a.a.prototype.get2=v.b,a.a.prototype.wx=h.a,a.a.prototype.share=f,a.a.config.productionTip=!1,new a.a({el:"#app",router:s,store:d,components:{App:u},template:"<App/>"})},"U1/A":function(n,t){},WocE:function(n,t,e){"use strict";e.d(t,"c",function(){return l}),e.d(t,"a",function(){return h}),e.d(t,"b",function(){return f});var a=e("//Fk"),i=e.n(a),o=e("mtWM"),r=e.n(o),u=e("mw3O"),c=e.n(u),s=e("lbHh"),p=e.n(s),d="http://freei.51zhuanfan.com/h5",l=function(n,t){t=t||{};var e=p.a.get("buy_h5_userid"),a=p.a.get("buy_h5_timestamp"),o=p.a.get("buy_h5_token");return e&&a&&o&&(t._userid=e,t._timestamp=a,t._token=o),t._h5=1,new i.a(function(e,a){r.a.post(d+n,c.a.stringify(t),{headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(n){e(n)}).catch(function(n){a(n)})})},h=function(n,t){t=t||{};var e=p.a.get("buy_h5_userid"),a=p.a.get("buy_h5_timestamp"),o=p.a.get("buy_h5_token");return e&&a&&o&&(t._userid=e,t._timestamp=a,t._token=o),t._h5=1,new i.a(function(e,a){r.a.get(d+n,{params:t}).then(function(n){e(n)}).catch(function(n){a(n)})})},f=function(n,t){return t._h5=1,new i.a(function(e,a){r.a.get(n,{params:t}).then(function(n){e(n)}).catch(function(n){a(n)})})}},X9xH:function(n,t,e){"use strict";var a=e("//Fk"),i=e.n(a),o=e("WocE"),r=e("lbHh"),u=e.n(r);function c(n){var t=new RegExp("(^|&)"+n+"=([^&]*)(&|$)","i"),e=window.location.search.substr(1).match(t);return null!=e?unescape(e[2]):""}var s=c("c"),p=c("code"),d="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf0f511ae22ff266c&redirect_uri=http%3A%2F%2Fbuy.51zhuanfan.com%3Fc%3D"+s+"&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect",l=-1;t.a={init:function(){p?Object(o.c)("/user/wx/login",{code:p,channel:s}).then(function(n){var t=n.data.data;console.log("data",t),u.a.set("buy_h5_userid",t.userid,{expires:7}),u.a.set("buy_h5_token",t.token,{expires:7}),u.a.set("buy_h5_timestamp",t.timestamp,{expires:7}),window.location.href="/"}):Object(o.a)("/user/info",{}).then(function(n){600!==n.data.code&&700!==n.data.code||(window.location.href=d)})},setInitData:function(n){l=n},checkInitData:function(){return new i.a(function(n,t){!function e(){1===l&&n(),-1===l&&setTimeout(function(){e()},10),0===l&&t()}()})}}},e195:function(n,t){},muQq:function(n,t){},v2ns:function(n,t){}},["NHnr"]);
//# sourceMappingURL=app.5b9474365a4dc246d678.js.map