## 附件上传

选择文件上传附件的

::: demo

```html

<su-upload ref='upload'
           v-model='fileDataList'
           :uploadFileUrl='uploadFileUrl'
           :accept='uploadConfiguration.accept'
           :acceptTips='uploadConfiguration.acceptTips'
           :showFileTypeSelect='uploadConfiguration.showFileTypeSelect'
           :disabled='uploadConfiguration.disabled'
           :hint='uploadConfiguration.hint'
           :uploadLimit='uploadConfiguration.uploadLimit'
           :uploadLimitSize='uploadConfiguration.uploadLimitSize'
           :uploadName='uploadName'
           :file-type-options='fileTypeOptions'
/>
<script>
  export default {
    data() {
      return {
        fileDataList: [],
        uploadFileUrl: '//hsptest.sunrtnet.com:9398/uploadFile',
        // :item='uploadConfiguration' 原先的upload配置信息通过item对象传递，如今依然可以，但不建议使用。配置所需属性即可。
        uploadConfiguration: {
          accept: 'image/jpg,image/JPG,image/jpeg,image/JPEG,image/png,image/PNG,image/svg,image/SVG,image/gif,image/GIF',
          acceptTips: '请上传图片类型文件！',
          showFileTypeSelect: true,
          disabled: null,
          hint: ' ',
          uploadLimit: 10,
          uploadLimitSize: 200,
        },
        uploadName: 'files',
        fileTypeOptions: [
          {value: '1111', label: '--1'},
          {value: '2222', label: '--2'},
          {value: '3333', label: '--3'},
          {value: '4444', label: '--4'},
        ],
        // :fileData='fileData' 原先的表格列表数据通过fileData传递。如今依然可以，不建议使用，使用v-model即可。
        fileData: [
          {
            'fileId': '05669e6a8331450e8a8d696f54f0ceb2',
            'fileName': '这是图片文件1.jpg',
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
            'roleName': '系统管理员',
          },
          {
            'fileId': '218dd2ad4ed64827ae13c6b68f1ccdef',
            'fileName': '这是图片文件2.jpg',
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
            'roleName': '系统管理员',
          },
          {
            'fileId': 'a36f68b879cd415cbc04e10f7a88b8c6',
            'fileName': '这是pdf文件.pdf',
            'fileExt': 'pdf',
            'fileSize': 2811784,
            'createTime': '2020-05-26 14:56:26',
            'userId': '56cc0d60253111eab2a5075d32172326',
            'fileUrl': 'http://192.168.0.56:9698//image//construction/2021/9/e9da667021c144648a0dac077579140d.pdf',
            'userName': 'zyb',
            'accountName': 'zyb',
            'userTypeId': null,
            'userTypeName': null,
            'unitId': '0',
            'unitName': '研发部',
            'roleId': null,
            'roleName': '系统管理员',
          },
        ]
      }
    },
    methods: {}
  }
</script>
```

:::

### 原form方式使用附件上传（不建议使用）

::: demo

```html

<su-form :items='items2'
         ref='form2'
         @uploadSuccess='uploadSuccess'
         @removeFile='removeFile'
         :model='infoData2'
         :disabled='false'
/>
<script>
  export default {
    data() {
      return {
        items2: [
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
                  formatter(row) {
                    return row.createTime.split(' ')[0]
                  },
                },
              ],
            },
            // 上传文件配置项
            uploadItem: {
              accept: 'image/jpg,image/JPG,image/jpeg,image/JPEG,image/png,image/PNG,image/svg,image/SVG,image/gif,image/GIF',
              acceptTips: '请上传图片类型文件！',
              field: null,
              showFileTypeSelect: true,
              disabled: null,
              fileShowInfoList: true,
              pattern: '.',
              fileBtnName: null,
              hint: ' ',
              uploadLimit: 10,
              uploadLimitSize: 200,
            },
            // 上传文件的地址
            uploadFileUrl: '//hsptest.sunrtnet.com:9398/uploadFile',
            // 上传文件的字段名
            uploadName: 'files',
          },
        ],
        infoData2: {
          // 上传的数据
          upload: {
            attachment: '05669e6a8331450e8a8d696f54f0ceb2,218dd2ad4ed64827ae13c6b68f1ccdef,a36f68b879cd415cbc04e10f7a88b8c6',
            fileData: [
              {
                'fileId': '05669e6a8331450e8a8d696f54f0ceb2',
                'fileName': '这是图片文件1.jpg',
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
                'roleName': '系统管理员',
              },
              {
                'fileId': '218dd2ad4ed64827ae13c6b68f1ccdef',
                'fileName': '这是图片文件2.jpg',
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
                'roleName': '系统管理员',
              },
              {
                'fileId': 'a36f68b879cd415cbc04e10f7a88b8c6',
                'fileName': '这是pdf文件.pdf',
                'fileExt': 'pdf',
                'fileSize': 2811784,
                'createTime': '2020-05-26 14:56:26',
                'userId': '56cc0d60253111eab2a5075d32172326',
                'fileUrl': 'http://192.168.0.56:9698//image//construction/2021/9/e9da667021c144648a0dac077579140d.pdf',
                'userName': 'zyb',
                'accountName': 'zyb',
                'userTypeId': null,
                'userTypeName': null,
                'unitId': '0',
                'unitName': '研发部',
                'roleId': null,
                'roleName': '系统管理员',
              },
            ],
          },
        },
      }
    },
    methods: {
      // 上传成功
      uploadSuccess(e) {
        let data = this.infoData2

        // 设置上传用户名
        // e.data[0].userName = this.$store
        //   ? this.$store.state.userinfo.userName
        //   : 'root';
        e.data[0].userName = 'root'

        data.upload.fileData = data.upload.fileData.concat(e.data)

        let sym = data.upload.attachment.split('').length ? ',' : ''
        data.upload.attachment += sym + e.data[0].fileId
      },
      // 删除图片
      removeFile(id) {
        let data = this.infoData2
        if (data.upload.attachment) {
          let list = data.upload.attachment.split(',')
          list.forEach((item, index) => {
            if (id === item) {
              list.splice(index, 1)
            }
          })
          data.upload.attachment = list.join(',')
        }
        data.upload.fileData.forEach((item, index) => {
          if (id === item.fileId) {
            data.upload.fileData.splice(index, 1)
          }
        })
      },
    },
  }
</script>
```

:::

### Upload Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|---------- |-------------- |---------- |---------- |---------- |
| action/uploadFileUrl | 必选参数，上传的地址 | string | - | this.$api?.uploadFile |
| headers | 设置上传的请求头部     | object | - | this.$su.http?.getHeaders() |
| multiple | 是否支持多选文件 | boolean | - | true |
| data | 上传时附带的额外参数 | object | - | - |
| name/uploadName | 上传的文件字段名 | string | - | file |
| with-credentials | 支持发送 cookie 凭证信息 | boolean | - | false |
[comment]: <不建议使用> (| show-file-list | 是否显示已上传文件列表 | boolean | - | true |)
| drag | 是否启用拖拽上传 | boolean | - | false |
| accept | 接受上传的文件类型（thumbnail-mode 模式下此参数无效） | string | - | - |
| on-preview | 点击文件列表中已上传的文件时的钩子 | function(file) | - | - |
| on-remove | 文件列表移除文件时的钩子 | function(file, fileList) | - | - |
| on-success | 文件上传成功时的钩子 | function(response, file, fileList) | - | - |
| on-error | 文件上传失败时的钩子 | function(err, file, fileList) | - | - |
| on-progress | 文件上传时的钩子 | function(event, file, fileList) | - | - |
| on-change | 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用 | function(file, fileList) | - | - |
| before-upload | 上传文件之前的钩子，参数为上传的文件，若返回 false，则停止上传 | function(file) | - | - |
| before-remove | 删除文件之前的钩子，参数为上传的文件和文件列表，若返回 false，则停止删除 | function(file, fileList) | - | - |
| list-type | 文件列表的类型 | string | text/picture/picture-card | text |
| auto-upload | 是否在选取文件后立即进行上传 | boolean | - | true |
[comment]: <不建议使用> (| file-list | 上传的文件列表, 例如: [{name: 'food.jpg', url: 'https://-x.cdn.com/-x.jpg'}] | array | - | [] |)
| http-request | 覆盖默认的上传行为，可以自定义上传的实现 | function | - | - |
| disabled | 是否禁用 | boolean | - | false |
| limit/uploadLimit | 最大允许上传个数 | number | - | - |
| on-exceed | 文件超出个数限制时的钩子 | function(files, fileList) | - | this.$message.warning({ message: `当前限制选择 ${this.uploadLimitCount} 个文件`, showClose: true }) |
| acceptTips | 文件类型非accept时的提示内容 | String | - | 请上传目标文件类型！ |
| uploadLimitSize | 上传文件限制的大小 | Number | - | 0 |
| fileShowInfoList | file的插槽是否显示 | Boolean | - | false |
| item（不建议使用） | 上传文件配置项 | Object | - | {} |
| tableMaxHeight | 表格的maxHeight属性 | String | - | - |
| fileTableColumns（不建议使用） | 上传详情列表配置项 | Object | - | {} |
| tableColumn | 附件表格su-table的column属性，表格列标题 | Array | - | [] |
| tableShowIndex | 附件表格su-table的showIndex属性，是否显示序号 | Boolean | - | true |
| tableShowControl | 附件表格是否显示操作一列 | Boolean | - | true |
| tableShowDelete | 附件表格的操作列内是否显示删除按钮 | Boolean | - | true |
| tableShowDownload | 附件表格的操作列内是否显示下载按钮 | Boolean | - | true |
| showFileTypeSelect | 是否显示文件类型选择框 | Boolean | - | false |
| customFieldOfFileType | 文件类型赋值到fileData上的属性名 | String | - | fileType |
| fileTypeOptions | 文件类型的选择options | Array | - | [] |
| hint | tip插槽内的提示文本内容 | String | - | - |
[comment]: <不建议使用> (| fileData | 附件列表数据 | Array | - | [] |)

### Upload Slots

| name | 说明 |
|---------- |-------------- |
| trigger | 触发文件选择框的内容 |
| tip | 提示说明文字 |

### Upload Methods（通过组件的getRef()获取其原生element组件的ref对象）

| 方法名 | 说明 | 参数 |
|---------- |-------------- |-------------- |
[comment]: <不再使用upload自身的文件显示下，已失效> (| clearFiles | 清空已上传的文件列表（该方法不支持在 before-upload 中调用） | - |)
| abort | 取消上传请求 | （ file: fileList 中的 file 对象 ）|
| submit | 手动上传文件列表 | - |
