<template>
  <view>
    <view class="container honor">
        <view v-for="item in pageContent.items" :key="item.id" class="honor-list">
            <u-image :src="item.miniCover" mode="aspectFit" height="75%"
            border-radius="12"></u-image>
            <view class="honor-title">{{ item.title }}</view>
            <view class="honor-date">{{ formatDate(item.startDate)
              }}{{ formatDate(item.startDate) != null && formatDate(item.endDate) !== null ? ' 一 ' : ''
              }}{{ formatDate(item.endDate) }}</view>
        </view>
    </view>
    <u-tabbar :list="tabbar"></u-tabbar>
  </view>
</template>

<script>
import {mapState} from 'vuex'
import tools from '../../../utils/tools'
export default {
    data() {
        return {
          pageContent:''
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
		const json = await this.$store.dispatch('getHonorList', param)
        this.pageContent = json
	},
    computed: {
        ...mapState({
            tabbar: state => state.tabbar,
        }),
	},
    methods: {
        formatDate(val) {
          return tools.dateOnly(val)
        },
    }
}
</script>