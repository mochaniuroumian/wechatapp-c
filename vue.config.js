const TransformPages = require('uni-read-pages')
const {webpack} = new TransformPages()

module.exports = {
	devServer: {
		proxy: {
			// .env.developement的VUE_APP_URL设置
			'/api/': {
				target: 'https://cms.ednet.cn',
				secure: false,   // https需要这个
				changeOrigin: true, // 是否允许跨域
			},
            '/AbpUserConfiguration/': {
				target: 'https://cms.ednet.cn',
				secure: false,   
				changeOrigin: true
			}
		}
	},
	configureWebpack: {
		plugins: [
			new webpack.DefinePlugin({
				ROUTES: webpack.DefinePlugin.runtimeValue(() => {
					const tfPages = new TransformPages({
						includes: ['path', 'name', 'meta']
					});
					return JSON.stringify(tfPages.routes)
				}, true )
			})
		]
	}
}