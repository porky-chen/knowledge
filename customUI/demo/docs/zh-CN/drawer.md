## Drawer 抽屉组件
Drawer 抽屉组件

<br/>
<br/>
常见问题：
<br/>
1.抽屉组件需要配置的东西<br/>
答：visible用于控制显示隐藏 width宽度 direction弹出方向 slot为header content的具名插槽对应抽屉组件的标题和内容区域<br/>
<br/>

### 基本类型  

::: demo 

```html
<su-button @click="visible=true">点击显示抽屉</su-button>
<su-drawer @drawerClose="close" :modal="modal" :visible.sync="visible" width="1153px" direction="rtl">
  <header slot="header" class="pipeline-stat-dialog-header">管线迁改台账详情</header>
   <section slot="content" class="pipeline-stat-dialog-content">
      <div class="basic-info-title">基本信息</div>
   </section>
</su-drawer>
<script>
  export default {
    data() {
      return {
        modal:true,
        visible:false,
      }
    },
    methods: {
      ...window.$su.methods,
      close(){
        this.visible=false
      }
    }
  }
</script>
```
:::

### 切换组件参数

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| modal    | 是否需要遮罩层 | boolean    | true false | — |
| visible  | 是否显示 Drawer，支持 .sync 修饰符 | boolean    | true false | false |
| width  | 抽屉的宽度 | number / string | — | 30% |
| direction  | Drawer 打开的方向 | Direction | rtl / ltr / ttb / btt | rtl |
| showTitle  | 是否显示默认的title | boolean | true false | true |
| appendtobody  | 自身是否插入至 body 元素上 | boolean | true false | true |
| customClass  | 自定义class | string | - | - |
| customClass  | 自定义class | string | - | - |
| title  | 自定义标题名称 | string | - | - |
| showBtns  | 是否显示自定义按钮 | boolean | true false | true |
| btnDisabled  | 确定按钮是否禁止点击 | boolean | true false | false |
| btnLoading  | 确定按钮是否有loading动画 | boolean | true false | false |

### 插槽

| 参数      | 说明          | 
|---------- |-------------- |
| header    | 标题头部 | 
| content    | 内容主题部分 | 
| btns    | 自定义按钮部分 | 

### 切换组件事件

| 参数      | 说明          | 参数      | 
|---------- |-------------- |---------- |
| drawerClose    | 切换栏的点击事件 | 当前点击项的索引值 |
| drawerSuccess    | 切换栏的点击事件 | 当前点击项的索引值 |
