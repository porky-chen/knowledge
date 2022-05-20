/**
 * 定义路由接口
 * */
export default [
    {
        path: '/',
        component: () => import('@/pages/su-monitor'),
        // meta: { 自定义
        //     plainLayout: true,
        // }
    },
    { // 含子级菜单
        path: '/home',
        component: () => import('@/pages/su-index'),
        redirect: '/dashboard',
        children: [
            {
                path: '/dashboard',
                meta: { keepAlive: true },
                component: () => import('@/pages/su-dashboard'),
            },
        ],
    }
]
