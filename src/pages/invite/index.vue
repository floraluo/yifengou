<template>
    <div class="invite-code-box">
        <div class="top-img img-box">
            <img src="@/assets/image/icon1.png">
        </div>
        <div class="form">
            <div class='input'>
                <input type='text' v-model="invite" placeholder='请输入邀请码' />
            </div>
            <div class='btn' @click="saveInvite">
                立即抢购
            </div>
        </div>
        <div class="bottom-img img-box">
            <img src="@/assets/image/icon2.png">
        </div>

    </div>
</template>

<script>
export default {
  data() {
    return {
      invite: ""
    };
  },
  methods: {
    saveInvite() {
      this.$get("/invite", { invite: this.invite }).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.$toast.center("绑定成功");
          this.$store.commit("addInvite", this.invite);
          this.$router.push("/");
        } else {
          this.$toast.center(res.data.msg);
        }
      });
    }
  },
  mounted() {
    this.share(this.get2, this.wx);
  }
};
</script>

<style scoped lang="scss">
.invite-code-box {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  flex-direction: column;
  justify-content: space-between;
  background: white;
  .top-img {
    width: 100%;
    height: 120px;
  }
  .bottom-img {
    width: 100%;
    height: 180px;
  }
  .img-box {
    img {
      width: 100%;
      height: 100%;
    }
  }

  .form {
    width: 60%;
    margin: 10px auto;
    .input {
      padding: 10px 0;
      border-bottom: 1px solid #ccc;
      margin: 25px auto 0;
      input {
        outline: none;
        border: none;
      }
    }

    .btn {
      margin: 40px auto;
      background: #ec4e4f;
      color: white;
      font-size: 14px;
      text-align: center;
      border-radius: 3px;
      padding: 9px 0;
    }
  }
}
</style>