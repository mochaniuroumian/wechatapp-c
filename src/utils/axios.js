import axios from 'axios'

const $axios = axios.create({
    baseUrl: process.env.VUE_APP_URL,
    withCredentials: true
})

$axios.interceptors.request.use(
    config => {
        config.headers.common[store.state.headerName] = store.getters['index/getCulture']
        config.headers.common[store.state.multiTenancyHeader] = store.getters['index/getTenantId']
        console.log('请求拦截成功')
        return config
    }, error => Promise.reject(error)
)

$axios.interceptors.response.use(
    response => {
        return response
    },error => {
        if (
            !!error.response &&
            !!error.response.data.error &&
            !!error.response.data.error.message &&
            error.response.data.error.details
        ) {
            console.error(error.response.data.error.message)
            console.error(error.response.data.error.details)
        } else if (!!error.response && !!error.response.data.error && !!error.response.data.error.message) {
            console.error(error.response.data.error.message)
            redirect('/error')
        } else if (!error.response) {
            console.error('no response')
        }
        console.error('ajax error')
        return Promise.reject(error)
    }
)