<template>
	<view class="anchor">
		<segmented-control id="tabbar" :values="items" :stickyTop="108" :current="current" @clickItem="onClickItem"></segmented-control>
		<view class="list" id="list">
			<view class="zblist" v-if="current == 0">
				<text class="addanch" @tap="bindClick()">添加主播</text>
				<!-- 根据主播列表数据是否为空来判断是否居中显示添加新主播按钮 -->
				<view>
					<view class="addzb" v-if="haszblist == 0" @tap="bindClick()">
						<i class="iconfont icon-tianjia"></i>
						<text style="color:grey">添加新主播</text>
					</view>
					<view class="showanchlist" v-else>
						<view class="zblistitem">
							<image src="../../static/imgs/mrtx.jpg" mode="" class="avatar"></image>
							<text class="zbname">[未开播]</text>
							<text class="dyid">抖音id:123321323</text>
							<uni-tag text="未开播" type="warning" :inverted="true" :circle="true" size="small" />
						</view>
						<view class="zblistitem">
							<image src="../../static/imgs/mrtx.jpg" mode="" class="avatar"></image>
							<text class="zbname">[未开播]</text>
							<text class="dyid">抖音id:123321323</text>
							<uni-tag text="未开播" type="warning" :inverted="true" :circle="true" size="small" />
						</view>
						<view class="zblistitem">
							<image src="../../static/imgs/mrtx.jpg" mode="" class="avatar"></image>
							<text class="zbname">[未开播]</text>
							<text class="dyid">抖音id:123321323</text>
							<uni-tag text="未开播" type="warning" :inverted="true" :circle="true" size="small" />
						</view>
					</view>
				</view>
				<!-- 排行榜固定底部 -->
				<view class="ranklist">
					<navigator :url="`./ranklist/ranklist?data=` + encodeURIComponent(JSON.stringify(ranklist))">
						<view class="phbtag"><uni-tag class="phbut" text="排行榜" type="warning" size="small"></uni-tag></view>
					</navigator>
					<view class="notice">
						<uni-notice-bar
							:show-icon="true"
							:scrollable="true"
							:single="true"
							text="uni-app 1.6版正式发布，开发一次，同时发布iOS、Android、H5、微信小程序、支付宝小程序、百度小程序、头条小程序等7大平台。"
						/>
					</view>
				</view>
			</view>

			<!-- 主播数据 -->
			<view class="zblist" v-else>
				<!-- 时间选择器 -->
				<timeSelector class='picktime' showType="date" @btnConfirm="btnConfirm" @btnCancel="btnCancel" beginDate="2019-12-01" endDate="2020-03-05">
					<view class="box-time">
						{{ time }}
						<uni-icons class="iconfont icon-rili" style="color: red;margin-left: 5rpx;"></uni-icons>
					</view>
				</timeSelector>
				<!-- 根据主播数据是否为空来判断是否居中显示添加新主播按钮 -->
				<view class="addzb" @tap="bindClick()">
					<i class="iconfont icon-tianjia"></i>
					<text style="color:grey">添加新主播</text>
				</view>
			</view>

			<!-- 添加主播信息模态框 -->
			<neil-modal :show="show4" :autoClose="true" :showCancel="false" @close="closeModal" title="新主播信息" @cancel="bindBtn('cancel')" @confirm="addzbinfo()">
				<view class="input-view">
					<view class="mtk-input input-name">
						<view>抖音账号</view>
						<input type="text" placeholder="请输入抖音号" />
					</view>
					<view class="mtk-input input-password">
						<view>真实姓名</view>
						<input type="text" placeholder="请输入真实姓名" />
					</view>
					<view class="mtk-input input-password">
						<view>手机号码</view>
						<input type="text" number placeholder="请输入手机号码" />
					</view>
					<view class="mtk-input input-password">
						<view>分账比例</view>
						<input type="text" placeholder="45%+5%" disabled />
					</view>
				</view>
			</neil-modal>
		</view>
	</view>
</template>

<script>
import segmentedControl from '../components/tabbar-own/tabbar-own.vue';
import neilModal from '../../components/neil-modal/neil-modal.vue';
import uniTag from '../../components/uni-tag/uni-tag.vue';
import uniSection from '../../components/uni-section/uni-section.vue';
import uniNoticebar from '../../components/uni-notice-bar/uni-notice-bar.vue';
import timeSelector from '../../components/wing-time-selector/wing-time-selector.vue';
export default {
	components: {
		segmentedControl,
		neilModal,
		uniTag,
		uniSection,
		uniNoticebar,
		timeSelector
	},
	beforeCreate(){
		console.log(页面创建前)
	},
	data() {
		return {
			// tab选项卡信息
			items: ['主播列表', '主播数据'],
			current: 0,
			// 添加主播模态框是否显示
			show4: false,
			// 主播列表信息
			zblist: [],
			// 是否有主播列表
			haszblist: 1,
			// 主播数据信息
			zbdata: [],
			// 是否有主播收益数据
			haszbdata: 1,
			// 排行榜信息
			ranklist: [123],
			title: '当前选择器',
			time: new Date().toLocaleDateString(),
			// 查询收益的起止时间
			beginDate:'',
			endDate:''
		};
	},
	onLoad() {
		this.getZblist();
		this.getZbdata();
	},
	methods: {
		// 获取主播列表信息
		getZblist() {
			console.log('获取主播列表信息');
			// 获取的返回值如果有 就把haszblist赋值为1，否则赋值为0
		},
		// 获取主播收益数据
		getZbdata() {
			console.log('获取主播收益信息');
		},
		// 获取排行榜数据
		getRanklist() {
			console.log('获取排行榜数据');
		},
		// 点击跳转到排行榜列表页
		navagateto() {
			uni.navigateTo({
				url: '`./ranklist/ranklist?`+encodeURIComponent(JSON.stringify(this.ranklist))'
			});
		},
		/**
		 * 点击segmentedControl 事件回调
		 */
		onClickItem(index) {
			if (this.current !== index) {
				this.current = index;
			}
		},
		// 点击添加新主播，调出模态框
		addzb() {
			// 添加
			console.log('添加了');
			this.iShow = true;
		},
		// 关于模态框的函数
		bindClick() {
			this.show4 = true;
		},
		closeModal() {
			this.show4 = false;
			console.log(this.show4);
		},
		bindBtn(type) {
			this.show4 = false;
		},
		addzbinfo() {
			// 发请求提交主播信息
			console.log('提交');
			// 先做表单校验，再发请求提交
			// 提交后重新获取主播列表数据
			this.show4 = false;
		},
		// 时间选择器相关函数
		btnConfirm(e) {
			console.log('确定时间为：', e);
			this.time = e.value;
			this.title = '当前选择时间';
		},
		btnCancel() {
			console.log('取消时间：');
		}
	}
};
</script>

<style lang="less">
.anchor {
	height: 100%;
	width: 100%;
	position: relative;
	.addzb {
		color: red;
		text-align: center;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		line-height: 1;
		.icon-tianjia {
			font-size: 100px;
		}
	}
	.neil-modal__header {
		color: red;
		font-weight: bolder;
		line-height: 2.25;
		text-align: left;
		letter-spacing: 2px;
	}
	.mtk-input {
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

	.mtk-input::after {
		content: ' ';
		position: absolute;
		left: 30upx;
		bottom: 0;
		right: 0;
		height: 1px;
		border-top: 1px solid #e5e5e5;
		transform-origin: 0 0;
		transform: scaleY(0.5);
	}

	.mtk-input view {
		width: 120upx;
		height: 50upx;
		line-height: 50upx;
		font-size: 28upx;
		color: #333333;
		margin: 20rpx;
	}

	.mtk-input input {
		flex: 1;
		height: 50upx;
		line-height: 50upx;
	}
}
.neil-modal__footer-left,
.neil-modal__footer-right {
	line-height: 120rpx;
}
timeSelector{
	position: absolute;
	top: 0;
	right: 0;
}
.zblistitem {
	border-bottom: 1px solid #cccccc;
	height: 5em;
	position: relative;
	text-indent: 70px;
	padding-top: 10px;
	.avatar {
		width: 50px;
		height: 50px;
		position: absolute;
		left: 5px;
		top: 50%;
		transform: translateY(-50%);
		border: 1px solid #cccccc;
		border-radius: 50%;
	}
	.zbname {
		font-weight: bolder;
	}
	.dyid {
		display: block;
		margin-top: 15rpx;
		font-size: 23rpx;
		color: grey;
	}
	.uni-tag {
		position: absolute;
		right: 0;
		top: 50%;
		right: 10rpx;
		transform: translateY(-50%);
		text-indent: 0;
	}
}
.addanch {
	position: absolute;
	right: 10rpx;
	top: 20rpx;
	color: brown;
}
// 底部排行榜
.ranklist {
	width: 100%;
	position: fixed;
	bottom: 0;
	left: 0;
	.phbtag {
		width: 15%;
		float: left;
		margin-left: 2%;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
	}
	.phbut {
		width: 20%;
		vertical-align: middle;
	}
	.notice {
		width: 80%;
		float: right;
		.uni-noticebar {
			margin-bottom: 0;
		}
	}
}
.picktime{
	position: absolute;
	top: 22rpx;
	right: 0;
}
</style>
