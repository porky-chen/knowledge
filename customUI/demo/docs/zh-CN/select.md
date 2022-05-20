## select 下拉框

### 基础用法

::: demo

```html

<su-select :clearable='true'
           v-model='value'
           label-content='标签'
           :options='items'
/>
<su-select :clearable='true'
           v-model='value'
           style='margin-top: 12px'
           label-content='标签-禁用'
           disabled
           :options='items'
/>
<su-select :options='items'
           style='margin-top: 12px'
           label-placement='top-start'
           v-model='value'
           label-content='标签'
/>
<su-select :options='items'
           disabled
           style='margin-top: 12px'
           label-placement='top-start'
           v-model='value'
           label-content='标签-禁用'
/>

<script>
  export default {
    data() {
      return {
        value: null,
        items: [
          {
            value: 1,
            label: '隧道工程项目',
            icon: 'el-icon-search',
            callback() {
              alert(123)
            },
          },
          {
            value: 2,
            label: '连续梁项目连续梁项目连续梁项目连续梁项目',
          },
          {
            value: 3,
            label: '地铁项目',
            disabled: true,
          },
          {
            value: 4,
            label: '桥梁检测项目',
          },
          {
            value: 5,
            label: '很长很长很长很长很长很长很长很长很长很长的项目',
          },
          {
            value: 6,
            label: '很长很长很长很长很长很长很长很长很长很长的项目',
          },
          {
            value: 7,
            label: '很长很长很长很长很长很长很长很长很长很长的项目',
          },
          {
            value: 8,
            label: '很长很长很长很长很长很长很长很长很长很长的项目',
          },
          {
            value: 9,
            label: '很长很长很长很长很长很长很长很长很长很长的项目',
          },
          {
            value: 10,
            label: '很长很长很长很长很长很长很长很长很长很长的项目',
          },
        ],
      }
    },
  }
</script>
```

:::

### 内容自定义

自定义slot=option

::: demo

```html

<su-select :options='items'
           label-placement='top-start'
           style='margin-top: 24px'
           v-model='value'
           labelContent='标签标签'
           :clearable='true'
>
  <div slot-scope='{item}' slot='option'>自定义 - {{ item.label }}</div>
</su-select>

<script>
  export default {
    data() {
      return {
        value: '',
        items: [
          {
            value: 1,
            label: '隧道工程项目',
            icon: 'el-icon-search',
            callback() {
              alert(123)
            }
          },
          {
            value: 2,
            label: '连续梁项目连续梁项目连续梁项目连续梁项目'
          },
          {
            value: 3,
            label: '地铁项目'
          },
          {
            value: 4,
            label: '桥梁检测项目'
          },
          {
            value: 5,
            label: '很长很长很长很长很长很长很长很长很长很长的项目'
          }
        ],
        selected: 1,
      }
    },
    methods: {}
  }
</script>
```

:::

### 多选的下拉框

::: demo

```html

<su-select :options='items'
           v-model='value'
           :clearable='true'
           multiple
/>

<script>
  export default {
    data() {
      return {
        value: '',
        items: [
          {
            value: 1,
            label: '隧道工程项目',
            icon: 'el-icon-search',
            callback() {
              alert(123)
            },
          },
          {
            value: 2,
            label: '连续梁项目连续梁项目连续梁项目连续梁项目',
          },
          {
            value: 3,
            label: '地铁项目',
            disabled: true,
          },
          {
            value: 4,
            label: '桥梁检测项目',
          },
          {
            value: 5,
            label: '很长很长很长很长很长很长很长很长很长很长的项目',
          },
          {
            value: 6,
            label: '很长很长很长很长很长很长很长很长很长很长的项目',
          },
          {
            value: 7,
            label: '很长很长很长很长很长很长很长很长很长很长的项目',
          },
          {
            value: 8,
            label: '很长很长很长很长很长很长很长很长很长很长的项目',
          },
          {
            value: 9,
            label: '很长很长很长很长很长很长很长很长很长很长的项目',
          },
          {
            value: 10,
            label: '很长很长很长很长很长很长很长很长很长很长的项目',
          },
        ],
      }
    },
    methods: {}
  }
</script>
```

:::

### 标签参数（和form的label是不同的）

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|---------- |-------------- |---------- |---------- |---------- |
| showRequiredTag | 标签文本的是否显示必填*号 | Boolean | - | false |
| labelAlign | 标签文本的对齐方式，对应css的text-align | String | - | - |
| labelWidth | 标签文本的长度，对应css的width | String | - | - |
| labelContent | 标签文本内容 | String | - | - |
| labelPlacement | 标签文本的放置位置 | String | left左边，top-start上面 | left |

### Select 下拉框组件参数

| 参数 | 说明 | 类型 | 可选值 | 默认值  |
|----------|----------|----------|-------------|--------|
| value / v-model | 绑定值 | boolean / string / number / array | - | - |
| options | option选项数据集合 | array | - | [] |
| multiple | 是否多选 | boolean | - | false |
| disabled | 是否禁用 | boolean | - | false |
| value-key | 作为 value 唯一标识的键名，绑定值为对象类型时必填 | string | - | value |
| label-key | 作为 label 选项名称的键名 | string | - | label |
| size | 输入框尺寸 | string | medium/small/mini | small |
| clearable | 是否可以清空选项 | boolean | - | true |
| collapse-tags | 多选时是否将选中值按文字的形式展示 | boolean | - | true |
| multiple-limit | 多选时用户最多可以选择的项目数，为 0 则不限制 | number | - | 0 |
| name | select input 的 name 属性 | string | - | - |
| autocomplete | select input 的 autocomplete 属性 | string | - | off |
| placeholder | 占位符 | string | - | 请选择 |
| filterable | 是否可搜索 | boolean | - | true |
| allow-create | 是否允许用户创建新条目，需配合 filterable 使用 | boolean | - | false |
| filter-method | 自定义搜索方法 | function | - | - |
| remote | 是否为远程搜索 | boolean | - | false |
| remote-method | 远程搜索方法 | function | - | - |
| loading | 是否正在从远程获取数据 | boolean | - | false |
| loading-text | 远程加载时显示的文字 | string | - | 加载中 |
| no-match-text | 搜索条件无匹配时显示的文字，也可以使用slot="empty"设置 | string | - | 无匹配数据 |
| no-data-text | 选项为空时显示的文字，也可以使用slot="empty"设置 | string | - | 无数据 |
| popper-class | Select 下拉框的类名 | string | - | - |
| reserve-keyword | 多选且可搜索时，是否在选中一个选项后保留当前的搜索关键词 | boolean | - | false |
| default-first-option | 在输入框按下回车，选择第一个匹配项。需配合 filterable 或 remote 使用 | boolean | - | false |
| popper-append-to-body | 是否将弹出框插入至 body 元素。在弹出框的定位出现问题时，可将该属性设置为 false | boolean | - | true |
| automatic-dropdown | 对于不可搜索的 Select，是否在输入框获得焦点后自动弹出选项菜单 | boolean | - | false |

### Select Events

| 参数 | 说明 | 参数 | 
|---------- |--------|---------- |
| change | 选中值发生变化时触发 | 目前的选中值 |
| visible-change | 下拉框出现/隐藏时触发 | 出现则为 true，隐藏则为 false |
| remove-tag | 多选模式下移除tag时触发 | 移除的tag值 |
| clear | 可清空的单选模式下用户点击清空按钮时触发 | - |
| blur | 当 input 失去焦点时触发 | (event: Event) |
| focus | 当 input 获得焦点时触发 | (event: Event) |

### Select Slots

| name | 说明 | 
|---------- |--------|
| - | 默认插槽，Option 组件列表 |
| prefix | Select 组件头部内容 |
| empty | 无选项时的列表 |
| option | option的内容插槽 |

### options中单项的对象属性

| 参数 | 说明 | 类型 | 可选值 | 默认值  |
|----------|----------|----------|-------------|--------|
| icon | option选项后面的图标 | String | - | - |
| disabled | 选项的可选配置项 | Boolean | - | false |
| value | 由valueKey指定选项对象的属性名对应的值决定 | string | - | - |
| label | 由labelKey指定选项对象的属性名对应的值决定 | string | - | - |

### Select Methods（通过组件的getRef()获取其原生element组件的ref对象）

| 方法名 | 说明 | 参数 | 
|---------- |--------|---------|
| focus | 使 input 获取焦点 | - |
| blur | 使 input 失去焦点，并隐藏下拉框 | - |
