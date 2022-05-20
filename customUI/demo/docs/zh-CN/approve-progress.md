## 审批进度组件
approve progress 审批进度

### 示例  

::: demo 

```html
<su-button :plain="true" @click="handleApproveProgress">审批进度</su-button>
<su-approve-progress ref="progressRef" :data="list"></su-approve-progress>
<script>
  export default {
    data() {
      return {
        list: [
          {
            name: '林青霞',
            status: 'start',
            unit: 'xxxxxxxx单位',
            endTime: '2022-05-20',
            durationFormat: '2小时',
            description: '意见意见意见',
            photoUrl: '',
            sex: 'female'
          },
          {
            name: '林青霞',
            status: 'success',
            unit: 'xxxxxxxx单位',
            endTime: '2022-05-20',
            durationFormat: '2小时',
            description: '意见意见意见',
            photoUrl: '',
            sex: 'female'
          },
          {
            name: '林青霞',
            status: 'process',
            unit: 'xxxxxxxx单位',
            endTime: '2022-05-20',
            durationFormat: '2小时',
            description: '意见意见意见',
            photoUrl: '',
            sex: 'female'
          },
          {
            name: '林青霞',
            status: '',
            unit: 'xxxxxxxx单位',
            endTime: '',
            durationFormat: '',
            description: '',
            photoUrl: '',
            sex: 'female'
          },
        ]
      }
    },
    methods: {
      handleApproveProgress (value) {
        this.$refs.progressRef.visible = true
      }
    }
  }
</script>
```
:::

### 审批进度组件参数

| 参数      | 说明                 | 类型   | 可选值 | 默认值     |
| --------- | -------------------- | ------ | ------ | ---------- |
| data      | 审批流程数组         | array  | —      | —          |
| width     | 窗口宽度             | String | —      | '680px'    |
| title     | 窗口标题             | String | —      | '审批进度' |
| emptyText | 无数据时显示文字     | String | —      | '暂无数据' |
| props     | 配置选项，具体见下表 | object | —      | —          |

### data参数

| 参数           | 说明       | 类型   | 可选值                                                                                     | 默认值 |
| -------------- | ---------- | ------ | ------------------------------------------------------------------------------------------ | ------ |
| name           | 审批人名称 | String | —                                                                                          | —      |
| status         | 审批状态   | sring  | start（发起审批），success（已通过），error（已驳回），process（审核中），return（已撤回） | —      |
| unit           | 审批人单位 | sring  | —                                                                                          | —      |
| photoUrl       | 头像地址   | sring  | —                                                                                          | —      |
| endTime        | 审批时间   | sring  | —                                                                                          | —      |
| durationFormat | 耗时       | sring  | —                                                                                          | —      |
| sex            | 性别       | sring  | male, female                                                                               | —      |
| description    | 审批意见   | sring  | —                                                                                          | —      |

### Props

| 参数           | 说明                             | 默认值           |
| -------------- | -------------------------------- | ---------------- |
| name           | 指定审批人为对象的某个属性值     | 'name'           |
| status         | 指定审批状态为对象的某个属性值   | 'status'         |
| unit           | 指定审批人单位为对象的某个属性值 | 'unit'           |
| photoUrl       | 指定头像地址为对象的某个属性值   | 'photoUrl'       |
| endTime        | 指定审批时间为对象的某个属性值   | 'endTime'        |
| durationFormat | 指定耗时为对象的某个属性值       | 'durationFormat' |
| sex            | 指定性别为对象的某个属性值       | 'sex'            |
| description    | 指定审批意见为对象的某个属性值   | 'description'    |
