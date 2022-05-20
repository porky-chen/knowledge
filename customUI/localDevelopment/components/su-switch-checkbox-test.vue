<!--
- Copyright (c) 2021 Guangdong Sun Railway Information Technology, Inc.
- All rights reserved.
-
- @author wenteng
-
- Description:
-
- Changelog:
-
- Revision:
-->

<template>
  <div style='padding-left: 32px; padding-bottom: 78px'>
    <h1>半选中效果 - 无法切换其他状态</h1>
    <su-checkbox :items='checkItems1' style='margin-top: 32px' />

    <h1>checkbox多选控件 - 默认态，悬停态，已选，半勾选状态，禁用</h1>
    <su-checkbox :items='checkItems'
                 style='margin-top: 32px'
                 v-model='checkValue'
    />

    <h1>Switch开关控件 - 可选，禁用</h1>
    <su-switch :active-text="'开'"
               :inactive-text="'关'"
               v-model='switchValue'
               style='margin-top: 32px'
    />
    <su-switch :active-text="'开-禁用'"
               :inactive-text="'关-禁用'"
               style='margin-top: 32px'
               v-model='switchValue'
               :disabled='true'
    />
  </div>
</template>

<script>
export default {
  name: 'su-switch-checkbox-test',
  data() {
    return {
      checkValue: [],
      switchValue: false,
      checkItems1: [
        {label: '默认未选1', indeterminate: true, checked: false},
        {label: '默认未选2', indeterminate: true, checked: true},
      ],
      checkItems: [
        {label: '默认未选1', checked: false},
        {label: '鼠标悬浮2', checked: true},
        {label: '已选', checked: true},
        {label: 'x选'},
        {label: '默认选择', checked: true, disabled: true},
        {label: '禁选', disabled: true},
      ],
      suggestionDataList_test: [
        {'value': '三全鲜食（北新泾店）', 'address': '长宁区新渔路144号'},
        {'value': 'Hot honey 首尔炸鸡（仙霞路）', 'address': '上海市长宁区淞虹路661号'},
        {'value': '新旺角茶餐厅', 'address': '上海市普陀区真北路988号创邑金沙谷6号楼113'},
        {'value': '新旺角茶餐厅', 'address': '上海市普陀区真北路988号创邑金沙谷6号楼113'},
        {'value': '新旺角茶餐厅', 'address': '上海市普陀区真北路988号创邑金沙谷6号楼113'},
        {'value': '新旺角茶餐厅', 'address': '上海市普陀区真北路988号创邑金沙谷6号楼113'},
        {'value': '新旺角茶餐厅', 'address': '上海市普陀区真北路988号创邑金沙谷6号楼113'},
        {'value': '新旺角茶餐厅', 'address': '上海市普陀区真北路988号创邑金沙谷6号楼113'},
        {'value': '泷千家(天山西路店)', 'address': '天山西路438号'},
        {'value': '胖仙女纸杯蛋糕胖仙女纸杯蛋糕（上海凌空店）', 'address': '上海市长宁区金钟路968号1幢18号楼一层商铺18-101'},
      ],
    }
  },
  methods: {
    printData(data) {
      console.log(data, 'data - data')
    },
    querySearch(queryString, cb) {
      return cb(this.suggestionDataList_test)
    },
    select(data) {
      console.log(data, 'select')
    },
  },
}
</script>

<style scoped lang='scss'>

</style>
