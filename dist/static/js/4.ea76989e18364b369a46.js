webpackJsonp([4],{"0wiy":function(t,a,s){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var e=s("MTyd"),i=(s("X9xH"),{data:function(){return{orderCount:0,allMoney:0,orderList:[]}},components:{tabbar:e.a},methods:{getOrderInfo:function(){var t=this;this.$get("/order/list").then(function(a){console.log(a),200===a.data.code&&(t.orderCount=a.data.data.count,t.allMoney=a.data.data.money,t.orderList=a.data.data.list)})},initView:function(){var t=this;this.$get("/init").then(function(a){console.log("init",a),200===a.data.code&&(a.data.data.invite?(t.getOrderInfo(),t.share(t.get2,t.wx,a.data.data.shareImage)):t.$router.push("/invite"))})}},mounted:function(){this.initView()}}),n={render:function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"order"},[s("div",{staticClass:"order_detail"},[s("div",{staticClass:"title"},[t._v("预估有效订单")]),t._v(" "),s("div",{staticClass:"subtitle"},[t._v("已付款并符合活动规则的订单")]),t._v(" "),s("div",{staticClass:"detail"},[s("div",{staticClass:"item"},[s("span",{staticClass:"num"},[t._v(t._s(t.orderCount))]),t._v(" "),s("span",{staticClass:"desc"},[t._v("预估有效订单数(笔)")])]),t._v(" "),s("div",{staticClass:"item"},[s("span",{staticClass:"num"},[t._v(t._s(t.allMoney))]),t._v(" "),s("span",{staticClass:"desc"},[t._v("总金额(元)")])])]),t._v(" "),s("div",{staticClass:"warning"},[t._v("1、将直接打入填写的支付宝账号。2、由于订单量大，同步订单数据会有延迟，请耐心等待，不要随意退款。")])]),t._v(" "),s("div",{staticClass:"order_list"},[t.orderList.length?t._e():s("div",{staticClass:"no_order"},[t._v("暂无订单")]),t._v(" "),t._l(t.orderList,function(a,e){return s("div",{key:e,staticClass:"order_item"},[s("div",[t._v(t._s(a.orderNo))]),t._v(" "),s("div",[t._v(t._s(a.statusName))])])})],2),t._v(" "),s("tabbar")],1)},staticRenderFns:[]};var r=s("VU/8")(i,n,!1,function(t){s("OKbQ")},null,null);a.default=r.exports},OKbQ:function(t,a){}});
//# sourceMappingURL=4.ea76989e18364b369a46.js.map