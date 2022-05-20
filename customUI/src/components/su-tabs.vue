<!--
  - Copyright © 2020 Guangdong Sun Railway Information Technology, Inc.
  - All rights reserved.
  -
  - @author: Liao chenxi <liaochenxi@sunengineering.cn>
  - @description 多选组件
  -
  - Changelog:
  - Revision 1.0 2020-06-03 Liao chenxi
  - Revision 1.0.0 2020-11-04 规范3.0下组件库调整
  - - 初始化
  -->
<template>
  <div :class="'tab-'+tabType" :style='cssStyle'>
    <div class='cards-tab'
         v-for='(item,index) in columns'
         :key='index'
         :class="{
           'active' : tabIndex === index,
           'su-tab-disabled' : item.disabled || disabled
         }"
         @click='clickTab(index, item)'
    >
      {{ item.label }}
    </div>
  </div>
</template>
<script>
export default {
  name: 'Pagination',
  props: {
    tabType: {
      type: String,
    },
    columns: {
      type: Array,
    },
    tabIndex: {
      default: 0,
    },
    cssStyle: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {}
  },
  methods: {
    // tab点击
    clickTab(index, item) {
      if (item.disabled || this.disabled) {
        return
      }
      this.$emit('clickTab', index)
      this.$emit('update:tabIndex', index)
    },
  },
  mounted() {

  },
}
</script>
