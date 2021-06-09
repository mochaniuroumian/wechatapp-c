<script>
	export default {
		data () {
            return {
				extConfig: {}
			}
		},
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			let that = this
			if (uni.getExtConfig) {
              uni.getExtConfig({
                success(res) {
                  console.log(res)
				  that.extConfig = res.extConfig
				  that.$store.commit('index/setTenantId', that.extConfig.appid)
                },fail(err) {
                  console.error("获取失败" + err)
				}
              })
            } else {
				that.extConfig = process.env.VUE_APP_APPID
				that.$store.commit('index/setTenantId', that.extConfig.appid)
			}
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
@import "uview-ui/index.scss";
</style>
