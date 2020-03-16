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
			<!-- <uni-list>
				<uni-icons class="tit iconfont icon-bingtu"></uni-icons>
				我的主播
				<uni-icons class="rig iconfont icon-iconfontyoujiantou-copy"></uni-icons>
			</uni-list>
			<uni-list>
				<uni-icons class="tit iconfont icon-bingtu"></uni-icons>
				我的主播
				<uni-icons class="rig iconfont icon-iconfontyoujiantou-copy"></uni-icons>
			</uni-list> -->
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
					<uni-icons class="tit iconfont icon-erji"></uni-icons>
					<text>我的客服</text>
					<!-- <text open-type="contact" bindcontact="handleContact" size="mini">我的客服</text> -->
					<button open-type="contact" bindcontact="handleContact" size="mini"></button>
					<uni-icons class="rig iconfont icon-iconfontyoujiantou-copy"></uni-icons>
				</li>
				<li>
					<navigator url="" hover-class="navigator-hover">
						<uni-icons class="tit iconfont icon-bangzhuzhongxin"></uni-icons>
						<text>帮助中心</text>
						<uni-icons class="rig iconfont icon-iconfontyoujiantou-copy"></uni-icons>
					</navigator>
				</li>
			</ul>
		</view>

		<!-- 提现模态框 -->
		<!-- 提现模态框 -->
		<neil-modal :autoClose="true" :showCancel="false" :show="showMonmodal" @close="closeModal()" title="请输入提现金额" @cancel="bindBtn('cancel')" @confirm="withdraw()">
			<view class="input-view">
				<view class="" style="border-bottom: 0.1px solid #CCCCCC;padding:10rpx">
					<text>
						如您的提现金额超过100元，请先点击提现记录页面登记转账信息
					</text>
				</view>
				<view class="moneyNum">
					<view>提现金额</view>
					<input type="number" placeholder="请输入提现金额" v-model="form.cashMoney" />
				</view>
			</view>
		</neil-modal>
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
			// 用户信息
			userinfo: {},
			token: '',
			form: {
				cashMoney: ''
			}
		};
	},
	onLoad() {
		this.getToken();
		this.getuserInfo();
	},
	onShow() {
		this.getMineinfo();
	},
	methods: {
		getToken() {
			this.token = uni.getStorageSync('token');
		},
		getMineinfo() {
			const that = this;
			request({
				url: '/api/user/userCenter'
			}).then(res => {
				// if(res.data.data.code == 1){
				that.ablemoney = res.data.data.able_money.toString();
				that.num = res.data.data.anchor_num.toString();
				that.all = res.data.data.money;
				// }
			});
		},
		getuserInfo() {
			this.userinfo = uni.getStorageSync('userinfo');
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
			console.log(that.form.cashMoney)
			console.log(that.ablemoney)
			console.log(that.form.cashMoney <= that.ablemoney)
			if(that.form.cashMoney <= that.ablemoney){
				request({
					url: '/api/user/applyWithdraw',
					method: 'POST',
					data: {
						money: that.form.cashMoney
					}
				}).then(res => {
					if(res.code == 1){
						uni.showToast({
							title:res.data.msg,
							icon:"success"
						})
					}else{
						uni.showToast({
							title:res.data.msg,
							icon:"none"
						})
					}
					that.getMineinfo()
					that.form.cashMoney = ""
				});
			}else{
				uni.showToast({
					title:"超出可提现金额，请重新填写",
					icon:"none"
				})
				setTimeout(()=>{
					this.showMonmodal = true
				},2000)
			}
		}
	}
};
</script>

<style lang="less">
.mine {
	.ownInfo {
		width: 100%;
		height: 180px;
		background: url(../../static/widthdraw/bg.png)  no-repeat;
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
				navigator{
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
.neil-modal__footer-right{
	height: 60px;
}
</style>
