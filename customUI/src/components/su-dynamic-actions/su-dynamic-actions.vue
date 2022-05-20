<!--
  - Copyright © 2020 Guangdong Sun Railway Information Technology, Inc.
  - All rights reserved.
  -
  - @author: wujiajin <wujiajin@sunengineering.cn>
  - @description 动态顶栏
  -
  - Changelog:
  - Revision 1.0 2020-08-25 wujiajin
  - - 初始化
  -->
<template>
  <div>
    <su-button v-for="(index,item) in buttonItems" :key="index" :size="item.size" @click="tiem.click" :buttonType="item.buttonType"></su-button>
  </div>
</template>
<script>
export default {
  name: 'dynamic-action',
  props: {
    buttonItems: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
    }
  },
  methods: {
    // tab点击
    clickTab (e) {
    },
  },
  mounted () {

  }
}
</script>