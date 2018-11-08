<template>
  <div class="goods">
    <div class="rule_box">
      <div v-for="(itemList,index) in indexList" :key="index">
        <span v-for="(item,idx) in itemList" :key="idx" :style="{color:item.color}">{{item.text}}</span>
      </div>
    </div>
    <div class="verify" @click="gotoOrder">
      <div>下单后验证订单>></div>
      <div class="tip">(验证完订单并绑定提现账号后才可获得补贴)</div>
    </div>
    <div class="type_nav" ref="wrapper">
      <ul class="nav_list" ref="navlist">
        <li v-for="(item,index) in navList" :key="index" ref="navitem" :class="{active:idx===index}" @click="switchGoodsType(index)">
          {{item.value}}
        </li>
      </ul>
    </div>
    <div class="goods_list">
      <list-item v-for="(item,index) in goodsList" @click.native="goBuy(item.id)" :key="index" :id="item.id" :pic="item.goodsImg" :name="item.goodsContent" :couponPrice="item.couponPrice" :discountPrice="item.discountPrice" :goodsPrice="item.goodsPrice" />
      <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20">
        <div class="bottom_tip" @click="updateGoods">{{bootomText}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
//import local from "@/config/storage";
import listItem from "@/components/listItem";
export default {
  data() {
    return {
      idx: 0, // 控制商品类型菜单的显示
      navList: [],
      scroll: null, // scroll实例（参考better-scroll）
      lastId: 0, // 请求参数，最后一个商品的id，初始为0
      goodsType: 0, // 请求商品类型，页面初始为0，即全部商品,
      goodsListHasMore: false, // 商品是否还有下一页
      goodsList: null, // 商品列表
      busy: false // 如果该属性的值为true，则会禁用无限滚动
    };
  },
  components: {
    listItem
  },
  // beforeRouteLeave(to, from, next){
  //   console.log('离开goods')
  //   local.localType.set(goodsType)
  //   next()
  // },
  computed: {
    // 上拉加载底部提示文字
    bootomText() {
      return this.goodsListHasMore ? "加载数据中..." : "换一批";
    },
    // 规则说明
    indexList() {
      return this.$store.state.indexList;
    }
  },
  methods: {
    // 点击切换商品类型
    switchGoodsType(index) {
      // 点击项高亮
      this.idx = index;
      this.lastId = 0;
      // 点击此项菜单时，移动到可视区
      this.scroll.scrollToElement(this.$refs.navitem[index], 200, true, true);
      this.goodsType = this.navList[index].key;
      this.getGoodsData();
    },
    // 点击购买商品
    goBuy(id) {
      this.$get("/goods/link", { id }).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          if (res.data.data.limit && res.data.data.link) {
            this.$toast.center(res.data.data.limitMsg);
          } else {
            if (res.data.data.link) {
              console.log(res.data.data.link);
              window.location.href = res.data.data.link;
            }
          }
        } else if (res.data.code === 1001) {
          this.$toast.center("活动时间还没到哦");
        } else if (res.data.code === 1002) {
          this.$toast.center("活动时间已经结束了");
        } else if (res.data.code === 1003) {
          this.$toast.center("该商品已经下架");
        } else {
          this.$toast.center("请重试");
        }
      });
    },
    // 请求商品数据
    getGoodsData() {
      this.$get("/goods/list", {
        id: this.lastId,
        goodsType: this.goodsType,
        pageSize: 20
      }).then(res => {
        console.log(res);
        let data = res.data.data;
        // 更新navlist
        this.navList = this.navList.length ? this.navList : (data.typeList || []);
        console.log(this.navList)
        // 商品是否还有下一页
        this.goodsListHasMore = data.hasMore;

        // 商品列表
        let list = data.list;
        if (this.lastId !== 0) {
          list = this.goodsList.concat(list);
        }
        this.goodsList = list;

        // 最后的商品ID
        this.lastId = list.length ? list[list.length - 1].id : 0;
      });
    },

    // 加载更多
    loadMore() {
      // 下面开始请求，同时打开busy
      if (this.goodsListHasMore) {
        this.getGoodsData();
      }
    },

    // 点击换一批
    updateGoods() {
      this.goodsList = [];
      this.lastId = 0;
      this.getGoodsData();
      window.scrollTo(0, 0);
    },

    // 去订单页面
    gotoOrder() {
      this.$router.push("/order");
    },
    // scroll初始化
    initTabScroll() {
      let width = 0;
      for (let i = 0; i < this.navList.length; i++) {
        // width += this.$refs.navitem[1].getBoundingClientRect().width;
        width += 70;
      }
      this.$refs.navlist.style.width = width + "px";
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.wrapper, {
            startX: 0,
            click: true,
            scrollX: true,
            scrollY: false,
            eventPassthrough: "vertical"
          });
        } else {
          this.scroll.refresh();
        }
      });
    }
  },
  mounted() {
    this.initTabScroll();
    this.getGoodsData();
  }
};
</script>

<style>
.goods .rule_box {
  background-color: white;
  border: 2px solid #ffde37;
  padding: 10px 10px 10px 8px;
  border-radius: 10px;
  margin: 10px;
}
.goods .rule_box span {
  font-size: 14px;
}
.goods .verify {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px;
  padding: 5px 0;
  background-color: #fde43d;
  color: #774024;
  border-radius: 50px;
  font-size: 15px;
}
.verify .tip {
  font-size: 12px;
}
.goods .goods_list {
  margin: 10px;
  padding-bottom: 50px;
}
.goods .goods_list .bottom_tip {
  padding: 5px 0;
  color: white;
  text-align: center;
}
.goods .van-tabs__line {
  background: #fde43d;
}
.goods .van-tabs .van-tab {
  background: #ec4e4f;
  color: white;
}
.goods .van-tabs__nav {
  background: transparent;
}
.goods .van-tab.van-tab--active {
  color: #fde43d;
}
.goods .van-hairline--top-bottom::after {
  border-width: 0;
}
.goods .type_nav {
  width: 100%;
  overflow: hidden;
}
.goods .type_nav .nav_list {
  list-style: none;
  margin: 0;
  padding: 0 0 0 5px;
  white-space: nowrap;
}
.goods .type_nav .nav_list li {
  list-style: none;
  display: inline-block;
  padding: 5px;
  color: white;
  text-align: center;
  margin-right: 6px;
}
.goods .type_nav .nav_list li.active {
  color: #fde43d;
  border-bottom: 3px solid #fde43d;
}
@media only screen and (max-width: 320px) {
  .goods .rule_box {
    margin: 10px 5px;
    padding: 8px;
  }
  .goods .rule_box span {
    font-size: 13px;
  }
  .goods .verify {
    margin: 8px;
    border-radius: 40px;
  }
  .goods .goods_list {
    margin: 10px 5px;
  }
}
</style>