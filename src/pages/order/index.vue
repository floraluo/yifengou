<template>
  <div>
    <!-- <div v-if="!showOrder" style="color:white;text-align:center;padding-top:10px;">数据加载中...</div> -->
    <div class="order" v-if="showOrder">
      <!-- 下拉刷新
    <div class="tip_text" v-if="showTip">{{tipText}}</div> -->
      <div class="order-detail">
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
      <div class="order-list">
        <div class="no-order" v-if="!orderList.length">暂无订单</div>
        <div class="order-item" v-for="(item,index) in orderList" :key="index">
          <div>{{item.orderNo}}</div>
          <div>{{item.statusName}}</div>
        </div>
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
      orderList: [],
      showOrder: false
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
          this.showOrder = true;
        }
      });
    },

    initView() {
      this.$get("/init").then(res => {
        console.log("init", res);
        if (res.data.code === 200) {
          if (res.data.data.showInvite) {
            this.$router.push("/invite");
          } else {
            this.getOrderInfo();
          }
        }
      });
    }
  },
  mounted() {
    this.initView();

    // 分享
    //this.share(this.get2, this.wx,this.$store.state.shareImg);
    this.share(this.get2, this.wx);
  }
};
</script>

<style scoped lang="scss">
.order {
  .tip_text {
    width: 100%;
    padding: 5px 0;
    text-align: center;
    color: white;
  }

  .order-detail {
    margin: 10px;
    background: white;
    padding: 10px 0 10px;
    font-size: 16px;
    .title {
      position: relative;
      margin-left: 20px;
      display: flex;
      align-items: center;
      &::after {
        content: "";
        display: block;
        width: 3px;
        height: 100%;
        background: #ffde37;
        position: absolute;
        top: 0;
        left: -5px;
      }
    }
    .subtitle {
      margin-left: 20px;
      color: #999;
      font-size: 12px;
    }

    .detail {
      display: flex;
      justify-content: space-around;
      margin: 10px 0 15px;
      .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        .num {
          font-size: 17px;
          color: #774024;
        }
        .desc {
          font-size: 12px;
          color: #999;
        }
      }
    }

    .warning {
      font-size: 12px;
      margin-left: 10px;
    }
  }

  .order-list {
    margin: 10px;
    background: white;
    font-size: 16px;
    margin-bottom: 52px;
    .no-order {
      width: 100%;
      height: 40px;
      line-height: 40px;
      text-align: center;
    }
    .order-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #ccc;
    }
  }
}
</style>