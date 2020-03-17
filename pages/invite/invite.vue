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
				<!-- <view>
					<image src="../../static/invite/4.png" mode="" @tap="preview"></image>
					<image class="qrcode" :src="imgUrl" mode=""></image>
				</view> -->
				<view class="wrapper"><canvas style="height: 100%;width: 100%;backgroundColor: #ffffff" canvas-id="firstCanvas"></canvas></view>
				<view class="btn-group">
					<button type="primary" size="mini" open-type="openSetting" v-if="show1">保存相册</button>
					<button type="primary" size="mini" @tap="save" v-else>保存相册</button>
					<button type="primary" size="mini" open-type="share">分享</button>
				</view>
			</view>
		</view>
		<image ref="bg" v-show="false" src="../../static/invite/4.png" mode="" @tap="preview"></image>
		<image ref="code" v-show="false" class="qrcode" :src="imgUrl" mode=""></image>
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
			canvasUrl: '',
			// 海报背景图片地址
			cover: 'https://www.vzoyo.com/uploads/share.png',
			hascanvas: false
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
	methods: {
		preview() {
			wx.previewImage({
				current: this.canvasUrl, // 当前显示图片的http链接
				urls: [this.canvasUrl] // 需要预览的图片http链接列表
			});
		},
		closeimg() {
			this.imageVis = false;
		},
		getImg() {
			const that = this;
			this.imgUrl = uni.getStorageSync('login').spread_code;
			this.imageVis = true;
			if(!that.hascanvas){
				uni.showToast({
					icon: 'loading',
					title: '正在生成海报中',
					duration: 1000
				});
			}
			// 绘制canvas
			let ctx = uni.createCanvasContext('firstCanvas');
			uni.getImageInfo({
				src: that.cover,
				success(res) {
					console.log(res);
					const path = res.path;
					ctx.drawImage(path, 0, 0, uni.upx2px(500), uni.upx2px(878));
					ctx.fillRect(uni.upx2px(165), uni.upx2px(650), uni.upx2px(200), uni.upx2px(200));
					uni.getImageInfo({
						src: that.imgUrl,
						success(res) {
							const path1 = res.path;
							ctx.drawImage(path1, uni.upx2px(165), uni.upx2px(650), uni.upx2px(200), uni.upx2px(200));
							ctx.draw(false, () => {
								uni.canvasToTempFilePath({
									x: 0,
									y: 0,
									canvasId: 'firstCanvas',
									success: function(res) {
										that.canvasUrl = res.tempFilePath;
										console.log(that.canvasUrl)
										that.hascanvas = true
									},
									fail(e) {
										uni.showToast({
											title: '生成海报失败',
											icon: 'none'
										});
									}
								});
							});
						}
					});
				},
				fail(error) {
					console.log(error);
				}
			});
		},
		//点击保存图片
		save() {
			let that = this;
			//若二维码未加载完毕，加个动画提高用户体验
			uni.showToast({
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
				url: that.canvasUrl,
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
			position: relative;
			top: 10%;
			image {
				width: 496rpx;
				height: 878rpx;
			}
			.wrapper {
				width: 496rpx;
				height: 878rpx;
				display: block;
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				top: 0;
			}
			.qrcode {
				width: 200rpx;
				height: 200rpx;
				position: absolute;
				bottom: 22%;
				left: 50%;
				transform: translateX(-50%);
			}
			uni-icons {
				position: absolute;
				top: -5%;
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
			position: absolute;
			width: 100%;
			bottom: 75px;
		}
	}
}
</style>
