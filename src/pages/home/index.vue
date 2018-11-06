<template>
  <div class="home">
    <!-- 下拉刷新 -->
    <div class="tip_text" v-if="showTip">{{tipText}}</div>
    <!-- 轮播 -->
    <div class="home_swiper">
      <swiper :options="swiperOption">
        <swiper-slide>
          <img src="@/assets/image/banner.png">
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <!-- 三个步骤导航菜单 -->
    <div class="home_nav">
      <div @click="clickStep1">
        <router-link tag="span" to="/home/goods">
          <img v-show="idx===0" src="../../assets/image/1.1.png" />
          <img v-show="idx!=0" src="../../assets/image/1.2.png" />
        </router-link>
      </div>
      <div @click="clickStep2">
        <router-link tag="span" to="/home/order">
          <img v-show="idx===1" src="../../assets/image/2.1.png" />
          <img v-show="idx!=1" src="../../assets/image/2.2.png" />
        </router-link>
      </div>
      <div @click="clickStep3">
        <router-link tag="span" to="/home/bind">
          <img v-show="idx===2" src="../../assets/image/3.1.png" />
          <img v-show="idx!=2" src="../../assets/image/3.2.png" />
        </router-link>
      </div>
    </div>
    <!-- 一分购规则页面入口 -->
    <div class="home_rule" @click="gotoRule(idx)">详见一分购规则>></div>
    <!-- 悬浮购物车icon -->
    <div class="cart" @click="gotoCart">
      <i class='iconfont icon-cart'></i>
      <span class='count'>10</span>
    </div>
    <!-- 子路由（三个步骤） -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      idx: 0, // 根据下标控制菜单项显示,
      el: null, // 下拉元素（mounted中初始）
      startX: 0, // 开始下拉的位置x
      startY: 0, // 开始下拉的位置y
      tipText: "下拉刷新", // 下拉刷新提示文字
      showTip: false, // 是否显示下拉刷新提示文字
      moveDistance: 0, // 下拉的距离
      swiperOption: {
        // 轮播图控制项（参考swiper4）
        autoplay: false,
        loop: true,
        pagination: {
          el: ".swiper-pagination"
        }
      }
    };
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

    // 添加touch事件
    bindTouchEvent() {
      this.el.addEventListener("touchstart", this.touchStart);
      this.el.addEventListener("touchmove", this.touchMove);
      this.el.addEventListener("touchend", this.touchEnd);
    },

    //开始下拉监听
    touchStart(e) {
      let touch = e.changedTouches[0];
      this.tipText = "下拉刷新";
      this.startX = touch.clientX;
      this.startY = touch.clientY;
    },
    // 开始监听移动
    touchMove(e) {
      let touch = e.changedTouches[0];
      // 获取下拉举例
      let move = touch.clientY - this.startY;
      // 当 0<move<100 时，显示下拉区内容
      if (move > 0 && move < 80) {
        this.showTip = true;
        this.el.style.marginTop = move + "px";
        //记录下拉的距离
        this.moveDistance = touch.clientY - this.startY;
        if (move > 40) {
          this.tipText = "松开刷新";
        }
      }
    },

    // 监听移动结束（手指松开）
    touchEnd(e) {
      let touch = e.changedTouches[0];
      if (this.moveDistance > 50) {
        this.tipText = "刷新中...";
        setTimeout(()=>{
          this.resetBox()
        },2000)
      }
    },

    // 重置界面（下拉刷新恢复）
    resetBox() {
      this.showTip = false
      if (this.moveDistance > 0) {
        let timer = setInterval(()=> {
          this.el.style.marginTop = --this.moveDistance + "px";
          if (Number(this.el.style.marginTop.split("px")[0]) <= 0)
            clearInterval(timer);
        }, 1);
      }
    },

    // 去活动规则页面，带入当前高亮菜单的下标
    gotoRule() {
      this.$router.push({ path: "/rule", query: { idx: this.idx } });
    },
    // 去购物车列表页，带入当前高亮菜单的下标
    gotoCart() {
      this.$router.push({ path: "/cart", query: { idx: this.idx } });
    }
  },
  mounted() {
    // 判断页面进入时是否带有idx参数，用于控制菜单显示
    let idx = this.$route.query.idx;
    if (idx === 0 || idx === 1 || idx === 2) {
      this.idx = idx;
    }

    // 获取home元素，添加touch事件，做下拉刷新
    this.el = document.querySelector(".home");
    this.bindTouchEvent();
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
  bottom: 45px;
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