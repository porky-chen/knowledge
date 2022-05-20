## 批量新增
点击按钮上传文件

<br/>
<br/>
常见问题：
<br/>
1.批量上传需要传入的参数<br/>
答：批量上传纳入到了su-form组件里面 需要在su-form配置项传入type为batch的配置，需要注意以下配置columnLimit最多能增加几行，columns表格的列名 操作列options 还有infoData数据保存的对象 里面的batch rule和data<br/>
<br/>

::: demo 上传组件中需要设置文件数量 文件大小限制 文件类型限制,上传成功后会执行uploadSuccess回调函数用于作 删除文件会执行removeFile回调函数

```html
<su-form :items="items" ref="form2" @uploadSuccess="uploadSuccess" @removeFile="removeFile" :model="infoData" :disabled="false" />
<script>
  export default {
    data() {
      return {
        items:[
          {
          span: 24,
          type: 'batch',
          field: 'batch',
          label: '',
          labelWidth: '0',
          columnLimit: 4,
          columns: [
            {
              prop: 'structureTypeName',
              label: '结构类型',
              placeholder: '请输入',
              minlength: 1,
              showOverflowTooltip: 'true',
            },
            {
              prop: 'startDate',
              label: '结构类型',
              placeholder: '请选择',
              type: 'date',
              showOverflowTooltip: 'true',
            },
            {
              prop: 'structureName',
              label: '结构名称',
              type: 'number',
              min: 1,
              max: 8,
              placeholder: '请输入',
            },
            {
              prop: 'mileageFlag',
              label: '里程方向',
              type: 'select',
              type: 'cascader',
              options: [
                {
                  value: '1',
                  label: '乔纳森乔斯达'
                },
                {
                  value: '2',
                  label: '乔瑟夫乔斯达'
                },
                {
                  value: '3',
                  label: '乔瑟夫乔太郎'
                },
                {
                  value: '4',
                  label: '迪奥'
                },
                {
                  value: '5',
                  label: '吉尔瓦伦丁'
                },
                {
                  value: '6',
                  label: '克里斯'
                },
              ]
            },
            {
              prop: 'moving',
              label: '动态',
              type: 'select',
              options: function (e) {
                return [
                  {
                    value: '1',
                    label: '乔纳森乔斯达'
                  },
                  {
                    value: '2',
                    label: '乔瑟夫乔斯达'
                  },
                  {
                    value: '3',
                    label: '乔瑟夫乔太郎'
                  },
                  {
                    value: '4',
                    label: '迪奥'
                  },
                  {
                    value: '5',
                    label: '吉尔瓦伦丁'
                  },
                  {
                    value: '6',
                    label: '克里斯'
                  }]
              }
            },
            {
              prop: 'options',
              label: '操作',
              width: 70,
              align: 'left',
              headerAlign: 'left',
              fixed: 'right',
              placeholder: '请输入',
              buttons: [
                {
                  text: '删除',
                  type: 'text'
                }
              ]
            }
          ],
        }
        ],
        infoData:{
                  // 批量新增的数据
        batch: {
          rules: {
            structureTypeName: { required: true, message: '结构类型必填字段', trigger: 'blur' },
            structureName: { required: true, message: '结构名称必填字段', trigger: 'blur' },
            mileageFlag: { required: true, message: '里程方向必填字段', trigger: 'change' },
          },
          data: [
            {
              structureTypeName: '咋瓦鲁多',
              startDate: '2021-06-07',
              structureName: '1',
              mileageFlag: '4',
              moving: '1',
            },
            {
              structureTypeName: '白金之星',
              startDate: '2021-06-07',
              structureName: '2',
              mileageFlag: '3',
              moving: '2',
            },
            {
              structureTypeName: '紫色之隐',
              startDate: '2021-06-07',
              structureName: '3',
              mileageFlag: '2',
              moving: '3',
            },
          ],
        },
        }
      }
    },
    methods: {
      uploadSuccess(){},
      removeFile(){},
    },
    mounted(){
      setTimeout(()=>{
        console.log(this.$refs.form2.resetFields())
        // this.$refs.form2.resetFields()
      },2000)
    }
  }
</script>
```
:::
:::tip
表单上传组件需要在有session的情况下使用 这里使用的是连续梁的session
:::

### 批量新增

表单上传包括upload上传组件、preview预览组件等等，

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| maxHeight    | 批量新增table的高度 | string    | — | '800px'|
| addClickSuccess | 添加成功后的回调函数 | function | — | — |
| addClickError | 添加超过限制后的错误回调 | function | — | — |
| showIndex | 是否显示table索引值 | boolean | true , false | — |
| showBatchBtn    | 是否显示新增按钮 | boolean | true , false| true |
| indexFixed    | 列是否固定在左侧或者右侧，true 表示固定在左侧 | string, boolean | true, left, right | — |
| model  | 用于保存数据的对象 | Object | — | — |
| columns  | 批量新增的配置项 | Array | — | — |
| columnLimit  | 批量新增的行数，最多能增加几行 | Array | — | — |
