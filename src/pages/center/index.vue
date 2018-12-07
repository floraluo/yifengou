<template>
  <div class="center">
    <base-loading :loading="loading"></base-loading>
    <base-refresh :on-refresh="doRefresh">
      <div class="row row-personal-info">
        <div class="info-body">
          <div class="info-top-box">
            <div class="img-box">
              <img :src="userInfo.headUrl" alt="">
            </div>
            <div class="right">
              <span class="name">{{userInfo.nickname || '--'}}</span>
              <hr>
              <div class="flex-box">
                <div class="code">邀请码：<span>{{userInfo.invite || '--'}}</span></div>
                <div><router-link :to="`/center/withdraw?balanceMoney=${userInfo.balanceMoney}&alipayAccount=${userInfo.zfbAccount}`" class="btn btn-default btn-round">提现</router-link></div>
              </div>
            </div>
          </div>
          <ul class="info-bottom-box">
            <li>
              <small class="desc">可提现金额 (元)</small>
              <span class="num">{{userInfo.balanceMoney | formatMoney}}</span>
            </li>
            <li>
              <small class="desc">待结算金额 (元)</small>
              <span class="num">{{userInfo.balanceWaitMoney | formatMoney}}</span>
            </li>
            <li>
              <small class="desc">提现中 (元)</small>
              <span class="num">{{userInfo.withdrawingMoney | formatMoney}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="row row-share">
        <img src="../../assets/image/share-bg.jpg" alt="">
        <router-link to="/center/share" class="btn btn-outline-default">去邀请</router-link>
      </div>
      <div class="row row-alipay">
        <div class="left">
          <!--<i class="iconfont icon-zhifubao"></i>-->
          <span>支付宝账号</span>
        </div>
        <div class="right">
          <router-link :to="`/center/bindalipay?name=${userInfo.zfbUsername}&account=${userInfo.zfbAccount}`">
            <span v-if="userInfo.zfbAccount">{{userInfo.zfbAccount}}</span>
            <span v-else>立即绑定</span>
          </router-link>
          <i class="iconfont icon-arrow-right"></i>
        </div>
      </div>
      <router-link tag="div" :to="`/center/withdraw-record`" class="row row-alipay">
        <div class="left">
          <!--<i class="iconfont icon-zhifubao"></i>-->
          <span>提现记录</span>
        </div>
        <div class="right">
          <i class="iconfont icon-arrow-right"></i>
        </div>
      </router-link>
      <div class="row row-order" v-if="userInfo.orderHistory.length > 0">
        <div class="title">往期订单</div>
        <ul class="list">
          <li v-for="(item, index) in userInfo.orderHistory" :key="index" @click="gotoOrderDetail(item)">
            <a href="javascript:;">
              <span class="name">{{item.name}}</span>
              <i class="iconfont icon-arrow-right"></i>
            </a>
          </li>
        </ul>
      </div>
    </base-refresh>
  </div>
</template>

<script>
  let vm
  export default {
    name: 'index',
    data () {
      return {
        loading: true,
        userInfo: {
          nickname: null,
          invite: null,
          headUrl: null,
          phone: null,
          zfbUsername: null,
          zfbAccount: null,
          balanceMoney: null, // 可提现金额
          balanceWaitMoney: null, // 结算金额
          withdrawingMoney: null, // 提现中
          orderHistory: []
        }
      }
    },
    methods: {
      doRefresh(done) {
        getUserInfo.call(this,done); //doRefresh
      },
      gotoOrderDetail(item) {
        this.$router.push({
          path: '/center/order-detail',
          query: {
            id: item.id
          }
        })
      }
    },
    created () {
      vm = this;
    },
    activated () {
      getUserInfo();
    }
  }
  function getUserInfo (callback) {
    // vm.loading = true;
    vm.$get("/person/center").then(res => {
      if (res.code === 200) {
        // vm.userInfo = res.data;
        Object.assign(vm.userInfo, res.data);
        vm.loading = false;
      }
      // 下拉刷新组件中，刷新成功需要callback
      if (callback) callback();
    });
  }
</script>

<style scoped lang='scss'>
  @import "../../sass/variables";
  .center{
    position: relative;
    margin-left: -$gutter-margin;
    margin-right: -$gutter-margin;
    padding-left: $gutter-margin;
    padding-right: $gutter-margin;
    overflow: hidden;
    &:before{
      content: '';
      position: absolute;
      width: 0;
      height: 0;
      top: 0;
      left: -$gutter-margin;
      border-top: 3.17rem solid $theme-color;
      border-right: 13.33rem solid transparent;
    }
  }
  .row-personal-info{
    position: relative;
    padding: 0.29rem $gutter-margin 0;
    overflow: hidden;

    .info-body{
      position: relative;
      border-radius: 10px;
      padding-top: 0.67rem;
      box-shadow: 0 0 10px 2px rgba(0,0,0,.05);
      background-color: #fff;
      .info-top-box{
        padding-left: 0.40rem;
        padding-right: 0.40rem;
        display: flex;
        .img-box{
          width: 1.89rem;
          height: 1.89rem;
          border-radius: 50%;
          overflow: hidden;
          background-color: #333;
          img{
            max-width: 100%;
          }
        }
        .right{
          flex: 1;
          padding-left: 0.53rem;
          .name{
            font-size: 0.43rem;
            color: #355862;
          }
          hr{
            margin-top: 10px;
            margin-bottom: 10px;
            border: 0;
            border-top: 2px solid #f2f3f5;
          }
          .flex-box{
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .code{
            font-size: 0.37rem;
            color: #666;
            > span{
              color: $theme-color;
            }
          }
        }
      }
      .info-bottom-box{
        display: flex;
        justify-content: center;
        margin: 0;
        padding: 10px 0;
        list-style: none;
        text-align: center;
        li{
          flex: 1;
          font-size: 12px;
          line-height: 2;
          span{
            display: block;
          }
          .desc{
            color: #999;
          }
          .num{
            color: #ff3423;
          }
        }
      }
    }
  }
  .row-share{
    height: 2.40rem;
    position: relative;
    .btn{
      position: absolute;
      left: $gutter-margin;
      bottom: 10px;
    }
    img{
      max-width: 100%;
    }
  }
  .row-alipay{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: $gutter-margin;
    padding-right: $gutter-margin;
    height: 1.31rem;
    background-color: #fff;
    .left{
      display: flex;
      align-items: center;
      .icon-zhifubao{
        font-size: 0.61rem;
        color: #398df8;
      }
      span{
        padding-left: 10px;
        font-size: 0.40rem;
        color: #191818;
      }
    }
    .right{
      display: flex;
      align-items: center;
      .iconfont{
        margin-left: 2px;
        line-height: 1;
        color: #666;
      }
      a{
        font-size: 0.32rem;
        color: $theme-color;
      }
    }
  }
  .row-order{
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
      li a{
        display: flex;
        justify-content: space-between;
        padding-top: 10px;
        padding-bottom: 10px;
        border-bottom: 1px solid #f1f1f1;
        font-size: 14px;
        color: #666;
      }
    }
  }
</style>
