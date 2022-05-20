export default {
  /**
   * su-table排序
   */
  handleSortChange({prop, order}) {
    this.param.sortBy = null
    this.param.desc = null

    if (order) {
      let sortBy = prop
      let desc = null
      if (order === 'descending') {
        desc = true
      }

      let {sortByValue, descValue} = this.customSortChange({sortBy, desc})
      this.param.sortBy = sortBy
      this.param.desc = desc
    }
    this.query()
  },
  customSortChange({sortBy, desc}) {
    return {sortBy, desc}
  },

  /**
   * su-table筛选
   */
  handleFilterChange(filter) {
    const key = Object.keys(filter)[0]

    this.param[key] = this.customFilter(filter[key], key)

    this.query()
  },
  customFilter(filterValue, key) {
    return filterValue.toString()
  },

  /**
   * 新增
   */
  add() {
    const suDialog = this.$refs.suDialog
    Object.assign(suDialog, {
      visible: true,
      title: '新增',
      type: 'post',
    })
  },

  /**
   * 重置表单
   */
  resetForm() {
    if (this.$refs.form) {
      // this.$refs.form.resetFields()
      setTimeout(() => this.$refs.form.clearValidate(), 10)
    }
  },

  /**
   * 删除
   * @param {string} idKey 被删除数据的ID键
   * @param {string} keyParam 删除的字段名称,后端有时候不统一得传进来
   */
  del(idKey, delTitle = '确定要删除文件吗？', keyParam = '') {
    if (!idKey) {
      console.error('idKey is Required.')
    }

    this.$confirm(delTitle, '提示', {
      confirmButtonText: '删除',
      cancelButtonText: '取消',
      showClose: true,
      type: 'warning',
    }).then(() => {
      const ids = []
      for (let v of this.selections) {
        ids.push(v[idKey])
      }
      const data = {}
      if (keyParam === '') {
        data[idKey + 's'] = ids
      } else {
        data[keyParam] = ids
      }

      this.$su.ajax({
        url: this.url.del,
        data,
      }).then(res => {
        this.query()
        this.$refs.table.clearSelection()
        this.messageAlert(res.message)
      })
    }).catch(() => {
    })
  },

  /**
   * 编辑
   * @param {object} row 行数据
   */
  edit() {
    const suDialog = this.$refs.suDialog
    const formData = JSON.parse(JSON.stringify(this.selections[0]))
    Object.assign(suDialog, {
      visible: true,
      title: '编辑',
      formData,
      type: 'put',
    })
  },

  /**
   * 处理表格选择改变
   * @param {array} rows 选中行
   */
  handleSelectionChange(rows = []) {
    this.selections = rows
  },

  /**
   * 模糊查询
   * @param {*} value 模糊查询的参数
   */
  handleClick(value) {
    this.params.keyword = value
    this.query()
  },

  /**
   * 查询
   * @param {object} param 参数，可以覆盖 this.param 里的同名参数
   */
  query(params = {}) {
    this.loading = true
    params = Object.assign({}, this.params, params)
    if (!params.pageSize || params.pageSize === 'undefined') {
      params.pageSize = this.data.pageSize
    }
    this.deleteEmptyKeys(params)
    return this.$su.ajax({
      url: this.url.query,
      type: 'get',
      params,
    }).then(this.queryCallback).catch(e => {
      this.loading = false
      console.log(e)
    })
  },
  /**
   * 查询回调
   * @param {object} res 响应值
   */
  queryCallback(res = {}) {
    this.data = res.data
    if (this.$refs.table) {
      this.$refs.table.clearSelection()
    }
    this.loading = false
  },

  /**
   * 提交
   * @param {object} opts 选项
   */
  submit(opts = {}) {
    const {
      callback = () => {
      },
      excludes = [],
      includes = {},
      ref = 'form',
      url = this.submitUrl,
      visible = 'visible',
      queryParam = {},
    } = opts

    // 拼接表单参数
    const param = Object.assign({}, this.model, includes)
    // 删除排除参数
    for (let v of excludes) {
      delete param[v]
    }

    this.$refs[ref].validate(pass => {
      if (pass) {
        this.loading = true
        this.$su.ajax({
          url,
          param,
        }).then(res => {
          this.query(queryParam)
          this[visible] = false
          this.$su.alert(res.message)
          callback(res)
          this.loading = false
        }).catch(e => {
          this.loading = false
          console.log(e)
        })
      } else {
        return false
      }
    })
  },

  /**
   * 表格索引格式化
   * @param {number} index 当前索引，从0开始
   * @returns {number} 格式化后的索引
   */
  index(index) {
    return ((this.data.pageIndex - 1) * this.data.pageSize) + (index + 1)
  },

  /**
   * 初始化
   */
  init() {
    this.param = {}
    this.query()
  },

  /**
   * 去掉参数对象中为空的属性(null,undefined,空字符串等)
   * @param {object} param 参数对象
   */
  deleteEmptyKeys(param = {}) {
    for (const prop in param) {
      if (Object.prototype.hasOwnProperty.call(param, prop) && this.isEmpty(param[prop])) {
        delete param[prop]
      }
    }
  },

  /**
   * 判断值是否为空(null,undefined,空字符串等)，该方法主要针对字符串
   * @param value 需要判断的值
   * @returns {boolean} 为空返回 true，否则返回 false
   */
  isEmpty(value) {
    return value === null || value === undefined || (this.isString(value) && value.trim() === '')
  },

  /**
   * 判断是否为字符串
   * @param value 需要判断的值
   * @returns {boolean} 为字符串返回 true，否则返回 false
   */
  isString(value) {
    return Object.prototype.toString.call(value) === '[object String]'
  },

  /**
   * 获取ESB检查标准及检查类型
   */
  getStandardsAndInspectionTypes(marjorId) {
    this.$su.ajax({
      url: this.api.ebs.ebsStandards,
      type: 'get',
      params: {
        marjorId,
      },
    })
      .then(res => {
        this.standardsAndInspectionTypes = res.data
      })
      .catch(() => {
      })
  },

  // 深拷贝
  clone(obj) {
    return JSON.parse(JSON.stringify(obj))
  },

  // 搜索框更新keyword
  updateKeyword(e) {
    this.params.keyword = e
  },

  // 重置input框keyword
  resetInput() {
    this.params.keyword = null
    this.$refs.search.text = null
  },

  // 只能输入整数或者小数
  filterInput(e, item, key) {
    item[key] = e.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
  },

  // 消息提示
  messageAlert(message = '提交成功', type = 'success', duration = 4000, center = false) {
    let opt = {
      message,
      type,
      showClose: true,
      duration,
      center,
    }
    if (type === null) {
      delete opt.type
    }
    this.$message(opt)
  },

  // su-table数据格式化 为null 时显示 --
  formatter(row, key) {
    if (row[key] !== null && row[key] !== undefined) {
      return row[key]
    } else {
      return '--'
    }
  },
}
