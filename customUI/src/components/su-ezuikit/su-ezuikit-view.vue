<!--
- Copyright (c) 2021 Guangdong Sun Railway Information Technology, Inc.
- All rights reserved.
-
- @author wenteng
-
- Description:
-
- Changelog:
-
- Revision:
-->

<template>
  <div class='su-ezuikit-view'
       :id='`${nodeId}ParentNode`'
       :class="{
         'live-video' : ezuikitVideoType === 1,
         'reply-video' : ezuikitVideoType === 2
       }"
  >
    <div class='player-view' :id='nodeId' />

    <div class='preview-image-view' v-if='showPreviewImage && selectedCamera && selectedCamera.deviceSerial'>
      <img :src='selectedCamera.picUrl' />
    </div>

    <div class='su-ezuikit-float-view' style='display: none'>
      <slot name='customControls' />
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

window.$ = $

import Vue from 'vue'
import SuPlayProgressBar from './su-play-progress-bar'
import EZUIKit from './ezuikit-source/ezuikit'
import suEzuikitData from './su-ezuikit-data'
import {v4 as uuidv4} from 'uuid'
import dayjs from 'dayjs'

let duration = require('dayjs/plugin/duration')
dayjs.extend(duration)

export default {
  name: 'su-ezuikit-view',
  mixins: [suEzuikitData],
  data() {
    return {
      ezuikitState: suEzuikitData.state,

      // picUrl 预览图片
      // deviceSerial 序列号
      selectedCamera: {},
      selectedClarity: null,

      nodeId: uuidv4(),
      player: null,

      // 海康视频组件播放视频的类型信息
      // 1 - 监控视频，2 - 回放视频
      ezuikitVideoType: null,

      // 是否显示预览图片
      showPreviewImage: false,

      // 底部自定义的内容控件
      bottomCustomRef: null,

      // 回放播放的进度条数据对象
      getOSDTimer: null,
      playProgressBarData: {},
    }
  },
  beforeDestroy() {
    if (this.getPlayer()) this.getPlayer().stop()
    this.clearGetOSDTimer()
  },
  props: {
    // 自定义播放器选项。除了id，accessToken，url之外，其他的可自定义。
    ezuikitOption: {
      type: Object,
      default: () => {
        return {}
      },
    },

    customControlsCallBack: {
      type: Function,
      default: null,
    },
  },
  created() {
    if (this.ezuikitState.hasInitial) {
      this.$emit('onLoadCamera', this.ezuikitState.cameraList)
    } else {
      this.ezuikitState.initialCallBackList.push(() => {
        this.$emit('onLoadCamera', this.ezuikitState.cameraList)
      })
    }
  },
  methods: {
    /**
     * 使用摄像头初始化
     * @param camera
     */
    initialCamera({camera, clarity}) {
      if (!camera || !camera.deviceSerial) {
        console.log('无效摄像头数据，无法加载实时画面')
        return
      }

      if (this.selectedCamera && this.selectedCamera.deviceSerial === camera.deviceSerial) {
        console.log('重复摄像头对象，无法重复初始化')
        return
      }

      this.selectedCamera = camera
      this.selectedClarity = clarity
      console.log(this.selectedCamera, this.selectedClarity, 'selectedCamera')
      this.showPreviewImage = true
    },

    /**
     * 摄像头的实时监控视频播放
     * @param camera 摄像头初始化参数，为空下需自行先调用initialCamera
     */
    loadCameraLive({camera, clarity}) {
      this.initialCamera({camera, clarity})

      if (!this.selectedCamera || !this.selectedCamera.deviceSerial) {
        console.log('请先选择摄像头设备')
        return
      }
      this.showPreviewImage = false
      this.ezuikitVideoType = 1
      let liveHDUrl = this.getLiveHDUrl(this.selectedCamera, this.selectedClarity)
      this.togglePlayerSource(liveHDUrl, {
        title: this.selectedCamera.title,
      })
    },

    /**
     * 摄像头特定时间范围的视频回放
     * @param camera 摄像头初始化参数，为空下需自行先调用initialCamera
     * @param startDateTime 回放的开始时间，格式：yyyyMMddhhmmss
     * @param endDateTime 回放的结束时间，格式：yyyyMMddhhmmss
     */
    loadCameraReplyInDateTimeRange({camera, clarity, startDateTime, endDateTime}) {
      this.initialCamera({camera, clarity})

      if (!startDateTime || !endDateTime) {
        console.log('请指定播放时间范围')
        return
      }
      if (!this.selectedCamera || !this.selectedCamera.deviceSerial) {
        console.log('请先选择摄像头设备')
        return
      }
      this.showPreviewImage = false
      this.ezuikitVideoType = 2
      let replayRecUrl = this.getReplayRecUrl(this.selectedCamera, startDateTime, endDateTime, this.selectedClarity)
      console.log(replayRecUrl, 'replayRecUrl')
      this.togglePlayerSource(replayRecUrl, {
        startDateTime,
        endDateTime,
        title: this.selectedCamera.title,
      })
    },

    getHeaderOfFooterOptions(sourceDataList) {
      let array = []
      for (let item of sourceDataList) {
        if (!this.ezuikitOption[`${item}Disabled`]) {
          array.push(item)
        }
      }
      return array
    },

    /**
     * 切换海康视频的播放源url
     * @param playerUrl
     */
    togglePlayerSource(playerUrl, {startDateTime, endDateTime, title}) {
      if (!this.player) {
        // 清除option方式的header和footer
        delete this.ezuikitOption.header
        delete this.ezuikitOption.footer

        this.player = new EZUIKit.EZUIKitPlayer({
          ...this.ezuikitOption,
          id: this.nodeId,
          title,
          accessToken: this.ezuikitState.accessToken,
          url: playerUrl,
          header: this.ezuikitOption.headerHidden ? null : this.getHeaderOfFooterOptions(['capturePicture', 'save', 'zoom']),
          footer: this.ezuikitOption.footerHidden ? null : this.getHeaderOfFooterOptions(['talk', 'broadcast', 'hd', 'fullScreen']),
          footerLeftCustomCallBack: () => {
            // 进行播放进度条组件的挂载
            console.log(SuPlayProgressBar, 'SuPlayProgressBar')
            let bottomCustomExtend = Vue.extend(SuPlayProgressBar)
            this.bottomCustomRef = new bottomCustomExtend().$mount(`#bottomCustomArea-${this.nodeId}`)
          },
          customControlsCallBack: () => {
            if (this.$slots.customControls && this.$slots.customControls[0] && this.$slots.customControls[0].elm) {
              let domNode = this.$slots.customControls[0].elm
              let customControlsNodeId = `controls-${this.nodeId}`
              $('#' + customControlsNodeId).append(domNode)
            }
            // let domNode = this.$slots.customControls[0].elm
            // // console.log(this.$slots.customControls, 'customControls-customControls')
            // let customControlsNodeId = `customControls-${this.nodeId}`
            // $('#' + customControlsNodeId).append(domNode)
            // if (this.customControlsCallBack) this.customControlsCallBack(customControlsNodeId)
          },
          // headerTitleCallBack: () => {
          //
          // },
          handleSuccess: () => {
            if (this.ezuikitVideoType === 2) {
              this.createGetOSDTimer()
            }

            if (this.bottomCustomRef && this.ezuikitVideoType === 2) {
              this.playProgressBarData = this.bottomCustomRef.initialPlayProgressBar(startDateTime, endDateTime)
              console.log(this.playProgressBarData, 'this.playProgressBarData')
            }
          },
        })
      }
      // player已经创建好了
      else {
        this.player.stop().then(() => {
          this.player.play(playerUrl)
        })

        // 标题的更新
        let headerTitleNode = document.getElementById(`headerTitle-${this.nodeId}`)
        if (headerTitleNode) {
          headerTitleNode.innerHTML = title
        }
      }
    },

    /**
     * 获取海康播放的播放器对象
     */
    getPlayer() {
      return this.player
    },

    createGetOSDTimer() {
      this.clearGetOSDTimer()
      if (!this.player) {
        return
      }
      this.getOSDTimer = setInterval(() => {
        this.player.getOSDTime().then(data => {
          if (this.playProgressBarData.playingDurationSecond > this.playProgressBarData.totalDurationSecond) {
            this.clearGetOSDTimer()
            return
          }
          let playingDateTimeValue = data.data * 1000
          let currentPlayingDuration = dayjs.duration(dayjs(playingDateTimeValue).diff(this.playProgressBarData.startDateValue))
          this.playProgressBarData.playingDurationSecond = currentPlayingDuration.asSeconds()

          this.bottomCustomRef.updateProgressBarInfo(this.playProgressBarData.playingDurationSecond)
          console.log(this.playProgressBarData.playingDurationSecond, 'this.replayOption.playingDurationSecond')
        })
      }, 1000)
    },


    clearGetOSDTimer() {
      if (this.getOSDTimer) {
        clearInterval(this.getOSDTimer)
        this.getOSDTimer = null
      }
    },
  },
}
</script>

<style lang='scss'>
.su-ezuikit-view {
  position: relative;
  width: 100%;
  height: 100%;

  .su-ezuikit-float-view {
    position: absolute;
  }

  .player-view {
    width: 100%;
    height: 100%;
    border-radius: 12px;
    overflow: hidden !important;

    iframe {
      height: 100%;
      width: 100%;
    }

    .audio-controls {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 40px;
      background-color: rgba(61, 61, 61, 0.7);
      display: flex;
      flex-direction: row;
      align-items: center;

      .time-area {
        display: flex;
        margin-left: 27px;
        align-items: center;
      }

      .su-left-audio-controls {
        flex: 1;
        display: flex;
        flex-direction: row;
      }

      .contros {
        position: unset;
        top: 13px;
        right: 10px;

        svg {
          margin-right: 15px;
          //margin-left: 5px;
        }
      }

      .broadcast,
      .ptp-talk {
        padding: 0;
        line-height: 31px;
        box-shadow: none !important;
      }

      .ptp-talk {
        margin-left: 12px;
      }
    }

    .panel-top {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 40px;
      background-color: rgba(61, 61, 61, 0.7);

      .su-header-title {
        font-size: 13px;
        color: #ffffff;
        display: inline-block;
        margin-top: 11px;
        margin-left: 20px;
      }

      .contros {
        top: 7px;
        right: 5px;
        display: flex;
        flex-direction: row;
        align-items: center;
      }
    }
  }

  .preview-image-view {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 12px;

    img {
      border-radius: 12px;
      width: 100%;
      height: 100%;
    }
  }
}

// 播报视频模块
.pop-hover {
  background-color: rgba(61, 61, 61, 0.5) !important;

  .pop-hover-content {
    width: 120px !important;
    min-width: 120px !important;

    #voice-list-end {
      color: #d3d3d3 !important;
    }

    /*滚动条样式*/
    #voice-list {
      overflow-x: hidden;
      overflow-y: auto;
    }

    #voice-list::-webkit-scrollbar {
      width: 3px;
    }

    #voice-list::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      background: rgba(0, 0, 0, 0.2);
    }

    #voice-list::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      border-radius: 0;
      background: rgba(0, 0, 0, 0.1);
    }

    .vioce-list ul li {
      border-bottom: solid 1px #959595 !important;
    }

    .voice-list-ul {
      padding: 0 12px !important;
    }
  }

}

// 监控模式下关闭一些控件
.live-video {
  .su-play-progress-bar { // 播放进度条(监控模式下功能都是不可用)
    display: none !important;
  }
}

// 回放模式下关闭一些控件
.reply-video {
  .speak, // 语音播报功能
  .broadcast, // 语音播报功能
  .time-area, // 对讲功能
  .start-save, // 开启录像
  .stop-save, // 结束录像
  .ptp-talk { // 对讲功能
    display: none !important;
  }
}
</style>
