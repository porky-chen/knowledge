<!--
  - Copyright © 2021 Guangdong Sun Railway Information Technology, Inc.
  - All rights reserved.
  -
  - @author: Chen zehao <chenzehao@sunengineering.cn>
  - @description 文字提示
  -
  - Changelog:
  - Revision 1.0 2021-11-02 Chen zehao
  - Revision 1.0.0 2020-11-04 规范3.0下组件库调整
  - - 初始化
  -->
-->
<template>
  <div class='su-tooltip'>
    <el-tooltip v-bind='$attrs' v-on='$listeners'>
      <template v-for='name in Object.keys($slots)' v-slot:[name]>
        <slot :name='name' />
      </template>
    </el-tooltip>
  </div>
</template>

<script>
import {Tooltip} from 'element-ui'

export default {
  name: 'su-tooltip',
  components: {
    'el-tooltip': Tooltip,
  },
  props: {},
  data() {
    return {}
  },
  methods: {},
  mounted() {
  },
}
</script>

<style lang='sass'>

</style>
