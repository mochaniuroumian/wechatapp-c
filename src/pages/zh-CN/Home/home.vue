<template>
<view>
  <view class="container home">
      <view class="hello">
          <view class="user-img"><open-data type="userAvatarUrl"></open-data></view>
          <view class="user-info">
              <view class="user-name">欢迎您，<open-data type="userNickName"></open-data></view>
              <view class="time">{{time}}</view>
          </view>
      </view>
      <u-search v-if="group1" placeholder="搜索" v-model="keyword" shape="square" bg-color="#fff"
          border-color="#808080" :show-action="false" margin="40rpx 0"></u-search>
      <view v-if="group1" class="product">
          <view class="product-block" v-for="item in group1.items" :key="item.id">
              <u-image :src="item.cover" mode="aspectFit" height="100%"></u-image>
              <view class="product-name">{{ item.title }}</view>
          </view>
      </view>
      <view v-if="group2" class="news-block">
          <view class="news-title">{{group2.title}}</view>
          <u-image :src="group2.catalogGroup.cover" mode="aspectFill" height="220rpx"
          border-radius="4rpx"></u-image>
          <u-card margin="20rpx 0" padding="0" show-head="false" show-foot="false">
            <view class="news-body" slot="body">
			  <view v-for="item in group2.items" :key="item.id" class="u-flex news-body-card"
              @click="goNewsDetail(item.id, group1.type)">
                <u-image :src="item.cover" mode="aspectFill" height="200rpx" width="200rpx"></u-image>
				<view class="news-body-font">
                    <view class="news-body-title">{{ item.title }}</view>
                    <view class="news-body-time">{{ formatDate(item.creationTime) }}</view>
                    <view class="news-body-des">{{ filter(item.content, 100) }}</view>
                </view>
			  </view>
            </view>
          </u-card>
      </view>
      
  </view>
  <u-tabbar :list="tabbar" change></u-tabbar>
  </view>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import tools from '../../../utils/tools'
export default {
    data() {
		return {
            time: null,
			timestamp: '1581170184',
            group1:'',
            group2:'',
            current: 0
		}
	},
    async onLoad() {
		let that = this
        this.time = this.$u.timeFormat(this.timestamp, 'mm dd,yyyy')
        const groups = that.$store.state.homePage.groups.filter(x => x.catalogGroup)
        that.group1 = groups.length > 0 ? groups[0] : null
        that.group2 = groups.length > 1 ? groups[1] : null
        if (that.group1.items) that.group1.items = that.group1.items.slice(0, 3)
        if (that.group2.items) that.group2.items = that.group2.items.slice(0, 3)

	},
	computed: {
        ...mapState({
			homePage: state => state.homePage,
            tabbar: state => state.tabbar,
            navbars: state => state.navbars
        }),
	},
    methods: {
        formatDate(val) {
          return tools.date(val)
        },
        filter(val, length) {
          return tools.cutString(tools._filter(val), length)
        }
    }
}
</script>

<style>

</style>