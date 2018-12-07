<template>
  <div class="tabbar">
    <ul>
      <li v-for="(tab, index) in tabs" :key="index" :class="{'active': tab.active}">
        <router-link :to="tab.path">
          <i class="iconfont" :class="tab.active ? tab.iconActive : tab.icon"></i>
          <span class="type">{{tab.name}}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  let vm;
  export default {
    data() {
      return {
        activeTabIndex: 0,
        tabs: [
          { name: '活动', icon: 'icon-house', iconActive: 'icon-house-fill', path: '/goods', active: false},
          { name: '活动规则', icon: 'icon-question-circle', iconActive: 'icon-question-circle-fill', path: '/rule', active: false},
          { name: '本期订单', icon: 'icon-bill', iconActive: 'icon-bill-fill', path: '/order', active: false},
          { name: '个人中心', icon: 'icon-person', iconActive: 'icon-person-fill', path: '/center', active: false}
        ]
      };
    },
    watch: {
      '$route.path': function (newVal, oldVal) {
        makeActive();
      }
    },
    created () {
      vm = this;
      makeActive();
    }
  };

  function makeActive () {
    vm.tabs.forEach((item, index) => {
      // vm.$set(item, 'active', vm.$route.path.search(item.path) === 0)
      item.active = vm.$route.path.search(item.path) === 0;
    })
  }
</script>

<style lang="scss">
  @import "../sass/variables";
  .tabbar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    max-width: 750px;
    margin: 0 auto;
    height: $tabbar-height;
    z-index: 101;
    box-shadow: 0 0 8px rgba(0,0,0,.1);
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
    height: $tabbar-height;
  }

  .tabbar li {
    &.active a{
      color: $theme-color;
    }
    a{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: $tabbar-height;
      text-align: center;
      color: #666;
      .iconfont{
        display: block;
        font-size: 20px;
      }
    }
  }

  /*.tabbar li .type {*/
    /*font-size: 14px;*/
  /*}*/

  /*.tabbar li {*/
    /*.iconfont {*/
      /*font-size: 20px;*/
      /*&.fill{*/
        /*display: none;*/
      /*}*/
    /*}*/
    /*&.router-link-exact-active .iconfont{*/
      /*display: none;*/
      /*&.fill{*/
        /*display: block;*/
      /*}*/
    /*}*/
  /*}*/


  .tab-active {
    color: #ec4e4f !important;
  }

</style>
