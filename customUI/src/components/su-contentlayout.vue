<!--
  - Copyright © 2020 Guangdong Sun Railway Information Technology, Inc.
  - All rights reserved.
  -
  - @author: wu jiajin <wujiajin@sunengineering.cn>
  - @description 内容布局组件
  -
  - Changelog:
  - Revision 1.0 2020-06-01 wu jiajin
  - Revision 1.0.0 2020-11-04 规范3.0下组件库调整
  - - 初始化
  -->
<template>
  <section class='su-layout'>
    <aside class='su-layout-aside'
           :style='`width:${asidewidth}`'
           :class='asideClass'
           v-if='$slots.aside'
           @mouseover='handleAsideMouseOver'
           @mouseleave='handleAsideMouseLeave'
    >
      <div class='su-layout-aside-content' v-if='$slots.aside'>
        <div class='su-layout-aside-header' v-if='$slots.asideheader'>
          <slot name='asideheader'></slot>
        </div>
        <div class='su-layout-aside-title' v-if='$slots.asidetitle'>
          <slot name='asidetitle'></slot>
        </div>
        <div class='su-layout-aside-box'>
          <slot name='aside'></slot>
        </div>
      </div>
    </aside>

    <section class='su-layout-content' :style='`margin-left:${$slots.aside?asidewidth:0}`'
             v-if='$slots.action || $slots.filter || $slots.main || $slots.footer'>
      <header class='su-layout-filter'
              v-if='$slots.filter'>
        <slot name='filter'></slot>
      </header>

      <section class='su-layout-main-wrapper'
               v-if='$slots.action || $slots.main || $slots.top'>

        <div class='su-layout-top'
             v-if='$slots.top'>
          <slot name='top'></slot>
        </div>

        <div class='su-layout-action'
             v-if='$slots.action'>
          <slot name='action'></slot>
        </div>

        <div class='su-layout-main'
             v-if='$slots.main'>
          <slot name='main'></slot>
        </div>
      </section>

      <footer class='su-layout-footer'
              v-if='$slots.footer'>
        <slot name='footer'></slot>
      </footer>
    </section>

    <div class='su-layout-default'
         v-if='$slots.default'>
      <slot></slot>
    </div>
  </section>
</template>

<script>
export default {
  name: 'su-layout',
  props: {
    asidewidth: {
      type: String,
      default: '200px',
    },
    asideClass: {
      type: String,
      default: '',
    },
  },
  methods: {
    handleAsideMouseOver() {
      this.$emit('aside-mouse-over')
    },
    handleAsideMouseLeave() {
      this.$emit('aside-mouse-leave')
    },
  },
}
</script>
