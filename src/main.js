import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
import request from "./utils/request"
import store from "./store/index.js"

Vue.config.productionTip = false
Vue.prototype.$request = request
Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()

Vue.use(uView);