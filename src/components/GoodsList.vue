<template>
  <div class="row goods" ref="goodsWrapper">
    <div :class="fixedFilterBar ? 'type-nav fixed': 'type-nav'" ref="wrapper">
      <ul class="nav-list" ref="navlist">
        <li v-for="(item,index) in categories" :key="index" ref="navitem"
            :class="{active: $route.query.goodsType && +$route.query.goodsType === +item.id}"
            @click="switchGoodsType(item)">
          {{item.name}}
        </li>
      </ul>
    </div>
    <div class="goods-list">
      <list-item v-for="(item,index) in goodsList"
                 @click.native="goBuy(item.id)"
                 :key="index"
                 :index="index"
                 :goods="item"/>
      <div v-infinite-scroll="loadMore" :infinite-scroll-disabled="!$store.state.hasMore" infinite-scroll-distance="20">
        <div class="bottom-tip">{{bottomText}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from "better-scroll";
  import listItem from "@/components/listItem";
  let vm, goodsListTop;
  export default {
    name: 'GoodsList',
    data () {
      return {
        fixedFilterBar: false,
        markCateIndex: 0, // 控制商品类型菜单的显示
        scroll: null, // scroll实例（参考better-scroll）
        goodsType: null, // 请求商品类型，页面初始为0，即全部商品,
        goodsGroup: 0,
        hasMore: this.$store.state.hasMore, // 商品是否还有下一页
        busy: false // 如果该属性的值为true，则会禁用无限滚动
      }
    },
    components: { listItem },
    computed: {
      categories() {
        return this.$store.state.categories;
      },
      goodsList() {
        return this.$store.state.goodsList;
      },
      // 上拉加载底部提示文字
      bottomText() {
        if (this.$store.state.goodsList.length === 0) {
          return '暂无数据';
        } else {
          return this.$store.state.hasMore ? "玩儿命加载中..." : "─── 我是有底线的 ───";
        }
      },
      // 规则说明
      indexList() {
        return this.$store.state.indexList;
      }
    },
    watch: {
      '$route.query.goodsType': function (val, oldVal) {
        // console.log(this.goodsType , val.goodsType);
        let goodsType = +val;
        if ( this.goodsType !== null && (goodsType !== +this.goodsType) && this.$route.path === '/goods/search') {
          this.goodsType = goodsType;
          console.log('watch');
          getGoodsList(); //watch
        }
      }
    },
    methods: {
      doRefresh (done) {
        getGoodsList(false, done);
      },
      // 点击切换商品类型
      switchGoodsType(item) {
        // 点击项高亮
        // this.markCateIndex = index;
        // this.goodsType = this.categories[index].id;
        // 点击此项菜单时，移动到可视区
        // this.scroll.scrollToElement(this.$refs.navitem[index], 200, true, true);
        document.documentElement.scrollTop = goodsListTop;
        this.$router.push({
          path: '/goods/search',
          query: {
            id: 0,
            goodsType: item.id
          }
        })
        // getGoodsList() //switchGoodsType
      },
      // 点击购买商品
      goBuy(id) {
        this.$get("/goods/link", { id }).then(res => {
          if (res.code === 200) {
            if (res.data.limit && res.data.link) {
              this.$toast.center(res.data.limitMsg);
            } else {
              if (res.data.link) {
                console.log(res.data.link);
                window.location.href = res.data.link;
              }
            }
          } else if (res.code === 900) {
            this.$toast.center("活动时间还没到哦");
          } else if (res.code === 901) {
            this.$toast.center("活动时间已经结束了");
          } else if (res.code === 902) {
            this.$toast.center("该商品已经下架");
          } else {
            this.$toast.center("请重试");
          }
        });
      },

      // 加载更多
      loadMore() {
        if (this.$store.state.hasMore) {
          getGoodsList(true) //loadMore
        }
      },

      // scroll初始化
      initTabScroll() {
        let startX = 0,
          maxOffsetX,
          goodsType = +this.$route.query.goodsType,
          width = Number(document.getElementsByTagName('html')[0].style.fontSize.slice(0,-2)) * 0.32 * 2;
        for (let i = 0; i < this.categories.length; i++) {
          // width += this.$refs.navitem[1].getBoundingClientRect().width;
          width += 70;
        }
        maxOffsetX = width - document.body.clientWidth >0 ? width - document.body.clientWidth : 0;
        if (goodsType) {
          this.categories.some((item, index) => {
            if (item.id === goodsType){
              startX = 70 * index;
              if (startX > maxOffsetX) startX = maxOffsetX;
              startX = startX * -1;
              return true;
            }
          })
        }
        this.$refs.navlist.style.width = width + "px";
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.wrapper, {
              startX,
              click: true,
              scrollX: true,
              scrollY: false,
              eventPassthrough: "vertical"
            });
          } else {
            this.scroll.refresh();
            this.scroll.scrollTo(startX, 0)
          }
        });
      }
    },
    created () {
      vm = this;
    },
    mounted() {
      window.onscroll = function () {
        goodsListTop = vm.$refs.goodsWrapper.offsetTop - 40;
        vm.fixedFilterBar = document.documentElement.scrollTop >= goodsListTop && vm.$route.path === '/goods/search' && vm.$route.query.goodsGroup === undefined;
        if (vm.fixedFilterBar ) {
          vm.initTabScroll();
        }
      }
    },
    activated () {
      this.fixedFilterBar = false;
      this.goodsGroup = this.$route.query.goodsGroup === undefined ? null : +this.$route.query.goodsGroup;
      this.goodsType = this.$route.query.goodsType === undefined ? null : +this.$route.query.goodsType;
    }
  }

  function getGoodsList (isUpdate, callback) {
    let id, url, params,path = vm.$route.path;
    if (!isUpdate || vm.$store.state.goodsList.length === 0) {
      id = 0;
    } else {
      id = vm.$store.state.goodsList.slice(-1)[0].id;
    }
    if (path === '/goods') {
      url = '/home/goods/';
      params = { id };
    } else if (path === '/goods/search') {
      url = '/goods';
      params = {
        id,
        goodsGroup: vm.$route.query.goodsGroup,
        goodsType: vm.goodsType
      }
    }
    vm.$get(url, params).then(res => {
      let data = res.data;
      if (isUpdate) {
        vm.$store.commit('updateGoodsList', data)
      } else {
        vm.$store.commit('setGoodsList', data)
      }

      // 下拉刷新组件中，刷新成功需要callback
      if (callback) {
        callback();
      }
    });
  }
</script>


<style scoped lang="scss">
  @import "../sass/variables";
  .goods {
    position: relative;
    /*<!--padding-top: $filter-bar-height + 5px;-->*/
    margin-bottom: 0;
    .goods-list {
      padding-bottom: 50px;
      background-color: #fff;
      .bottom-tip {
        position: absolute;
        width: 100%;
        height: 50px;
        line-height: 50px;
        color: #999;
        text-align: center;
      }
    }

    .type-nav {
      position: absolute;
      display: none;
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
        display: block;
        z-index: 1;
        box-shadow: 0 0 5px rgba(0,0,0,.2);
        animation: slideDown .2s linear;
      }
    }
  }
  @keyframes slideDown {
    from {
      transform: translateY(-40px);
    }
    to {
      transform: translateY(0);
    }
  }
</style>
