<!--
  - Copyright © 2020 Guangdong Sun Railway Information Technology, Inc.
  - All rights reserved.
  -
  - @author: Liao chenxi <liaochenxi@sunengineering.cn>
  - @description 多选组件
  -
  - Changelog:
  - Revision 1.0 2020-06-03 Liao chenxi
  - Revision 1.0.0 2020-11-04 规范3.0下组件库调整
  - - 初始化
  -->
<template>
  <div class='su-dialog'>
    <el-dialog v-bind='$attrs'
               v-on='$listeners'
               ref='dialogRef'
               :visible.sync='dialogVisible'
               :title='$attrs.title || dialogTitle'
               :width='$attrs.width || dialogWidth'
               :modal-append-to-body='modalAppendToBody'
               :append-to-body='$attrs["append-to-body"] === null || $attrs["append-to-body"] === undefined ? appendtobody : $attrs["append-to-body"]'
               :close-on-click-modal='closeOnClickModal'
               :close-on-press-escape='closeOnPressEscape'
               :custom-class='customClass'
               :top='$attrs.top || dialogTop'
               :before-close='handleClose'
    >
      <div slot='title' class='el-dialog__title'>
        <slot name='header' />
      </div>

      <slot name='content' />

      <div slot='footer' class='dialog-footer'>
        <slot name='btns' />
        <su-button v-if='showDialogBtns'
                   type='primary'
                   :plain='true'
                   @click='handleClose'>
          {{ cancelTitle || dialogCancelTitle }}
        </su-button>

        <su-button :loading='btnLoading'
                   :disabled='btnDisabled'
                   class='loading'
                   :plain='true'
                   v-if='showDialogBtns'
                   type='primary'
                   @click='handleSuccess'
        >
          {{ confirmTitle || dialogConfirmTitle }}
        </su-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {Dialog} from 'element-ui'

export default {
  name: 'su-dialog',
  components: {
    'el-dialog': Dialog,
  },
  props: {
    dialogTitle: {
      type: String,
      default: '提示',
    },
    dialogVisible: {
      type: Boolean,
    },
    showDialogBtns: {
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
    // false - true
    appendtobody: {
      type: Boolean,
      default: true,
    },

    modalAppendToBody: {
      type: Boolean,
      default: true,
    },
    closeOnClickModal: {
      type: Boolean,
      default: false,
    },
    closeOnPressEscape: {
      type: Boolean,
      default: false,
    },
    btnLoading: {
      type: Boolean,
      default() {
        return false
      },
    },
    dialogWidth: {
      type: String,
      default: '480px',
    },
    // 自定义class 如果需要固定dialog 需要填fixDialog
    customClass: {
      type: String,
      default: 'su-dialog',
    },
    // dialog margin-top值 需要加!important
    dialogTop: {
      type: String,
      default: null,
    },
    cancelTitle: {
      type: String,
      default: null,
    },
    confirmTitle: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      dialogCancelTitle: this.$t('dialog.cancel'),
      dialogConfirmTitle: this.$t('dialog.confirm'),
    }
  },
  methods: {
    handleClose() {
      this.$emit('dialogClose')
    },
    handleSuccess() {
      this.$emit('dialogSuccess')
    },
  },
  mounted() {
  },
}
</script>
