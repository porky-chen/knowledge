<template>
  <su-contentlayout>
    <!-- <div slot="action" style="background: blue;height: 60px">主体内容顶栏</div> -->
    <div slot='main' style='background: #fff'>
      <router-view></router-view>
    </div>
    <!-- <div slot="footer"  style="background: yellow;">底部</div> -->
    <div slot='filter' style='background: #c2d1e2'>顶栏</div>
    <div slot='aside' style='background: #e6e9ed'>
      <su-menu style='width: 100%; height: 100%' :data='menuItems' @collapse='collapse' />
    </div>
    <div slot='asideheader' style='background: gray'>logo</div>
  </su-contentlayout>
</template>

<script>
export default {
  data() {
    return {
      menuItems: [
        // {
        //   menuName: 'layout',
        //   menuId: 'layout',
        //   menuAction: '/layout',
        // },
        {
          menuName: '警告提示（晓令）',
          menuId: 'alert',
          menuAction: '/alert',
        },
        {
          menuAction: '/menu',
          menuId: 'menu',
          menuName: '菜单',
        },
        {
          menuAction: '/navigator',
          menuId: 'navigator',
          menuName: '导航',
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
        // {
        //   menuAction: '/cascader',
        //   menuId: 'cascader',
        //   menuName: '级联选择器',
        // },
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
        // {
        //   menuAction: '/image-upload',
        //   menuId: 'image-upload',
        //   menuName: '图片上传',
        // },
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
      tabIndex: 0,
    }
  },
  methods: {
    collapse(value) {
      this.$refs.container.collapse(value)
    },
  },
}
</script>

<style lang='scss' scoped>
::v-deep .su-menu-hidebtn {
  display: none !important;
}
</style>
