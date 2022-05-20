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
  <su-label-view class='su-select'
                 v-bind='elSelectAttributes($attrs)'
  >
    <el-select ref='select'
               v-bind='elSelectAttributes($attrs)'
               v-on='elSelectAttributes($listeners)'
               :multiple='multiple'
               :clearable='clearable'
               :filterable='filterable'
               :placeholder='placeholder'
               :size='size'
               :collapse-tags='collapseTags'
               :value='value'
               @change='handleChangeEvent'
               @focus='handleSelectFocus'
    >
      <template v-for='name in Object.keys(elSelectAttributes($slots))' v-slot:[name]>
        <slot :name='name' />
      </template>

      <slot>
        <el-option v-for='item in options'
                   :style='optionStyle'
                   v-bind='filterAttributes({targetObj: item})'
                   :key='item[valueKey]'
                   :label='item[labelKey]'
                   :value='item[valueKey]'
        >
          <slot name='option' :item='item'>
            <el-row type='flex' align='middle' class='su-select-option'>
              <span class='check'></span>
              <span class='option-title'
                    :title='item[labelKey] || ""'
              >
                {{ item[labelKey] }}
              </span>
              <i v-if='item.icon'
                 :class='item.icon'
                 @click.stop='handleOptionIconClick(item)'
              />
            </el-row>
          </slot>
        </el-option>
      </slot>
    </el-select>
  </su-label-view>
</template>

<script>
import SuComponent from '@/mixins/su-component'
import SuLabelView from '@/components/su-base/su-label-view'
import ElSelect from './el-source/select'
import ElOption from './el-source/option'

export default {
  name: 'su-sheet',
  components: {
    SuLabelView,
    ElSelect,
    ElOption,
  },
  mixins: [SuComponent],
  props: {
    value: null,

    options: {
      type: Array,
      default() {
        return []
      },
    },
    size: {
      type: String,
      default: 'small',
    },
    valueKey: {
      type: String,
      default: 'value',
    },
    labelKey: {
      type: String,
      default: 'label',
    },
    multiple: Boolean,
    filterable: {
      type: Boolean,
      default: true,
    },
    placeholder: {
      type: String,
      default: '请选择',
    },
    collapseTags: {
      type: Boolean,
      default: true,
    },
    clearable: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    optionStyle() {
      if (!this.selectWidth) {
        return {}
      }
      return {
        'max-width': `${this.selectWidth}px`,
      }
    },
  },
  data() {
    return {
      selectWidth: null,
    }
  },
  methods: {
    getRef() {
      return this.$refs.select
    },
    elSelectAttributes(targetObj) {
      return this.filterAttributes({
        excludePrefixes: ['option', 'focus', 'change'],
        targetObj,
      })
    },
    elOptionAttributes(targetObj, replaceKey = true) {
      return this.filterAttributes({
        includePrefixes: ['option-'],
        targetObj,
        replaceKey,
      })
    },
    handleSelectFocus(val) {
      this.selectWidth = this.$refs.select.$el.clientWidth || val.srcElement.clientWidth
      this.$emit('focus', val)
    },
    handleChangeEvent(selectedValue) {
      let selectedData = this.options.find(item => item[this.valueKey] === selectedValue)
      this.$emit('change', selectedValue, selectedData)
    },
    handleOptionIconClick(item) {
      if (item.callback && typeof item.callback === 'function') {
        item.callback(item)
      }
    },
    getSelectedItems() {
      return this.value
    },
  },
}
</script>

<style lang='scss' scoped>

</style>
