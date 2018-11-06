<template>
  <div class="cart_list">
    <!-- 返回按钮组件 -->
    <go-back :from="from" :idx="idx"/>
    <!-- 购物车列表 -->
    <cart-item></cart-item>
  </div>
</template>

<script>
import cartItem from '@/components/cartItem'
import goBack from '@/components/goBack'
export default {
  data(){
    return {
      from:'', // 此次页面从哪个路由进来
      idx:0, // 主页带来的idx参数，用于返回判断哪个高亮
    }
  },
  // 路由导航守卫钩子,进入页面之前触发
  beforeRouteEnter(to, from, next){
    console.log('from:',from)
    // 每次进入该页面记录来源，便于返回到来源
    next(vm=>{
      vm.from = from.fullPath
    })
  },
  components:{
    cartItem,
    goBack
  },
  mounted(){
    // 初始化时拿到路由带来的参数idx,返回时带回，用于正确显示高亮的菜单
    // （这是因为单页面进入时，菜单项初始化了）
    let idx = this.$route.query.idx
    this.idx = idx
  }
}
</script>

<style>
.cart_list{
  margin:0 10px;
}
@media only screen and (max-width:320px){
  .cart_list{
  margin:0 5px;
}
}
</style>