import Vue from "vue"
import  Vuex from "vuex"
import $axios from "../utils/axios"
Vue.use(Vuex)
export default new Vuex.Store({
    state: { 
        abp: {},
        companyInfo: {},
        navbars: [],
        tabbar: [],
        currentPath: {},
        currentPathParent: {},
        breadCrumbItems: [],
        partners: [],
        homePage: {},
        culture: 'zh-CN',
        tenantId: '',
        headerName: '.AspNetCore.Culture',
        multiTenancyHeader: 'Abp.TenantId'
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
        //中英文切换改变state
        setCookie(context, language) {
            context.commit('setCulture', language)
        },
        //路由改变
        setcurrentPath(context) {
            const homePath = `/${context.state.culture}/home`
            const array = context.state.navbars
            const home = context.dispatch('findChildByUrl',{array, homePath})
            console.log(array)
            if (path.toLowerCase() === homePath.toLowerCase()) {
              home.isHome = true
              context.state.currentPath = home
            } else {
              let child = actions.findChildByUrl(array, path)
              if (child === null) {
                if (grandId) {
                  child = actions.findChildByGroupId(array, grandId)
                }
              }
              if (child !== null) {
                let parents = []
                actions.findParentsByCode(array, child.code)
                parents = parents.filter(x => x.code !== home.code).sort((a, b) => a.code.length - b.code.length)
                context.state.currentPath = child
                actions.setBreadCrumb(context, home, ...parents)
                let currentPathParent = null
                for (let i = parents.length - 1; i > -1; i--) {
                  if (parents[i].bannerImgs && parents[i].bannerImgs.length > 0) {
                    currentPathParent = parents[i]
                    break
                  }
                }
                context.state.currentPathParent = currentPathParent
              }
            }
        },
        findChildByUrl(arry, val) {
            let res = null
            for (let i = 0; i < arry.length; i++) {
              if (arry[i].url && val && val.toLowerCase().includes(arry[i].url.toLowerCase())) {
                res = arry[i]
                break
              } else if (arry[i].children && arry[i].children.length > 0) {
                res = actions.findChildByUrl(arry[i].children, val)
                if (res) return res
              }
            }
            return res
        },
        findChildByGroupId(arry, id) {
            let res = null
            for (let i = 0; i < arry.length; i++) {
              if (arry[i].catalogGroupId && id && id === arry[i].catalogGroupId) {
                res = arry[i]
                break
              } else if (arry[i].children && arry[i].children.length > 0) {
                res = actions.findChildByGroupId(arry[i].children, id)
                if (res) return res
              }
            }
            return res
        },
        findParentsByCode(arry, code) {
            let parents = []
            code.slice(0, code.lastIndexOf('.'))
            for (let i = 0; i < arry.length; i++) {
              if (arry[i].code && code && code.includes(arry[i].code)) {
                parents.push(arry[i])
              }
              if (arry[i].children && arry[i].children.length > 0) {
                actions.findParentsByCode(arry[i].children, code)
              }
            }
        },
        setBreadCrumb(context, ...args) {
            context.state.breadCrumbItems = []
            for (let i = 0; i < args.length; i++) {
              context.state.breadCrumbItems.push({
                text: args[i].displayName,
                to: args[i].url
              })
            }
        },
        async getAbp(context) {
          await $axios.get('/AbpUserConfiguration/GetAll').then(data => {
            const json = data.data.result
            json.localization.defaultSourceName = 'Ednet'
            context.state.abp = json
          })
        },
        async getNavbars(context) {
            const res = await $axios.get('/api/services/app/Navbar/GetAll')
            if (res.data.success) context.state.navbars = res.data.result[0].children
            for (let element of context.state.navbars) {
              let tab = {}
              tab.text = element.displayName
              // tab.pagePath = "pages" + element.url
              tab.pagePath = "/pages/zh-CN/Home/home"
              tab.iconPath = "home"
              tab.selectedIconPath = "home-fill"
              tab.bannerImgs = element.bannerImgs
              if(element.catalogGroup !== null){
                if(element.catalogGroup.cover !== ''){
                  tab.iconPath = element.catalogGroup.cover
                  tab.selectedIconPath = element.catalogGroup.cover
                }
              }
              context.state.tabbar.push(tab)
              // if(element.catalogGroup.cover = ''){
              //   context.state.tabbar.selectedIconPath = "home-fill"
              // }else {
              //   context.state.tabbar.selectedIconPath = element.catalogGroup.cover
              // }
            }
            console.log(context.state.navbars)
          },
          async getCompanyInfo(context) {
            const res = await $axios.get('/api/services/app/CompanyInfo/GetOrCreate')
            if (res.data.success) {
              context.commit('setCompanyInfo', res.data.result)
            }
          },
          async getOrganization(context, params) {
            const res = await $axios.get('/api/services/app/Organization/GetAll', params)
            if (res.data.success) {
              context.state.partners = res.data.result
              return res.data.result
            }
          },
          async getPartner(context, params) {
            const res = await $axios.get('/api/services/app/Partner/GetAll', params)
            if (res.data.success) {
              context.state.partners = res.data.result
              return res.data.result
            }
          },
          async getHomePage(context) {
            const res = await $axios.get('/api/services/app/HomePage/GetOrCreate')
            if (res.data.success) context.state.homePage = res.data.result
            for (let element of context.state.homePage.groups) {
              let params = {
                params: {
                  CatalogGroupId: element.catalogGroupId,
                  SkipCount: 0,
                  MaxResultCount: 200,
                  Sorting: 'IsTop DESC, Number DESC'
                }
              }
              const _items = await $axios.get('/api/services/app/Catalog/GetAll', params)
              if (_items.data.success) element.items = _items.data.result.items
              params = {
                params: {
                  Id: element.catalogGroupId
                }
              }
              const _children = await $axios.get('/api/services/app/CatalogGroup/GetAll', params)
              if (_children.data.success) element.children = _children.data.result
            }
          },
          async getAnounces(context, params) {
            const res = await $axios.get('/api/services/app/Announce/GetAll', params)
            if (res.data.success) return res.data.result
          },
          async getAnounce(context, params) {
            const res = await $axios.get('/api/services/app/Announce/Get', params)
            if (res.data.success) return res.data.result
          },
          async getPage(context, params) {
            const res = await $axios.get('/api/services/app/Page/Get', params)
            if (res.data.success) return res.data.result
          },
          async getCatalogGroupList(context, params) {
            const res = await $axios.get('/api/services/app/CatalogGroup/GetAll', params)
            if (res.data.success) return res.data.result
          },
          async getCatalogGroup(context, params) {
            const res = await $axios.get('/api/services/app/CatalogGroup/Get', params)
            if (res.data.success) return res.data.result
          },
          async getCatalogList(context, params) {
            const res = await $axios.get('/api/services/app/Catalog/GetAll', params)
            if (res.data.success) return res.data.result
          },
          async getCatalog(context, params) {
            const res = await $axios.get('/api/services/app/Catalog/Get', params)
            if (res.data.success) return res.data.result
          },
          async getHonorList(context, params) {
            const res = await $axios.get('/api/services/app/Honor/GetAll', params)
            if (res.data.success) return res.data.result
          },
          async getHonor(context, params) {
            const res = await $axios.get('/api/services/app/Honor/Get', params)
            if (res.data.success) return res.data.result
          }
    }
})