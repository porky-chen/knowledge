<template>
  <div class="su-play-progress-bar">
    <div class='time-info icon-view'>{{ playingDurationInfo }} / {{ totalDurationInfo }}</div>
    <div class='progress-view icon-view' style='cursor: unset'>
      <el-slider :value='playingDurationSecond'
                 :show-tooltip='false'
                 disabled
                 :max='totalDurationSecond < 0 ? 0 : totalDurationSecond'
      />
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import {Slider} from 'element-ui'
let duration = require('dayjs/plugin/duration')
dayjs.extend(duration)

export default {
  name: 'su-play-progress-bar',
  components: {
    'el-slider': Slider,
  },
  data() {
    return {
      startDateValue: null,
      endDateValue: null,
      playingDurationSecond: -1,
      totalDurationSecond: -1,
      // 播放时长超过一个小时
      totalDurationMoreThenHour: false,
    }
  },
  computed: {
    playingDurationInfo() {
      return this.formatSecondToTimeInfo(this.playingDurationSecond)
    },
    totalDurationInfo() {
      return this.formatSecondToTimeInfo(this.totalDurationSecond)
    },
  },
  methods: {
    initialPlayProgressBar(startDateTime, endDateTime) {
      let startDateValue = dayjs(startDateTime, 'yyyyMMddhhmmss')
      let endDateValue = dayjs(endDateTime, 'yyyyMMddhhmmss')
      let duration = dayjs.duration(endDateValue.diff(startDateValue))

      this.totalDurationSecond = duration.asSeconds()
      this.startDateValue = startDateValue
      this.endDateValue = endDateValue
      this.playingDurationSecond = 0
      this.totalDurationMoreThenHour = duration.asHours() >= 1

      return this.$data
    },


    updateProgressBarInfo(currentPlaySecond) {
      if (currentPlaySecond > this.totalDurationSecond) {
        currentPlaySecond = this.totalDurationSecond
      }

      this.playingDurationSecond = currentPlaySecond
    },


    formatSecondToTimeInfo(secondValue) {
      if (secondValue < 0) {
        return '--:--'
      }

      let hour = parseInt(secondValue / 3600)
      let minute = parseInt(secondValue / 60 % 60)
      let second = parseInt(secondValue % 60)

      let hourInfo = hour < 10 ? '0' + hour : hour
      return `${hourInfo > 0 || this.totalDurationMoreThenHour ? `${hourInfo}:` : ''}${minute < 10 ? '0' + minute : minute}:${second < 10 ? '0' + second : second}`
    },
  },
}
</script>

<style lang="scss">
.su-play-progress-bar {
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: row;
  padding-left: 17px;
  padding-right: 17px;

  .time-info {
    font-size: 12px;
    color: #ffffff;
    margin-right: 12px;
    margin-bottom: 3px;
  }

  .progress-view {
    flex: 1;
  }
}
</style>

<style scoped lang='scss'>
::v-deep .el-slider__runway.disabled .el-slider__button-wrapper.dragging,
::v-deep .el-slider__runway.disabled .el-slider__button-wrapper.hover,
::v-deep .el-slider__runway.disabled .el-slider__button-wrapper:hover,
::v-deep .el-slider__runway.disabled .el-slider__button.dragging,
::v-deep .el-slider__runway.disabled .el-slider__button.hover,
::v-deep .el-slider__runway.disabled .el-slider__button:hover {
  cursor: unset;
}

::v-deep .el-slider__runway .el-slider__button {
  width: 6px !important;
  height: 6px !important;
  background-color: white !important;
  border: none;
}

::v-deep .el-slider__runway {
  height: 3px !important;
  background-color: rgba(255, 255, 255, 0.57);
}

::v-deep .el-slider__runway .el-slider__bar {
  height: 3px !important;
  background-color: white !important;
}

::v-deep .el-slider__button-wrapper {
  top: -16.5px;
}
</style>
