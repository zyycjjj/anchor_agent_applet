<template>
	<view class="invite">
		<view class="tab">
			<text class="title">经纪人邀请</text>
			<view class="line"></view>
		</view>
		<!-- 邀请广告图 -->
		<view class="img" @tap="getImg"></view>
		<!-- 图片显示邀请码 -->
		<view class="mask" v-show="imageVis">
			<view class="image">
				<uni-icons @tap="closeimg" type="close" size="25"></uni-icons>
				<image src="../../static/invite/4.png" mode="" @tap="preview"></image>
				<image class="qrcode" :src="imgUrl" mode=""></image>
				<view class="btn-group">
					<button type="primary" size="mini" open-type="openSetting" v-if="show1">保存相册</button>
					<button type="primary" size="mini" @tap="save" v-else>保存相册</button>
					<button type="primary" size="mini" open-type="share">分享</button>
				</view>
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
			imageVis: false,
			// 邀请二维码的地址
			imgUrl: '',
			providerList: [],
			show1: false,
			isDom: true,
			canvasUrl: ''
		};
	},
	onShareAppMessage(res) {
		if (res.from === 'button') {
			// 来自页面内分享按钮
			console.log(res.target);
		}
		return {
			imgUrl: this.imgUrl
		};
	},
	onLoad() {
		uni.getProvider({
			service: 'share',
			success: e => {
				let data = [];
				for (let i = 0; i < e.provider.length; i++) {
					switch (e.provider[i]) {
						case 'weixin':
							data.push({
								name: '分享到微信好友',
								id: 'weixin'
							});
							data.push({
								name: '分享到微信朋友圈',
								id: 'weixin',
								type: 'WXSenceTimeline'
							});
							break;
						case 'qq':
							data.push({
								name: '分享到QQ',
								id: 'qq'
							});
							break;
						default:
							break;
					}
				}
				this.providerList = data;
			},
			fail: e => {
				console.log('获取分享通道失败', e);
			}
		});
	},
	methods: {
		preview() {
			wx.previewImage({
				current: this.canvasUrl, // 当前显示图片的http链接
				urls: [this.canvasUrl] // 需要预览的图片http链接列表
			});
		},
		// share(e) {
		// 	uni.share({
		// 		provider: 'weixin',
		// 		scene: 'WXSceneSession',
		// 		type: 2,
		// 		imageUrl: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png',
		// 		success: function(res) {
		// 			console.log('success:' + JSON.stringify(res));
		// 		},
		// 		fail: function(err) {
		// 			console.log(err);
		// 		}
		// 	});
		// },
		closeimg() {
			this.imageVis = false;
		},
		getImg() {
			this.imgUrl = uni.getStorageSync('login').spread_code;
			this.imageVis = true;
		},
		//点击保存图片
		save() {
			let that = this;
			//若二维码未加载完毕，加个动画提高用户体验
			wx.showToast({
				icon: 'loading',
				title: '正在保存图片',
				duration: 1000
			});
			//判断用户是否授权"保存到相册"
			wx.getSetting({
				success(res) {
					//没有权限，发起授权
					if (!res.authSetting['scope.writePhotosAlbum']) {
						wx.authorize({
							scope: 'scope.writePhotosAlbum',
							success() {
								//用户允许授权，保存图片到相册
								// 生成动态图片保存到相册

								that.savePhoto();
							},
							fail() {
								console.log('用户拒绝授权，跳转到设置页面');
								//用户点击拒绝授权，跳转到设置页，引导用户授权
								that.show1 = true;
								// wx.openSetting({
								// 	success() {
								// 		wx.authorize({
								// 			scope: 'scope.writePhotosAlbum',
								// 			success() {
								// 				that.savePhoto();
								// 			}
								// 		});
								// 	}
								// });
							}
						});
					} else {
						//用户已授权，保存到相册
						that.savePhoto();
					}
				}
			});
		},
		//保存图片到相册，提示保存成功
		savePhoto() {
			let that = this;
			wx.downloadFile({
				url: that.imgUrl,
				success: function(res) {
					console.log(res);
					wx.saveImageToPhotosAlbum({
						filePath: res.tempFilePath,
						success(res) {
							console.log(res);
							uni.showToast({
								title: '保存成功',
								icon: 'success',
								duration: 1000
							});
							that.imageVis = false;
						}
					});
				},
				fail(res) {
					console.log(that.imgUrl);
					console.log(res);
					uni.showToast({
						title: '保存失败',
						icon: 'none'
					});
				}
			});
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
		height: 370rpx;
		margin: 30rpx auto;
		border-radius: 40rpx;
		background: url(https://s1.ax1x.com/2020/03/16/8JudF1.png) no-repeat;
		// background: url(../../static/widthdraw/bg.png) fixed no-repeat;
		background-size: cover;
	}
	.mask {
		width: 100%;
		height: 100%;
		position: absolute;
		text-align: center;
		top: 0;
		color: #ffffff;
		background-color: rgba(0, 0, 0, 0.5);
		.image {
			width: 100%;
			height: 100%;
			padding-top: 10%;
			position: relative;
			image {
				width: 496rpx;
				height: 878rpx;
			}
			.qrcode {
				width: 200rpx;
				height: 200rpx;
				position: absolute;
				bottom: 20%;
				left: 50%;
				transform: translateX(-50%);
			}
			uni-icons {
				position: absolute;
				top: 2%;
				right: 8%;
			}
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
