<template>
  <view>
    <view class="container product">
      <view class="swiper-pro">
        <u-swiper :list="swiper" mode="none" height="350"></u-swiper>
      </view>
      <view class="product-block">
        <view v-for="item in pageContent.items" :key="item.id" class="partner-list">
            <u-image :src="item.logo" mode="aspectFit" height="75%" border-radius="12"></u-image>
            <view class="partner-title">{{ item.title }}</view>
        </view>
      </view>
    </view>
    <u-tabbar :list="tabbar" bg-color="#254651" inactive-color="#fff" active-color="#339abc"></u-tabbar>
  </view>
</template>

<script>
import {mapState} from 'vuex'
export default {
    data() {
        return {
          swiper: [{
						image: 'https://cdn.uviewui.com/uview/swiper/1.jpg'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/2.jpg'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/3.jpg'
					}
				],
        }
    },
    computed: {
        ...mapState({
            tabbar: state => state.tabbar,
        }),
	}
}
</script>

<style>

</style>