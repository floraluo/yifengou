<template>
  <div class="order">
    <!-- 下拉刷新
    <div class="tip_text" v-if="showTip">{{tipText}}</div> -->
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
    <tabbar />
  </div>
</template>

<script>
import tabbar from "../../components/tabbar";
import login from "../../module/login";
export default {
  data() {
    return {
      orderCount: 0,
      allMoney: 0,
      orderList: []
    };
  },
  components: {
    tabbar
  },
  methods: {
    // 获取用户订单信息
    getOrderInfo() {
      this.$get("/order/list").then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.orderCount = res.data.data.count;
          this.allMoney = res.data.data.money;
          this.orderList = res.data.data.list;
        }
      });
    }
  },
  mounted() {
    var func = () => {
      // 判断是否有邀请码，没有就跳转填写页面
      let invite = this.$store.state.invite;
      if (!invite) {
        this.$router.push("/invite");
      }

      this.getOrderInfo();
      // 分享
      this.share(this.get2, this.wx, this.$store.state.shareImg);
    };

    // 结果为true时再初始页面
    login.checkInitData().then(func);
  }
};
</script>

<style>
.order .tip_text {
  width: 100%;
  padding: 5px 0;
  text-align: center;
  color: white;
}
.order .order_detail {
  margin: 10px;
  background: white;
  padding: 10px 0 10px;
  font-size: 16px;
}
.order_detail .title {
  position: relative;
  margin-left: 20px;
  display: flex;
  align-items: center;
}
.order_detail .title::after {
  content: "";
  display: block;
  width: 3px;
  height: 100%;
  background: #ffde37;
  position: absolute;
  top: 0;
  left: -5px;
}
.order_detail .subtitle {
  margin-left: 20px;
  color: #999;
  font-size: 12px;
}
.order_detail .detail {
  display: flex;
  justify-content: space-around;
  margin: 10px 0 15px;
}
.order_detail .detail .item {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.order_detail .detail .num {
  font-size: 17px;
  color: #774024;
}
.order_detail .detail .desc {
  font-size: 12px;
  color: #999;
}
.order_detail .warning {
  font-size: 12px;
  margin-left: 10px;
}
.order_list {
  margin: 10px;
  background: white;
  font-size: 16px;
  margin-bottom: 52px;
}
.order_list .no_order {
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
}
.order_list .order_item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #ccc;
}
</style>