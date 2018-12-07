// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store/index'
//表单验证
import VeeValidate from 'vee-validate'
import veezhCN from 'vee-validate/dist/locale/zh_CN'

import FiltersPlugin from './module/filters'

import wx from "weixin-js-sdk";
import share from './share'
import infiniteScroll from 'vue-infinite-scroll'
import {get, get2, post} from './config/request'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import '@/assets/iconfont/iconfont.css'
import 'vue2-toast/lib/toast.css';
import Toast from 'vue2-toast';
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const requireComponent = require.context(
  // 其组件目录的相对路径
  './components/',
  // 是否查询其子目录
  false,
  // 匹配基础组件文件名的正则表达式
  /Base[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName)

  // 获取组件的 PascalCase 命名
  const componentName = upperFirst(
    camelCase(
      // 剥去文件名开头的 `./` 和结尾的扩展名
      fileName.replace(/^\.\/(.*)\.\w+$/, '$1')
    )
  )

  // 全局注册组件
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  )
})

Vue.use(FiltersPlugin)
Vue.use(VueAwesomeSwiper)
Vue.use(infiniteScroll)
Vue.use(Toast);

//vee-validate表单验证插件配置
Vue.use(VeeValidate, {
  locale: 'zh_CN',
  dictionary: {
    zh_CN: {
      messages: veezhCN.messages
    }
  }
})

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
