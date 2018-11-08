<template>
  <div class="cart_list">
    <div v-if="!cartList.length" class="no_cartlist">购物车为空</div>
    <!-- 购物车列表 -->
    <cart-item v-for="(item,index) in cartList" :key="index" @click.native="goBuy(item.id)" :id="item.id" :pic="item.goodsImg" :name="item.goodsContent" :couponPrice="item.couponPrice" :discountPrice="item.discountPrice" :goodsPrice="item.goodsPrice" @updateCartList="updateList">
    </cart-item>
    <tabbar />
  </div>
</template>

<script>
import cartItem from "@/components/cartItem";
import tabbar from "../../components/tabbar";
import login from "../../module/login";
export default {
  data() {
    return {
      cartList: [],
      shareImg:''
    };
  },
  components: {
    cartItem,
    tabbar
  },
  methods: {
    // 获取购物车列表
    getCartList() {
      this.$get("/cart/list").then(res => {
        console.log("获取", res);
        if (res.data.code === 200) {
          this.cartList = res.data.data;
        } else {
          this.cartList = [];
        }
      });
    },

    // 删除后 更新列表
    updateList() {
      this.getCartList();
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
               window.location.href = res.data.data.link
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
    },
    initView(){
      this.$get('/init').then(res=>{
        console.log('init',res)
        if (res.data.code === 200) {
          if (!res.data.data.invite){
            this.$router.push("/invite");
          } else {
            this.share(this.get2, this.wx, res.data.data.shareImage);
          }
        }
      })
    }
  },
  mounted() {
      this.initView()

      this.getCartList();
      // 分享
      // this.share(this.get2, this.wx, this.$store.state.shareImg);

  }
};
</script>

<style>
.cart_list {
  margin: 0 10px 52px;
}
.no_cartlist {
  margin-top: 10px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  background: white;
  border-radius: 8px;
}
@media only screen and (max-width: 320px) {
  .cart_list {
    margin: 0 5px;
  }
}
</style>