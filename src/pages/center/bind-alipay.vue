<template>
  <div class="row bind-alipay">
    <form>
      <div class="icon-group">
        <i class="iconfont icon-alipay-circle-fill"></i>
      </div>
      <div class="form-group">
        <input type="text"
               placeholder="真实姓名"
               v-validate="'required'"
               data-vv-as="姓名"
               name="name"
               v-model="alipay.name">
        <span class="error" v-show="errors.has('name')">*{{ errors.first('name') }}</span>
      </div>
      <div class="form-group">
        <input type="text"
               placeholder="支付宝账号"
               v-validate="'required'"
               data-vv-as="账号"
               name="account"
               v-model="alipay.account">
        <span class="error" v-show="errors.has('account')">*{{ errors.first('account') }}</span>
      </div>
      <button class="btn btn-round" :class="modified ? 'btn-default' : 'btn-gray'" type="button" @click="submit">{{btnText}}</button>
    </form>
  </div>
</template>

<script>
  let vm
  export default {
    name: 'bind-alipay',
    data () {
      return {
        alipay: {
          name: null,
          account: null
        },
        modified: false
      }
    },
    watch: {
      alipay: {
        handler: function (val, oldVal) {
          this.modified = (val.name !== this.$route.query.name || val.account !== this.$route.query.account)
        },
        deep: true
      }
    },
    computed: {
      btnText() {
        if (this.alipay.account) {
          return '保存修改'
        } else {
          return '确认绑定'
        }
      }
    },
    methods: {
      submit() {
        if (!this.modified) {
          this.$toast.center("您未做任何修改哦！");
          return;
        }
        this.$validator.validate().then(() => {
          const error = vm.$validator.errors;
          if (error.any()) {
            this.$toast.center('你还有错误消息未处理！')
          } else {
            this.$post('/pay/save', {
              zfbUsername: this.alipay.name,
              zfbAccount: this.alipay.account
            }).then( res => {
              let msg;
              if (this.btnText === '保存修改') {
                msg = '修改成功！'
              } else {
                msg = '绑定成功！'
              }
              this.$toast.center(msg)
            })
          }
        })
      }
    },
    created () {
      vm = this
    },
    activated () {
      let query = this.$route.query
      this.modified = false;
      this.alipay.name = query.name;
      this.alipay.account = query.account;
    }
  }
</script>

<style scoped lang='scss'>
  @import "../../sass/variables";
  .bind-alipay{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0;
    height: calc(100vh - #{$tabbar-height});
    background-size: cover;
    background: #fff url("../../assets/image/bind-alipay-bg.png") no-repeat center -50px;
    form{
      margin-top: 1.33rem;
      padding: 0.67rem 1.07rem 1.07rem;
      width: 78%;
      border-radius: 0.40rem;
      box-shadow: 0 0 8px 3px rgba(250, 61, 71, .1);
      background-color: #fff;
      .icon-group{
        margin-bottom: 0.40rem;
        text-align: center;
        > .icon-alipay-circle-fill{
          font-size: 1.57rem;
          color: #2ea1f1;
        }
      }
      .form-group{
        position: relative;
        margin-bottom: 0.27rem;
        input{
          border:0;
          border-bottom: 1px solid #e6e6e6;
          padding: 10px;
          width: 100%;
          font-size: 14px;
          color: #333;
          transition: border-bottom-color .2s;
          &:focus{
            outline: 0;
            border-bottom-color: $form-border-focus-color;
            + .icon-close{
              display: inline-block;
            }
          }
        }
        .error{
          display: inline-block;
          margin-top: 5px;
          font-size: 10px;
          color: #f00;
        }
      }
      > .btn{
        padding-top: 10px;
        padding-bottom: 10px;
        margin-top: 0.40rem;
        width: 100%;
      }
    }
  }
</style>
