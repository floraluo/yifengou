<template>
  <div class="row goods" ref="goodsWrapper">
    <div :class="fixedFilterBar ? 'type-nav fixed': 'type-nav'" ref="wrapper">
      <ul class="nav-list" ref="navlist">
        <li v-for="(item,index) in navList" :key="index" ref="navitem" :class="{active:idx===index}" @click="switchGoodsType(index)">
          {{item.value}}
        </li>
      </ul>
    </div>
    <div class="goods-list">
      <list-item v-for="(item,index) in goodsList" @click.native="goBuy(item.id)" :key="index" :id="item.id" :pic="item.goodsImg" :name="item.goodsContent" :couponPrice="item.couponPrice" :discountPrice="item.discountPrice" :goodsPrice="item.goodsPrice" />
      <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20">
        <div class="bottom-tip" @click="updateGoods">{{bootomText}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import listItem from "@/components/listItem";
let vm, goodsListTop;
export default {
  data() {
    return {
      fixedFilterBar: false,
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
      console.log(this.scroll);
      // this.scroll.scrollToElement(this.$refs.navitem[index], 200, true, true);
      document.documentElement.scrollTop = goodsListTop
      this.goodsType = this.navList[index].key;
      this.getGoodsData();
    },
    // 点击购买商品
    goBuy(id) {
      this.$get("/h5/goods/link", { id }).then(res => {
        console.log(res);
        if (res.code === 200) {
          if (res.data.limit && res.data.link) {
            this.$toast.center(res.data.limitMsg);
          } else {
            if (res.data.link) {
              console.log(res.data.link);
              window.location.href = res.data.link;
            }
          }
        } else if (res.code === 1001) {
          this.$toast.center("活动时间还没到哦");
        } else if (res.code === 1002) {
          this.$toast.center("活动时间已经结束了");
        } else if (res.code === 1003) {
          this.$toast.center("该商品已经下架");
        } else {
          this.$toast.center("请重试");
        }
      });
    },
    // 请求商品数据
    getGoodsData() {
      this.$get("/h5/goods/list", {
        id: this.lastId,
        goodsType: this.goodsType,
        pageSize: 20
      }).then(res => {
        console.log(res);
        let data = res.data;
        // 更新navlist
        this.navList = this.navList.length ? this.navList : data.typeList || [];
        this.initTabScroll();
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
        width += 80;
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
    this.getGoodsData();
    window.onscroll = function () {
      goodsListTop = vm.$refs.goodsWrapper.offsetTop
      vm.fixedFilterBar = document.documentElement.scrollTop >= goodsListTop
      console.log(document.documentElement.scrollTop, goodsListTop)
    }
  },
  created() {
    vm = this;
  }
};
</script>

<style scoped lang="scss">
  @import "../../sass/variables";
.goods {
  position: relative;
  padding-top: $filter-bar-height + 5px;
  margin-bottom: 0;
  .goods-list {
    padding-bottom: 50px;
    background-color: #fff;
    .bottom-tip {
      padding: 5px 0;
      color: white;
      text-align: center;
    }
  }

  .type-nav {
    position: absolute;
    top: 0;
    width: 100%;
    max-width: 750px;
    height: $filter-bar-height;
    line-height: $filter-bar-height;
    overflow: hidden;
    background-color: #fff;
    .nav-list {
      padding-left: $gutter-margin;
      padding-right: $gutter-margin;
      list-style: none;
      margin: 0;
      /*padding: 0;*/
      white-space: nowrap;

      li {
        position: relative;
        list-style: none;
        padding-left: 5px;
        padding-right: 5px;
        display: inline-block;
        text-align: center;
        font-size: 15px;
        &.active {
          color: $theme-color;
          /*#fde43d*/
          &:after{
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            display: block;
            width: 100%;
            height: 3px;
            background-color: $theme-color;
          }
        }
      }
    }
    &.fixed{
      position: fixed;
      z-index: 1;
      box-shadow: 0 0 5px rgba(0,0,0,.2);
    }
  }
}
</style>
