/*
  - Copyright © 2020 Guangdong Sun Railway Information Technology, Inc.
  - All rights reserved.
  -
  - @author: wu jiajin <wujiajin@sunengineering.cn>
  - @description 弹窗组件
  -
  - Changelog:
  - Revision 1.0 2020-06-01 wu jiajin
  - - 初始化
  */
import Vue from 'vue'
import SuViewerModalVue from './su-viewer-modal'

function SuViewerModal (data) {
  const div = document.createElement('div')
  div.className = 'su-viewer-modal-wrapper'
  document.querySelector('body').appendChild(div)
  const SuViewerModalConstructor = Vue.extend(SuViewerModalVue)
  const instance = new SuViewerModalConstructor()
  instance.$mount('.su-viewer-modal-wrapper')
  instance.$data.data = data
  instance.$data.show = true
}

export default SuViewerModal
