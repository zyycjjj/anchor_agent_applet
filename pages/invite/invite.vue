<template>
	<view class="invite">
		<view class="tab">
			<text class="title">经纪人邀请</text>
			<view class="line"></view>
		</view>
		<!-- 邀请广告图 -->
		<view class="img" @tap='getImg'></view>
		<!-- 图片显示邀请码 -->
		<view class="mask" v-show="imageVis">
			<uni-icons @tap='closeimg' type="close" size="25"></uni-icons>
			<image src="../../static/invite/yqimg.jpg" mode=""></image>
			<view class="btn-group">
				<button type="primary" size="mini" @tap='save'>保存相册</button>
				<button type="primary" size="mini">分享</button>
			</view>
		</view>
	</view>
</template>

<script>
import uniIcons from '../../components/uni-icons/uni-icons.vue';
import uniSection from '../../components/uni-section/uni-section.vue';
export default {
	components: { uniIcons, uniSection },
	data() {
		return {
			// 图片显示隐藏
			imageVis: false
		};
	},
	methods:{
		closeimg(){
			this.imageVis = false
		},
		getImg(){
			// 检测二维码地址是否存在，如果不存在，就发请求拿，如果存在，就赋值改地址
			this.imageVis = true
		},
		//点击保存图片
		 save () {
		  let that = this
		  //若二维码未加载完毕，加个动画提高用户体验
		  wx.showToast({
		   icon: 'loading',
		   title: '正在保存图片',
		   duration: 1000
		  })
		  //判断用户是否授权"保存到相册"
		  wx.getSetting({
		   success (res) {
		    //没有权限，发起授权
		    if (!res.authSetting['scope.writePhotosAlbum']) {
		     wx.authorize({
		      scope: 'scope.writePhotosAlbum',
		      success () {//用户允许授权，保存图片到相册
		       that.savePhoto();
		      },
		      fail () {//用户点击拒绝授权，跳转到设置页，引导用户授权
		       wx.openSetting({
		        success () {
		         wx.authorize({
		          scope: 'scope.writePhotosAlbum',
		          success() {
		           that.savePhoto();
		          }
		         })
		        }
		       })
		      }
		     })
		    } else {//用户已授权，保存到相册
		     that.savePhoto()
		    }
		   }
		  })
		 },
		//保存图片到相册，提示保存成功
		 savePhoto() {
		  let that = this
		  wx.downloadFile({
		   url: that.data.imgUrl,
		   success: function (res) {
		    wx.saveImageToPhotosAlbum({
		     filePath: res.tempFilePath,
		     success(res) {
		      wx.showToast({
		       title: '保存成功',
		       icon: "success",
		       duration: 1000
		      })
		     }
		    })
		   }
		  })
		 }
	}
};
</script>

<style lang="less">
.invite {
	height: 100%;
	.tab {
		// width: 100rpx;
		height: 100rpx;
		text-indent: 20rpx;
		.title {
			font-weight: bold;
			line-height: 100rpx;
			font-size: 40rpx;
		}
		.line {
			width: 20%;
			height: 5rpx;
			background-color: red;
			margin-left: 50rpx;
		}
	}
	.img {
		width: 90%;
		height: 300rpx;
		margin: 30rpx auto;
		border-radius: 40rpx;
		background: url(../../static/widthdraw/bg.png)  fixed no-repeat ;
		background-size: contain;
	}
	.mask {
		width: 100%;
		height: 100%;
		position: absolute;
		padding-top: 18%;
		text-align: center;
		top: 0;
		color: #FFFFFF;
		background-color: rgba(0, 0, 0, 0.5);
		image {
			width: 67%;
			height: 70%;
		}
		uni-icons{
			position: absolute;
			top: 145rpx;
			right: 145rpx;
		}
		.btn-group {
			display: flex;
			margin-top: 20rpx;
			// justify-content: space-around;
			button {
				width: 30%;
			}
		}
	}
}
</style>
