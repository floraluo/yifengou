<template>
  <div class="rules">
    <!-- 返回按钮组件 -->
    <!-- <go-back :from="from" :idx="idx"/> -->
    <!-- 规则列表 -->
    <div class="rule-item" v-for="(itemList,index) in ruleList" :key="index">
      <div class="rule-time" v-if="itemList.title === '活动时间'">
        <img src="@/assets/image/rule-title@2x.png" alt="">
        <p v-for="(item,idx) in itemList.list" :key="idx">{{item}}</p>
      </div>
      <template v-else>
        <div class="rule-title"><span>{{itemList.title}}</span></div>
        <div class="rule-body">
          <p class="rule-content" v-for="(item,idx) in itemList.list" :key="idx">{{item}}</p>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import tabbar from "../../components/tabbar";
import login from "../../module/login";
export default {
  data() {
    return {
      ruleList: []
    };
  },
  computed: {
    // ruleList(){
    //   return this.$store.state.ruleList
    // }
  },
  methods: {
    initView() {
      this.$get("/h5/init").then(res => {
        console.log("rule-init", res);
        if (res.code === 200) {
          if (res.data.showInvite) {
            this.$router.push("/invite");
          } else {
            let list = JSON.parse(res.data.text);
            this.ruleList = list.rule_list;
          }
        }
      });
    }
  },
  mounted() {
    this.initView();

    // 判断是否有邀请码，没有就跳转填写页面
    //  let invite = this.$store.state.invite
    //  if (!invite) {
    //    this.$router.push('/invite')
    //  }

    // 分享
    //this.share(this.get2,this.wx,this.$store.state.shareImg)
    this.share(this.get2, this.wx);
    // 结果为true时再初始页面
    //login.checkInitData().then(func);
  }
};
</script>

<style scoped lang="scss">
  @import "../../sass/_variables.scss";
  .rules {
    margin-left: -$gutter-margin;
    margin-right: -$gutter-margin;
    padding-top: 50px;
    padding-bottom: 50px;
    background: #f0f5ff url("../../assets/image/rule-bg.png");
    .rule-time{
      text-align: center;
      img{
        max-width: 60%;
      }
      p{
        /*font-size: 0.40rem;*/
        font-size: 14px;
        color: #282828;
      }
    }
    .rule-item {
      margin-left: $gutter-margin;
      margin-right: $gutter-margin;
      padding-left: 0.27rem;
      padding-right: 0.27rem;
      margin-bottom: 0.67rem;
      &:last-child{
        margin-bottom: 0;
      }
      .rule-title {
        text-align: center;
        margin-bottom: 0.27rem;
        span{
          display: inline-block;
          padding: 0.16rem 0.32rem;
          border-radius: 50px;
          font-size: 0.48rem;
          line-height: 1;
          color: #fff;
          background-color: #f8a0da;
        }
      }
      .rule-body{
        padding: 0.40rem;
        border-radius: 10px;
        border: 1px solid #000;
        font-size: 12px;
        line-height: 1.8;
        background-color: #fff;
        color: #666;
        .rule-content {
          margin-top: 0;
          margin-bottom: 8px;
          text-align: justify;
          &:last-child{
            margin-bottom: 0;
          }
        }
      }

    }
  }
</style>
