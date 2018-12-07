<template>
  <div class="withdraw">
    <div class="row row-head">
      <div class="desc">可提现余额 (元)</div>
      <div class="num">{{balanceMoney | formatMoney}}</div>
    </div>
    <div class="row row-alipay">
      <span class="name">支付宝账号</span>
      <span class="num">{{alipayAccount}}</span>
    </div>
    <div class="row row-withdraw">
      <div class="tip">输入提现金额</div>
      <div class="input-group">
        <input ref="cashInput" type="text" v-model="cash" @keydown="keydown($event)" pattern="[0-9.]" @click="setCaretPosition($event)">
      </div>
    </div>
    <button class="btn btn-default btn-round btn-block" type="button" @click="submitWithdraw">提现</button>
  </div>
</template>

<script>
  let vm
  export default {
    name: 'withdraw',
    data () {
      return {
        cash: '￥',
        balanceMoney: this.$route.query.balanceMoney,
        alipayAccount: this.$route.query.alipayAccount
      }
    },
    computed: {
      money() {
        if (/^￥/.test(this.cash)) {
          return this.cash.substring(1);
        } else {
          return this.cash;
        }
      }
    },
    methods: {
      //设置光标在最后
      setCaretPosition(e) {
        this.$refs.cashInput.setSelectionRange(e.target.value.length, e.target.value.length)
      },
      submitWithdraw() {
        if (+this.cash.substring(1) === 0) {
          this.$toast.center('提现金额必须大于0');
          return false;
        }
        if (this.cash.substring(1) > this.balanceMoney) {
          this.$toast.center(`可提现余额为￥${this.balanceMoney}`);
          return false;
        }
        this.$post('/withdraw/apply', {
          money: this.cash.substring(1)
        }).then(res => {
          if (res.code === 900) {
            this.$toast.center('余额不能为空');
          } else if (res.code === 901) {
            this.$toast.center('余额不足');
          } else if (res.code === 200) {
            this.$toast.center('提现成功，稍后请查看支付宝！')
          }
        })
      },
      keydownDelete(e) {
        if(e.target.value === '￥') {
          e.preventDefault();
        }
      },
      //限制输入数据格式（有￥符号，不能将input类型设置为number）
      //小数位有两位数不能输入，可删除，可左右移动光标；不能删除￥符号； 只能输入一个.（点）符号； 不能输入除.之外其他非数字字符；不能将光标移动到￥前
      keydown(e) {
        // console.log(e.key, e.keyCode, this.$refs.cashInput.selectionStart, e.keyCode === 37 && this.$refs.cashInput.selectionStart === 1)
        // 8 => 删除键 || 110,190 => . || 48 - 57 => '0 - 9' || 37 => 左方向键 39 => 右
        let value = e.target.value;
        if(
          (e.keyCode !== 8 && e.keyCode !== 37 && e.keyCode !== 39 && /\.\d{2}/.test( value.substring(1) )) ||
          (e.keyCode === 8 && value === '￥') ||
          ((e.keyCode === 190 || e.keyCode === 110) && /\./.test(value)) ||
          // (e.key.length === 1 && /[a-zA-Z]/.test(e.key)) ||
          (e.key.length === 1 && /[^.\d]/.test(e.key)) ||
          (e.keyCode === 37 && this.$refs.cashInput.selectionStart === 1)
        ) {
          e.preventDefault();
        }
      }
    },
    created () {
      vm = this
    }
  }
  function coinValidate (value, len) {
    return new RegExp(`\.\\d{${len}}`).test(value.substring(1))
  }
</script>

<style scoped lang='scss'>
  @import "../../sass/variables";
  .withdraw{
    .row-head{
      height: 4.40rem;
      text-align: center;
      background: url("../../assets/image/withdraw-bg.png") center top no-repeat;
      background-size: cover;
      .desc{
        padding-top: 0.93rem;
        margin-bottom: 0.67rem;
        font-size: 12px;
        color: #666;
      }
      .num{
        font-size: 0.96rem;
        color: $theme-color;
      }
    }
    .row-alipay{
      display: flex;
      padding-left: $gutter-margin;
      padding-right: $gutter-margin;
      justify-content: space-between;
      align-items: center;
      height: 1.33rem;
      font-size: 14px;
      background-color: #fff;
      .name{
        color: #666;
      }
      .num{
        color: #333;
      }
    }
    .row-withdraw{
      padding: 0.53rem $gutter-margin;
      margin-bottom: 1.33rem;
      background-color: #fff;
      .tip{
        font-size: 12px;
        color: #999;
      }
      .input-group{
        input{
          padding: 0.35rem 0.32rem;
          width: 100%;
          border: 0;
          border-bottom: 1px solid #c2c2c2;
          font-size: 0.91rem;
          text-align: center;
          transition: border-bottom-color .2s;
          &:focus{
            outline: 0;
            border-bottom-color: $form-border-focus-color;
          }
        }
      }
    }
    >.btn{
      padding-top: 0.32rem;
      padding-bottom: 0.32rem;
    }
  }
</style>
