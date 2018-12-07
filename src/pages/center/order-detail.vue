<template>
  <div class="order">
    <base-loading :loading="loading"></base-loading>
    <div class="page-title">{{orderName || ' '}}</div>
    <div class="order-info">
      <div>
        <span class="num">{{orderCount || '--'}}</span>
        <span class="desc">预估有效订单（笔）</span>
      </div>
      <div>
        <span class="num">{{allMoney | formatMoney}}</span>
        <span class="desc">预估补贴返现（元）</span>
      </div>
    </div>
    <div class="order-tips">由于订单量大，同步订单数据会有延迟，请耐心等待，不要随意退款！</div>
    <div class="order-list">
      <div class="no-order" v-if="orderList.length === 0">暂无订单</div>
      <div class="order-item" v-for="(item,index) in orderList" :key="index" v-else>
        <div>{{item.orderNo}}</div>
        <div :class="{fail: item.color === 2, success: item.color === 1}">{{item.statusName}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  let vm
  export default {
    name: 'order-detail',
    data () {
      return {
        loading: true,
        orderName: null,
        orderCount: null,
        allMoney: null,
        orderList: []
      }
    },
    methods: {},
    created () {
      vm = this
    },
    activated() {
      this.$get("/order/history", this.$route.query).then(res => {
        let data = res.data;
        if (res.code === 200) {
          this.orderName = data.name;
          this.orderCount = String(data.count);
          this.allMoney = data.money;
          this.orderList = data.list;
          this.loading = false;
        }
      });
    }
  }
</script>

<style scoped lang='scss'>
  @import "../../sass/variables";
  .order {
    .page-title{
      display: flex;
      justify-content: center;
      align-items: center;
      padding-top: 15px;
      padding-bottom: 15px;
      font-size: 0.48rem;
      font-weight: bold;
      text-align: center;
      color: #333;
      &:before, &:after{
        content: '';
        width: 85px;
        height: 30px;
      }
      &:before{
        background: url('../../assets/image/order-left.png') left center no-repeat;
      }
      &:after{
        background: url('../../assets/image/order-right.png') right center no-repeat;
      }
    }
    .order-info{
      display: flex;
      border-radius: 10px;
      color: #fff;
      background-color: #fe401e;
      > div{
        padding-top: 0.53rem;
        padding-bottom: 0.53rem;
        flex: auto;
        font-size: 12px;
        text-align: center;
        .num{
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
          font-size: 0.64rem;
        }
        .desc{
          /*font-size: 12px;*/
        }
      }
    }
    .order-tips{
      padding-top: 1em;
      font-size: 12px;
      color: #999;
    }
    .order-list {
      margin-top: 15px;
      margin-left: -$gutter-margin;
      margin-right: -$gutter-margin;
      font-size: 16px;
      .no-order {
        width: 100%;
        height: 1.31rem;
        line-height: 1.31rem;
        text-align: center;
        font-size: 14px;
        color: #666;
        background-color: #f2f7fa;
      }
      .order-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: $gutter-margin;
        padding-right: $gutter-margin;
        height: 1.31rem;
        line-height: 1.31rem;
        color: #666;
        &:nth-child(odd){
          background-color: #f2f7fa;
        }
        .success{
          color: #21d06f;
        }
        .fail{
          color: #fe3e1f;
        }
      }
    }
  }
</style>
