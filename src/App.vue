<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>

    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>

  import login from './module/login'

  export default {
    name: 'App',
    methods:{ 
      // 页面初始化
    initView(){ 
      console.log('-------111')
      this.$get('/init').then(res=>{
        console.log('init',res)
        if (res.data.code === 200) {
          // 序列化规则列表
          let list = JSON.parse(res.data.data.text)
          // 提交规则列表到vuex
          this.$store.commit('addTextList',list)

          // 提交bannerTopList到vuex
          this.$store.commit('addBanner',res.data.data.bannerTopList)

          // 提交邀请码到vuex
          let invite = res.data.data.invite
          this.$store.commit('addInvite',invite)

          // 提交分享图片到vuex
          this.$store.commit('addShareImg',res.data.data.shareImage)

          
          login.setInitData(1);
        }else{
          login.setInitData(0);
        }
      }).catch(()=>{
        login.setInitData(0);
      })
    },
    },
    mounted() {
      login.init();
      this.initView()
    }
  }
</script>

<style>
  body {
    margin: 0;
    background: #ec4e4f;
  }
  .router-link-exact-active{
    color: #ec4e4f !important;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
