## valudatecode 验证
当选项过多时，使用下拉菜单展示并选择内容。

### 基础用法
图形滑块方式验证  

::: demo


```html
<su-validate-code :codetype="1" @onSuccess="handleSuccess" @onError="handleError" :puzzleImgList="puzzleImgList"></su-validate-code>
<script>
  export default {
    data() {
      return {
        puzzleImgList: ['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604675448302&di=38e5fcaff8127a4610bda43ec238b252&imgtype=0&src=http%3A%2F%2Fa4.att.hudong.com%2F25%2F99%2F19300000421423134190997943822.jpg']
      }
    },
    methods: {
      handleError:()=>{
        console.log('error')
      },

      handleSuccess:()=>{
        console.log('success')
      }
    }
  }
</script>
```
:::
### 数字校验
数字方式校验  

::: demo


```html
<su-validate-code :codetype="2" :identifyCode="identifyCode"></su-validate-code>
<script>
  export default {
    data() {
      return {
        identifyCode: '7894',
      }
    },
    methods: {
      handleError:()=>{
        console.log('error')
      },

      handleSuccess:()=>{
        console.log('success')
      }
    }
  }
</script>
```
:::


### Checkbox 多选组件参数

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| codetype | 验证码的类型,1为拼图，2为字符 | Number | 1/2 | — |
| identifyCode | 字符类型是，验证码的 | boolean | true/false | false |
| puzzleImgList | 验证码拼图图片列表 | array | — | — |


### Table事件

| 参数      | 说明          | 参数      | 
|---------- |-------------- |---------- |
| onSuccess    | 验证成功回调，拼图验证码 | - |
| onError    | 验证失败回调，拼图验证码 | - |



