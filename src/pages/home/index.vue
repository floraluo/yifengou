<template>
  <div class="page">
    <keep-alive>
      <!--<router-view v-if="$route.meta.keepAlive"></router-view>-->
      <router-view></router-view>
    </keep-alive>

    <!--<router-view v-if="!$route.meta.keepAlive"></router-view>-->
    <tabbar></tabbar>
  </div>
</template>

<script>
  import Tabbar from "../../components/tabbar";
  let vm
  export default {
    name: 'index',
    components: { Tabbar },
    data () {
      return {}
    },
    methods:{
    },
    created () {
      vm = this
      this.$get('/home').then((res) => {
        let data = res.data;
        if (res.code === 200) {
          vm.$store.commit('setBannerList', data.bannerList)
          vm.$store.commit('setGroupList', data.goodsGroupList)
          vm.$store.commit('setCategory', data.goodsTypeList)
          vm.$store.commit('setGoodsList', data.goodsList)
        }
      });
    }
  }
</script>
<style lang="scss">
  .router-link-exact-active{
    color: #ec4e4f !important;
  }
</style>
<style scoped lang="scss">
  @import "../../sass/variables";
  .page{
    padding-left: $gutter-margin;
    padding-right: $gutter-margin;
    padding-bottom: $tabbar-height;
    min-height: calc(100vh - #{$tabbar-height});
  }
</style>
