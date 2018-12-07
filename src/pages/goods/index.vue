<template>
  <div class="home">
    <base-refresh :on-refresh="doRefresh">
      <!-- 轮播 -->
      <div v-if="bannerTopList.length>1"  class="home-swiper">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item,index) in bannerTopList" :key="index">
            <img :src="item">
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
      <div v-if="bannerTopList.length===1" class="row bannerTop">
        <img :src="bannerTopList[0]">
      </div>

      <goods-category></goods-category>
      <div class="row row-goods-group">
        <div class="img-box" v-for="(item, index) in groups" :key="index" @click="gotoSearch(item)">
          <img :src="item.image" alt="">
        </div>
      </div>
      <!-- 商品部分 -->
      <div class="row row-goods-title">
        推荐商品
      </div>
      <goods-list></goods-list>
      <!-- 悬浮购物车icon -->
      <cart-icon :cartCount="$store.state.cartCount"></cart-icon>
    </base-refresh>
  </div>
</template>

<script>
  import GoodsCategory from "@/components/GoodsCategory";
  import GoodsList from "@/components/GoodsList";
  import CartIcon from "@/components/CartIcon";
  import local from "@/config/storage";
  import BaseRefresh from '../../components/BaseRefresh'

  let vm;
  export default {
    name: 'index',
    computed: {
      bannerTopList() {
        return this.$store.state.bannerList
      },
      groups() {
        return this.$store.state.groupList
      }
    },
    data() {
      return {
        // bannerTopList: [],
        // groups: [],
        fixedFilterBar: false,
        swiperOption: {
          // 轮播图控制项（参考swiper4）
          autoplay: false,
          loop: true,
          pagination: {
            el: ".swiper-pagination"
          }
        },
        scrollTop: 0
      };
    },
    beforeRouteLeave(to, from, next) {
      this.saveScrollTop();
      next();
    },
    components: {BaseRefresh, GoodsCategory, GoodsList, CartIcon },
    methods: {
      doRefresh (done) {
        this.$get('/home').then((res) => {
          let data = res.data;
          if (res.code === 200) {
            vm.$store.commit('setBannerList', data.bannerList)
            vm.$store.commit('setGroupList', data.goodsGroupList)
            vm.$store.commit('setCategory', data.goodsTypeList)
            vm.$store.commit('setGoodsList', data.goodsList)
          }
          done();
        });
      },
      // 保存scrollTop到本地
      saveScrollTop() {
        // 离开路由之前保存滚动距离，因页面缓存，在下次进入时，this.scrollTop值可以在activated周期函数里访问到
        this.scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop;

        // 将滚动距离也保存一份到本地，用于京东跳回使用
        local.localScroll.set(this.scrollTop);
      },
      gotoSearch(item) {
        this.$router.push({
          path:'/goods/search',
          query: {
            id: 0,
            goodsGroup: item.id
          }
        })
      }
    },
    created() {
      vm = this;
      window.scrollTo(0, 0);
    },
    activated() {
      // 购物车数量
      getCartNum();
      //购物车列表
      getCartList.call(this);
      this.share(this.get2, this.wx);
      // 页面恢复离开之前的位置
      window.scrollTo(0, local.localScroll.get());

      // this.leavePage()
    }
  }

  function getGoodsList () {
    let id = 0;
    if (vm.$store.state.goodsList.length > 0) {
      id = vm.$store.state.goodsList.slice(-1)[0].id;
    }
    vm.$get('/home/goods/', { id })
      .then((res) => {
        if (res.code === 200) {
          vm.$store.commit('setGoodsList', data.goodsList)
        }
      })
  }

  function getCartNum () {
    vm.$get('/cart/num').then((res) => {
      if (res.code === 200) {
        vm.$store.commit('setCartCount',res.data)
      }
    })
  }

  function getCartList () {
    this.$get("/cart/list").then(res => {
      if (res.code === 200) {
        this.$store.commit('setCartList',res.data || [])
      }
    })
  }
</script>

<style scoped lang="scss">
  @import "../../sass/variables";
  .home {
    .tip_text {
      width: 100%;
      padding: 5px 0;
      text-align: center;
      color: white;
    }

    .home-swiper {
      width: 100%;
      height: 180px;
      .swiper-container {
        margin: 0;
        height: 100%;
      }

      .swiper-slide img {
        width: 100%;
        height: 100%;
      }
    }

    .bannerTop {
      /*width: 100%;*/
      /*height: 180px;*/
      margin-bottom: 0;
      img {
        width: 100%;
        /*height: 100%;*/
      }
    }

    .row-goods-group{
      display: flex;
      padding: 8px $gutter-margin;
      justify-content: space-between;
      background-color: #fff;
      > .img-box{
        width: 32%;
        cursor: pointer;
        img{
          max-width: 100%;
        }
      }
    }

    .row-goods-title{
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 0.40rem;
      color: #333;
      &:before, &:after{
        content: '';
        display: inline-block;
        width: 43px;
        height: 10px;
      }
      &:before{
        margin-right: 10px;
        background-image: url('../../assets/image/goods-list-left.png');
      }
      &:after{
        margin-left: 10px;
        background-image: url('../../assets/image/goods-list-right.png');
      }
    }

    .row-goods-list{
      background-color: #fff;
    }

  }
</style>
