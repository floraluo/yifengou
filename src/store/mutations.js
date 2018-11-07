export default {
  // 添加购物车
  addCartCount(state,count) {
    state.cartCount = count;
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
