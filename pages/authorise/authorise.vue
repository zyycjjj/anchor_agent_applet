<template>
  <view class="sq-container">
    <swiper
      class="swiper"
      :indicator-dots="indicatorDots"
      :autoplay="autoplay"
      :interval="interval"
    >
      <swiper-item>
        <view class="swiper-item uni-bg-red">
          <!-- <image src="../../static/sq/sqbg_1.jpg" mode=""></image> -->
          <text>快速录入主播信息</text>
        </view>
      </swiper-item>
      <swiper-item>
        <view class="swiper-item uni-bg-green">
          <text>经纪人联系更便捷</text>
        </view>
      </swiper-item>
      <swiper-item>
        <view class="swiper-item uni-bg-blue">
          <text>实时查看主播数据</text>
          <button class="authorize" type="primary" size="mini" @tap="modalTap">授权</button>
          <neil-modal
            :show="show2"
            @close="closeModal('2')"
            :show-cancel="false"
            title="服务协议"
            content="这里是协议这里是协议这里是协议这里是协议这里是协议这里是协议这里是协议这里是协议这里是协议这里是协议这里是协议这里是协议这里是协议这里是协议这里是协议这里是协议这里是协议这里是协议这里是协议这里是协议这里是协议这里是协议这里是协议这里是协议这里是协议这里是协议这里是协议这里是协议" @confirm="getuserinfo"
          ></neil-modal>
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>
<script>
import neilModal from "../../components/neil-modal/neil-modal.vue";
export default {
  components: {
    neilModal
  },
  data() {
    return {
      background: ["color1", "color2", "color3"],
      indicatorDots: true,
      autoplay: false,
      //  用户协议框的显示隐藏
      show2: false
    };
  },
  methods: {
    modalTap: function(e) {
	  //   展示用户协议框
	  this.show2 = true
	},
	getuserinfo() {
		console.log('123')
	}
  }
};
</script>

<style scoped>
.sq-container {
  height: 100%;
  width: 100%;
}
.swiper {
  height: 100%;
}
.swiper-item {
  display: block;
  height: 100%;
  /* text-align: center; */
  position: relative;
}
text {
  font-size: 22px;
  text-align: center;
  line-height: 28px;
  color: #000000;
  position: absolute;
  bottom: 150px;
  left: 50%;
  transform: translateX(-50%);
}
.authorize {
  position: absolute;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
}
</style>
