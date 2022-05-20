<!--
 - Copyright (c) 2020 Guangdong Sun Railway Information Technology, Inc.
 - All rights reserved.
 -
 - @author weishibin
 - Description: su-input组件
 - Changelog:
 - Revision 1.0 2020-06-01 weishibin
 - Revision 1.0.0 2020-11-04 规范3.0下组件库调整
 - - 初始化
 -->
<template>
  <su-label-view class='su-input'
                 v-bind='$attrs'
  >
    <el-input ref='input'
              v-bind='$attrs'
              v-on='filterAttributes({
                targetObj: $listeners,
                // 这里的blur可以不用过滤掉
                excludePrefixes: ["input", "keyup", "mousewheel"]
              })'
              :value='value'
              :type='type'
              :maxlength='maxlengthValue'
              :minlength='minlength'
              :clearable='clearable'
              :placeholder='placeholder'
              autocomplete='off'
              :size='size'
              @keyup.enter='handleClick'
              @input='input'
              @blur='blur'
              @focus='focus'
              @mousewheel.native.prevent
              onmouseover='this.title=this.value'
    >
      <template v-for='(name, index) in Object.keys($slots)'
                v-slot:[name]
      >
        <div :class='`su-input-slot-${name}`' :key='`${name}-${index}`'>
          <slot :name='name' />
        </div>
      </template>
    </el-input>
  </su-label-view>
</template>

<script>
import SuLabelView from '@/components/su-base/su-label-view'
import SuComponent from '@/mixins/su-component'
import ElInput from './el-source/input'

export default {
  name: 'SuNativeInput',
  mixins: [SuComponent],
  components: {SuLabelView, ElInput},
  props: {
    value: undefined,
    // number是限制整数输入
    type: {
      type: String,
      default: null,
    },
    // 整数情况下的数值精度
    precision: {
      type: Number,
      default: 0,
    },
    maxlength: {
      type: Number,
      default: 50,
    },
    max: {
      type: Number,
      default: null,
    },
    min: {
      type: Number,
      default: null,
    },
    minlength: {
      type: Number,
      default: 0,
    },
    clearable: {
      type: Boolean,
      default: true,
    },
    size: {
      type: String,
      default: 'small',
    },
    placeholder: {
      type: String,
      default: '请输入',
    },
  },
  computed: {
    maxlengthValue() {
      // 数字的最大长度规格：长度10，精度2。则整数部分长度是8
      return this.type === 'number' ? (this.maxlength + (this.precision > 0 ? 1 : 0)) : this.maxlength
    },
  },
  methods: {
    // 点击后查询的事件
    handleClick() {
      this.$emit('keyup')
      this.$emit('click', this.value || '')
    },
    clear() {
      this.$emit('input', '')
      this.$emit('click', '')
    },
    clearText() {
      this.$emit('input', '')
    },
    setKeyWord(text) {
      this.$emit('input', text)
    },
    input(value) {
      if (this.type === 'number') {
        value = this.numberFormatter(value)
      }
      this.$emit('update:value', value)
      this.$emit('input', value)
    },

    focus() {
      if (this.type === 'number') {
        let targetValue = this.value
        if (targetValue) {
          targetValue = targetValue.toString()

          // 精度数字下清除都是0的小数内容和那个.
          if (this.precision) {
            let dotIndex = targetValue.indexOf('.')
            if (dotIndex > 0) {
              let decimalValue = targetValue.substring(dotIndex + 1, targetValue.length).split('').reverse().join('')
              let decimalIntValue = parseInt(decimalValue)

              if (decimalIntValue <= 0) {
                targetValue = targetValue.substring(0, dotIndex)
              } else {
                targetValue = targetValue.substring(0, dotIndex) + '.' + decimalIntValue.toString().split('').reverse().join('')
              }
              this.$emit('input', targetValue)
            }
          }

          // -
        }
      }
    },

    blur() {
      console.log('blur')
      if (this.type === 'number') {
        let targetValue = String(this.value)
        let hasChangedTargetValue = false
        if (targetValue) {
          // 当只输入了-，并且内容就是-。则置空
          if (targetValue === '-') {
            targetValue = ''
            hasChangedTargetValue = true
          }
          // 当输入了小数，并且最后的内容是. 则将其删除
          if (targetValue.endsWith('.')) {
            targetValue = targetValue.substring(0, targetValue.indexOf('.'))
            hasChangedTargetValue = true
          }
        }
        console.log('33333333333')

        // 精度数字的保持
        if (this.precision && targetValue) {
          targetValue = parseFloat(targetValue).toFixed(this.precision)
          hasChangedTargetValue = true
        }

        // 最大值处理
        if (this.max !== null && this.max !== undefined) {
          if (parseFloat(targetValue) > this.max) {
            targetValue = this.max.toString()
            hasChangedTargetValue = true
          }
        }

        // 最小值处理
        if (this.min !== null && this.min !== undefined) {
          if (parseFloat(targetValue) < this.min) {
            targetValue = this.min.toString()
            hasChangedTargetValue = true
          }
        }

        if (hasChangedTargetValue) this.$emit('input', targetValue)
      }

      if (this.type === 'number') {
        if (!this.value) {
          this.$refs.input.getInput().value = null
        }
      }
    },

    numberFormatter(numberValue) {
      if (!numberValue) {
        return numberValue
      }

      if (numberValue === '。') numberValue = '.'

      // 数字的替换
      let targetValue = numberValue.toString().replace(/[^\-\d.]/g, '')

      // 输入内容格式的处理
      if (targetValue) {

        // 多个.的处理
        if (targetValue.match(/[.]/g)?.length > 1) {
          let firstIndex = targetValue.indexOf('.')
          targetValue = targetValue.substring(0, firstIndex) + '.' + targetValue.substring(firstIndex + 1).replace(/[.]/g, '')
        }
        if (targetValue === '.') {
          targetValue = '0.'
        }

        // 多个-的处理。只能放第一个
        let minusCharIsBeFirst = targetValue.startsWith('-')
        console.log(minusCharIsBeFirst, 'minusCharIsBeFirst')
        if (targetValue.match(/[-]/g)?.length > 0) {
          targetValue = targetValue.replace(/[-]/g, '')
        }
        if (minusCharIsBeFirst) {
          targetValue = '-' + targetValue
        }
      }

      // 数字精度的处理
      let dotIndex = targetValue.indexOf('.')
      if (this.precision !== null && this.precision !== undefined && dotIndex > 0) {
        if (this.precision === 0) {
          targetValue = targetValue.substring(0, dotIndex)
        } else {
          if ((targetValue.length - 1 - dotIndex) > this.precision) {
            targetValue = targetValue.substring(0, dotIndex) + '.' + targetValue.substring(dotIndex + 1, dotIndex + this.precision + 1)
          }
        }
      }

      // 整数部分的长度限制
      if (this.maxlength && this.precision) {
        dotIndex = targetValue.indexOf('.')
        let intValue = targetValue.substring(0, dotIndex < 0 ? targetValue.length : dotIndex)
        if (intValue.length > (this.maxlength - this.precision)) {
          intValue = intValue.substring(0, this.maxlength - this.precision)
        }
        if (dotIndex > 0) {
          targetValue = intValue + '.' + targetValue.substring(dotIndex + 1)
        } else {
          targetValue = intValue
        }
      }

      // 前面多余的0的处理
      dotIndex = targetValue.indexOf('.')
      if (dotIndex > 0) {
        let intValueStr = targetValue.substring(0, dotIndex)
        let intValue = parseInt(intValueStr)
        targetValue = `${intValue}.${targetValue.substring(dotIndex + 1, dotIndex + this.precision + 1)}`

        // -0.5的修复，由于parseInt(-0) = 0的关系，导致其负号丢失了。
        if (intValue === 0 && intValueStr.startsWith('-') && !targetValue.startsWith('-')) {
          targetValue = '-' + targetValue
        }
      } else {
        while (targetValue.startsWith('0') && targetValue !== '0') {
          targetValue = targetValue.substring(1)
        }
      }

      return targetValue
    },
  },
}
</script>
