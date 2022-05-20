<!--
 - Copyright (c) 2020 Guangdong Sun Railway Information Technology, Inc.
 - All rights reserved.
 - @author dengjie
 - @description 工作流审批状态
 - Changelog: 
 - Revision 1.0 2022-05-18 初始化
 -->
<template>
  <div class="su-approve-status">
    <div :class="statusClass()">
      <div class="status-icon"></div>
      <div class="status-info">
        <div class="text-1" v-show="showItem()">{{ showEmpty(data.name) }}</div>
        <div class="text-2" v-show="showItem()">审批耗时：{{ showEmpty(data.durationFormat) }}</div>
        <div class="as-btn" @click="handleClick">
          查看流程详情
          <i class="btn-icon"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'su-approve-status',
  data() {
    return {}
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {
          status: 'error',
        }
      },
    },
  },
  methods: {
    // 处理空显示‘--’
    showEmpty(str) {
      if (str !== undefined && str !== null && str !== '') {
        return str
      } else {
        return '--'
      }
    },
    //设置名称与耗时是否显示
    showItem() {
      const status = this.data.status
      if (status === 'process' || status === 'error') {
        return true
      }
      return false
    },
    // 设置状态class
    statusClass() {
      const status = this.data.status
      return {
        'su-approve-status-content': true,
        'icon-success': status === 'success',
        'icon-error': status === 'error',
        'icon-process': status === 'process',
      }
    },
    handleClick() {
      this.$emit('btn-click')
    },
  },
}
</script>

<style lang="scss" scoped>
.su-approve-status {
  width: 245px;
  height: 89px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.16);

  .su-approve-status-content {
    height: 100%;
    display: flex;
    align-items: center;

    .status-icon {
      width: 62px;
      height: 62px;
      margin: 0 16px;
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
    .status-info {
      width: 151px;
      padding-right: 10px;
      display: flex;
      flex-direction: column;

      .text-1 {
        width: 100%;
        font-size: 16px;
        font-weight: 700;
        color: #3d434e;

        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .text-2 {
        font-size: 12px;
        line-height: 20px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .as-btn {
        position: relative;
        width: 118px;
        height: 23px;
        margin-top: 3px;
        padding-right: 23px;
        line-height: 23px;
        text-align: center;
        background: #f1f1f1;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 400;
        color: #3d434e;
        cursor: pointer;

        .btn-icon {
          position: absolute;
          right: 0;
          top: 0;
          width: 23px;
          height: 23px;
          background: url(~@/assets/su-approve-status/btn.png) no-repeat;
          background-size: 100% 100%;
        }

        &:hover .btn-icon {
          background-image: url(~@/assets/su-approve-status/btn-active.png);
        }
      }
    }

    &.icon-success .status-icon {
      background-image: url(~@/assets/su-approve-status/success.png);
    }
    &.icon-error {
      .status-icon {
        background-image: url(~@/assets/su-approve-status/error.png);
      }
      .status-info .text-2 {
        color: #f4513b;
      }
    }
    &.icon-process {
      .status-icon {
        background-image: url(~@/assets/su-approve-status/process.png);
      }
      .status-info .text-2 {
        color: #f3891d;
      }
    }
  }
}
</style>
