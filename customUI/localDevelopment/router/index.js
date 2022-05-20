import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


let routes = [
  {
    path: '/',
    redirect: 'alert',
  },
  // {
  //   path: '/layout',
  //   component: () => import('../components/su-layout-test.vue'),
  // },
  {
    path: '/alert',
    component: () => import('../components/su-alert-test.vue'),
  },
  {
    path: '/menu',
    component: () => import('../components/su-menu-test'),
  },
  {
    path: '/navigator',
    component: () => import('../components/su-navigator-test'),
  },
  {
    path: '/avatar',
    component: () => import('../components/su-avatar-test.vue'),
  },
  {
    path: '/button',
    component: () => import('../components/su-button-test.vue'),
  },
  {
    path: '/cascader',
    component: () => import('../components/su-cascader-test.vue'),
  },
  {
    path: '/dialog',
    component: () => import('../components/su-dialog-test.vue'),
  },
  {
    path: '/tree',
    component: () => import('../components/su-tree-test.vue'),
  },
  // {
  //   path: '/image-upload',
  //   component: () => import('../components/su-image-upload-test.vue'),
  // },
  {
    path: '/input',
    component: () => import('../components/su-input-test.vue'),
  },
  {
    path: '/select',
    component: () => import('../components/su-select-test.vue'),
  }, {
    path: '/date',
    component: () => import('../components/su-date-test.vue'),
  }, {
    path: '/tooltip',
    component: () => import('../components/su-tooltip-test.vue'),
  }, {
    path: '/radio',
    component: () => import('../components/su-radio-test.vue'),
  },
  {
    path: '/switch-checkbox',
    component: () => import('../components/su-switch-checkbox-test.vue'),
  }, {
    path: '/table',
    component: () => import('../components/su-table-test.vue'),
  }, {
    path: '/tabs',
    component: () => import('../components/su-tabs-test.vue'),
  },
  {
    path: '/upload',
    component: () => import('../components/su-upload-test.vue'),
  },
]


export default new Router({
  routes,
})
