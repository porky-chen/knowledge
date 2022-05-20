/**
 * 独立的组合式函数模块 -> 渲染、侦听
 * */
import { fetchRepositories }  from '@/api/repositories'
import { ref,onMounted,watch } from 'vue'

export default function userPersonRepositories(person) {
  const repositories = ref([]) // 响应式引用
  const getUserRepositories = async () => {
    // 更新 props.person 到 person.value 访问引用值
    repositories.value = await fetchRepositories(person.value) // fetchRepositories一个定义的异步函数或promise函数
  }

  //在setup中注册生命周期的钩子,和选项式API类型，由on: + 钩子函数，如onMounted,接收一个回调
  onMounted(getUserRepositories) // 在 'mounted' 时调用 'getUserRepositories'

  // person prop 的响应式引用上设置一个侦听器
  watch(person,getUserRepositories)

  return {
    repositories,
    getUserRepositories
  }
}
