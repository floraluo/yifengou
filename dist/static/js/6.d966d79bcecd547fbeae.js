webpackJsonp([6],{"0wiy":function(t,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var e={data:function(){return{orderCount:0,allMoney:0,orderList:[]}},components:{tabbar:a("MTyd").a},methods:{getOrderInfo:function(){var t=this;this.$get("/order/list").then(function(s){console.log(s),200===s.data.code&&(t.orderCount=s.data.data.count,t.allMoney=s.data.data.money,t.orderList=s.data.data.list)})}},mounted:function(){this.$store.state.invite||this.$router.push("/invite"),this.getOrderInfo(),this.share(this.get2,this.wx,this.$store.state.shareImg)}},i={render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"order"},[a("div",{staticClass:"order_detail"},[a("div",{staticClass:"title"},[t._v("预估有效订单")]),t._v(" "),a("div",{staticClass:"subtitle"},[t._v("已付款并符合活动规则的订单")]),t._v(" "),a("div",{staticClass:"detail"},[a("div",{staticClass:"item"},[a("span",{staticClass:"num"},[t._v(t._s(t.orderCount))]),t._v(" "),a("span",{staticClass:"desc"},[t._v("预估有效订单数(笔)")])]),t._v(" "),a("div",{staticClass:"item"},[a("span",{staticClass:"num"},[t._v(t._s(t.allMoney))]),t._v(" "),a("span",{staticClass:"desc"},[t._v("总金额(元)")])])]),t._v(" "),a("div",{staticClass:"warning"},[t._v("1、将直接打入填写的支付宝账号。2、由于订单量大，同步订单数据会有延迟，请耐心等待，不要随意退款。")])]),t._v(" "),a("div",{staticClass:"order_list"},[t.orderList.length?t._e():a("div",{staticClass:"no_order"},[t._v("暂无订单")]),t._v(" "),t._l(t.orderList,function(s,e){return a("div",{key:e,staticClass:"order_item"},[a("div",[t._v(t._s(s.orderNo))]),t._v(" "),a("div",[t._v(t._s(s.statusName))])])})],2),t._v(" "),a("tabbar")],1)},staticRenderFns:[]};var r=a("VU/8")(e,i,!1,function(t){a("mNbC")},null,null);s.default=r.exports},mNbC:function(t,s){}});
//# sourceMappingURL=6.d966d79bcecd547fbeae.js.map