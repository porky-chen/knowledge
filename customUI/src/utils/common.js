// <!--
//  - Copyright (c) 2019 Guangdong Sun Railway Information Technology, Inc.
//  - All rights reserved.
//  -
//  - @author zhangzhantong
//  - Description: 通用组件
//  - Changelog:
//  - Revision 1.0 2019-08-12 zhangzhantong
//  - - 初始化
//  -->

import _ from 'lodash'

export default {
  // 日期选择器限制不能超过当前日期
  notAfterToday: {
    disabledDate (date) {
      return new Date().getTime() < date.getTime()
    },
  },
  // 将对象属性值null转为undefined
  nullToUndefined (obj) {
    if (!obj) {
      return {}
    }

    Object.keys(obj).forEach(k => {
      if (obj[k] === null) {
        obj[k] = undefined
      }
    })

    return obj
  },
  // 将对象属性值undefined转为null
  undefinedToNull (obj) {
    if (!obj) {
      return {}
    }

    Object.keys(obj).forEach(k => {
      if (obj[k] === undefined) {
        obj[k] = null
      }
    })

    return obj
  },
  // 数字转汉字
  chineseNumChar: ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'],
  chineseUnitSection: ['', '万', '亿', '万亿', '亿亿'],
  chineseUnitChar: ['', '十', '百', '千'],
  numberToChinese (num) {
    let unitPos = 0
    let strIns = ''
    let chnStr = ''
    let needZero = false

    if (num === 0) {
      return this.chineseNumChar[0]
    }

    while (num > 0) {
      const section = num % 10000
      if (needZero) {
        chnStr = this.chineseNumChar[0] + chnStr
      }
      strIns = this.sectionToChinese(section)
      strIns += (section !== 0) ? this.chineseUnitSection[unitPos] : this.chineseUnitSection[0]
      chnStr = strIns + chnStr
      needZero = (section < 1000) && (section > 0)
      num = Math.floor(num / 10000)
      unitPos++
    }

    if (chnStr[0] === '一' && chnStr[1] === '十') {
      return chnStr.substring(1)
    }

    return chnStr
  },
  sectionToChinese (section) {
    let strIns = ''
    let chnStr = ''
    let unitPos = 0
    let zero = true
    while (section > 0) {
      var v = section % 10
      if (v === 0) {
        if (!zero) {
          zero = true
          chnStr = this.chineseNumChar[v] + chnStr
        }
      } else {
        zero = false
        strIns = this.chineseNumChar[v]
        strIns += this.chineseUnitChar[unitPos]
        chnStr = strIns + chnStr
      }
      unitPos++
      section = Math.floor(section / 10)
    }

    return chnStr
  },
  getLabel (types = [], value) {
    if (value === null || value === undefined) {
      return ''
    }

    const type = types.find(t => t.value === value)

    return type ? type.label : ''
  },
  /**
   * 重置之前的过滤器
   * @param filters table中所有过滤器column-key数组
   * @param currentFilter 当前使用的过滤器column-key
   * @param suTableRef su-table引用
   */
  clearFilter (filters, currentFilter, suTableRef) {
    const columnFilters = suTableRef.$refs.table.columns.filter(c => !_.isEmpty(c.filters)).map(c => c.columnKey)
    const filtersToBeCleared = filters.filter(f => f !== currentFilter && columnFilters.includes(f))

    if (!_.isEmpty(filtersToBeCleared)) {
      suTableRef.clearFilter(filtersToBeCleared)
    }
  },
  /**
   * 列头排序事件，设置查询参数
   * @param column 待排序的列
   * @param propMap 列名映射，有时候显示用的列名和排序时不一样，例如列头使用userName显示，但排序时可能使用userId排序
   * @param callback 回调函数
   */
  handleSortChange (column, propMap = {}, callback = () => {}) {
    const param = {}
    console.log(propMap)
    if (column.prop && column.order) {
      let sortBy = column.prop
      if (Object.prototype.hasOwnProperty.call(propMap, sortBy)) {
        sortBy = propMap[sortBy]
      }

      param.sortBy = sortBy
      param.desc = column.order === 'descending'
    } else {
      param.sortBy = null
      param.desc = null
    }

    callback(param)
  },
  /**
   * 列头过滤事件，清空之前的查询条件和排序
   * @param filters table中所有过滤器column-key数组
   * @param filterName 当前使用的过滤器column-key
   * @param suTableRef su-table引用
   * @param callback 回调函数
   */
  handleFilterChange (filters, filterName, suTableRef, callback = () => {}) {
    // 启用过滤条件时，去掉之前的过滤条件
    this.clearFilter(filters, filterName, suTableRef)
    suTableRef.clearSort()

    callback(filterName)
  },
  /**
   * 获取过滤器column-key
   * @param filters table中所有过滤器column-key数组
   * @param filter 当前过滤器对象
   * @returns {string} 当前使用的过滤器column-key
   */
  getFilterName (filters, filter) {
    let filterName = ''

    for (const f of filters) {
      if (Object.prototype.hasOwnProperty.call(filter, f)) {
        filterName = f
        break
      }
    }

    return filterName
  },
  /**
   * 检查vue对象是否为空
   * @param obj vue对象
   * @returns {boolean} 为空返回true，否则返回false
   */
  emptyVueObject (obj = {}) {
    return Object.keys(obj).length < 1
  },
}
