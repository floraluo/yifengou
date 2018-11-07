<template>
  <div class="rules">
    <!-- 返回按钮组件 -->
    <!-- <go-back :from="from" :idx="idx"/> -->
    <!-- 规则列表 -->
    <div class="rule_item" v-for="(itemList,index) in ruleList" :key="index">
      <div class="rule_title">{{itemList.title}}</div>
      <div class="rule_content" v-for="(item,idx) in itemList.list" :key="idx">{{item}}</div>
    </div>
    <tabbar/>
  </div>
</template>

<script>
import tabbar from '../../components/tabbar'
export default {
  data(){
    return {

    }
  },
  components:{
    tabbar
  },
  computed:{
    ruleList(){
      return this.$store.state.ruleList
    }
  },
  methods:{
  },
  mounted(){
    // 分享
    this.share(this.get2,this.wx);
  }
}
</script>

<style>
.rules{
  padding-bottom: 50px;
}
.rules .rule_item {
  margin: 10px;
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