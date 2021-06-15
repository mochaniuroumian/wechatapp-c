<template>
  <view>
    <view class="container partner">
      <view class="swiper-pa">
        <u-swiper :list="swiper" mode="none" height="350"></u-swiper>
      </view>
      <view class="partner-block">
        <view v-for="item in pageContent.items" :key="item.id" class="partner-list">
            <u-image :src="item.logo" mode="aspectFit" height="75%"
            border-radius="12"></u-image>
            <view class="partner-title">{{ item.title }}</view>
        </view>
      </view>
    </view>
    <u-tabbar :list="tabbar"></u-tabbar>
  </view>
</template>

<script>
import {mapState} from 'vuex'
export default {
    data() {
        return {
          pageContent:'',
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
    async onLoad() {
        const param = {
          params: {
            IsActive: true,
            SkipCount: 0,
            MaxResultCount: 100
          }
        }
		const json = await this.$store.dispatch('getPartner', param)
        this.pageContent = json
	},
    computed: {
        ...mapState({
            tabbar: state => state.tabbar,
        }),
	}
}
</script>