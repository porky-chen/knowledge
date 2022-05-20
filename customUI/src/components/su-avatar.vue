<!--
  - Copyright © 2020 Guangdong Sun Railway Information Technology, Inc.
  - All rights reserved.
  -
  - @author: Liao chenxi <liaochenxi@sunengineering.cn>
  - @description 分页器组件
  -
  - Changelog:
  - Revision 1.0.0 2020-11-04 规范3.0下组件库调整
  - - 初始化
  -->
<template>
  <div class='su-avatar'>
    <el-avatar v-bind='$attrs'
               :src='showSrc'
               v-on='$listeners'>
      <slot />
    </el-avatar>
  </div>
</template>

<script>
const PathObj = {
  blue: require('@/assets/avatar/Avatar_blue.png'),
  yellow: require('@/assets/avatar/Avatar_yellow.png'),
  gray: require('@/assets/avatar/Avatar_gray.png'),
  red: require('@/assets/avatar/Avatar_red.png'),
  green: require('@/assets/avatar/Avatar_green.png'),
}

import {Avatar} from 'element-ui'

export default {
  name: 'su-avatar',
  components: {
    'el-avatar': Avatar,
  },
  props: {
    // 用来设置一些默认的头像
    color: {
      type: String,
      default: '',
    },
    src: {
      type: String,
      default: '',
    },
  },
  computed: {
    showSrc() {
      let src = this.src
      if (this.color) {
        src = PathObj[this.color]
      }
      return src
    },
  },
}
</script>

<style lang='scss' scoped>
</style>
