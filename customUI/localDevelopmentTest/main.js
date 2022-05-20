import Vue from 'vue'
import App from './App.vue'
import '../src/css/app.sass'
import i18n from '../src/utils/I18n'
import Su from '../src'
import router from './router'
import suElement from '../src/element-ui'
import {suEzuikit} from '../src/components/su-ezuikit'

// 萤是的应用密钥信息的配置
suEzuikit.initial({
  appKey: 'c134d68c0374439e89a10691b6e76c95',
  appSecret: '9c6f5a576e853fafb2d55da3990ea7c5',
  xaccessToken: 'at.1yc7tu7i2qu52h4d267ahim66i7h04te-8oiip4zcd4-1xjysuy-gycvfylwf',
})

Vue.use(Su)

Vue.use(suElement, {
  i18n: (key, value) => i18n.t(key, value),
})

Vue.config.productionTip = false

new Vue({
  i18n,
  router,
  render: h => h(App),
}).$mount('#app')
