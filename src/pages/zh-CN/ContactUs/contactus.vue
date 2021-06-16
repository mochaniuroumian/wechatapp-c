<template>
  <view>
    <view class="container contactus">
      <!-- <view class="map">
          <map :latitude="latitude" :longitude="longitude"></map>
      </view> -->
      <view class="contactinfo">
        <view class="infos">
            <image mode="aspectFit" src="../../../static/gps-c.png"></image>
            <view class="name"><view class="thename">公司名称：</view></view>
            <view class="name-text"><view class="nametext">{{ companyInfo.appName }}</view></view>
        </view>
        <view class="infos">
            <image mode="aspectFit" src="../../../static/site-c.png"></image>
            <view class="name"><view class="thename">地址：</view></view>
            <view class="name-text"><view class="nametext">{{ companyInfo.appAddress }}</view></view>
        </view>
        <view class="infos">
            <image mode="aspectFit" src="../../../static/phone-c.png"></image>
            <view class="name"><view class="thename">电话：</view></view>
            <view class="name-text"><view class="nametext">{{ companyInfo.tel }}</view></view>
        </view>
        <view class="infos">
            <image mode="aspectFit" src="../../../static/mail-c.png"></image>
            <view class="name"><view class="thename">邮箱：</view></view>
            <view class="name-text"><view class="nametext">{{ companyInfo.email }}</view></view>
        </view>
      </view>
      <view class="big-gps">
          <image mode="aspectFit" src="../../../static/biggps.png"></image>
      </view>
    </view>
    <u-tabbar :list="tabbar" bg-color="#254651" inactive-color="#fff" active-color="#339abc"></u-tabbar>
  </view>
</template>

<script>
import {mapState} from 'vuex'
export default {
    data () {
        return {
			latitude: 39.120615,
            longitude: 117.180686
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