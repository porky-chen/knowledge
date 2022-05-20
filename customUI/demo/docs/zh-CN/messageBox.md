## 消息提示框
模拟系统的消息提示框而实现的一套模态对话框组件，用于删除提示等重要场景。

### 基础用法
当用户进行操作时会被触发，该对话框中断用户操作，直到用户确认知晓后才可关闭。

::: demo 

```html
<el-row type="flex" align="middle">
  <su-button @click="clickdel" buttonType="del"/>
  <su-button @click="clickrelogin">重新登录</su-button>
  <su-button @click="clicknormal">普通弹窗</su-button>
</el-row>
<script>
  export default {
    computed:{
      content:function(){
        return this.$t(`buttons.${this.buttonType}`)
      }
    },
    methods: {
      clickdel:function(){
        this.$su.messagebox('del').then(()=>{
          console.log('success')
        })
      },
      clickrelogin:function(){
        this.$su.messagebox('relogin').then(()=>{
          console.log('success')
        })
      },
      clicknormal:function(){
        this.$su.messagebox('',
          '普通弹窗提示普通弹窗提示普通弹窗提示普通弹窗提示普通弹窗提示普通弹窗提示普通弹窗提示普通弹窗提示普通弹窗提示普通弹窗提示普通弹窗提示普通弹窗提示普通弹窗提示普通弹窗提示普通弹窗提示普通弹窗提示普通弹窗提示普通弹窗提示普通弹窗提示普通弹窗提示普通弹窗提示普通弹窗提示普通弹窗提示普通弹窗提示普通弹窗提示普通弹窗提示普通弹窗提示普通弹窗提示普通弹窗提示普通弹窗提示普通弹窗提示普通弹窗提示普通弹窗提示普通弹窗提示普通弹窗提示', 
          '普通提示', 
          '普通确定',
          '普通取消',
        ).then(()=>{
          console.log('success')
        })
      }
    }
  }
</script>
```
:::


### 提示消息框参数

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| type | 选择框的类型 | string | del relogin "" | — |
| tips    | 主体内容 | string    | — | — |
| title    | 标题 | string    | — | — |
| confirmButtonText    | 确定按钮 | string    | del relogin "" | — |
| cancelButtonText    | 取消按钮 | string    | del relogin "" | — |
