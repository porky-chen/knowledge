## 消息提示框
常用于主动操作后的反馈提示。与 MessageBox  的区别是后者更多用于删除等关键通知的提醒。

### 基础用法
从顶部出现，3 秒后自动消失。

::: demo 

```html
<el-row style="flex-wrap:wrap" type="flex"  align="middle">
  <el-col style="display:flex;margin-bottom:20px" :span="12">
    <el-button @click="messageAlert($t(`messageAlert.success`),'success')">{{$t('dialog.btn')}}</el-button>
  </el-col>
</el-row>
<script>
  export default {
    computed:{
      content:function(){
        return this.$t(`buttons.${this.buttonType}`)
      }
    },
    methods: {
      ...window.$su.methods,
    }
  }
</script>
```
:::

### 不同的状态
用于添加保存表单成功后的提示，用来显示成功、警告、消息、错误 类的操作反馈。

::: demo

```html
<el-row style="flex-wrap:wrap" type="flex"  align="middle">
  <el-col style="display:flex;margin-bottom:20px" :span="12">
    <p style="width:80px">{{$t(`messageAlert.successLabel`)}}</p>
    <el-button @click="messageAlert($t(`messageAlert.success`),'success')">{{$t('dialog.btn')}}</el-button>
  </el-col>
  <el-col style="display:flex;margin-bottom:20px" :span="12">
    <p style="width:80px">{{$t(`messageAlert.warningLabel`)}}</p>
    <el-button @click="messageAlert($t(`messageAlert.warning`),'warning')">{{$t('dialog.btn')}}</el-button>
  </el-col>
  <el-col style="display:flex;margin-bottom:20px" :span="12">
    <p style="width:80px">{{$t(`messageAlert.defaultLabel`)}}</p>
    <el-button @click="messageAlert($t(`messageAlert.default`),'default')">{{$t('dialog.btn')}}</el-button>
  </el-col>
  <el-col style="display:flex;margin-bottom:20px" :span="12">
    <p style="width:80px">{{$t(`messageAlert.errorLabel`)}}</p>
    <el-button @click="messageAlert($t(`messageAlert.error`),'error')">{{$t('dialog.btn')}}</el-button>
  </el-col>
</el-row>
<script>
  export default {
    computed:{
      content:function(){
        return this.$t(`buttons.${this.buttonType}`)
      }
    },
    methods: {
      ...window.$su.methods,
    }
  }
</script>
```
:::

### 提示消息框参数

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| message    | 弹框提示文字 | string    | — | — |
| type | 弹框提示类型 | string | success、warning、error、null | null |
