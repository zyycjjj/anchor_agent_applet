<script>
export default {
	onLaunch: function(e) {
		console.log('onlaunch')
		if (e.query.pid) {
			let pid = e.query.pid;
			uni.setStorageSync('ppid', pid);
		}
	},
	onShow: function() {
		console.log('onshow')
		wx.getSetting({
			success(res) {
				if (!res.authSetting['scope.userInfo']) {
					uni.reLaunch({
						url: '/pages/authorise/authorise'
					});
				}
			}
		});
	},
	onHide: function() {}
};
</script>

<style>
/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
@import './common/uni.css';
/* 字体库 */
</style>
