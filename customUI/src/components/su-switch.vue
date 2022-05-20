<!--
  - Copyright © 2020 Guangdong Sun Railway Information Technology, Inc.
  - All rights reserved.
  -
  - @author: Xu Ming <xuming@sunengineering.cn>
  - @description 开关组件
  -
  - Changelog:
  - Revision 1.0 2020-06-02 Xu Ming
  - Revision 1.0.0 2020-11-04 规范3.0下组件库调整
  - - 初始化
  -->

<template>
  <div class='su-switch'>
    <el-switch v-bind='filterAttributes({
                targetObj: $attrs,
                excludePrefixes: ["inactive-text", "active-text"]
               })'
               v-on='filterAttributes({
                targetObj: $listeners,
                excludePrefixes: []
               })'
               :active-text='activeTextValue'
               :value='value'
    >
    </el-switch>
  </div>
</template>

<script>
import SuComponent from '@/mixins/su-component'
import {
  Switch,
} from 'element-ui'

export default {
  name: 'su-switch',
  mixins: [SuComponent],
  components: {
    'el-switch': Switch,
  },
  props: {
    value: null,
    activeText: {
      type: String,
      default: null,
    },
    inactiveText: {
      type: String,
      default: null,
    },
  },
  data() {
    return {}
  },
  computed: {
    activeTextValue() {
      if (this.value) return this.activeText
      else return this.inactiveText
    },
  },
  methods: {},
  mounted() {
  },
}
</script>

<style scoped>
.su-switch {

}
</style>
