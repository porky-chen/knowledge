<!--
- Copyright (c) 2021 Guangdong Sun Railway Information Technology, Inc.
- All rights reserved.
-
- @author wenteng
-
- Description:
-
- Changelog:
-
- Revision:
-->

<template>
  <su-contentlayout asidewidth='270px'>
    <div slot='action' class='action-view'>
      主体内容顶栏
    </div>
    <div slot='main' class='main-view'>
      主体
    </div>
    <div slot='footer' class='footer-view'>
      底部
    </div>
    <div slot='filter' class='filter-view'>
      顶栏
    </div>
    <div slot='aside' class='aside-view'>
      侧栏
    </div>
    <div slot='asidetitle' class='aside-title-view'>
      侧栏title
    </div>
    <div slot='asideheader' class='aside-header-view'>
      <su-input />
    </div>
  </su-contentlayout>
</template>

<script>
export default {
  name: 'su-old-list',
}
</script>

<style scoped lang='scss'>

</style>
