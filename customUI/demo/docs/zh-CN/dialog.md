## Dialog 模态弹框
多选组件

<br/>
<br/>
常见问题：
<br/>
1.如何在弹框中使用自定义按钮？<br/>
答：showDialogBtns设置为false 然后使用btns的具名插槽，具体参考案例二<br/>
2.自定义弹框中常用需要传入的参数<br/>
答：dialogTitle标题 showDialogBtns是否需要显示默认按钮 dialogVisible控制显示隐藏的变量<br/>

### 基础弹框
基础配置弹框包括取消确定按钮

::: demo 

```html
<su-button style="float:none" @click="dialogVisible=!dialogVisible">{{$t('dialog.btn')}}</su-button>
<su-dialog :dialogVisible="dialogVisible" :dialogTitle="dialogTitle" :showDialogBtns="true" @dialogClose="dialogClose" @dialogSuccess="dialogSuccess" @open="open" >
  <div slot="header">{{dialogTitle}}</div>
  <div slot="content">
    <su-upload @removeFile="removeFile" @uploadSuccess="uploadSuccess" :fileTableColumns="fileTableColumns" :uploadFileUrl="uploadFileUrl" :item="uploadItem" :uploadName="uploadName" :fileData="fileData" :model="model"></su-upload>
  </div>
</su-dialog>
<script>
  export default {
    data() {
      return {
      // 上传文件配置项
      uploadItem:  {
        accept: '/*',
        field: null,
        disabled: null,
        fileShowInfoList: true,
        pattern: '.',
        fileBtnName: null,
        hint: ' ',
      },
      // 上传文件的地址
      uploadFileUrl:'//hsptest.sunrtnet.com:9335/uploadFile',
      // 上传文件的字段名
      uploadName: 'files',
      // 编辑的时候传递过来的字符串 包含attachment
      model:{
        'conbeamId':'1',
        'nodeId':'59130cb0dd9f11e998a14571ebafa0be',
        'name':'测试梁1233dsadsa',
        'code':'1',
        'designCode':'12323dsadsdad',
        'length':99999999.99,
        'startMileage':'0.12222',
        'endMileage':'23232323232323232323',
        'concreteElastic':99999999.99,
        'concreteValumn':99999999.99,
        'steelElastic':99999999.99,
        'constructionLoad':99999999.99,
        'supportChange':99999999.99,
        'createUserId':'0',
        'createUserName':'root',
        'createTime':'2020-05-07 09:12:13',
        'attachment':'05669e6a8331450e8a8d696f54f0ceb2,218dd2ad4ed64827ae13c6b68f1ccdef,a36f68b879cd415cbc04e10f7a88b8c6',
      },
      fileData:[
        {
          'fileId':'05669e6a8331450e8a8d696f54f0ceb2',
          'fileName':'lion.jpg',
          'fileExt':'jpg',
          'fileSize':2811784,
          'createTime':'2020-05-26 14:56:26',
          'userId':'56cc0d60253111eab2a5075d32172326',
          'fileUrl':'http://hsptest.sunrtnet.com:8888/bridge-linear/05669e6a8331450e8a8d696f54f0ceb2.jpg',
          'userName':'zyb',
          'accountName':'zyb',
          'userTypeId':null,
          'userTypeName':null,
          'unitId':'0',
          'unitName':'研发部',
          'roleId':null,
          'roleName':'系统管理员'
        },
        {
          'fileId':'218dd2ad4ed64827ae13c6b68f1ccdef',
          'fileName':'leo.jpg',
          'fileExt':'jpg',
          'fileSize':2811784,
          'createTime':'2020-05-26 14:56:26',
          'userId':'56cc0d60253111eab2a5075d32172326',
          'fileUrl':'http://hsptest.sunrtnet.com:8888/bridge-linear/05669e6a8331450e8a8d696f54f0ceb2.jpg',
          'userName':'zyb',
          'accountName':'zyb',
          'userTypeId':null,
          'userTypeName':null,
          'unitId':'0',
          'unitName':'研发部',
          'roleId':null,
          'roleName':'系统管理员'
        },
        {
          'fileId':'a36f68b879cd415cbc04e10f7a88b8c6',
          'fileName':'neo.jpg',
          'fileExt':'jpg',
          'fileSize':2811784,
          'createTime':'2020-05-26 14:56:26',
          'userId':'56cc0d60253111eab2a5075d32172326',
          'fileUrl':'http://hsptest.sunrtnet.com:8888/bridge-linear/05669e6a8331450e8a8d696f54f0ceb2.jpg',
          'userName':'zyb',
          'accountName':'zyb',
          'userTypeId':null,
          'userTypeName':null,
          'unitId':'0',
          'unitName':'研发部',
          'roleId':null,
          'roleName':'系统管理员'
        },
      ],
      // 上传table的配置项
      fileTableColumns:{
        height:'240px',
        showIndex:true,
        showControl:true,
        column:[
          {
            prop:'fileName',
            label:'文件名称',
          },
          {
            prop:'userName',
            label:'上传人',
          },
          {
            prop:'createTime',
            label:'上传时间',
            formatter(row){
              return row.createTime.split(' ')[0]
            }
          },
        ]
      },
      dialogVisible:false,
      showDialogBtns:true,
      dialogWidth:'800px',
      }
    },
    methods: {
      ...window.$su.methods,
      dialogSuccess(){
        this.dialogVisible=false
        console.log(321)
      },
      dialogClose(){
        this.dialogVisible=false
      },
      open(){
        console.log('open')
      },
      // 上传成功
      uploadSuccess(e){
        // 设置上传用户名
        e.data[0].userName = this.$store
          ? this.$store.state.userinfo.userName
          : 'root';
        this.fileData = this.fileData.concat(e.data);

        let sym=this.model.attachment.split('').length?',':''
        this.model.attachment+=sym+e.data[0].fileId
      },
      // 删除图片
      removeFile(id){
        if (this.model.attachment) {
          let list = this.model.attachment.split(',');
          list.forEach((item, index) => {
            if (id === item) {
              list.splice(index, 1);
            }
          });
          this.model.attachment = list.join(',');
        }
        this.fileData.forEach((item, index) => {
          if (id === item.fileId) {
            this.fileData.splice(index, 1);
          }
        });
      },
      btnClick(e){
        console.log(e)
      }
    },
    computed:{
      dialogTitle(){
        return this.$t('dialog.title')
      }
    },
    mounted(){
      
    }
  }
</script>
```

:::
### 自定义按钮
基础配置弹框包括取消确定按钮 可以隐藏或者显示默认提供的取消 确定按钮

::: demo 

```html
<su-button style="float:none" @click="dialogVisible=!dialogVisible">{{$t('dialog.btn')}}</su-button>
<su-dialog :dialogVisible="dialogVisible" :dialogTitle="dialogTitle" :showDialogBtns="false" @dialogClose="dialogClose" @dialogSuccess="dialogSuccess" >
  <div slot="header">{{dialogTitle}}</div>
  <div slot="content">
    <su-upload @removeFile="removeFile" @uploadSuccess="uploadSuccess" :fileTableColumns="fileTableColumns" :uploadFileUrl="uploadFileUrl" :item="uploadItem" :uploadName="uploadName" :fileData="fileData" :model="model"></su-upload>
  </div>
  <template slot="btns">
    <su-button @click="btnClick(1)">自定义按钮1</su-button>
    <su-button @click="btnClick(2)">自定义按钮2</su-button>
  </template>
</su-dialog>
<script>
  export default {
    data() {
      return {
      // 上传文件配置项
      uploadItem:  {
        accept: '/*',
        field: null,
        disabled: null,
        fileShowInfoList: true,
        pattern: '.',
        fileBtnName: null,
        hint: ' ',
      },
      // 上传文件的地址
      uploadFileUrl:'//hsptest.sunrtnet.com:9335/uploadFile',
      // 上传文件的字段名
      uploadName: 'files',
      // 编辑的时候传递过来的字符串 包含attachment
      model:{
        'conbeamId':'1',
        'nodeId':'59130cb0dd9f11e998a14571ebafa0be',
        'name':'测试梁1233dsadsa',
        'code':'1',
        'designCode':'12323dsadsdad',
        'length':99999999.99,
        'startMileage':'0.12222',
        'endMileage':'23232323232323232323',
        'concreteElastic':99999999.99,
        'concreteValumn':99999999.99,
        'steelElastic':99999999.99,
        'constructionLoad':99999999.99,
        'supportChange':99999999.99,
        'createUserId':'0',
        'createUserName':'root',
        'createTime':'2020-05-07 09:12:13',
        'attachment':'05669e6a8331450e8a8d696f54f0ceb2,218dd2ad4ed64827ae13c6b68f1ccdef,a36f68b879cd415cbc04e10f7a88b8c6',
      },
      fileData:[
        {
          'fileId':'05669e6a8331450e8a8d696f54f0ceb2',
          'fileName':'lion.jpg',
          'fileExt':'jpg',
          'fileSize':2811784,
          'createTime':'2020-05-26 14:56:26',
          'userId':'56cc0d60253111eab2a5075d32172326',
          'fileUrl':'http://hsptest.sunrtnet.com:8888/bridge-linear/05669e6a8331450e8a8d696f54f0ceb2.jpg',
          'userName':'zyb',
          'accountName':'zyb',
          'userTypeId':null,
          'userTypeName':null,
          'unitId':'0',
          'unitName':'研发部',
          'roleId':null,
          'roleName':'系统管理员'
        },
        {
          'fileId':'218dd2ad4ed64827ae13c6b68f1ccdef',
          'fileName':'leo.jpg',
          'fileExt':'jpg',
          'fileSize':2811784,
          'createTime':'2020-05-26 14:56:26',
          'userId':'56cc0d60253111eab2a5075d32172326',
          'fileUrl':'http://hsptest.sunrtnet.com:8888/bridge-linear/05669e6a8331450e8a8d696f54f0ceb2.jpg',
          'userName':'zyb',
          'accountName':'zyb',
          'userTypeId':null,
          'userTypeName':null,
          'unitId':'0',
          'unitName':'研发部',
          'roleId':null,
          'roleName':'系统管理员'
        },
        {
          'fileId':'a36f68b879cd415cbc04e10f7a88b8c6',
          'fileName':'neo.jpg',
          'fileExt':'jpg',
          'fileSize':2811784,
          'createTime':'2020-05-26 14:56:26',
          'userId':'56cc0d60253111eab2a5075d32172326',
          'fileUrl':'http://hsptest.sunrtnet.com:8888/bridge-linear/05669e6a8331450e8a8d696f54f0ceb2.jpg',
          'userName':'zyb',
          'accountName':'zyb',
          'userTypeId':null,
          'userTypeName':null,
          'unitId':'0',
          'unitName':'研发部',
          'roleId':null,
          'roleName':'系统管理员'
        },
      ],
      // 上传table的配置项
      fileTableColumns:{
        height:'240px',
        showIndex:true,
        showControl:true,
        column:[
          {
            prop:'fileName',
            label:'文件名称',
          },
          {
            prop:'userName',
            label:'上传人',
          },
          {
            prop:'createTime',
            label:'上传时间',
            formatter(row){
              return row.createTime.split(' ')[0]
            }
          },
        ]
      },
      dialogVisible:false,
      showDialogBtns:true,
      dialogWidth:'800px',
      }
    },
    methods: {
      ...window.$su.methods,
      dialogSuccess(){
        this.dialogVisible=false
        console.log(321)
      },
      dialogClose(){
        this.dialogVisible=false
      },
      // 上传成功
      uploadSuccess(e){
        // 设置上传用户名
        e.data[0].userName = this.$store
          ? this.$store.state.userinfo.userName
          : 'root';
        this.fileData = this.fileData.concat(e.data);

        let sym=this.model.attachment.split('').length?',':''
        this.model.attachment+=sym+e.data[0].fileId
      },
      // 删除图片
      removeFile(id){
        if (this.model.attachment) {
          let list = this.model.attachment.split(',');
          list.forEach((item, index) => {
            if (id === item) {
              list.splice(index, 1);
            }
          });
          this.model.attachment = list.join(',');
        }
        this.fileData.forEach((item, index) => {
          if (id === item.fileId) {
            this.fileData.splice(index, 1);
          }
        });
      },
      btnClick(e){
        console.log(e)
      }
    },
    computed:{
      dialogTitle(){
        return this.$t('dialog.title')
      }
    },
    mounted(){
      
    }
  }
</script>
```

:::


### Dialog 模态弹框

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| dialogTitle    | 弹框title | String    | — | — |
| dialogVisible    | 是否显示弹框 | Boolean    | true , false | false |
| showDialogBtns    | 是否显示弹框按钮组 | Boolean    | true , false | true |
| dialogWidth    | 当前弹框的宽度 | String    | — | — |

### Dialog 事件

| 参数      | 说明          | 参数      | 
|---------- |-------------- |---------- |
| open    | Dialog 打开的回调 | —    |
| dialogClose    | 关闭弹框的回调函数 | —    |
| dialogSuccess    | 点击确定按钮的回调函数 | —    |



