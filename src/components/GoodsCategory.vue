<template>
  <div class="row row-category">
    <ul class="category">
      <li v-for="(item, index) in categories" :key="index" @click="gotoSearch(item)"
          :class="{'active': $route.query.goodsType && +$route.query.goodsType === +item.id}" :style="`width: ${width}%`">
        <div class="img-box"><img :src="item.image" alt=""></div>
        <p>{{item.name}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
  let vm
  export default {
    name: 'GoodsCategory',
    data () {
      return {}
    },
    computed: {
      categories() {
        return this.$store.state.categories
      },
      width () {
        if (this.categories.length % 5 === 0) {
          return 20;
        } else {
          return 25;
        }
      }
    },
    methods: {
      gotoSearch(item) {
        this.$router.push({
          path: '/goods/search',
          query: {
            id: 0,
            goodsType: item.id
          }
        })
      }
    },
    created () {
      vm = this
    }
  }
</script>

<style scoped lang='scss'>
  @import "../sass/variables";
  .row-category{
    background-color: #fff;
    margin-bottom: 0;
  }
  .category{
    padding: 0.27rem $gutter-margin 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    li{
      width: 25%;
      list-style: none;
      text-align: center;
      margin-bottom: 0.27rem;
      cursor: pointer;
      &.active p {
        color: $theme-color;
        font-weight: bold;
      }
      .img-box{
        margin: 0 auto;
        border-radius: 50%;
        overflow: hidden;
        width: 1.07rem;
        height: 1.07rem;
        background-color: #f2f2f2;
        img{
          max-width: 100%;
          max-height: 100%;
        }
      }
      p{
        margin-top: 5px;
        margin-bottom: 0;
        font-size: 12px;
        color: #333;
      }
    }
  }
</style>
