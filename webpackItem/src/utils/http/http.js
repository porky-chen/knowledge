import dayjs from 'dayjs'
import axios from 'axios'
import qs from 'qs'
import {MessageBox} from 'element-ui'
import md5 from 'md5'
import API from '@/api'
import Vue from 'vue'

// axios请求的前置拦截器
axios.interceptors.request.use(config => {
    if (config.method === 'get') {
        config.data = true
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
    }
    return config
}, err => {
    return Promise.reject(err)
})

let suNetworkConfig = {
    // 获取头部信息后的钩子函数
    getHeadersAfter: () => {
        return {}
    },

    // 特定错误码自定义
    handleResponseCode: data => {
        return true
    },
}

// 正在执行的请求记录对象
let suHttpSendingObj = {}

//
let isRequestingAccessToken = false
let requestOfNeedFetchAccessToken = []
let latestExpireDate = null

const suHttp = {
    // 配置网络框架的东西
    configure(options) {
        suNetworkConfig = {...suNetworkConfig, ...options}
    },


    // 获取头部信息
    getHeaders(options) {
        options = options || {}
        let {headers, signData} = options

        headers = headers || {}
        signData = signData || {}

        let axiosHeaders = {...headers}, sign, timestamp = dayjs().format('YYYYMMDDHHmmss')

        // 进行加密
        delete signData.appCode
        sign = signature({
            obj: {...signData, timestamp},
            privateKey: Vue.prototype.$cache.getPrivateKey(),
            appCode: Vue.prototype.$api.appCode,
        })

        let userAccount = JSON.parse(Vue.prototype.$cache.getUserAccount()) || {accountName: ''}

        // 配置系统级别的头部参数信息
        axiosHeaders.authorization = Vue.prototype.$cache.getToken() || ''
        axiosHeaders.accessToken = Vue.prototype.$cache.getAccessToken() || ''
        axiosHeaders.appCode = Vue.prototype.$api.appCode || ''
        axiosHeaders.timestamp = timestamp
        axiosHeaders.Pragma = 'no-cache'
        axiosHeaders.sign = sign
        axiosHeaders.accountName = userAccount.accountName || ''
        // 执行after钩子函数，允许追加新的头部信息，
        let headersAfter = executeMethod(suNetworkConfig.getHeadersAfter)
        if (headersAfter) {
            axiosHeaders = {...headersAfter, ...axiosHeaders}
        }

        return axiosHeaders
    },

    restful: (opts = {}) => {
        const {
            dataType = 'json',
            params = {},
            timeout = 30000,
            type = 'post',
            url,
            data = {},
            contentType,
            isMock = false,
            deleteTransform = true,
            repeatFilter = true,
            showErrorAlert = true,
            getCancelTokenSourceCB = null, // = cancelTokenSource => {},
            isDownLoad = false,
            ...other
        } = opts

        // 空属性的删除
        Vue.prototype.$utils.clearEmptyValueDeep(params)
        Vue.prototype.$utils.clearEmptyValueDeep(data)

        // 参数对象的生成
        let senddata = data
        const formData = new FormData()
        if ((type.toLowerCase() === 'delete' && deleteTransform) || /x-www-form-urlencoded/.test(contentType)) {
            for (let k in data) {
                formData.append(k, data[k])
            }
            senddata = formData
        }

        // 头部信息的配置
        const headers = suHttp.getHeaders({signData: {...senddata, ...params}})
        if (other && other.filterSign) {
            delete headers.sign
        }
        if (contentType) {
            headers['Content-Type'] = contentType
        }
        let identifier = null
        if (repeatFilter) {
            identifier = generateRequestIdentifier(opts)
            if (suHttpSendingObj[identifier] !== undefined && suHttpSendingObj[identifier]) {
                return new Promise((resolve, reject) => {
                    console.log('重复请求，系统默认拦截')
                })
            }
            suHttpSendingObj[identifier] = true
        }

        // 生成可以取消本次请求的cancelToken
        let cancelTokenSource = {}
        if (getCancelTokenSourceCB !== null && typeof getCancelTokenSourceCB === 'function') {
            cancelTokenSource = axios.CancelToken.source()
            getCancelTokenSourceCB(cancelTokenSource)
        }

        return new Promise((resolve, reject) => {
            axios({
                url,
                method: type,
                data: senddata,
                params,
                timeout,
                headers,
                responseType: dataType,
                cancelToken: cancelTokenSource.token,
                paramsSerializer: params => {
                    for (const x in params) {
                        if (Vue.prototype.$utils.isType(params[x]) === 'Array') {
                            params[x] = params[x].join(',')
                        }
                    }
                    return qs.stringify(params, {indices: false})
                },
                ...other,
            })
                .then(res => {
                    const data = res.data

                    // 请求成功
                    if (isDownLoad) {
                        resolve(res)
                    } else if (data.code === 10000) {
                        resolve(data)
                    } else if (data.code === 20004) {
                        if (isRequestingAccessToken) {
                            requestOfNeedFetchAccessToken.push({
                                opts,
                                resolve,
                                reject,
                            })
                        }
                        if (!isRequestingAccessToken) {
                            if (latestExpireDate && !latestExpireDate.isBefore(dayjs())) {
                                suHttp.restful(opts).then(resultJson => resolve(resultJson)).catch(error => reject(error))
                            } else {
                                isRequestingAccessToken = true
                                fetchAccessToken(opts, resolve, reject)
                            }
                        }
                    } else if (data.code === 20007) {
                        fetchPublicKey(opts, resolve, reject)
                    } else if (data.code === 20114 || data.code === 20112) {
                        reject(new Error())
                        errorHandlerForLoginError(data)
                    }
                    // 常规错误提示
                    else {
                        if (executeMethod(suNetworkConfig.handleResponseCode, data) && showErrorAlert) {
                            errorHandler(data)
                        }
                        reject(data)
                    }
                })
                .catch(e => {
                    reject(e)
                    if (!e.__CANCEL__ && !other.doNotAlertWhenNetworkError) {
                        alert('请求错误，请稍后重试')
                    }
                })
                .finally(() => {
                    if (identifier) delete suHttpSendingObj[identifier]
                })
        })
    },
}


function executeMethod(method, parameters) {
    if (!method || typeof method !== 'function') {
        return null
    }
    return method(parameters)
}

//请求地址和参数加密
function generateRequestIdentifier(opts) {
    return md5(opts.url) + md5(JSON.stringify(opts))
}

//获取公共钥匙
function fetchPublicKey(opts, resolve, reject) {
    suHttp.restful({
        // url: Vue.prototype.$api.auth.getPubKey,
        url: 'url',
        type: 'get',
        repeatFilter: false, // 重复过滤
        params: {
            // appCode: Vue.prototype.$api.appCode,
        },
        contentType: 'application/x-www-form-urlencoded',
    }).then(resultJson => {
        sessionStorage.setItem('publicKey', resultJson.data)
        let cachedUserInfoData = JSON.parse(sessionStorage.getItem('userAccount') || '{}')
        let cipherText = Vue.prototype.$utils.getrsa(sessionStorage.getItem('publicKey'), `${Vue.prototype.$api.appCode}&${cachedUserInfoData.accountName}`)
        Vue.prototype.$cache.setCipherText(cipherText)

        // 重新获取私钥
        fetchAccessToken(opts, resolve, reject)
    })
}

// 获取私钥
function fetchAccessToken(opts, resolve, reject) {
    // let cipherText = Vue.prototype.$cache.getCipherText() // 缓存的数据
    // let appCode = Vue.prototype.$api.appCode

    suHttp.restful({
        url: Vue.prototype.$api.auth.accessToken,
        data: {appCode, cipherText},
        repeatFilter: false,
    }).then(resultJson => {
        isRequestingAccessToken = false
        latestExpireDate = dayjs().add(5, 'second')

        Vue.prototype.$cache.setAccessToken(resultJson.data.accessToken)
        Vue.prototype.$cache.setPrivateKey(resultJson.data.privateKey)
        suHttp.restful(opts).then(resultJson0 => resolve(resultJson0)).catch(error0 => reject(error0))

        for (let requestItem of requestOfNeedFetchAccessToken) {
            let itemOpts = requestItem.opts
            let itemResolve = requestItem.resolve
            let itemReject = requestItem.reject
            suHttp.restful(itemOpts).then(resultJsonItem => itemResolve(resultJsonItem)).catch(errorItem => itemReject(errorItem))
        }
        requestOfNeedFetchAccessToken = []
    })
}

function errorHandler(data) {
    const msg = data.prompt ? data.message + ': ' + data.prompt : data.message
    alert(msg, '错误', {
        type: 'error',
    })
}

function errorHandlerForLoginError(data) {
    const msg = data.prompt ? data.message + ': ' + data.prompt : data.message
    alert(msg, '错误', {
        callback: action => {
            location.href = API.LOGIN
        },
    })
}

// 网络框架下专门使用的错误提示, 默认和utils一样，由于模块的解耦合，还是单独写了。可重新定义
function alert(val, title = '提示', opts = {}) {
    MessageBox.alert(val, title, {
        showClose: true,
        confirmButtonText: '确定',
        callback: () => {
        },
        ...opts,
    })
}


export default suHttp
