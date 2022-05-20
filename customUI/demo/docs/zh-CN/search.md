## 搜索框

::: demo 搜索框。

```html

<su-search label-key='value'
           v-model='value'
           :suggestion-data-list='suggestionDataList'
/>
<script>
  export default {
    data() {
      return {
        value: null,
        suggestionDataList: [
          {'value': '三全鲜食（北新泾店）', 'address': '长宁区新渔路144号'},
          {'value': 'Hot honey 首尔炸鸡（仙霞路）', 'address': '上海市长宁区淞虹路661号'},
          {'value': '新旺角茶餐厅', 'address': '上海市普陀区真北路988号创邑金沙谷6号楼113'},
          {'value': '新旺角茶餐厅', 'address': '上海市普陀区真北路988号创邑金沙谷6号楼113'},
          {'value': '新旺角茶餐厅', 'address': '上海市普陀区真北路988号创邑金沙谷6号楼113'},
          {'value': '新旺角茶餐厅', 'address': '上海市普陀区真北路988号创邑金沙谷6号楼113'},
          {'value': '新旺角茶餐厅', 'address': '上海市普陀区真北路988号创邑金沙谷6号楼113'},
          {'value': '新旺角茶餐厅', 'address': '上海市普陀区真北路988号创邑金沙谷6号楼113'},
          {'value': '泷千家(天山西路店)', 'address': '天山西路438号'},
          {'value': '胖仙女纸杯蛋糕胖仙女纸杯蛋糕（上海凌空店）', 'address': '上海市长宁区金钟路968号1幢18号楼一层商铺18-101'},
        ],
      }
    },
    methods: {}
  }
</script>

```

:::

### Search Attributes

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| placeholder | 默认提示 | string | '快速搜索' | — |
| disabled | 禁用 | boolean | - | false |
| value-key | 输入建议对象中用于显示的键名 | string | - | value |
| value | 必填值，输入绑定值 | string | - | - |
| debounce | 获取输入建议的去抖延时 | number | - | 300 |
| placement | 菜单弹出位置 | string | top / top-start / top-end / bottom / bottom-start / bottom-end | bottom-start |
| fetch-suggestions | 返回输入建议的方法，仅当你的输入建议数据 resolve 时，通过调用 callback(data:[]) 来返回它 | Function(queryString, callback) | - | 以{labelKey}指定的属性值进行过滤搜索 |
| popper-class | Autocomplete 下拉列表的类名 | string | - | - |
| trigger-on-focus | 是否在输入框 focus 时显示建议列表 | boolean | - | true |
| name | 原生属性 | string | - | - |
| select-when-unmatched | 在输入没有任何匹配建议的情况下，按下回车是否触发 select 事件 | boolean | - | false |
| label | 输入框关联的label文字 | string | - | - |
| prefix-icon | 输入框头部图标     | string | - | el-icon-search |
| suffix-icon | 输入框尾部图标 | string | - | - |
| hide-loading | 是否隐藏远程加载时的加载图标 | boolean | - | false |
| popper-append-to-body | 是否将下拉列表插入至 body 元素。在下拉列表的定位出现问题时，可将该属性设置为 false | boolean | - | true |
| highlight-first-item | 是否默认突出显示远程搜索建议中的第一项 | boolean | - | false |

### Search Slots

| name      | 说明          |
|---------- |-------------- | 
| prefix | 输入框头部内容 |
| suffix | 输入框尾部内容 |
| prepend | 输入框前置内容 |
| append | 输入框后置内容 |

### Search Events

| 事件名称      | 说明          | 回调参数 |
|---------- |-------------- |  ---- |
| select | 点击选中建议项时触发     | 选中建议项 |
| change | 在 Input 值改变时触发 | (value: string | number) |

### Search Methods（通过组件的getRef()获取其原生element组件的ref对象）

| 方法名 | 说明 | 参数 |
|---------- |-------------- |  ---- |
| focus | 使 input 获取焦点 | - |
