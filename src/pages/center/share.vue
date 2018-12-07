<template>
  <div>
    <img src="../../assets/image/bind-alipay-bg.png" alt="" ref="testimg" style="display: none">
    <canvas ref="canvas"></canvas>
    <img  alt="" ref="shareImg">
  </div>
</template>

<script>
  import QRCode from 'qrcode';
  let vm;
  export default {
    name: 'share',
    data () {
      return {}
    },
    methods: {},
    created () {
      vm = this;
    },
    mounted () {
      drawImg.call(this);
    }
  }
  function drawImg () {
    let self = this,
      gutterWidth = Number(document.getElementsByTagName('html')[0].style.fontSize.slice(0,-2)) * 0.32 * 2,
      screenWidth = document.body.clientWidth,
      canvas = this.$refs.canvas,
      ctx = canvas.getContext('2d'),
      shareImg = this.$refs.shareImg;

    canvas.width = screenWidth - gutterWidth;
    canvas.height = document.getElementsByTagName('html')[0].clientHeight - 50 - 100
    let img = this.$refs.testimg;

    img.onload = function() {
      ctx.drawImage(img, 0, 0);
      QRCode.toDataURL('12345').then(url => {
        let tempImg = new Image();
        tempImg.src = url;
        tempImg.onload = function () {
          ctx.drawImage(tempImg, 100, 300);
          shareImg.src = canvas.toDataURL();
          self.$refs.canvas.style.display = 'none';
        }
      })
    }
  }
</script>

<style scoped lang='scss'>

</style>
