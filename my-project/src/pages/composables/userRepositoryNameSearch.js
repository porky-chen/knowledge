/**
 * 独立的组合式函数模块 -> 搜索功能
 * */

import { ref,computed } from 'vue'

export default function userRepositoryNameSearchQuery(repositories){
  // 提供一个计算属性搜索功能
  const searchQuery = ref('')
  const repositoriesMatchingSearchQuery = computed(() => {
    return repositories.value.filter(repository => repository.name.includes(searchQuery.value))
  })

  return {
    searchQuery,
    repositoriesMatchingSearchQuery
  }
}
