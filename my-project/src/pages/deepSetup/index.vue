<template>
  <div>
    <div>{{collectionName}}:{{readerNumber}} {{book.title}}</div>
    <ChildComponent />
    <div ref="root">This is a root element</div>
  </div>
</template>

<script>
// 例子：子组件
import ChildComponent from '@/components/ChildComponent.vue'
// setup返回一个渲染函数，可以直接使用在同一作用域中声明响应式状态
import { h,ref,reactive,provide,inject,readonly,onMounted,watchEffect } from 'vue'

export default {
  components:{ChildComponent},
  props:{
    collectionName:String
  },
  setup(props,{expose}){
    const readerNumber = ref(0)
    const book = reactive({title:'Vue 3 Guide'})

    //在setup返回的refs在模板中访问是被自动浅解包的，因此不应在模板中使用.value所以直接使用readerNumber
    // return {
    //   readerNumber,
    //   book
    // }

    //这里我们需要显式使用 ref 的 value
    // return () => h('div',[readerNumber.value,book.title])


    // 如果需要将这个组件的方法通过模板ref暴露给父组件需要通过调用expose,给他传递一个对象，其中定义的property将可以被外部组件实例访问
    const count = ref(0)
    const increment = () => ++count.value

    // increment方法将可以通过父组件的模板ref访问
    expose({
      increment
    })

    // return () => h('div',count.value)

    // this在组合式API中不是活跃实力的应用，避免使用它，this是在解析其他组件选项之前被调用，与选项式API行为完全不同


    /*----------使用provide------------*/
    // provide(name,value)
    provide('location','North Pole')
    provide('geolocation',{
      longitude: 90,
      latitude: 135
    })

    /*-----------需要接收地组件->使用inject---------------*/
    inject('要inject的property的name','默认值(可选)')
    const userLocation = inject('location','The Universe')
    const userGeoLocation = inject('geolocation')

    // return {
    //   userLocation,userGeoLocation
    // }

    /*-----------为了provide/inject响应式通过ref或reactive---------------*/
    const location = ref('North Pole')
    const geoLocation = reactive({
      longitude: 90,
      latitude: 135
    })

    provide('location',location)
    provide('geoLocation',geoLocation)
    // 现在这两个property有任何更改，inject的组件也会自动更新

    /*-----------希望在inject修改响应式数据---------------*/
    // 建议provide一个方法来负责改变响应式property
    const updateLocation = () => {
      location.value = 'South Pole'
    }
    provide('updateLocation',updateLocation)
    // inject里面
    const updateUserLocation = inject('updateLocation')
    // 然后一起return出去

    // 为了确保provide传递的数据不会被inject组件更改,提供property使用readonly
    provide('location',readonly(location))
    provide('geoLocation',readonly(geoLocation))


    /*-----------模板引用---------------*/
    const root = ref(null)

    onMounted(() => {
      // DOM元素将在初始渲染后分配给ref
      console.log(root.value)// <div>This is a root element</>div>
    })

    // return {root}

    // JXS用法
    // return () => {
    //   h('div',{
    //     ref: root
    //   })
    // }
    // with JSX
    // return () => <div ref={root}>

    // 侦听模板引用watchEffect():在DOM挂载或更新之前运行副作用，当侦听器运行时，模板引用还未被更新
    watchEffect(() => {
      // 副作用在DOM更新之前运行，因此，模板引用还没持有对元素的引用
      console.log(root.value)// null / 使用了flush:'post' 可以=><div>This is a root element</div>
    },{
      flush:'post', // 此定义可以将在DOM更新后运行副作用，确保模板引用与DOM保持同步，
    })
    // return {root}


  }
}
</script>

<style scoped>

</style>
