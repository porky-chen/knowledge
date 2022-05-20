import enLocale from 'element-ui/lib/locale/lang/en'  //引入Element UI的英文包
import zhLocale from 'element-ui/lib/locale/lang/zh-CN' //引入Element UI的中文包
import zh from '../lang/zh'
import en from '../lang/en'
import Vue from 'vue'
import VueI18n from 'vue-i18n'


Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'zh', // 设置地区
  messages:{
    zh: {...zh, ...zhLocale}, //这里需要注意一下，是如何导入多个语言包的
    en: {...en, ...enLocale},
  }
})

export default i18n