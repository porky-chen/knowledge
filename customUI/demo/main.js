import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui'
import '../src/css/app.sass'
import router from './router'
import i18n from '../src/utils/I18n'
import Su from '../src'
import hljs from 'highlight.js';
import store from './store';

// 引入饿了么模板
import demoBlock from './components/demo-block';
import MainFooter from './components/footer';
import MainHeader from './components/header';
import SideNav from './components/side-nav';
import FooterNav from './components/footer-nav';

import './demo-styles/index.scss';
import './assets/styles/common.scss';
import './assets/styles/fonts/style.css';

Vue.use(Su)
Vue.component('demo-block', demoBlock);
Vue.component('main-footer', MainFooter);
Vue.component('main-header', MainHeader);
Vue.component('side-nav', SideNav);
Vue.component('footer-nav', FooterNav);

Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value)
});

Vue.config.productionTip = false

router.afterEach(() => {
  Vue.nextTick(() => {
    const blocks = document.querySelectorAll('pre code:not(.hljs)');
    Array.prototype.forEach.call(blocks, hljs.highlightBlock);
  });
});

new Vue({
  i18n,
  router,
  store,
  render: h => h(App),
}).$mount('#app')