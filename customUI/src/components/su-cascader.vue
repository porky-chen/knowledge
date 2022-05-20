<!--
- Copyright (c) 2021 Guangdong Sun Railway Information Technology, Inc.
- All rights reserved.
-
- @author wenteng
-
- Description:
-
- Changelog:
- Revision 1.0.0 2020-11-04 规范3.0下组件库调整
-
- Revision:
-->

<template>
  <su-label-view class='su-cascader'
                 v-bind='$attrs'
  >
    <el-cascader class='cascader-view'
                 v-bind='filterAttributes({
                    targetObj: $attrs,
                    excludePrefixes: ["clearable", "placeholder", "filterable", "size","value"]
                 })'
                 :clearable='clearable'
                 :placeholder='placeholder'
                 :filterable='filterable'
                 :size='size'
                 :value='value'
                 v-on='filterAttributes({
                    targetObj: $listeners,
                    excludePrefixes: []
                 })'
    >
      <template v-for='name in Object.keys($slots)' v-slot:[name]>
        <slot :name='name' />
      </template>
    </el-cascader>
  </su-label-view>
</template>

<script>
import SuComponent from '@/mixins/su-component'
import SuLabelView from '@/components/su-base/su-label-view'
import {Cascader} from 'element-ui'

export default {
  name: 'su-cascader',
  mixins: [SuComponent],
  props: {
    value: null,
    size: {
      type: String,
      default: 'small',
    },
    clearable: {
      type: Boolean,
      default: true,
    },
    placeholder: {
      type: String,
      default: '请选择',
    },
    filterable: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    SuLabelView,
    'el-cascader': Cascader,
  },
}
</script>

<style lang='scss'>
.el-cascader__dropdown {
  margin-top: 4px !important;
  margin-bottom: 4px !important;

  .popper__arrow {
    display: none
  }
}
</style>
