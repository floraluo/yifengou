<template>
    <!-- 商品列表组件 -->
  <div class="list-item">
    <div class="goods-img">
      <img :src="goods.goodsImg">
    </div>
    <div class="goods-info">
      <div class="name">{{goods.goodsContent}}</div>
      <div class="refund"><span>返现 ￥9.89</span></div>
      <div class="price">
        <span class="now-price">¥{{goods.couponPrice}}</span>
        <span class="before-price">原价: ¥{{goods.goodsPrice}}</span>
      </div>
      <!--<div class="coupon">-->
      <!--<div class='coupon-name'>券</div>-->
      <!--<div class='coupon-price'>¥{{discountPrice}}</div>-->
      <!--</div>-->
    </div>
    <i class="iconfont icon-add" @click.stop="addCart(goods)" v-if="$route.path === '/goods'"></i>
    <i class="iconfont icon-shanchu" @click.stop="reduceCart(goods.id, index)" v-else-if="$route.path === '/goods/cart'"></i>
  </div>
</template>

<script>
export default {
  props:{
    // id:Number,
    // pic:String,
    // name:String,
    // couponPrice:Number,
    // discountPrice:Number,
    // goodsPrice:Number,
    goods: {
      type: Object,
      default: {}
    },
    index: Number
  },
  data() {
    return {};
  },
  methods:{
    addCart(goods){
      let existed = this.$store.state.cartList.some(item => {
        if (item.id === goods.id) return true;
      })
      if (existed) {
        this.$toast.center('此商品已添加到购物车，不能重复添加！')
      } else {
        this.$get('/cart/add',{id: goods.id}).then(res=>{
          if (res.code === 200) {
            // 获取购物车数量
            let count = res.data
            // 改变cartCount（购物车数量）
            this.$store.commit('setCartCount',count);
            this.$store.commit('pushGoodsToCart',goods);

            this.$toast.center('添加成功')
          } else {
            this.$toast.center('添加失败，请重试')
          }
        })
      }
    },
    // 删除购物车
    reduceCart(id, index){
      this.$get('/cart/del',{id}).then(res=>{
        if (res.code === 200) {
          this.$toast.center('删除成功')
          // 删除的同时需要派发一个事件给父组件（这里指cart页面），事件通知父组件更新购物车列表
          this.$emit('delete-goods', index)
        }
      })
    }
  }
};
</script>

<style scoped lang="scss">
  @import "../sass/variables";
  $list-gutter: 10px;
  .list-item {
    position: relative;
    width: 100%;
    height: 100px;
    padding: $list-gutter $gutter-margin;
    display: flex;
    border-bottom: 1px solid #e0e0e0;
    background-color: #fff;
    .goods-img{
      width: 80px;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      img{
        max-width: 100%;
        max-height: 100%;
      }
    }
    .goods-info{
      flex: 1;
      padding-left: 10px;
      .name{
        height: 32px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        /*! autoprefixer: off */
        -webkit-box-orient: vertical;
        /*! autoprefixer: on */
        -webkit-line-clamp: 2;
        font-size: 12px;
        color: #333;
      }
      .refund{
        margin-top: 8px;
        margin-bottom: 6px;
        span{
          display: inline-block;
          padding-left: 5px;
          padding-right: 5px;
          border-radius: 2px;
          border: 1px solid #ff9aaf;
          font-size: 11px;
          color: #a95458;
          background-color: #fdf0ef;
        }
      }
      .price{
        .now-price{
          font-weight: 500;
          font-size: 18px;
          color: $theme-color;
        }
        .before-price{
          margin-left: 4px;
          text-decoration: line-through;
          font-size: 10px;
          color: #999;
        }
      }
    }
    .iconfont{
      display: flex;
      width: 30px;
      height: 30px;
      justify-content: flex-end;
      align-items: flex-end;
      position: absolute;
      right: $gutter-margin;
      bottom: $list-gutter;
      color: #6a6a6a;
      font-size: 26px;
    }
  }
</style>
