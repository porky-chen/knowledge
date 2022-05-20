<template>
  <su-navigator title='珠三角城际物资管理系统'
                user-name='李明'
                :menu-data='menuItems'
  >
    <!--    <div slot='navigatorRightView' style='display: inline-flex'>-->
    <!--      <su-button>啊手动阀</su-button>-->
    <!--    </div>-->
    <span slot='headerNotCollapse'>工程慧联中台</span>
    <!--    <img slot='headerNotCollapse' :src='image.logoWhite' />-->
    <img slot='headerCollapse' :src='image.pureLogo' />
    <router-view slot='main' />
  </su-navigator>
</template>

<script>
import pureLogo from './assets/pure_logo.png'
import logoWhite from './assets/logo_white.png'
import portrait from './assets/portrait.jpg'

let icon1 = 'http://192.168.0.56:9698//image//construction/2021/11/d53a94b6bfce420b9097508433e7eacf.png'
let icon2 = 'http://192.168.0.56:9698//image//construction/2021/11/fd239839ff8046d3bd6d022d370a4413.png'

let icon3 = 'http://192.168.0.56:9698//image//construction/2021/12/2142e64f9e3d4e2e988f64be85650631.png'

let menuFileUrl = icon1
let menuActiveFileUrl = icon2

export default {
  name: 'App',
  components: {},
  methods: {
    toggleMenuCollapse() {
      this.isCollapse = !this.isCollapse
      this.$refs.menu.toggleCollapse()
    },
  },
  data() {
    return {
      image: {
        pureLogo,
        logoWhite,
        portrait,
      },
      isCollapse: false,

      menuItems: [
        {
          menuName: '一级目录得了0',
          menuId: '0010',
          fileUrl: 'http://192.168.0.56:8300/admin/image/appService/menu/0203/2021/12/6e96168166cf4ec382306a85b50b63bc.png',
          activeFileUrl: 'http://192.168.0.56:8300/admin/image/appService/menu/0203/2021/12/6e96168166cf4ec382306a85b50b63bc.png',
          // menuAction: '/table10',
          menuAction: '#/table10',
          customSelect: () => {
            console.log('custom select---')
          },
        },
        {
          menuName: '一级目录得了1',
          menuId: '001',
          menuAction: '/001',
          fileUrl: 'http://192.168.0.56:8300/admin/image/appService/menu/0203/2021/12/29ecf63bff924bc9b602d37ed2851569.png',
          activeFileUrl: 'http://192.168.0.56:8300/admin/image/appService/menu/0203/2021/12/29ecf63bff924bc9b602d37ed2851569.png',
          children: [
            {
              menuName: '二级目录得了1',
              menuId: '0011',
              menuAction: '/table11',
            },
            {
              menuName: '二级目录得了2',
              menuId: '0012',
              menuAction: '/table12',
            },
            {
              menuName: '二级目录得了3',
              menuId: '0013',
              menuAction: '/table13',
            },
          ],
        },
        {
          menuName: '一级目录得了2',
          menuId: '002',
          menuAction: '/002',
          fileUrl: menuFileUrl,
          activeFileUrl: menuActiveFileUrl,
          children: [
            {
              menuName: '二级目录得了1',
              menuId: '0021',
              menuAction: '/table21',
            },
            {
              menuName: '二级目录得了2',
              menuId: '0022',
              menuAction: '/table22',
            },
            {
              menuName: '二级目录得了3',
              menuId: '0023',
              menuAction: '/table23',
            },
          ],
        },
        {
          menuName: '一级目录得了3',
          menuId: '003',
          menuAction: '/003',
          fileUrl: menuFileUrl,
          activeFileUrl: menuActiveFileUrl,
          children: [
            {
              menuName: '二级目录得了1',
              menuId: '0031',
              menuAction: '/table31',
            },
            {
              menuName: '二级目录得了2',
              menuId: '0032',
              menuAction: '/table32',
            },
            {
              menuName: '二级目录得了3',
              menuId: '0033',
              menuAction: '/table33',
            },
          ],
        },
        {
          menuName: '海康视频组件',
          menuId: '0040',
          fileUrl: menuFileUrl,
          activeFileUrl: menuActiveFileUrl,
          menuAction: '/su-ezuikit-page',
        },
      ],
    }
  },
}
</script>

<style scoped lang='scss'>
//::v-deep .su-layout-aside-box,
//::v-deep .su-layout-aside-header {
//  background-color: #11223E;
//}

.layout-aside-header {
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  .aside-header-img {

  }

  .aside-header-collapse-img {
    width: 30px;
    height: 30px;
  }

  .icon {
    margin-bottom: 3px;
    cursor: pointer;
    height: 18px;
    width: 18px;
  }
}

.layout-filter {
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
    text-align: right;
    float: right;

    .user-info-dropdown-view {
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

<style>
#app {
  /*font-family: Avenir, Helvetica, Arial, sans-serif;*/
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%
}

body {
  overflow: auto !important;
}
</style>
