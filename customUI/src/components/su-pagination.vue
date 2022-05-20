<!--
  - Copyright © 2020 Guangdong Sun Railway Information Technology, Inc.
  - All rights reserved.
  -
  - @author: Liao chenxi <liaochenxi@sunengineering.cn>
  - @description 分页器组件
  -
  - Changelog:
  - Revision 1.0 2020-06-03 Liao chenxi
  - Revision 1.0.0 2020-11-04 规范3.0下组件库调整
  - - 初始化
  -->
<template>
  <div class='su-pagination flex'>
    <div class='pagination-total'>{{ allText1 }}{{ total }}{{ allText2 }}</div>
    <div class='pagination-size'>
      {{ selectText1 }}
      <su-select :clearable='false'
                 v-model='value'
                 @change='changeSize'
      >
        <el-option v-for='item in pageSizes'
                   :key='item'
                   :label='item'
                   :value='item'
        />
      </su-select>
      <!--      <el-select @change='changeSize' v-model='value'>-->
      <!--        <el-option v-for='item in pageSizes'-->
      <!--                   :key='item'-->
      <!--                   :label='item'-->
      <!--                   :value='item'-->
      <!--        />-->
      <!--      </el-select>-->
      {{ selectText2 }}
    </div>
    <el-pagination v-bind='$attrs'
                   v-on='$listeners'
                   :current-page='currentPage'
                   :page-sizes='pageSizes'
                   :page-size='pageSize'
                   :layout='layout'
                   :total='total'
                   background
                   @current-change='handleCurrentChange'
    >
      <span class='el-pagination__total'>{{ totalText1 }}{{ Math.ceil(total / pageSize) === 0 ? '1' : Math.ceil(total / pageSize) }}{{ totalText2 }}</span>
    </el-pagination>
    <div class='pagination-jumper'>
      {{ jumperText1 }}
      <el-input-number ref='jumper'
                       :min='1'
                       :max='maxJumper'
                       v-model='page'
                       @change='changeJumper'
      />
      {{ jumperText2 }}
    </div>
  </div>
</template>

<script>
import {Pagination} from 'element-ui'

export default {
  name: 'su-pagination',
  components: {
    'el-pagination': Pagination,
  },
  data: function() {
    return {
      value: this.pageSize,
      page: this.currentPage,
    }
  },
  watch: {
    currentPage(val) {
      this.page = val
    },
    pageSize(val) {
      this.value = val
    },
  },
  props: {
    currentPage: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 15,
    },
    pageSizes: {
      type: Array,
      default() {
        return [15, 30, 50, 100]
      },
    },
    total: {
      type: Number,
      default: 0,
    },
    layout: {
      type: String,
      default: 'prev, pager, next,slot',
    },
  },
  computed: {
    maxJumper() {
      let maxJumper = this.total ? Math.ceil(this.total / this.pageSize) : 1
      // 当当前页码比最大页码更大时，需要调整下页码
      if (maxJumper < this.currentPage) {
        this.changeJumper(this.currentPage)
      }
      return maxJumper
    },
    totalText1: function() {
      return this.$t('pagination.totalText1')
    },
    totalText2: function() {
      return this.$t('pagination.totalText2')
    },
    jumperText1: function() {
      return this.$t('pagination.jumperText1')
    },
    jumperText2: function() {
      return this.$t('pagination.jumperText2')
    },
    selectText1: function() {
      return this.$t('pagination.selectText1')
    },
    selectText2: function() {
      return this.$t('pagination.selectText2')
    },
    allText1: function() {
      return this.$t('pagination.allText1')
    },
    allText2: function() {
      return this.$t('pagination.allText2')
    },
  },
  methods: {
    handleCurrentChange(val) {
      //点击页数触发
      this.change(val, this.pageSize)
    },
    // 更改每页显示条数
    changeSize(e) {
      this.change(1, e)
    },
    changeJumper(currentValue, oldValue) {
      let e = currentValue
      // 选择每页显示条数触发
      let size
      if (e > Math.ceil(this.total / this.pageSize)) {
        size = Math.ceil(this.total / this.pageSize)
      } else if (e === undefined) {
        size = 1
      } else {
        size = e
      }
      this.change(size <= 0 ? 1 : size, this.pageSize)
    },
    change(currentPage, pageSize) {
      this.page = currentPage
      this.$emit('update:currentPage', currentPage)
      this.$emit('update:pageSize', pageSize)
      this.$emit('change', {
        pageIndex: currentPage,
        pageSize: pageSize,
      })
    },
    changeSizeValue(value) {
      this.value = value
    },
  },

}
</script>
