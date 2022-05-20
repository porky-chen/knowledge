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
- Revision:
-->

<template>
  <div class='su-image-upload'>
    <div class='image-list-view'>
      <div class='image-item-view'
           v-for='item of value'
           :key='item.id'
      >
        <img :src='item.fileUrl'>
        <div class='float-operation-view'>
          <div class='content-view'>
            <div class='item-view preview'>
              <i class='el-icon-view' />
            </div>
            <div class='item-view delete'>
              <i class='el-icon-delete' />
            </div>
            <div class='item-view download'>
              <i class='el-icon-download' />
            </div>
          </div>
        </div>
      </div>

      <su-file-upload :file-type='fileType'
                      v-bind='$attrs'
                      :on-success='handleOnSuccess'
                      :on-progress='handleOnProgress'
                      :before-upload='handleBeforeUpload'
      >
        <div slot='trigger' class='image-item-view upload-image-view'>
          <div class='uploaded-view' v-if='!uploading'>
            <i class='el-icon-plus' />
            <div class='title'>上传图片</div>
          </div>

          <div class='uploading-view' v-if='uploading'>
            <div class='title'>上传中</div>
            <el-progress :percentage='50'
                         class='su-progress'
                         :show-text='false'
            />
          </div>
        </div>
      </su-file-upload>
    </div>
  </div>
</template>

<script>
import logo from '@/assets/img/pic-validate.png'
import SuFileUpload from './su-file-upload'

export default {
  name: 'su-image-upload',
  components: {SuFileUpload},
  props: {
    value: {
      type: Array,
      default: () => {
        return []
      },
    },

    fileType: {
      type: String,
      default: 'annualPlan',
    },
  },
  data() {
    return {
      logo,

      // 是否上传中
      uploading: true,
      uploadedPercentage: 0,
    }
  },
  methods: {
    handleOnSuccess(fileData) {
      this.uploading = false
      this.uploadedPercentage = 0

      let value = [...this.value]
      value.push(fileData)
      this.$emit('input', value)
      console.log(value, 'value-value')
    },

    handleOnProgress(event, file, fileList) {

    },

    handleBeforeUpload(fileData) {
      // 允许上传
      this.uploading = true
      this.uploadedPercentage = 10

      return true
    },
  },
}
</script>

<style scoped lang='scss'>
.su-image-upload {
  text-align: left;

  .image-list-view {
    display: flex;
  }
}

.upload-image-view {
  border: none !important;

  .uploaded-view,
  .uploading-view {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }


  .uploading-view {
    border: 1px dashed #9ccdff !important;
    flex-direction: column;

    .title {
      margin-bottom: 6px;
      height: 16px;
      font-size: 12px;
      font-weight: 400;
      text-align: center;
      color: #a0a7b3;
    }

    .su-progress {
      width: 60px;

      ::v-deep .el-progress-bar__outer {
        height: 2px !important;
      }
    }
  }

  .uploaded-view {
    border: 1px dashed #d7dbec !important;
    flex-direction: column;

    &:hover {
      border-color: #4fa7ff !important;

      .uploading-title, i {
        color: #4fa7ff;
      }
    }

    i {
      color: #dde2ee;
      font-size: 20px;
    }

    .title {
      margin-top: 7px;
      font-size: 12px;
      font-weight: 400;
      text-align: center;
      color: #5a607f;
    }
  }
}

.image-item-view {
  margin-right: 5px;

  width: 72px;
  height: 72px;
  background: #ffffff;
  border: 1px solid #D7DBEC;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  .float-operation-view {
    position: absolute;
    left: 2px;
    height: 24px;
    bottom: 2px;
    transition: all 0.3s ease-in-out;
    display: none;
    width: calc(100% - 4px);
    background-color: rgba(10, 21, 41, 0.5);

    .content-view {
      height: 100%;
      display: flex;
      flex-direction: row;
    }

    .item-view {
      margin: 3px 0;
      flex: 1;
      color: white;
      font-size: 13px;
      display: flex;
      align-items: center;
      justify-content: center;

      i {
        padding: 3px;
        cursor: pointer;
      }
    }

    .delete, .download {
      border-left: 1px solid #f5f6fa;
    }
  }

  &:hover .float-operation-view {
    display: block;
  }
}

.image-item-view img {
  width: 68px;
  height: 68px;
}

</style>
