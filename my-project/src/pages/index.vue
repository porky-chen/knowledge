<template>
  <div>1</div>
</template>

<script>
// Vue3.0
import { ref,onMounted,watch,toRefs,computed } from 'vue'

export default {
  name: 'index',
  // props:{
  //   person: Object,
  // },
  data(){
    return {
      user: {
        name: 'Jony',
        age: 11
      }
    }
  },
  //接收props 和 context
  setup(props){
    //使用toRefs创建对props中'person' property 的响应式引用
    const { person } = toRefs(props)

    console.log(props) // {person:{}}

    let repositories = ref([]) // 响应式引用
    const getUserRepositories = async () => {
      // 更新 props.person 到 person.value 访问引用值
      repositories.value = await fetchRepositories(person.value) // fetchRepositories一个定义的异步函数或promise函数
    }

    //在setup中注册生命周期的钩子,和选项式API类型，由on: + 钩子函数，如onMounted,接收一个回调
    onMounted(getUserRepositories) // 在 'mounted' 时调用 'getUserRepositories'

    // person prop 的响应式引用上设置一个侦听器
    watch(person,getUserRepositories)

    // 提供一个计算属性搜索功能
    const searchQuery = ref('')
    const repositoriesMatchingSearchQuery = computed(() => {
      return repositories.value.filter(repository => repository.name.includes(searchQuery.value))
    })

    /**-------------------------------demo---------------------------------------------**/
    //watch 侦听器响应式更改,三个参数(响应式引用或getter函数,回调函数,可选配置选项)
    const count = ref(0)
    watch(count,(val,oldVal) => { // 类似选项式API中watch的工作
      console.log(val,oldVal)
    })


    //独立的 computed 计算属性
    const count1 = ref(0)
    const twiceTheCount1 = computed(() => count1.value * 2) // 第一个参数类似getter的只读函数
    count1.value++
    console.log(count1.value); // 1
    console.log(twiceTheCount1.value); // 2 => 1*2

    /**--------------------------------------------------------------------------------**/

    // 抛出计算属性、方法、生命周期钩子等等
    return {
      repositories,
      getUserRepositories, // 返回的函数，它的行为与将其定义在 methods 选项中的行为相同
      searchQuery,
      repositoriesMatchingSearchQuery,

    }
  },
}
</script>

<style scoped>

</style>
