<template>
  <div>
    <div class="order-list" v-if="show">
      <div class="no-order" v-if="!orderList.length">暂无订单</div>
      <div class="order-item" v-for="(item,index) in orderList" :key="index" @click="gotoHistoryDetail(item)">
        <div>{{item.name}}</div>
        <i class="iconfont icon-jiantou" style="transform:rotate(-180deg);color: #999"></i>
      </div>
    </div>
    <tabbar />
  </div>

</template>

<script>
import Tabbar from "../../components/tabbar";

export default {
  data() {
    return {
      show: false,
      orderList: []
    };
  },
  components: {
    Tabbar
  },
  methods: {
    // 获取用户订单信息
    getInfo() {
      this.$get("/order/history").then(res => {
        if (res.data.code === 200) {
          this.show = true;
          this.orderList = res.data.data;
        }
      });
    },

    initView() {
      this.$get("/init").then(res => {
        console.log("init", res);
        if (res.data.code === 200) {
          if (res.data.data.showInvite) {
            this.$router.push("/invite");
          } else {
            this.getInfo();
          }
        }
      });
    },
    gotoHistoryDetail(item) {
      this.$router.push({
        path: "/order/history/detail",
        query: { activity: item.activity, name: item.name }
      });
    }
  },
  mounted() {
    this.initView();
  }
};
</script>

<style scoped lang="scss">
.order-list {
  margin: 10px;
  background: white;
  font-size: 16px;
  margin-bottom: 52px;
  .no-order {
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
  }
  .order-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #ccc;
  }
}
</style>
