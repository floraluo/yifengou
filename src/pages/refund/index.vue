<template>
  <div class="bind">
    <div class="invite_code">
      <div class="tip">
        邀请码<span>{{invite}}</span>
      </div>
    </div>
    <div class="input_info">
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
        <div class="save_btn" @click="saveUserInfo">保存</div>
      </div>
      <div class="warning">
        {{bindList.refund_time}}
      </div>
    </div>
    <tabbar />
  </div>
</template>

<script>
import tabbar from '../../components/tabbar'
export default {
  data() {
    return {
      zfbUsername:'',
      zfbAccount:'',
      phone:'',
      id:''
    };
  },
  computed: {
    bindList() {
      return this.$store.state.bindList;
    },
    // 邀请码
    invite() {
      return this.$store.state.invite;
    }
  },
  components: {
    tabbar
  },
  methods: {
    // 保存用户信息
    saveUserInfo(){
      if (!this.zfbUsername) {
        this.$toast.center('真实姓名不能为空');
        return;
      }
      if (!this.zfbAccount) {
        this.$toast.center('支付宝账号不能为空');
        return;
      }
      if (!this.phone) {
        this.$toast.center('手机号码不能为空');
        return;
      }
      this.$post('/user/payinfo/save',{
        zfbUsername:this.zfbUsername,
        zfbAccount:this.zfbAccount,
        phone:this.phone
      }).then(res=>{
        console.log(res)
        if (res.data.code === 200){
          this.$toast.center('保存成功')
        }
      })
    },

    // 获取用户信息
    getUserInfo(){
      this.$get('/user/info').then(res=>{
        console.log('用户信息',res)
        if (res.data.code === 200) {
          this.zfbUsername = res.data.data.zfbUsername
          this.zfbAccount = res.data.data.zfbAccount
          this.phone = res.data.data.phone
          this.id = res.data.data.id
        }
      })
    }
  },
  mounted() {
    // 判断是否有邀请码，没有就跳转填写页面
   let invite = this.$store.state.invite
   if (!invite) {
     this.$router.push('/invite')
   }
   
    this.getUserInfo();
    // 分享
    this.share(this.get2,this.wx,this.$store.state.shareImg)
  }
};
</script>

<style>
.bind .invite_code,
.bind .input_info {
  margin: 10px;
  background: white;
  padding: 10px 0 10px;
  font-size: 16px;
}
.bind .invite_code span {
  margin-left: 100px;
  color: #774024;
}

.bind .tip {
  position: relative;
  margin-left: 20px;
  display: flex;
  align-items: center;
}
.bind .tip::after {
  content: "";
  display: block;
  width: 3px;
  height: 100%;
  background: #ffde37;
  position: absolute;
  top: 0;
  left: -5px;
}
.bind .tip .text1 {
  color: #ec4e4f;
  font-size: 12px;
  margin-right: 30px;
}
.bind .tip .text2 {
  color: #999;
  font-size: 12px;
}
.bind .input_info .form {
  margin: 20px 20px 12px;
}

.bind .input_info .form > .text {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 40px;
  background: #eee;
  margin-bottom: 10px;
}
.bind .input_info .form .inputType {
  margin-left: 10px;
  width: 30%;
}
.bind .input_info .form input {
  width: 64%;
  font-size: 14px;
  background-color: #eee;
  border: none;
  outline: none;
}
.bind .input_info .form .save_btn {
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: white;
  background: #3f93e6;
  border-radius: 5px;
}
.bind .input_info .warning {
  margin-left: 10px;
  font-size: 12px;
  color: #ec4e4f;
}
@media only screen and (max-width: 320px) {
  .bind .invite_code,
  .bind .input_info {
    margin: 0 5px 10px;
  }
  .bind .invite_code span {
    margin-left: 90px;
  }
  .bind .tip {
    margin-left: 10px;
    font-size: 14px;
  }
  .bind .tip .text1 {
    margin-right: 10px;
  }
  .bind .input_info .form {
    margin: 10px;
  }
}
</style>