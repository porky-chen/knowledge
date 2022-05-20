## 审批状态组件
approve status 审批状态

### 示例  

::: demo 

```html
<el-row>
  <el-col :span="8"><su-approve-status :data="info" @btn-click="handleClick"></su-approve-status></el-col>
  <el-col :span="8"><su-approve-status :data="info2" @btn-click="handleClick"></su-approve-status></el-col>
  <el-col :span="8"><su-approve-status :data="info3" @btn-click="handleClick"></su-approve-status></el-col>
</el-row>

<script>
  export default {
    data() {
      return {
        info: {
          name: '林青霞',
          status: 'success',
          durationFormat: '2小时',
          },
        info2: {
          name: '林青霞',
          status: 'process',
          durationFormat: '2小时',
        },
        info3: {
          name: '林青霞',
          status: 'error',
          durationFormat: '2小时',
        },
      }
    },
    methods: {
      handleClick (value) {
        alert('111')
      }
    }
  }
</script>
```
:::

### 审批状态组件参数

| 参数 | 说明         | 类型   | 可选值 | 默认值 |
| ---- | ------------ | ------ | ------ | ------ |
| data | 审批状态数据 | object | —      | —      |

### data参数

| 参数           | 说明       | 类型   | 可选值                                                | 默认值 |
| -------------- | ---------- | ------ | ----------------------------------------------------- | ------ |
| name           | 审批人名称 | String | —                                                     | —      |
| status         | 审批状态   | sring  | success（已通过），error（已驳回），process（审核中） | —      |
| durationFormat | 耗时       | sring  | —                                                     | —      |

