<template>
  <view :class="['tank-tree',layer>0?'sub':'']">
    <ul>
      <li v-for="(item,index) in items" :key="index">
        <span
          :class="[layer>0?'sub':'',item.children.length>0?'next':'']"
        >{{ item.displayName }}</span>
        <tree
          v-if="item.children.length>0"
          :items="item.children"
          :layer="layer+1"
        ></tree>
      </li>
    </ul>
  </view>
</template>

<script>
export default {
  name: 'Tree',
  props: {
    items: {
      type: Array,
      required: true
    },
    layer: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style>

</style>