<template>
  <div class="bind">
    <div class="invite_code">
      <div class="tip">
        邀请码<span>qwer</span>
      </div>
    </div>
    <div class="input_info">
      <div class='tip'>收款支付宝
        <span class='text1'>（请在11月30日前完成绑定）</span>
        <span class='text2'>ID: 54355</span>
      </div>
      <div class="form">
        <div class='text'>
          <span class='inputType'>真实姓名</span>
          <input placeholder='输入真实姓名' type='text' />
        </div>
        <div class='text'>
          <span class='inputType'>支付宝账号</span>
          <input placeholder='输入支付宝账号' type="text" />
        </div>
        <div class='text'>
          <span class='inputType'>手机号</span>
          <input placeholder='输入手机号' type="text" />
        </div>
        <div class="save_btn">保存</div>
      </div>
      <div class="warning">
        为了保证您能收到平台补贴金, 请务必确认填写正确。返款时间: 12月21日 - 12月31日
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style>
.bind .invite_code,
.bind .input_info {
  margin: 0 10px 10px;
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
  background-color: #eee;
  border: none;
}
.bind .input_info .form .save_btn{
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: white;
  background: #3f93e6;
  border-radius: 5px;
}
.bind .input_info .warning{
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