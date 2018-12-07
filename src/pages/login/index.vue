<template>
  <div class="login">
    <div class="profile">
      <div class="portrait">
        <img :src="headUrl" alt="" v-if="headUrl">
        <img src="../../assets/image/portrait.png" alt="" v-else>
      </div>
      <p class="name">{{nickname}}</p>
    </div>
    <form>
      <div class="form-group">
        <div class="input-group">
          <i class="iconfont icon-invite"></i>
          <input
            v-model="invite"
            v-validate="'required|max:6'"
            data-vv-as="邀请码"
            type="text"
            name="inviteCode"
            placeholder="请输入邀请码" v-if="!$store.state.initData.invite">
          <span class="input" v-else>{{invite}}</span>
        </div>
        <span class="error" v-show="errors.has('inviteCode')">*{{ errors.first('inviteCode') }}</span>
      </div>
      <div class="form-group">
        <div class="input-group">
          <i class="iconfont icon-phone"></i>
          <input
            v-model="phone"
            v-validate="'required|mobile'"
            data-vv-as="手机号"
            type="text"
            name="phone"
            placeholder="请输入手机号" v-if="!$store.state.initData.phone">
          <span class="input" v-else>{{phone}}</span>
        </div>
        <span class="error" v-show="errors.has('phone')">*{{ errors.first('phone') }}</span>
      </div>
      <div class="form-group" v-if="needVerify">
        <div class="input-group">
          <i class="iconfont icon-verify"></i>
          <input
            v-model="code"
            v-validate="'required|max:6'"
            data-vv-as="验证码"
            type="text"
            name="code"
            placeholder="请输入验证码">
          <button class="btn btn-link" type="button" @click="getCode" v-if="counter === null">获取验证码</button>
          <button class="btn btn-link" type="button" v-else>{{counter}}秒后重新获取</button>
        </div>
        <span class="error" v-show="errors.has('code')">*{{ errors.first('code') }}</span>
      </div>
    </form>
    <button class="btn btn-default btn-round btn-block" type="button" @click="submitLogin">授权登录</button>
  </div>
</template>

<script>
  let vm;
  export default {
    name: 'index',
    data () {
      return {
        headUrl: null,
        nickname: null,
        invite: null,
        phone: null,
        code: null,
        timer: null,
        counter: null,
        needVerify: false //没有手机号或手机号与初始不一致，需要短信验证
      }
    },
    watch: {
      phone: function (val, oldVal) {
        this.needVerify = val.length === 11 && val !== this.$store.state.initData.phone;
      }
    },
    methods: {
      getCode() {
        this.$validator.validate('phone').then((data) => {
          if (data) {
            this.$post('/user/bind/sms', { phone: this.phone})
              .then(res => {
                if ( res.code === 901 ) {
                  this.$toast.center('发送失败')
                } else if( res.code === 902 ) {
                  this.$toast.center('发送太频繁啦，请稍等一会儿再试！')
                } else if( res.code === 200 ) {
                  this.counter = 60; //发送短信时间间隔60s
                  this.timer = setInterval(() => {
                    if (--this.counter === 0) {
                      this.counter = null;
                      clearInterval(this.timer);
                    }
                  }, 1000);
                }
              });
          }
        })
      },
      submitLogin () {
        this.$validator.validate().then(() => {
          const error = vm.$validator.errors;
          if (error.any()) {
            this.$toast.center('你还有错误消息未处理！')
          } else {
            this.$post('/user/bind', {
              invite: this.invite,
              phone: this.phone,
              code: this.code
            }).then( res => {
              let code = res.code, msg = '登录成功';
              if (code === 200) {
                this.$router.push('/goods');
              } else if (code === 901) {
                msg = '邀请码错误';
              } else if (code === 904) {
                msg = '验证码错误';
              }
              this.$toast.center(msg);
            })
          }
        })
      }
    },
    created () {
      vm = this;
      let data = this.$store.state.initData;
      this.headUrl = data.headUrl;
      this.nickname = data.nickname;
      this.phone = data.phone;
      this.invite = data.invite;

      if (!data.phone) this.needVerify = true;
    }
  }
</script>

<style scoped lang='scss'>
  @import "../../sass/variables";
  $border-color: #d6d6d6;
  .login{
    padding-left: 1.00rem;
    padding-right: 1rem;
    min-height: 100vh;
    background: #fff url("../../assets/image/login-bottom-bg.png") center bottom no-repeat;
    background-size: contain;
    .profile{
      padding-top: 1.33rem;
      padding-bottom: 1rem;
      text-align: center;
      .portrait{
        margin: 0 auto;
        width: 2.32rem;
        height: 2.32rem;
        padding: 0.24rem;
        border: 2px solid #f3f3f3;
        border-radius: 50%;
        img{
          max-width: 100%;
          border-radius: 50%;
        }
      }
      p.name{
        font-size: 0.40rem;
        color: #666;
      }
    }
    form{
      /*<!--border: 1px solid $border-color;-->*/
      margin-bottom: 1.33rem;
      /*border-radius: 0.13rem;*/
      overflow: hidden;
      .input-group{
        position: relative;
        display: flex;
        border-bottom: 1px solid $border-color;
        + .input-group{
          /*<!--border-top: 1px solid $border-color;-->*/
        }
        .iconfont{
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.65rem;
        }
        input, .input{
          flex: 1;
          border: 0;
          padding: 0.35rem 0.32rem;
          &:focus{
            outline: 0;
          }
        }
        .btn{
          font-size: 12px;
          color: $theme-color;
          background-color: #fff;
        }
      }
      .error{
        padding-left: .32rem;
        font-size: 0.32rem;
        color: #FE441C;
      }
    }
    >.btn{
      padding-top: 0.37rem;
      padding-bottom: 0.37rem;
      font-size: 0.45rem;
    }
  }
</style>
