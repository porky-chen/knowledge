<template>
  <div class="dialog-test">
    <h1>抽屉</h1>
    <su-button @click="visible = true">点击显示抽屉</su-button>
    <su-drawer
      @drawerClose="close"
      :modal="modal"
      :visible.sync="visible"
      :width="width"
      direction="rtl"
    >
      <header slot="header">管线迁改台账详情</header>
      <section slot="content">
        <div style="height: 1800px; background: #f0f2f5">内容</div>
      </section>
    </su-drawer>
    <h1>弹窗</h1>
    <h6>常用宽度480px、760px、860px、960px、1200px</h6>
    <su-button
      style="float: none"
      @click="
        dialogVisible = true
        width = '480px'
        height = '300px'
      "
      >弹窗-width:480px</su-button
    >
    <su-button
      style="float: none"
      @click="
        dialogVisible = true
        width = '760px'
        height = '300px'

      "
      >弹窗-width:760px</su-button
    >
    <su-button
      style="float: none"
      @click="
        dialogVisible = true
        width = '860px'
        height = '300px'

      "
      >弹窗-width:860px</su-button
    >
    <su-button
      style="float: none"
      @click="
        dialogVisible = true
        width = '960px'
        height = '300px'

      "
      >弹窗-width:960px</su-button
    >
    <h6>根据内容而定，最大高度868px，达到最大高度时，弹窗显示滚动条</h6>
    <su-button
      style="float: none"
      @click="
        dialogVisible = true
        height = '960px'
      "
      >弹窗-height:960px</su-button
    >
    <su-dialog
      :dialogVisible="dialogVisible"
      :dialogTitle="dialogTitle"
      :showDialogBtns="false"
      :dialogWidth="width"
      @dialogClose="close"
      @dialogSuccess="close"
    >
      <div slot="header">{{ dialogTitle }}</div>
      <div slot="content">
        <div :style="{height: height, background: '#f0f2f5'}">内容</div>
      </div>
      <div slot="btns">
        <su-button type="primary" :plain="true" >取消</su-button>
        <su-button type="primary" :plain="true" >确定</su-button>
      </div>
    </su-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modal: true,
      visible: false,
      dialogTitle: '管线迁改台账详情',
      dialogVisible: false,
      width: '760px',
      height: '300px',
    }
  },
  methods: {
    close() {
      this.visible = false
      this.dialogVisible = false
    },
  },
}
</script>

<style lang="scss" scoped>
.dialog-test {
  padding: 30px;
}
</style>