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
  <su-contentlayout class='su-menu-test-view' style='height: 853px'>
    <div slot='aside' style='background: #e6e9ed'>
      <su-menu style='width: 100%; height: 100%' :data='menuItems' @collapse='collapse' />
    </div>
  </su-contentlayout>
</template>

<script>
export default {
  name: 'su-menu-test',
  methods: {
    collapse(value) {
      this.$refs.container.collapse(value)
    },
  },
  created() {
    console.log('su-menu-test')
  },
  data() {
    return {
      menuItems: [
        {
          menuName: '警告提示（晓令）',
          menuId: 'alert',
        },
        {
          menuId: 'menu',
          menuName: '菜单',
        },
        {
          menuId: 'navigator',
          menuName: '导航',
        },
        {
          menuId: 'avatar',
          menuName: '头像（晓令）',
        },
        {
          menuId: 'button',
          menuName: '按钮（晓令）',
        },
        {
          menuId: 'dialog',
          menuName: '对话框-抽屉（晓令）',
        },
        {
          menuId: 'upload',
          menuName: '附件上传-图片PDF预览（温腾）',
        },
        {
          menuId: 'input',
          menuName: '输入框（温腾）',
        },
        {
          menuId: 'select',
          menuName: '选择器（温腾）',
        },
        {
          menuId: 'tree',
          menuName: '树形组件（温腾）',
        },
        {
          menuId: 'date',
          menuName: '日期选择器（泽豪）',
        },
        {
          menuId: 'tooltip',
          menuName: 'tooltip提示（泽豪）',
        },
        {
          menuId: 'radio',
          menuName: '单选框（泽豪）',
        },
        {
          menuId: 'switch-checkbox',
          menuName: '开关-多选框（温腾）',
        },
        {
          menuId: 'table',
          menuName: '表格-分页（温腾）',
        },
        {
          menuId: 'tabs',
          menuName: '标签页（晓令）',
        },
      ],
    }
  },
}
</script>

<style scoped lang='scss'>

</style>
