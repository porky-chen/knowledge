## Loading 加载
加载数据时显示动效。

### 基本用法

::: demo 


```html
<el-button type="primary" @click="onClick">显示加载动画</el-button>
<script>
  export default {
    data() {
      return {
      }
    },
    methods: {
      onClick(){
        const loading = this.$su.SuLoading.getLoading({
          text: '加载',
          showText: true
        })
        setTimeout(() => {
          if (loading) {
            loading.close()
          }
        }, 1000)
      }
    }
  }
</script>
```
:::

### 按钮参数

表单上传包括upload上传组件、preview预览组件等等，

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| text    | 显示在加载图标下方的加载文案 | string | — | 加载 |
| showText    | 是否显示加载文案 | boolean | — | false |
| fullscreen    | 是否全屏显示 | boolean | — | true |
| background    | 遮罩背景色 | string | — | rgba(0, 0, 0, 0.3) |

### 按钮事件

| 事件名称      | 说明          | 回调函数
|---------- |-------------- |---------- 
| onClick | 点击回调函数 | 

