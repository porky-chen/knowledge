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

import {Loading} from 'element-ui'

export default {
  getLoading (options = {}) {
    let {
      text = '加载',
      showText = false,
      fullscreen = true,
      background = 'rgba(0, 0, 0, 0.3)',
    } = options

    if (!showText) {
      text = ''
    } 

    return Loading.service({
      text,
      fullscreen,
      background,
      lock: true
    })
  },
}
