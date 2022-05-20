## Checkbox 多选组件

多选组件

### 半选中效果 - 无法切换其他状态

::: demo

```html

<su-checkbox :items='checkItems1' />
<script>
  export default {
    data() {
      return {
        checkItems1: [
          {label: '默认未选1', indeterminate: true, checked: false},
          {label: '默认未选2', indeterminate: true, checked: true},
        ],
      }
    },
    methods: {}
  }
</script>
```

:::

### 默认态，悬停态，已选，半勾选状态，禁用

::: demo

```html

<su-checkbox :items='checkItems'
             v-model='checkValue'
/>
<script>
  export default {
    data() {
      return {
        checkValue: [],
        checkItems: [
          {label: '默认未选1', checked: false},
          {label: '鼠标悬浮2', checked: true},
          {label: '已选', checked: true},
          {label: 'x选'},
          {label: '默认选择', checked: true, disabled: true},
          {label: '禁选', disabled: true},
        ],
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
| value / v-model | 绑定值 | array | — | [] |
| items | 复选框数据集合 | array | [] |
| size | 多选框组尺寸，仅对按钮形式的 Checkbox 或带有边框的 Checkbox 有效 | string | medium / small / mini     | - |
| disabled | 是否禁用 | boolean | - | false |
| min | 可被勾选的 checkbox 的最小数量 | number | - | - |
| max | 可被勾选的 checkbox 的最大数量 | number | - | - |
| text-color | 按钮形式的 Checkbox 激活时的文本颜色 | string | - | #ffffff |
| fill | 按钮形式的 Checkbox 激活时的填充色和边框色 | string | - | #409EFF |

### Checkbox Event

| 事件名称 | 说明 | 回调参数 | 
|---------- |-------------- |---------- |
[comment]: <不建议使用，直接用v-model即可> (| getCheckedItems | 获取选中的值 | —    |)
[comment]: <不建议使用，直接用v-model即可> (| setCheckedItems | 设置选中的勾选项 | - |)
| change | 当绑定值变化时触发的事件    | 更新后的值 |
| input | 当绑定值变化时触发的事件    | 更新后的值 |

### data的单项的对象属性说明

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| label | 选中状态的值（只有在checkbox-group或者绑定对象类型为array时有效） | string / number / boolean | -x | - |
| true-label | 选中时的值 | string / number | -x | - |
| false-label | 没有选中时的值 | string / number | -x | - |
| disabled | 是否禁用 | boolean | -x | false |
| border | 是否显示边框 | boolean | -x | false |
| size | Checkbox 的尺寸，仅在 border 为真时有效 | string | medium / small / mini | - |
| name | 原生 name 属性 | string | -x | - |
| checked | 当前是否勾选 | boolean | -x | false |
| indeterminate | 设置 indeterminate 状态，只负责样式控制 | boolean | 'su-checkbox-indeterminate' - true | false |


