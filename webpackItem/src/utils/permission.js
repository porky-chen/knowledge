/**
 * v-自定义指令
 */
import Vue from 'vue'

Vue.directive('permission', {
    inserted(el, binding) {
        const curMenu = JSON.parse(Vue.prototype.$cache.getCurrentMenu() || '{}'),
            authBtns = curMenu.authFunctionList || []

        // v-permission的内容转为数组
        let valueList = typeof binding.value === 'string' ? [binding.value] : binding.value
        let isAuth = false

        // valueList中只要有一个是授权的，整体则就是授权的
        for (let val of valueList) {
            for (let i = 0; i < authBtns.length; i++) {
                if (val === authBtns[i].functionAction) {
                    if (el.lastChild && (el.getAttribute('permission-custom-name') === null || el.getAttribute('permission-custom-name') !== 'true')) {
                        el.lastChild.innerText = authBtns[i].functionName
                    }
                    isAuth = true
                    return
                }
            }
        }

        if (!isAuth) {
            el.parentNode && el.parentNode.removeChild(el)
        }
    },
})

/**
 * @param {*按钮权限标识} val
 */
function isPermission(val) {
    const curMenu = JSON.parse(Vue.prototype.$cache.getCurrentMenu() || '{}'),
        authBtns = curMenu.authFunctionList || []
    let isAuth = false
    for (let i = 0; i < authBtns.length; i++) {
        if (val === authBtns[i].functionAction) {
            isAuth = true
            break
        }
    }
    return isAuth
}

export default isPermission
