import Vue from "vue"
import  Vuex from "vuex"
Vue.use(Vuex)
export default new Vuex.Store({
    state: { 
        companyInfo: {},
        culture: '',
        tenantId: ''
    },
    mutations: {
        setCompanyInfo(state, val) {
            state.companyInfo = val
        },
        setCulture(state, val) {
            state.culture = val
        },
        setTenantId(state, val) {
            state.tenantId = val
        }
    },
    getters: {
        getCulture(state) {
            return state.culture  
        },
        getTenantId(state) {
            return state.tenantId
        }
    },
    actions: {
        
    }
})