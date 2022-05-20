import { toRefs,toRef, provide,resolveComponent } from 'vue'

export default {
  props:{
    title: String
  },
  // 参数props,context
  setup(props,{ attrs,slots,emit,expose }){
    // 由于props的响应式,不允许ES6解构需要通过toRefs来实现以下操作
    const { title } = toRefs(props)
    // 如果title是一个可选的prop，传入的props中可能没有title,toRefs不会为title创建一个ref，需用使用toRef替代它
    // const title = toRef(props,'title')

    console.log(title.value); // 可以获取title的值


    /**----------------context--------------------------**/
    // Attribute (非响应式对象，等同于$attrs)
    console.log(context.attrs) // 有状态对象，attrs.x方式引用property,非响应式，如需根据改property更改应用，应该在onBeforeUpdate生命周期钩子中执行

    // 插槽 (非响应式对象，等同于$slots)
    console.log(context.slots)// 有状态对象，slots.x方式引用property,非响应式，如需根据改property更改应用，应该在onBeforeUpdate生命周期钩子中执行

    // 触发事件 (方法，等同于$emit)
    console.log(context.emit)

    // 暴露公共property (函数)
    console.log(context.expose)

    // context是一个JavaScript对象,非响应式可以直接ES6解构
    // const { attrs,slots,emit,expose } = context

    /**-------------------------------------------------**/

    /**---------------------访问组件的property----------------------------**/
    //执行setup时只能访问props,attrs,emit,slots的property,不能访问data,computed,methods,refs(模板ref)
    // 看deepSetup/index.vue

    /**-----------------------------------------------------------------**/

    /**------------------------setup生命周期钩子函数-----------------------**/
    /**
     * 选项式API
     * beforeCreate,created,beforeMount,mounted,beforeUpdate,updated,beforeUnmount,unmounted,errorCaptured,renderTracked,renderTriggered,activated,deactivated
     * */
    /**
     * 组合式API 对应上面
     * not need,not need, onBeforeMount,onMounted,onBeforeUpdate,onUpdated,onBeforeUnmount,onUnmounted,onErrorCaptured,onRenderTracked,onRenderTriggered,onActivated,onDeactivated
     * */
     //setup围绕beforeCreate和created生命周期钩子运行的，所以不需要显示地定义它们，这些钩子中编写的都应该在setup函数中编写
     // 这些函数都接收一个回调函数 如 onMounted(() => {})

    /**-----------------------------------------------------------------**/

    /**---------------------------Provide/Inject------------------------------**/
      // 看deepSetup/index.vue
    /**-----------------------------------------------------------------------**/

    /**---------------------------模板引用------------------------------**/
    // 为了获得对模板内元素或组件实例的引用，一样声明ref并从setup()返回
    // 看deepSetup/index.vue
    /**-----------------------------------------------------------------------**/

    /**--------------------------Mixin------------------------------**/
    const myMixin = {
      data(){
        return {
          message: 'a',
          foo: 'abc'
        }
      },
      created(){
        console.log('mixin的钩子created')
      },
    }

    const app = Vue.createApp({
      mixins:[myMixin],
      data() {
        return {
          message: 'goodbye',
          bar: 'def'
        }
      },
      created(){
        console.log('组件钩子调用')
      }
    })

    app.mount('#app')
    // 输出，data当同名时会以当前为优先，
    // 同名钩子函数会 先 执行mixin 之后 在调用自身 如上就输出 'mixin的钩子created' 再 '组件钩子调用'
    // methods、components和directives将被合并为同一个对象， 同名取自身否在合并
    const vm = app.mount('#id')
    // vm调用方法名

    // 全局mixin
    const app2 = Vue.createApp({
      myOption: 'hello!'
    })
    // 为自定义选项myOption注入一个处理器
    app2.mixin({
      created() {
        const myOption = this.$options.myOption
        if(myOption){
          console.log(myOption)
        }
      }
    })

    // 将myOption也添加到子组件
    app2.component('test-component',{
      myOption: 'hello from component'
    })

    app2.mount('#mixin-global')
    // => hello!
    // => hello from component

    // 自定义选项合并策略
    // app.config.optionMergeStrategies中添加一个函数
    const app3 = Vue.createApp({
      custom: 'hello!'
    })

    app3.config.optionMergeStrategies.custom = (toVal,fromVal) => fromVal || toVal // 会执行自身再子实例

    app3.mixin({
      custom: 'goodbye',
      created() {
        console.log(this.$options.custom) // hello
      }
    })
    // 如果先实现合并时优先返回子实例的值可以
    app3.config.optionMergeStrategies.custom = (toVal,fromVal) => toVal || fromVal
    app3.mixin({
      custom: 'goodbye',
      created() {
        console.log(this.$options.custom) // goodbye
      }
    })


    /**-------------------------自定义指令------------------------------**/
    const app4 = Vue.createApp({})
    // 注册一个全局自定义指令v-focus
    app4.directives('focus',{
      // 当被绑定的元素过载到 DOM 中时
      mounted(el){
        // 聚焦元素
        el.focus()
      }
    })
    // 注册局部指令，组件中接受一个directives
    // directive:{ 写在选中API中
    //   focus: {
    //     // 指令定义
    //     mounted(el){
    //       el.focus()
    //     }
    //   }
    // }

    // 指令提供的钩子函数(均可选)
    // created:再绑定attribute或事件监听器被应用之前调用。在指令需要附加再普通的v-on事件监听器调用前的事件监听器中时，这很有用
    // beforeMount: 当指令第一次绑定到元素并且再挂载父组件之前调用
    // mounted: 挂载父组件之后调用
    // beforeUpdate: 更新包含组件的VNode之前调用
    // updated: 更新之后调用
    // beforeUnmount: 在卸载绑定元素的父组件之前调用
    // unmounted: 当指令与元素接触绑定且父组件已卸载时，只调用一次

    // 方法里面的参数如mounted(el,binding)
    // el： 元素本身
    // binding: 传递给指令的值,binding.value,
    // 动态参数 v-xx:[direction] 通过binding.arg可以获取传递给指令的参数

    // 如果想在mounted和updated实现同样的效果可以通过函数简写
    app4.directives('name',(el,binding) => {}) // 回调的方法会作用在mounted和updated



    /**-------------------------渲染函数------------------------------**/
    // app.component('anchored-heading',{
    //   render(createElement, context) {
    //     return h(
    //       'h'+this.level,// 标签名
    //       {}, // prop和attribute
    //       this.$slots.default() // 包含其子节点的数组,默认，没有被具名的插槽
    //     )
    //   },
    //   props:{
    //     level:Number
    //   }
    // })

    // 比如 <h1>{{blogTitle}}</h1> 等同于渲染函数 render(){ return h('h1',{},this.blogTitle) }

    //return h() ;// 返回一个createNodeDescription/VNode/虚拟DOM/虚拟节点
    //h(); 创建VNode的实用程序。createVNode()接受三个参数,
    h(
      // {String | Object | Function} tag
      // 一个HTML标签名、一个组件、一个异步组件、或一个函数式组件
      // 必需的
      'div',

      // {object} props
      // 与attribute、prop和事件相对应的对象。会在模板中用到。可选的
      {},

      //{String|Array|Object} children
      // 子VNode,使用 h() 构建,或使用字符串获取 文本VNode 或者 有插槽对象。 可选
      [
        'Some text comes first',
        h('h1','A headline'),
        h(MyComponent,{
          someProp: 'foobar'
        })
      ]
    )

    // 完整锚点实例
    const app5 = Vue.createApp({})

    // 递归从子节点获取文本
    function getChildrenTextContent(children){
      return children.map(node => {
        return typeof node.children === 'string' // 判断是否文本
        ? node.children // 文本直接返回
          : Array.isArray(node.children) ? // 如果还存在子节点
            getChildrenTextContent(node.children) // 递归子节点判断
            : '' // 无节点返回空
      }).join('')
    }

    app5.component('anchored-heading',{
      render(){
        // 从 children的文本内容中创建短横线分隔(kebab-case)id
        const headingId = getChildrenTextContent(this.$slots.default())
          .toLowerCase()
          .replace(/\W+/g,'-') // 使用 - 替换非单词字符
          .replace(/(^- | -$)/g,'') // 删除前后 -

        return h(
          'h' + this.level,
          [
            h(
              'a',
              {
                name: headingId,
                href: '#'+headingId
              },
              this.$slots.default()
            )
          ]
        )
      },
      props:{
        level:Number
      }
    })

    // VNodes必须唯一,下面工厂函数实现渲染20个相同的段落
    // render(){
    //   return h('div',
    //     Array.from({length:20}).map(() => {
    //       return h('p','hi')
    //     })
    //     )
    // }

    // TODO:要为某个组件创建一个VNode,传递给h的第一个参数应该是组件本身
    // TODO:如果需要通过名称来解析一个组件，可以调用resolveComponent,resolveComponent 是模板内部用来解析组件名称的同一个函数
    const { h ,resolveComponent} = Vue

    // render(){
    //   const ButtonCounter = resolveComponent('ButtonCounter')
    //   return h(ButtonCounter)
    // }

    // 简化前
    // components:{
    //   ButtonCounter
    // },
    // // 简化后
    // render(){
    //   return h(resolveComponent(ButtonCounter)) // 全局注册使用时用到resolveComponent
    // }

    // TODO:v-if、v-else、v-for在渲染函数中if\else和map()来重写
    app5.component('xxx',{
      props:['items','modelValue'],
      emits:['update:modelValue'],
      render(){
        // v-if,v-else,v-for
        if(this.items.length){
          return h('ul',this.items.map(item => {
            return h('li',item.name)
          }))
        }else{
          return h('p','No items found.')
        }

        // TODO:v-model 指令扩展为 modelValue 和 onUpdate:modelValue,必须自己提供prop
        // return h(SmoeComponent,{
        //   modelValue:this.modelValue,
        //   'onUpdate:modelValue':value => this.$emit('update:modelValue',value)
        // })

        // TODO:v-on 要处理 click 事件，prop 名称应该是 onClick, 对于事件修饰符 .passive 、.capture 和 .once 事件修饰符可以使用驼峰拼接在事件后面，onClickCapture
        // return h('div',{
        //   onClick: $event => console.log('clicked',$event.target)
        //   onClickCapture: $event => console.log('clicked',$event.target)
        // })
        // 修饰符 .stop,.prevent,.self,.enter === .13,.ctrl,.alt,.shift,.meta,
        // 函数等价 event.stopPropagation(),event.preventDefault(),event.target !== event.currentTarget,keyCode,ctrlKey,altKey,shiftKey,metaKey

        // TODO:插槽 this.$slots 访问静态内容,每一个插槽都是一个VNode数组
        // return h('div', this.$slots.default())
        // <div><slot :text="message"></slot></div>
        // props:['message'],
        // render(){
        //   return h('div',this.$slots.default({
        //     text: this.message
        //   }))
        // }

        //TODO: 传递给子组件
        //const { h, resolveComponent } = Vue
        //
        // render() {
        //   // `<div><child v-slot="props"><span>{{ props.text }}</span></child></div>`
        // resolveComponent('child')外插槽函数之外进行，避免错误的组件进行解析
        //   return h('div', [
        //     h(
        //       resolveComponent('child'),
        //       {},
        //       // 将 `slots` 以 { name: props => VNode | Array<VNode> } 的形式传递给子对象。
        //       {
        //         default: (props) => h('span', props.text)
        //       }
        //     )
        //   ])
        // }


        // TODO:<component>和is, resolveDynamicComponent来实现is的attribute,支持传递一个组件名称、一个 HTML 元素名称或一个组件选项对象
        // const { h, resolveDynamicComponent } = Vue
        // //`<component :is="name"></component>`
        // render() {
        //   const Component = resolveDynamicComponent(this.name)
        //   return h(Component)
        // }

        // TODO:自定义指令 , withDirectives将自定义指令应用于 VNode,resolveDirective模板内部用来解析指令名称的同一个函数
        // const { h, resolveDirective, withDirectives } = Vue
        // // <div v-pin:top.animate="200"></div>
        // render () {
        //   const pin = resolveDirective('pin')
        //
        //   return withDirectives(h('div'), [
        //     [pin, 200, 'top', { animate: true }]
        //   ])
        // }

        // TODO:内置组件需要自行导入
        // const { h, KeepAlive, Teleport, Transition, TransitionGroup } = Vue

        // TODO:vue与Web Components
        // 为了防止在使用组件的时候未引入而报错可以全局配置
        // 1、浏览器内配置示例(仅当使用浏览器内编译有效)
        app.config.compilerOptions.isCustonElement = tag => tag.includes('-') // 包含-的标签作为自定义元素处理
        // 2、Vite配置示例(vite.config.js)
        // import vue from '@vitejs/plugini-vue'
        //export default {
        //   plugins:[
        //     Vue({
        //       template: {
        //         compilerOptions: {
        //           // 将所有包含-的标签作为自定义元素处理
        //           isCustomElement: tag => tag.includes('-')
        //         }
        //       }
        //     })
        //   ]
        //}
        // 3、Vue Cli 配置
        // DOM property :user.prop == .user
        //   <my-element :user.prop="{ name: 'jack' }"></my-element>

        // <!-- 等效的简写 -->
        // <my-element .user="{ name: 'jack' }"></my-element>

      }
    })

  }
}
// TODO:Vue构建自定义元素 defineCustomElement
// Vue仅支持defineCustomElement方法创建自定义元素
import { defineCustomElement } from 'vue'

const MyVueElement = defineCustomElement({
  // 提供正常vue组件
  props:{},
  emits:{},
  template: ``,

  // defineCustomElement 独有特性 CSS 会被注入到隐式根(shadow root)中
  style: [`/*inline css*/`]
})

// 注册自定义元素
// 完成后搜有的<my-vue-element>标签 会被更新
customElements.define('my-vue-element',MyVueElement)

//实例化元素
document.body.appendChild(
  new MyVueElement({
    // initial props (options)
  })
)

// TODO:响应式



