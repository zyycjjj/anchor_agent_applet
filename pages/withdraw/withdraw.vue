<template>
	<view class="widthdraw">
		<!-- 提现页面 -->
		<!-- 提现数据展示 -->
		<view class="withdrawData">
			<!-- 总收益 -->
			<view class="allmoney">
				<text class='tit' style="color:#6b1b34 ;">总收益（元）</text>
				<text class="moNum" style="color: #FFFFFF;font-size: 50rpx;font-weight: bold;">{{all}}</text>
			</view>
			<view class="moneyEd">
				<view class="laster">
					<text class='tit' style="color:#6b1b34;">前日收益（元）</text>
					<text class="moNum" style="color: #FFFFFF;font-size: 50rpx;font-weight: bold;">{{lasmo}}</text>
				</view>
				<view class="yester">
					<text class='tit' style="color:#6b1b34;">昨日收益（元）</text>
					<text class="moNum" style="color: #FFFFFF;font-size: 50rpx;font-weight: bold;">{{yester}}</text>
				</view>
			</view>
		</view>
		<!-- 可提现金额以及提现按钮 -->
		<view class="getPay">
			<text style="color: #5C5C5C;">可提现 （元）<text style="font-weight: bold;color: #0E0E0E;">{{wimoney}}</text></text>
			<text @tap='getMoney' class="getMoney">提现</text>
			
		</view>
		<view class="wDlist">
			<text class="tit">提现记录</text>
			<view class="" v-if="haslist === 1">
				<text>
					暂无提现记录
				</text>
			</view>
			<view class="" v-else>
				展示提现记录
			</view>
		</view>
		
		<!-- 提现模态框 -->
		<neil-modal :autoClose="true" :showCancel="false" :show="showMonmodal" @close="closeModal()" title="请输入用户名密码" @cancel="bindBtn('cancel')" @confirm="withdraw()">
		    <view class="input-view">
		        <view class="moneyNum">
		            <view>提现金额</view>
		            <input type="number" placeholder="请输入提现金额" :model='form.cashMoney'/>
		        </view>
		    </view>
		</neil-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 总收益
				all:'0',
				// 前日收益
				lasmo:'0',
				// 昨日收益
				yester:'0',
				// 可提现金额
				wimoney:'0',
				// 提现模态框显示隐藏
				showMonmodal:false,
				// 有无提现记录
				haslist: 1,
				// token
				token:'',
				// 要体现的金额
				form:{
					cashMoney:''
				}
			};
		},
		onLoad() {
			this.getToken()
			// 调用获取收益信息的函数
			this.getWithdraw()
		},
		methods:{
			// 获取token
			getToken(){
				this.token = uni.getStorageSync('token');
			},
			getWithdraw(){
				// 获取收益信息，更新数据，绑定数据
				const that = this
				uni.request({
					url:'http://www.vzoyo.com/api/user/cashShow',
					method:'POST',
					header: { token: this.token },
					success(res) {
						console.log(res)
						that.all = res.data.data.total_money
						that.lasmo = res.data.data.before_yester_money
						that.yester = res.data.data.yester_money
						that.wimoney = res.data.data.able_money
					}
				})
			},
			getMoney(){
				this.showMonmodal = true
			},
			closeModal() {
				this.showMonmodal = false
			},
			bindBtn(type) {
				this.showMonmodal = false
			},
			// 关于模态框的函数
			withdraw(){
				const that = this
				uni.request({
					url:'http://www.vzoyo.com/api/user/applyWithdraw',
					method:'POST',
					header: { 
						token: this.token,
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					data:{
						money:that.form.cashMoney
					},
					success(res) {
						console.log(res)
					}
				})
			}
			
		}
	}
</script>

<style lang="less">
.widthdraw{
	.withdrawData{
		width: 100%;
		height: 200px;
		background: url(../../static/widthdraw/bg.png)  fixed no-repeat ;
		background-size: contain;
		// background-image: url(../../static/widthdraw/bg.png);
		display: flex;
		flex-direction: column;
		view{
			.tit{
				font-size: 20rpx;
				margin-bottom: 10rpx;
			}
		}
		.allmoney{
			height: 40%;
			display: flex;
			flex-direction: column;
			padding: 40rpx;
		}
		.moneyEd{
			display: flex;
			justify-content: space-between;
			padding: 40rpx;
			padding-top: 0;
			view{
				display: flex;
				flex-direction: column;
			}
		}
	}
	
	// 可提现部分
	.getPay{
		height: 100rpx;
		width: 100%;
		text-indent: 40rpx;
		display: flex;
		justify-content: space-between;
		position: relative;
		text{
			line-height: 100rpx;
		}
		.getMoney{
			margin-right: 40rpx;
			border: 1px solid red;
			width: 100rpx;
			height: 40rpx;
			line-height:40rpx;
			text-indent: 0;
			text-align: center;
			border-radius: 10000rpx;
			position: absolute;
			top: 50%;
			right: 30rpx;
			transform: translateY(-50%);
		}
	}
	.wDlist{
		background-color:#F5F5F5;
		text-indent:40rpx;
		height: 60rpx;
		line-height: 60rpx;
		view{
			text-align: center;
			text{
				color: #8B8B8B;
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
</style>
