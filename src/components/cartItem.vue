<template>
    <!-- 商品列表组件 -->
    <div class="list_item">
        <div class="goods_img">
            <img src="http://img14.360buyimg.com/n1/jfs/t26941/123/1324560723/187593/bcea52d1/5bc6a088N94503c2c.png" alt="">
        </div>
        <div class="goods_info">
            <div class="goods_name">朴物大美（pwubeauty） PWU小苍兰香氛系列洗发水 无硅油去屑止痒含玻尿酸 锁水保湿持久留香 小苍兰洗发水90ml</div>
            <div class="goods_price">
                <div class="now_price">¥9.9</div>
                <div class="before_price">¥19.9</div>
            </div>
            <div class="goods_coupon">
                <div class='coupon_name'>券</div>
                <div class='coupon_price'>¥10</div>
            </div>
        </div>
        <i class="iconfont icon-shanchu"></i>
    </div>
</template>

<script>
export default {
  data() {
    return {};
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
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
@media only screen and (max-width:320px){
    .list_item .goods_info .goods_name{
        font-size: 14px;
    }
}
.list_item .goods_info .goods_price {
  display: flex;
  align-items: center;
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