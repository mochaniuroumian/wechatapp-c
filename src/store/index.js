import Vue from "vue"
import  Vuex from "vuex"
Vue.use(Vuex)
export default new Vuex.Store({
    state: { 
        number: 0,
        theme: {},
        companyInfo: {},
        culture: '',
        tenantId: ''
    },
    mutations: {
        SETENV(state, val) {
            state.theme = val
        },
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
    }
})