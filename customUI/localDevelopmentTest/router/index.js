import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


let routes = [
  {
    path: '/',
    redirect: 'table',
  },
  {
    path: '/table10',
    component: () => import('../components/su-old-list'),
  },
  {
    path: '/table11',
    component: () => import('../components/su-list'),
  },
  {
    path: '/table12',
    component: () => import('../components/su-list'),
  },
  {
    path: '/table13',
    component: () => import('../components/su-list'),
  },
  {
    path: '/table21',
    component: () => import('../components/su-list'),
  },
  {
    path: '/table22',
    component: () => import('../components/su-list'),
  },
  {
    path: '/table23',
    component: () => import('../components/su-list'),
  },
  {
    path: '/table31',
    component: () => import('../components/su-list'),
  },
  {
    path: '/table32',
    component: () => import('../components/su-list'),
  },
  {
    path: '/su-ezuikit-page',
    component: () => import('../pages/su-ezuikit-page-view'),
  },
]


export default new Router({
  routes,
})
