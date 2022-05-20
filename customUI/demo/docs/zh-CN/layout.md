## Layout 页内布局组件
Menu 菜单组件

### 基本类型  

::: demo 

```html
<su-button @click="dialogVisible=true">点击查看页内布局</su-button>
<su-dialog dialogWidth="100%"  :dialogVisible="dialogVisible" :dialogTitle="dialogTitle" :showDialogBtns="true" @dialogClose="dialogVisible=false" @dialogSuccess="dialogVisible=true">
  <div slot="header">{{dialogTitle}}</div>
  <div slot="content">
    <su-contentlayout style="height:500px">
      <div slot="action">
        主体内容顶栏
      </div>
      <div slot="main">
        主体
      </div>
      <div slot="footer">
        底部
      </div>
      <div slot="filter">
        顶栏
      </div>
      <div slot="aside">
        侧栏
      </div>
      <div slot="asidetitle">
        侧栏title
      </div>
      <div slot="asideheader">
        <su-input/>
      </div>

    </su-contentlayout>
  </div>
</su-dialog>
<script>
  export default {
    data() {
      return {
       dialogVisible:false,
       dialogTitle:'页内布局'
      }
    },
    methods: {
      ...window.$su.methods,
      collapse (value) {
        this.$refs.container.collapse(value)
      },
    }
  }
</script>
```
:::

### 菜单组件参数

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| menuItems | 菜单栏数组 | array | — | — |

### menuItems参数

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| menuName | 菜单项名字，缩回时鼠标经过显示 | String    | — | — |
| menuId  | 菜单项编号 | sring | — | — |
| menuAction  | 菜单项对应路由 | sring | — | — |
| fileUrl  | 图标地址 | sring | — | — |
| children  | 二级菜单栏，现在只支持二级 | array | — | — |

### 菜单组件事件

| 参数      | 说明          | 参数      | 
|---------- |-------------- |---------- |
| collapse    | 展开按钮事件 | true/false |
