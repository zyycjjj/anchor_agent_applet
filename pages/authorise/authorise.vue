<template>
	<view class="sq-container">
		<uni-swiper-dot class="dotcontainer" :info="info" :current="current" :mode="mode" :dots-styles="dotsStyles" field="content">
			<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" @change="change">
				<swiper-item v-for="(item, index) in info" :key="index">
					<view class="swiper-item">
						<view class="bg1 bg"><image :src="item.url" mode="aspectFill"></image></view>
						<button class="authorize" type="primary" size="mini" @tap="modalTap" v-if="item.content == 3">授权</button>
					</view>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>
		<view class="modal" v-show="show2">
			<view class="modal_tit">服务协议</view>
			<view class="mod_info">
				本协议为您与本小程序管理者质检所订立的契约，请您仔细阅读。
				本协议内容包括协议正文及已经发布的活将来可能发布的各类规则，所有规则为本协议不可分割的组成部分，与协议正文具有同等法律效力。如您对协议有任何疑问，影响客服咨询。您在同意本协议条款并完成注册程序后，成为本站的正式用户，您点击“同意并继续”按钮后，本协议及生效，对双方阐释约束力，只要您使用本小程序平台服务，本协议既对您产生约束。
				您确认：
				<br />
				本协议条款是处理双方权利义务的根据。 您承诺：
				<br />
				接受并遵守本协议的约定。如果您不同意本协议的约定，您应当立即停止注册程序或停止使用本小程序平台服务。
				<br />
				本小程序有权根据需要不定期的制定，修改本协议或各类规则，在本小程序平台公示并立即生效，不再另行单独通知用户。如您不统一相关变更，应当立即停止使用本小程序平台服务，您继续使用本小程序平台服务的，即表明您接受修订后的协议和规则。
				<br />
				小程序光伏案例者有权根据实时情况调整分成比例，注册用户不能挖其他公会的主播，否则严惩，主播归属权属于本公会，经纪人主要负责招聘主播和主播运营。
				<br />
				注册用户须具有法定的相应权利能力和行为能力的自然人、法人或其他组织，能够独立承担法律责任。您完成注册程序或本小程序平台统一的方式实际使用本平台服务时，即视为您确认自己具备主体资格，能够独立承担法律责任。若因您不具备主体资格，而导致的一切后果，有您以及您的监护人承担。
				<br />
				用户信息的合理使用
				<br />
				1、您同意本小程序平台拥有通过邮件、短信电话等形式，向在本站注册用户发送信息等告知信息的权利。
				<br />
				2、您了解并同意，本小程序有权应国家司法、行政等主管部门的要求，向其提供您在本小程序平台填写的注册信息和交易记录等必要信息。
				<br />
				3、您使用本小程序，需要先注册才可使用，注册时需提供必要个人信息。
				<br />
				4、您担保向本小程序提供的信息正确完整。本校程序在任何时候有权验证您所提供的信息。
				<br />
				5、您使用应用程序或服务，即表示您还同意以下事项
				<br />
				（1）您将妥善保管您的账户而不会泄露这些信息
				<br />
				(2) 您不会将账户转让给任何其他个人或组织
				<br />
				（3）您不会在没有恰当授权的情况下使用其他人的账户
				<br />
				（4）您不会利用本小程序骚扰、妨碍他人或者给他人造成不便；
				<br />
				（5）您不会影响网络的正常运行
				<br />
				（6）当我们提出合理请求时，您会提供任何身份证明 （7）您不会使用不兼容或者未授权的设备使用服务或应用程序
				<br />
				（8）您将遵守自己的国家/地区以及您使用本小程序时所处国家/地区的所有法律
				<br />
				6、您接受本《用户协议》并使用本小程序，即表示您同意：对于因以下事项产生的责任或索赔，您应该给予本公司以赔偿，使其免受损失。
				<br />
				（1）您触犯或违背本《同用户协议》中的任何条款或任何使用的法律法规（无论此处是否提及）
				<br />
				（2）您触犯任何第三方的任何权利
				<br />
				(3) 您使用或滥用本小程序
				<br />
				7、本校程序向您提供的信息、推荐或其他服务仅用作一般参考信息，并不构成要约。
				<br />
				8、本公司将在合理的范围内保证本小程序的正确、最新，但无法保证本小程序没有错误、缺陷、恶意软件和病毒
				<br />
				9、对于因使用本小程序而导致的任何损害，包括由恶意软件、病毒、信息的任何不正确或不完整导致的损害，除非此类损害是由本公司方面故意或重大过失造成的，否则本公司概不负责。
				<br />
				10、在不损害上述内容的情况下并在强制性法律允许的范围内，本公司承担的全部责任不超过500元。
				<br />
				11、在您遵守本用户协议的前提下，本公司向您授予不可转让的、有限的、非排他性的许可：
				<br />
				（1）用于查看、下载和打印本小程序的内容，并仅供非商业性的个人用途
				<br />
				（2）用于查看您访问权限内的人和用户内容，并仅供非商业性的个人用途
				<br />
				12、您不得：
				<br />
				（1）发送垃圾邮件
				<br />
				（2）发送或存储侵权、淫秽、威胁、诽谤等违法信息；
				<br />
				（3）发送或存储包含软件病毒、木马或其他有害的计算机代码、文件、脚本、代理或程序的资料；
				<br />
				（4）阻挠或扰乱本小程序的完整性或性能；
				<br />
				（5）尝试未经授权的访问本小程序或其他相关系统或网络。
				<br />
				（6）其他法律禁止的行为
				<br />
				13、本公司有权随时修改此用户协议，如果在修改后您继续使用本小程序的，是为您同意继续受此《用户协议》的约束。
				<br />
			</view>
			<view class="btn">
				<button type="primary" size="mini" open-type="getUserInfo" @getuserinfo="mpGetUserInfo" v-if="show1">同意并继续</button>
				<button type="primary" size="mini" open-type="openSetting" @opensetting="callback" v-else>重新授权</button>
			</view>
		</view>
	</view>
</template>
<script>
import neilModal from '../../components/neil-modal/neil-modal.vue';
import { request } from '../../utils/request.js';
import uniSwiperdot from '../../components/uni-swiper-dot/uni-swiper-dot.vue';
import uniSection from '../../components/uni-section/uni-section.vue';
export default {
	components: {
		neilModal,
		uniSwiperdot,
		uniSection
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
			show1: true,
			// 用户扫码传递的参数
			pid: '',
			// 轮播图数据
			info: [
				{
					url: 'https://ww1.yunjiexi.club/2020/03/21/bW0EL.png',
					content: '1'
				},
				{
					url: 'https://ww1.yunjiexi.club/2020/03/21/bPi3b.png',
					content: '2'
				},
				{
					url: 'https://ww1.yunjiexi.club/2020/03/21/bPx79.png',
					content: '3'
				}
			],
			dotsStyles: {
				backgroundColor: 'rgba(83, 200, 249,0.3)',
				border: '1px rgba(83, 200, 249,0.3) solid',
				color: '#fff',
				selectedBackgroundColor: 'rgba(83, 200, 249,0.9)',
				selectedBorder: '1px rgba(83, 200, 249,0.9) solid',
				bottom: 100
			},
			current: 0
		};
	},
	onLoad(e) {
		this.pid = Number(uni.getStorageSync('pid'));
	},
	methods: {
		change(e) {
			this.current = e.detail.current;
		},
		callback(e) {
			if (e.detail.authSetting['scope.userInfo']) {
				this.show1 = true;
			}
		},
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
				}
			});
		},
		mpGetUserInfo(result) {
			if (result.detail.errMsg !== 'getUserInfo:ok') {
				//用户点击拒绝授权，跳转到设置页，引导用户授权
				this.show1 = false;
				return;
			}
			this.userInfo = result.detail.userInfo;
			const that = this;
			uni.login({
				provider: 'weixin',
				success: function(loginRes) {
					uni.setStorageSync('code', loginRes.code);
					uni.setStorageSync('pid', Number(uni.getStorageSync('pid')));
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
							country: that.userInfo.country,
							// 注意this指向
							pid: that.pid
						},
						method: 'POST'
					}).then(res => {
						console.log(res);
						if (res.data.code != 1) {
							uni.showModal({
								title: res.data.errMsg,
								showCancel: false
							});
						} else {
							uni.showModal({
								title: res.data.errMsg,
								showCancel: false
							});
							// uni.setStorageSync('token', res.data.userinfo.token)
							uni.setStorageSync('token', res.data.data.userinfo.token);
							uni.setStorageSync('login', res.data.data.userinfo);
							console.log(res.data.data.userinfo);
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
	.dotcontainer {
		height: 100px;
		width: 100px;
	}
}
.swiper {
	height: 1000upx;
}
.swiper-item {
	display: block;
	height: 100%;
	/* text-align: center; */
	position: relative;
	.bg {
		height: 100%;
		width: 100%;
		// background-color: red;
		image {
			width: 80%;
			height: 110%;
			margin: 0 auto;
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			top: -10%;
		}
	}
	.bg1 {
		background-image: url(https://imgchr.com/i/8JigC4);
	}
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
	bottom: 30px;
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
	border: 1rpx solid red;
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
		color: #DE794D;
		font-size: 18px;
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
button {
	border-radius: 100px;
	background: red;
}
</style>
