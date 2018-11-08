<template>
    <div class="back" @click="goBack(from,idx)"><i class="iconfont icon-jiantou"></i></div>
</template>

<script>
export default {
  props: {
    idx: Number,
    from: String
  },
  data() {
    return {};
  },
  methods: {
    // 点击返回
    goBack(from, index) {
      // 因之前已经保存来源，所以可以返回到来源路由
      this.$router.push({ path: from, query: { idx: index } });
    }
  }
};
</script>

<style>
.back {
    z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 10px;
  left: 10px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.4);
}
.back .iconfont {
  color: white;
  font-size: 20px;
}
</style>