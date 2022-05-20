import suHttp from './http'

//set 异步方法
const http = {
    ...suHttp,

    install: function(Vue) {
        if (!Vue.prototype.$su) Vue.prototype.$su = {}
        Vue.prototype.$su.ajax = suHttp.restful
        Vue.prototype.$su.http = suHttp
    }
}

export default http

//在main.js 中 引入并且 Vue.use(http)  即可全局使用
