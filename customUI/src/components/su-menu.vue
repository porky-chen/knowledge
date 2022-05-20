<!--
  - Copyright © 2020 Guangdong Sun Railway Information Technology, Inc.
  - All rights reserved.
  -
  - @author: wu jiajin <wujiajin@sunengineering.cn>
  - @description 侧菜单栏
  -
  - Changelog:
  - Revision 1.0 2020-06-01 wu jiajin
  - - 初始化
  -->
<template>
  <div class='su-menu' :class="{'su-menu-collapse': isCollapse}">
    <div :class='className' v-if='caretVisible' @click='handleClick'>
      <i :class='icon'></i>
    </div>

    <el-menu
      :default-active='$route.fullPath'
      :collapse='isCollapse'
      :unique-opened='true'
      :collapse-transition='false'
      @select='handleSelectMenu'
    >
      <template v-for='item of data'>
        <el-submenu
          v-if='item.children'
          :key='item.menuId'
          :index='item.menuId'
          popper-class='su-menu-popover-class'
        >
          <template slot='title'>
            <div class='su-menu-icon'>
              <!-- <img v-show="item.fileUrl" class="normal-img" :src="item.fileUrl" />
              <img
                v-show="item.activeFileUrl || item.fileUrl"
                class="active-img"
                :src="item.activeFileUrl || item.fileUrl"
              /> -->
              <i
                class='icon'
                v-show='item.fileUrl'
                :style='{maskImage: `url(${item.fileUrl})`}'
              ></i>
            </div>
            <span slot='title' class='menu-name'>{{ item.menuName }}</span>
          </template>

          <el-menu-item
            v-for='child of item.children'
            :key='child.menuId'
            :index='child.menuAction'
          >
            <!--            <img :src="child.fileUrl">-->
            <span slot='title' class='menu-name'>{{ child.menuName }}</span>
          </el-menu-item>
        </el-submenu>

        <el-menu-item v-else :index='item.menuAction' :key='item.menuId'>
          <div class='su-menu-icon'>
            <!-- <img v-show='item.fileUrl' class='normal-img' :src='item.fileUrl' />
            <img v-show='item.activeFileUrl || item.fileUrl' class='active-img' :src='item.activeFileUrl || item.fileUrl' /> -->
            <i class='icon' v-show='item.fileUrl' :style='{maskImage: `url(${item.fileUrl})`}'></i>
          </div>

          <div class='su-menu-item-title'>{{ item.menuName }}</div>
          <!--          <span slot='title' class='menu-name'>{{ item.menuName }}</span>-->
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import {Menu, MenuItem, Submenu} from 'element-ui'

export default {
  name: 'su-menu',
  components: {
    'el-menu': Menu,
    'el-menu-item': MenuItem,
    'el-submenu': Submenu,
  },
  props: {
    data: {
      type: Array,
      default() {
        return []
      },
    },
    caretVisible: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      className: 'su-menu-hidebtn',
      isCollapse: true,
      icon: 'el-icon-caret-right',
    }
  },
  computed: {
    routeActivePath() {
      let activePath = this.$route.path

      // 路由父子集关系找非home的跟节点
      let matchedPath = this.$route.matched.find(item => item.path === activePath)
      if (matchedPath) {
        let parentPath = matchedPath.parent
        while (parentPath && parentPath.path !== '/home') {
          activePath = parentPath.path
          parentPath = parentPath.parent
        }
      }

      return activePath
    },
  },
  methods: {
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },

    clearPoundChar(content) {
      if (!content) return content
      else return content.replace('#', '')
    },

    openCollapse() {
      this.isCollapse = true
    },
    closeCollapse() {
      this.isCollapse = false
    },

    handleClick() {
      this.isCollapse = !this.isCollapse
      this.className = this.isCollapse ? 'su-menu-hidebtn' : 'su-menu-hidebtn'
      // 改变图标
      this.icon = this.isCollapse ? 'el-icon-caret-right' : 'el-icon-caret-left'
      this.$emit('collapse', this.isCollapse)
    },

    handleSelectMenu(index, indexPath) {
      // 以#符号开头的视为自定义行为
      if (index.indexOf('#') === 0) {
        let menuItem = this.data.find(item => item.menuAction === index)
        if (menuItem && menuItem.customSelect && typeof menuItem.customSelect === 'function') {
          menuItem.customSelect({index, indexPath, menuItem})
        }
        return
      }
      // 相同路径则不进行调整
      if (this.$route.fullPath === index) {
        return
      }
      this.$router.push(index)
    },
  },
}
</script>

