<!--
- Copyright (c) 2021 Guangdong Sun Railway Information Technology, Inc.
- All rights reserved.
-
- @author wenteng
-
- Description:
-
- Changelog:
- Revision 1.0.0 2020-11-04 规范3.0下组件库调整
-
- Revision:
-->


<template>
  <el-upload ref='upload'
             class='su-file-upload'
             v-bind='$attrs'
             :action='getActionUrl'
             :show-file-list='showFileList'
             :on-error='handleError'
             :on-success='handleSuccess'
             :on-progress='handleProgress'
             :headers='uploadHeaders'
             :data='dataInfo'
             :before-upload='handleBeforeUpload'
  >
    <template v-for='name in Object.keys($slots)' v-slot:[name]>
      <slot :name='name' />
    </template>
  </el-upload>
</template>

<script>
import {
  Upload,
} from 'element-ui'

/**
 * @module su-file-upload 纯文件上传组件【原ele属性全支持】
 * @desc 仅对el-upload封装，包含网络请求默认头部参数。
 *
 * @vue-prop {String} fileType - 附件上传的fileType参数内容
 * @vue-prop {Object} data -【原ele】上传时附带的额外参数【默认是{fileType}】
 * @vue-prop {Function} beforeUpload - 【原ele】上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
 * @vue-prop {Function} onError -【原ele】文件上传失败时的钩子【默认通过this.$message.error(err)处理】
 * @vue-prop {Function} onSuccess -【原ele,重写】文件上传成功时的钩子【function(fileList, response)】
 * @vue-prop {Function} onProgress -【原ele】文件上传时的钩子
 * @vue-prop {Object} headers -【原ele】设置上传的请求头部【默认含请求中需携带的参数，sign那些】
 * @vue-prop {Boolean} showFileList -【原ele】是否显示已上传文件列表【默认是false】
 * @vue-porp {String} imageBaseUrl - 拼接图片完整的url的前缀内容【默认this.$api?.IMAGE_BASE_URL】
 * @vue-porp {String} action - 必选参数，上传的地址【默认this.$api?.uploadFile】
 *
 */
export default {
  name: 'su-file-upload',
  components: {
    'el-upload': Upload,
  },
  props: {
    fileType: {
      type: String,
      default: null,
    },
    data: {
      type: Object,
      default: () => {
        return null
      },
    },

    beforeUpload: {
      type: Function,
      default: null,
    },
    onError: {
      type: Function,
      default: null,
    },
    onSuccess: {
      type: Function,
      default: null,
    },
    onProgress: {
      type: Function,
      default: null,
    },

    headers: {
      type: Object,
      default: null,
    },
    showFileList: {
      type: Boolean,
      default: false,
    },

    imageBaseUrl: {
      type: String,
      default: null,
    },
    action: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      imageUrl: '',

      defaultHeaders: {
        accessToken: sessionStorage.accessToken,
        authorization: sessionStorage.token,
        token: sessionStorage.token,
        accountName: sessionStorage.userAccount?.accountName,
        Pragma: 'no-cache',
      },
    }
  },
  computed: {
    uploadHeaders() {
      return Object.assign(this.defaultHeaders, this.$su.http?.getHeaders() || {}, this.headers || {})
    },
    getImageBaseUrl() {
      return this.imageBaseUrl || this.$api?.IMAGE_BASE_URL || ''
    },
    getActionUrl() {
      return this.action || this.$api?.uploadFile || ''
    },
    dataInfo() {
      if (this.data) {
        return this.data
      } else {
        return {
          fileType: this.fileType,
        }
      }
    },
  },
  methods: {
    handleError(err) {
      if (this.onError && typeof this.onError === 'function') {
        this.onError(err)
      } else {
        this.$message.error({ message:err,customClass:'message-index'})
      }
    },

    handleSuccess(res) {
      if (res.code !== 10000) {
        this.$message.error({ message:res.message,customClass:'message-index'})
        return
      }
      let fileDataList = []
      if (res.data) {
        fileDataList = Array.isArray(res.data) ? res.data : [res.data]
      }

      // 全路径信息
      for (let fileItem of fileDataList) {
        if (!fileItem.fileUrl) {
          fileItem.fileUrl = this.getImageBaseUrl + fileItem.filePath
        }
        if (!fileItem.userName) {
          fileItem.userName = fileItem.createUserName
        }
      }

      if (this.onSuccess && typeof this.onSuccess === 'function') {
        this.onSuccess(fileDataList, res)
      }
    },

    handleProgress(event, file, fileList) {
      if (this.onProgress && typeof this.onProgress === 'function') {
        this.onProgress(event, file, fileList)
      }
    },

    handleBeforeUpload(file) {
      if (this.beforeUpload && typeof this.beforeUpload === 'function') {
        return this.beforeUpload(file)
      }
    },

    // Methods
    clearFiles() {
      this.$refs.upload.clearFiles()
    },
    submit() {
      this.$refs.upload.submit()
    },
    abort(file) {
      this.$refs.upload.abort(file)
    },
  },
}
</script>

<style scoped lang='scss'>
.message-index{
    z-index: 4000 !important;
}
</style>
