import Vuex from 'vuex'
import Vue from 'vue'
import mutations from './mutations'
Vue.use(Vuex)

let state = {
  scrollTop:0,  // 首页的页面滚距离
  indexList:[], // 首页（商品）页的规则说明
  ruleList:[], // 规则页面的说明
  bindList:[], // 返现（绑定）页面规则
  bannerTopList:[], // bannerTopList列表,初始值为空数组
  invite: null, // 邀请码
  shareImg:'',

  initData: {}, //即：/v2/init接口返回数据 => boolean register(false时，部分界面需跳转到注册页) || String invite || String phone || String rule
  cartCount:0,  // 购物车数量
  cartList: [], //购物车列表
  categories: [], //商品分类
  // goodsGroup: [], //商品分组
  groupList: [],
  bannerList: [],
  goodsList: [], //商品列表
  hasMore: false //是否还有下一页商品
}
export default new Vuex.Store({
  state,
  mutations
})
