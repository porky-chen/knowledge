import axios from 'axios'
// import API from '@/api'
import Utils from '../utils/utils'

/**
 * 发送HTTP请求
 *
 * @param {any} [opts={}] 选项
 * @returns {promise}
 */

const httpPromise = {
  // 1、restful 方式 api
  restful: function (opts = {}) {
    const {
      dataType = 'json',
      params = {},
      timeout = 30000,
      type = 'post',
      url,
      data = {},
      contentType,
      //   isDownLoad = false,
      ...other
    } = opts
    // post或put请求就把数据封装成formData
    const formData = new FormData()
    if (type === 'post' || type === 'put' || type === 'delete') {
      // 参数封装成 FormData
      for (let k in data) {
        formData.append(k, data[k])
      }
    }

    return new Promise((resolve, reject) => {
      // axios.defaults.headers.common['token'] = sessionStorage.token
      axios.defaults.headers.common['Pragma'] = 'no-cache'
      axios.defaults.headers.post['Content-Type'] = contentType
      if (contentType) {
        axios.defaults.headers.post['Content-Type'] = contentType
      }
      axios({
        url,
        method: type,
        data: contentType ? data : formData,
        params,
        timeout,
        responseType: dataType,
        ...other
      }).then(res => {
        const {data} = res
        if (data.code === 0) {
          resolve(data)
        } else if (data.code === -1) {
          reject(new Error())
          Utils.alert('登录超时，请重新登录', '提示', {
            callback: action => {
            //   location.href = API.LOGIN
              console.log(action)
            }
          })
        } else {
          reject(new Error())
          Utils.alert(data.message, '错误', {
            type: 'error'
          })
        }
      }).catch(e => {
        reject(e)
        if (e.response && e.response.data.message && e.response.data.message.match(/[\u4e00-\u9fa5]+/g)) {
          Utils.alert(e.response.data.message)
        } else {
          Utils.alert('请求错误，请稍后重试')
        }
      })
    })
  }
}

export default httpPromise.restful
