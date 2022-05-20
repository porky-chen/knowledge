<!--
  - Copyright © 2020 Guangdong Sun Railway Information Technology, Inc.
  - All rights reserved.
  -
  - @author: Liao chenxi <liaochenxi@sunengineering.cn>
  - @description 多选组件
  -
  - Changelog:
  - Revision 1.0 2020-10-23 Liao chenxi
  - Revision 1.0.0 2020-11-04 规范3.0下组件库调整
  - - 初始化
  -->
<template>
  <div class='su-drawer-view'>
    <el-drawer
      :modal='modal'
      :visible.sync='visible'
      :custom-class='`su-drawer ${customClass}`'
      :size='$attrs["size"] || width'
      :with-header='$attrs["with-header"] || showTitle'
      :modal-append-to-body='modalAppendToBody'
      :append-to-body='$attrs["append-to-body"] || appendtobody'
      :before-close='handleClose'
      :close-on-click-modal='closeOnClickModal'
      :close-on-press-escape='closeOnPressEscape'
      :destroy-on-close='destroyOnClose'
      :show-close='showClose'
      :wrapper-closable='wrapperClosable'
      v-bind='$attrs'
      v-on='$listeners'
    >
      <div slot='title' class='el-drawer__header-text'>
        <slot name='header'>{{ title }}</slot>
      </div>
      <slot name='content'></slot>
      <div slot='footer' class='drawer-footer'>
        <slot name='btns'></slot>
        <el-button v-if='showBtns' @click='handleClose'>{{ cancel }}</el-button>
        <el-button
          :loading='btnLoading'
          :disabled='btnDisabled'
          class='loading'
          v-if='showBtns'
          type='primary'
          @click='handleSuccess'
        >
          {{ confirm }}
        </el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import {
  Drawer,
  Button,
} from 'element-ui'

export default {
  name: 'su-drawer',
  components: {
    'el-drawer': Drawer,
    'el-button': Button,
  },
  props: {
    modal: {
      type: Boolean,
      default() {
        return false
      },
    },

    title: {
      type: String,
    },
    showTitle: {
      type: Boolean,
      default: true,
    },
    customClass: {
      type: String,
      default: null,
    },
    visible: {
      type: Boolean,
    },
    showBtns: {
      type: Boolean,
      default() {
        return true
      },
    },
    btnDisabled: {
      type: Boolean,
      default() {
        return false
      },
    },
    closeOnClickModal: {
      type: Boolean,
      default: false,
    },
    closeOnPressEscape: {
      type: Boolean,
      default: false,
    },
    destroyOnClose: {
      type: Boolean,
      default: true,
    },
    showClose: {
      type: Boolean,
      default: true,
    },
    wrapperClosable: {
      type: Boolean,
      default: true,
    },
    modalAppendToBody: {
      type: Boolean,
      default: true,
    },
    appendtobody: {
      type: Boolean,
      default() {
        return true
      },
    },
    btnLoading: {
      type: Boolean,
      default() {
        return false
      },
    },
    width: {
      type: String,
    },
  },
  watch: {},
  computed: {
    cancel() {
      return this.$t('dialog.cancel')
    },
    confirm() {
      return this.$t('dialog.confirm')
    },
  },
  methods: {
    handleClose() {
      this.$emit('drawerClose')
    },
    handleSuccess() {
      this.$emit('drawerSuccess')
    },
  },
  mounted() {
  },
}
</script>

<style lang='scss' scoped>
::v-deep .el-drawer {
  &__header {
    padding: 0 32px;
    height: 53px;
    line-height: 53px;
    border-bottom: 1px solid #dde2ee;
    font-size: 16px;
    font-family: MicrosoftYaHei-Bold, MicrosoftYaHei-Bold-Regular;
    font-weight: 800;
    color: #3D434E;
    margin-bottom: 0;
  }

  &__body {
    // height: calc(100% - 80px);
    padding: 24px 32px 0;
  }

  //.el-dialog__close {
  //  font-size: 16px;
  //  font-weight: bold;
  //  color: #777f8c;
  //
  //  &:hover {
  //    color: white;
  //    background-color: #F45A6D;
  //    border-radius: 2px;
  //  }
  //}
}
</style>
