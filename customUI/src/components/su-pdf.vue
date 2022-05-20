<!--
  - Copyright © 2020 Guangdong Sun Railway Information Technology, Inc.
  - All rights reserved.
  -
  - @author: wu jiajin <wujiajin@sunengineering.cn>
  - @description pdf组件
  -
  - Changelog:
  - Revision 1.0 2020-06-01 wu jiajin
  - Revision 1.0.0 2020-11-04 规范3.0下组件库调整
  - - 初始化
  -->
<template>
  <div class="pdf" :style="`width:${width}px;height: ${height}px`">
    <!-- <p class="arrow">
    <span @click="changePdfPage(0)" class="turn" :class="{grey: currentPage==1}">Preview</span>
    {{currentPage}} / {{pageCount}}
    <span @click="changePdfPage(1)" class="turn" :class="{grey: currentPage==pageCount}">Next</span>
    </p> -->
    <!-- <pdf
      :src="src"
      :page="currentPage"
      @num-pages="pageCount=$event"
      @page-loaded="currentPage=$event"
      @loaded="loadPdfHandler"
      >
    </pdf> -->
     <iframe :src="src" frameborder="0" style="width: 100%; height: 100%"></iframe>
  </div>
</template>

<script>
// import pdf from 'vue-pdf'
export default {
  name: 'su-pdf',
  // components: { pdf },
  props:{
    src:{
      type: String,
      default: 'http://image.cache.timepack.cn/nodejs.pdf'
    },
    width:{
      type: String,
      default: '600'
    },
    height: {
      type: String,
      default: '700'
    }
  },
  data () {
    return {
      pageCount: 0, // pdf文件总页数
      fileType: 'pdf', // 文件类型
      currentPage: 0
    }
  },
  methods: {
    // 改变PDF页码,val传过来区分上一页下一页的值,0上一页,1下一页
    changePdfPage (val) {
      // console.log(val)
      if (val === 0 && this.currentPage > 1) {
        this.currentPage--
        // console.log(this.currentPage)
      }
      if (val === 1 && this.currentPage < this.pageCount) {
        this.currentPage++
        // console.log(this.currentPage)
      }
    },

    // pdf加载时
    loadPdfHandler () {
      this.currentPage = 1 // 加载的时候先加载第一页
    }

  }

}
</script>
