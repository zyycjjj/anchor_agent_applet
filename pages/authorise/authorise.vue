<template>
	<view class="sq-container">
		<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval">
			<swiper-item>
				<view class="swiper-item uni-bg-red">
					<!-- <image src="../../static/sq/sqbg_1.jpg" mode=""></image> -->
					<text>快速录入主播信息</text>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item uni-bg-green"><text>经纪人联系更便捷</text></view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item uni-bg-blue">
					<text>实时查看主播数据</text>
					<button class="authorize" type="primary" size="mini" @tap="modalTap">授权</button>
					<!-- <neil-modal
            :show="show2"
            @close="closeModal('2')"
            :show-cancel="false"
            title="服务协议"
            content="这里是协议这里是协议这里是协议这里是协议这里是协议这里是协议这里是协议这里是协议这里是协议这里是协议这里是协议这里是协议这里是协议这里是协议这里是协议这里是协议这里是协议这里是协议这里是协议这里是协议这里是协议这里是协议这里是协议这里是协议这里是协议这里是协议这里是协议这里是协议" @confirm="getuserinfo"
          ></neil-modal> -->
					<view class="modal" v-show="show2">
						<view class="modal_tit">服务协议</view>
						<view class="mod_info">
							本协议为您与本小程序管理者质检所订立的契约，请您仔细阅读。
							本协议内容包括协议正文及已经发布的活将来可能发布的各类规则，所有规则为本协议不可分割的组成部分，与协议正文具有同等法律效力。如您对协议有任何疑问，影响客服咨询。您在同意本协议条款并完成注册程序后，成为本站的正式用户，您点击“同意并继续”按钮后，本协议及生效，对双方阐释约束力，只要您使用本小程序平台服务，本协议既对您产生约束。
							您确认：
							<br />
							本协议条款是处理双方权利义务的根据。 您承诺
						</view>
						<view class="btn">
							<button type="primary" size="mini" open-type="getUserInfo" @getuserinfo="mpGetUserInfo" v-if="show1">同意并继续</button>
							<button type="primary" size="mini" open-type="openSetting" bindopensetting="callback" v-else>重新授权</button>
						</view>
						
					</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>
<script>
import neilModal from '../../components/neil-modal/neil-modal.vue';
import { request } from '../../utils/request.js';
export default {
	components: {
		neilModal
	},
	data() {
		return {
			background: ['color1', 'color2', 'color3'],
			indicatorDots: true,
			autoplay: false,
			//  用户协议框的显示隐藏
			show2: false,
			// 获取到的用户信息
			userInfo: {},
			show1: true
		};
	},
	onLoad(option) {
		console.log(option)
	},
	methods: {
		modalTap: function(e) {
			//   展示用户协议框
			this.show2 = true;
		},
		cancelAuth() {
			this.show2 = false;
		},
		// 获取用户信息 API 在小程序可直接使用，在 5+App 里面需要先登录才能调用
		getUserInfo() {
			uni.getUserInfo({
				provider: 'weixin',
				success: result => {
					console.log('getUserInfo success', result);
					this.userInfo = result.userInfo;
				},
				fail: error => {
					console.log('getUserInfo fail', error);
					let content = error.errMsg;
					if (~content.indexOf('uni.login')) {
						content = '请在登录页面完成登录操作';
					}
					// #ifndef APP-PLUS
					uni.getSetting({
						success: res => {
							let authStatus = res.authSetting['scope.userInfo'];
							if (!authStatus) {
								uni.showModal({
									title: '授权失败',
									content: 'Hello uni-app需要获取您的用户信息，请在设置界面打开相关权限',
									success: res => {
										if (res.confirm) {
											uni.openSetting();
										}
									}
								});
							} else {
								uni.showModal({
									title: '获取用户信息失败',
									content: '错误原因' + content,
									showCancel: false
								});
							}
						}
					});
					// #endif
					// #ifdef APP-PLUS
					uni.showModal({
						title: '获取用户信息失败',
						content: '错误原因' + content,
						showCancel: false
					});
					// #endif
				}
			});
		},
		mpGetUserInfo(result) {
			if (result.detail.errMsg !== 'getUserInfo:ok') {
				// uni.showModal({
				// 	title: '获取用户信息失败',
				// 	content: '错误原因' + result.detail.errMsg,
				// 	showCancel: false
				// });
				//用户点击拒绝授权，跳转到设置页，引导用户授权
				this.show1 = false
				wx.openSetting({
					success() {
						wx.authorize({
							scope: 'scope.userinfo',
							success() {
								that.getUserInfo();
							}
						});
					}
				});
				return;
			}
			this.userInfo = result.detail.userInfo;
			const that = this;
			uni.login({
				provider: 'weixin',
				success: function(loginRes) {
					uni.setStorageSync('code', loginRes.code);
					that.userInfo.code = loginRes.code;
					uni.setStorageSync('userinfo', result.detail.userInfo);
					// 优化过得代码
					request({
						url: '/api/user/MiniProgramLogin',
						data: {
							code: that.userInfo.code,
							nickname: that.userInfo.nickName,
							headimage: that.userInfo.avatarUrl,
							gender: that.userInfo.gender,
							province: that.userInfo.province,
							city: that.userInfo.city,
							country: that.userInfo.country
						},
						method:'POST',
					}).then(res => {
						if (res.data.code != 1) {
							uni.showModal({
								title: '登录失败',
								showCancel: false
							});
						} else {
							// uni.setStorageSync('token', res.data.userinfo.token)
							uni.setStorageSync('token', res.data.data.userinfo.token);
							uni.setStorageSync('login', res.data.data.userinfo);
							// 登陆成功 跳转到tab首页
							uni.switchTab({
								url: '/pages/anchor/anchor'
							});
						}
					});
				}
			});
		}
	}
};
</script>

<style lang="less" scoped>
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
/* 模态框样式 */
.modal {
	color: #000000;
	width: 60%;
	height: 200px;
	background-color: #ffffff;
	border-radius: 30px;
	padding: 20px;
	position: absolute;
	top: 140px;
	left: 50%;
	transform: translateX(-50%);
	.modal_tit {
		text-align: left;
		height: 25px;
		// line-height: 25px;
		color: #c86f4e;
	}
	.mod_info {
		height: 130px;
		overflow-y: scroll;
	}
	.btn {
		margin-top: 20px;
		text-align: center;
	}
}
</style>
