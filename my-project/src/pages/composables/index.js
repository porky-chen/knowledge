/**
 * 单独的模块引入
 * */
import userPersonRepositories from './userPersonRepositories';
import userRepositoryNameSearchQuery from './userRepositoryNameSearch';
import { toRefs } from 'vue'

export default {
  components:{},
  props:{
    person:{
      type: String,
      required:true
    }
  },
  setup(props){
    const { person } = toRefs(props)

    const { repositories, getUserRepositories } = userPersonRepositories(person)

    const { searchQuery,repositoriesMatchingSearchQuery } = userRepositoryNameSearchQuery(repositories)

    return {
      // 在repositories 名称下暴露过滤后的结果
      repositories: repositoriesMatchingSearchQuery,
      getUserRepositories,
      searchQuery
    }
  },
}
