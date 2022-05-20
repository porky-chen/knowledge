import { MessageBox } from 'element-ui'

/**
 * 弹框提示
 * @param {String} [val] 内容
 * @param {String} [title = '提示'] 标题
 * @param {String} [opts = {}] 选项
 */
function alert (val, title = '提示', opts = {}) {
  MessageBox.alert(val, title, {
    showClose: true,
    confirmButtonText: '确定',
    callback: () => {},
    ...opts
  })
}

export default {
  alert
}
