webpackJsonp([4],{"67fX":function(t,e){},hI2a:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i("MTyd"),s=(i("X9xH"),{data:function(){return{}},components:{tabbar:n.a},computed:{ruleList:function(){return this.$store.state.ruleList}},methods:{initView:function(){var t=this;this.$get("/init").then(function(e){console.log("init",e),200===e.data.code&&e.data.data.showInvite&&t.$router.push("/invite")})}},mounted:function(){this.initView(),this.share(this.get2,this.wx)}}),r={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"rules"},[t._l(t.ruleList,function(e,n){return i("div",{key:n,staticClass:"rule_item"},[i("div",{staticClass:"rule_title"},[t._v(t._s(e.title))]),t._v(" "),t._l(e.list,function(e,n){return i("div",{key:n,staticClass:"rule_content"},[t._v(t._s(e))])})],2)}),t._v(" "),i("tabbar")],2)},staticRenderFns:[]};var a=i("VU/8")(s,r,!1,function(t){i("67fX")},null,null);e.default=a.exports}});
//# sourceMappingURL=4.7ebbd32e2ff6777f6a44.js.map