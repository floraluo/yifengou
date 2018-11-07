<template>
  <div class="order">
    <!-- 下拉刷新 -->
    <div class="tip_text" v-if="showTip">{{tipText}}</div>
    <div class="order_detail">
      <div class="title">预估有效订单</div>
      <div class="subtitle">已付款并符合活动规则的订单</div>
      <div class='detail'>
        <div class='item'>
          <span class='num'>{{orderCount}}</span>
          <span class='desc'>预估有效订单数(笔)</span>
        </div>
        <div class='item'>
          <span class='num'>{{allMoney}}</span>
          <span class='desc'>总金额(元)</span>
        </div>
      </div>
      <div class='warning'>1、将直接打入填写的支付宝账号。2、由于订单量大，同步订单数据会有延迟，请耐心等待，不要随意退款。</div>
    </div>
    <div class="order_list">
      <div class="no_order" v-if="!orderList.length">暂无订单</div>
      <div class="order_item" v-for="(item,index) in orderList" :key="index">
        <div>{{item.orderNo}}</div>
        <div>{{item.statusName}}</div>
      </div>
    </div>
    <tabbar/>
  </div>
</template>

<script>
import tabbar from '../../components/tabbar'
export default {
  data() {
    return {
      orderCount:0,
      allMoney:0,
      orderList:[],

      el: null, // 下拉元素（mounted中初始）
      startX: 0, // 开始下拉的位置x
      startY: 0, // 开始下拉的位置y
      tipText: "下拉刷新", // 下拉刷新提示文字
      showTip: false, // 是否显示下拉刷新提示文字
      moveDistance: 0, // 下拉的距离
    };
  },
  components:{
      tabbar
  },
  methods:{
    // 获取用户订单信息
    getOrderInfo(){
      this.$get('/order/list').then(res=>{
        console.log(res)
        if (res.data.code === 200) {
          this.orderCount = res.data.data.count
          this.allMoney = res.data.data.money
          this.orderList = res.data.data.list
        }
      })
    },

    // 添加touch事件
    bindTouchEvent() {
      this.el.addEventListener("touchstart", this.touchStart);
      this.el.addEventListener("touchmove", this.touchMove);
      this.el.addEventListener("touchend", this.touchEnd);
    },

    //开始下拉监听
    touchStart(e) {
      let touch = e.changedTouches[0];
      this.tipText = "下拉刷新";
      this.startX = touch.clientX;
      this.startY = touch.clientY;
    },
    // 开始监听移动
    touchMove(e) {
      let touch = e.changedTouches[0];
      // 获取下拉举例
      let move = touch.clientY - this.startY;
      // 当 0<move<100 时，显示下拉区内容
      if (move > 0 && move < 80) {
        this.showTip = true;
        this.el.style.marginTop = move + "px";
        //记录下拉的距离
        this.moveDistance = touch.clientY - this.startY;
        if (move > 40) {
          this.tipText = "松开刷新";
        }
      }
    },

    // 监听移动结束（手指松开）
    touchEnd(e) {
      let touch = e.changedTouches[0];
      if (this.moveDistance > 50) {
        this.tipText = "刷新中...";
        this.getOrderInfo()
        setTimeout(()=>{
          this.resetBox()
        },1000)
        
      }
    },

    // 重置界面（下拉刷新恢复）
    resetBox() {
      this.showTip = false
      if (this.moveDistance > 0) {
        let timer = setInterval(()=> {
          this.el.style.marginTop = --this.moveDistance + "px";
          if (Number(this.el.style.marginTop.split("px")[0]) <= 0)
            clearInterval(timer);
        }, 1);
      }
    },
  },
  mounted(){
    this.getOrderInfo()
    // 分享
    this.share(this.get2,this.wx)

    // 获取home元素，添加touch事件，做下拉刷新
    this.el = document.querySelector(".order");
    this.bindTouchEvent();
  }
};
</script>

<style>
.order .tip_text{
  width: 100%;
  padding: 5px 0;
  text-align: center;
  color: white;
}
.order .order_detail{
  margin:10px;
  background: white;
  padding:10px 0 10px; 
  font-size: 16px;
}
.order_detail .title{
  position: relative;
  margin-left: 20px;
  display: flex;
  align-items: center;
}
.order_detail .title::after{
  content:'';
  display:block;
  width: 3px;
  height: 100%;
  background: #ffde37;
  position: absolute;
  top: 0;
  left: -5px;
}
.order_detail .subtitle{
  margin-left: 20px;
  color: #999;
  font-size: 12px;
}
.order_detail .detail{
  display: flex;
  justify-content: space-around;
  margin:10px 0 15px;
}
 .order_detail .detail .item{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.order_detail .detail .num{
  font-size: 17px;
  color: #774024;
}
.order_detail .detail .desc{
  font-size: 12px;
  color: #999;
}
.order_detail .warning{
  font-size: 12px;
  margin-left: 10px;
}
.order_list{
  margin:10px;
  background: white;
  font-size: 16px;
  margin-bottom: 52px;
}
.order_list .no_order{
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
}
.order_list .order_item{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  height: 40px;
  line-height: 40px;
  border-bottom:1px solid #ccc;
}
</style>