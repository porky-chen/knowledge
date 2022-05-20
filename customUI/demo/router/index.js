import Vue from 'vue'
import Router from 'vue-router'
// 路由页面
import Design from '../pages/guide/design.vue'
import Nav from '../pages/guide/nav.vue'

Vue.use(Router)

// 参考饿了么进行优化路由
const components_doc_map = path => {
  return r => require.ensure([], () => { r(require(`../docs/zh-CN/${path}.md`)), 'zh-CN' });
}

let routes = [
  {
    path: '/',
    redirect: 'info'
  },
  {
    path: '/info',
    component: () => import('../pages/info/index.vue'),
  },
  {
    path: '/guide',
    component: () => import('../pages/guide/guide.vue'),
    children: [
      {
        path: '/',
        redirect: 'design'
      },
      {
        path: 'design',
        component: Design
      },
      {
        path: 'nav',
        component: Nav
      },
    ]
  },
  {
    path: '/theme',
    component: () => import('../pages/theme/theme.vue'),
  },
  {
    path: '/actionsCreater',
    component: () => import('../pages/actionsCreater'),
  },
]
// 组件列表
let componentsList = [
  'installation',
  'quickstart',
  'form',
  'upload',
  'batch',
  'date',
  'input',
  'autocomplete',
  'select',
  'button',
  'message',
  'messageBox',
  'table',
  'pagination',
  'dialog',
  'checkbox',
  'radio',
  'switch',
  'valudatecode',
  'loading',
  'pdf',
  'tree',
  'image',
  'tabs',
  'menu',
  'layout',
  'search',
  'drawer',
  'approve-progress',
  'approve-status',
]
let componentObj = {
  path: '/component',
  component: () => import('../pages/component/component.vue'),
  children: [{ path: '/', redirect: 'changelog' }, { path: 'changeLog', component: () => import('../pages/component/changelog.vue') }]
}
componentsList.forEach(item => {
  componentObj.children.push({
    path: item,
    component: components_doc_map(item)
  })
})
routes.push(componentObj)

export default new Router({
  routes
})