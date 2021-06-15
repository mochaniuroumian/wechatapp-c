<script>
import {mapState,mapMutations} from 'vuex'
	export default {
		data () {
            return {
				extConfig: {}
			}
		},
		onLaunch() {
			console.log('App Launch')
		},
		async onShow() {
			let that = this
            await that.getAppid()
			that.$store.commit('setTenantId', that.extConfig.appid)
			await that.$store.dispatch('getAbp')
			that.$store.dispatch('getHomePage')
			await that.getLanguage()
			await that.$store.dispatch('getNavbars')
		},
		computed: {
          ...mapState({
            abp: state => state.abp,
            companyInfo: state => state.companyInfo
          })
        },
		methods: {
			getAppid() {
				let that = this
				return new Promise((resolve, reject) => {
				  uni.getExtConfig({
                    success(res) {
					  if(that.extConfig.appid){
				        that.extConfig = res.extConfig
				      } else {
					    that.extConfig.appid = process.env.VUE_APP_APPID
					  }
					  resolve('suc')
                    },fail(err) {
                      console.error(err)
				      reject('msg')
				    }
                  })
			    })
			},
			getLanguage() {
				let abp = this.$store.state.abp
				let temp = abp.setting.values['Abp.Localization.LanguageDefineByBrower']
                let isLanguageDefineByBrower = temp.toLowerCase() === 'true'
				let defaultLang
                if (!isLanguageDefineByBrower) {
                  let langs = abp.localization.languages
                  defaultLang = 'zh-CN'
                  langs.forEach(x => {
                    if (x.isDefault) defaultLang = x
                  })
				  that.$store.dispatch('setCookie', defaultLang)
                  that.$store.dispatch('getCompanyInfo')
			    }
		    }
	    }
    }
</script>

<style lang="scss">
	/*每个页面公共css */
@import "uview-ui/index.scss";
</style>
