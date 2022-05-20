<!--
 - Copyright (c) 2020 Guangdong Sun Railway Information Technology, Inc.
 - All rights reserved.
 -
 - @author weishibin
 - Description: su-radio 单选框组件
 - Changelog:
 - Revision 1.0 2020-06-01 weishibin
 - Revision 1.0.0 2020-11-04 规范3.0下组件库调整
 - - 初始化
 -->
<template>
  <el-radio-group :value='value'
                  v-on='filterAttributes({
                    targetObj: $listeners,
                    excludePrefixes: []
                  })'
                  v-bind='$attrs'
  >
    <!--    由于el-radio-group只有一个slot插槽，而下方有了slot默认插槽，因此这段代码可以注释不使用-->
    <!--    <template v-for='name in Object.keys($slots)' v-slot:[name]>-->
    <!--      <slot :name='name' />-->
    <!--    </template>-->
    <slot>
      <el-radio
        v-for='item in data'
        :key='item[valueKey]'
        :label='item[valueKey]'
        :selected='item.checked'
        v-bind='item'>
        <slot name='radio' :item='item'>
          {{ item[labelKey] }}
        </slot>
      </el-radio>
    </slot>
  </el-radio-group>
</template>

<script>
import SuComponent from '@/mixins/su-component'
import {Radio} from 'element-ui'

export default {
  name: 'SuRadio',
  mixins: [SuComponent],
  components: {
    'el-radio': Radio,
  },
  props: {
    value: null,
    data: {
      type: Array,
      default: () => {
        return []
      },
    },
    isNormalCheck: {
      type: Boolean,
      default: true,
    },
    labelKey: {
      type: String,
      default: 'label',
    },
    valueKey: {
      type: String,
      default: 'value',
    },
  },
  watch: {
    data: {
      handler(data) {
        if (data && data?.length < 2) {
          console.warn('The number of radio must be at least two!')
        }
        if (data && data?.length > 6) {
          console.warn('The number of radio is expected to be less than 6!')
        }
        if (data && data?.length >= 2) {
          if (this.isNormalCheck) {
            let block = false
            for (let v of data || []) {
              if (v.checked) {
                block = true
                break
              }
            }
            if (!block && data?.length >= 2) {
              data[0].checked = true
              this.$emit('input', data[0][this.valueKey])
            }
          }
        }

      },
      immediate: true,
      deep: true,
    },
  },
  data() {
    return {}
  },
  mounted() {
    this.setRadio()
  },
  methods: {
    setRadio() {
      for (let item of this.data || []) {
        if (item.checked) {
          this.$emit('input', item[this.valueKey])
          break
        }
      }
    },
  },
}
</script>

