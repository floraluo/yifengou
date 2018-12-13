<template>
  <div>
    <img src="../../assets/image/bind-alipay-bg.png" alt="" ref="testimg" style="display: none">
    <canvas ref="canvas"></canvas>
    <img  alt="" ref="shareImg">
    <div class="btn-group">
      <button class="btn btn-warning btn-round" type="button">分享好友</button>
      <button class="btn btn-default btn-round" type="button" @click="saveImg">保存图片</button>
    </div>
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
    methods: {
      saveImg() {
        wx.downloadImage({
          serverId: '', // 需要下载的图片的服务器端ID，由uploadImage接口获得
          isShowProgressTips: 1, // 默认为1，显示进度提示
          success: function (res) {
            var localId = res.localId; // 返回图片下载后的本地ID
          }
        });
      }
    },
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
.btn-group{
  display: flex;
  > button{
    flex: 1;
    padding-top: 10px;
    padding-bottom: 10px;
    &:first-child{
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    &:last-child{
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
}
</style>
