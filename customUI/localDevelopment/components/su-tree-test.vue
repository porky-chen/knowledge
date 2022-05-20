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
    <su-tree :data='data'
             tooltip-popper-class='asfasdfa'
             :showCheckbox='true'
             ref='tree'
             :expandOnClickNode='false'
             :checkOnClickNode='true'
    ></su-tree>
  </div>
</template>

<script>
export default {
  name: 'su-tree-test',
  data() {
    return {
      data: [
        {
          id: 51,
          label: '二级 2-1',
        },
        {
          id: 1,
          label: '一级 1',
          children: [
            {
              id: 4,
              label: '二级 1-1',
              children: [
                {
                  id: 9,
                  label: '三级 1-1-1',
                  disabled: true,
                }, {
                  id: 10,
                  label: '三级 1-1-2',
                }, {
                  id: 11,
                  label: '三级 1-1-3',
                  icon: 'el-icon-share',
                }, {
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
          children: [
            {
              id: 5,
              label: '二级 2-1',
            }, {
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
            }, {
              id: 8,
              nonetooltip: true,
              label: '二级 3-2-11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111',
            }, {
              id: 13,
              label: '二级 3-2-11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111',
            },
          ],
        },
      ],
    }
  },
  methods: {},
}
</script>

<style scoped lang='scss'>

</style>
