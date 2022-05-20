/**
 * Copyright (c) 2021 Guangdong Sun Railway Information Technology, Inc.
 * All rights reserved.
 *
 * @author wenteng
 *
 * Description:
 * Changelog:
 *
 * Revision:
 */

const suEzuikitData = {
  state: {
    // 萤石账户的appKey
    appKey: null,

    // 萤石账户的appSecret
    appSecret: null,

    // 访问授权码
    accessToken: null,

    // 摄像头数据列表
    cameraList: [],

    /// 是否已经初始化了
    hasInitial: false,
    initialCallBackList: [],
  },
  network: {
    request: ({url, method, params, success, error}) => {
      let _url = url
      let http_request = new XMLHttpRequest()

      http_request.onreadystatechange = function() {
        // 成功处理函数
        if (http_request.readyState === 4 && http_request.status === 200) {
          let _data = JSON.parse(http_request.responseText)
          if (success && typeof success === 'function') {
            success(_data)
          }
        }
        // 错误处理函数
        else {
          if (error && typeof error === 'function') {
            error()
          }
        }
      }

      http_request.open(method, _url, true)
      let data = new FormData()
      for (let i in (params || {})) {
        data.append(i, params[i])
      }
      http_request.send(data)
    },
  },
  actions: {
    async initialEzuikitData({onSuccess, onError, loadCameraData}) {
      if (suEzuikitData.state.hasInitial) {
        return
      }

      // 初始化完成的回调
      let onSucesssOfInitialed = () => {
        suEzuikitData.state.hasInitial = true

        for (let functionItem of suEzuikitData.state.initialCallBackList) {
          if (functionItem && typeof functionItem === 'function') {
            functionItem()
          }
        }
        suEzuikitData.state.initialCallBackList = []

        if (onSuccess && typeof onSuccess === 'function') {
          onSuccess(suEzuikitData.state.cameraList)
        }
      }

      // 第二步（可选）：获取摄像头
      let getAccessTokenSuccess = () => {
        suEzuikitData.actions.getCameraList({
          onSuccess: onSucesssOfInitialed,
          onError,
        })
      }

      // 第一步：获取accessToken，如果初始化时候传入了accessToken，则不再调用获取accessToken
      if (!suEzuikitData.state.accessToken) {
        suEzuikitData.actions.getAccessToken({
          onSuccess: loadCameraData ? getAccessTokenSuccess : onSucesssOfInitialed,
          onError: onError,
        })
      } else {
        loadCameraData ? getAccessTokenSuccess() : onSucesssOfInitialed()
      }
    },

    // 获取访问授权码 - then（获取摄像头列表）
    getAccessToken({onSuccess, onError}) {
      suEzuikitData.network.request({
        url: 'https://open.ys7.com/api/lapp/token/get',
        method: 'POST',
        params: {
          appKey: suEzuikitData.state.appKey,
          appSecret: suEzuikitData.state.appSecret,
        },
        success: resultJson => {
          console.log(resultJson, '成功获取accessToken')
          suEzuikitData.state.accessToken = resultJson.data.accessToken

          if (onSuccess && typeof onSuccess === 'function') {
            onSuccess()
          }
        },
        error: onError,
      })
    },

    // 获取摄像头列表
    getCameraList({onSuccess, onError}) {
      suEzuikitData.network.request({
        url: 'https://open.ys7.com/api/lapp/camera/list',
        method: 'POST',
        params: {
          accessToken: suEzuikitData.state.accessToken,
          pageSize: 50,
        },
        success: resultJson => {
          console.log(resultJson, '获取摄像头列表')
          suEzuikitData.state.cameraList = (resultJson.data || []).map(item => {
            return {
              ...item,
              title: null, // '这是测试的标题',
            }
          })

          if (onSuccess && typeof onSuccess === 'function') {
            onSuccess()
          }
        },
        error: onError,
      })
    },
  },
  methods: {
    getLiveHDUrl(camera, clarity) {
      if (!camera || !camera.deviceSerial) {
        return null
      }
      // ezopen://open.ys7.com/G76155499/1.rec?begin=20211114120000&end=20211115120000
      // ezopen://open.ys7.com/G76155499/1.hd.live
      return `ezopen://open.ys7.com/${camera.deviceSerial}/1${clarity === 'hd' ? '.hd' : ''}.live`
    },
    getReplayRecUrl(camera, startTime, endTime, clarity) {
      if (!camera || !camera.deviceSerial) {
        return null
      }
      return `ezopen://open.ys7.com/${camera.deviceSerial}/1.rec?begin=${startTime}&end=${endTime}`
    },
  },
}

export default suEzuikitData
