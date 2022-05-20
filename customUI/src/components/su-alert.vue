<!--
  - Copyright © 2020 Guangdong Sun Railway Information Technology, Inc.
  - All rights reserved.
  -
  - @author: wu jiajin <wujiajin@sunengineering.cn>
  - @description 侧菜单栏
  -
  - Changelog:
  - Revision 1.0.0 2020-11-04 规范3.0下组件库调整
  - - 初始化
  -->

<template>
  <el-alert v-bind='$attrs' v-on='$listeners'></el-alert>
</template>

<script>
import {Alert} from 'element-ui'

export default {
  name: 'SuAlert',
  components: {
    'el-alert': Alert,
  },
}
</script>

<style lang='scss' scoped>
</style>
