<template>
  <div class="withdraw-record">
    <base-loading :loading="loading"></base-loading>
    <base-refresh :on-refresh="doRefresh">
      <div class="banner">
        <div>
          <strong>￥{{balance | formatMoney}}</strong>
          <span>── 累计提现 ──</span>
        </div>
        <div>
          <strong>￥{{withdraw | formatMoney}}</strong>
          <span>── 可提现 ──</span>
        </div>
      </div>
      <div class="row row-record">
      <div class="title">提现记录</div>
      <ul class="list" v-if="record.length > 0">
        <li v-for="(item, index) in record" :key="index">
          <div class="left">
            <div class="desc"><span>{{item.statusName}}</span> <small>{{item.failed}}</small></div>
            <span class="time">{{item.updatime | formatTime('YYYY-MM-DD HH:mm:ss')}}</span>
          </div>
          <div class="right" :class="{success: item.status === 2, failed: item.status === 3}">￥{{item.money | formatMoney}}</div>
        </li>
      </ul>
      <div class="no-data" v-else>暂无提现记录</div>
    </div>
    </base-refresh>
  </div>
</template>

<script>
  let vm
  export default {
    name: 'withdraw-record',
    data () {
      return {
        loading: true,
        balance: null, // 可提现余额
        withdraw: null, // 已提现
        record: []
      }
    },
    methods: {
      doRefresh(done) {
        getRecord.call(this,done); //doRefresh
      }
    },
    created () {
      vm = this
    },
    activated () {
      getRecord.call(this); //activated
    }
  }
  function getRecord (callback) {
    this.loading = true;
    this.$get('/withdraw/record')
      .then((res) => {
        let data = res.data;
        if (res.code === 200) {
          this.loading = false;
          this.balance = data.balance;
          this.withdraw = data.withdraw;
          this.record = res.data.list || [];
          this.record = this.record.map(item => {
            let name = '';
            switch (+item.status){
              case 1: name = '申请中'; break;
              case 2: name = '成功'; break;
              case 3: name = '失败'; break;
              default: name = '--'
            }
            return Object.assign(item, {
              statusName: name
            })
          });
        }
        // 下拉刷新组件中，刷新成功需要callback
        if (callback) callback();
      });
  }
</script>

<style scoped lang='scss'>
  @import "../../sass/variables";
  .withdraw-record {
    &:before{
      content: '';
      position: absolute;
      left: -25%;
      top: -100px;
      width: 150%;
      height: 200px;
      border-radius: 50%;
      background-color: $theme-color;
    }
    .banner{
      padding-top: 20px;
      padding-bottom: 25px;
      position: relative;
      margin-top: $gutter-margin;
      margin-bottom: $gutter-margin;
      display: flex;
      justify-content: center;
      border-radius: 10px;
      box-shadow: 0 0 5px rgba(169, 169, 169, 0.35);
      background-color: #fff;
      > div{
        padding-top: 10px;
        padding-bottom: 10px;
        flex: 1;
        text-align: center;
        + div{
          border-left: 1px solid #ccc;
        }
        strong{
          display: block;
          padding-bottom: 10px;
          font-size: 0.53rem;
          color: $theme-color;
        }
        span{
          font-size: 0.32rem;
          color: #999;
        }
      }
    }
  }
  .row-record{
    padding-left: $gutter-margin;
    padding-right: $gutter-margin;
    background-color: #fff;
    .title{
      display: flex;
      align-items: center;
      padding-top: 0.27rem;
      padding-bottom: 0.27rem;
      font-size: 14px;
      color: #181818;
      &:before{
        content: '';
        display: inline-block;
        margin-right: 8px;
        width: 3px;
        height: 14px;
        border-radius: 3px;
        background-color: $theme-color;
      }
    }
    ul{
      li{
        display: flex;
        justify-content: space-between;
        padding-top: 10px;
        padding-bottom: 10px;
        border-bottom: 1px solid #f1f1f1;
        font-size: 14px;
        color: #666;
        .desc{
          margin-bottom: 5px;
          >span{
            color: #333;
          }
          >small{
            font-size: 10px;
            color: #999;
          }
        }
        .time{
          font-size: 12px;
          color: #999;
        }
        .right{
          display: flex;
          align-items: center;
          font-size: 16px;
          font-weight: bold;
          color: #333;
          &.success{
            color: #2baf00;
          }
          &.failed{
            color: #ef2a00;
          }
        }
      }
    }
    .no-data{
      padding-top: 15px;
      padding-bottom: 30px;
      text-align: center;
      font-size: 12px;
      color: #999;
    }
  }
</style>
