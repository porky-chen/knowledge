## autocomplete 过滤数据输入框
autocomplete 输入框

<br/>
<br/>
1.如何配置配置项？<br/>
答：autocompleteItems配置项中需要自己设置fetchSuggestions函数用来对需要搜索的数据做一个过滤作用 详情参考案例一中的配置项代码<br/>


### 基础用法
autocomplete 为过滤数据输入框

::: demo


```html
<su-autocomplete :maxlength='50' :autocompleteItems="autocompleteItems" :autocompleteData="autocompleteData">
</su-autocomplete>
<script>
  export default {
    data() {
      return {
        autocompleteItems: {
          width:'200px',
          field:'test',
          clearable:true,
          fetchSuggestions:(queryString, cb) =>{
            var restaurants = [
              {
                afterHangAttachment: null,
                attachment: "062c3875c830451cbdea56c865a615ad,4f8a5e90f6334dca8492b97a9a81517b,7f25e3aa797a4050943f194597cb7f05,8b72e374d70d442cb0fcc2396c2a6886",
                bridgeTypeId: 21,
                bridgeTypeName: null,
                code: "2-2",
                conbeamId: "80ee133e0af548278b73ab0d3ad6d3ce",
                concreteElastic: 50,
                concreteValumn: 8,
                configType: 0,
                constructionLoad: 50,
                createTime: "2020-10-30 10:37:18",
                createUserId: "503841b0a19311ea9b00a558f49f4903",
                createUserName: "1#测量员",
                designCode: "202-2",
                endMileage: "DK100+160.00",
                hangChange: 50,
                length: 60,
                name: "2-1连续梁",
                nodeCode: null,
                nodeId: "8E564F957D0867F7E050007F01003169",
                nodeName: null,
                pointPositionView: null,
                startMileage: "DK000+100.100",
                steelElastic: 50,
                supportChange: 50,
              },
              {
                afterHangAttachment: null,
                attachment: "062c3875c830451cbdea56c865a615ad,4f8a5e90f6334dca8492b97a9a81517b,7f25e3aa797a4050943f194597cb7f05,8b72e374d70d442cb0fcc2396c2a6886",
                bridgeTypeId: 21,
                bridgeTypeName: null,
                code: "2-2",
                conbeamId: "80ee133e0af548278b73ab0d3ad6d3ce",
                concreteElastic: 50,
                concreteValumn: 8,
                configType: 0,
                constructionLoad: 50,
                createTime: "2020-10-30 10:37:18",
                createUserId: "503841b0a19311ea9b00a558f49f4903",
                createUserName: "1#测量员",
                designCode: "202-2",
                endMileage: "DK100+160.00",
                hangChange: 50,
                length: 60,
                name: "2-2连续梁",
                nodeCode: null,
                nodeId: "8E564F957D0867F7E050007F01003169",
                nodeName: null,
                pointPositionView: null,
                startMileage: "DK000+100.100",
                steelElastic: 50,
                supportChange: 50,
              },
            ];
            var results = queryString ? restaurants.filter(this.autocompleteItems.createStateFilter(queryString)) : restaurants;
           cb(results);
          },
          showSearchIcon:true,
          // 选择后的回调函数
          handleSelect:(item)=>{
            this.autocompleteData[this.autocompleteItems.field]=item.name
            this.$emit('handleSearch',item)
          },
          textOverflowLimitLength:20,
          // 用于过滤
          createStateFilter:(queryString) =>{
            return (state) => {
              return (state[this.autocompleteItems.nodeName].toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
          },
          nodeName:'name',
        },
        autocompleteData:{
          test:undefined
        }
      }
    },
    methods: {

    }
  }
</script>
```
:::


### Autocomplete参数

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| autocompleteItems | 配置项文件 | Object    | — | — |
| autocompleteData | 保存数据的对象 | Object    | — | — |


### autocompleteItems参数

| 参数      | 说明          | 参数      | 
|---------- |-------------- |---------- |
| fetchSuggestions    | 返回输入建议的方法，仅当你的输入建议数据 resolve 时，通过调用 callback(data:[]) 来返回它 | 一个函数    |
| handleSelect    | 选择后的回调方法 | 一个函数    |
| createStateFilter    | 过滤方法 | 一个函数    |

### Autocomplete事件

| 参数      | 说明          | 参数      | 
|---------- |-------------- |---------- |
| handleSelect    | 选择后的回调函数 | 新状态的值    |



