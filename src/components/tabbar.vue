<template>
  <div class="tabbar">
    <ul>
      <router-link tag="li" to="/">
        <i class="iconfont icon-gouwu"></i><span class="type">商品</span>
      </router-link>
      <router-link tag="li" to="/rule">
        <i class="iconfont icon-rule"></i><span class="type">规则</span>
      </router-link>
      <router-link tag="li" to="/order">
        <i class="iconfont icon-order"></i><span class="type">本期订单</span>
      </router-link>
      <router-link tag="li" to="/order/history" :class="{'tab-active':class3}">
        <i class="iconfont icon-order"></i><span class="type">往期订单</span>
      </router-link>
      <router-link tag="li" to="/refund">
        <i class="iconfont icon-refund"></i><span class="type">返现</span>
      </router-link>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        class3:false // 临时解决一下
      };
    },
    methods: {
      // 临时解决一下
      active(index) {
        this.class3 = true;
      },
      unActive(index) {
        this.class3 = false;
      }
    }
  };
</script>

<style>
  .tabbar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 50px;
    z-index: 101;
    background: white;
  }

  .tabbar ul,
  .tabbar li {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .tabbar ul {
    display: flex;
    justify-content: space-around;
    width: 100%;
    height: 50px;
  }

  .tabbar li {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    height: 50px;
    color: #666;
    cursor: pointer;
  }

  .tabbar li .type {
    font-size: 14px;
  }

  .tabbar li .iconfont {
    font-size: 20px;
  }

  .tab-active {
    color: #ec4e4f !important;
  }

</style>
