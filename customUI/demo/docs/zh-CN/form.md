## Form 表单

由输入框、 选择器、 单选框、 多选框等控件组成， 用以收集、 校验、 提交数据

<br/>
<br/>
常见问题：
<br/>
1.form组件需要配置的东西<br/>
答：items配置项 model保存数据的对象 <br/><br/>
2.form配置项怎么配置？<br/>
答：常用的表单组件有input select switch radio checkbox date等组件，详情可以参考以下对应的文档，或者参考下面的案例demo代码 <br/><br/>
3.下拉框select使用说明<br/>
答：select的onChange事件接收两个参数第一个是下拉框的配置项，第二个是勾选的对象,可用于做二次数据处理<br/><br/>
4.单选radio使用说明<br/>
答：radio单选按钮需要设置options选项组,里面保存两个属性value值和label显示文本 <br/><br/>
5.过滤搜索autocomplete使用说明<br/>
答：过滤搜索autocomplete需要在配置项中设置fetchSuggestions方法用来对数据进行过滤,详情可以参考下面的代码或者独立的autocomplete模块<br/><br/>
6.数字输入框number的使用说明<br/>
答：数字输入框number中需要设置最大值max最小值min的限制,如果是小数输入则需要加入精度控制precision<br/>
<br/>

### 典型表单

包括各种表单项， 基础部分包括比如input输入框、 select选择器、日期组件date等。
::: demo 如果再item里设置了onClick函数 那么改行便有点击事件 目前只有input select date三种情况有onClick回调事件,详情使用参考下列items配置

```html
<su-form :items="items" ref="form" :model="infoData" @changeDate="changeDate">
</su-form>
<script>
  export default {
    data() {
      return {
        items:[
        {
          span: 12,
          field: 'name',
          label: '连续梁名称',
          labelWidth: '100px',
          placeholder: '请输入',
          validate: 'required',
          class: 'lcx',
          rules: [
            { required: true, message: '请输入连续梁名称', trigger: 'blur' },
            { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
          ],
          onClick:()=>{
            alert(321312)
          }
        },
        {
          span: 12,
          field: 'createTime',
          label: '创建时间',
          labelWidth: '100px',
          placeholder: '请输入',
          type: 'date',
          dateType: 'date',
          rules: [
            { required: true, message: '请输入连续梁名称', trigger: 'blur' },
          ],
          disabled:true
        },
        {
          span: 24,
          field: 'code',
          type: 'textarea',
          minRows: 2,
          maxRows: 10,
          label: '连续梁编号',
          labelWidth: '100px',
          placeholder: '请输入',
          validate: 'required',
          showWordLimit: true,
          rules: [
            { required: true, message: '请输入连续梁编号', trigger: 'blur' },
            { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
          ],
        },
        {
          span: 12,
          field: 'startMileage',
          label: '起始里程',
          labelWidth: '100px',
          placeholder: '请输入',
          class: 'lxl-qslc',
          maxlength: 20,
          disabled:true
        },
        {
          span: 12,
          field: 'endMileage',
          label: '终止里程',
          labelWidth: '100px',
          placeholder: '请输入',
          class: 'lxl-zzlc',
          maxlength: 20
        },
        {
          span: 12,
          field: 'concreteElastic',
          label: '混凝土弹性模量(MPa)',
          labelWidth: '210px',
          placeholder: '请输入',
          validate: 'required',
          class: 'lxl-txml',
          type: 'number',
          suffixUnit: 'MPa',
          min: 0,
          max: 99999999.99,
          precision: 2,
        },
        {
          span: 12,
          field: 'mileageFlag',
          label: '里程方向',
          type: 'select',
          multiple: true,
          onChange:(e,row)=>{
            console.log(e,row)
          },
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
          span: 12,
          field: 'steelElastic',
          label: '预应力钢绞线弹性模量(MPa)',
          labelWidth: '210px',
          placeholder: '请输入',
          validate: 'required',
          class: 'lxl-gjx',
          type: 'number',
          min: 0,
          max: 99999999.99,
          precision: 2,
        },
        {
          span: 12,
          field: 'constructionLoad',
          label: '级联选择',
          labelWidth: '150px',
          placeholder: '请输入',
          validate: 'required',
          popperClass: 'popper-class',
          type: 'cascader',
          options: [{
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]
          }, {
            value: 'daohang',
            label: '导航',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }]
        }, {
          value: 'zujian',
          label: '组件',
          children: [{
            value: 'basic',
            label: 'Basic',
            children: [{
              value: 'layout',
              label: 'Layout 布局'
            }, {
              value: 'color',
              label: 'Color 色彩'
            }, {
              value: 'typography',
              label: 'Typography 字体'
            }, {
              value: 'icon',
              label: 'Icon 图标'
            }, {
              value: 'button',
              label: 'Button 按钮'
            }]
          }, {
            value: 'form',
            label: 'Form',
            children: [{
              value: 'radio',
              label: 'Radio 单选框'
            }, {
              value: 'checkbox',
              label: 'Checkbox 多选框'
            }, {
              value: 'input',
              label: 'Input 输入框'
            }, {
              value: 'input-number',
              label: 'InputNumber 计数器'
            }, {
              value: 'select',
              label: 'Select 选择器'
            }, {
              value: 'cascader',
              label: 'Cascader 级联选择器'
            }, {
              value: 'switch',
              label: 'Switch 开关'
            }, {
              value: 'slider',
              label: 'Slider 滑块'
            }, {
              value: 'time-picker',
              label: 'TimePicker 时间选择器'
            }, {
              value: 'date-picker',
              label: 'DatePicker 日期选择器'
            }, {
              value: 'datetime-picker',
              label: 'DateTimePicker 日期时间选择器'
            }, {
              value: 'upload',
              label: 'Upload 上传'
            }, {
              value: 'rate',
              label: 'Rate 评分'
            }, {
              value: 'form',
              label: 'Form 表单'
            }]
          }, {
            value: 'data',
            label: 'Data',
            children: [{
              value: 'table',
              label: 'Table 表格'
            }, {
              value: 'tag',
              label: 'Tag 标签'
            }, {
              value: 'progress',
              label: 'Progress 进度条'
            }, {
              value: 'tree',
              label: 'Tree 树形控件'
            }, {
              value: 'pagination',
              label: 'Pagination 分页'
            }, {
              value: 'badge',
              label: 'Badge 标记'
            }]
          }, {
            value: 'notice',
            label: 'Notice',
            children: [{
              value: 'alert',
              label: 'Alert 警告'
            }, {
              value: 'loading',
              label: 'Loading 加载'
            }, {
              value: 'message',
              label: 'Message 消息提示'
            }, {
              value: 'message-box',
              label: 'MessageBox 弹框'
            }, {
              value: 'notification',
              label: 'Notification 通知'
            }]
          }, {
            value: 'navigation',
            label: 'Navigation',
            children: [{
              value: 'menu',
              label: 'NavMenu 导航菜单'
            }, {
              value: 'tabs',
              label: 'Tabs 标签页'
            }, {
              value: 'breadcrumb',
              label: 'Breadcrumb 面包屑'
            }, {
              value: 'dropdown',
              label: 'Dropdown 下拉菜单'
            }, {
              value: 'steps',
              label: 'Steps 步骤条'
            }]
          }, {
            value: 'others',
            label: 'Others',
            children: [{
              value: 'dialog',
              label: 'Dialog 对话框'
            }, {
              value: 'tooltip',
              label: 'Tooltip 文字提示'
            }, {
              value: 'popover',
              label: 'Popover 弹出框'
            }, {
              value: 'card',
              label: 'Card 卡片'
            }, {
              value: 'carousel',
              label: 'Carousel 走马灯'
            }, {
              value: 'collapse',
              label: 'Collapse 折叠面板'
            }]
          }]
        }, {
          value: 'ziyuan',
          label: '资源',
          children: [{
            value: 'axure',
            label: 'Axure Components'
          }, {
            value: 'sketch',
            label: 'Sketch Templates'
          }, {
            value: 'jiaohu',
            label: '组件交互文档'
          }]
        }]
        },
       {
          span: 12,
          field: 'text',
          label: '文字(只显示)',
          labelWidth: '100px',
          type:'textDisplay',
          color:'#00f',
          class:'textClass',
       },
       {
          span: 12,
          field: 'unit',
          label: '估值入账金额',
          labelWidth: '100px',
          suffixUnit: '万元'
       }
      ],
      infoData:{
        name:undefined,
        createTime:undefined,
        code:undefined,
        startMileage:undefined,
        endMileage:undefined,
        concreteElastic:undefined,
        mileageFlag:undefined,
        steelElastic:undefined,
        constructionLoad:undefined,
        text:'text',
        unit:undefined
      }
      }
    },
    methods: {
      changeDate(value,id) {
        console.log(value,id,this.infoData);
      }
    }
  }
</script>
<style lang='sass' scoped>
.textClass{
  color: #0f0;
}
</style>
```
:::
:::tip
表单配置项在items中进行配置，在model中保存值
:::

### 其他类型表单

其他类型表单包括比较少用的一些类型组件 如radio单选框 switch开关按钮组 tooltip文字提示 级联查询 等
::: demo 配置详情可以参考使用下列items配置

```html
<su-form :items="items" ref="form" :model="infoData" @changeDate="changeDate">
</su-form>
<script>
  export default {
    data() {
      return {
        items:[
        {
          span: 12,
          field: 'name',
          label: '连续梁名称',
          labelWidth: '100px',
          placeholder: '请输入',
          validate: 'required',
          class: 'lcx',
          rules: [
            { required: true, message: '请输入连续梁名称', trigger: 'blur' },
            { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
          ],
          onClick:()=>{
            alert(321312)
          }
        },
        {
          span: 12,
          field: 'createTime',
          label: '创建时间',
          labelWidth: '100px',
          placeholder: '请输入',
          type: 'date',
          dateType: 'date',
          rules: [
            { required: true, message: '请输入连续梁名称', trigger: 'blur' },
          ],
          disabled:true
        },
        {
          span: 8,
          field: 'timeUser',
          labelWidth: '60px',
          label:'单选项',
          placeholder: '请输入',
          validate: 'required',
          type: 'radio',
          class: 'radio',
          options: [
            {
              label: '永久',
              value: '-1'
            },
            {
              label: '其他',
              value: '-12'
            },
          ],
           onChange: () => {
            console.log(312)
          }
        },
        {
          span: 8,
          field: 'sex',
          label: '是否已申请',
          labelWidth: '100px',
          placeholder: '请输入',
          type: 'switch',
          rules: [
            { required: true, message: '请选择性别', trigger: 'blur' },
          ],
        },
        {
          span: 24,
          field: 'code',
          type: 'textarea',
          minRows: 2,
          maxRows: 10,
          label: '连续梁编号',
          labelWidth: '100px',
          placeholder: '请输入',
          validate: 'required',
          class: 'lxl-bh',
          rules: [
            { required: true, message: '请输入连续梁编号', trigger: 'blur' },
            { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
          ],
                    disabled:true
        },
        {
          span: 12,
          field: 'nodeId',
          label: '过滤搜索',
          labelWidth: '100px',
          placeholder: '请输入',
          type:'autocomplete',
          maxlength: 20,
          width:'200px',
          validate: 'required',
          rules: [
            { required: true, message: '请输入内容', trigger: 'blur' },
          ],
          clearable:true,
          fetchSuggestions:(queryString, cb) =>{
            var restaurants = [
              {
                afterHangAttachment: null,
                attachment: "062c3875c830451cbdea56c865a615ad,4f8a5e90f6334dca8492b97a9a81517b,7f25e3aa797a4050943f194597cb7f05,8b72e374d70d442cb0fcc2396c2a6886",
                bridgeTypeId: 21,
                bridgeTypeName: null,
                code: "2-2",
                conbeamId: "80ee133e0af548278b73ab0d3ad6d3ce",
                concreteElastic: 50,
                concreteValumn: 8,
                configType: 0,
                constructionLoad: 50,
                createTime: "2020-10-30 10:37:18",
                createUserId: "503841b0a19311ea9b00a558f49f4903",
                createUserName: "1#测量员",
                designCode: "202-2",
                endMileage: "DK100+160.00",
                hangChange: 50,
                length: 60,
                name: "2-1连续梁",
                nodeCode: null,
                nodeId: "8E564F957D0867F7E050007F01003169",
                nodeName: null,
                pointPositionView: null,
                startMileage: "DK000+100.100",
                steelElastic: 50,
                supportChange: 50,
              },
              {
                afterHangAttachment: null,
                attachment: "062c3875c830451cbdea56c865a615ad,4f8a5e90f6334dca8492b97a9a81517b,7f25e3aa797a4050943f194597cb7f05,8b72e374d70d442cb0fcc2396c2a6886",
                bridgeTypeId: 21,
                bridgeTypeName: null,
                code: "2-2",
                conbeamId: "80ee133e0af548278b73ab0d3ad6d3ce",
                concreteElastic: 50,
                concreteValumn: 8,
                configType: 0,
                constructionLoad: 50,
                createTime: "2020-10-30 10:37:18",
                createUserId: "503841b0a19311ea9b00a558f49f4903",
                createUserName: "1#测量员",
                designCode: "202-2",
                endMileage: "DK100+160.00",
                hangChange: 50,
                length: 60,
                name: "2-2连续梁",
                nodeCode: null,
                nodeId: "8E564F957D0867F7E050007F01003169",
                nodeName: null,
                pointPositionView: null,
                startMileage: "DK000+100.100",
                steelElastic: 50,
                supportChange: 50,
              },
            ];
            var results = queryString ? restaurants.filter(this.items[5].createStateFilter(queryString)) : restaurants;
           cb(results);
          },
          showSearchIcon:true,
          // 选择后的回调函数
          handleSelect:(item)=>{
            this.infoData[this.items[5].field]=item.name
            this.$emit('handleSearch',item)
          },
          textOverflowLimitLength:20,
          // 用于过滤
          createStateFilter:(queryString) =>{
            return (state) => {
              return (state[this.items[5].nodeName].toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
          },
          nodeName:'name',
        },
        {
          span: 12,
          field: 'startMileage',
          label: '起始里程',
          labelWidth: '100px',
          placeholder: '请输入',
          class: 'lxl-qslc',
          maxlength: 20,
          disabled:true
        },
        {
         span: 12,
          field: 'concreteValumn',
          type: 'tooltip',
          tooltipstr:'3-20个字符，由字母和数字构成一旦注册成功，账户名不能修改',
          label: '混凝土容重(KN/m³)',
          labelWidth: '150px',
          placeholder: '请输入',
          validate: 'required',
          class: 'lxl-trl',
          min: 0,
          max: 99999999.99,
          precision: 2,
        },

      ],
      infoData:{
        filterData:undefined
      }
      }
    },
    methods: {
      changeDate(value,id) {
        console.log(value,id,this.infoData);
      }
    }
  }
</script>
```
:::
:::tip
表单配置项在items中进行配置，在model中保存值
:::

### 中心里程表单

中心里程输入框 前缀单位为2个英文字母 后缀为数字的形式
::: demo 
```html
<su-form :items="items" ref="form" :model="infoData" :disabled="true" @changeDate="changeDate">
</su-form>
<script>
  export default {
    data() {
      const checkMileage = (rule, value, callback) => {
        if (!value || value.length <= 0) {
          callback('请输入有效的里程，例如455+346.542')
        }
        if (rule.field !== 'centerMileage' && value.length <= 0) {
          callback('请输入有效的里程，例如455+346.542')
        }
        if (rule.field === 'centerMileage') {

          if (!value || value.length === 0) {
            callback();
          }
        }
        if (value && value.length > 0) {
          if (value.indexOf('+') === -1) callback('请输入有效的里程，例如455+346.542')
          const strArr = value.split('+')
          if (strArr.length < 0 || strArr.length > 2) callback('请输入有效的里程，例如455+346.542')
          const checkStr = /^[0-9]\d{0,4}$/
          if (!checkStr.test(strArr[0])) callback('请输入有效的里程，例如455+346.542')
          const checkStrback = /^(0|[1-9]\d{0,2})(\.\d{1,3})?$/
          if (!checkStrback.test(strArr[1])) callback('请输入有效的里程，例如455+346.542')
          callback();
        }
      };
      return {
        items:[
          {
            span: 12,
            type: 'centerUnit',
            label: '中心里程',
            field: 'centerUnit',
            placeholder: '请输入前缀',
            maxlength: 5,
            rules: [
              { required: true, pattern: /[a-zA-Z]/, message: '请输入前缀', trigger: 'blur' }
            ],
          },
          {
            span: 12,
            type: 'centerMileage',
            class: 'centerMileage',
            field: 'centerMileage',
            placeholder: '请输入数字 + 请输入数字',
            maxlength: 20,
            rules: [
              { required: true, validator: checkMileage, trigger: 'blur' }
            ],
          },
        ],
        infoData:{
          centerUnit:undefined,
          centerMileage:undefined,
        }
      }
    },
    methods: {
      changeDate() {
        console.log('submit!');
      }
    }
  }
</script>
```
:::
:::tip
字段需要自己额外做二次拼接处理。
:::


### 远程搜索表单

远程搜索表单
::: demo 
```html
<su-form :items="items" ref="form" :model="infoData" >
</su-form>
<script>
  export default {
    data() {
      return {
        items:[
          {
            span: 12,
            type: 'autocomplete',
            label: '中心里程',
            placeholder: '请输入前缀',
            width:'200px',
            field:'autocompleteData',
            clearable:true,
            fetchSuggestions:(queryString, cb) =>{
              var restaurants = [
                {
                  afterHangAttachment: null,
                  attachment: "062c3875c830451cbdea56c865a615ad,4f8a5e90f6334dca8492b97a9a81517b,7f25e3aa797a4050943f194597cb7f05,8b72e374d70d442cb0fcc2396c2a6886",
                  bridgeTypeId: 21,
                  bridgeTypeName: null,
                  code: "2-2",
                  conbeamId: "80ee133e0af548278b73ab0d3ad6d3ce",
                  concreteElastic: 50,
                  concreteValumn: 8,
                  configType: 0,
                  constructionLoad: 50,
                  createTime: "2020-10-30 10:37:18",
                  createUserId: "503841b0a19311ea9b00a558f49f4903",
                  createUserName: "1#测量员",
                  designCode: "202-2",
                  endMileage: "DK100+160.00",
                  hangChange: 50,
                  length: 60,
                  name: "2-2连续梁",
                  nodeCode: null,
                  nodeId: "8E564F957D0867F7E050007F01003169",
                  nodeName: null,
                  pointPositionView: null,
                  startMileage: "DK000+100.100",
                  steelElastic: 50,
                  supportChange: 50,
                }
              ];
              console.log(this)
              // 用于过滤
              function createStateFilter(queryString){
                return (state) => {
                  return (state.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
              }
              var results = queryString ? restaurants.filter(createStateFilter(queryString)) : restaurants;
            cb(results);
            },
            showSearchIcon:true,
            // 选择后的回调函数
            handleSelect:(item)=>{
              console.log(this.infoData.autocompleteData=item.name)
              // this.autocompleteData[this.autocompleteItems.field]=item.name
              this.$emit('handleSearch',item)
            },
            textOverflowLimitLength:20,
            nodeName:'name',
          },
        ],
        infoData:{
          autocompleteData:undefined,
        }
      }
    },
    methods: {
      changeDate() {
        console.log('submit!');
      }
    }
  }
</script>
```
:::
:::tip
字段需要自己额外做二次拼接处理。
:::


### 上传实例

上传实例
::: demo 
```html
<su-form :items="items" ref="form" :model="infoData"  @uploadSuccess="uploadSuccess" @removeFile="removeFile">
</su-form>
<script>
  export default {
    data() {
      return {
        items:[
          {
            span: 12,
            field: 'startMileage',
            label: '起始里程',
            labelWidth: '100px',
            placeholder: '请输入',
            class: 'lxl-qslc',
            maxlength: 20,
          },
          {
            span: 12,
            field: 'endMileage',
            label: '终止里程',
            labelWidth: '100px',
            placeholder: '请输入',
            class: 'lxl-zzlc',
            maxlength: 20
          },
          {
            span: 24,
            field: 'upload',
            type: 'upload',
            class: 'lxl-upload',
            fileTableColumns: {
              height: '240px',
              showIndex: true,
              showControl: true,
              column: [
                {
                  prop: 'fileName',
                  label: '文件名称',
                },
                {
                  prop: 'userName',
                  label: '上传人',
                },
                {
                  prop: 'createTime',
                  label: '上传时间',
                  formatter (row) {
                    return row.createTime.split(' ')[0]
                  }
                },
              ]
            },
            // 上传文件配置项
            uploadItem: {
              accept: 'image/jpg,image/JPG,image/jpeg,image/JPEG,image/png,image/PNG,image/svg,image/SVG,image/gif,image/GIF',
              acceptTips: '请上传图片类型文件！',
              field: null,
              disabled: null,
              fileShowInfoList: true,
              pattern: '.',
              fileBtnName: null,
              hint: ' ',
              uploadLimit: 5,
              uploadLimitSize: 200
            },
            // 上传文件的地址
            uploadFileUrl: '//hsptest.sunrtnet.com:9335/uploadFile',
            // 上传文件的字段名
            uploadName: 'files',
          },
        ],
        infoData:{
          startMileage:undefined,
          endMileage:undefined,
          // 上传的数据
          upload: {
            attachment: '05669e6a8331450e8a8d696f54f0ceb2,218dd2ad4ed64827ae13c6b68f1ccdef,a36f68b879cd415cbc04e10f7a88b8c6',
            fileData: [
              {
                'fileId': '05669e6a8331450e8a8d696f54f0ceb2',
                'fileName': 'lion.jpg',
                'fileExt': 'jpg',
                'fileSize': 2811784,
                'createTime': '2020-05-26 14:56:26',
                'userId': '56cc0d60253111eab2a5075d32172326',
                'fileUrl': 'http://hsptest.sunrtnet.com:8888/bridge-linear/05669e6a8331450e8a8d696f54f0ceb2.jpg',
                'userName': 'zyb',
                'accountName': 'zyb',
                'userTypeId': null,
                'userTypeName': null,
                'unitId': '0',
                'unitName': '研发部',
                'roleId': null,
                'roleName': '系统管理员'
              },
              {
                'fileId': '218dd2ad4ed64827ae13c6b68f1ccdef',
                'fileName': 'leo.jpg',
                'fileExt': 'jpg',
                'fileSize': 2811784,
                'createTime': '2020-05-26 14:56:26',
                'userId': '56cc0d60253111eab2a5075d32172326',
                'fileUrl': 'http://hsptest.sunrtnet.com:8888/bridge-linear/05669e6a8331450e8a8d696f54f0ceb2.jpg',
                'userName': 'zyb',
                'accountName': 'zyb',
                'userTypeId': null,
                'userTypeName': null,
                'unitId': '0',
                'unitName': '研发部',
                'roleId': null,
                'roleName': '系统管理员'
              },
              {
                'fileId': 'a36f68b879cd415cbc04e10f7a88b8c6',
                'fileName': 'neo.jpg',
                'fileExt': 'jpg',
                'fileSize': 2811784,
                'createTime': '2020-05-26 14:56:26',
                'userId': '56cc0d60253111eab2a5075d32172326',
                'fileUrl': 'http://hsptest.sunrtnet.com:8888/bridge-linear/05669e6a8331450e8a8d696f54f0ceb2.jpg',
                'userName': 'zyb',
                'accountName': 'zyb',
                'userTypeId': null,
                'userTypeName': null,
                'unitId': '0',
                'unitName': '研发部',
                'roleId': null,
                'roleName': '系统管理员'
              }
            ]
          },
        }
      }
    },
    methods: {
      changeDate() {
        console.log('submit!');
      },
            // 上传成功
      uploadSuccess (e) {
        console.log(e)
        let data = this.infoData2;

        // 设置上传用户名
        e.data[0].userName = this.$store
          ? this.$store.state.userinfo.userName
          : 'root';

        data.upload.fileData = data.upload.fileData.concat(e.data);

        let sym = data.upload.attachment.split('').length ? ',' : ''
        data.upload.attachment += sym + e.data[0].fileId
      },
      // 删除图片
      removeFile (id) {
        let data = this.infoData;
        if (data.upload.attachment) {
          let list = data.upload.attachment.split(',');
          list.forEach((item, index) => {
            if (id === item) {
              list.splice(index, 1);
            }
          });
          data.upload.attachment = list.join(',');
        }
        data.upload.fileData.forEach((item, index) => {
          if (id === item.fileId) {
            data.upload.fileData.splice(index, 1);
          }
        });
      },
    }
  }
</script>
```
:::
:::tip
新增成功后有时候需要对返回的数据进行二次操作 如对需要对保存接口做新增文件类型等,在uploadSuccess回调函数里进行操作就行
删除文件也可以在removeFile回调函数中进行操作
:::

### 批量新增

批量新增
::: demo 
```html
<su-form :items="items" ref="form" :model="infoData"  @uploadSuccess="uploadSuccess" @removeFile="removeFile">
</su-form>
<script>
  export default {
    data() {
      return {
        items:[
          {
            span: 12,
            field: 'startMileage1',
            label: '项目名称',
            labelWidth: '100px',
            placeholder: '请输入',
            class: 'lxl-qslc',
            maxlength: 20,
          },
          {
            span: 12,
            field: 'endMileage1',
            label: '项目类型',
            labelWidth: '100px',
            placeholder: '请输入',
            class: 'lxl-zzlc',
            maxlength: 20
          },
          {
            span: 12,
            field: 'startMileage2',
            label: '起始里程',
            labelWidth: '100px',
            placeholder: '请输入',
            class: 'lxl-qslc',
            maxlength: 20,
          },
          {
            span: 12,
            field: 'endMileage2',
            label: '终止里程',
            labelWidth: '100px',
            placeholder: '请输入',
            class: 'lxl-zzlc',
            maxlength: 20
          },
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
              maxlength: 120,
              showOverflowTooltip: true,
              tooltipstr:'提示文字'
            },
            {
              prop: 'structureName',
              label: '结构名称',
              type: 'number',
              min: 1,
              max: 8,
              placeholder: '请输入',
              suffixUnit: '元'
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
              },
              onChange(e,row){
                console.log(e,row)
              }
            },
            {
               prop: 'number',
               label: '数字',
               type: 'number',
               onChange(data,item){
                  console.log(data,item)
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
          startMileage:undefined,
          endMileage:undefined,
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
              structureName: '1',
              mileageFlag: '4',
              moving: '1',
            },
            {
              structureTypeName: '白金之星',
              structureName: '2',
              mileageFlag: '3',
              moving: '2',
            },
            {
              structureTypeName: '紫色之隐',
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
      changeDate() {
        console.log('submit!');
      },
            // 上传成功
      uploadSuccess (e) {
        let data = this.infoData2;

        // 设置上传用户名
        e.data[0].userName = this.$store
          ? this.$store.state.userinfo.userName
          : 'root';

        data.upload.fileData = data.upload.fileData.concat(e.data);

        let sym = data.upload.attachment.split('').length ? ',' : ''
        data.upload.attachment += sym + e.data[0].fileId
      },
      // 删除图片
      removeFile (id) {
        let data = this.infoData;
        if (data.upload.attachment) {
          let list = data.upload.attachment.split(',');
          list.forEach((item, index) => {
            if (id === item) {
              list.splice(index, 1);
            }
          });
          data.upload.attachment = list.join(',');
        }
        data.upload.fileData.forEach((item, index) => {
          if (id === item.fileId) {
            data.upload.fileData.splice(index, 1);
          }
        });
      },
    }
  }
</script>
```
:::
:::tip
批量新增中的select类型也会有onChange两个参数一个是当前选中项的数据 另一个是配置项
columnLimit是控制新增的数量限制设置多少个就只能新增这么多
:::


### 表单参数

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| disabled    | 是否禁用该表单内的所有组件 | Boolean    | true , false | — |
| labelPosition | 表单域标签的位置 | String | left , right | — |
| labelWidth | 表单域标签的的宽度，例如 '50px' | String |       —       | — |
| model | 表单数据对象 | Object | — | — |
| items    | 动态表单配置项数组 | Array | — | — |

### 表单事件

| 事件名称      | 说明          | 回调函数
|---------- |-------------- |---------- 
| validate    | 执行表单校验信息 | callback回调函数
| resetFields | 重置表单并清除校验结果 | —
| clearValidate | 清除表单校验结果| —
| uploadSuccess | 上传图片成功的回调 | —
| removeFile    | 删除图片的回调 | —
| changeDate    | 日历选择回调 | —
| keyenter    | 键盘Enter回调 | —


### Items 表单配置项数组 

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| span    | el-col 每行所占的格子数(公用属性) | Number    | 12~24 | 12 |
| field | 表单子项的字段名(公用属性) | String | — | — |
| label | 表单子项的label描述文字(公用属性) | String |       —       | — |
| type | 表单子项的类型(公用属性) | String | textarea、select、button、radio、checkbox、number、cascader、slot、input、upload、batch,textDisplay | input |
| popperClass  | type为cascader时自定义浮层的类名 | — |
| minRows    | 调整文本域得最小行数 | Number | — | — |
| maxRows    | 调整文本域得最大行数 | Number | — | — |
| placeholder    | placeholder的提示文字 | Number | — | — |
| minlength    | 文本最小输入长度 | Number | — | — |
| maxlength    | 文本最大输入长度 | Number | — | — |
| disabled    | 是否禁用输入 | Boolean | true , false | — |
| filterable    | 下拉框是否可以搜索 | Boolean | true , false | — |
| labelField    | 下拉、单选、复选框子项的label字段名 | String | — | — |
| valueField    | 下拉、单选、复选框子项的value字段名 | String | — | — |
| options    | 子项的数组 | Array | — | — |
| buttonType    | 按钮的type类型 | String | — | primary |
| icon    | 按钮的icon图标 | String | — | — |
| name    | 按钮的名称 | String | — | — |
| rules    | 子项的表单校验信息 | Array | — | — |
| shows    | 是否显示当前子项 | Boolean | true , false | true |
| onClick    | 该行是否有点击事件 | function | — | — |
| tooltipstr    | 提示文字 | String | — | — |
| showPassword    | 当类型是tooltip,设置输入框的类型  | Boolean | true,false | false |
| showOverflowTooltip    | 是否tooltip,设置是否显示冒泡详情  | Boolean | true,false | false |
| suffixUnit    | 后缀单位名称  | String | — | — |
