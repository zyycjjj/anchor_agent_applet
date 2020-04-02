<template>
	<view class="mine">
		<!-- 头像区域 -->
		<view class="ownInfo">
			<view class="avatar"><image :src="userinfo.avatarUrl" mode=""></image></view>
			<view class="info">
				<view class="nickname">{{ userinfo.nickName }}</view>
				<view class="ancNum">主播数： {{ num }} 人</view>
			</view>
		</view>
		<!-- 收益展示卡片 -->
		<view class="widthdraw">
			<view class="allmoney">
				<view>总收益（元）</view>
				<view class="all">{{ all }}</view>
			</view>
			<view class="can">
				<view>可提现（元）</view>
				<view class="could">{{ ablemoney }}</view>
			</view>
			<view class="btn"><button type="primary" size="mini" plain="true" @tap="getMoney">提现</button></view>
		</view>
		<!-- 功能列表 -->
		<view class="list">
			<ul>
				<li>
					<navigator url="../anchor/anchor" open-type="switchTab" hover-class="other-navigator-hover">
						<uni-icons class="tit iconfont icon-bingtu"></uni-icons>
						<text>我的主播</text>
						<uni-icons class="rig iconfont icon-iconfontyoujiantou-copy"></uni-icons>
					</navigator>
				</li>
				<li>
					<navigator url="../withdraw/withdraw" open-type="switchTab" hover-class="other-navigator-hover">
						<uni-icons class="tit iconfont icon-edu-biji"></uni-icons>
						<text>提现记录</text>
						<uni-icons class="rig iconfont icon-iconfontyoujiantou-copy"></uni-icons>
					</navigator>
				</li>
				<li>
					<navigator url="javascript:void(0)" open-type="switchTab" hover-class="other-navigator-hover" @click="showContract">
						<uni-icons class="tit iconfont icon-edu-biji"></uni-icons>
						<text>合同签署</text>
						<uni-icons class="rig iconfont icon-iconfontyoujiantou-copy"></uni-icons>
					</navigator>
				</li>
				<li>
					<navigator open-type="contact">
						<uni-icons class="tit iconfont icon-erji"></uni-icons>
						<text>我的客服</text>
						<!-- <text open-type="contact" bindcontact="handleContact" size="mini">我的客服</text> -->
						<button open-type="contact" bindcontact="handleContact" size="mini"></button>
						<uni-icons class="rig iconfont icon-iconfontyoujiantou-copy"></uni-icons>
					</navigator>
				</li>
				<li>
					<navigator url="javascript:void(0)" hover-class="navigator-hover">
						<uni-icons class="tit iconfont icon-bangzhuzhongxin"></uni-icons>
						<text>帮助中心</text>
						<uni-icons class="rig iconfont icon-iconfontyoujiantou-copy"></uni-icons>
					</navigator>
				</li>
			</ul>
		</view>

		<!-- 提现模态框 -->
		<!-- 提现模态框 -->
		<neil-modal :autoClose="true" :showCancel="false" :show="showMonmodal" @close="closeModal()" title="请输入提现金额" @confirm="withdraw()">
			<view class="input-view">
				<view class="" style="border-bottom: 0.1px solid #CCCCCC;padding:10rpx"><text>如您的提现金额超过100元，请先点击提现记录页面登记转账信息</text></view>
				<view class="moneyNum">
					<view>提现金额</view>
					<input type="digit" placeholder="请输入提现金额" v-model="form.cashMoney" />
				</view>
			</view>
		</neil-modal>

		<!-- 合同签署模态框 -->
		<view class="mask" v-show="contractShow">
			<view class="contractmodal">
				<view class="tit">合同签署</view>
				<view class="info">为了保障您的合法权益，建议您前述合同之后再进行合作，合同签署请联系客服</view>
				<view class="btn"><button open-type="contact" type="default" bindcontact="handleContact">联系客服</button></view>
				<i class='iconfont icon-guanbi' @click='closecontract'></i>
			</view>
		</view>
	</view>
</template>

<script>
import uniSection from '../../components/uni-section/uni-section.vue';
import { request } from '../../utils/request.js';
export default {
	components: { uniSection },
	data() {
		return {
			// 微信昵称
			nickname: '',
			center: {},
			// 主播数
			num: '',
			// 总收益
			all: '',
			// 可提现金额
			ablemoney: '',
			// 提现模态框的显示隐藏
			showMonmodal: false,
			// 合同签署框的显示隐藏
			contractShow: false,
			// 用户信息
			userinfo: {},
			token: '',
			form: {
				cashMoney: ''
			}
		};
	},
	mounted() {
		this.getToken();
		this.getuserInfo();
		this.getMineinfo();
	},
	onShareAppMessage(res) {
		let pid = JSON.parse(uni.getStorageSync('login')).user_id;
		if (res.from === 'button') {
			// 来自页面内分享按钮
			console.log(res.target);
		}
		return {
			title: '天天提现',
			path: `/pages/anchor/anchor?pid=${pid}`,
			imgUrl: 'https://ww1.yunjiexi.club/2020/03/18/GwFBk.png'
		};
	},
	methods: {
		// 展示合同签署框
		showContract() {
			this.contractShow = true;
		},
		// 关闭
		closecontract() {
			this.contractShow = false;
		},
		// 获取token
		getToken() {
			this.token = uni.getStorageSync('token');
		},
		// 获取用户相关信息
		getMineinfo() {
			const that = this;
			request({
				url: '/api/user/userCenter'
			}).then(res => {
				that.ablemoney = res.data.data.able_money.toFixed(2);
				that.num = res.data.data.anchor_num.toString();
				that.all = Number(res.data.data.money).toFixed(2);
			});
		},
		getuserInfo() {
			uni.getUserInfo({
				provider: 'weixin',
				success: result => {
					this.userinfo = result.userInfo;
				},
				fail: error => {
					uni.reLaunch({
						url: '/pages/authorise/authorise'
					});
				}
			});
		},
		getMoney() {
			this.showMonmodal = true;
		},
		handleContact(e) {
			console.log(e.detail.path);
			console.log(e.detail.query);
		},
		closeModal() {
			this.showMonmodal = false;
		},
		// 关于模态框的函数
		withdraw() {
			const that = this;
			console.log(that.form.cashMoney);
			console.log(that.ablemoney);
			console.log(that.form.cashMoney <= that.ablemoney);
			if (that.form.cashMoney <= that.ablemoney) {
				request({
					url: '/api/user/applyWithdraw',
					method: 'POST',
					data: {
						money: that.form.cashMoney
					}
				}).then(res => {
					if (res.code == 1) {
						uni.showToast({
							title: res.data.msg,
							icon: 'success'
						});
					} else {
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						});
					}
					that.getMineinfo();
					that.form.cashMoney = '';
				});
			} else {
				uni.showToast({
					title: '超出可提现金额，请重新填写',
					icon: 'none'
				});
				setTimeout(() => {
					this.showMonmodal = true;
				}, 2000);
			}
		}
	}
};
</script>

<style lang="less">
.mine {
	width: 100%;
	height: 100%;
	.ownInfo {
		width: 100%;
		height: 180px;
		background: url('https://ww1.yunjiexi.club/2020/03/23/bszdU.png') no-repeat;
		background-size: cover;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		position: relative;
		.avatar {
			image {
				width: 65px;
				height: 65px;
				border: 5px solid #fff;
				border-radius: 50%;
				position: absolute;
				top: 50px;
				left: 20px;
			}
		}
		.info {
			position: absolute;
			top: 65px;
			left: 110px;
			color: #ffffff;
			display: flex;
			flex-direction: column;
			.nickname {
				font-size: 18px;
				margin-bottom: 5px;
			}
			.ancNum {
				font-size: 12px;
			}
		}
	}
	.widthdraw {
		width: 90%;
		height: 100px;
		background-color: #ffffff;
		border-bottom: 1.8px solid #f4e6e6;
		border-right: 1.5px solid #f4e6e6;
		border-radius: 10px;
		margin: 0 auto;
		position: absolute;
		top: 140px;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		flex-direction: row;
		padding-top: 20px;
		.allmoney,
		.can,
		.btn {
			width: 33%;
			padding: 10px;
			color: #6e6e6e;
			.all,
			.could {
				margin-top: 10px;
				font-weight: bolder;
				color: #000000;
				font-size: 22px;
			}
		}
		.btn {
			padding-left: 20px;
			button {
				margin-top: 15px;
				border-radius: 11111px;
			}
		}
	}
	.list {
		margin-top: 100px;
		ul {
			li {
				text-indent: 20rpx;
				width: 100%;
				font-size: 22px;
				margin-bottom: 25px;
				color: #1b1b1b;
				font-weight: normal;
				position: relative;
				.iconfont {
					vertical-align: text-bottom;
					// margin-right: 10px;
					font-size: 14px;
					// font-weight: bold;
				}
				navigator {
					height: 22px;
					line-height: 22px;
				}
				button {
					width: 100%;
					height: 100%;
					position: absolute;
					top: 0;
					left: 0;
					background-color: rgba(0, 0, 0, 0);
					// display: none;
					// outline: none;
				}
				button::after {
					border: none;
				}
				.tit {
					float: left;
				}
				.rig {
					float: right;
					margin-right: 20px;
				}
				text {
					font-weight: normal;
					font-size: 14px;
					font-weight: bolder;
				}
			}
		}
	}
}
.moneyNum {
	height: 80upx;
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	position: relative;
	padding-left: 30upx;
	box-sizing: border-box;
}
.moneyNum view {
	width: 120upx;
	height: 50upx;
	line-height: 50upx;
	font-size: 28upx;
	color: #333333;
}
.moneyNum input {
	flex: 1;
	height: 50upx;
	line-height: 50upx;
}
.neil-modal__footer-right {
	height: 60px;
}
// 合同签署模态框
.mask {
	width: 100%;
	height: 100%;
	background-color: rgba(0,0,0,.5);
	position: absolute;
	top: 0;
	
	.contractmodal {
		width: 70%;
		height: 400rpx;
		border-radius: 20rpx;
		position: absolute;
		top: 300rpx;
		left: 50%;
		transform: translateX(-50%);
		background-color: #ffffff;
		padding: 0 20px;
		.tit{
			height: 40px;
			line-height: 40px;
			text-indent: 10px;
			font-size: 22px;
			color: blue;
		}
		.info{
			font-size: 16px;
			font-weight: bold;
			width: 100%;
			height: 80px;
			padding: 10px;
		}
		.btn{
			width: 100%;
			height: 60px;
			button{
				font-size: 13px;
				width: 80%;
				background-color: #FF0000;
				color: #FFFFFF;
				border-radius:1000rpx;
			}
		}
		i{
			font-size: 22px;
			color: #FFFFFF;
			position: absolute;
			bottom: -40px;
			left: 50%;
			transform: translateX(-50%);
		}
	}
}
</style>
