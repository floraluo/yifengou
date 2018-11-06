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
    mounted() {
      login.init();
    }
  }
</script>

<style>
  body {
    margin: 0;
    background: #ec4e4f;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
