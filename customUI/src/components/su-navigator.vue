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
  <su-contentlayout
    :asidewidth='!isCollapse ? "200px" : "58px"'
    :class='{
      "su-collapse-hover" : isCollapseByHover,
      "su-collapse" : isCollapse,
      "su-collapse-not-hover" : isCollapse && !isCollapseByHover
    }'
    @aside-mouse-over='handleAsideMouseOver'
    @aside-mouse-leave='handleAsideMouseLeave'
    aside-class='navigator-layout-aside'
  >
    <div slot='filter' class='navigator-layout-filter'>
      <!--      <div class='filter-icon' v-if='isCollapse'>-->
      <!--        <svg @click='toggleMenuCollapse'-->
      <!--             t='1636442037889' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='6328' width='128' height='128'>-->
      <!--          <path-->
      <!--            d='M945.607 439.41H77.483c-40.05 0-72.704 32.768-72.704 72.704 0 40.05 32.768 72.704 72.704 72.704h868.124c40.05 0 72.704-32.768 72.704-72.704 0-39.936-32.768-72.704-72.704-72.704z m-0.341 327.338H77.14c-40.05 0-72.704 32.768-72.704 72.704 0 40.05 32.768 72.704 72.704 72.704h868.125c40.05 0 72.704-32.768 72.704-72.704 0-40.05-32.654-72.704-72.704-72.704z m1.138-651.377H78.279c-40.05 0-72.704 32.768-72.704 72.704 0 40.05 32.768 72.704 72.704 72.704h868.125c40.05 0 72.704-32.768 72.704-72.704 0-40.05-32.768-72.704-72.704-72.704z'-->
      <!--            p-id='6329' fill='#2c2c2c'></path>-->
      <!--        </svg>-->
      <!--      </div>-->
      <span>{{ title }}</span>

      <div class='layout-filter-right-view'>
        <div style='flex: 1' />
        <div class='custom-layout-right-view'>
          <slot name='navigatorRightView'></slot>
        </div>
        <su-dropdown class='user-info-dropdown-view'
                     v-bind='filterAttributes({
                        targetObj: $attrs,
                        includePrefixes: ["dropdown-"]
                     })'
                     :trigger='dropdownTrigger'
                     v-on='filterAttributes({
                        targetObj: $listeners,
                        excludePrefixes: ["command"]
                     })'
                     @command='handleDropdownMenuCommandEvent'
        >
          <div class='user-info-view'>
            <div class='user-portrait'>
              <img :src='userPortrait || defaultMaleAvatar' />
            </div>
            <div class='user-name'>{{ userName }}</div>
            <i class='el-icon-arrow-down' />
          </div>

          <el-dropdown-menu slot='dropdown'
                            class='user-info-dropdown-menu-view'
          >
            <div class='user-info-view'>
              <img :src='userPortrait || defaultMaleAvatar' />
              <div class='user-title'>{{ userName }}</div>
            </div>
            <el-dropdown-item class='item-view' command='userInfo' v-if='showUserInfo'>
              <su-button icon='el-icon-user' type='text'> 个人信息</su-button>
              <i class='right-icon el-icon-arrow-right' />
            </el-dropdown-item>
            <el-dropdown-item class='item-view' command='resetPassword' v-if='showResetPassword'>
              <su-button icon='el-icon-lock' type='text'> 修改密码</su-button>
              <i class='right-icon el-icon-arrow-right' />
            </el-dropdown-item>
            <el-dropdown-item class='item-view' command='signOut' v-if='showSignOut'>
              <su-button icon='el-icon-switch-button' type='text'> 退出登录</su-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </su-dropdown>
      </div>
    </div>

    <div slot='asideheader' class='navigator-layout-aside-header'>
      <!--      展开状态下的内容-->
      <div class='aside-header' v-if='!isCollapse || isCollapseByHover'>
        <slot name='headerNotCollapse' />
      </div>

      <!--      收起状态下的内容-->
      <div class='aside-header-collapse' v-if='isCollapse && !isCollapseByHover'>
        <div class='toggle-collapse-button'>
          <svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='24px' height='24px' viewBox='0 0 24 24' version='1.1' class='svg replaced-svg'>
            <g stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'>
              <polygon points='0 0 24 0 24 24 0 24'></polygon>
              <path class='right-path-1'
                    d='M5.29288961,6.70710318 C4.90236532,6.31657888 4.90236532,5.68341391 5.29288961,5.29288961 C5.68341391,4.90236532 6.31657888,4.90236532 6.70710318,5.29288961 L12.7071032,11.2928896 C13.0856821,11.6714686 13.0989277,12.281055 12.7371505,12.675721 L7.23715054,18.675721 C6.86395813,19.08284 6.23139076,19.1103429 5.82427177,18.7371505 C5.41715278,18.3639581 5.38964985,17.7313908 5.76284226,17.3242718 L10.6158586,12.0300721 L5.29288961,6.70710318 Z'
                    fill='#000000' fill-rule='nonzero' transform='translate(8.999997, 11.999999) scale(-1, 1) translate(-8.999997, -11.999999)'></path>
              <path class='right-path-2'
                    d='M10.7071009,15.7071068 C10.3165766,16.0976311 9.68341162,16.0976311 9.29288733,15.7071068 C8.90236304,15.3165825 8.90236304,14.6834175 9.29288733,14.2928932 L15.2928873,8.29289322 C15.6714663,7.91431428 16.2810527,7.90106866 16.6757187,8.26284586 L22.6757187,13.7628459 C23.0828377,14.1360383 23.1103407,14.7686056 22.7371482,15.1757246 C22.3639558,15.5828436 21.7313885,15.6103465 21.3242695,15.2371541 L16.0300699,10.3841378 L10.7071009,15.7071068 Z'
                    fill='#000000' fill-rule='nonzero' opacity='0.3' transform='translate(15.999997, 11.999999) scale(-1, 1) rotate(-270.000000) translate(-15.999997, -11.999999)'></path>
            </g>
          </svg>
        </div>
        <!--        <slot name='headerCollapse'>-->
        <!--          <img :src='pureLogo' />-->
        <!--        </slot>-->
      </div>

      <!--      展开状态下的内容-->
      <div v-if='!isCollapse || isCollapseByHover' class='icon-view'>
        <div class='toggle-collapse-button' @click='toggleMenuCollapse'>
          <svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='24px' height='24px' viewBox='0 0 24 24' version='1.1' class='svg replaced-svg'>
            <g stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'>
              <polygon points='0 0 24 0 24 24 0 24'></polygon>
              <path class='right-path-1'
                    d='M5.29288961,6.70710318 C4.90236532,6.31657888 4.90236532,5.68341391 5.29288961,5.29288961 C5.68341391,4.90236532 6.31657888,4.90236532 6.70710318,5.29288961 L12.7071032,11.2928896 C13.0856821,11.6714686 13.0989277,12.281055 12.7371505,12.675721 L7.23715054,18.675721 C6.86395813,19.08284 6.23139076,19.1103429 5.82427177,18.7371505 C5.41715278,18.3639581 5.38964985,17.7313908 5.76284226,17.3242718 L10.6158586,12.0300721 L5.29288961,6.70710318 Z'
                    fill='#000000' fill-rule='nonzero' transform='translate(8.999997, 11.999999) scale(-1, 1) translate(-8.999997, -11.999999)'></path>
              <path class='right-path-2'
                    d='M10.7071009,15.7071068 C10.3165766,16.0976311 9.68341162,16.0976311 9.29288733,15.7071068 C8.90236304,15.3165825 8.90236304,14.6834175 9.29288733,14.2928932 L15.2928873,8.29289322 C15.6714663,7.91431428 16.2810527,7.90106866 16.6757187,8.26284586 L22.6757187,13.7628459 C23.0828377,14.1360383 23.1103407,14.7686056 22.7371482,15.1757246 C22.3639558,15.5828436 21.7313885,15.6103465 21.3242695,15.2371541 L16.0300699,10.3841378 L10.7071009,15.7071068 Z'
                    fill='#000000' fill-rule='nonzero' opacity='0.3' transform='translate(15.999997, 11.999999) scale(-1, 1) rotate(-270.000000) translate(-15.999997, -11.999999)'></path>
            </g>
          </svg>
        </div>
      </div>
    </div>

    <div slot='aside' class='navigator-layout-aside-view'>
      <su-menu ref='menu'
               style='width: 100%; height: 100%'
               :data='menuData'
               :caret-visible='false'
      />
    </div>

    <div slot='main'>
      <slot name='main'>
        <router-view />
      </slot>
    </div>
  </su-contentlayout>
</template>

<script>
import defaultMaleAvatar from '@/assets/avatar/ic_male.png'
import defaultFemaleAvatar from '@/assets/avatar/ic_female.png'
import pureLogo from '@/assets/pure_logo.png'
import suComponent from '@/mixins/su-component'

export default {
  name: 'su-navigator',
  mixins: [suComponent],
  props: {
    menuData: {
      type: Array,
      default: () => {
        return []
      },
    },

    title: {
      type: String,
      default: '这是系统的标题',
    },

    userPortrait: {
      type: String,
      default: null,
    },
    userName: {
      type: String,
      default: null,
    },

    dropdownTrigger: {
      type: String,
      default: 'click',
    },

    showUserInfo: {
      type: Boolean,
      default: true,
    },
    showResetPassword: {
      type: Boolean,
      default: true,
    },
    showSignOut: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      // 菜单的收起、展开。
      isCollapse: true,
      // 菜单的收起，展开。通过鼠标悬浮触发。
      isCollapseByHover: false,

      defaultMaleAvatar,
      defaultFemaleAvatar,
      pureLogo,
    }
  },
  methods: {
    toggleMenuCollapse() {
      this.isCollapse = !this.isCollapse
      if (this.isCollapse) {
        this.$refs.menu?.closeCollapse()
      }
    },

    handleDropdownMenuCommandEvent(commandContent) {
      this.$emit('dropdownCommand', commandContent)
    },

    // 鼠标移入。
    handleAsideMouseOver() {
      if (!this.isCollapse) {
        return
      }
      this.isCollapseByHover = true
      this.$refs.menu?.closeCollapse()
    },
    handleAsideMouseLeave() {
      if (!this.isCollapse) {
        return
      }
      this.isCollapseByHover = false
      this.$refs.menu?.openCollapse()
    },
  },
}
</script>

<style scoped lang='scss'>
::v-deep .navigator-layout-aside {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  z-index: 99999;
}

.su-collapse-hover {
  ::v-deep .navigator-layout-aside {
    width: 200px !important;
  }
}

.su-collapse-not-hover {
  .toggle-collapse-button {
    transform: rotate(180deg);
    -webkit-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    -o-transform: rotate(180deg);
  }
}
</style>

<style scoped lang='scss'>
.navigator-layout-aside-view,
.navigator-layout-aside-header {
  background-color: #1E1E2D;
}

.navigator-layout-aside-header {
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  .toggle-collapse-button {
    cursor: pointer;
  }

  .aside-header {
    font-size: 20px;
    font-weight: 700;
    text-align: center;
    color: #ffffff;
    display: flex;
    height: 100%;
    align-items: center;
    line-height: 26px;
  }

  .aside-header-collapse {
    ::v-deep img {
      width: 30px;
      height: 30px;
    }

    .right-path-1 {
      fill: #3699FF;
    }

    .right-path-2 {
      fill: rgba(54, 153, 255, 0.3);
    }
  }

  .icon-view {
    display: flex;
    height: 100%;
    align-items: center;

    .icon {
      cursor: pointer;
      height: 18px;
      width: 18px;
    }

    .toggle-collapse-button {
      .right-path-1 {
        fill: #ffffff;
      }

      .right-path-2 {
        fill: rgba(255, 255, 255, 0.3);
      }

      &:hover {
        .right-path-1 {
          fill: #3699FF;
        }

        .right-path-2 {
          fill: rgba(54, 153, 255, 0.3);
        }
      }
    }
  }
}

.navigator-layout-filter {
  display: flex;
  align-items: center;

  span {
    margin-left: 20px;
    font-size: 20px;
    font-weight: 700;
    text-align: left;
    color: #333752;
    line-height: 21px;
  }

  .filter-icon {
    display: flex;
    background: rgba(215, 219, 236, 0.5);
    border-radius: 0 5px 5px 0;
    padding: 5px 12px;

    .icon {
      cursor: pointer;
      height: 18px;
      width: 18px;
    }
  }

  .layout-filter-right-view {
    flex: 1;
    //text-align: right;
    //float: right;
    display: flex;
    flex-direction: row;
    //justify-content: end;

    .custom-layout-right-view {
      display: inline-flex;
    }

    .user-info-dropdown-view {
      display: inline-flex;
      margin-right: 25px;
      margin-top: 5px;
    }
  }
}

.user-info-dropdown-menu-view {
  .item-view {
    height: 40px;
    line-height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .el-button {
      padding: 0 !important;
    }

    ::v-deep .el-button--text {
      color: #3d434d;
    }
  }

  .item-view:hover {
    ::v-deep .el-button--text {
      color: #3b86ff;
    }
  }

  .user-info-view {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px 18px 18px;
    width: 170px;
    border-bottom: 1px solid #dde2ee;
    margin-bottom: 12px;

    img {
      width: 40px;
      height: 40px;
      border-radius: 48px;
    }

    .user-title {
      color: #3d434d;
      font-size: 18px;
      margin-left: 12px;
    }
  }
}

.user-info-dropdown-view {
  .user-info-view {
    display: flex;
    cursor: pointer;
    align-items: center;

    .user-name {
      margin-left: 12px;
      font-size: 14px;
      color: #5a607f;
      line-height: 20px;
    }

    i {
      margin-left: 12px;
    }

    .user-portrait {
      img {
        border-radius: 18px;
        width: 36px;
        height: 36px;
      }
    }
  }
}

</style>
