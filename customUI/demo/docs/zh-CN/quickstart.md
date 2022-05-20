## 快速上手

本节将介绍如何在项目中使用 SunrtUI

### 安装相关依赖

SunrtUI 依赖Element组件库，使用之前先确保有正确安装依赖

#### 完整引入

在 main.js 中写入以下内容：

```javascript
import Vue from 'vue'
import App from './App.vue'
import Su from 'sunrtui'
import ElementUI from 'element-ui'
import 'sunrtui/src/css/app.sass'
import i18n from 'sunrtui/src/utils/I18n'
import store from './store'
import router from './router'
import Axios from 'axios'
import API from './api'

Vue.config.productionTip = false

Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
});

Vue.use(Su)

Vue.prototype.$axios = Axios
Vue.prototype.$api = API

const $su = window.$su

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
```

以上代码便完成了 SunrtUI 的引入。需要注意的是，样式文件需要单独引入sass文件。

### 开始使用

至此，一个基于 Vue 和 SunrtUI 的开发环境已经搭建完毕，现在就可以编写代码了。各个组件的使用方法请参阅它们各自的文档。
