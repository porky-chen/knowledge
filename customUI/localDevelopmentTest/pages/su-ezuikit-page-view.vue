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
  <div class='container-view'>
    <!--    <div class="camera-list-view">-->
    <!--      <div class="item-view"-->
    <!--           v-for="item of cameraList"-->
    <!--           :key="item.id"-->
    <!--           @click="handleCameraSelectEvent(item)"-->
    <!--      >-->
    <!--        <div class="title">{{ item.channelName }}</div>-->
    <!--        <div class="sub-title">{{ item.deviceSerial }}</div>-->
    <!--      </div>-->
    <!--    </div>-->

    <div class='ezuikit-view'>
      <div class='navigator-bar-view'>
        <div class='bar-item date-time-range-view'
             title='2号的回放视频'
             @click='handleDateTimeRangeClick'
        >
          <img :src='image.dateTimeRange' />
          <su-date-picker @input='changeDatePicker'
                          ref='dateTimeRangeRef'
                          type='datetimerange'
                          value-format='yyyyMMddhhmmss'
          />
        </div>
        <div class='bar-item camera-time-view' title='1号的实时画面' @click='handleCameraTimeClick'>
          <img :src='image.camera' />
        </div>
      </div>

      <su-ezuikit-view class='su-ezuikit-view'
                       ref='ezuikitRef'
                       :ezuikit-option='ezuikitOption'
                       @onLoadCamera='handleOnInitialEvent'
      >
        <div slot='customControls' style='margin-right: 12px'>
          <span style='font-size: 13px; color: red'>测试</span>
        </div>
      </su-ezuikit-view>

      <su-ezuikit-view class='su-ezuikit-view'
                       style='margin-top: 12px'
                       :ezuikit-option='ezuikitOption'
                       ref='ezuikitRef1'
      >
      </su-ezuikit-view>
    </div>
  </div>
</template>

<script>

import {suEzuikitView} from '../../src/components/su-ezuikit'

import dateTimeRange from '../assets/date_time_range.png'
import camera from '../assets/camera.png'


export default {
  name: 'su-ezuikit-page-view',
  components: {suEzuikitView},
  data() {
    return {
      image: {
        dateTimeRange,
        camera,
      },
      cameraList: [],

      ezuikitOption: {
        capturePictureDisabled: true,
        headerHidden: false,
        footerHidden: false,
      },
    }
  },
  created() {
  },
  methods: {
    handleOnInitialEvent(cameraList) {
      this.cameraList = cameraList
    },
    handleCameraSelectEvent(selectedCamera) {
      this.$refs.ezuikitRef.initialCamera({camera: selectedCamera})
      this.$refs.ezuikitRef1.initialCamera({camera: selectedCamera})
    },
    changeDatePicker(date) {
      this.$refs.ezuikitRef1.loadCameraReplyInDateTimeRange({
        camera: this.cameraList[0],
        startDateTime: date[0],
        endDateTime: date[1],
      })
    },
    handleDateTimeRangeClick() {
      this.$refs.dateTimeRangeRef.getRef().handleFocus()
    },
    handleCameraTimeClick() {
      this.$refs.ezuikitRef.loadCameraLive({
        camera: this.cameraList[0],
        clarity: 'hd',
      })
    },
  },
}
</script>

<style scoped lang='scss'>

.container-view {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
}

//.camera-list-view {
//  width: 250px;
//  border-radius: 12px;
//  margin-right: 12px;
//  background: rgba(3, 24, 64, 0.7);
//
//  .item-view {
//    border-radius: inherit;
//    padding: 8px 17px;
//
//    &:hover {
//      background-color: #072051;
//    }
//
//    .title {
//      font-size: 15px;
//      color: white;
//      text-overflow: ellipsis;
//      overflow: hidden;
//      white-space: nowrap;
//    }
//
//    .sub-title {
//      font-size: 12px;
//      color: #999999;
//    }
//  }
//}

.ezuikit-view {
  flex: 1;
  border-radius: 12px;
  display: flex;
  flex-direction: column;

  .navigator-bar-view {
    height: 56px;
    min-height: 56px;
    background: rgba(3, 24, 64, 0.7);
    border-radius: 12px;
    margin-bottom: 5px;
    display: flex;
    flex-direction: row;

    .date-time-range-view {
      position: relative;

      ::v-deep .el-date-editor {
        position: absolute;
        left: 0;
        top: 0;
        visibility: hidden;
      }
    }

    .bar-item {
      height: 100%;
      padding: 0 12px;
      display: flex;
      align-items: center;
      border-radius: 12px;
      cursor: pointer;

      &:hover {
        background-color: #072051;
      }

      img {
        width: 32px;
        height: 32px;
      }
    }
  }

  .su-ezuikit-view {
    border-radius: 12px;
    background-color: darkseagreen;

    ::v-deep .su-ezuikit-float-view {
      left: 12px;
      top: 12px;
    }
  }
}

</style>
