webpackJsonp([6],{BhYL:function(t,e){},hI2a:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=n("MTyd"),r=n("X9xH"),i={data:function(){return{}},components:{tabbar:s.a},computed:{ruleList:function(){return this.$store.state.ruleList}},methods:{},mounted:function(){var t=this;r.a.checkInitData().then(function(){t.$store.state.invite||t.$router.push("/invite"),t.share(t.get2,t.wx,t.$store.state.shareImg)})}},a={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"rules"},[t._l(t.ruleList,function(e,s){return n("div",{key:s,staticClass:"rule_item"},[n("div",{staticClass:"rule_title"},[t._v(t._s(e.title))]),t._v(" "),t._l(e.list,function(e,s){return n("div",{key:s,staticClass:"rule_content"},[t._v(t._s(e))])})],2)}),t._v(" "),n("tabbar")],2)},staticRenderFns:[]};var u=n("VU/8")(i,a,!1,function(t){n("BhYL")},null,null);e.default=u.exports}});
//# sourceMappingURL=6.5959c08067327c2e7547.js.map