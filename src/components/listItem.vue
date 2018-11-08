<template>
    <!-- 商品列表组件 -->
    <div class="list_item">
        <div class="goods_img">
            <img :src="pic">
        </div>
        <div class="goods_info">
            <div class="goods_name" style="display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;">{{name}}</div>
            <div class="goods_price">
                <div class="now_price">¥{{couponPrice}}</div>
                <div class="before_price">原价: ¥{{goodsPrice}}</div>
            </div>
            <div class="goods_coupon">
                <div class='coupon_name'>券</div>
                <div class='coupon_price'>¥{{discountPrice}}</div>
            </div>
        </div>
        <i class="iconfont icon-add" @click.stop="addCart(id)"></i>
    </div>
</template>

<script>
export default {
  props:{
    id:Number,
    pic:String,
    name:String,
    couponPrice:Number,
    discountPrice:Number,
    goodsPrice:Number
  },
  data() {
    return {};
  },
  methods:{
    addCart(id){
      console.log(id)
      this.$get('/cart/add',{id}).then(res=>{
        console.log(res)
        if (res.data.code === 200) {
          // 获取购物车数量
          let count = res.data.data
          // 改变cartCount（购物车数量）
          this.$store.commit('addCartCount',count)
          
          this.$toast.center('添加成功')
        } else {
          this.$toast.center('添加失败，请重试')
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
  width: 100px;
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
  height: 42px;
  box-sizing: border-box;
  padding-left: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
}
@media only screen and (max-width:320px){
    .list_item .goods_info .goods_name{
        font-size: 14px;
        height: 40px;
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
  box-sizing: border-box;
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
.list_item .iconfont{
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