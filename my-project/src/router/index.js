import Vue from 'vue'
import Router from 'vue-router'
import Demo from '@/pages/demo.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Demo',
      name: 'Demo',
      component: Demo
    },
    {
      path: '/demo1',
      name: 'demo1',
      component: () => import('../pages/demo1.vue')
    },
    {
      path: '/expressApp',
      name: 'express-app',
      component: () => import('../pages/express-app.vue')
    },
    {
      path: '/',
      name: 'bootstrapPage',
      component: () => import('../pages/bootstrapPage.vue')
    },
    {
      path: '/table',
      name: 'table',
      component: () => import('../pages/table.vue')
    },
    {
      path: '/index',
      name: 'index',
      component: () => import('../pages/index.vue')
    },
    {
      path: '/antvG2',
      name: 'antvG2',
      component: () => import('../pages/antvG2.vue')
    },
  ]
})
