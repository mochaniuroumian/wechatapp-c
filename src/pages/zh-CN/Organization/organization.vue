<template>
  <view>
      <view class="container organization">
          <view class="org-card">
            <tree :items="items"></tree>
          </view>
      </view>
      <u-tabbar :list="tabbar"></u-tabbar>
  </view>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import Tree from '../../components/tree.vue'
export default {
    data() {
		return {
			items: ''
		}
	},
    components: { Tree },
    computed: {
        ...mapState({
        }),
	},
    async onLoad() {
		const json = await this.$store.dispatch('getOrganization')
        this.items = json
	},
}
</script>

<style>

</style>