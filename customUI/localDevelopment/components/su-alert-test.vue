<template>
  <div class="alert-test">
    <h1>Message</h1>
    <div class="message-box">
      <el-button @click="messageAlert($t(`messageAlert.success`), 'success')"> 成功 </el-button>
      <el-button @click="messageAlert($t(`messageAlert.warning`), 'warning')"> 警告 </el-button>
      <el-button @click="messageAlert($t(`messageAlert.default`), 'default')"> 默认 </el-button>
      <el-button @click="messageAlert($t(`messageAlert.default`), 'info')"> info </el-button>
      <el-button @click="messageAlert($t(`messageAlert.error`), 'error')"> 错误 </el-button>
      <el-button @click="messageAlert($t(`messageAlert.error`), 'error', 3000, true)">
        居中
      </el-button>
    </div>
    <h1>Alert</h1>
    <h4>基本用法</h4>
    <su-alert title="成功提示的文案" type="success"> </su-alert>
    <su-alert title="消息提示的文案" type="info"> </su-alert>
    <su-alert title="警告提示的文案" type="warning"> </su-alert>
    <su-alert title="错误提示的文案" type="error"> </su-alert>
    <h4>自定义关闭按钮</h4>
    <su-alert title="消息提示的文案" type="info" :closable="false"> </su-alert>
    <su-alert title="消息提示的文案" type="info" close-text="知道了"> </su-alert>
    <su-alert title="消息提示的文案" type="info" show-icon> </su-alert>
    <h4>带有 icon</h4>
    <su-alert title="消息提示的文案" type="info" show-icon> </su-alert>
    <h4>居中</h4>
    <su-alert title="消息提示的文案" type="info" show-icon center> </su-alert>
    <h4>带有辅助性文字介绍</h4>
    <su-alert
      title="错误提示的文案"
      type="error"
      description="这是一句绕口令：黑灰化肥会挥发发灰黑化肥挥发"
    >
    </su-alert>
    <su-alert
      title="错误提示的文案"
      type="error"
      show-icon
      description="这是一句绕口令：黑灰化肥会挥发发灰黑化肥挥发"
    >
    </su-alert>
  </div>
</template>
 
<script>
import Methods from '../../src/utils/methods'
export default {
  computed: {
    content: function() {
      return this.$t(`buttons.${this.buttonType}`)
    },
  },
  methods: {
    messageAlert: Methods.messageAlert,
    onshow() {
      this.$message({
        showClose: true,
        message: '这是一条消息提示',
        duration: 100000,
        type: 'info',
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.alert-test {
  padding: 30px;
  > div {
    margin-bottom: 20px;
  }
}
</style>