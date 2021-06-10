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
					if(that.extConfig.appid){
                      console.log(res)
				      that.extConfig = res.extConfig
				    } else {
					  that.extConfig.appid = process.env.VUE_APP_APPID
				      that.$store.commit('setTenantId', that.extConfig.appid)
			          that.$store.dispatch('getHomePage')
					}
                },fail(err) {
                  console.error(err)
				}
              })
            } else {
				that.extConfig.appid = process.env.VUE_APP_APPID
				that.$store.commit('setTenantId', that.extConfig.appid)
			    that.$store.dispatch('getHomePage')
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
