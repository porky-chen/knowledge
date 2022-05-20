<!--
  - Copyright © 2020 Guangdong Sun Railway Information Technology, Inc.
  - All rights reserved.
  -
  - @author: Liao chenxi <liaochenxi@sunengineering.cn>
  - @description 日期选择组件
  -
  - Changelog:
  - Revision 1.0 2020-06-03 Liao chenxi
  - Revision 1.0.0 2020-11-04 规范3.0下组件库调整
  - - 初始化
  -->
<template>
  <su-label-view v-bind='$attrs' class='su-date'>
    <el-date-picker class='su-date-picker'
                    ref='datePicker'
                    :value='value'
                    v-bind='$attrs'
                    v-on='filterAttributes({
                      targetObj: $listeners,
                      excludePrefixes: ["change"]
                    })'
                    @change='handleDatePickerChange'
    />
  </su-label-view>
</template>

<script>
import SuLabelView from './su-base/su-label-view'
import {DatePicker} from 'element-ui'
import SuComponent from '@/mixins/su-component'

export default {
  name: 'su-date-picker',
  mixins: [SuComponent],
  components: {
    SuLabelView,
    'el-date-picker': DatePicker,
  },
  props: {
    value: null,
  },
  data() {
    return {}
  },
  methods: {
    getRef() {
      return this.$refs.datePicker
    },
    handleDatePickerChange(value) {
      this.$emit('change', value)
      this.$emit('changeDate', value)
    },
  },
  mounted() {
  },
}
</script>
<style scoped lang='scss'>

.su-date {
  height: 32px;
  line-height: 32px;
}
</style>
