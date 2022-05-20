import Vue from 'vue'
import App from './App.vue'
import '../src/css/app.sass'
import i18n from '../src/utils/I18n'
import Su from '../src'
import router from './router'

import Element from 'element-ui'

Vue.use(Su)

Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value),
})

Vue.config.productionTip = false

new Vue({
  i18n,
  router,
  render: h => h(App),
}).$mount('#app')
