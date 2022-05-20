## Radio 多选组件
多选组件

### 基础表格
基础的表格展示用法。

::: demo

```html
<su-radio :data="data" v-model="radio" @change="change"></su-radio>
<script>
  export default {
    data() {
      return {
        data: [ {
          value: '0',
          label: '全部'
        },
        {
          value: '1',
          label: '选项1'
        },
        {
          value: '2',
          label: '选项2',
          disabled: true
        },
        {
          value: '3',
          label: '选项3',
          checked: true
        },
        {
          value: '4',
          label: '选项4'
        }],
        radio: '',
      }
    },
    methods: {
      change(a) {
        console.log(this.radio, 1111);
        console.log(a);
      },
    }
  }
</script>
```

:::


### Checkbox 多选组件参数

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| radio    | 绑定值 | string / number / boolean    | — | — |
| data    | 单选框数据 | object    | — | — |

### Table事件

| 参数      | 说明          | 参数      | 
|---------- |-------------- |---------- |
| change    | 改变单选值时回调 | —    |



