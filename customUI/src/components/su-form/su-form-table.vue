<!--
- Copyright © 2020 Guangdong Sun Railway Information Technology, Inc.
- All rights reserved.
-
- @author: Wang Peii <wangpeiyi@sunengineering.cn>
- @description 表格表单组件
-
- Changelog:
- Revision 1.0 2020-10-24 Wang Peii
- - 初始化
-->
<template>
  <el-form
    class="form-table batchForm"
    :show-message="false"
    :rules="model.rules"
    :model="model"
    @validate="checkItemValidate"
    ref="batchForm"
  >
    <!-- 表布局 -->
    <el-table
      ref="table"
      stripe
      fix
      border="border"
      :data="model.data"
      :max-height="maxHeight"
      :row-class-name="rowClassName"
      :header-row-class-name="headerrowClassName"
    >
      <div slot="empty" v-if="$slots.empty">
        <slot name="empty"></slot>
      </div>
      <el-table-column
        v-if="showIndex"
        width="62"
        type="index"
        :fixed="indexFixed"
        :resizable="false"
        header-align="left"
        align="center"
        label="序号"
      />
      <template v-for="(v, k) of columns">
        <el-table-column
          v-if="v.buttons"
          :key="'col' + k"
          :label="v.label || '操作'"
          :width="v.width || 60"
          :min-width="v.minWidth || 80"
          :align="v.align || 'left'"
          :header-align="v.headerAlign || 'left'"
        >
          <template slot-scope="scope">
            <div class="btn-cell">
              <el-form-item
                :width="v.width"
                :prop="'data.' + scope.$index + '.' + v.prop"
                :rules="model.rules[v.prop]"
                :key="i"
                v-for="(x, i) of v.buttons"
              >
                <su-button
                  v-if="x.text"
                  :type="x.type"
                  :key="'btn' + i"
                  :disabled="scope.row[x.disabledField] || x.disabled"
                  :fa="x.fa"
                  :data-index="k"
                  :icon="x.icon"
                  @click="handleClick(x, scope.$index)"
                >
                  <span class="action-button" :style="{color: x.color}">
                    {{ x.text }}
                  </span>
                </su-button>

                <su-button
                  v-if="x.textButton"
                  :type="x.type"
                  :key="'btn' + i"
                  :disabled="scope.row[x.disabledField] || x.disabled"
                  :fa="x.fa"
                  :data-index="k"
                  :icon="x.icon"
                  @click="handleClick(x, scope.$index)"
                >
                  <span class="action-button" :style="{color: x.color}">
                    {{ getTextButton(x, scope.$index) }}
                  </span>
                </su-button>
              </el-form-item>
            </div>
          </template>
        </el-table-column>

        <el-table-column
          v-else-if="v.type === 'upload'"
          :key="v.prop + k"
          :label="v.label || '操作'"
          :min-width="v.minWidth || 100"
          :width="v.width"
          :align="v.align || 'left'"
          :header-align="v.headerAlign || 'left'"
        >
          <template slot-scope="scope">
            <div class="file-list">
              <div
                class="file-item"
                v-for="(f, i) in v.formatData
                  ? v.formatData(scope.row[v.prop], scope.row)
                  : scope.row[v.prop]"
                :key="f.fileId || f.filePath"
              >
                <i
                  class="el-icon-delete"
                  v-if="scope.row.isEdit"
                  @click="removeFileHandler(v, scope.$index, i)"
                ></i>
                <el-image
                  :src="f.filePath"
                  fit="fill"
                  :lazy="true"
                  :preview-src-list="[f.filePath]"
                  v-if="'jpg,png,gif,jpeg'.includes(getFileExt(f.filePath))"
                ></el-image>
                <a :href="f.filePath" class="file-name" target="_blank" v-else>
                  {{ f.fileName || f.filePath }}
                </a>
              </div>
            </div>
            <el-upload
              v-if="
                scope.row.isEdit &&
                  (!scope.row[v.prop] || (scope.row[v.prop] && scope.row[v.prop].length < v.limit))
              "
              :action="uploadUrl"
              :headers="headers"
              :ref="'upload' + scope.$index + v.prop"
              :auto-upload="true"
              multiple
              :limit="v.limit"
              :on-success="(r, f, fl) => uploadSuccess(v, scope.$index, r, f, fl)"
              :on-error="(e, f, fl) => uploadError(v, scope.$index, e, f, fl)"
              :before-upload="
                file => {
                  return beforeUpload(v, scope.$index, file)
                }
              "
              :accept="v.accept"
              :name="v.uploadName"
              :data="v.data"
            >
              <el-button size="mini" type="text" icon="el-icon-upload">点击上传</el-button>
            </el-upload>
          </template>
        </el-table-column>

        <el-table-column
          v-else-if="v.type === 'daterange' || v.type === 'date'"
          :key="v.prop + k"
          :label="v.label || '操作'"
          :min-width="v.minWidth || 100"
          :width="v.width"
          :align="v.align || 'left'"
          :header-align="v.headerAlign || 'left'"
          :show-overflow-tooltip="
            v.showOverflowTooltip !== undefined ? v.showOverflowTooltip : true
          "
        >
          <template slot-scope="scope">
            <el-form-item
              :show-message="false"
              :prop="'data.' + scope.$index + '.' + v.prop"
              :rules="model.rules[v.prop]"
              v-if="scope.row.isEdit"
            >
              <el-date-picker
                v-model="scope.row[v.prop]"
                :type="v.type || 'date'"
                :format="v.format || 'yyyy-MM-dd'"
                :value-format="v.valueFormat || 'yyyy-MM-dd'"
                :placeholder="v.placeholder"
                range-separator="~"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </el-form-item>
            <div v-else>
              {{ v.formatter ? v.formatter(scope.row[v.prop], scope.row) : scope.row[v.prop] }}
            </div>
          </template>
        </el-table-column>

        <el-table-column
          v-else-if="v.type === 'number'"
          :key="v.prop + k"
          :label="v.label || '操作'"
          :min-width="v.minWidth || 100"
          :width="v.width"
          :align="v.align || 'left'"
          :header-align="v.headerAlign || 'left'"
          :show-overflow-tooltip="
            v.showOverflowTooltip !== undefined ? v.showOverflowTooltip : true
          "
        >
          <template slot-scope="scope">
            <el-form-item
              :show-message="false"
              :prop="'data.' + scope.$index + '.' + v.prop"
              :rules="model.rules[v.prop]"
              v-if="scope.row.isEdit"
            >
              <div :class="['su-number-input',{'su-number--suffix':v.suffixUnit}]">
                <el-input-number
                  :min="v.min"
                  :max="v.max"
                  v-model.trim="scope.row[v.prop]"
                  :placeholder="v.placeholder"
                ></el-input-number>
                <span v-if="v.suffixUnit" class="su-input__unit">{{v.suffixUnit}}</span>
              </div>
            </el-form-item>
            <div v-else>
              {{ v.formatter ? v.formatter(scope.row[v.prop], scope.row) : scope.row[v.prop] }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-else-if="v.type === 'select'"
          :key="v.prop + k"
          :label="v.label || '操作'"
          :min-width="v.minWidth || 100"
          :width="v.width"
          :align="v.align || 'left'"
          :header-align="v.headerAlign || 'left'"
          :show-overflow-tooltip="
            v.showOverflowTooltip !== undefined ? v.showOverflowTooltip : true
          "
        >
          <template slot-scope="scope">
            <el-form-item
              :show-message="false"
              :prop="'data.' + scope.$index + '.' + v.prop"
              :rules="model.rules[v.prop]"
              v-if="scope.row.isEdit"
            >
              <el-select
                v-if="typeof v.options === 'function'"
                v-model="scope.row[v.prop]"
                :placeholder="v.placeholder"
                :multiple="v.multiple || false"
                :collapse-tags="v.collapseTags || false"
                :disabled="v.disabled || disabled"
                :filterable="v.filterable"
                :remote="v.remote"
                :reserve-keyword="v.reserveKeyword"
                :allow-create="v.allowCreate"
                :remote-method="val => remoteMethodHandler(val, v, scope.row, scope.$index)"
                :default-first-option="v.defaultFirstOption"
                @change="val => changeHandler(val, v, scope.row, scope.$index)"
              >
                <el-option
                  v-for="item in scope.row[v.prop + '_' + 'options'] ||
                    v.options(scope.row[v.prop], scope.$index, scope)"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>

              <el-select
                v-else
                v-model="scope.row[v.prop]"
                :placeholder="v.placeholder"
                :multiple="v.multiple || false"
                :collapse-tags="v.collapseTags || false"
                :disabled="v.disabled || disabled"
                :filterable="v.filterable"
                :remote="v.remote"
                :reserve-keyword="v.reserveKeyword"
                :allow-create="v.allowCreate"
                :default-first-option="v.defaultFirstOption"
                :remote-method="val => remoteMethodHandler(val, v, scope.row, scope.$index)"
                @change="val => changeHandler(val, v, scope.row, scope.$index)"
              >
                <el-option
                  v-for="item in scope.row[v.prop + '_' + 'options'] || v.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <div v-else>
              {{ v.formatter ? v.formatter(scope.row[v.prop], scope.row) : scope.row[v.prop] }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-else-if="v.type === 'cascader'"
          :key="v.prop + k"
          :label="v.label || '操作'"
          :min-width="v.minWidth || 100"
          :width="v.width"
          :align="v.align || 'left'"
          :header-align="v.headerAlign || 'left'"
          :show-overflow-tooltip="
            v.showOverflowTooltip !== undefined ? v.showOverflowTooltip : true
          "
        >
          <template slot-scope="scope">
            <el-form-item
              :show-message="false"
              :prop="'data.' + scope.$index + '.' + v.prop"
              :rules="model.rules[v.prop]"
              v-if="scope.row.isEdit"
            >
              <el-cascader
                :filterable="v.filterable || false"
                :separator="v.separator"
                :clearable="v.clearable || false"
                :readonly="v.readonly"
                v-model.trim="scope.row[v.prop]"
                :show-all-levels="v.showAllLevels"
                :props="v.props"
                :options="v.options || []"
                :expand-trigger="v.expandTrigger || 'hover'"
                :change-on-select="v.changeOnSelect || false"
                :disabled="v.disabled || disabled"
                @change="val => changeHandler(val, v, scope.row, scope.$index)"
              />
            </el-form-item>
            <div v-else>
              {{ v.formatter ? v.formatter(scope.row[v.prop], scope.row) : scope.row[v.prop] }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-else
          :key="v.prop + k"
          :label="v.label || '操作'"
          :min-width="v.minWidth || 100"
          :width="v.width"
          :align="v.align || 'left'"
          :header-align="v.headerAlign || 'left'"
          :show-overflow-tooltip="
            v.showOverflowTooltip !== undefined ? v.showOverflowTooltip : true
          "
        >
          <template slot-scope="scope">
            <el-form-item
              :show-message="false"
              :prop="'data.' + scope.$index + '.' + v.prop"
              :rules="model.rules[v.prop]"
              v-if="scope.row.isEdit"
            >
              <el-input
                :minlength="v.minlength"
                :maxlength="v.maxlength"
                v-model.trim="scope.row[v.prop]"
                :placeholder="v.placeholder"
                :disabled="v.disabled || disabled"
              >
                <span v-if="v.suffixUnit" slot="suffix" class="el-input__unit">{{v.suffixUnit}}</span>
              </el-input>
            </el-form-item>
            <div v-else>
              {{ v.formatter ? v.formatter(scope.row[v.prop], scope.row) : scope.row[v.prop] }}
            </div>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div v-if="showBatchBtn" @click="addItem()" class="app-dialog-btn">
      <i class="el-icon-plus"></i><span>新增</span>
    </div>
    <div class="table-add-btn" v-if="$slots.addBtn">
      <slot name="addBtn"></slot>
    </div>
  </el-form>
</template>
<script>
export default {
  props: {
    uploadUrl: {
      type: String,
      default: '',
    },
    headers: {
      type: Object,
      default: () => ({}),
    },
    maxHeight: {
      type: String,
      default() {
        return '800px'
      },
    },
    addClickSuccess: {
      type: Function,
      default: () => {},
    },
    addClickError: {
      type: Function,
      default: () => {},
    },
    showIndex: {
      type: Boolean,
      default: true,
    },
    showBatchBtn: {
      type: Boolean,
      default() {
        return true
      },
    },
    rowClassName: {
      type: Function,
      default: () => {
        return 'row-defalut-class'
      },
    },
    headerrowClassName: {
      type: Function,
      default: () => {
        return 'header-defalut-row-class'
      },
    },
    indexFixed: {
      type: String,
    },
    model: {
      type: Object,
    },
    columns: {
      type: Array,
    },
    limit: {
      type: Number,
    },
    btnSlot: {},
  },
  data() {
    return {
      validateFlag: false,
    }
  },
  watch: {
    model: {
      handler: function() {
        this.$forceUpdate()
      },
      deep: true,
    },
  },
  methods: {
    getFileExt(filePath) {
      if (!filePath) return ''
      const dotIdx = filePath.lastIndexOf('.')
      return dotIdx > -1 ? filePath.substr(dotIdx + 1) : ''
    },
    // 外部调用校验表单方法
    validate(callback) {
      this.$refs['batchForm'].validate(validate => callback(validate))
    },
    // 删除子项
    delItem(e, i) {
      this.model.data.splice(i, 1)
    },
    // 新增子项
    addItem() {
      if (this.model.data.length < this.limit) {
        this.model.data.push({isEdit: true})
        this.addClickSuccess()
      } else {
        this.addClickError()
      }
    },
    async handleClick(tar, i) {
      if (tar.text === '删除' || tar.action === 'delete') {
        if (tar.onClick) {
          const res = await tar.onClick(this.model.data[i], i)
          if (res) {
            this.delItem(tar, i)
          }
        }
      } else {
        tar.onClick(this.model.data[i], tar)
        this.changeKey += 1
      }
    },
    getTextButton(tar, i) {
      return tar.textButton(this.model.data[i])
    },
    reset() {
      this.$refs.batchForm.resetFields()
    },
    // 检查表单验证
    checkItemValidate(e, validate, message) {
      if (!validate && !this.validateFlag) {
        this.$message({
          message,
          type: 'error',
          showClose: true,
        })
        this.validateFlag = true
      }
      setTimeout(() => {
        this.validateFlag = false
      }, 500)
    },
    uploadSuccess(data, idx, response, file, fileList) {
      data.success &&
        data.success(data, idx, response, file, fileList, this.$refs['upload' + idx + data.prop])
    },
    uploadError(data, idx, err, file, fileList) {
      data.error && data.error(data, idx, err, file, fileList)
    },
    beforeUpload(data, idx, file) {
      if (data.beforeUpload) {
        return data.beforeUpload(data, idx, file, this.$refs['upload' + idx + data.prop])
      }
    },
    removeFileHandler(tar, rowIdx, fileIdx) {
      let files = this.model.data[rowIdx][tar.prop]
      if (Object.prototype.toString.call(files) === '[object String]') {
        try {
          files = JSON.parse(files)
        } catch (error) {
          files = files.split(',')
        }
      }
      if (Object.prototype.toString.call(files) === '[object Array]') {
        files.splice(fileIdx, 1)
        this.model.data[rowIdx][tar.prop] = files
      }
    },
    remoteMethodHandler(val, column, row, index) {
      column.remoteMethod && column.remoteMethod(val, row, index)
    },
    changeHandler(val, column, row, index) {
      column.onChange && column.onChange(val, row, index)
    },
  },
}
</script>
<style lang="scss" scoped>
.el-form .el-form-item {
  margin-bottom: 0;
}
.app-dialog-btn {
  border: 1px dashed #3c86ff;
  line-height: 40px;
  margin: 10px auto 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #3c86ff;
  cursor: pointer;
}
::v-deep.el-form-item__content .el-input__inner {
  height: 31px !important;
  border: 1px solid #dde2ee;
}
.btn-cell {
  display: flex;
}
.file-list {
  display: flex;
  justify-content: center;
}
.file-item {
  position: relative;
  margin-right: 10px;
  display: flex;
  &:last-child {
    margin-right: 0;
  }
  i {
    position: absolute;
    color: #df4848;
    right: -5px;
    bottom: 0;
    cursor: pointer;
    z-index: 9999;
  }
  ::v-deep .el-image {
    width: 40px;
    height: 40px;
  }
}
::v-deep .el-upload {
  .el-button--text {
    color: #959ba6;
  }
}
</style>
