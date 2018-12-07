<template>
  <div class="row cart-list">
    <div v-if="!$store.state.cartList.length" class="no-cartlist">购物车还没有任何商品哦o(╥﹏╥)o</div>
    <!-- 购物车列表 -->
    <!--<cart-item v-for="(item,index) in cartList"-->
               <!--:key="index"-->
               <!--@click.native="goBuy(item.id)"-->
               <!--:id="item.id"-->
               <!--:pic="item.goodsImg"-->
               <!--:name="item.goodsContent"-->
               <!--:couponPrice="item.couponPrice"-->
               <!--:discountPrice="item.discountPrice"-->
               <!--:goodsPrice="item.goodsPrice"-->
               <!--@updateCartList="updateList">-->
    <!--</cart-item>-->
    <list-item v-for="(item,index) in $store.state.cartList"
               @click.native="goBuy(item.id)"
               :key="index"
               :goods="item"
               :index="index"
               @delete-goods="deleteGoodsInCart"/>
  </div>
</template>

<script>
import cartItem from "@/components/cartItem";
import listItem from "@/components/listItem";

import tabbar from "../../components/tabbar";
import login from "../../module/login";
export default {
  data() {
    return {
      cartList: [],
      shareImg: ""
    };
  },
  components: {
    cartItem,
    listItem
  },
  methods: {
    //删除购物车中商品
    deleteGoodsInCart(index) {
      // this.getCartList();
      // this.cartList.splice(index, 1);
      this.$store.commit('deleteGoodsInCart', index)
    },

    // 点击购买商品
    goBuy(id) {
      this.$get("/goods/link", { id }).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          if (res.data.data.limit && res.data.data.link) {
            this.$toast.center(res.data.data.limitMsg);
          } else {
            if (res.data.data.link) {
              console.log(res.data.data.link);
              window.location.href = res.data.data.link;
            }
          }
        } else if (res.data.code === 1001) {
          this.$toast.center("活动时间还没到哦");
        } else if (res.data.code === 1002) {
          this.$toast.center("活动时间已经结束了");
        } else if (res.data.code === 1003) {
          this.$toast.center("该商品已经下架");
        } else {
          this.$toast.center("请重试");
        }
      });
    }
  },
  mounted() {
    // 分享
    // this.share(this.get2, this.wx,this.$store.state.shareImg);
    this.share(this.get2, this.wx);
  },
  activated () {
    //每次进入购物车重新获取数据
    this.$get("/cart/list").then(res => {
      if (res.code === 200) {
        this.$store.commit('setCartList',res.data || [])
      }
    })
  }
};
</script>

<style scoped lang="scss">
.cart-list {
  margin-bottom: 0;
  .no-cartlist {
    height: 100px;
    line-height: 100px;
    text-align: center;
    background: white;
    border-radius: 8px;
  }
}
</style>
