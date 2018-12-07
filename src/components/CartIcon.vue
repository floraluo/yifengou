<template>
  <div class="cart" @click="gotoCart" ref="cartIcon" @touchstart="touchStart($event)" @touchmove="touchMove($event)"
       @touchend="touchEnd($event)" :style="`transform: translate(${offset.x}px, ${offset.y}px)`">
    <!-- 悬浮购物车icon -->
    <!--{{this.offset.x}} {{this.offset.y}}-->
    <i class='iconfont icon-cart'></i>
    <span class='count'>{{cartCount}}</span>
  </div>
</template>

<script>
  let vm
  export default {
    name: 'floatCart',
    props: {
      cartCount: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        timer: null,
        iconHeight: 50,
        iconWidth: 50,
        right: 25,
        bottom: 60, //默认图标到底部距离，用于计算y轴上偏移最大量，对应css样式中定位bottom值
        start: { x: 0, y:0 }, //起点位置坐标
        offset: { x: 0, y:0 }, //移动过称坐标上偏移距离
        end: { x: 0, y:0 } //结束位置坐标
      }
    },
    computed: {
      //各方向偏移最大量，以图标初始位置为原点。
      //如果定义在data中，touchend事件中访问不到top、left值
      forbid() {
        return {
          //红色小气泡向右上方偏移了5px
          top: window.screen.height - this.bottom - this.iconHeight - 5,
          right: this.right - 5,
          bottom: 0,
          left: window.screen.width - this.right - this.iconWidth
        }
      }
    },
    methods: {
      gotoCart() {
        this.$router.push('/goods/cart')
      },
      touchStart (e) {
        this.start = {
          x: e.targetTouches[0].pageX,
          y: e.targetTouches[0].pageY
        }
      },
      touchMove (e) {
        e.preventDefault();
        e.stopPropagation();
        let diff = {
          x: e.targetTouches[0].pageX - this.start.x,
          y: e.targetTouches[0].pageY - this.start.y + this.end.y
        }
        // 各方向不超过偏移最大量
        if (diff.x >= this.forbid.right) diff.x = this.forbid.right;
        if (Math.abs(diff.x) > this.forbid.left) diff.x = -this.forbid.left;
        if (diff.y > this.forbid.bottom ) diff.y = this.forbid.bottom;
        if (Math.abs(diff.y) > this.forbid.top) diff.y = -this.forbid.top;

        this.offset = diff;
      },
      touchEnd (e) {
        let speed = {x: 0, y: 0},
          maxY = this.forbid.top - 20, // 最大偏移量
          translate = { // 图标最后位置目标偏移量
            x: 0,
            y: Math.abs(this.offset.y) > maxY ? -maxY : this.offset.y
          };
        this.timer = setInterval(() => {
          if (this.offset.x !== translate.x || this.offset.y !== translate.y){
            speed.x = this.offset.x / 5;
            if (this.offset.y !== translate.y) {
              speed.y = (this.offset.y - translate.y) / 5; //垂直方向只能向上移动，所以y轴移动只考虑超过上边距的情况
            }

            this.offset.x -= speed.x;
            this.offset.y -= speed.y;

            // 逼近1像素值差判断
            if ( (translate.x < this.offset.x && this.offset.x < translate.x + 1) || (translate.x - 1 < this.offset.x && this.offset.x < translate.x) ) {
              this.offset.x = translate.x;
            }
            if ((translate.y < this.offset.y && this.offset.y < translate.y + 1) || translate.y - 1 < this.offset.y && this.offset.y < translate.y) {
              this.offset.y = translate.y;
            }
          } else {
            clearInterval(this.timer);
            this.end = this.offset;
          }
        },10)
      }
    },
    created () {
      vm = this
    }
  }
</script>

<style scoped lang='scss'>
  @import "../sass/variables";
  .cart {
    z-index: 100;
    position: fixed;
    bottom: 60px;
    right: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.7);
    .iconfont {
      color: white;
      font-size: 20px;
    }
    .count {
      position: absolute;
      top: -5px;
      right: -5px;
      display: block;
      width: 25px;
      height: 25px;
      border-radius: 50%;
      line-height: 25px;
      font-size: 14px;
      color: #fff;
      background-color: $theme-color;
      text-align: center;
    }
  }
</style>
