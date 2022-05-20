<!--
  - Copyright © 2020 Guangdong Sun Railway Information Technology, Inc.
  - All rights reserved.
  -
  - @author: wu jiajin <wujiajin@sunengineering.cn>
  - @description 整体布局
  -
  - Changelog:
  - Revision 1.0 2020-06-01 wu jiajin
  - Revision 1.0.0 2020-11-04 规范3.0下组件库调整
  - - 初始化
  -->
<template>
  <section class="su-container">
    <div class="su-container-main">
      <aside :class="classname"  v-if="showHeaderAndMenu">
        <div class="su-container-aside-title">
          <div v-if="isCollapse" class="su-container-aside-title-content">
            <img :src="logos">
          </div>
          <div v-else class="su-container-aside-title-content">
            <img :src="logo">
          </div>
        </div>
        <div class="su-container-aside-detail">
          <slot name="aside"></slot>

        </div>
      </aside>
      <div class="su-container-content">
        <header class="su-container-header" v-if="showHeaderAndMenu">
          <slot name="header"></slot>
        </header>
        <div class="su-container-detail">
          <slot></slot>
        </div>
      </div>
    </div>
    <!-- <footer class="su-container-footer">{{copyright}}</footer> -->
  </section>
</template>

<script>
export default {
  name: 'su-layout',
  props: {
    copyright: {
      type: String,
      default: '广东瀚阳轨道信息科技有限公司 ©Guangdong Sun Railway Information Technology,Inc. All rights reserved.'
    },
    logo: {
      type: String,
      default: require('@/assets/logo.png')
    },
    logos: {
      type: String,
      default: require('@/assets/logo-b.png')
    }
  },
  data () {
    return {
      isCollapse: true,
      showHeaderAndMenu: true,
      classname: 'su-container-aside su-container-aside--collapse'
    }
  },

  methods: {
    collapse (value) {
      this.isCollapse = value
      this.classname = value ? 'su-container-aside su-container-aside--collapse' : 'su-container-aside';
    },
    toggleHeaderAndMenuVisibility (show) {
      this.showHeaderAndMenu = show
    }
  }
}
</script>
