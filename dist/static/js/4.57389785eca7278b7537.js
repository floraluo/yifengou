webpackJsonp([4],{"3sKl":function(t,e){},hI2a:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i("MTyd"),n=(i("X9xH"),{data:function(){return{ruleList:[]}},components:{tabbar:s.a},computed:{},methods:{initView:function(){var t=this;this.$get("/init").then(function(e){if(console.log("rule-init",e),200===e.data.code)if(e.data.data.showInvite)t.$router.push("/invite");else{var i=JSON.parse(e.data.data.text);t.ruleList=i.rule_list}})}},mounted:function(){this.initView(),this.share(this.get2,this.wx)}}),a={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"rules"},[t._l(t.ruleList,function(e,s){return i("div",{key:s,staticClass:"rule-item"},[i("div",{staticClass:"rule-title"},[t._v(t._s(e.title))]),t._v(" "),t._l(e.list,function(e,s){return i("div",{key:s,staticClass:"rule-content"},[t._v(t._s(e))])})],2)}),t._v(" "),i("tabbar")],2)},staticRenderFns:[]};var r=i("VU/8")(n,a,!1,function(t){i("3sKl")},"data-v-79acb030",null);e.default=r.exports}});
//# sourceMappingURL=4.57389785eca7278b7537.js.map