<template>
<view>
  <view class="container about">
    <view class="about-title bigfont">{{ companyInfo.appName }}</view>
    <view class="about-content limit-width">
      <u-parse :lazy-load="true" :html="companyInfo.content"></u-parse>
    </view>
  </view>
  <u-tabbar :list="tabbar"></u-tabbar>
</view>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
export default {
    data() {
			return {
				style: {
					img: 'max-width: 100% !important'
				}
			}
		},
    computed: {
        ...mapState({
		      	companyInfo: state => state.companyInfo,
            tabbar: state => state.tabbar,
        }),
	  },
}
</script>

<style>

</style>