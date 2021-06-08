import Vue from 'vue'
import App from './App'
import uView from "uview-ui"
import store from "./store/index"
import axios from "./utils/axios"
import {router} from './utils/router'

Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$axios = axios
Vue.use(router)

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()

Vue.use(uView)