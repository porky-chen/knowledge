<!--
 - Copyright (c) 2020 Guangdong Sun Railway Information Technology, Inc.
 - All rights reserved.
 - @author dengjie
 - @description 工作流审批进度
 - Changelog: 
 - Revision 1.0 2022-05-18 初始化
 -->
<template>
  <su-dialog
    :dialog-visible="visible"
    :dialog-width="width"
    @dialogClose="dialogClose"
    :showDialogBtns="false"
  >
    <div slot="header">{{ title }}</div>
    <div slot="content">
      <div class="su-approve-progress">
        <el-steps direction="vertical" :active="0">
          <el-step v-for="(item, index) in data" :key="index">
            <div slot="icon">
              <img class="step-default-icon" :src="setPhoto(item)" alt="" />
              <i :class="statusIcon(item)"></i>
            </div>
            <div slot="title">
              <div class="title-top">
                <div class="text-1">{{ item[setKey(props.name, 'name')] }}</div>
                <div class="text-2">{{ item[setKey(props.unit, 'unit')] }}</div>
                <div class="text-3">
                  {{ setEndTime(item) }}
                </div>
              </div>
              <div class="title-bottom">
                <div :style="statusColor(item)">{{ setStatusText(item) }}</div>
                <div class="text-2">
                  耗时：{{ showEmpty(item[setKey(props.durationFormat, 'durationFormat')]) }}
                </div>
              </div>
            </div>
            <div
              slot="description"
              class="step-description"
              v-show="!isEmpty(item[setKey(props.description, 'description')])"
            >
              {{ item[setKey(props.description, 'description')] }}
            </div>
          </el-step>
        </el-steps>
        <div class="empty-text" v-show="data.length === 0">
          {{ emptyText }}
        </div>
      </div>
    </div>
  </su-dialog>
</template>

<script>
import SuDialog from '../su-dialog'
import ic_male from '@/assets/su-approve-progress/ic_male.png'
import ic_female from '@/assets/su-approve-progress/ic_female.png'
export default {
  name: 'su-approve-progress',
  components: {SuDialog},
  data() {
    return {
      visible: false,
    }
  },
  props: {
    width: {
      type: String,
      default: '680px',
    },
    title: {
      type: String,
      default: '审批进度',
    },
    props: {
      type: Object,
      default: () => {
        return {}
      },
    },
    emptyText: {
      type: String,
      default: '暂无数据',
    },
    data: {
      type: Array,
      default: () => {
        return [] //female male
      },
    },
  },
  methods: {
    //配置头像
    setPhoto(item) {
      let photoUrl = item[this.setKey(this.props.photoUrl, 'photoUrl')]
      let sex = item[this.setKey(this.props.sex, 'sex')]
      if (photoUrl) {
        return photoUrl
      } else if (sex === 'female') {
        return ic_female
      } else {
        return ic_male
      }
    },
    // 设置处理时间
    setEndTime(item) {
      let status = item[this.setKey(this.props.status, 'status')]
      let str = item[this.setKey(this.props.endTime, 'endTime')]
      if (status === 'process') {
        return '待处理'
      }
      return this.showEmpty(str)
    },
    // 处理空显示‘--’
    showEmpty(str) {
      if (str !== undefined && str !== null && str !== '') {
        return str
      } else {
        return '--'
      }
    },
    // 判断是否为空
    isEmpty(str) {
      if (str !== undefined && str !== null && str !== '') {
        return false
      } else {
        return true
      }
    },
    // 配置字段名称
    setKey(keyName, defaultKey) {
      if (keyName !== '' && keyName !== null && keyName !== undefined) {
        return keyName
      }
      return defaultKey
    },
    // 设置状态名称
    setStatusText(item) {
      const status = item.status
      if (status === 'start') {
        return '发起审批'
      } else if (status === 'error') {
        return '已驳回'
      } else if (status === 'process') {
        return '审核中'
      } else if (status === 'success') {
        return '已通过'
      } else if (status === 'return') {
        return '已撤回'
      } else {
        return '待审核'
      }
    },
    // 设置状态文字颜色
    statusColor(item) {
      const status = item.status
      let color = '#959BA6'
      if (status === 'start' || status === 'success') {
        color = '#3DD15B'
      } else if (status === 'error') {
        color = '#F4513B'
      } else if (status === 'process') {
        color = '#F3891D'
      } else if (status === 'return') {
        color = '#4B88EA'
      }
      return {
        color: color,
      }
    },
    // 设置状态图标class
    statusIcon(item) {
      const status = item.status
      return {
        'step-small-icon': true,
        'icon-success': status === 'success' || status === 'start',
        'icon-error': status === 'error',
        'icon-process': status === 'process',
        'icon-return': status === 'return',
      }
    },
    // 关闭窗口
    dialogClose() {
      this.visible = false
    },
  },
}
</script>

<style lang="scss" scoped>
.su-approve-progress {
  min-height: 300px;
  max-height: 700px;
  margin-right: -22px;
  padding-right: 22px;
  overflow-x: hidden;
  overflow-y: auto;
  ::v-deep .el-step {
    .el-step__title {
      font-size: 14px;
      font-weight: 400;
      color: #3d434e;
      .title-top {
        display: flex;
        .text-1 {
          flex-shrink: 0;
        }
        .text-2 {
          flex: 1;
          padding: 5px 8px 0;
          line-height: 18px;
          font-size: 12px;
          color: #959ba6;
        }
        .text-3 {
          flex-shrink: 0;
          font-size: 12px;
        }
      }
      .title-bottom {
        display: flex;
        justify-content: space-between;
        .text-1 {
          color: #3dd15b;
        }
        .text-2 {
          font-size: 12px;
          color: #828a99;
        }
      }
    }

    .el-step__description {
      padding-right: 0;
      margin-bottom: 14px;
      .step-description {
        font-size: 12px;
        padding: 8px 12px;
        background: #f6f7f9;
        border-radius: 8px;
        color: #828a99;
      }
    }
    .el-step__head {
      width: 32px;
      .el-step__icon {
        width: 32px;
        height: 32px;
        border: none;
        .step-default-icon {
          display: block;
          width: 100%;
          height: 100%;
        }
        .step-small-icon {
          position: absolute;
          right: 0;
          bottom: 0;
          z-index: 22;
          width: 16px;
          height: 16px;
          background-image: url(~@/assets/su-approve-progress/wait.png);
          background-repeat: no-repeat;
          background-size: 100% 100%;
          &.icon-success {
            background-image: url(~@/assets/su-approve-progress/success.png);
          }
          &.icon-error {
            background-image: url(~@/assets/su-approve-progress/error.png);
          }
          &.icon-process {
            background-image: url(~@/assets/su-approve-progress/process.png);
          }
          &.icon-return {
            background-image: url(~@/assets/su-approve-progress/return.png);
          }
        }
      }
    }

    .el-step__line {
      left: 15px;
      background-color: #dde2ee;
    }
  }

  .empty-text {
    margin-top: 120px;
    text-align: center;
    font-size: 14px;
    color: #3d434e;
  }
}
</style>
