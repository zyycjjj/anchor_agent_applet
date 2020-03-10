<template>
	<view class="ranklist">
		<view class="tab">
			<text class="title">昨日提现排行榜</text>
			<view class="line"></view>
		</view>
		<view class="phblb">
			<view class="phb-item" v-for="item in data" :key="item.headimage">
				<!-- 排序 -->
				<text class="index">{{item.rank_id}}</text>
				<!-- 头像 -->
				<image class="avatar" :src="item.headimage" mode=""></image>
				<!-- 昵称 -->
				<text class="nickname">{{ item.nickname }}</text>
				<!-- 提现金额 -->
				<text class="money">
					<text class="getmoney" style="color: red;margin-right: 10rpx;font-weight: bold;">{{ item.money }}</text>
					元
				</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 传递过来的排行榜数组
			data: []
		};
	},
	onLoad(e) {
		if (e.data) {
			this.data = JSON.parse(decodeURIComponent(e.data));
			// this.data = JSON.parse(decodeURIComponent(e.data))
			console.log(this.data);
		}
	}
};
</script>

<style lang="less">
.ranklist {
	padding: 0 10px;
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
			margin-left: 70rpx;
		}
	}
	.phblb {
		margin-top: 10rpx;
		.phb-item {
			border-bottom: 1rpx solid #cccccc;
			position: relative;
			line-height: 130rpx;
			.avatar {
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
				position: absolute;
				top: 50%;
				left: 50rpx;
				transform: translateY(-50%);
			}
			.nickname {
				margin-left: 180rpx;
				font-weight: bold;
			}
			.money {
				float: right;
			}
		}
	}
}
</style>
