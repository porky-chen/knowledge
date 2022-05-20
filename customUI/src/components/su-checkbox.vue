<!--
  - Copyright © 2020 Guangdong Sun Railway Information Technology, Inc.
  - All rights reserved.
  -
  - @author: Xu Ming <xuming@sunengineering.cn>
  - @description 多选组件
  -
  - Changelog:
  - Revision 1.0 2020-06-03 Xu Ming
  - Revision 1.0.0 2020-11-04 规范3.0下组件库调整
  - - 初始化
  -->

<template>
  <div class='su-checkbox'>
    <el-checkbox-group :value='value'
                       v-bind='$attrs'
                       v-on='$listeners'
    >
      <slot>
        <el-checkbox v-for='item in items'
                     :key='item.label'
                     v-bind='item'
                     :class='{"su-checkbox-indeterminate" : item.indeterminate}'
        />
      </slot>
    </el-checkbox-group>
  </div>
</template>

<script>
import SuComponent from '@/mixins/su-component'
import {Checkbox} from 'element-ui'

export default {
  name: 'su-checkbox',
  mixins: [SuComponent],
  components: {
    'el-checkbox': Checkbox,
  },
  props: {
    value: {
      type: Array,
      default: () => {
        return []
      },
    },
    items: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {}
  },
  methods: {
    getCheckedItems() {
      return this.value
    },
    setCheckedItems(items) {
      let checkedItems = []
      if (items && items.length > 0) {
        checkedItems = items.filter((i) => i.checked).map((i) => i.label)
      }
      this.$emit('input', checkedItems)
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.setCheckedItems(this.items)
    })
  },
  watch: {
    items: {
      handler(data) {
        this.setCheckedItems(data)
      },
      immediate: true,
      deep: true,
    },
  },
}
</script>

