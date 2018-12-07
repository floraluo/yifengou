<template>
  <div class="refresh-module" @touchstart="touchStart($event)" @touchmove="touchMove($event)" @touchend="touchEnd($event)"
      :style="{top: top + 'px'}">
    <header class="pull-refresh">
      <slot name="pull-refresh">
        <div class="tip">
          <i :class="`iconfont ${dropDownStateText[dropDownState].icon}`" v-if="!!onRefresh"></i>
          <span class="text" v-if="!!onRefresh">{{dropDownStateText[dropDownState].text}}</span>
        </div>
      </slot>
    </header>
    <slot></slot>
  </div>
</template>

<script>
  let vm;
  export default {
    name: 'BaseRefresh',
    props: {
      onRefresh: {
        type: Function,
        required: false
      }
    },
    data() {
      return {
        defaultOffset: 50, // 默认高度, 相应的修改.releshMoudle的margin-top和.down-tip, .up-tip, .refresh-tip的height
        top: 0,
        scrollIsToTop: 0,
        startY: 0,
        isDropDown: false, // 是否下拉
        isRefreshing: false, // 是否正在刷新
        dropDownState: 1, // 显示1:下拉刷新, 2:松开刷新, 3:刷新中, 4:刷新完成……
        dropDownStateText: [
          { text: '下拉刷新', icon: 'icon-pull-down'},
          { text: '释放更新', icon: 'icon-pull-up'},
          { text: '更新中...', icon: 'icon-loading'},
          { text: '更新完成', icon: 'icon-done'},
        ],
        timer: null
      }
    },
    methods: {
      touchStart (e) {
        clearInterval(this.timer);
        this.dropDownState = 0;
        this.startY = e.targetTouches[0].pageY;
      },
      touchMove (e) {
        this.scrollIsToTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop; // safari 获取scrollTop用window.pageYOffset
        if (e.targetTouches[0].pageY > this.startY) { // 下拉
          this.isDropDown = true;
          if (this.scrollIsToTop === 0 && !this.isRefreshing) {
            // 拉动的距离
            let diff = e.targetTouches[0].pageY - this.startY - this.scrollIsToTop;
            this.top = Math.pow(diff, 0.8) + (this.dropDownState === 2 ? this.defaultOffset : 0);
            if (this.top >= this.defaultOffset) {
              this.dropDownState = 1;
              e.preventDefault();
            } else {
              this.dropDownState = 0;
              e.preventDefault();
            }
          }
        } else {
          this.isDropDown = false;
          this.dropDownState = 0;
        }
      },
      touchEnd (e) {
        if (this.isDropDown && !this.isRefreshing) {
          if (this.top >= this.defaultOffset) { // do refresh
            this.refresh();
            this.isRefreshing = true;
          } else { // cancel refresh
            this.isRefreshing = false;
            this.isDropDown = false;
            this.dropDownState = 0;
            // this.top = 0;
            slideUp.call(this);
            // slideUp();
          }
        }
      },
      refresh () {
        this.dropDownState = 2;
        this.top = this.defaultOffset;
        if (this.onRefresh) {
          setTimeout(() => {
            this.onRefresh(this.refreshDone);
          }, 500);
        } else {
          setTimeout(() => {
          this.refreshDone();
          }, 1);
        }

      },
      refreshDone () {
        this.isRefreshing = false;
        this.isDropDown = false;
        this.dropDownState = 3;
        // this.top = 0;

        if (this.onRefresh) {
          setTimeout(() => {
            slideUp.call(this);
            // slideUp();
          }, 300);
        } else {
          slideUp.call(this);
        }
      }
    },
    created () {
      vm = this;
      // if (document.querySelector('.down-tip')) {
      //   // 获取不同手机的物理像素（dpr）,以便适配rem
      //   this.defaultOffset = document.querySelector('.down-tip').clientHeight || this.defaultOffset
      // }
    },
    activated () {
      // console.log(vm, '******************8')
    }
  }
  function slideUp () {
    // if (vm.timer) clearInterval(vm.timer);
    // vm.timer = setInterval(() => {
    //   let top = vm.top - vm.top / 10;
    //   vm.top = top > 0.1 ? top : 0
    //   console.log(vm.timer, vm.top)
    //   if (vm.top === 0) {
    //     clearInterval(vm.timer);
    //   }
    // },10)

    if (this.timer) clearInterval(this.timer);
    this.timer = setInterval(() => {
      let top = this.top - this.top / 10;
      this.top = top > 0.1 ? top : 0
      console.log(this.timer, this.top)
      if (this.top === 0) {
        clearInterval(this.timer);
      }
    },10)
  }
</script>

<style scoped lang='scss'>
  $offset: 50px;
  .refresh-module {
    position: relative;
    width: 100%;
    margin-top: -$offset;
    -webkit-overflow-scrolling: touch; /* ios5+ */
  }
  .pull-refresh {
    width: 100%;
    color: #999;
    transition-duration: 200ms;
  }
  .tip {
    display: flex;
    align-items: center;
    justify-content: center;
    height: $offset;
    .iconfont{
      margin-right: 5px;
    }
    .icon-loading{
      animation: rotate 1.5s linear infinite;
    }
  }
  @keyframes rotate {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
