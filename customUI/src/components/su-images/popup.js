/*
  - Copyright © 2020 Guangdong Sun Railway Information Technology, Inc.
  - All rights reserved.
  -
  - @author: wu jiajin <wujiajin@sunengineering.cn>
  - @description 预览组件
  -
  - Changelog:
  - Revision 1.0 2020-06-01 wu jiajin
  - - 初始化
  */
import Vue from 'vue'
import SuPreviewDialogVue from './su-preview-dialog'

function SuPreviewDialog (data, index = 0, fullUrl = 'larger', thumbUrl = 'thumb', fileName = 'fileName') {
  const div = document.createElement('div')
  div.className = 'su-preview-dialog-wrapper'
  document.querySelector('body').appendChild(div)
  const SuViewerModalConstructor = Vue.extend(SuPreviewDialogVue)
  const instance = new SuViewerModalConstructor()
  instance.$mount('.su-preview-dialog-wrapper')
  instance.$data.data = data
  instance.$data.index = index
  instance.$data.fullUrl = fullUrl
  instance.$data.thumbUrl = thumbUrl
  instance.$data.fileName = fileName
  instance.$data.show = true
}

export default SuPreviewDialog
