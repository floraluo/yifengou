<template>
  <div id="app">
    <router-view></router-view>
    <!--<div class="page">-->
      <!--<keep-alive>-->
        <!--<router-view v-if="$route.meta.keepAlive"></router-view>-->
      <!--</keep-alive>-->

      <!--<router-view v-if="!$route.meta.keepAlive"></router-view>-->
    <!--</div>-->
    <!--<tabbar></tabbar>-->
  </div>
</template>

<script>
  import login from './module/login'
  import {localDictionary, extendFields} from '@/module/custom.valid'
  let vm;
  export default {
    name: 'App',
    components: { localDictionary, extendFields },
    created() {
      vm = this;
      // 初始化表单验证插件自定义配置
      initVeeValidate(localDictionary, extendFields);

      login.init().then(() => {
        this.$get("/h5/v2/init").then(res => {
          if (res.code === 200) {
            this.$store.commit("setInitData", res.data);
          }
        });
      });
    }
  }
  function initVeeValidate(dictionary, fields) {
    const keys = Object.keys(fields);
    vm.$validator.localize('zh_CN', dictionary);
    keys.forEach(key => {
      vm.$validator.extend(key, fields[key]);
    })
  }
</script>

<style lang="scss">
  @import "./sass/global";
</style>

