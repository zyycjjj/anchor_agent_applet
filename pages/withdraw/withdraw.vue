<template>
	<view class="widthdraw">
		<!-- 提现页面 -->
		<!-- 提现数据展示 -->
		<view class="withdrawData">
			<!-- 总收益 -->
			<view class="allmoney">
				<text class="tit" style="color:#6b1b34 ;">总收益（元）</text>
				<text class="moNum" style="color: #FFFFFF;font-size: 50rpx;font-weight: bold;">{{ all }}</text>
			</view>
			<view class="moneyEd">
				<view class="laster">
					<text class="tit" style="color:#6b1b34;">前日收益（元）</text>
					<text class="moNum" style="color: #FFFFFF;font-size: 50rpx;font-weight: bold;">{{ lasmo }}</text>
				</view>
				<view class="yester">
					<text class="tit" style="color:#6b1b34;">昨日收益（元）</text>
					<text class="moNum" style="color: #FFFFFF;font-size: 50rpx;font-weight: bold;">{{ yester }}</text>
				</view>
			</view>
		</view>
		<!-- 可提现金额以及提现按钮 -->
		<view class="getPay">
			<view style="color: #5C5C5C;float: left;">
				可提现 （元）
				<text style="font-weight: bold;color: #0E0E0E;">{{ wimoney }}</text>
			</view>
			<text @tap="getMoney" class="getMoney">提现</text>
			<text @tap="enrollCard" class="enrollCard">登记信息</text>
		</view>
		<view class="wDlist">
			<view class="tit">提现记录</view>
			<view class="" v-if="haslist === 1"><text>暂无提现记录</text></view>
			<view class="widthdrawlist" v-else>
				<view class="title">
					<view class="createtime">提现时间</view>
					<view class="money">提现金额</view>
					<view class="status">打款时间</view>
				</view>
				<view class="" v-for="item in widthdrawList" :key="item.createtime">
					<view class="widthdrawlistItem">
						<view class="">
							<text class="createtime">{{ item.createtime_text }}</text>
						</view>
						<view class="moneycontainer">
							<text class="money">{{ item.money }}</text>
						</view>
						<view class="statuscontainer">
							<text class="status" v-if="item.status != 0">{{ item.transfertime_text }}</text>
							<uni-tag v-else text="尚未打款" type="warning" :inverted="true" :circle="true" size="small" />
						</view>
					</view>
				</view>
				<!-- 放一个分页组件 -->
				<view class="pagenation">
					<button
						type="primary"
						:disabled="hasprepage"
						@tap="getPrepage"
						size="mini"
						plain="true"
						style="float: left;margin-left: 50rpx;margin-top: 20rpx;font-size: 10px;"
					>
						上一页
					</button>
					<button
						type="primary"
						:disabled="hasNextpage"
						@tap="getNextpage"
						size="mini"
						plain="true"
						style="float: right;margin-right: 50rpx;margin-top: 16rpx;font-size:10px;"
					>
						下一页
					</button>
				</view>
			</view>
		</view>

		<!-- 提现模态框 -->
		<neil-modal :autoClose="true" :showCancel="false" :show="showMonmodal" @close="closeModal()" title="请输入提现金额" @confirm="withdraw()">
			<view class="input-view">
				<view class="moneyNum">
					<view>提现金额</view>
					<input type="digit" placeholder="请输入提现金额" v-model="form.cashMoney" />
				</view>
			</view>
		</neil-modal>
		<!-- 登记真实信息的模态框 -->
		<neil-modal :autoClose="true" :showCancel="false" :show="enroll" @close="closeModal1()" title="请输入真实信息" @confirm="enrollInfo()">
			<view class="input-view">
				<view class="moneyNum">
					<view>真实姓名</view>
					<input placeholder="请输入真实姓名" v-model="enrollForm.real_name" />
				</view>
				<view class="moneyNum">
					<view>银行卡号</view>
					<input type="number" placeholder="请输入银行卡号" v-model="enrollForm.bank_card_number" />
				</view>
			</view>
		</neil-modal>
	</view>
</template>

<script>
import unitag from '../../components/uni-tag/uni-tag.vue';
import uniSection from '../../components/uni-section/uni-section.vue';
import { request } from '../../utils/request.js';
export default {
	components: { unitag, uniSection },
	data() {
		return {
			// 总收益
			all: '0',
			// 前日收益
			lasmo: '0',
			// 昨日收益
			yester: '0',
			// 可提现金额
			wimoney: '0',
			// 提现模态框显示隐藏
			showMonmodal: false,
			// 有无提现记录 0有 1无
			haslist: 1,
			// token
			token: '',
			// 要提现的金额
			form: {
				cashMoney: ''
			},
			// 提现记录
			widthdrawList: [],
			// 提现记录页码
			page: 1,
			// 是否有上一页
			hasprepage: true,
			// 是否有下一页
			hasNextpage: true,
			// 添加银行卡信息模态框的显示隐藏
			enroll: false,
			// 待添加的银行卡相关真实信息
			enrollForm: {}
		};
	},
	// 设置分享信息
	onShareAppMessage(res) {
		let pid = JSON.parse(uni.getStorageSync('login')).user_id;
		return {
			title: '分享标题',
			path: `/pages/anchor/anchor?pid=${pid}`,
			imgUrl: 'https://ww1.yunjiexi.club/2020/03/18/GwFBk.png'
		};
	},
	mounted() {
		this.getToken();
		// 调用获取收益信息的函数
		this.getWithdraw();
		// 获取经纪人提现记录
		this.getWithdrawList();
	},
	methods: {
		// 登记信息模态框的显示
		enrollCard() {
			this.enroll = true;
		},
		// 提交银行卡信息
		enrollInfo() {
			const that = this;
			request({
				url: '/api/user/withdrawInfo',
				data: this.enrollForm,
				method: 'POST'
			})
				.then(res => {
					if (res.data.code == 1) {
						uni.showToast({
							title: '信息登记成功，您可以继续提现',
							icon: 'success'
						});
						this.enrollForm = {};
						this.enroll = false;
					} else {
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						});
						this.enrollForm = {};
						this.enroll = false;
					}
				})
				.catch(err => {
					console.log(err);
				});
		},
		// 获取经纪人提现记录
		getWithdrawList() {
			const that = this;
			request({
				url: '/api/user/withdrawList',
				data: { page: that.page }
			}).then(res => {
				if (res.data.data.lists) {
					that.haslist = 0;
				}
				res.data.data.lists.map(item => {
					item.createtime_text = item.createtime_text.slice(0, 10);
				});
				that.widthdrawList = res.data.data.lists;
				// 判断是否有下一页上一页
				if (res.data.data.has_next == 0) {
					this.hasNextpage = true;
				} else {
					this.hasNextpage = false;
				}
				if (this.page > 1) {
					this.hasprepage = false;
				} else {
					this.hasprepage = true;
				}
			});
		},
		// 跳转上一页列表
		getPrepage() {
			this.page = this.page - 1;
			this.getWithdrawList();
		},
		// 下一页列表
		getNextpage() {
			this.page = this.page + 1;
			this.getWithdrawList();
		},
		// 获取token
		getToken() {
			this.token = uni.getStorageSync('token');
		},
		getWithdraw() {
			// 获取收益信息，更新数据，绑定数据
			const that = this;
			request({
				url: '/api/user/cashShow',
				method: 'POST'
			}).then(res => {
				that.all = res.data.data.total_money;
				that.lasmo = res.data.data.before_yester_money;
				that.yester = res.data.data.yester_money;
				that.wimoney = res.data.data.able_money;
			});
		},
		// /提现模态框的显示隐藏
		getMoney() {
			this.showMonmodal = true;
		},
		closeModal() {
			this.showMonmodal = false;
		},
		closeModal1() {
			this.enroll = false;
		},
		// 关于模态框的函数
		withdraw() {
			const that = this;
			if (that.form.cashMoney <= that.wimoney) {
				request({
					url: '/api/user/applyWithdraw',
					method: 'POST',
					data: {
						money: that.form.cashMoney
					}
				}).then(res => {
					if (res.code !== 1) {
						console.log(res.data.msg);
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						});
						that.form.cashMoney = '';
						this.getWithdraw();
						this.getWithdrawList();
					} else {
						console.log(res.data.msg);
						that.form.cashMoney = '';
						uni.showToast({
							title: res.data.msg,
							icon: 'success'
						});
						this.getWithdraw();
						this.getWithdrawList();
					}
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
.widthdraw {
	height: 100%;
	.withdrawData {
		width: 100%;
		height: 25%;
		background: url('https://ww1.yunjiexi.club/2020/03/23/bszdU.png');
		background-size: cover;
		display: flex;
		flex-direction: column;
		view {
			.tit {
				font-size: 22rpx;
				margin-bottom: 10rpx;
			}
		}
		.allmoney {
			height: 40%;
			display: flex;
			flex-direction: column;
			padding: 20rpx 40rpx;
		}
		.moneyEd {
			display: flex;
			justify-content: space-between;
			padding: 0 40rpx;
			padding-top: 0;
			view {
				display: flex;
				flex-direction: column;
			}
		}
	}

	// 可提现部分
	.getPay {
		height: 5%;
		width: 100%;
		text-indent: 40rpx;
		display: flex;
		justify-content: space-between;
		position: relative;
		text {
			line-height: 100rpx;
		}
		view {
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
		}
		.getMoney {
			margin-right: 40rpx;
			border: 1px solid red;
			width: 100rpx;
			height: 40rpx;
			line-height: 40rpx;
			text-indent: 0;
			text-align: center;
			border-radius: 10000rpx;
			position: absolute;
			top: 50%;
			right: 30rpx;
			transform: translateY(-50%);
		}
		.enrollCard {
			height: 40rpx;
			line-height: 40rpx;
			text-indent: 0;
			padding: 0 10rpx;
			border: 1px solid red;
			border-radius: 10000rpx;
			position: absolute;
			top: 50%;
			right: 200rpx;
			transform: translateY(-50%);
		}
	}
	.wDlist {
		// background-color: #f5f5f5;
		text-indent: 40rpx;
		height: 68%;
		line-height: 60rpx;
		.tit {
			text-align: left;
			background-color: #f5f5f5;
		}
		view {
			view {
				text-align: center;
				height: 40rpx;
				text {
					color: #8b8b8b;
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

// 提现记录部分
.widthdrawlist {
	width: 100%;
	.widthdrawlistItem {
		width: 100%;
		text-align: left;
		view {
			width: 40%;
			float: left;
			font-size: 27rpx;
			position: relative;
			padding: 10rpx 0;
			.uni-tag {
				position: absolute;
				left: 40%;
				margin-top: 10rpx;
			}
		}
		.moneycontainer {
			width: 20%;
		}
		.statuscontainer {
			text-indent: 0;
			height: 40rpx;
			padding: 10rpx 0;
			.uni-tag {
				height: 10rpx;
				text-indent: 0;
				line-height: 10rpx;
			}
		}
	}
	.pagenation {
		// display: flex;
		// flex-direction: row;
		// justify-content: space-between;
		button {
			text-indent: 0;
		}
	}
	.title {
		width: 100%;
		text-align: left;
		height: 60rpx;
		view {
			width: 35%;
			float: left;
		}
		.money {
			width: 30%;
		}
	}
}
.neil-modal__footer-right {
	height: 60px;
}
</style>
