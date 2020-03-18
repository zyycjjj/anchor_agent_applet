<template>
	<view class="anchor">
		<segmented-control id="tabbar" :values="items" :stickyTop="108" :current="current" @clickItem="onClickItem" style="width: 100%;"></segmented-control>
		<view class="list" id="list">
			<view class="zblist" v-if="current == 0">
				<text class="addanch" @tap="bindClick()">添加主播</text>
				<!-- 根据主播列表数据是否为空来判断是否居中显示添加新主播按钮 -->
				<view>
					<scroll-view id="tab-bar" class="scroll-h" :scroll-x="true" :show-scrollbar="false" :scroll-into-view="scrollInto" style="overflow: auto hidden;">
						<view class="uni-tab-item" id="1" data-current="all" @click="ontabtap">
							<text class="uni-tab-item-title" :class="tabIndex == index ? 'uni-tab-item-title-active' : ''">全部</text>
						</view>
						<view v-for="(tab, index) in tabBars" :key="tab.platform_id" class="uni-tab-item" :id="tab.platform_id" :data-current="index" @click="ontabtap">
							<text class="uni-tab-item-title" :class="tabIndex == index ? 'uni-tab-item-title-active' : ''">{{ tab.platform_name }}</text>
						</view>
					</scroll-view>
					<view class="addzb" v-if="haszblist == 0" @tap="bindClick()">
						<i class="iconfont icon-tianjia"></i>
						<text style="color:grey">添加新主播</text>
					</view>
					<view class="showanchlist" v-else v-for="item in zblist" :key="item.anchor_id">
						<view class="zblistitem">
							<image :src="item.headimage" mode="" class="avatar"></image>
							<text class="zbname">{{ item.real_name }}</text>
							<text class="dyid">抖音id:{{ item.third_user_id }}</text>
							<uni-tag text="未开播" type="warning" :inverted="true" :circle="true" size="small" v-if="item.live_status == 0" />
							<uni-tag text="已开播" type="warning" :inverted="true" :circle="true" size="small" v-else />
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
							speed="10"
							ref="noticebar"
							:show-icon="true"
							:scrollable="true"
							:single="true"
							:text="rank_string"
							id="noticebar"
							background-color="#ffffff"
						/>
					</view>
				</view>
			</view>

			<!-- 主播数据 -->
			<view class="zblist" v-else>
				<!-- 时间选择器 -->
				<timeSelector class="picktime" showType="date" @btnConfirm="btnConfirm" @btnCancel="btnCancel" beginDate="2019-12-01" :endDate="endDate">
					<view class="box-time">
						{{ time }}
						<uni-icons class="iconfont icon-rili" style="color: red;margin-left: 5rpx;"></uni-icons>
					</view>
				</timeSelector>
				<!-- 根据主播数据是否为空来判断是否居中显示添加新主播按钮 -->
				<view class="addzb" @tap="bindClick()" v-if="haszbdata == 0">
					<i class="iconfont icon-tianjia"></i>
					<text style="color:grey">添加新主播</text>
				</view>
				<view class="zbdata" v-else>
					<view class="tit">
						<view><text>抖音账号</text></view>
						<view><text>真实姓名</text></view>
						<view><text>收益金额</text></view>
						<view><text>印票</text></view>
					</view>
					<view v-for="item in zbdata" :key="item.createtime">
						<view class="zbdataItem">
							<view>
								<text class="third_anchorId">{{ item.third_anchorId }}</text>
							</view>
							<view>
								<text class="anchor_name">{{ item.anchor_name }}</text>
							</view>
							<view>
								<text class="money">{{ item.money }}</text>
							</view>
							<view>
								<text class="ticket">{{ item.ticket }}</text>
							</view>
						</view>
					</view>
				</view>
			</view>

			<!-- 添加主播信息模态框 -->
			<neil-modal :show="show4" :autoClose="true" :showCancel="false" @close="closeModal" title="新主播信息" @cancel="bindBtn('cancel')" @confirm="addzbinfo()">
				<form>
					<view class="input-view">
						<view class="mtk-input input-name">
							<view>抖音账号</view>
							<input type="text" placeholder="请输入抖音号" v-model="anchorInfo.third_user_id" />
						</view>
						<view class="mtk-input input-password">
							<view>真实姓名</view>
							<input type="text" placeholder="请输入真实姓名" v-model="anchorInfo.real_name" />
						</view>
						<view class="mtk-input input-password">
							<view>手机号码</view>
							<input type="text" number placeholder="请输入手机号码" v-model="anchorInfo.mobile" />
						</view>
						<view class="mtk-input input-password">
							<view>分账比例</view>
							<input type="text" placeholder="45%+5%" disabled />
						</view>
					</view>
				</form>
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
import { request } from '../../utils/request.js';
import mediaItem from './news-item.nvue';
export default {
	components: {
		segmentedControl,
		neilModal,
		uniTag,
		uniSection,
		uniNoticebar,
		timeSelector,
		mediaItem
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
			haszblist: 0,
			// 主播收入数据信息
			zbdata: [],
			// 是否有主播收益数据
			haszbdata: 0,
			// 排行榜信息
			ranklist: [],
			title: '当前选择器',
			time: new Date().toLocaleDateString(),
			// 查询收益的起止时间
			beginDate: '',
			endDate: '',
			// 登录的token
			token: '',
			// 添加的主播信息
			anchorInfo: {
				// 添加的账号
				third_user_id: '',
				// 真实姓名
				real_name: '',
				// 手机号
				mobile: ''
			},
			// noticebar文字信息
			rank_string: '',
			// 查询时间
			date: '',
			// 查询页码
			page: '',
			// 直播平台
			tabBars: []
		};
	},
	onLoad(option) {
		this.getToken();
		this.setEnddate();
		this.getPlat();
		if (option.scene) {
			let qrId = decodeURIComponent(option.scene);
			request({
				url: '/api/user/creatRelation',
				data: { pid: qrId }
			}).then(res => {
				if (res.data.code == 1) {
					uni.showToast({
						title: '关系绑定成功',
						icon: 'success'
					});
				}
			});
		}
		if (uni.getStorageSync('ppid')) {
			let pid = Number(uni.getStorageSync('ppid'));
			request({
				url: '/api/user/creatRelation',
				data: { pid: pid }
			}).then(res => {
				if (res.data.code == 1) {
					uni.showToast({
						title: '关系绑定成功',
						icon: 'success'
					});
				}
			});
		}
	},
	onShow() {
		this.getZblist();
		this.getRanklist();
		this.setNoticebar();
		this.getZbdata();
	},
	onShareAppMessage(res) {
		let pid = JSON.parse(uni.getStorageSync('login')).user_id;
		return {
			title: '分享标题',
			path: `/pages/anchor/anchor?pid=${pid}`,
			imgUrl: 'https://ww1.yunjiexi.club/2020/03/18/GwFBk.png'
		};
	},
	methods: {
		getPlat() {
			request({
				url: '/api/platform/lists'
			}).then(res => {
				this.tabBars = res.data.data;
			});
		},
		setEnddate() {
			let endtimeYear = new Date().getFullYear();
			let endtimeMonth = new Date().getMonth() + 1;
			let endtimeDay = new Date().getDate();
			this.endDate = `${endtimeYear}-${endtimeMonth}-${endtimeDay}`;
		},
		getToken() {
			this.token = uni.getStorageSync('token');
		},
		setNoticebar() {
			this.$refs.noticebar.text = this.rank_string;
		},
		// 获取主播列表信息
		getZblist() {
			const that = this;
			request({
				url: '/api/anchor/lists',
				method: 'GET'
			}).then(res => {
				if (res.data.data.list) {
					that.zblist = res.data.data.list;
					that.rank_string = res.data.data.rank_string;
					that.haszblist = 1;
				} else {
					that.haszblist = 0;
				}
			});
			// 获取的返回值如果有 就把haszblist赋值为1，否则赋值为0
		},
		// 获取主播收益数据
		getZbdata() {
			// console.log('获取主播收益信息');
			const that = this;
			request({
				url: '/api/anchor/AnchorData',
				data: { date: this.date, page: this.page }
			}).then(res => {
				if (res.data.data.length != 0) {
					that.haszbdata = 1;
				} else {
					that.haszbdata = 0;
				}
				that.zbdata = res.data.data;
			});
		},
		// 获取排行榜数据
		getRanklist() {
			const that = this;
			request({
				url: '/api/Rank/yesterList'
			}).then(res => {
				that.ranklist = res.data.data;
			});
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
			this.iShow = true;
		},
		// 关于模态框的函数
		bindClick() {
			this.show4 = true;
		},
		closeModal() {
			this.show4 = false;
		},
		bindBtn(type) {
			this.show4 = false;
		},
		addzbinfo() {
			// 发请求提交主播信息
			console.log('提交');
			// 先做表单校验，再发请求提交
			let regMob = /^[1][3,4,5,7,8,4][0-9]{9}$/;
			if (!this.anchorInfo.third_user_id) {
				uni.showToast({
					title: '抖音账号不能为空',
					icon: 'none'
				});
				this.show4 = true;
				return;
			}
			if (!this.anchorInfo.real_name) {
				uni.showToast({
					title: '真实姓名不能为空',
					icon: 'none'
				});
				this.show4 = true;
				return;
			}
			console.log(regMob.test(this.anchorInfo.mobile));
			if (!regMob.test(this.anchorInfo.mobile)) {
				uni.showToast({
					title: '请输入正确格式手机号',
					icon: 'none'
				});
				this.show4 = true;
				return;
			}
			const that = this;
			request({
				url: '/api/anchor/create',
				method: 'POST',
				data: this.anchorInfo
			}).then(res => {
				if (res.data.code == 1) {
					that.anchorInfo = {};
					uni.showToast({
						title: '添加成功'
					});
					that.getZblist();
				} else {
					console.log('添加失败');
					console.log(res.data.msg);
					uni.showToast({
						title: res.data.msg,
						icon: 'none'
					});
				}
			});
			// 提交后重新获取主播列表数据
		},
		// 时间选择器相关函数
		btnConfirm(e) {
			this.time = e.key;
			this.date = e.key;
			this.getZbdata();
		},
		btnCancel() {
			// console.log('取消时间：');
		}
	}
};
</script>

<style lang="less">
.anchor {
	height: 100%;
	width: 100%;
	padding-top: 44px;
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
	segmented-control {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 2;
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
timeSelector {
	position: absolute;
	top: 0;
	right: 0;
}
.zblistitem {
	border-bottom: 1px solid #cccccc;
	height: 5em;
	position: relative;
	text-indent: 80px;
	padding-top: 25px;
	.avatar {
		width: 60px;
		height: 60px;
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
	position: fixed;
	right: 10rpx;
	top: 20rpx;
	color: brown;
	z-index: 2;
	background-color: #ffffff;
}
// 底部排行榜
.ranklist {
	width: 100%;
	position: fixed;
	bottom: 0;
	left: 0;
	background-color: #ffffff;
	z-index: 3;
	.phbtag {
		width: 15%;
		float: left;
		margin-left: 2%;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		background-color: #ffffff;
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
.picktime {
	position: fixed;
	top: 22rpx;
	right: 0;
	background-color: #ffffff;
	z-index: 4;
}
.zbdata {
	width: 100%;
	.tit {
		width: 100%;
		text-align: center;
		view {
			width: 25%;
			float: left;
			height: 60px;
			line-height: 60px;
		}
	}
	.zbdataItem {
		width: 100%;
		text-align: center;

		view {
			width: 25%;
			float: left;
			color: #8b8ba9;
			height: 30px;
			line-height: 30px;
		}
	}
}

.tabs {
	flex: 1;
	flex-direction: column;
	overflow: hidden;
	background-color: #ffffff;
	/* #ifdef MP-ALIPAY || MP-BAIDU */
	height: 100vh;
	/* #endif */
}

.scroll-h {
	width: 750rpx;
	height: 80rpx;
	flex-direction: row;
	/* #ifndef APP-PLUS */
	white-space: nowrap;
	/* #endif */
	/* flex-wrap: nowrap; */
	/* border-color: #cccccc;
		border-bottom-style: solid;
		border-bottom-width: 1px; */
}

.line-h {
	height: 1rpx;
	background-color: #cccccc;
}

.uni-tab-item {
	/* #ifndef APP-PLUS */
	display: inline-block;
	/* #endif */
	flex-wrap: nowrap;
	padding-left: 15rpx;
	padding-right: 15rpx;
	text {
		border: 1px solid #cccccc;
		padding: 2rpx 15px;
		border-radius: 100px;
	}
	.uni-tab-item-title-active {
		color: #ffffff;
		background-color: #ed9f26;
		border: 1px solid #ed9f26;
	}
}

.uni-tab-item-title {
	color: #555;
	font-size: 30rpx;
	height: 80rpx;
	line-height: 80rpx;
	flex-wrap: nowrap;
	/* #ifndef APP-PLUS */
	white-space: nowrap;
	/* #endif */
}

.swiper-box {
	flex: 1;
}

.swiper-item {
	flex: 1;
	flex-direction: row;
}

.scroll-v {
	flex: 1;
	/* #ifndef MP-ALIPAY */
	flex-direction: column;
	/* #endif */
	width: 750rpx;
}

.update-tips {
	position: absolute;
	left: 0;
	top: 41px;
	right: 0;
	padding-top: 5px;
	padding-bottom: 5px;
	background-color: #fddd9b;
	align-items: center;
	justify-content: center;
	text-align: center;
}

.update-tips-text {
	font-size: 14px;
	color: #ffffff;
}

.refresh {
	width: 750rpx;
	height: 64px;
	justify-content: center;
}

.refresh-view {
	flex-direction: row;
	flex-wrap: nowrap;
	align-items: center;
	justify-content: center;
}

.refresh-icon {
	width: 30px;
	height: 30px;
	transition-duration: 0.5s;
	transition-property: transform;
	transform: rotate(0deg);
	transform-origin: 15px 15px;
}

.refresh-icon-active {
	transform: rotate(180deg);
}

.loading-icon {
	width: 20px;
	height: 20px;
	margin-right: 5px;
	color: #999999;
}

.loading-text {
	margin-left: 2px;
	font-size: 16px;
	color: #999999;
}

.loading-more {
	align-items: center;
	justify-content: center;
	padding-top: 10px;
	padding-bottom: 10px;
	text-align: center;
}

.loading-more-text {
	font-size: 28rpx;
	color: #999;
}
</style>
