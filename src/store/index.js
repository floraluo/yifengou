import Vuex from 'vuex'
import Vue from 'vue'
import mutations from './mutations'
Vue.use(Vuex)

let state = {
    cartCount:0,  // 购物车数量
    scrollTop:0,  // 首页的页面滚距离
    indexList:[], // 首页（商品）页的规则说明
    ruleList:[], // 规则页面的说明
    bindList:[], // 返现（绑定）页面规则
    bannerTopList:[], // bannerTopList列表,初始值为空数组
    invite: null, // 邀请码
    shareImg:''
}
export default new Vuex.Store({
    state,
    mutations
})