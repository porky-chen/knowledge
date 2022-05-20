## Tabs 切换组件
Tabs 切换组件

### 基本类型  

::: demo 

```html
<su-tabs :tabIndex="tabIndex" @clickTab="clickTab" tabType="button" :columns="columns"></su-tabs>
<script>
  export default {
    data() {
      return {
        columns: [
          {
            label: '理论值'
          },
          {
            label: '设计值'
          },
          {
            label: '预拱度'
          },
        ],
        tabIndex:0
      }
    },
    methods: {
      ...window.$su.methods,
      // tab点击
      clickTab (e) {
        this.tabIndex = e
      },
    }
  }
</script>
```
:::

### 按钮下划线类型  

::: demo 

```html
<su-tabs :tabIndex="tabIndex" @clickTab="clickTab" tabType="button-underline" :columns="columns"></su-tabs>
<script>
  export default {
    data() {
      return {
        columns: [
          {
            label: '理论值'
          },
          {
            label: '设计值'
          },
          {
            label: '预拱度'
          },
        ],
        tabIndex:0
      }
    },
    methods: {
      ...window.$su.methods,
      // tab点击
      clickTab (e) {
        this.tabIndex = e
      },
    }
  }
</script>
```
:::

### 文字下划线类型  

::: demo 

```html
<su-tabs :tabIndex="tabIndex" @clickTab="clickTab" tabType="text-underline" :columns="columns"></su-tabs>
<script>
  export default {
    data() {
      return {
        columns: [
          {
            label: '理论值'
          },
          {
            label: '设计值'
          },
          {
            label: '预拱度'
          },
        ],
        tabIndex:0
      }
    },
    methods: {
      ...window.$su.methods,
      // tab点击
      clickTab (e) {
        this.tabIndex = e
      },
    }
  }
</script>
```
:::

### 文字类型  

::: demo 

```html
<su-tabs :tabIndex="tabIndex"  @clickTab="clickTab" tabType="text" :columns="columns"></su-tabs>
<script>
  export default {
    data() {
      return {
        columns: [
          {
            label: '理论值'
          },
          {
            label: '设计值'
          },
          {
            label: '预拱度'
          },
        ],
        tabIndex:0
      }
    },
    methods: {
      ...window.$su.methods,
      // tab点击
      clickTab (e) {
        this.tabIndex = e
      },
    }
  }
</script>
```
:::


### 切换组件参数

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| tabType    | 切换栏的类型 | String    | button button-underline text text-underline | — |
| columns  | 切换栏的子项 | Array    | [{label:"理论值"}] | — |
| tabIndex  | 切换栏当前行的索引值 | Number | — | — |

### 切换组件事件

| 参数      | 说明          | 参数      | 
|---------- |-------------- |---------- |
| clickTab    | 切换栏的点击事件 | 当前点击项的索引值 |
