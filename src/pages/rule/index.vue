<template>
  <div class="rules">
    <!-- 返回按钮组件 -->
    <go-back :from="from" :idx="idx"/>
    <!-- 规则列表 -->
    <div class="rule_item" v-for="(itemList,index) in ruleData.rule_list" :key="index">
      <div class="rule_title">{{itemList.title}}</div>
      <div class="rule_content" v-for="(item,idx) in itemList.list" :key="idx">{{item}}</div>
    </div>
  </div>
</template>

<script>
import ruleData from "../../config/data.js";
import goBack from '@/components/goBack'
export default {
  data(){
    return {
        ruleData:ruleData,
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
    goBack
  },
  methods:{
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
.rules .rule_item {
  margin: 0px 10px 10px;
  padding: 20px;
  border-radius: 10px;
  background: white;
}
.rules .rule_title {
  color: #ec4e4f;
  margin-bottom: 8px;
}
.rules .rule_content {
  font-size: 13px;
}
@media only screen and (max-width: 320px) {
  .rules .rule_item {
    margin: 0px 5px 5px;
    padding: 10px;
    border-radius: 10px;
  }
}
</style>