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
  <div style='padding-left: 24px; padding-bottom: 78px'>
    <h1>右对齐</h1>
    <su-input label-content='输入框标题'
              :showRequiredTag='true'
              v-model='value'
              placeholder='请输入'
              suffix-icon='el-icon-view'
    />
    <su-input label-content='身份证'
              style='margin-top: 12px'
              :showRequiredTag='true'
              v-model='value'
              disabled
              placeholder='请输入'
    />
    <su-input input-type='password'
              style='margin-top: 12px'
              v-model='value'
              placeholder='请输入'
    />

    <h1>顶对齐</h1>
    <su-input label-content='输入框标题'
              label-placement='top-start'
              :showRequiredTag='true'
              v-model='value'
              placeholder='请输入'
              suffix-icon='el-icon-view'
    />
    <su-input label-content='身份证'
              label-placement='top-start'
              style='margin-top: 12px'
              :showRequiredTag='true'
              v-model='value'
              placeholder='请输入'
    />
    <su-input label-placement='top-start'
              input-type='password'
              style='margin-top: 12px'
              v-model='value'
              placeholder='请输入'
    />

    <h1>类型 ---- 日期，时间段的需在日期组件检阅</h1>
    <su-input style='margin-top: 12px'
              label-content='单行输入'
              placeholder='请输入'
              v-model='value'
    />
    <su-input label-content='多行输入'
              type='textarea'
              style='margin-top: 12px'
              :rows='2'
              placeholder='请输入内容'
              v-model='value'
    />

    <su-input style='margin-top: 12px'
              type='textarea'
              :rows='2'
              :maxlength='200'
              show-word-limit
              label-content='字符限制'
              resize='none'
              placeholder='请输入内容'
              v-model='value'
    />

    <su-input style='margin-top: 12px'
              label-content='带单位输入(5个整数)'
              placeholder='请输入内容'
              type='number'
              :maxlength='5'
              :min='0'
              v-model='value'
    >
      <div slot='suffix'>个</div>
    </su-input>
    <su-input style='margin-top: 24px'
              label-content='带单位输入（3个整数，2个小数）'
              placeholder='请输入内容'
              type='number'
              :maxlength='5'
              :precision='2'
              v-model='value'
    >
      <div slot='suffix'>个</div>
    </su-input>

    <su-input style='margin-top: 24px'
              label-content='网址'
              placeholder='请输入内容'
              v-model='value'
    >
      <template slot='prepend'>Http://</template>
      <template slot='append'>
        <su-dropdown type='text'
                     size='small'
                     :text='moreSelectTitle'
                     :list='moreSelectList'
                     @command='handleCommandClick'
        />
      </template>
    </su-input>

    <su-input style='margin-top: 24px'
              label-content='邮箱'
              placeholder='请输入内容'
              v-model='value'
    >
      <template slot='append'>
        <su-dropdown type='text'
                     size='small'
                     :text='moreSelectTitle'
                     :list='moreSelectList'
                     @command='handleCommandClick'
        />
      </template>
    </su-input>

    <h1>搜索框</h1>
    <su-search @click='printData'
               style='margin-top: 12px'
               @updateKeyword='printData'
               label-key='value'
               :suggestion-data-list='suggestionDataList_test'
               @select='select'
    />
  </div>
</template>

<script>
export default {
  name: 'su-input-test',
  data() {
    return {
      value: null,

      showPassword: false,

      moreSelectTitle: '.com',
      moreSelectList: [
        {value: 1, label: '.com'},
        {value: 2, label: '.com1'},
        {value: 3, label: '.com2'},
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
      console.log(data, 'xxxxxxx')
    },
    handleCommandClick(data) {
      this.moreSelectTitle = this.moreSelectList.filter(item => item.value === data)[0].label
    },
    select(data) {
      console.log(data, 'select')
    },
  },
}
</script>

<style scoped lang='scss'>

</style>
