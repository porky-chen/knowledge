<!--
 - Copyright (c) 2019 Guangdong Sun Railway Information Technology, Inc.
 - All rights reserved.
 -
 - @author liaochenxi
 - Description: 上传组件
 - Changelog:
 - Revision 1.0 2019-08-12 liaochenxi
 - Revision 1.0.0 2020-11-04 规范3.0下组件库调整
 - - 初始化
 -->

<template>
  <div class='su-upload'>
    <div class='header-view'>
      <div class='header-title'>{{ titleInfo }}</div>

      <div class='header-file-type' v-if='showFileTypeSelectable'>
        <slot name='fileTypeSelect'>
          <su-select ref='fileTypeSelect'
                     v-model='selectedFileType'
                     :options='fileTypeOptions'
                     placeholder='请选择文件类型'
          />
        </slot>
      </div>

      <div class='header-custom-item-view' v-if='$slots.headerCustomItem'>
        <slot name='headerCustomItem' />
      </div>

      <div class='header-upload'>
        <su-file-upload ref='upload'
                        v-bind='filterAttributes({
                          targetObj: $attrs,
                          excludePrefixes: ["show-file-list", "file-list"]
                        })'
                        :action='$attrs.action || uploadFileUrl'
                        :on-success='uploadSuccess'
                        :on-exceed='handleExceed'
                        :before-upload='handleBeforeUpload'
                        :limit='uploadLimitCount'
                        :auto-upload='true'
                        :name='$attrs.name || uploadName'
                        :headers='headers'
                        :accept='acceptInfo'
                        :multiple='multiple'
                        :fileType='fileType'
                        :disabled='disabledInfo'
        >
          <div v-if='fileShowInfoListVisible' slot='file'></div>
          <div slot='trigger'>
            <slot name='trigger'>
              <su-button icon='el-icon-upload2'
                         type='primary'
                         plain
                         :data-field='item.field'
                         :data-pattern="item.pattern || '\\.pdf$'"
                         :disabled='uploadLimitCount && uploadLimitCount <= fileData.length'
              >
                上传
              </su-button>
            </slot>
          </div>

          <div slot='tip' class='text-faded'>
            <slot name='tip'>
              {{ uploadHintInfo || '只能上传pdf文件，且不超过200M' }}
            </slot>
          </div>
        </su-file-upload>
      </div>

      <div class='header-tip-item-view' v-if='$slots.headerTipItem'>
        <slot name='headerTipItem' />
      </div>
    </div>

    <!--    附件列表信息-->
    <el-row type='flex' class='su-upload-table'>
      <su-table highlight-current-row
                ref='table'
                :none-out-border='true'
                :show-checkbox='false'
                :show-index='showTableIndex'
                :columns='fileTableColumnData'
                :data='tableDataList'
                border
                :max-height='tableMaxHeightInfo'
                class='upload-table'
      >
        <template v-slot:operationSlotInside='{item}'>
          <div style='display: flex; align-items: center; justify-content: center'
               class='operation-inside'
          >
            <su-button title='预览'
                       type='text'
                       size='mini'
                       :disable-form-disabled='tablePreviewButtonDisableForm'
                       icon='el-icon-view su-icon'
                       @click='previewFile(item)'
            />

            <template v-if='showTableDeleteButton'>
              <div class='su-upload-vertical-view' />
              <su-button title='删除'
                         type='text'
                         size='mini'
                         :disable-form-disabled='tableDeleteButtonDisableForm'
                         icon='el-icon-delete su-icon'
                         @click='removeFile(item)'
              />
            </template>

            <template v-if='showTableDownloadButton'>
              <div class='su-upload-vertical-view' />
              <su-button title='下载'
                         type='text'
                         size='mini'
                         :disable-form-disabled='tableDownloadButtonDisableForm'
                         icon='el-icon-download su-icon'
                         @click='downloadFile(item)'
              />
            </template>
          </div>
        </template>
      </su-table>
    </el-row>

    <!-- 调用图片预览功能 -->
    <su-images v-if='imageDataList.length' class='flex' :images='imageDataList' ref='viewer'>
      <template v-slot:default='slotProps'>
        <div v-for='(res, index) in slotProps.images' :key='`${res.thumb}${index}`' class='flex'>
          <img :url='res.thumb' class='viewer-img-item' :key='`${res.thumb}${index}`' alt />
        </div>
      </template>
    </su-images>
  </div>
</template>

<script>
import SuViewer from '@/components/su-viewer-modal/index'
import SuFileUpload from './su-file-upload'
import SuComponent from '@/mixins/su-component'
import dayjs from 'dayjs'

export default {
  name: 'SuUpload',
  components: {SuFileUpload},
  mixins: [SuComponent],
  props: {
    // 提供v-model使用，value为null，则显示fileData的数据内容
    value: {
      type: Array,
      default: () => {
        return null
      },
    },
    // 上传文件的地址
    uploadFileUrl: {
      type: String,
      default: '',
    },
    // 接口的附件参数名称
    uploadName: {
      type: String,
    },
    title: {
      type: String,
      default: '附件',
    },
    // 文件类型提示的信息
    acceptTips: {
      type: String,
      default: '请上传目标文件类型！',
    },
    // 上传文件限制的大小
    uploadLimitSize: {
      type: Number,
      default: 0,
    },
    limit: {
      type: Number,
      default: null,
    },
    uploadLimit: {
      type: Number,
      default: null,
    },
    // 上传文件接收的类型
    accept: {
      type: String,
      default: '',
    },
    multiple: {
      type: Boolean,
      default: true,
    },
    // 表格的maxHeight属性
    tableMaxHeight: {
      type: String,
      default: null,
    },
    fileShowInfoList: {
      type: Boolean,
      default: false,
    },
    // 上传文件配置项
    item: {
      type: Object,
      default: () => {
        return {}
      },
    },
    // 上传详情列表配置项
    fileTableColumns: {
      type: Object,
      default: () => {
        return {}
      },
    },
    tableColumns: {
      type: Array,
      default: () => {
        return []
      },
    },
    tableShowIndex: {
      type: Boolean,
      default: true,
    },
    tableShowControl: {
      type: Boolean,
      default: true,
    },
    tableShowDelete: {
      type: Boolean,
      default: true,
    },
    tablePreviewDisableForm: {
      type: Boolean,
      default: true,
    },
    tableDeleteDisableForm: {
      type: Boolean,
      default: false,
    },
    tableDownloadDisableForm: {
      type: Boolean,
      default: false,
    },
    tableShowDownload: {
      type: Boolean,
      default: true,
    },

    showFileTypeSelect: {
      type: Boolean,
      default: false,
    },
    // 文件类型赋值到fileData上的属性名
    customFieldOfFileType: {
      type: String,
      default: 'fileType',
    },
    // 文件类型的选择options
    fileTypeOptions: {
      type: Array,
      default: () => {
        return []
      },
    },
    fileType: {
      type: String,
      default: null,
    },
    hint: {
      type: String,
      default: null,
    },
    // 文件列表 编辑时传过来 - 也可转而采用v-model方式
    fileData: {
      type: Array,
      default() {
        return []
      },
    },
    // 禁止状态
    disabled: {
      type: Boolean,
      default: false,
    },
    // 补充的头部信息
    headers: {
      type: Object,
      default: null,
    },
  },
  computed: {
    // index() {
    //   return this.$t('upload.index')
    // },
    // operate() {
    //   return this.$t('upload.operate')
    // },
    // fileBtnName() {
    //   return this.$t('upload.uploadBtn')
    // },
    // fileBtnNameContinue() {
    //   return this.$t('upload.uploadBtnContinue')
    // },
    // preview() {
    //   return this.$t('upload.preview')
    // },
    // download() {
    //   return this.$t('upload.download')
    // },
    // del() {
    //   return this.$t('upload.del')
    // },

    // 表格的数据源
    tableDataList() {
      let dataList = this.fileData || []
      dataList = dataList.concat(this.value || [])
      return dataList
    },
    uploadLimitCount() {
      return this.getDefaultWhenNotExist(this.item.uploadLimit, this.limit || this.uploadLimit)
    },
    showFileTypeSelectable() {
      return this.getDefaultWhenNotExist(this.item.showFileTypeSelect, this.showFileTypeSelect)
    },
    showTableIndex() {
      return this.getDefaultWhenNotExist(this.fileTableColumns.showIndex, this.tableShowIndex)
    },
    showTableControl() {
      return this.getDefaultWhenNotExist(this.fileTableColumns.showControl, this.tableShowControl)
    },
    tablePreviewButtonDisableForm() {
      return this.getDefaultWhenNotExist(this.fileTableColumns.tablePreviewDisableForm, this.tablePreviewDisableForm)
    },
    tableDeleteButtonDisableForm() {
      return this.getDefaultWhenNotExist(this.fileTableColumns.tableDeleteDisableForm, this.tableDeleteDisableForm)
    },
    tableDownloadButtonDisableForm() {
      return this.getDefaultWhenNotExist(this.fileTableColumns.tableDownloadDisableForm, this.tableDownloadDisableForm)
    },
    showTableDeleteButton() {
      return this.getDefaultWhenNotExist(this.fileTableColumns.showDelete, this.tableShowDelete)
    },
    showTableDownloadButton() {
      return this.getDefaultWhenNotExist(this.fileTableColumns.showDownload, this.tableShowDownload)
    },
    uploadHintInfo() {
      return this.getDefaultWhenNotExist(this.item.hint, this.hint)
    },
    acceptTipsInfo() {
      return this.getDefaultWhenNotExist(this.item.acceptTips, this.acceptTips)
    },
    tableMaxHeightInfo() {
      return this.getDefaultWhenNotExist(this.fileTableColumns.maxHeight, this.tableMaxHeight)
    },
    fileShowInfoListVisible() {
      return this.getDefaultWhenNotExist(this.item.fileShowInfoList, this.fileShowInfoList)
    },
    disabledInfo() {
      return this.getDefaultWhenNotExist(this.item.disabled, this.disabled)
    },
    uploadLimitSizeInfo() {
      return this.getDefaultWhenNotExist(this.item.uploadLimitSize, this.uploadLimitSize)
    },
    acceptInfo() {
      return this.getDefaultWhenNotExist(this.item.accept, this.accept)
    },
    titleInfo() {
      return this.getDefaultWhenNotExist(this.item.title, this.title)
    },
    imageDataList() {
      let dataList = []
      this.tableDataList.forEach(item => {
        if ('bmp,jpg,png,gif,jpeg'.includes(item.fileExt.toLowerCase())) {
          dataList.push({
            thumb: item.fileUrl,
            larger: item.fileUrl,
            name: '231',
          })
        }
      })
      return dataList
    },
    fileTableColumnData() {
      let columns = []

      if (this.fileTableColumns && this.fileTableColumns.column && this.fileTableColumns.column.length > 0) {
        console.log('----------')
        columns = [...this.fileTableColumns.column]
      } else if (this.tableColumns && this.tableColumns.length > 0) {
        console.log('=========')
        columns = [...this.tableColumns]
      } else {
        console.log('xxxxxxxxxxxxx')
        columns = [
          {prop: 'fileName', label: '文件名称'},
          {prop: 'userName', label: '上传人'},
          {
            prop: 'createTime', label: '上传时间',
            formatter(row) {
              return dayjs(row.createTime).format('YYYY-MM-DD')
            },
          },
        ]
      }

      // 如果设置了显示操作按钮
      if (this.showTableControl) {
        columns.push({
          type: 'slot',
          customWidth: true,
          slotID: 'operationSlotInside',
          label: '操作',
          width: 112,
        })
      }

      return columns
    },
  },
  data() {
    return {

      showBtnImg: true,
      noneBtnImg: false,

      // 选择的文件类型
      selectedFileType: null,
    }
  },
  methods: {
    getRef() {
      return this.$refs.upload
    },

    // 设置选择的文件类型selectedFileType
    setSelectedFileType(value) {
      this.selectedFileType = value
    },

    uploadSuccess(fileDataList, res) {
      if (this.showFileTypeSelectable) {
        for (let fileItem of fileDataList) {
          fileItem[this.customFieldOfFileType] = this.selectedFileType
        }
      }
      if (this.$attrs['custom-data-when-upload-sucess'] !== null && typeof this.$attrs['custom-data-when-upload-sucess'] === 'function') {
        this.$attrs['custom-data-when-upload-sucess'](fileDataList, res)
      }

      res.fileDataList = fileDataList
      if (fileDataList && fileDataList.length > 0) {
        res.fileData = fileDataList[0]
      }

      if (this.value) {
        this.$emit('input', [...this.value, ...fileDataList])
      }

      this.$emit('uploadSuccess', res)
    },

    removeFile(fileData) {
      let fileIndex = this.tableDataList.findIndex(item => item.fileId === fileData.fileId)

      if (this.value) {
        let value = [...this.value]
        value.splice(fileIndex, 1)
        this.$emit('input', value)
      }

      this.$emit('removeFile', fileData.fileId)
    },

    downloadFile(fileData) {
      let fileUrl = fileData.fileUrl

      let x = new XMLHttpRequest()
      x.open('GET', fileUrl, true)
      x.responseType = 'blob'
      x.onload = function(e) {
        let url = window.URL.createObjectURL(x.response)
        let a = document.createElement('a')
        a.href = url
        a.download = fileData.fileName
        a.click()
      }
      x.send()
    },

    previewFile(fileData) {
      // let fileIndex = this.imageDataList.findIndex(item => item.fileId === fileData.fileId)
      if ('bmp,jpg,png,gif,jpeg'.includes(fileData.fileExt.toLowerCase())) {
        this.$refs['viewer'].showDialog()
      } else {
        SuViewer([fileData.fileUrl, fileData.fileUrl])
      }

      // this.$su.previewImages({
      //   imageList: [
      //     {
      //       larger: 'http://hsptest.sunrtnet.com:8888/bridge-linear/05669e6a8331450e8a8d696f54f0ceb2.jpg',
      //       thumb: 'https://ss0.baidu.com/7Po3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/9c16fdfaaf51f3dee3fbb43696eef01f3a297912.jpg',
      //       name: 'xxxx',
      //     },
      //   ],
      //   previewIndex: 0,
      // })
    },

    handleExceed(files, fileList) {
      if (this.$attrs['handle-exceed'] !== null && typeof this.$attrs['handle-exceed'] === 'function') {
        this.$attrs['handle-exceed'](files, fileList)
      } else {
        this.$message.warning({
          message: `当前限制选择 ${this.uploadLimitCount} 个文件`,
          customClass:'message-index',
          showClose: true,
        })
      }
    },

    handleBeforeUpload(file) {
      if (this.$attrs['before-upload'] !== null && typeof this.$attrs['before-upload'] === 'function') {
        if (!this.$attrs['before-upload'](file)) {
          return false
        }
      }

      // if (this.acceptInfo && (file.type.toLowerCase() === '' || !this.acceptInfo.includes(file.type.toLowerCase()))) {
      //   this.$su.alert(this.acceptTipsInfo)
      //   return false
      // }

      // 文件大小限制
      if (this.uploadLimitSizeInfo) {
        const isLimit = file.size / 1024 / 1024 <= this.uploadLimitSizeInfo
        if (!isLimit) {
          this.$alert('上传文件大小不能超过' + this.uploadLimitSizeInfo + 'M!', '提示')
          return false
        }
      }

      return true
    },

    clearFile() {
      this.$refs.upload.clearFiles()
    },
    getDefaultWhenNotExist(value, defaultValue) {
      if (value === null || value === undefined) {
        return defaultValue
      }
      return value
    },
  },
}
</script>
<style lang='scss' scoped>
::v-deep .el-table__header {
  width: 100% !important;
}

::v-deep .el-table__body {
  width: 100% !important;
}

.su-upload-vertical-view {
  display: inline-block;
  width: 1px;
  height: 1em;
  //margin: 0 8px;
  margin-left: 5px;
  margin-right: 8px;
  vertical-align: middle;
  position: relative;
  background-color: #DDE2EE;
}

.su-upload {
  .header-view {
    margin-bottom: 12px;
    display: flex;
    flex-direction: row;
    align-items: center;

    .header-upload {
      display: flex;
      align-items: center;
    }

    .header-tip-item-view, .header-upload, .header-custom-item-view, .header-file-type {
      margin-right: 16px;
    }

    .header-title {
      margin-right: 16px;
      height: 20px;
      font-size: 14px;
      text-align: left;
    }
  }
}

.su-upload-table {
}
</style>
<style lang='scss'>
.disUoloadSty .el-upload--text {
  display: none !important; /* 上传按钮隐藏 */
}
.message-index{
    z-index: 4000 !important;
}
</style>
