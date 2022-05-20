<!--
 - Copyright (c) 2020 Guangdong Sun Railway Information Technology, Inc.
 - All rights reserved.
 -
 - @author liaochenxi
 - Description: 搜索公共组件组件
 - Changelog:
 - Revision 1.0 2020-10-24 liaochenxi
 - Revision 1.0.0 2020-11-04 规范3.0下组件库调整
 - - 初始化
 -->
<template>
  <div class='su-search'>
    <el-autocomplete v-model='keyword'
                     ref='autocomplete'
                     v-bind='$attrs'
                     v-on='filterAttributes({
                      targetObj: $listeners,
                      excludePrefixes: ["input"]
                     })'
                     :placeholder='placeholder'
                     @input='updateKeyword'
                     :clearable='clearable'
                     :prefix-icon='prefixIcon'
                     :fetch-suggestions='fetchSuggestions'
                     @keyup.enter.native='handleClick'
    >
      <template v-for='name in Object.keys($slots)' v-slot:[name]>
        <slot :name='name' />
      </template>

    </el-autocomplete>
  </div>
</template>

<script>
import SuComponent from '@/mixins/su-component'

export default {
  name: 'su-search',
  mixins: [SuComponent],
  props: {
    value: null,
    placeholder: {
      type: String,
      default: '快速搜索',
    },
    clearable: {
      type: Boolean,
      default: true,
    },
    prefixIcon: {
      type: String,
      default: 'el-icon-search',
    },
    labelKey: {
      type: String,
      default: 'label',
    },
    // 建议的数据列表
    suggestionDataList: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      keyword: null,
    }
  },
  created() {
    this.keyword = this.value
  },
  watch: {
    value() {
      this.keyword = this.value
    },
  },
  methods: {
    getRef() {
      return this.$refs.autocomplete
    },
    getEmitData() {
      if (this.keyword) {
        return {keyword: this.keyword}
      }
      return {}
    },

    // 点击后查询的事件
    handleClick() {
      this.$emit('click', this.getEmitData())
    },
    clearText() {
      this.keyword = null
      this.$emit('input', null)
    },
    // 更新keyword
    updateKeyword(value) {
      this.$emit('input', value)
      this.$emit('updateKeyword', this.getEmitData())
    },

    fetchSuggestions(queryString, cb) {
      // 如果使用了自定义的fetch-suggestions
      if (this.$attrs['fetch-suggestions']) {
        this['fetch-suggestions'](queryString, cb)
      }
      // 否则使用suggestionDataList作为数据源
      else {
        let filteredList = queryString ? this.suggestionDataList.filter(item => {
          return item[this.labelKey] && item[this.labelKey].indexOf(queryString) >= 0
        }) : this.suggestionDataList
        return cb(filteredList)
      }
    },
  },
}
</script>

<style lang='scss'>
.el-autocomplete-suggestion {
  margin-top: 4px !important;
  margin-bottom: 4px !important;

  .popper__arrow {
    display: none
  }
}
</style>
