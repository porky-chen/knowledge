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
  <div style='height: 100%; width: 100%; overflow:hidden;'>
    <su-table highlightCurrentRow
              ref='tableRef'
              :columns='columns'
              :data='pageDatas'
              height='100%'
    >
      <!--      <div slot='tableLeftView'>tableLeftView</div>-->
      <!--      <div slot='tableRightView'>tableRightView</div>-->
      <div slot='tableHeaderLeftView'>
        <su-button icon='el-icon-plus'
                   :plain='true'
        >
          登记
        </su-button>
        <su-button icon='el-icon-plus'
                   :plain='true'
        >
          登记
        </su-button>
      </div>
      <div slot='tableHeaderRightView'>
        <su-search />
      </div>
      <div slot='tableFooterView'>
        <su-pagination
          class='pagination-view'
          :current-page='1'
          :page-size='15'
          :total='20'
        />
      </div>
    </su-table>
  </div>
</template>

<script>
export default {
  name: 'su-table-test',
  data() {
    return {
      pageDatas: [
        {contractCode: 'x-contractCode-x'},
        {contractCode: 'x-contractCode-x'},
        {contractCode: 'x-contractCode-x'},
        {contractCode: 'x-contractCode-x'},
        {contractCode: 'x-contractCode-x'},
        {contractCode: 'x-contractCode-x'},
        {contractCode: 'x-contractCode-x'},
        {contractCode: 'x-contractCode-x'},
        {contractCode: 'x-contractCode-x'},
      ],
      columns: [
        {
          prop: 'contractCode',
          label: '合同编达到号1',
          minWidth: 100,
          sortable: true,
          isFilter: true,
          multiple: false,
          filters: [
            {value: 1, text: '审核中'},
            {value: 2, text: '已通过'},
            {value: 4, text: '已驳回'},
          ],
        },
        {
          prop: 'contractCode',
          label: '合同编达到号2',
          minWidth: 100,
          sortable: true,
        },
        {
          prop: 'contractCode',
          label: '阿斯顿发射点编号3',
          minWidth: 100,
          sortable: true,
        },
        {
          prop: 'contractCode',
          label: '阿斯顿发射点编号3',
          minWidth: 100,
          sortable: true,
        },
        {
          prop: 'contractCode',
          label: '合同编号4',
          minWidth: 140,
        },
        {
          prop: 'control',
          label: '操作',
          width: 150,
          buttons: [
            {
              text: '详情',
              permission: 'edit',
              type: 'text',
            },
            {
              text: '删除',
              permission: 'delete',
              type: 'text',
            },
          ],
        },
      ],
    }
  },
}
</script>

<style scoped lang='scss'>
</style>
