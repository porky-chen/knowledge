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
  <su-contentlayout style='height: 853px'>
    <div slot='main' style='background: #fff'>
      这是main区域
    </div>
    <div slot='filter' style='background: #c2d1e2'>
      这是filter区域
    </div>
    <div slot='aside' style='background: #e6e9ed'>
      这是aside区域
    </div>
    <div slot='asideheader' style='background: gray'>
      这是asideheader区域
    </div>
  </su-contentlayout>
</template>

<script>
export default {
  name: 'su-navigator-test',
  methods: {
    collapse(value) {
      this.$refs.container.collapse(value)
    },
  },
  data() {
    return {
      menuItems: [
        {
          menuName: '警告提示（晓令）',
          menuId: 'alert',
          menuAction: '/alert',
        },
        {
          menuAction: '/menu',
          menuId: 'menu',
          menuName: '头像',
        },
        {
          menuAction: '/navigator',
          menuId: 'navigator',
          menuName: '头像',
        },
        {
          menuAction: '/avatar',
          menuId: 'avatar',
          menuName: '头像（晓令）',
        },
        {
          menuAction: '/button',
          menuId: 'button',
          menuName: '按钮（晓令）',
        },
        {
          menuAction: '/dialog',
          menuId: 'dialog',
          menuName: '对话框-抽屉（晓令）',
        },
        {
          menuAction: '/upload',
          menuId: 'upload',
          menuName: '附件上传-图片PDF预览（温腾）',
        },
        {
          menuAction: '/input',
          menuId: 'input',
          menuName: '输入框（温腾）',
        },
        {
          menuAction: '/select',
          menuId: 'select',
          menuName: '选择器（温腾）',
        },
        {
          menuAction: '/tree',
          menuId: 'tree',
          menuName: '树形组件（温腾）',
        },
        {
          menuAction: '/date',
          menuId: 'date',
          menuName: '日期选择器（泽豪）',
        },
        {
          menuAction: '/tooltip',
          menuId: 'tooltip',
          menuName: 'tooltip提示（泽豪）',
        },
        {
          menuAction: '/radio',
          menuId: 'radio',
          menuName: '单选框（泽豪）',
        },
        {
          menuAction: '/switch-checkbox',
          menuId: 'switch-checkbox',
          menuName: '开关-多选框（温腾）',
        },
        {
          menuAction: '/table',
          menuId: 'table',
          menuName: '表格-分页（温腾）',
        },
        {
          menuAction: '/tabs',
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
