webpackJsonp([6],{"0wiy":function(t,s,i){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=i("MTyd"),e=(i("X9xH"),{data:function(){return{orderCount:0,allMoney:0,orderList:[]}},components:{tabbar:a.a},methods:{getOrderInfo:function(){var t=this;this.$get("/order/list").then(function(s){console.log(s),200===s.data.code&&(t.orderCount=s.data.data.count,t.allMoney=s.data.data.money,t.orderList=s.data.data.list)})},initView:function(){var t=this;this.$get("/init").then(function(s){console.log("init",s),200!==s.data.code||s.data.data.invite||t.$router.push("/invite")})}},mounted:function(){this.initView(),this.getOrderInfo(),this.share(this.get2,this.wx,this.$store.state.shareImg)}}),n={render:function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"order"},[i("div",{staticClass:"order_detail"},[i("div",{staticClass:"title"},[t._v("预估有效订单")]),t._v(" "),i("div",{staticClass:"subtitle"},[t._v("已付款并符合活动规则的订单")]),t._v(" "),i("div",{staticClass:"detail"},[i("div",{staticClass:"item"},[i("span",{staticClass:"num"},[t._v(t._s(t.orderCount))]),t._v(" "),i("span",{staticClass:"desc"},[t._v("预估有效订单数(笔)")])]),t._v(" "),i("div",{staticClass:"item"},[i("span",{staticClass:"num"},[t._v(t._s(t.allMoney))]),t._v(" "),i("span",{staticClass:"desc"},[t._v("总金额(元)")])])]),t._v(" "),i("div",{staticClass:"warning"},[t._v("1、将直接打入填写的支付宝账号。2、由于订单量大，同步订单数据会有延迟，请耐心等待，不要随意退款。")])]),t._v(" "),i("div",{staticClass:"order_list"},[t.orderList.length?t._e():i("div",{staticClass:"no_order"},[t._v("暂无订单")]),t._v(" "),t._l(t.orderList,function(s,a){return i("div",{key:a,staticClass:"order_item"},[i("div",[t._v(t._s(s.orderNo))]),t._v(" "),i("div",[t._v(t._s(s.statusName))])])})],2),t._v(" "),i("tabbar")],1)},staticRenderFns:[]};var r=i("VU/8")(e,n,!1,function(t){i("MVfF")},null,null);s.default=r.exports},MVfF:function(t,s){}});
//# sourceMappingURL=6.59448b5b1988dd9abdf4.js.map