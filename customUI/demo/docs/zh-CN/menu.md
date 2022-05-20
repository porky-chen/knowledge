## Menu 菜单组件
Menu 菜单组件

### 基本类型  

::: demo 

```html
<su-menu  style="width:100%;height:500px"
             :data="menuItems"
             @collapse="collapse" />
<script>
  export default {
    data() {
      return {
        menuItems: [
          {
            menuName: '首页',
            menuId: 'home',
            menuAction: '/Home',
          },
          {
            menuName: '按钮',
            menuId: 'button',
            menuAction: '/buttons-page',
          },
          {
            menuAction: '/upload-page',
            menuId: 'upload',
            menuName: '上传',
          }
        ],
        tabIndex:0
      }
    },
    methods: {
      ...window.$su.methods,
      collapse (value) {
        this.$refs.container.collapse(value)
      }
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
