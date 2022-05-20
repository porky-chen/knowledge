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
import suEzuikitData from './su-ezuikit-data'

const suEzuikit = {
  /**
   * 海康接入视频的初始化函数
   * 可重复调用，只会初始化一次。内部有hasInitial处理，避免重复初始化调用。
   *
   * @param appKey 其appKey参数（accessToken为空下必填）
   * @param appSecret 其appSecret参数（accessToken为空下必填）
   * @param accessToken 海康的访问授权码（appKey，appSecret为空下必填）
   * @param onSuccess 初始化成功后的回调，参数：loadCameraData为true时加载的摄像头列表数据，否则为空
   * @param onError 初始化失败后的回调
   * @param loadCameraData 是否加载摄像头列表数据
   */
  initial: ({appKey, appSecret, accessToken, onSuccess, onError, loadCameraData = true}) => {
    // 参数的配置
    suEzuikitData.state.appKey = appKey
    suEzuikitData.state.appSecret = appSecret
    suEzuikitData.state.accessToken = accessToken

    // 获取访问授权码
    suEzuikitData.actions.initialEzuikitData({
      onSuccess,
      onError,
      loadCameraData
    })
  },

}

export default suEzuikit
