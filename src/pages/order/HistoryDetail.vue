<template>
  <div>
    <!--活动标题-->
    <div class="activity">{{this.$route.query.name}}</div>

    <!--订单信息-->
    <div class="order" v-if="showOrderBox">

      <!--订单统计-->
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
      <!--./订单列表-->

      <!--订单列表-->
      <div class="order-list">
        <div class="order-empty" v-if="!orderList.length">暂无订单</div>
        <div class="order-item" v-for="(item,index) in orderList" :key="index">
          <div>{{item.orderNo}}</div>
          <div>{{item.statusName}}</div>
        </div>
      </div>
      <!--./订单列表-->

    </div>

    <!--底部标签-->
    <Tabbar ref="tabbar"/>
  </div>

</template>

<script>
  import Tabbar from "../../components/tabbar";

  export default {
    data() {
      return {
        showOrderBox: false,
        orderCount: 0,
        allMoney: 0,
        orderList: []
      };
    },
    components: {
      Tabbar
    },
    methods: {
      // 获取用户订单信息
      getOrderInfo() {
        this.$get("/order/history/list?activity=" + this.$route.query.activity).then(res => {
          console.log(res);
          if (res.data.code === 200) {
            this.showOrderBox = true;
            this.orderCount = res.data.data.count;
            this.allMoney = res.data.data.money;
            this.orderList = res.data.data.list;
          }
        });
      },

      initView() {
        this.$get("/init").then(res => {
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
      console.log('mounted', this.$refs.tabbar)
      this.$refs.tabbar.active(3);
      //
      this.initView();
      // 分享
      this.share(this.get2, this.wx);
    },
    beforeDestroy() {
      this.$refs.tabbar.unActive(3);

      console.log('beforeDestroy')
    }
  };
</script>

<style>

  .activity {
    margin: 10px;
    background: white;
    font-size: 16px;
    height: 40px;
    line-height: 40px;
    text-align: center;
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
    left: -10px;
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

  /*订单列表*/
  .order-list {
    margin: 10px;
    background: white;
    font-size: 16px;
    margin-bottom: 52px;
  }

  .order-list .order-empty {
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
  }

  .order-list .order-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #ccc;
  }

  /*./订单列表*/

</style>
