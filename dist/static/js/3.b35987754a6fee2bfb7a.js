webpackJsonp([3],{Chp5:function(t,i){},X54C:function(t,i){},qJko:function(t,i,a){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var e={props:{id:Number,pic:String,name:String,couponPrice:Number,discountPrice:Number,goodsPrice:Number},data:function(){return{}},methods:{reduceCart:function(t){var i=this;this.$get("/cart/del",{id:t}).then(function(t){console.log("删除",t),200===t.data.code&&(i.$toast.center("删除成功"),i.$emit("updateCartList"))})}}},s={render:function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("div",{staticClass:"list_item"},[a("div",{staticClass:"goods_img"},[a("img",{attrs:{src:t.pic}})]),t._v(" "),a("div",{staticClass:"goods_info"},[a("div",{staticClass:"goods_name"},[t._v(t._s(t.name))]),t._v(" "),a("div",{staticClass:"goods_price"},[a("div",{staticClass:"now_price"},[t._v("¥"+t._s(t.couponPrice))]),t._v(" "),a("div",{staticClass:"before_price"},[t._v("原价: ¥"+t._s(t.goodsPrice))])]),t._v(" "),a("div",{staticClass:"goods_coupon"},[a("div",{staticClass:"coupon_name"},[t._v("券")]),t._v(" "),a("div",{staticClass:"coupon_price"},[t._v("¥"+t._s(t.discountPrice))])])]),t._v(" "),a("i",{staticClass:"iconfont icon-shanchu",on:{click:function(i){i.stopPropagation(),t.reduceCart(t.id)}}})])},staticRenderFns:[]};var n=a("VU/8")(e,s,!1,function(t){a("X54C")},null,null).exports,o=a("MTyd"),c=(a("X9xH"),{data:function(){return{cartList:[]}},components:{cartItem:n,tabbar:o.a},methods:{getCartList:function(){var t=this;this.$get("/cart/list").then(function(i){console.log("获取",i),200===i.data.code?t.cartList=i.data.data:t.cartList=[]})},updateList:function(){this.getCartList()},goBuy:function(t){var i=this;this.$get("/goods/link",{id:t}).then(function(t){console.log(t),200===t.data.code?t.data.data.limit&&t.data.data.link?i.$toast.center(t.data.data.limitMsg):t.data.data.link&&(console.log(t.data.data.link),window.location.href=t.data.data.link):1001===t.data.code?i.$toast.center("活动时间还没到哦"):1002===t.data.code?i.$toast.center("活动时间已经结束了"):1003===t.data.code?i.$toast.center("该商品已经下架"):i.$toast.center("请重试")})},initView:function(){var t=this;this.$get("/init").then(function(i){if(console.log("init",i),200===i.data.code){if(!i.data.data.invite)return void t.$router.push("/invite")}else t.$router.push("/invite")})}},mounted:function(){this.initView(),this.getCartList(),this.share(this.get2,this.wx,this.$store.state.shareImg)}}),r={render:function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("div",{staticClass:"cart_list"},[t.cartList.length?t._e():a("div",{staticClass:"no_cartlist"},[t._v("购物车为空")]),t._v(" "),t._l(t.cartList,function(i,e){return a("cart-item",{key:e,attrs:{id:i.id,pic:i.goodsImg,name:i.goodsContent,couponPrice:i.couponPrice,discountPrice:i.discountPrice,goodsPrice:i.goodsPrice},on:{updateCartList:t.updateList},nativeOn:{click:function(a){t.goBuy(i.id)}}})}),t._v(" "),a("tabbar")],2)},staticRenderFns:[]};var d=a("VU/8")(c,r,!1,function(t){a("Chp5")},null,null);i.default=d.exports}});
//# sourceMappingURL=3.b35987754a6fee2bfb7a.js.map