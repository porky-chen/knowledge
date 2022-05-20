## 日期选择器
日期选择组件 主要用于上传表单里，包含日选择器 月选择器 范围选择器等。
<br/>
<br/>
1.如何设置选择器的类型?<br/>
答：日期选择器可以设置日期 年份 月份 周等选择器,通过传入不同的dateType来显示，详情参考demo1日期选择器。<br/>
2.如何设置选择器的返回值格式类型 yyyy-mm-dd hh:mm:ss 还是 yyyy-mm-dd?<br/>
答：日期选择器可以通过设置valueFormat和format来控制返回值的类型，详情参考demo1日期选择器。<br/>


### 日期选择器
以「日」为基本单位，基础的日期选择控件

::: demo 日期选择器可以设置日期 年份 月份 周等选择器,通过传入不同的dateType来显示。

```html
<su-form  :options='{}' :items="items" ref="form" @changeDate="changeDate":model="infoData" :disabled="false"/>
<script>
  export default {
    data() {
      return {
        items: [
          {
            span: 12,
            field: 'createTime',
            label: '创建时间',
            labelWidth: '100px',
            placeholder: '请输入',
            type: 'date',
            dateType: 'date',
            rules: [
              { required: true, message: '请输入创建时间', trigger: 'blur' },
            ],
            showFutureTime:true,
            valueFormat:'yyyy-MM-dd HH:mm:ss',
            format:'yyyy-MM-dd HH:mm:ss',
          },
          {
            span: 12,
            field: 'updateTime',
            label: '更新时间',
            labelWidth: '100px',
            placeholder: '请输入',
            type: 'date',
            dateType: 'date',
            rules: [
              { required: true, message: '请输入创建时间', trigger: 'blur' },
            ],
          },
        ],
        infoData: {
          createTime:undefined,
          updateTime:'2020-07-31'
        },
      }
    },
    methods: {
      // vue中基本类型的值会有报错提示，所以需要手动设置值
      changeDate (e) {
        this.infoData.createTime = e
      }
    }
  }
</script>
```
:::

### 日期选择范围
以「日」为基本单位，做范围选择器

::: demo 上传组件中需要设置文件数量 文件大小限制 文件类型限制,上传成功后会执行uploadSuccess回调函数用于作 删除文件会执行removeFile回调函数 日期选择范的选择器 需要通过changeDate回调函数来赋值

```html
<su-form :items="items" ref="form" @changeDate="changeDate":model="infoData" :disabled="true" />
<script>
  export default {
    data() {
      return {
        items: [
          {
            span: 12,
            field: 'createTime',
            label: '创建月份',
            labelWidth: '100px',
            placeholder: '请输入',
            type: 'date',
            dateType:'daterange',
            rules: [
              { required: true, message: '请输入创建时间', trigger: 'blur' },
            ],
          },
          {
            span: 12,
            field: 'updateTime',
            label: '更新时间',
            labelWidth: '100px',
            placeholder: '请输入',
            type: 'date',
            dateType:'daterange',
            rules: [
              { required: true, message: '请输入创建时间', trigger: 'blur' },
            ],
          },
        ],
        infoData: {
          createTime:undefined,
          updateTime:['2020-06-22','2020-06-23']
        },
      }
    },
    methods: {
      // vue中基本类型的值会有报错提示，所以需要手动设置值
      changeDate (e) {
        this.infoData.createTime = e
      }
    }
  }
</script>
```
:::

### 年份选择器
以「年」为基本单位，基础的年份选择控件

::: demo 

```html
<su-form :items="items" ref="form" @changeDate="changeDate":model="infoData" :disabled="false" />
<script>
  export default {
    data() {
      return {
        items: [
          {
            span: 12,
            field: 'createTime',
            label: '创建时间',
            labelWidth: '100px',
            placeholder: '请输入',
            type: 'date',
            dateType:'year',
            rules: [
              { required: true, message: '请输入创建时间', trigger: 'blur' },
            ],
          },
          {
            span: 12,
            field: 'updateTime',
            label: '更新时间',
            labelWidth: '100px',
            placeholder: '请输入',
            type: 'date',
            dateType:'year',
            rules: [
              { required: true, message: '请输入创建时间', trigger: 'blur' },
            ],
          },
        ],
        infoData: {
          createTime:undefined,
          updateTime:'2020-01-01'
        },
      }
    },
    methods: {
      // vue中基本类型的值会有报错提示，所以需要手动设置值
      changeDate (e) {
        this.infoData.createTime = e
      }
    }
  }
</script>
```
:::


### 日期选择器参数

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| rangeSeparator    | 选择范围时的分隔符 | string    | — | 至 |
| type | 日期选择器的类型 | string | year/month/date/dates/ week/datetime/datetimerange/ daterange/monthrange | date |
| valueFormat | 输出值的格式 | string |       —       | 'yyyy-MM-dd' |
| format | 时间格式化 | string | — | — |
| placeholder    | 提示信息 | String | — | — |
| startPlaceholder | 范围选择器的起始提示信息 | string | — | '开始日期' |
| show-endPlaceholder  | 范围选择器的终止提示信息 | String | — | '结束日期' |
| clearable  | 是否显示清除按钮 | boolean | — | true |
| field  | 用于保存数据的字段名 | string | date | - |
| showFutureTime  | 是否显示未来的时间 | Boolean | true , false | false |
| options  | picker-options当前时间日期选择器特有的选项 | object | - | - |
