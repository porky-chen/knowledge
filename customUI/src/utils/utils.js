// import API from '../../api'
// import ajax from './http-promise'
import {
  MessageBox,
} from 'element-ui'

import i18n from './I18n'
import SuViewerModal from '@/components/su-viewer-modal'
import SuImageViewer from '@/components/su-images/popup'


/**
 * 获取 url 参数
 * @param {String} name
 */
function getQueryString(name) {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  const result = location.search.substr(1).match(reg)
  if (!result) {
    return ''
  }

  return result[2]
}

/**
 * 获取 菜单功能 id
 * @param {String} functionAction 菜单功能标志 必填
 * @param {String} menuCacheName  缓存菜单字段名称
 * @param {String} functionAction 菜单功能标志字段名称
 * @param {String} functionAction 菜单功能id字段名称
 */
function getMenuFunctionId(functionAction, menuCacheName = 'currentMenu', functionActionName = 'functionAction', functionIdName = 'applicationMenuFunctionId') {
  let menuDta = sessionStorage.getItem(menuCacheName),
    functionid = ''
  try {
    let fun = JSON.parse(menuDta).authFunctionList.filter(item => {
      return item[functionActionName] === functionAction
    })[0]
    if (fun) {
      functionid = fun[functionIdName]
    }
  } catch (error) {
    console.log(error)
  }
  return functionid
}

/**
 * 获取旧 token，并去掉 url 的 token 参数
 */
// function getToken () {
//   return new Promise(() => {
//     const token = getQueryString('token')
//     if (token) {
//       sessionStorage.clear()
//       sessionStorage.setItem('token', token)
//       location.href = location.origin + '/#' + location.pathname
//     }
//   })
// }

/**
 * 获取旧 token，并去掉 url 的 token 参数
 */
// function getOldToken () {
//   const token = getQueryString('token')
//   if (token) {
//     sessionStorage.clear()
//     sessionStorage.setItem('oldToken', token)
//     location.href = location.origin + '/#' + location.pathname
//   }
// }

/**
 * 获取新 token 并保存
 */
// function getNewToken () {
//   return ajax({
//     url: API.getToken,
//     param: {
//       appCode: API.appCode
//     }
//   }).then(res => {
//     sessionStorage.setItem('token', res.message.token)
//   })
// }

/**
 * 获取用户信息并保存
 */
// async function getUserInfo () {
//   // let accountNames = ''
//   await ajax({
//     url: API.getUserInfo,
//     type: 'get'
//   }).then(res => {
//     sessionStorage.setItem('user', JSON.stringify(res.data))
//     // accountNames = res.message.accountName
//   })

// return ajax({
//   url: API.getUserAndUnit,
//   param: {
//     accountNames
//   }
// }).then(res => {
//   for (let k in res.message[0]) {
//     sessionStorage.setItem(k, res.message[0][k])
//   }
// })
// }

/**
 * 获取项目节点并保存
 */
// function getNodes () {
//   return new Promise((resolve,reject) => {
//     ajax({
//       url: API.nodes,
//       type: 'get'
//     })
//       .then(res => {
//         sessionStorage.setItem('nodes', JSON.stringify(res.data))
//         resolve()
//       })
//       .catch((e) => {
//         reject(e)
//       })
//   })

// }

/**
 * 获取单位类型并保存
 */
// function getUnitTypes () {
//   return ajax({
//     url: API.getUnitTypes
//   }).then(res => {
//     sessionStorage.setItem('unitTypes', JSON.stringify(res.message))
//   })
// }

/**
 * 获取导航菜单并保存
 */
// function getMenuItems () {
//   return ajax({
//     url: API.getMenu,
//     type: 'get'
//   }).then(res => {
//     sessionStorage.setItem('menuItems', JSON.stringify(res.data))
//   })
// }


/**
 * 嵌套
 * @param {Array} data
 * @param {String} parentKey 父节点键
 * @param {String} RKey 递归键
 * @param {String} parentId 父ID
 * @returns {Array} 嵌套后的数据
 */
function nesting(data = [], parentKey, RKey, parentId = null) {
  if (!parentKey || !RKey) {
    console.error('parentKey or RKey is required.')
    return
  }

  const ret = []
  for (let v of data) {
    if (v[parentKey] === parentId) {
      v.children = nesting(data, parentKey, RKey, v[RKey])
      ret.push(v)
    }
  }

  return ret
}

/**
 * 反嵌套
 * @param {object} node 项目节点（单个）
 * @returns {object} 反嵌套后的数据
 */
function unnesting(node = {}) {
  const ret = {}
  ret[node.nodeNumber] = node
  if (node.children) {
    for (let child of node.children) {
      Object.assign(ret, unnesting(child))
    }
  }

  return ret
}

/**
 * 屏幕兼容，设置rem大小
 */
function compatible() {
  const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  const recalc = function() {
    const docEl = document.documentElement
    const clientWidth = docEl.clientWidth
    if (!clientWidth) {
      return
    }

    docEl.style.fontSize = (clientWidth / 100) + 'px'
  }
  window.addEventListener(resizeEvt, recalc)
  document.addEventListener('DOMContentLoaded', recalc)
}

/**
 * 判断图片
 * @param url
 * @returns {Boolean}
 */
function isImage(url) {
  if (!url) {
    return false
  }

  return /.(png|jpg|jpeg|bmp|gif)$/i.test(url)
}

/**
 * 判断视频
 * @param url
 * @returns {Boolean}
 */
function isVideo(url) {
  if (!url) {
    return false
  }

  return /.mp4$/i.test(url)
}

/**
 * 判断PDF
 * @param url
 * @returns {Boolean}
 */
function isPDF(url) {
  if (!url) {
    return false
  }

  return /.pdf$/i.test(url)
}


// /**
//  * 默认消息框 接入中英文切换
//  * @param {String} [val] 类型
//  */
// function messageconfirm(type) {
//   if (type === 'del') {
//     return MessageBox.confirm(i18n.tc('messageconfirm.deletetip'), i18n.tc('messageconfirm.titledel'), {
//       confirmButtonText: i18n.tc('messageconfirm.delete'),
//       cancelButtonText: i18n.tc('messageconfirm.cancel'),
//       showClose: true,
//       type: 'warning',
//     })
//   }
//   if (type === 'relogin') {
//     return MessageBox.confirm(i18n.tc('messageconfirm.relogintip'), i18n.tc('messageconfirm.title'), {
//       confirmButtonText: i18n.tc('messageconfirm.confirm'),
//       cancelButtonText: i18n.tc('messageconfirm.cancel'),
//       showClose: true,
//       type: 'info',
//     })
//   } else {
//     return MessageBox.confirm(i18n.tc('messageconfirm.deletetip'), i18n.tc('messageconfirm.titledel'), {
//       confirmButtonText: i18n.tc('messageconfirm.delete'),
//       cancelButtonText: i18n.tc('messageconfirm.cancel'),
//       showClose: true,
//       type: 'warning',
//     })
//   }
// }

/**
 * 弹框提示
 * @param {String} [val] 内容
 * @param {String} [title = '提示'] 标题
 * @param {String} [opts = {}] 选项
 */
function alert(val, title = '提示', opts = {}) {
  MessageBox.alert(val, title, {
    showClose: true,
    confirmButtonText: '确定',
    confirmButtonClass: 'su-confirm-button',
    callback: () => {
    },
    ...opts,
  })
}


/**
 * 计算文本的宽度 - 结合字体信息：大小，重量，字体
 * @param text 文本
 * @param fontSize 大小
 * @param fontWeight 重量
 * @param fontFamily 字体
 * @param el 读取字体信息的节点
 * @returns {number}
 */
function getTextWidth({text, fontSize, fontWeight, fontFamily, el}) {
  if (!text) {
    return 0
  }

  fontSize = fontSize || getCssStyle(el || document.body, 'font-size') || '16px'
  fontWeight = fontWeight || getCssStyle(el || document.body, 'font-weight') || 'normal'
  fontFamily = fontFamily || getCssStyle(el || document.body, 'font-family') || 'Times New Roman'

  let fontInfo = `${fontWeight} ${fontSize} ${fontFamily}`

  const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement('canvas'))
  const context = canvas.getContext('2d')
  context.font = fontInfo
  const metrics = context.measureText(text)
  return metrics.width
}


function getCssStyle(element, prop) {
  return window.getComputedStyle(element, null).getPropertyValue(prop)
}

/**
 * 文件预览
 * @param fileUrl
 * @param fileName
 */
function previewFile({fileUrl, fileName}) {
  // 如果是pdf预览
  if (isPDF(fileUrl)) {
    SuViewerModal([fileUrl])
  }
  // 如果是图片预览
  else if (isImage(fileUrl)) {
    SuImageViewer([{
      name: fileName,
      thumb: fileUrl,
      larger: fileUrl,
    }], 0)
  }
}

/**
 * 图片集合的预览
 * @param imageList 图片数据集合(fileUrl, fileName)
 * @param previewIndex 预览图片的序号，默认从那张图片开始
 */
function previewImages({imageList, previewIndex}) {
  // 过滤获取是图片的集合
  let imageDataList = (imageList || []).filter(item => {
    return isImage(item.larger || item.thumb)
  })
  imageDataList = imageDataList.map(item => {
    return {
      name: item.name,
      thumb: item.thumb,
      larger: item.larger,
    }
  })
  console.log(imageDataList, 'imageDataList')
  SuImageViewer(imageDataList, previewIndex || 0)
}

export default {
  getQueryString,
  // getToken,
  // getOldToken,
  // getNewToken,
  // getUserInfo,
  // getNodes,
  // getUnitTypes,
  // getMenuItems,
  previewFile,
  previewImages,
  nesting,
  unnesting,
  compatible,
  getTextWidth,
  isImage,
  isVideo,
  isPDF,
  alert,
  // messageconfirm,
  getMenuFunctionId,
}
