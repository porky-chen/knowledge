/**
 * 编写插件
 *
 * 1.设置插件对象
 * 2.被引用到引用程序时，会调用对象的install方法，是函数会有两个参数(createAPP生成的app，用户传入的选项)
 * */
export default {
  install: (app,options)=>{
    // Plugin code goes here
    // 想要一个函数来翻译整个应用程序可用的键,将使用app.config.globalProperties
    app.config.globalProperties.$translate = key => { // key字符串
      return key.split('.').reduce((o,i)=>{ // o就是options
        if(o) return o[i]
      },options)
    }

    // 还允许为inject插件的用户提供功能或attribute
    app.provide('name',options) // inject['name']

    // 由于可以访问app，所以支持其他功能如mixin,directive
    app.directive('my-directive',{
      mounted(el,binding,vnode,oldVnode){}
    })

    app.mixin({
      created() {
      }
    })
  }
}
// 再通过createApp激活引用程序，使用use()方法将插件添加到引用程序
// use(要安装的插件,可选的根据特定插件的接受的内容(options))
// 模拟
import {createApp} from 'vue'
import Root from '@/App.vue'
import il8 from '@/il8'

const app = createApp(Root)
const il8String = { // il8String为上面install传入的options
  greeting:{
    hi: 'Hallo!'
  }
}

app.use(il8,il8String)
app.mount('#app')
