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
  <div style="height: 100%; width: 100%; overflow: hidden">
    <su-table
      highlightCurrentRow
      class="table-view"
      ref="tableRef"
      :columns="columns"
      :data="pageDatas"
      height="100%"
      @row-click="rowClick"
      @selection-change="selectionHandler"
      @filter-change="filterChangeHandler"
    >
      <div slot="tableLeftView" class="table-left-view">
        <div class="table-left-view-search-view">
          <su-select
            :clearable="true"
            style="width: 100%"
            v-model="selectValue"
            :options="selectOptions"
          />
        </div>
        <su-tree
          :data="treeData"
          title="树组件的头标题"
          ref="tree"
          clickable
          :expandOnClickNode="false"
          :checkOnClickNode="true"
        >
        </su-tree>
      </div>
      <!--      <div slot='tableRightView'>tableRightView</div>-->
      <div slot="tableHeaderLeftView">
        <!--        <su-button type='primary' :plain='true'>取消</su-button>-->
        <!--        <su-button type='primary' :plain='true'>确定</su-button>-->

        <su-button button-type="add" @click="$refs.addRef.openDialog(false)" />
        <su-button
          button-type="edit"
          :disabled="tableHighRowData === null"
          @click="$refs.addRef.openDialog(true)"
        />
        <su-button
          button-type="del"
          :disabled="selectedRows.length <= 0"
          @click="handleRemoveEvent"
        />
        <su-button :plain="true" @click="handleDrawerEvent">抽屉</su-button>
        <su-button :plain="true" @click="handleApproveProgress">审批进度</su-button>
      </div>
      <div slot="tableHeaderRightView">
        <su-search @click="handleSearchClickEvent" />
      </div>
      <div slot="tableFooterView">
        <su-pagination class="pagination-view" :current-page="1" :page-size="15" :total="20" />
      </div>
    </su-table>

    <su-add ref="addRef" />
    <su-info ref="infoRef" />
    <su-drawer-info ref="drawerRef" />
    <su-approve-progress ref="progressRef" />
  </div>
</template>

<script>
import SuAdd from './su-add'
import SuInfo from './su-info'
import SuDrawerInfo from './su-drawer-info'

export default {
  name: 'su-list-page',
  components: {SuInfo, SuAdd, SuDrawerInfo},
  methods: {
    handleApproveProgress() {
      this.$refs.progressRef.visible = true
    },
    handleSearchClickEvent() {
      // this.$message({
      //   showClose: true,
      //   message: '这是一条消息提示',
      //   duration: 100000,
      //   type: 'info',
      // })
      this.$message.success('成功发起了查询')
    },

    rowClick(rowData) {
      this.tableHighRowData = rowData
    },
    selectionHandler(selectedRows) {
      this.selectedRows = selectedRows
    },
    filterChangeHandler() {
      console.log('filterChangeHandler')
    },

    handleRemoveEvent() {
      // this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'error',
      //   center: true,
      // }).then(() => {
      //   this.$message({
      //     type: 'success',
      //     message: '删除成功!',
      //   })
      // }).catch(() => {
      //   this.$message({
      //     type: 'info',
      //     message: '已取消删除',
      //   })
      // })
      this.$su.messagebox('del', '删除操作不可恢复，请谨慎操作！', '温馨提示').then(() => {
        this.$message.success('成功：成功删除')
      })
    },

    handleDrawerEvent() {
      this.$refs.drawerRef.openDrawer()
    },
  },
  data() {
    return {
      tableHighRowData: null,
      selectedRows: [],

      selectOptions: [
        {
          value: '选项1',
          label: '黄金糕',
        },
        {
          value: '选项2',
          label: '双皮奶',
        },
        {
          value: '选项3',
          label: '蚵仔煎',
        },
        {
          value: '选项4',
          label: '龙须面',
          disabled: true,
        },
        {
          value: '选项5',
          label: '北京烤鸭',
        },
      ],
      selectValue: null,

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
          sortable: true,
        },
        {
          prop: 'contractCode',
          label: '阿斯顿发射点编号3',
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
              onClick: () => {
                this.$refs.infoRef.openDialog()
              },
            },
            {
              text: '删除',
              permission: 'delete',
              type: 'text',
              onClick: () => {
                this.handleRemoveEvent()
              },
            },
          ],
        },
      ],

      treeData: [
        {
          id: 51,
          label: '二级 2-1',
          icon: 'el-icon-share',
          rightIcon: 'el-icon-share',
        },
        {
          id: 1,
          label: '一级啊手动阀手动阀阿斯顿发射点发射点啊顺丰到付啊1 1',
          icon: 'el-icon-share',
          rightIcon: 'el-icon-share',
          children: [
            {
              id: 4,
              label: '二级 啊手动阀手动阀阿斯顿发射点发射点啊顺丰到付啊1-1',
              icon: 'el-icon-share',
              rightIcon: 'el-icon-share',
              children: [
                {
                  id: 9,
                  label: '三级 1-1-1',
                  disabled: true,
                },
                {
                  id: 10,
                  label: '三级 1-1-2',
                },
                {
                  id: 11,
                  label: '三级 1-1-3',
                  icon: 'el-icon-share',
                  rightIcon: 'el-icon-share',
                },
                {
                  id: 12,
                  label: '三级 1-1-3',
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: '测试一级 2',
          rightIconRender: '<i class="el-icon-close" />',
          children: [
            {
              id: 5,
              label: '二级 2-1',
            },
            {
              id: 6,
              label: '二级 2-2',
            },
          ],
        },
        {
          id: 3,
          label: '二级1111111111111',
          children: [
            {
              id: 7,
              label: '二级111111111111',
            },
            {
              id: 8,
              nonetooltip: true,
              label: '二级点发啊手动阀啊手动阀啊手动阀撒大大发射点发射点发的',
            },
            {
              id: 13,
              label: '二级矶发的了逻辑了级联就逻辑了接口两节课了级联就逻辑了就逻辑',
            },
          ],
        },
      ],
    }
  },
}
</script>

<style scoped lang='scss'>
.table-left-view {
  //height: 100%;
  //border-right: 1px solid #D7DBEC;

  &-search-view {
    padding: 20px 16px;

    ::v-deep .el-input,
    ::v-deep .el-select {
      width: 100%;
    }
  }

  &-header {
    margin-bottom: 4px;
    //height: 40px;
    //background: #eaecf5;
    //border-top: 1px solid #a1a7c4;
    //border-bottom: 1px solid #a1a7c4;
    display: flex;
    align-items: center;
    padding-left: 18px;

    font-size: 16px;
    font-weight: 700;
    color: #3d434e;
  }
}
</style>
