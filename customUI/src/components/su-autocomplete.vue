<!--
  - Copyright © 2020 Guangdong Sun Railway Information Technology, Inc.
  - All rights reserved.
  -
  - @author: liao chenxi <liaochenxi@sunengineering.cn>
  - @description 输入框带远程搜索组件
  -
  - Changelog:
  - Revision 1.0 2020-12-05 liao chenxi
  - - 初始化
  -->
<template>
  <!-- input带远程搜索功能 -->
  <el-autocomplete :maxlength='maxlength' :minlength='minlength'
                   :clearable='autocompleteItems.clearable'
                   v-model.trim='autocompleteData[autocompleteItems.field]'
                   :fetch-suggestions='autocompleteItems.fetchSuggestions'
                   size='small'
                   class='input-box'
                   :disabled='disabled'
                   :suffix-icon="autocompleteItems.showSearchIcon?'el-icon-search':''"
                   :placeholder="autocompleteItems.placeholder?autocompleteItems.placeholder:'请输入'"
                   @select='handleSelect'>
    <template slot-scope='{ item }'>
      <el-tooltip v-if='item[autocompleteItems.nodeName].length>autocompleteItems.textOverflowLimitLength'
                  class='item'
                  effect='dark'
                  :content='item[autocompleteItems.nodeName]'
                  placement='right-end'>
        <div class='name text-overflow'>{{ item[autocompleteItems.nodeName] }}</div>
      </el-tooltip>
      <div v-else class='name text-overflow'>{{ item[autocompleteItems.nodeName] }}</div>
    </template>
  </el-autocomplete>
</template>
<script>
import {Tooltip} from 'element-ui'

export default {
  name: 'su-autocomplete',
  components: {
    'el-tooltip': Tooltip,
  },
  props: {
    autocompleteItems: {},
    autocompleteData: {},
    maxlength: {},
    minlength: {},

    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {}
  },
  methods: {
    handleSelect(item) {
      if (this.autocompleteItems.handleSelect) {
        this.autocompleteItems.handleSelect(item)
      }

      this.$emit('change', item)

      try {
        let value = this.autocompleteData[this.autocompleteItems.field]
        this.dispatch('ElFormItem', 'el.form.blur', [value])
        // this.dispatch('ElFormItem', 'el.form.change', [value])
      } catch (e) {
        //
      }
    },

    // @param 1: 触发事件的组件名称 2: 事件名称 3. 额外参数
    dispatch(componentName, eventName, params) {
      let parent = this.$parent || this.$root
      let name = parent.$options.componentName
      // 根据componentName自下而上递归查找目标组件
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent
        if (parent) {
          name = parent.$options.componentName
        }
      }
      // 用名称为[componentName]的组件$emit事件
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params))
      }
    },
  },
  mounted() {
  },
}
</script>
<style lang='scss'>
</style>
