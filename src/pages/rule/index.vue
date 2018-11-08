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
import login from "../../module/login";
export default {
  data(){
    return {
      ruleList:[]
    }
  },
  components:{
    tabbar
  },
  computed:{
    // ruleList(){
    //   return this.$store.state.ruleList
    // }
  },
  methods:{
    initView(){
      this.$get('/init').then(res=>{
        console.log('init',res)
        if (res.data.code === 200) {
          if (!res.data.data.invite){
            this.$router.push("/invite");
          } else {
            let list = JSON.parse(res.data.data.text)
            this.ruleList = list.rule_list
            this.share(this.get2,this.wx,res.data.data.shareImage)
          }
        }
      })
    }
  },
  mounted(){

    this.initView()

      // 判断是否有邀请码，没有就跳转填写页面
  //  let invite = this.$store.state.invite
  //  if (!invite) {
  //    this.$router.push('/invite')
  //  }

    // 分享
    //this.share(this.get2,this.wx,this.$store.state.shareImg)

    // 结果为true时再初始页面
    //login.checkInitData().then(func);
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