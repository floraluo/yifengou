<template>
  <div class="home">
    <!-- 下拉刷新 -->
    <!-- <div class="tip_text" v-if="showTip">{{tipText}}</div> -->
    <!-- 轮播 -->
    <div v-if="bannerTopList.length>1" class="home_swiper">
      <swiper :options="swiperOption">
        <swiper-slide v-for="(item,index) in bannerTopList" :key="index">
          <img :src="item">
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <div v-if="bannerTopList.length===1" class="bannerTop">
      <img :src="bannerTopList[0]">
    </div>
    <!-- 商品部分 -->
    <goods :indexList="indexList" />
    <tabbar />
    <!-- 悬浮购物车icon -->
    <div class="cart" @click="gotoCart">
      <i class='iconfont icon-cart'></i>
      <span class='count'>{{cartCount}}</span>
    </div>
  </div>
</template>

<script>
import goods from "./goods";
import tabbar from "../../components/tabbar";
import local from "@/config/storage";
import login from "../../module/login";
export default {
  data() {
    return {
      idx: 0, // 根据下标控制菜单项显示,
      swiperOption: {
        // 轮播图控制项（参考swiper4）
        autoplay: false,
        loop: true,
        pagination: {
          el: ".swiper-pagination"
        }
      },
      scrollTop: 0,
      bannerTopList:[],
      indexList:[]
    };
  },
  beforeRouteLeave(to, from, next) {
    // 离开路由之前保存滚动距离，因页面缓存，在下次进入时，this.scrollTop值可以在activated周期函数里访问到
     this.scrollTop =
       document.documentElement.scrollTop || document.body.scrollTop;
    
    // 将滚动距离也保存一份到本地，用于京东跳回使用
     local.localScroll.set(this.scrollTop)
    next();
  },
  components: {
    goods,
    tabbar
  },
  computed: {
    // vuex状态里拿到购物车数量(此值在商品组件里改变，即listItem组件中，通过vuex通信简化操作)
    cartCount: {
      get() {
        // 从vuex返回购物车数量
        return this.$store.state.cartCount;
      },
      set(val) {
        // 页面初始化时，将返回的购物车数量保存到vuex状态里
        this.$store.commit("addCartCount", val);
      }
    },

    // 从vuex中拿bannerTopList列表
    // bannerTopList() {
    //   return this.$store.state.bannerTopList;
    // }
  },
  methods: {
    // 菜单项的点击（通过下标控制显示）
    clickStep1() {
      this.idx = 0;
    },
    clickStep2() {
      this.idx = 1;
    },
    clickStep3() {
      this.idx = 2;
    },

    // 获取购物车数量
    getCartCount() {
      this.$get("/cart/num").then(res => {
        console.log("购物车数量", res);
        if (res.data.code === 200) {
          this.cartCount = res.data.data;
        }
      });
    },

    // 去活动规则页面
    gotoRule() {
      this.$router.push("/rule");
    },
    // 去购物车列表页
    gotoCart() {
      this.$router.push("/cart");
    },

     initView(){
      this.$get('/init').then(res=>{
        console.log('home-init',res)
        if (res.data.code === 200) {
          if (!res.data.data.invite){
            this.$router.push("/invite");
          } else {
            this.getCartCount();
            this.share(this.get2, this.wx, res.data.data.shareImage);
            let list = JSON.parse(res.data.data.text)
            this.indexList = list.index_list
            this.bannerTopList = res.data.data.bannerTopList
          }
        }
      })
    }
  },
  activated() {
      this.initView()

      // 购物车数量
      //this.getCartCount();

      // 分享
      //this.share(this.get2, this.wx, this.$store.state.shareImg);

      // 页面恢复离开之前的位置
      window.scrollTo(0, local.localScroll.get());
    
     // 结果为true时再初始页面
    //login.checkInitData().then(func)
  },

  mounted(){
    this.initView()
  }
};
</script>

<style>
.home .tip_text {
  width: 100%;
  padding: 5px 0;
  text-align: center;
  color: white;
}
.home_swiper {
  width: 100%;
  height: 180px;
}
.home .bannerTop {
  width: 100%;
  height: 180px;
}
.home .bannerTop img {
  width: 100%;
  height: 100%;
}
.home_swiper .swiper-container {
  margin: 0;
  height: 100%;
}
.home_swiper .swiper-slide img {
  width: 100%;
  height: 100%;
}
.home_nav {
  display: flex;
  margin-top: 10px;
  padding: 0 15px;
  justify-content: space-between;
}
.home_nav > div {
  width: 33%;
  height: 36px;
}
@media only screen and (max-width: 320px) {
  .home_nav {
    padding: 0 10px;
  }
  .home_nav > div {
    height: 32px;
  }
}
.home_nav > div span {
  display: block;
  width: 100%;
  height: 100%;
}
.home_nav > div span img {
  width: 100%;
  height: 100%;
}
.home_rule {
  width: 100%;
  padding: 10px 0;
  text-align: center;
  color: #ffde37;
  font-size: 12px;
}
.home .cart {
  z-index: 100;
  position: fixed;
  bottom: 60px;
  right: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.8);
}
.home .cart .iconfont {
  color: white;
  font-size: 20px;
}
.home .cart .count {
  position: absolute;
  top: -5px;
  right: -5px;
  display: block;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  line-height: 25px;
  font-size: 14px;
  background: #ffde37;
  text-align: center;
}
</style>