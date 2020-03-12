<script>
export default {
	onLaunch: function() {
	},
	onShow: function() {
		wx.getSetting({
			success(res) {
				if (!res.authSetting['scope.userInfo']) {
					uni.navigateTo({
						url: '/pages/authorise/authorise'
					})
					// ({
					// 	url: '/pages/authorise/authorise'
					// });
				}
			}
		});
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
@import './common/uni.css';
/* 字体库 */
@import './static/iconfont/iconfont.css';
</style>
