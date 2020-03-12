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
			<uni-icons @tap="closeimg" type="close" size="25"></uni-icons>
			<image :src="imgUrl" mode="" @tap="preview"></image>
			<view class="btn-group">
				<button type="primary" size="mini" @tap="save">保存相册</button>
				<button type="primary" size="mini" open-type="share">分享</button>
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
			providerList: []
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
				current: this.imgUrl, // 当前显示图片的http链接
				urls: [this.imgUrl] // 需要预览的图片http链接列表
			});
		},
		share(e) {
			uni.share({
				provider: 'weixin',
				scene: 'WXSceneSession',
				type: 2,
				imageUrl: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png',
				success: function(res) {
					console.log('success:' + JSON.stringify(res));
				},
				fail: function(err) {
					console.log(err);
				}
			});
		},
		closeimg() {
			this.imageVis = false;
		},
		getImg() {
			// 检测二维码地址是否存在，如果不存在，就发请求拿，如果存在，就赋值改地址
			this.imgUrl = uni.getStorageSync('login').spread_code;
			console.log(uni.getStorageSync('login'));
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
								that.savePhoto();
							},
							fail() {
								//用户点击拒绝授权，跳转到设置页，引导用户授权
								wx.openSetting({
									success() {
										wx.authorize({
											scope: 'scope.writePhotosAlbum',
											success() {
												that.savePhoto();
											}
										});
									}
								});
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
					wx.saveImageToPhotosAlbum({
						filePath: res.tempFilePath,
						success(res) {
							console.log(res);
							wx.showToast({
								title: '保存成功',
								icon: 'success',
								duration: 1000
							});
							that.imageVis = false;
						}
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
		height: 300rpx;
		margin: 30rpx auto;
		border-radius: 40rpx;
		background: url(../../static/widthdraw/bg.png) fixed no-repeat;
		background-size: contain;
	}
	.mask {
		width: 100%;
		height: 100%;
		position: absolute;
		padding-top: 18%;
		text-align: center;
		top: 0;
		color: #ffffff;
		background-color: rgba(0, 0, 0, 0.5);
		image {
			width: 200px;
			height: 200px;
		}
		uni-icons {
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
