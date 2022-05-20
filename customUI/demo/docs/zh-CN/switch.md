## Switch 开关

### 基础用法

::: demo

```html

<su-switch :active-text="'开'"
           :inactive-text="'关'"
           v-model='switchValue'
/>
<su-switch :active-text="'开-禁用'"
           :inactive-text="'关-禁用'"
           style='margin-top: 12px'
           v-model='switchValue'
           :disabled='true'
/>
<script>
  export default {
    data() {
      return {
        switchValue: false,
      }
    },
    methods: {}
  }
</script>
```

:::

### Checkbox Attributes

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| value/v-model    | 绑定值 | boolean / string / number        | — | — |
| disabled    | 是否禁用 | boolean    | — | false |
| width | switch 的宽度（像素） | number | xx | 40 |
| active-icon-class | switch 打开时所显示图标的类名，设置此项会忽略 active-text | string | xx | xx |
| inactive-icon-class | switch 关闭时所显示图标的类名，设置此项会忽略 inactive-text | xx | xx | xx |
| active-text | switch 打开时的文字描述 | string | xx | xx |
| inactive-text | switch 关闭时的文字描述 | string | xx | xx |
| active-value | switch 打开时的值 | boolean / string / number | xx | true |
| inactive-value | switch 关闭时的值 | boolean / string / number | xx | false |
| active-color | switch 打开时的背景色 | string | xx | #409EFF |
| inactive-color | switch 关闭时的背景色 | string | xx | #C0CCDA |
| name | switch 对应的 name 属性 | string | xx | xx |
| validate-event | 改变 switch 状态时是否触发表单的校验 | boolean | xx | true |

### Checkbox Events

| 参数      | 说明          | 参数      | 
|---------- |-------------- |---------- |
| change    | switch 状态发生变化时的回调函数 | 新状态的值    |



