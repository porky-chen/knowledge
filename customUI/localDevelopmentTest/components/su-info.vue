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
  <su-dialog :dialog-visible='dialogVisible'
             dialog-width='960px'
             @dialogClose='dialogClose'
             @dialogSuccess='dialogSuccess'
  >
    <div slot='header'>这是详情的标题</div>

    <div slot='content'>
      <el-input-number v-model='num' :min='1' :max='10' label='描述文字'></el-input-number>
      <su-form :items='formItems'
               ref='form'
               :model='formModules'
      >
        <template slot='tip-title'>
          <su-input v-model='formModules.orderCodeValue' />
        </template>
      </su-form>

      <su-upload ref='upload'
                 title='阿斯顿发大水'
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
      >
        <!--        <div slot='headerCustomItem'>headerCustomView</div>-->
      </su-upload>
    </div>
  </su-dialog>
</template>

<script>

export default {
  name: 'su-info',
  components: {},
  data() {
    return {
      dialogVisible: false,
      num: null,

      formModules: {
        batch: {
          rules: [],
          data: [{}],
        },
        orderCodeValue: '',
        materialTypeId: '',
        materialTypeName: '',
        orderCode: '',
        // testTypeId: '',
        unit: '',
        batchCodePrefix: '',
      },
      formItems: [
        {
          span: 24,
          type: 'slot',
          slotID: 'tip-title',
          class: 'su-form-dialog__tip-title',
        },
        {
          span: 12,
          field: 'materialTypeName',
          label: '类型名称',
          labelWidth: '110px',
          placeholder: '请输入',
          validate: 'required',
          maxlength: 10,
          change(e) {
          },
          rules: [{required: true, message: '请输入类型名称', trigger: 'blur'}],
        },
        {
          span: 12,
          field: 'unit',
          label: '计量单位',
          labelWidth: '100px',
          placeholder: '请输入',
          validate: 'required',
          maxlength: 10,
          rules: [{required: true, message: '请输入计量单位', trigger: 'blur'}],
        },
        {
          span: 24,
          type: 'batch',
          field: 'batch',
          showIndex: false,
          showBatchBtn: false,
          // class: 'su-form-dialog__table',
          columns: [
            {
              prop: 'materialSpecName',
              label: '规格名称',
              placeholder: '请输入',
              align: 'right',
              // width: 154
            },
            {
              prop: 'specCode',
              label: '编号',
              placeholder: '请输入',
              // width: 150
            },
            // {
            //   prop: 'conversionFormula',
            //   label: '1计量单位=？kg',
            //   placeholder: '请输入',
            //   width: 180,
            //   type: 'number'
            // },
            {
              prop: 'orderCode',
              label: '排序码',
              width: 260,
              type: 'number',
              controls: false,
            },
            {
              prop: 'materialSystemId',
              label: '物资平台规格',
              placeholder: '请输入',
              // width: 160,
              type: 'select',
              // labelField: 'spec',
              // valueField: 'id',
              options: [],
              onChange(item) {
              },
            },
            {
              prop: 'options',
              label: '操作',
              placeholder: '请输入',
              width: 120,
              buttons: [
                {
                  text: '删除',
                  type: 'text',
                  // plain: false
                  // icon: 'ic_delate_disable',
                },
              ],
            },
          ],
        },
        // {
        //   span: 11,
        //   field: 'batchCodePrefix',
        //   label: '批次编号前缀',
        //   labelWidth: '110px',
        //   placeholder: '请输入',
        //   maxlength: 10
        //   // validate: 'required',
        // },
        {
          span: 12,
          field: 'orderCode',
          label: '排序码',
          labelWidth: '110px',
          placeholder: '请输入',
          // type: 'slot',
          // slotID: 'orderCodeInput',
          type: 'number',
          max: 99999999,
          rules: [{required: true, message: '请输入排序码', trigger: 'blur'}],
        },
        // {
        //   span: 11,
        //   field: 'testTypeId',
        //   label: '材料试验类型',
        //   labelWidth: '110px',
        //   placeholder: '请输入',
        //   validate: 'required',
        //   rules: [{required: true, message: '请输入材料试验类型', trigger: 'blur'}]
        // }
      ],

      uploadFileUrl: '//hsptest.sunrtnet.com:9398/uploadFile',
      fileTypeOptions: [
        {value: '1111', label: 'xxxx1'},
        {value: '2222', label: 'xxxx2'},
        {value: '3333', label: 'xxxx3'},
        {value: '4444', label: 'xxxx4'},
      ],
      fileData: [],
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
        // {
        //   'fileId': '05669e6a8331450e8a8d696f54f0ceb2',
        //   'fileName': '这是图片文件1.jpg',
        //   'fileExt': 'jpg',
        //   'fileSize': 2811784,
        //   'createTime': '2020-05-26 14:56:26',
        //   'userId': '56cc0d60253111eab2a5075d32172326',
        //   'fileUrl': 'https://ss0.baidu.com/7Po3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/9c16fdfaaf51f3dee3fbb43696eef01f3a297912.jpg',
        //   'userName': 'zyb',
        //   'accountName': 'zyb',
        //   'userTypeId': null,
        //   'userTypeName': null,
        //   'unitId': '0',
        //   'unitName': '研发部',
        //   'roleId': null,
        //   'roleName': '系统管理员',
        // },
        // {
        //   'fileId': '218dd2ad4ed64827ae13c6b68f1ccdef',
        //   'fileName': '这是图片文件2.jpg',
        //   'fileExt': 'jpg',
        //   'fileSize': 2811784,
        //   'createTime': '2020-05-26 14:56:26',
        //   'userId': '56cc0d60253111eab2a5075d32172326',
        //   'fileUrl': 'http://hsptest.sunrtnet.com:8888/bridge-linear/05669e6a8331450e8a8d696f54f0ceb2.jpg',
        //   'userName': 'zyb',
        //   'accountName': 'zyb',
        //   'userTypeId': null,
        //   'userTypeName': null,
        //   'unitId': '0',
        //   'unitName': '研发部',
        //   'roleId': null,
        //   'roleName': '系统管理员',
        // },
        // {
        //   'fileId': 'a36f68b879cd415cbc04e10f7a88b8c6',
        //   'fileName': '这是pdf文件.pdf',
        //   'fileExt': 'pdf',
        //   'fileSize': 2811784,
        //   'createTime': '2020-05-26 14:56:26',
        //   'userId': '56cc0d60253111eab2a5075d32172326',
        //   'fileUrl': 'http://192.168.0.56:9698//image//construction/2021/9/e9da667021c144648a0dac077579140d.pdf',
        //   'userName': 'zyb',
        //   'accountName': 'zyb',
        //   'userTypeId': null,
        //   'userTypeName': null,
        //   'unitId': '0',
        //   'unitName': '研发部',
        //   'roleId': null,
        //   'roleName': '系统管理员',
        // },
      ],
    }
  },
  methods: {
    openDialog(isEdit) {
      this.dialogVisible = true
    },
    dialogClose() {
      this.dialogVisible = false
    },
    dialogSuccess() {
    },
  },
}
</script>

<style scoped lang='scss'>

</style>
