<!--
- Copyright (c) 2021 Guangdong Sun Railway Information Technology, Inc.
- All rights reserved.
-
- @author wenteng
-
- Description:
-
- Changelog:
-
- Revision:
-->

<template>
  <div>
    <su-form :items='items2'
             ref='form2'
             @uploadSuccess='uploadSuccess'
             @removeFile='removeFile'
             :model='infoData2'
             :disabled='false'
    />

    <su-upload ref='upload'
               v-model='fileData'
               :uploadFileUrl='uploadFileUrl'
               :accept='uploadConfiguration.accept'
               :acceptTips='uploadConfiguration.acceptTips'
               :showFileTypeSelect='uploadConfiguration.showFileTypeSelect'
               :disabled='uploadConfiguration.disabled'
               :hint='uploadConfiguration.hint'
               :uploadLimit='uploadConfiguration.uploadLimit'
               :uploadLimitSize='uploadConfiguration.uploadLimitSize'
               :uploadName='uploadName'
               :file-data='fileDataList'
               :file-type-options='fileTypeOptions'
    />
  </div>
</template>

<script>
export default {
  name: 'su-upload-test',
  data() {
    return {
      fileData: [],


      //
      uploadFileUrl: '//hsptest.sunrtnet.com:9398/uploadFile',
      // :item='uploadConfiguration' 原先的upload配置信息通过item对象传递，如今依然可以，但不建议使用。
      uploadConfiguration: {
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
      uploadName: 'files',
      fileDataList: [
        {
          'fileId': '05669e6a8331450e8a8d696f54f0ceb2',
          'fileName': '这是图片文件1.jpg',
          'fileExt': 'jpg',
          'fileSize': 2811784,
          'createTime': '2020-05-26 14:56:26',
          'userId': '56cc0d60253111eab2a5075d32172326',
          'fileUrl': 'https://ss0.baidu.com/7Po3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/9c16fdfaaf51f3dee3fbb43696eef01f3a297912.jpg',
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

      fileTypeOptions: [
        {value: '1111', label: 'xxxx1'},
        {value: '2222', label: 'xxxx2'},
        {value: '3333', label: 'xxxx3'},
        {value: '4444', label: 'xxxx4'},
      ],

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
