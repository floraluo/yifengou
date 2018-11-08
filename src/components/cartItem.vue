<template>
  <!-- 商品列表组件 -->
  <div class="list_item">
    <div class="goods_img">
      <img :src="pic">
    </div>
    <div class="goods_info">
      <div class="goods_name">{{name}}</div>
      <div class="goods_price">
        <div class="now_price">¥{{couponPrice}}</div>
        <div class="before_price">原价: ¥{{goodsPrice}}</div>
      </div>
      <div class="goods_coupon">
        <div class='coupon_name'>券</div>
        <div class='coupon_price'>¥{{discountPrice}}</div>
      </div>
    </div>
    <i class="iconfont icon-shanchu" @click.stop="reduceCart(id)"></i>
  </div>
</template>

<script>
export default {
  props: {
    id: Number,
    pic: String,
    name: String,
    couponPrice: Number,
    discountPrice: Number,
    goodsPrice: Number
  },
  data() {
    return {};
  },
  methods:{
    // 删除购物车
    reduceCart(id){
      this.$get('/cart/del',{id}).then(res=>{
        console.log('删除',res)
        if (res.data.code === 200) {
          this.$toast.center('删除成功')
          // 删除的同时需要派发一个事件给父组件（这里指cart页面），事件通知父组件更新购物车列表
          this.$emit('updateCartList')
        }
      })
    }
  }
};
</script>

<style>
.list_item {
  position: relative;
  width: 100%;
  height: 110px;
  display: flex;
  justify-content: space-between;
  background: white;
  border-radius: 10px;
  margin: 10px 0;
}
.list_item .goods_img {
  width: 110px;
  height: 100%;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}
.list_item .goods_img img {
  width: 100%;
  height: 100%;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}
.list_item .goods_info {
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  font-size: 15px;
}
.list_item .goods_info .goods_name {
  width: 100%;
  box-sizing: border-box;
  padding-left: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  /*! autoprefixer: off */
  -webkit-box-orient: vertical;
  /*! autoprefixer: on */
  -webkit-line-clamp: 2;
}
@media only screen and (max-width: 320px) {
  .list_item .goods_info .goods_name {
    font-size: 14px;
  }
}
.list_item .goods_info .goods_price {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding-left: 10px;
}
.goods_info .goods_price .now_price {
  font-size: 32rpx;
  color: red;
  margin-right: 10px;
}
.goods_info .goods_price .before_price {
  font-size: 26rpx;
  color: #ccc;
  text-decoration: line-through;
}
.goods_info .goods_coupon {
  display: flex;
  width: 70px;
  height: 25px;
  line-height: 25px;
  margin-bottom: 4px;
  margin-left: 10px;
  text-align: center;
  border: 1px solid #ec4e4f;
  border-radius: 5px;
  color: #ec4e4f;
}
.goods_info .goods_coupon .coupon_name {
  width: 25px;
  height: 25px;
  line-height: 25px;
  text-align: center;
  border-right: 1px dotted #ec4e4f;
  margin-right: 10px;
}
.list_item .iconfont {
  position: absolute;
  color: #e94f4f;
  font-size: 30px;
  right: 25px;
  bottom: 10px;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>