## Pagination 分页器
用于展示多条结构类似的数据，可对数据进行排序、筛选、对比或其他自定义操作。

### 基础表格
基础的表格展示用法。

::: demo 

```html
<el-row>
 <su-button 
     type="text" 
     @click="change"
     class="">改变页数</su-button>
<su-pagination style="align-self: start;" 
              :current-page="data.pageIndex"
              :page-size="data.pageSize"
              :total="data.totalRecords"
              @update:pageSize="data.pageSize=$event"
              @update:currentPage="data.pageIndex=$event"
              @change="query" />
</el-row>
<script>
  export default {
    data() {
      return {
        data: {
          pageIndex: 1,
          pageSize: 15,
          totalRecords: 100,
        },
        test:true
      }
    },
    methods: {
      // 页面请求分页的接口
      query (e) {
       console.log('data1',e)
       console.log('data2',this.data)
      },
      change(){
          this.test=!this.test
          this.data.pageIndex=this.test?1:2
          this.data.pageSize=this.test?15:30
          this.data={... this.data}
      }
    }
  }
</script>
```
:::

### Table参数

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| pageIndex    | 当前分页器在第几页 | Number    | — | — |
| pageSize    | 当前分页器一页显示多少条 | Number    | — | — |
| total    | 当前分页器共有多少条 | Number    | — | — |


### Table事件

| 参数      | 说明          | 参数      | 
|---------- |-------------- |---------- |
| change    | 更改每页显示条数、改变页数、跳转触发的事件 | 当前的pageIndex  pageSize    |


