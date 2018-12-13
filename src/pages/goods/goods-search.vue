<template>
  <div>
    <base-refresh
      :on-refresh="doRefresh">
      <!--<div class="row row-search">-->
        <!--<div class="input-group">-->
          <!--<i class="iconfont icon-search"></i>-->
          <!--<input type="text" placeholder="请输入关键字搜索">-->
        <!--</div>-->
        <!--<button class="btn btn-round btn-default" type="button">搜索</button>-->
      <!--</div>-->
      <goods-category v-if="!$route.query.goodsGroup"></goods-category>
      <hr>
      <goods-list ref="goodsList"></goods-list>
    </base-refresh>
  </div>
</template>

<script>
  import GoodsCategory from "@/components/GoodsCategory";
  import GoodsList from "@/components/GoodsList";
  let vm
  export default {
    name: 'goods-search',
    components: { GoodsList, GoodsCategory },
    data () {
      return {}
    },
    methods: {
      doRefresh (done) {
        this.$refs.goodsList.doRefresh(done);
      }
    },
    created () {
      vm = this
    },
    activated () {
      getList();
    }
  }
  function getList () {
    let params = vm.$route.query
    vm.$get('/goods', vm.$route.query)
      .then(res => {
        vm.$store.commit('setGoodsList', res.data)
      })
  }
</script>

<style scoped lang='scss'>
  @import "../../sass/variables";
  .row-search{
    padding: $gutter-margin;
    margin-bottom: 0;
    display: flex;
    background-color: #fff;
    .input-group{
      position: relative;
      flex: 1;
      margin-right: 10px;
      .icon-search{
        position: absolute;
        display: flex;
        height: 100%;
        width: .9rem;
        justify-content: center;
        align-items: center;
        font-size: 0.43rem;
        /*left: 0.35rem;*/
        /*top: 0.19rem;*/
        color: #d6d6d6;
      }
      input{
        width: 100%;
        height: 100%;
        padding: 0.13rem 0.32rem;
        padding-left: 0.9rem;
        border-radius: 50px;
        border: 1px solid #f6f6f6;
        box-shadow: 0 0 7px rgba(214, 214, 214, .35);
        outline: none;
        &:focus{
          border-color: #85c4ff;
          box-shadow: 0 0 7px rgba(0, 132, 255, 0.36);
        }
      }
    }
  }
  hr{
    margin: 0 $gutter-margin*-1;
    border: 0;
    border-top: 1px solid #e0e0e0;
  }
</style>
