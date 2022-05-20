/*
 * Copyright © 2020 Guangdong Sun Railway Information Technology, Inc.
 * All rights reserved.
 *
 * @author: Xu Ming <xuming@sunengineering.cn>
 * @description 加载动画
 *
 * Changelog:
 * Revision 1.0 2020-06-03 Xu Ming
 * -- 初始化
 */
/**
 * 默认消息框 接入中英文切换
 * @param {String} [val] 类型
 */

import {
  MessageBox
} from 'element-ui'

import i18n from '../utils/I18n'

function messageconfirm (type='',tips = '',title = '',confirmButtonText = '',cancelButtonText = '') {
  switch(type){
  case 'del': {
    return MessageBox.confirm(tips || i18n.tc('messageconfirm.deletetip'), title || i18n.tc('messageconfirm.titledel'), {
      confirmButtonText: confirmButtonText || i18n.tc('messageconfirm.delete'),
      cancelButtonText: cancelButtonText || i18n.tc('messageconfirm.cancel'),
      showClose: true,
      type: 'warning',
      customClass: 'del-message-box',
      confirmButtonClass: 'confirm-btn-del'
    })
  }
  case 'relogin': {
    return MessageBox.confirm(tips || i18n.tc('messageconfirm.relogintip'), title || i18n.tc('messageconfirm.title'), {
      confirmButtonText: confirmButtonText || i18n.tc('messageconfirm.confirm'),
      cancelButtonText: cancelButtonText || i18n.tc('messageconfirm.cancel'),
      showClose: true,
      type: 'warning'
    })
  }
  default:{
    return MessageBox.confirm(tips, title, {
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText,
      showClose: true,
      type: 'warning'
    })
  }
  }

}

export default messageconfirm
