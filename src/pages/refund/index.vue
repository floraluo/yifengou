<template>
  <div>
    <!-- <div v-if="!showRefund" style="color:white;text-align:center;padding-top:10px;">数据加载中...</div> -->
    <div class="bind" v-if="showRefund">
      <div class="invite-code">
        <div class="tip">
          邀请码<span>{{invite}}</span>
        </div>
      </div>
      <div class="input-info">
        <div class='tip'>收款支付宝
          <span class='text1'>（{{bindList.bind_time}}）</span>
          <span class='text2'>ID: {{id}}</span>
        </div>
        <div class="form">
          <div class='text'>
            <span class='inputType'>真实姓名</span>
            <input placeholder='输入真实姓名' v-model="zfbUsername" type='text' />
          </div>
          <div class='text'>
            <span class='inputType'>支付宝账号</span>
            <input placeholder='输入支付宝账号' v-model="zfbAccount" type="text" />
          </div>
          <div class='text'>
            <span class='inputType'>手机号</span>
            <input placeholder='输入手机号' v-model="phone" type="text" />
          </div>
          <div class="save-btn" @click="saveUserInfo">保存</div>
        </div>
        <div class="warning">
          {{bindList.refund_time}}
        </div>
      </div>
    </div>
    <tabbar />
  </div>

</template>

<script>
import tabbar from "../../components/tabbar";
import login from "../../module/login";
export default {
  data() {
    return {
      zfbUsername: "",
      zfbAccount: "",
      phone: "",
      id: "",

      showRefund: false,
      bindList: [],
      invite: ""
    };
  },
  computed: {
    // bindList() {
    //   return this.$store.state.bindList;
    // },
    // 邀请码
    // invite() {
    //   return this.$store.state.invite;
    // }
  },
  components: {
    tabbar
  },
  methods: {
    // 保存用户信息
    saveUserInfo() {
      if (!this.zfbUsername) {
        this.$toast.center("真实姓名不能为空");
        return;
      }
      if (!this.zfbAccount) {
        this.$toast.center("支付宝账号不能为空");
        return;
      }
      if (!this.phone) {
        this.$toast.center("手机号码不能为空");
        return;
      }
      this.$post("/user/payinfo/save", {
        zfbUsername: this.zfbUsername,
        zfbAccount: this.zfbAccount,
        phone: this.phone
      }).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.$toast.center("保存成功");
        }
      });
    },

    // 获取用户信息
    getUserInfo() {
      this.$get("/user/info").then(res => {
        console.log("用户信息", res);
        if (res.data.code === 200) {
          this.zfbUsername = res.data.data.zfbUsername;
          this.zfbAccount = res.data.data.zfbAccount;
          this.phone = res.data.data.phone;
          this.id = res.data.data.id;
          this.showRefund = true;
        }
      });
    },

    initView() {
      this.$get("/init").then(res => {
        console.log("refund-init", res);
        if (res.data.code === 200) {
          if (res.data.data.showInvite) {
            this.$router.push("/invite");
          } else {
            this.getUserInfo();
            let list = JSON.parse(res.data.data.text);
            this.bindList = list.bind_list;
            this.invite = res.data.data.invite;
            console.log("refund>>>>>>", this.bindList, this.invite);
          }
        }
      });
    }
  },
  mounted() {
    this.initView();

    // 分享
    //this.share(this.get2, this.wx,this.$store.state.shareImg);
    this.share(this.get2, this.wx);

    // 结果为true时再初始页面
    //login.checkInitData().then(func);
  }
};
</script>

<style scoped lang="scss">
.bind {
  .invite-code {
    margin: 10px;
    background: white;
    padding: 10px 0 10px;
    font-size: 16px;
    span {
      margin-left: 100px;
      color: #774024;
    }
  }
  .input-info {
    margin: 10px;
    background: white;
    padding: 10px 0 10px;
    font-size: 16px;
    .form {
      margin: 20px 20px 12px;
      & > .text {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 40px;
        background: #eee;
        margin-bottom: 10px;
      }
      .inputType {
        margin-left: 10px;
        width: 30%;
      }
      input {
        width: 64%;
        font-size: 14px;
        background-color: #eee;
        border: none;
        outline: none;
      }
      .save-btn {
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: white;
        background: #3f93e6;
        border-radius: 5px;
      }
    }
    .warning {
      margin-left: 10px;
      font-size: 12px;
      color: #ec4e4f;
    }
  }
  .tip {
    position: relative;
    margin-left: 15px;
    display: flex;
    align-items: center;
    &::after {
      content: "";
      display: block;
      width: 3px;
      height: 100%;
      background: #ffde37;
      position: absolute;
      top: 0;
      left: -5px;
    }
    .text1 {
      color: #ec4e4f;
      font-size: 12px;
      margin-right: 8px;
    }

    .text2 {
      color: #999;
      font-size: 12px;
    }
  }
}

@media only screen and (max-width: 320px) {
  .bind {
    .invite-code {
      margin: 0 5px 10px;
      span {
        margin-left: 90px;
      }
    }
    .input-info {
      margin: 0 5px 10px;
      .form {
        margin: 10px;
      }
    }

    .tip {
      margin-left: 10px;
      font-size: 14px;
      .text1 {
        margin-right: 5px;
      }
    }
  }
}
</style>