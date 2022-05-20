/**
 * 定义路由模式和路由处理
 * */
import Vue from 'vue'
import Router from 'vue-router'
import routers from './router'
import store from '../store'
import dayjs from 'dayjs'
let quarterOfYear = require('dayjs/plugin/quarterOfYear')
dayjs.extend(quarterOfYear)

Vue.use(Router)


// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

// 定义的公共路径前缀 如 /path
const publicPath = process.env.VUE_APP_PUBLICPACH
// 重新组合path默认都是''
if(publicPath){
    routes.forEach(item => {
        item.path = publicPath + item.path;
        if (item.redirect) {
            item.redirect = publicPath + item.redirect;
        }
        if (item.children) {
            item.children.forEach(i => {
                i.path = publicPath + i.path;
                if (i.redirect) {
                    i.redirect = publicPath + i.redirect;
                }
            })
        }
    })
}

const router = new Router({
    mode: 'history', // hash | history
    routers: routers,
    scrollBehavior: () => ({
        y: 0
    }),
})

//路由守卫
router.beforeEach(async (to,from,next) => {
    /**
     * 路由处理
     * to: 到哪
     * from : 哪来
     * next : 放行
     * */
})

// 路由发生变化修改页面title
router.afterEach(() => {
    document.title = 'xxxx'
})

export default router
