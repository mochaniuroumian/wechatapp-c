<template>
	<view class="container index">
		<view class="index-logo"><image mode="aspectFit" :src="companyInfo.logo"></image></view>
		<view class="colorwhite bigfont ede">{{ companyInfo.appName }}</view>
		<view class="colorwhite titleright">
			<view class="connull"></view>
			<text>{{ companyInfo.logoText }}</text>
		</view>
		<view class="nextPage">
			<u-icon class="more-dot-fill" name="more-dot-fill" color="#fff" size="70"></u-icon>
			<view class="index-next">
		      <button open-type="getUserInfo" plain="true" @getuserinfo="nextpage">
			    <u-icon name="arrow-right" color="#32bc8a" size="100"></u-icon>
		      </button>
			</view>
			<u-icon class="more-dot-fill" name="more-dot-fill" color="#fff" size="70"></u-icon>
		</view>
		<view class="index-contact">
			<view class="kefu">
				<u-icon name="kefu-ermai" color="#fff"  size="70"></u-icon>
			</view>
			<view class="phone">
				<u-icon name="phone" color="#fff" size="70"></u-icon>
			</view>
		</view>
	</view>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
	export default {
		data() {
			return {
			}
		},
		async onLoad() {
		  let that = this
          that.$store.dispatch('setCookie', 'zh-CN')
          await that.$store.dispatch('getCompanyInfo')
		  await that.$store.dispatch('getNavbars')
		},
		computed: {
          ...mapState({
			companyInfo: state => state.companyInfo
          }),
		},
		methods: {
          nextpage() {
			uni.redirectTo({
					url: '/pages/zh-CN/Organization/organization',
				})
          }
		}
	}
</script>
