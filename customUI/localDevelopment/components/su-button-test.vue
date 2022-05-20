<template>
  <div class="test-button">
    <h1>线性图文按钮</h1>
    <su-button buttonType="edit" @click="onClick" />
    <su-button buttonType="edit" :disabled="true" />
    <h1>线性按钮</h1>
    <su-button type="primary" :plain="true" @click="onClick">常规</su-button>
    <su-button type="primary" :plain="true" :disabled="true">常规</su-button>
    <h1>线性按钮</h1>
    <su-button type="">自定义</su-button>
    <su-button type="" :disabled="true">自定义</su-button>
    <h1>线性下拉按钮</h1>
    <div style="width: 100px;padding-left: 30px">
      <su-dropdown  style="width: 120px"></su-dropdown>
      <!-- <su-dropdown type="text"></su-dropdown>
      <su-dropdown type="button"></su-dropdown>
      <su-dropdown type="primary"></su-dropdown>
      <su-dropdown type="button" :splitButton="true"></su-dropdown>
      <su-dropdown type="text" :splitButton="true"></su-dropdown>
      <su-dropdown
        type="primary"
        :splitButton="true"
        @click="onClick"
        @command="oncommand"
      ></su-dropdown> -->
    </div>
    <h1>文字按钮</h1>
    <su-button type="text">测试按钮</su-button>
    <su-button type="text" :disabled="true">测试按钮</su-button>
    <h1>超链接</h1>
    <su-button type="text" :isLink="true">测试按钮</su-button>
    <su-button type="text" :isLink="true" :disabled="true">测试按钮</su-button>
    <h1>警告按钮</h1>
    <su-button type="danger" :plain="true">测试按钮</su-button>
    <su-button type="danger" :plain="true" :loading="true">测试按钮</su-button>
    <su-button type="danger" :plain="true" :disabled="true">测试按钮</su-button>
    <h1>图标按钮</h1>
    <su-button type="text" icon="el-icon-edit-outline" plain></su-button>
    <su-button type="text" icon="el-icon-delete" plain :disabled="true"></su-button>

    <h1>加载中</h1>
    <su-button type="text" :loading="true">加载中</su-button>
    <su-button type="primary" :plain="true" :loading="true">加载中</su-button>
    <su-button type="primary" :loading="true">加载中</su-button>
    <su-button type="" :loading="true">加载中</su-button>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    onClick(e) {
      console.log('click', e)
    },
    oncommand(e) {
      console.log('command', e)
    },
  },
}
</script>

<style lang="scss" scoped>
.test-button {
  padding: 30px;
  > div {
    margin-right: 50px;
    display: flex;
    flex-direction: column;
    > div {
      margin-bottom: 10px;
    }
    ::v-deep .el-button {
      margin-left: 0 !important;
      margin-top: 10px;
    }
  }
}
</style>