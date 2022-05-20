<!--
  - Copyright © 2020 Guangdong Sun Railway Information Technology, Inc.
  - All rights reserved.
  -
  - @author: wu jiajin <wujiajin@sunengineering.cn>
  - @description 预览组件
  -
  - Changelog:
  - Revision 1.0 2020-06-01 wu jiajin
  - - 初始化
  -->
<template>
  <div @click='handleImg'>
    <slot :images='images'></slot>
  </div>
</template>

<script>
import SuViewer from './popup'

export default {
  name: 'su-images',
  props: {
    images: {
      type: Array,
    },
  },
  data() {
    return {
      title: '',
    }
  },
  methods: {
    handleImg: function(e) {
      const isCheckNum = e.target.src.split('/').pop()
      const imgIndex = this.images.findIndex(res => {
        return res.thumb.split('/').pop() === isCheckNum
      })
      if (e.target.tagName === 'IMG') {
        SuViewer(this.images, imgIndex >= 0 ? imgIndex : 0)
      }
    },
    showDialog: function(index) {
      console.log(this.images, 'images')
      SuViewer(this.images, index)
    },
  },
}
</script>
