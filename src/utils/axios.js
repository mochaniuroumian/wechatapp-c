import axios from 'axios'
import store from '../store/index'
let baseURL = process.env.VUE_APP_URL_AXIOS
const service = axios.create({
    baseURL,
    timeout:30000,
    withCredentials: true
})

service.interceptors.request.use(
    config => {
        config.headers.common[store.state.headerName] = store.getters['getCulture']
        config.headers.common[store.state.multiTenancyHeader] = store.getters['getTenantId']
        return config
    }, error => Promise.reject(error)
)

service.interceptors.response.use(
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
axios.defaults.adapter = function(config) { 
    return new Promise((resolve, reject) => {
        var settle = require('axios/lib/core/settle');
        var buildURL = require('axios/lib/helpers/buildURL');
        uni.request({
            method: config.method.toUpperCase(),
            url: config.baseURL + buildURL(config.url, config.params, config.paramsSerializer),
            header: config.headers,
            data: config.data,
            dataType: config.dataType,
            responseType: config.responseType,
            sslVerify: config.sslVerify,
            complete: function complete(response) {
                response = {
                    data: response.data,
                    status: response.statusCode,
                    errMsg: response.errMsg,
                    header: response.header,
                    config: config
                };

                settle(resolve, reject, response);
            }
        })
    })
}
export default service