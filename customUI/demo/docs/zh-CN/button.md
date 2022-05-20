## 按钮

常用按钮

### 普通按钮

::: demo 所有项目通用按钮尽量使用通用按钮，尽量不使用el-button。尽量，使用通用按钮的预定义类型。

```html

<el-row type='flex' align='middle'>
  <su-button @click='clickAdd' buttonType='add' />
  <su-button @click='clickAdd' buttonType='batchadd' />
  <su-button @click='clickAdd' buttonType='edit' />
  <su-button @click='clickAdd' buttonType='del' />
  <su-button @click='clickAdd' buttonType='link' />
  <su-button @click='clickAdd' buttonType='release' />
  <su-button @click='clickAdd' buttonType='import' />
  <su-button @click='clickAdd' buttonType='export' />
  <su-button @click='clickAdd' buttonType='cancel' />
</el-row>
<el-row type='flex' align='middle'>
  <su-button :disabled='true' @click='clickAdd' buttonType='add' />
  <su-button :disabled='true' @click='clickAdd' buttonType='batchadd' />
  <su-button :disabled='true' @click='clickAdd' buttonType='edit' />
  <su-button :disabled='true' @click='clickAdd' buttonType='del' />
  <su-button :disabled='true' @click='clickAdd' buttonType='link' />
  <su-button :disabled='true' @click='clickAdd' buttonType='release' />
  <su-button :disabled='true' @click='clickAdd' buttonType='import' />
  <su-button :disabled='true' @click='clickAdd' buttonType='export' />
  <su-button :disabled='true' @click='clickAdd' buttonType='cancel' />
</el-row>
<script>
  export default {
    data() {
      return {}
    },
    methods: {
      clickAdd() {

      }
    }
  }
</script>
```

:::
:::tip 通用按钮有几个预定义的类型，也可以自定义。如果，大量出现同一个自定义按钮，可以将其增加到预定义类型里。
:::

### 自定义大小

按钮可以自定义大小

::: demo 所有项目通用按钮尽量使用通用按钮，尽量不使用el-button。尽量，使用通用按钮的预定义类型。

```html

<el-row>
  <su-button size='mini' @click='clickAdd' buttonType='add' />
  <su-button size='mini' @click='clickAdd' buttonType='batchadd' />
  <su-button size='mini' @click='clickAdd' buttonType='edit' />
  <su-button size='mini' @click='clickAdd' buttonType='del' />
  <su-button size='mini' @click='clickAdd' buttonType='link' />
  <su-button size='mini' @click='clickAdd' buttonType='release' />
  <su-button size='mini' @click='clickAdd' buttonType='import' />
  <su-button size='mini' @click='clickAdd' buttonType='export' />
</el-row>
<el-row>
  <su-button size='small' @click='clickAdd' buttonType='add' />
  <su-button size='small' @click='clickAdd' buttonType='batchadd' />
  <su-button size='small' @click='clickAdd' buttonType='edit' />
  <su-button size='small' @click='clickAdd' buttonType='del' />
  <su-button size='small' @click='clickAdd' buttonType='link' />
  <su-button size='small' @click='clickAdd' buttonType='release' />
</el-row>
<el-row>
  <su-button size='middle' @click='clickAdd' buttonType='add' />
  <su-button size='middle' @click='clickAdd' buttonType='batchadd' />
  <su-button size='middle' @click='clickAdd' buttonType='edit' />
  <su-button size='middle' @click='clickAdd' buttonType='del' />
  <su-button size='middle' @click='clickAdd' buttonType='link' />
  <su-button size='middle' @click='clickAdd' buttonType='release' />
</el-row>
</el-row>
<script>
  export default {
    data() {
      return {}
    },
    methods: {
      clickAdd() {

      }
    }
  }
</script>
```

:::
:::tip 通用按钮有几个预定义的类型，也可以自定义。如果，大量出现同一个自定义按钮，可以将其增加到预定义类型里。
:::

### 文字按钮

没有边框和背景色的按钮。

::: demo

```html

<el-row>
  <su-button type='text' size='mini' @click='clickAdd'>测试按钮</su-button>
  <su-button type='text' :disabled='true' size='mini' @click='clickAdd'>测试按钮</su-button>
</el-row>
<script>
  export default {
    data() {
      return {}
    },
    methods: {
      clickAdd() {

      }
    }
  }
</script>
```

:::
:::tip 通用按钮有几个预定义的类型，也可以自定义。如果，大量出现同一个自定义按钮，可以将其增加到预定义类型里。
:::

### 自定义按钮

自定义按钮 自定义内容 和icon

::: demo

```html

<el-row>
  <su-button @click='clickAdd' icon='el-icon-edit-outline'>自定义</su-button>

  <su-button @click='clickAdd' type='' round>自定义</su-button>
</el-row>
<script>
  export default {
    data() {
      return {}
    },
    methods: {
      clickAdd() {

      }
    }
  }
</script>
```

:::
:::tip 通用按钮有几个预定义的类型，也可以自定义。如果，大量出现同一个自定义按钮，可以将其增加到预定义类型里。
:::

### 按钮参数

表单上传包括upload上传组件、preview预览组件等等，

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| buttonType    | 预定义的一些按钮类型 | string    | add,del, batchadd,link,edit,release,import,cancel,export| '|
| plain | 是否为朴素按钮 | true , false | — | — |
| icon | 按钮的小图标 | string | — | — |
| disable | 是否可用 | boolean | true , false | — |
| type | 自定义按钮类型 | string | primary,success,... | — |
| size | 按钮尺寸 | string | mini,small,middle,large | mini |
| circle | 是否为原型按钮 | circle | true , false | — |

### 按钮事件

| 事件名称      | 说明          | 回调函数
|---------- |-------------- |---------- 
| click    | 点击回调函数 | 

