export default {
  setInitData(state, data) {
    state.initData = Object.assign(data, {
      rule: JSON.parse(data.rule)
    });
  },

  setBannerList(state, data) {
    state.bannerList = data;
  },
  setGroupList(state, data) {
    state.groupList = data;
  },
  setCategory(state, data) {
    state.categories = data;
  },
  // setGoodsGroup(state, data) {
  //   state.goodsGroup = data;
  // },
  setGoodsList(state, data) {
    state.goodsList = data.list;
    state.hasMore = data.hasMore;
  },
  updateGoodsList(state, data) {
    [].push.apply(state.goodsList, data.list)
    state.hasMore = data.hasMore;
  },

  // 设置购物车数量
  setCartCount(state,count) {
    state.cartCount = count;
  },
  //设置购物车列表
  setCartList(state, list) {
    state.cartList = list;
  },
  //向购物车添加商品
  pushGoodsToCart(state, goods) {
    state.cartList.push(goods);
  },
  deleteGoodsInCart (state, index) {
    state.cartList.splice(index, 1);
  },

  // saveScrollTop(state,scroll) {
  //     state.scrollTop = scroll;
  // }

  // 添加规则
  addTextList(state,list){
    state.indexList = list.index_list
    state.ruleList = list.rule_list
    state.bindList = list.bind_list
  },

  // 添加顶部banner
  addBanner(state,bannerList){
    state.bannerTopList = bannerList
  },

  // 添加邀请码
  addInvite(state,invite){
      state.invite = invite
  },

  // 添加分享图片
  addShareImg(state,img){
    state.shareImg = img
  }
};
