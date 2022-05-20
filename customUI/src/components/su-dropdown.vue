<!--
  - Copyright © 2021 Guangdong Sun Railway Information Technology, Inc.
  - All rights reserved.
  -
  - @author: lixiaoling
  - @description 下拉菜单
  -
  - Changelog:
  - Revision 1.0 2021-10-26
  - Revision 1.0.0 2020-11-04 规范3.0下组件库调整
  - - 初始化
  -->
<template>
  <el-dropdown
    class='su-dropdown'
    :split-button='splitButton'
    :size='size'
    :type='type'
    v-bind='$attrs'
    v-on='
      filterAttributes({
        targetObj: $listeners,
        excludePrefixes: [],
      })
    '
  >
    <!--    默认插槽用slot放着-->
    <slot>
      <el-button class='el-dropdown-link'
                 v-if='!splitButton'
                 :type='type'
                 :size='size'
                 :plain='plain'
      >
        {{ text }}
        <i class='el-icon-arrow-down el-icon--right' />
      </el-button>
      <span v-else>{{ text }}</span>
    </slot>

    <template slot='dropdown'>
      <slot name='dropdown'>
        <el-dropdown-menu class='drop su-dropdown-menu'>
          <!--        同名的属性可直接通过 v-bind=item进行属性数据的绑定-->
          <!--        :disabled='item.disabled'-->
          <!--        :divided='item.divided'-->
          <!--        :icon='item.icon'-->
          <el-dropdown-item class='su-dropdown-item'
                            v-for='item in list'
                            :command='item[valueKey]'
                            :key='item[valueKey]'
                            v-bind='item'
          >
            {{ item[labelKey] }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </slot>
    </template>
  </el-dropdown>
</template>

<script>
import SuComponent from '@/mixins/su-component'
import {Dropdown, Button} from 'element-ui'

export default {
  name: 'su-dropdown',
  mixins: [SuComponent],
  components: {
    'el-dropdown': Dropdown,
    'el-button': Button,
  },
  props: {
    // 与element稍有不同
    // splitButton为true时,指的是button的type
    // splitButton为false时,用来判断是button还是text
    type: {
      type: String,
      default: 'primary',
    },
    splitButton: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      default: '更多菜单',
    },
    plain: {
      type: Boolean,
      default: true,
    },
    // 选项的呈现文本的key
    labelKey: {
      type: String,
      default: 'label',
    },
    valueKey: {
      type: String,
      default: 'value',
    },
    // 下拉数据, 建议用[], 测试用例由使用者传入
    list: {
      type: Array,
      default: () => [
        {
          value: 1,
          label: '黄金糕,黄金糕,黄金糕',
        },
        {
          value: 4,
          label: '黄金糕,黄金糕,黄金糕',
        },
        {
          value: 2,
          label: '双皮奶,双皮奶,双皮奶',
          disabled: true,
        },
        {
          value: 3,
          label: '蚵仔煎,蚵仔煎,蚵仔煎',
          divided: true,
        },
        {
          value: 5,
          label: '蚵仔煎,蚵仔煎,蚵仔煎',
        },
      ],
    },
    size: {
      type: String,
      default: 'small',
    },
  },
  methods: {},
}
</script>

<style lang='scss' scoped>
.drop {
  margin-top: 4px;
  margin-bottom: 4px;

  ::v-deep .popper__arrow {
    display: none;
  }
}
</style>
