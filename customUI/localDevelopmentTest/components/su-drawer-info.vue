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
  <su-drawer :showBtns='false'
             title='详情'
             width='680px'
             :visible.sync='visible'
             :closeOnPressEscape='true'
             :closeOnClickModal='true'
             :modal='true'
             @drawerClose='close'
  >
    <div slot='content' class='content'>
      <div style='display: flex; justify-content: center; margin: 20px'>
        <su-tabs :tabIndex.sync='tabIndex' :columns='tabDataList' tabType='button' />
      </div>
      <div style='height: 800px; background-color: #ededed'></div>
    </div>
  </su-drawer>
</template>

<script>
export default {
  name: 'su-drawer-info',
  data() {
    return {
      visible: false,

      tabIndex: 0,
      tabDataList: [
        {label: '啊手动阀1'},
        {label: '啊手动阀2'},
        {label: '啊手动阀3'},
        {label: '啊手动阀4'},
      ],
    }
  },
  methods: {
    openDrawer() {
      this.visible = true
    },
    close() {
      this.visible = false
    },
  },
}
</script>

<style scoped lang='scss'>

</style>
