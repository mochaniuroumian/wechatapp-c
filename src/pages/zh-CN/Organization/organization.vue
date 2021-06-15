<template>
  <view>
      <view class="container organization">
          <view class="swiper-or">
            <u-swiper :list="swiper"></u-swiper>
          </view>
          <view class="org-card">
            <ly-tree :tree-data="items"  :ready="true" :props="propsitem"
              node-key="id" defaultExpandAll="true"
              @node-expand="handleNodeExpand" 
              @node-click="handleNodeClick">
            </ly-tree>
          </view>
      </view>
      <u-tabbar :list="tabbar"></u-tabbar>
  </view>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import LyTree from '@/components/ly-tree/ly-tree.vue'
export default {
    data() {
	  	return {
		  	items: '',
          propsitem: function() {
            return {
              label: 'displayName', // 指把数据中的‘personName’当做label也就是节点名称
              children: 'children' // 指把数据中的‘childs’当做children当做子节点数据
            }
          },
		  }
	  },
    components: { 
      LyTree 
      },
    computed: {
        ...mapState({
          tabbar: state => state.tabbar,
          swiper: state => state.tabbar.bannerImgs,
        }),
	},
    async onLoad() {
		const json = await this.$store.dispatch('getOrganization')
        this.items = json
        debugger
        // let curRoute  = this.$mp.page.route;
	},
  methods: {
      handleNodeClick(obj) {
          // console.log('handleNodeClick', JSON.stringify(obj));
      },
      handleNodeExpand(obj) {
          // console.log('handleNodeExpand', JSON.stringify(obj));
      }
  }
}
</script>

<style>

</style>