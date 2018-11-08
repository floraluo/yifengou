// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store/index'
import wx from "weixin-js-sdk";
import share from './share'
import infiniteScroll from 'vue-infinite-scroll'
import {get, get2, post} from './config/request'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import '@/assets/iconfont/iconfont.css'
import 'vue2-toast/lib/toast.css';
import Toast from 'vue2-toast';
Vue.use(VueAwesomeSwiper)
Vue.use(infiniteScroll)
Vue.use(Toast);

Vue.prototype.$get = get
Vue.prototype.$post = post

// 下面三个为分享所用
Vue.prototype.get2 = get2
Vue.prototype.wx = wx
Vue.prototype.share = share

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
