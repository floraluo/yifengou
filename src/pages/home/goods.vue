<template>
  <div class="goods">
    <div class="rule_box">
      <div v-for="(itemList,index) in ruleData.index_list" :key="index">
        <span v-for="(item,idx) in itemList" :key="idx" :style="{color:item.color}">{{item.text}}</span>
      </div>
    </div>
    <div class="verify">
      <div>下单后验证订单>></div>
      <div class="tip">(验证完订单并绑定提现账号后才可获得补贴)</div>
    </div>
    <div class="type_nav" ref="wrapper">
      <!-- <van-tabs v-model="active">
        <van-tab v-for="(item,index) in navList" :key="index" :title="item">
          <div class="goods_list">
            <list-item></list-item>
          </div>
        </van-tab>
      </van-tabs> -->
      <ul class="nav_list" ref="navlist">
        <li v-for="(item,index) in navList" :key="index" ref="navitem" :class="{active:idx===index}" @click="switchGoodsType(index)">
          {{item}}
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
import BScroll from "better-scroll";
import ruleData from "../../config/data.js";
import listItem from "@/components/listItem";
export default {
  data() {
    return {
      ruleData: ruleData,
      idx: 0, // 控制商品类型菜单的显示
      navList: ["全部", "居家生活", "母婴美妆", "服装配饰", "其他","服装配饰"],
      scroll: null, // scroll实例（参考better-scroll）
      lastId:0, // 请求参数，最后一个商品的id，初始为0
      goodsType:0 // 请求商品类型，页面初始为0，即全部商品
    };
  },
  components: {
    listItem
  },
  methods: {
    // 点击切换商品类型
    switchGoodsType(index){
      // 点击项高亮
      this.idx = index

      this.scroll.scrollToElement(this.$refs.navitem[index],200,true,true)
    },
    // 请求商品数据
    getGoodsData(){
      this.$get('/20181025/goods/list',{
        id:this.lastId,
        goodsType:this.goodsType,
        pageSize:20,
        c:102
      }).then(res=>{
        console.log(res)
      })
    },
    // scroll初始化
    initTabScroll() {
      let width = 0;
      for (let i = 0; i < this.navList.length; i++) {
        // width += this.$refs.navitem[1].getBoundingClientRect().width;
        width+=70
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
  margin: 0 10px;
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
    margin: 0 5px;
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