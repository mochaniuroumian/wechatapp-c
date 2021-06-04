<template>
	<view class="container">
		<view class="index-logo"><image mode="aspectFit" :src="imageUrllogo"></image></view>
		<view class="colorwhite bigfont ede">e德互联</view>
		<view class="colorwhite titleright">
			<view class="connull"></view>
			<text>云端共享.服务升级</text>
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
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {
            // this.request({
			// 	url:"/api/services/app/Honor/GetAll"
			// })
		},
		methods: {
          nextpage() {
			uni.getUserInfo({
              success: res => {
                this.username = res.userInfo.nickName
				this.userimg = res.userInfo.avatarUrl
				uni.redirectTo({
					url: '/pages/product/product?name=' + this.username + '&img=' + this.userimg,
				})
              },
			  fail() {
				this.username = '未登录用户'
				this.userimg = app.globalData.imageUrl + 'logo.png'
			  }
			});
		  }
		}
	}
</script>
