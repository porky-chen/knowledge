<!--
- Copyright © 2020 Guangdong Sun Railway Information Technology, Inc.
- All rights reserved.
-
- @author: Liao Chen Xi <liaochenxi@sunengineering.cn>
- @description 表单组件
-
- Changelog:
- Revision 1.0 2020-06-04 Liao Chen Xi
- - 初始化
-->
<template>
  <el-form class='batchForm' :show-message='false' :rules='model.rulse' :model='model' @validate='checkItemValidate' ref='batchForm'>
    <!-- 表布局 -->
    <el-table ref='table' stripe fit border='border' :data='model.data' :max-height='maxHeight'>
      <el-table-column v-if='showIndex' width='62' type='index' :fixed='indexFixed' :resizable='false' header-align='left' align='center' label='序号' />
      <template v-for='(v, k) of columns'>
        <el-table-column :label-class-name="(v.require!==undefined && v.require===true)?'require-icon':null" v-if='v.buttons' :key="'col' + k" :label="v.label || '操作'" :width='v.width || 60' :min-width='v.minWidth || 80' :align="v.align || 'left'"
                         :header-align="v.headerAlign || 'left'">
          <template slot-scope='scope'>
            <el-form-item :width='v.width' :prop="'data.' + scope.$index +'.'+ v.prop" :rules='model.rules[v.prop]' :key='i' v-for='(x, i) of v.buttons'>
              <su-button v-if='x.text' :type='x.type' :key="'btn' + i" :disabled='x.disabled' :fa='x.fa' :data-index='k' :icon='x.icon' @click='handleClick(x,scope.$index)'>
                <!--<span class="action-button" :style="{color: x.color || 'rgba(52, 139, 245, 1)'}">{{x.text}}</span>-->
                {{ x.text }}
              </su-button>

              <su-button v-if='x.textButton' :type='x.type' :key="'btn' + i" :disabled='x.disabled' :fa='x.fa' :data-index='k' :icon='x.icon' @click='handleClick(x,scope.$index)'>
                <!-- <span class="action-button" :style="{color: x.color || 'rgba(52, 139, 245, 1)'}">{{getTextButton(x,scope.$index)}}</span> -->
                {{ getTextButton(x, scope.$index) }}
              </su-button>

            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column :label-class-name="(v.require!==undefined && v.require===true)?'require-icon':null" v-else-if="v.type==='number'" :key='v.prop + k' :label="v.label || '操作'" :min-width='v.minWidth || 100' :width='v.width' :align="v.align || 'left'"
                         :header-align="v.headerAlign || 'left'">
          <template slot-scope='scope'>
            <el-form-item :show-message='false' :prop="'data.' + scope.$index +'.'+  v.prop" :rules='model.rules[v.prop]'>
              <div :class="['su-number-input',{'su-number--suffix':v.suffixUnit}]">
                <el-input-number v-bind='v'
                                 v-model.trim='scope.row[v.prop]'
                                 @change='handleChange(v,scope.$index)'
                />
                <span v-if='v.suffixUnit' class='su-input__unit'>{{ v.suffixUnit }}</span>
              </div>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column :label-class-name="(v.require!==undefined && v.require===true)?'require-icon':null" v-else-if="v.type==='daterange' || v.type === 'date'" :key='v.prop + k' :label="v.label || '操作'" :min-width='v.minWidth || 100' :width='v.width'
                         :align="v.align || 'left'" :header-align="v.headerAlign || 'left'">
          <template slot-scope='scope'>
            <el-form-item :show-message='false' :prop="'data.' + scope.$index +'.'+  v.prop" :rules='model.rules[v.prop]'>
              <el-date-picker v-model='scope.row[v.prop]' :type="v.type || 'date'" :format="v.format || 'yyyy-MM-dd'" :value-format="v.valueFormat || 'yyyy-MM-dd'" :placeholder='v.placeholder' range-separator='~' start-placeholder='开始日期' end-placeholder='结束日期'
                              @change='handleChange(v,scope.$index)'></el-date-picker>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column :label-class-name="(v.require!==undefined && v.require===true)?'require-icon':null" v-else-if="v.type==='select'" :key='v.prop + k' :label="v.label || '操作'" :min-width='v.minWidth || 100' :width='v.width' :align="v.align || 'left'"
                         :header-align="v.headerAlign || 'left'">
          <template slot-scope='scope'>

            <el-form-item :show-message='false' :prop="'data.' + scope.$index +'.'+  v.prop" :rules='model.rules[v.prop]'>

              <el-select @change='handleChange(v,scope.$index)'
                         v-if=" typeof v.options==='function'"
                         v-bind='v'
                         v-model='scope.row[v.prop]'
                         placeholder='请选择'>
                <el-option v-for='item in v.options(scope.row[v.prop],scope.$index,scope)' :key='item.value' :label='item.label' :value='item.value'>
                </el-option>
              </el-select>

              <el-select @change='handleChange(v,scope.$index)'
                         v-else
                         v-bind='v'
                         v-model='scope.row[v.prop]'
                         placeholder='请选择'>
                <el-option v-for='item in v.options' :key='item.value' :label='item.label' :value='item.value'>
                </el-option>
              </el-select>

            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column :label-class-name="(v.require!==undefined && v.require===true)?'require-icon':null" v-else-if="v.type==='cascader'" :key='v.prop + k' :label="v.label || '操作'" :min-width='v.minWidth || 100' :width='v.width' :align="v.align || 'left'"
                         :header-align="v.headerAlign || 'left'">
          <template slot-scope='scope'>

            <el-form-item :show-message='false' :prop="'data.' + scope.$index +'.'+  v.prop" :rules='model.rules[v.prop]'>
              <el-cascader size='small' :placeholder='v.placeholder' :props='v.props' :filterable='v.filterable || false' v-model='scope.row[v.prop]' :options='v.options' @change='handleChange(v,scope.$index)'></el-cascader>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column :label-class-name="(v.require!==undefined && v.require===true)?'require-icon':null" v-else :key='v.prop  + k ' :label="v.label || '操作'" :min-width='v.minWidth || 100' :width='v.width' :align="v.align || 'left'"
                         :header-align="v.headerAlign || 'left'">
          <template slot-scope='scope'>
            <el-form-item :show-message='false' :prop="'data.' + scope.$index +'.'+  v.prop" :rules='model.rules[v.prop]'>
              <el-tooltip effect='dark' :content='scope.row[v.prop]' placement='top' v-if='v.showOverflowTooltip !== undefined ? v.showOverflowTooltip : false '>
                <el-input :disabled='v.disabled' :minlength='v.minlength' :maxlength='v.maxlength' v-model.trim='scope.row[v.prop]' :placeholder='v.placeholder'>
                  <span v-if='v.suffixUnit' slot='suffix' class='el-input__unit'>{{ v.suffixUnit }}</span>
                </el-input>
              </el-tooltip>
              <el-input :disabled='v.disabled' :minlength='v.minlength' :maxlength='v.maxlength' v-model.trim='scope.row[v.prop]' :placeholder='v.placeholder' v-else>
                <span v-if='v.suffixUnit' slot='suffix' class='el-input__unit'>{{ v.suffixUnit }}</span>
              </el-input>
            </el-form-item>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div v-if='showBatchBtn' @click='addItem()' class='app-dialog-btn'>
      <i class='el-icon-plus'></i><span>新增</span>
    </div>
  </el-form>
</template>
<script>

import {
  Form,
  Table,
  DatePicker,
  Select,
  Cascader,
  Tooltip,
  Input,
} from 'element-ui'

export default {
  components: {
    'el-form': Form,
    'el-input': Input,
    'el-table': Table,
    'el-date-picker': DatePicker,
    'el-select': Select,
    'el-cascader': Cascader,
    'el-tooltip': Tooltip,
  },
  props: {
    maxHeight: {
      type: String,
      default() {
        return '800px'
      },
    },
    addClickSuccess: {
      type: Function,
      default: () => {
      },
    },
    addClickError: {
      type: Function,
      default: () => {
      },
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
    indexFixed: {
      type: Boolean,
      default: true,
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
        this.model.data.push({})
        this.addClickSuccess()
      } else {
        this.addClickError()
      }
    },
    handleClick(tar, i) {
      if (tar.text === '删除') {
        this.delItem(tar, i)
        if (tar.onClick) {
          tar.onClick(this.model.data[i], tar)
        }
      } else {
        if (tar.onClick) {
          tar.onClick(this.model.data[i], tar, i)
        }
        this.changeKey += 1
      }
    },
    handleChange(tar, i) {
      if (tar.onChange) {
        tar.onChange(this.model.data[i], tar)
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
  },
}
</script>
<style lang='scss' scoped>
.batchForm ::v-deep .cell .el-form-item {
  margin: 10px 0 !important;
}

.app-dialog-btn {
  border: 1px dashed #3B86FF;
  line-height: 40px;
  margin: 10px auto 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #3B86FF;
  cursor: pointer;
}

.app-dialog-btn:hover {
  color: #5D9BFF;
}

.batchForm ::v-deep .el-form-item__content .el-input {
  background: none !important;
}

.batchForm ::v-deep .el-form-item__content .el-input__inner {
  height: 31px !important;
  border: 0;
  background: none !important;
}

::v-deep .el-input__icon {
  line-height: 32px !important;
}

// ::v-deep.el-cascader .el-input .el-icon-arrow-down {
//   width: 10px;
//   height: 6px;
//   font-size: 0;
//   background-image: url(../../assets/ic_down.png);
//   background-repeat: no-repeat;
//   background-position: center;
//   position: absolute;
//   right: 7px;
//   top: 50%;
//   margin-top: -3px;
//   transform: rotate(50);
// }
</style>
