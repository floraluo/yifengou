webpackJsonp([1],{"6LbQ":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n={data:function(){return{invite:""}},methods:{saveInvite:function(){var t=this;this.$get("/invite",{invite:this.invite}).then(function(e){console.log(e),200===e.data.code?(t.$toast.center("绑定成功"),t.$store.commit("addInvite",t.invite),t.$router.push("/")):t.$toast.center(e.data.msg)})}},mounted:function(){this.share(this.get2,this.wx)}},s={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"invite-code-box"},[t._m(0),t._v(" "),i("div",{staticClass:"form"},[i("div",{staticClass:"input"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.invite,expression:"invite"}],attrs:{type:"text",placeholder:"请输入邀请码"},domProps:{value:t.invite},on:{input:function(e){e.target.composing||(t.invite=e.target.value)}}})]),t._v(" "),i("div",{staticClass:"btn",on:{click:t.saveInvite}},[t._v("\n            立即抢购\n        ")])]),t._v(" "),t._m(1)])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"top-img img-box"},[e("img",{attrs:{src:i("UHZN")}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"bottom-img img-box"},[e("img",{attrs:{src:i("x9EY")}})])}]};var a=i("VU/8")(n,s,!1,function(t){i("liT+")},"data-v-213e822a",null);e.default=a.exports},UHZN:function(t,e,i){t.exports=i.p+"static/img/icon1.ccaecee.png"},"liT+":function(t,e){},x9EY:function(t,e,i){t.exports=i.p+"static/img/icon2.e4380ec.png"}});
//# sourceMappingURL=1.49440bebbd43febd13bc.js.map