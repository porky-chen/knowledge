<!--
  - Copyright © 2020 Guangdong Sun Railway Information Technology, Inc.
  - All rights reserved.
  -
  - @author: Liao chenxi <liaochenxi@sunengineering.cn>
  - @description excel上传组件
  -
  - Changelog:
  - Revision 1.0 2020-06-03 Liao Chen Xi
  - - 初始化
  -->
<template>
  <div ref="suExcelForm"
       class="su-excel-form"
       :style="`height: ${height};`">
    <el-form label-position="top"
             ref="form"
             v-if="mode === 'config'"
             :model="model">
      <el-form-item label="单元格类型"
                    prop="type">
        <el-select v-model="model.type">
          <el-option value=""
                     label="文字" />
          <el-option value="input"
                     label="文字输入框" />
          <el-option value="number"
                     label="数字输入框" />
          <el-option value="textarea"
                     label="多行输入框" />
          <el-option value="select"
                     label="选择框" />
          <el-option value="date"
                     label="日期选择框" />
        </el-select>
      </el-form-item>
      <el-form-item label="URL"
                    prop="url">
        <el-input v-model="model.url" />
      </el-form-item>
      <el-form-item label="正则表达式"
                    prop="regex">
        <el-input v-model="model.regex" />
      </el-form-item>
      <el-form-item label="最小值"
                    prop="min">
        <el-input-number v-model="model.min" />
      </el-form-item>
      <el-form-item label="最大值"
                    prop="max">
        <el-input-number v-model="model.max" />
      </el-form-item>
      <el-form-item style="margin-top: 20px;">
        <el-button type="primary"
                   @click="handleSaveClick">保存</el-button>
      </el-form-item>
    </el-form>

    <article>
      <el-button-group>
        <el-upload action="//192.168.1.94:8080/sun/getData2"
                   name="file"
                   accept=".xlsx"
                   v-show="false"
                   :http-request="httpRequest"
                   :show-file-list="false">
          <el-button ref="importTemplate"></el-button>
        </el-upload>

        <el-button size="mini"
                   @click="$refs.importTemplate.$el.click()">导入模板</el-button>
        <el-button size="mini"
                   @click="handlePrintClick">打印</el-button>
        <el-button size="mini"
                   @click="$su.exportExcel('su-excel-form.xlsx', 'suExcelForm')">导出</el-button>
      </el-button-group>

      <div class="su-excel-form-content">
        <table id="suExcelForm"
               :style="`width: ${tableWidth}px;`">
          <tr v-for="(row, k) of cells"
              :key="k">
            <td v-for="(col, i) of row"
                :key="`${k}${i}`"
                :rowspan="col.rowSize"
                :colspan="col.columnSize"
                :ref="col.id"
                :width="calcColumnWidth(col)"
                :class="getTdClass(col.id)"
                @click.capture="handleCellClick(col)">
              <el-input v-if="types[col.id] === 'input' || types[col.id] === 'textarea'"
                        v-model="values[col.id]"
                        :type="types[col.id] === 'input' ? 'text' : types[col.id]"
                        :autosize="{
                  minRows: 2,
                  maxRows: 8,
                }" />
              <el-input-number v-else-if="types[col.id] === 'number'"
                               v-model="values[col.id]"
                               :min="mins[col.id]"
                               :max="maxs[col.id]" />
              <el-select v-else-if="types[col.id] === 'select'"
                         v-model="values[col.id]">
                <el-option v-for="v of responseData[col.id]"
                           :key="v.value"
                           :value="v.value"
                           :label="v.label" />
              </el-select>
              <el-date-picker value-format="yyyy-MM-dd"
                              v-else-if="types[col.id] === 'date'"
                              v-model="values[col.id]" />
              <span v-else
                    :style="getStyle(col.styles)">{{responseData[col.id] || values[col.id]}}</span>
            </td>
          </tr>
        </table>
      </div>
    </article>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'su-excel-form',
  props: {
    data: {
      type: Object,
      default () {
        return {}
      },
    },
    height: {
      type: String,
      default: '300px'
    },
    mode: {
      type: String,
      validator (val) {
        return ['config', 'form'].indexOf(val) !== -1
      },
      default: 'form',
    },
  },
  data () {
    return {
      model: {
        max: undefined,
        min: undefined,
        regex: '',
        type: '',
        url: ''
      },
      responseData: {},
      cells: [],
      selections: [],
      types: {},
      urls: {},
      regexs: {},
      values: {},
      maxs: {},
      mins: {}
    }
  },
  computed: {
    ids () {
      const ret = []
      for (let v of this.selections) {
        ret.push(v.id)
      }

      return ret
    },
    tableWidth () {
      let ret = 'auto'
      const cells = this.cells
      if (cells.length > 0) {
        const row = cells[0]
        ret = 0
        for (let col of row) {
          ret += this.calcColumnWidth(col)
        }
      }

      return ret
    }
  },
  watch: {
    data (val) {
      this.reset(val)
      if (this.mode === 'form') {
        this.getServerData()
      }
    },
    mode () {
      this.clearSelections()
    },
    selections (val) {
      const selections = val
      const length = selections.length
      const model = this.model
      if (length === 0) {
        console.log(val)
      } else if (length === 1) {
        const id = selections[0].id
        model.type = this.types[id]
        model.url = this.getUrl(id)
        model.regex = this.regexs[id]
        model.min = this.mins[id]
        model.max = this.maxs[id]
      } else {
        this.resetModel()
      }
    }
  },
  methods: {
    /**
     * 处理单元格点击
     * @param {Object} cell 单元格数据
     */
    handleCellClick (cell = {}) {
      if (this.mode === 'form') {
        return
      }

      const selections = this.selections
      const index = selections.indexOf(cell)
      if (index !== -1) {
        selections.splice(index, 1)
      } else {
        selections.push(cell)
      }
    },
    /**
     * 根据单元格 ID 获取 URL
     * @param {String} id 单元格 ID
     * @returns {String} 如果有配置，返回对应 URL，否则，返回空字符串
     */
    getUrl (id) {
      const urls = this.urls
      for (let k in urls) {
        const v = urls[k]
        if (v.indexOf(id) !== -1) {
          return k
        }
      }

      return ''
    },
    /**
     * 把配置的 URL 和对应的 ID 存到 urls
     */
    setUrl () {
      const url = this.model.url
      if (url) {
        this.$set(this.urls, url, this.ids)
      }
    },
    /**
     * 根据配置的 URL 请求数据，存到 responseData 中
     */
    getServerData () {
      const urls = this.urls
      for (let k in urls) {
        const v = urls[k]
        axios.get(k).then(res => {
          const data = res.data.data
          const responseData = this.responseData
          for (let id of v) {
            if (data.length === undefined) {
              this.$set(responseData, id, data[id])
            } else {
              this.$set(responseData, id, data)
            }
          }
        })
      }
    },
    /**
     * 获取表单配置数据
     * @returns {Object} 表单配置对象
     */
    getData () {
      const ret = {
        cells: this.cells,
        maxs: this.maxs,
        mins: this.mins,
        regexs: this.regexs,
        types: this.types,
        urls: this.urls,
        values: this.values
      }

      console.log(ret, JSON.stringify(ret).length)

      return ret
    },
    /**
     * 处理保存点击
     */
    handleSaveClick () {
      const model = this.model
      for (let id of this.ids) {
        this.$set(this.types, id, model.type)
        this.$set(this.regexs, id, model.regex)
        this.$set(this.mins, id, model.min)
        this.$set(this.maxs, id, model.max)
      }

      this.setUrl()
      this.clearSelections()
      this.resetModel()
    },
    /**
     * 重置表单模型
     */
    resetModel () {
      this.$refs.form.resetFields()
    },
    /**
     * 清除选中
     */
    clearSelections () {
      this.selections = []
    },
    /**
     * 把样式对象转为字符串
     * @param {Object} styles 样式对象
     * @return {String} 转换后的字符串
     */
    getStyle (styles = {}) {
      let ret = ''
      for (let k in styles) {
        ret += `${k}: ${styles[k]};`
      }

      return ret
    },
    /**
     * 计算列宽，列宽 = 单元格宽度 * 列跨度
     * @param {Object} cell 单元格配置对象
     * @returns {Number} 列宽
     */
    calcColumnWidth (cell) {
      return Number(cell.width.replace('px', '')) * cell.columnSize
    },
    /**
     * 从单元格数据中提取出所有单元格的值
     * @returns {Object} {id: cellContent} 格式的对象
     */
    getValues () {
      const ret = {}
      const cells = this.cells
      if (!(cells instanceof Array)) {
        return ret
      }

      for (let row of cells) {
        for (let col of row) {
          ret[col.id] = col.cellContent
        }
      }

      return ret
    },
    /**
     * el-upload 请求处理
     * @param {Object} data 文件对象
     */
    httpRequest (data) {
      const formData = new FormData()
      formData.append(data.filename, data.file)
      axios({
        method: 'post',
        url: data.action,
        data: formData,
        timeout: 60000
      }).then(res => {
        this.reset(res.data)
      }).catch(e => console.error(e))
    },
    /**
     * 处理打印点击
     */
    handlePrintClick () {
      this.$su.print('#suExcelForm', {
        style: `
          .su-excel-form {
            width: 100%;
          }

          table {
            border-collapse: collapse;
            border: 1px solid #ccc;
            background-color: white;
            table-layout: fixed;
          }

          td {
            border-top: 1px solid #ccc;
            border-left: 1px solid #ccc;
            font-weight: normal;
            text-align: left;
            color: #000;
            padding: 0;
          }

          td > span {
            width: 100%;
            padding: 8px;
            display: inline-block;
            box-sizing: border-box;
          }
        `
      })
    },
    /**
     * 重置
     * @param {Object} data 表单数据
     */
    reset (data = {}) {
      this.responseData = {}
      this.cells = data.cells || []
      this.maxs = data.maxs || {}
      this.mins = data.mins || {}
      this.regexs = data.regexs || {}
      this.types = data.types || {}
      this.urls = data.urls || {}
      this.values = data.values || this.getValues()
    },
    /**
     * 获取单元格 class 属性
     * @returns {String} class 属性
     */
    getTdClass (id) {
      // 正则校验
      let ret = new RegExp(this.regexs[id]).test(this.values[id]) ? '' : 'bg-red'
      // 判断是否被选中
      if (this.ids.indexOf(id) === -1) {
        ret = ret.replace(/\s*select/, '')
      } else {
        ret += ' select'
      }

      return ret
    }
  }
}
</script>
