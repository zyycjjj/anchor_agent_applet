export const request = (params) => {
	// 写一个baseUrl，好看
	const baseUrl = "https://www.vzoyo.com"
	// 自动添加请求头
	let head = {}
	if (!params.url.includes("/MiniProgramLogin")) {
		head["token"] = uni.getStorageSync('token');
	}
	head['Content-Type'] = 'application/x-www-form-urlencoded'
	return new Promise((resolve, reject) => {
		uni.request({
			...params,
			url: baseUrl + params.url,
			header: head,
			success: (res) => {
				resolve(res)
			},
			fail: (err) => {
				reject(err)
			}
		});
	})
}
