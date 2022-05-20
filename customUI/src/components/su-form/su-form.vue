<!--
  - Copyright © 2020 Guangdong Sun Railway Information Technology, Inc.
  - All rights reserved.
  -
  - @author: Liao chenxi <liaochenxi@sunengineering.cn>
  - @description 多选组件
  -
  - Changelog:
  - Revision 1.0 2020-06-03 Liao chenxi
  - - 初始化
  -->
<template>
  <el-form @keyup.enter.native='handlerenter'
           v-bind='filterAttributes({
              targetObj: $attrs,
              excludePrefixes: ["disabled", "label-position", "label-width","model"]
           })'
           v-on='filterAttributes({
              targetObj: $listeners,
              excludePrefixes: []
           })'
           class='su-form'
           :class='disabled ? "form-disabled" : "form-enabled"'
           ref='form'
           :disabled='disabled'
           :label-position='labelPosition'
           :label-width='labelWidth'
           :model='model'
           @submit.native.prevent
  >
    <slot>
      <el-row :gutter='33'>
        <el-col v-for='item of items' :key='item.field'
                :span='item.span || 12' :offset='item.offset'
                :style='item.colstyle'
                :class='item.class'
                v-show='item.shows !== undefined ? item.shows : true'>

          <el-form-item :prop='item.field'
                        :label='item.label'
                        :label-width='item.labelWidth'
                        :rules='disabled !== true ? item.rules : null'
          >
            <el-input :readonly='item.readonly'
                      :resize='item.resize'
                      v-if="item.type === 'textarea'"
                      type='textarea'
                      :autosize='{
                      minRows: item.minRows || 1,
                      maxRows: item.maxRows || 8
                    }'
                      :placeholder='getPlaceholder(item)'
                      v-model.trim='model[item.field]'
                      :maxlength='item.maxlength || 500'
                      :minlength='item.minlength'
                      :disabled='item.disabled || disabled'
                      :showWordLimit='item.showWordLimit || false'
            />
            <el-select @click.native='clickHandle(item)'
                       v-else-if="item.type === 'select'"
                       v-model.trim='model[item.field]'
                       :placeholder='getPlaceholder(item)'
                       :multiple='item.multiple || false'
                       :clearable='item.clearable||true'
                       :disabled='item.disabled || disabled'
                       :collapse-tags='item.collapseTags || item.multiple ? true : false'
                       :allow-create='item.allowcreate || false'
                       :filterable='item.filterable!==undefined?item.filterable:true'
                       @change='changeSelect(item, $event)'
            >
              <el-option :title='option[item.labelField] || option.label'
                         :style="{'max-width':item.optionMaxWidth}"
                         v-for='(option, i) of item.options || []'
                         :key='i'
                         :label='option[item.labelField] || option.label'
                         :value='option[item.valueField] || option.value'
              />
            </el-select>
            <el-button v-else-if="item.type === 'button'" :type="item.buttonType || 'primary'" :icon='item.icon' :disabled='item.disabled || disabled' @click='e => handler(item.click, e)'>{{ item.name }}</el-button>
            <el-radio-group v-else-if="item.type === 'radio'" @change='val => handler(item.onChange, val)' v-model.trim='model[item.field]'>
              <el-radio v-for='option of item.options' :key='option[item.valueField] || option.value' :label='option[item.valueField] || option.value' :disabled='item.disabled || disabled || false'>{{ option[item.labelField] || option.label }}</el-radio>
            </el-radio-group>
            <el-checkbox-group v-else-if="item.type === 'checkbox'" v-model.trim='model[item.field]'>
              <el-checkbox v-for='option of item.options' :key='option[item.valueField] || option.value' :label='option[item.valueField] || option.value' :disabled='item.disabled || disabled'>{{ option[item.labelField] || option.label }}</el-checkbox>
            </el-checkbox-group>
            <!-- switch按钮组 -->
            <el-switch v-else-if="item.type === 'switch'"
                       v-model='model[item.field]'
                       @change='val => handler(item.onChange, val)'
                       :disabled='item.disabled || disabled'
                       :width='item.width || 40'
                       :name='item.name || ""'
                       :active-icon-class='item.activeIconClass || ""'
                       :inactive-icon-class='item.inactiveIconClass || ""'
                       :active-text='item.activeText || ""'
                       :inactive-text='item.inactiveText || ""'
                       :active-color='item.activeColor || "#409EFF"'
                       :inactive-color='item.inactiveColor || "#C0CCDA"'
                       :active-value='item.activeValue'
                       :inactive-value='item.inactiveValue'
            ></el-switch>
            <!-- 中心里程 -->
            <el-input @mouseover.native='onmouseover(model[item.field])' v-else-if="item.type === 'centerUnit'" v-model.trim='model[item.field]' :placeholder='getPlaceholder(item)' :maxlength='item.maxlength || 50' :minlength='item.minlength' size='small'></el-input>
            <el-input @mouseover.native='onmouseover(model[item.field])' v-else-if="item.type === 'centerMileage'" v-model.trim='model[item.field]' :placeholder='getPlaceholder(item)' :maxlength='item.maxlength || 50' :minlength='item.minlength' size='small'></el-input>
            <!-- 批量新增 -->
            <su-form-batch v-else-if="item.type === 'batch'" :showIndex='item.showIndex' ref='batchForm' :maxHeight='item.maxHeight' :showBatchBtn='item.showBatchBtn' :limit='item.columnLimit' :columns='item.columns' :model='model[item.field]'
                           :addClickSuccess='item.addClickSuccess' :addClickError='item.addClickError'></su-form-batch>
            <!-- 批量新增：单个编辑 -->
            <su-form-table v-else-if="item.type === 'table'" :showIndex='item.showIndex' ref='batchForm' :uploadUrl='item.uploadUrl' :headers='item.headers' :maxHeight='item.maxHeight' :showBatchBtn='item.showBatchBtn' :limit='item.columnLimit' :columns='item.columns'
                           :model='model[item.field]' :addClickSuccess='item.addClickSuccess' :addClickError='item.addClickError'>
              <div slot='empty' v-if='$slots.empty'>
                <slot name='empty'></slot>
              </div>
              <div class='add-btn' slot='addBtn'>
                <slot name='addBtn'></slot>
              </div>
            </su-form-table>
            <div :class="['su-number-input',{'su-number--suffix':item.suffixUnit}]" v-else-if="item.type === 'number'">
              <el-input-number v-model.trim='model[item.field]'
                               :min='item.min'
                               :max='item.max'
                               :placeholder='getPlaceholder(item)'
                               :disabled='item.disabled || disabled'
                               :precision='item.precision'
                               :step='item.step'
                               :step-strictly='item.stepStrictly'
                               @change='val => handler(item.change, val)'
              />
              <span v-if='item.suffixUnit' class='su-input__unit'>{{ item.suffixUnit }}</span>
            </div>
            <el-cascader :filterable='item.filterable || false'
                         :separator='item.separator'
                         :multiple='item.multiple'
                         :clearable='item.clearable || false'
                         :readonly='item.readonly'
                         v-else-if="item.type === 'cascader'"
                         v-model.trim='model[item.field]'
                         :show-all-levels='item.showAllLevels'
                         :props='item.props'
                         :options='item.options || []'
                         :expand-trigger="item.expandTrigger || 'hover'"
                         @change='val => handler(item.change, val)'
                         @active-item-change='val => handler(item.activeItemChange, val)'
                         :change-on-select='item.changeOnSelect || false'
                         :disabled='item.disabled || disabled'
                         :popper-class='item.popperClass'
            />
            <!-- 日期选择器 -->
            <su-date-picker @changeDate='changeDate'
                            :disabled='item.disabled || disabled'
                            :readonly='item.readonly'
                            @click.native='clickHandle(item)'
                            ref='date'
                            v-else-if="item.type === 'date'"
                            :showFutureTime='item.showFutureTime'
                            v-model='model[item.field]'
                            :rangeSeparator='item.rangeSeparator'
                            :type='item.dateType'
                            :valueFormat='item.valueFormat'
                            :format='item.format'
                            :placeholder='getPlaceholder(item)'
                            :startPlaceholder='item.startPlaceholder'
                            :endPlaceholder='item.endPlaceholder'
                            :clearable='item.clearable'
            />
            <!-- 远程搜索 -->
            <su-autocomplete v-else-if="item.type === 'autocomplete'"
                             :maxlength='item.maxlength || 500'
                             :minlength='item.minlength'
                             :autocompleteItems='item'
                             :autocompleteData='model'
            />
            <!-- 上传 -->
            <!--            :uploadName='item.uploadName'-->
            <!--            :headers='item.headers'-->
            <!--            :fileTableColumns='item.fileTableColumns'-->
            <!--            :uploadFileUrl='item.uploadFileUrl'-->
            <su-upload ref='upload'
                       v-else-if="item.type === 'upload'"
                       :disabled='item.disabled || disabled'
                       @removeFile='removeFile'
                       @uploadSuccess='uploadSuccess'
                       v-bind='item'
                       :item='item.uploadItem'
                       v-model='model[item.field].fileData'
            />
            <div v-else-if="item.type==='slot'">
              <slot :name='item.slotID' :item='item'></slot>
            </div>
            <el-tooltip v-else-if="item.type === 'tooltip'" class='tooltip-item' effect='dark' :content='item.tooltipstr' placement='right'>
              <el-input :show-password='isShowPassword(item.showPassword)' :style="`${item.showPassword ? '-webkit-text-security:disc;text-security:disc;-mox-text-security:disc' : none }`" @mouseover.native='onmouseover(model[item.field])'
                        @click.native='clickHandle(item)' v-model.trim='model[item.field]' :clearable='item.clearable' :disabled='item.disabled || disabled' :placeholder='getPlaceholder(item)' :maxlength='item.maxlength || 50' :minlength='item.minlength' @input='change'
                        @change='val => handler(item.change, val)' />
            </el-tooltip>
            <el-input auto-complete='off' autocomplete='new-passowrd' @mouseover.native='onmouseover(model[item.field])' @click.native='clickHandle(item)' v-else-if="item.type === 'password'" show-password v-model.trim='model[item.field]' :clearable='item.clearable'
                      :disabled='item.disabled || disabled' :placeholder='getPlaceholder(item)' :maxlength='item.maxlength || 50' :minlength='item.minlength' @input='change' @change='val => handler(item.change, val)'>
            </el-input>
            <div v-else-if="item.type === 'textDisplay'"
                 class='text-overflow'
                 :class='item.class'
                 :style='{color: `${getColor(item,model[item.field])}`}'
            >
              {{ getText(item, model[item.field]) }}
            </div>
            <el-input :suffix-icon='item.suffixIcon'
                      auto-complete='off'
                      autocomplete='new-passowrd'
                      @mouseover.native='onmouseover(model[item.field])'
                      @click.native='clickHandle(item)'
                      v-else
                      v-model.trim='model[item.field]'
                      :clearable='item.clearable'
                      :disabled='item.disabled || disabled'
                      :placeholder='getPlaceholder(item)'
                      :maxlength='item.maxlength || 50'
                      :minlength='item.minlength'
                      @input='change'
                      @change='val => handler(item.change, val)'
            >
              <span v-if='item.suffixUnit' slot='suffix' class='el-input__unit'>{{ item.suffixUnit }}</span>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </slot>
  </el-form>
</template>
<script>
import _ from 'lodash'
import SuFormBatch from './su-form-batch'
import SuFormTable from './su-form-table'
import SuComponent from '@/mixins/su-component'
import {
  Input,
  Form,
  Select,
  Button,
  Radio,
  Checkbox,
  Switch,
  Cascader,
  Tooltip,
} from 'element-ui'

export default {
  name: 'su-form',
  mixins: [SuComponent],
  components: {
    SuFormBatch,
    SuFormTable,
    'el-input': Input,
    'el-select': Select,
    'el-button': Button,
    'el-radio': Radio,
    'el-checkbox': Checkbox,
    'el-switch': Switch,
    'el-cascader': Cascader,
    'el-tooltip': Tooltip,
    'el-form': Form,
  },
  props: {
    // 是否显示占位符
    showPlaceHolder: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    items: {
      type: Array,
      default() {
        return []
      },
    },
    labelPosition: {
      type: String,
      default: 'left',
    },
    labelWidth: {
      type: String,
      default: '95px',
    },
    model: {
      type: Object,
      default() {
        return {}
      },
    },
    fileTableColumns: {
      type: Array,
    },
    uploadItem: {
      type: Array,
    },
  },
  data() {
    return {
      readonly: false,
    }
  },
  methods: {
    getRef() {
      return this.$refs.form
    },
    getPlaceholder(item) {
      if (!this.showPlaceHolder) {
        return ''
      }

      if (_.isEmpty(item.placeholder)) {
        return ''
      }

      return item.placeholder
    },
    isShowPassword(showPassword) {
      return navigator.userAgent.indexOf('Firefox') >= 0 && showPassword
    },
    onmouseover(val) {
      if (val) {
        event.target.title = val
      }
    },
    //处理事件
    handler(callback = () => {
    }, val) {
      console.log(val)
      callback(val)
    },
    // 解决表单下拉框已选择但校验还是报错问题
    changeSelect(item, $event) {

      // 新增返回勾选项
      let tar = {}
      for (let index = 0; index < item.options.length; index++) {
        const el = item.options[index]
        if (el.value === $event) {
          tar = el
        }
      }

      this.$refs.form.validateField(item.field, () => {
      })
      if (item.onChange) {
        item.onChange(item, tar)
      }
    },
    //清除表单校验结果
    clearValidate() {
      this.$refs.form.clearValidate()
    },
    //重置表单并清除校验结果
    resetFields() {
      this.$nextTick(() => {
        if (this.$refs.upload) {
          this.$refs.upload.forEach(item => {
            item.clearFile()
          })
        }
      })
      this.$refs.form.resetFields()
      if (this.$refs.batchForm) {
        this.$refs.batchForm[0].reset()
      }
      if (this.$refs.date) {
        this.$refs.date[0].dateValue = ''
      }
    },
    // 校验单个
    validateField(id) {
      this.$refs.form.validateField(id, () => {
      })
    },
    //校验表单
    validate(callback) {
      this.$refs.form.validate((validate) => {
        if (validate) {
          if (this.$refs.batchForm) {

            this.$refs.batchForm[0].validate((e) => callback(e))
          } else {
            callback(validate)
          }
        }
      })
    },
    // 上传成功
    uploadSuccess(e) {
      this.$emit('uploadSuccess', e)
    },
    // 删除图片
    removeFile(id) {
      this.$emit('removeFile', id)
    },
    // 日历选择回调
    changeDate(value, id) {
      this.$emit('changeDate', value, id)
    },
    // 解决输入框输入不了问题
    change() {
      // this.$forceUpdate()
    },
    // 点击事件
    clickHandle(item) {
      if (item.onClick) {
        item.onClick()
      }
    },
    handlerenter() {
      this.$emit('keyenter')
    },
    // 清空上传的文件
    clearUploadFile() {
      this.$refs.upload[0].clearFile()
    },
    getColor(opts = {}, value) {
      const {color} = opts
      return color instanceof Function ? color(value) : color
    },
    getText(opts = {}, value) {
      const {text} = opts
      return text instanceof Function ? text(value) : value
    },
  },
}
</script>
<style lang='scss'>
.su-form .el-tooltip__popper.is-dark {
  width: 231px !important;
  opacity: 0.6 !important;
  background: #12223e !important;
  word-wrap: break-word !important;
  word-break: break-all !important;
}
</style>
<style lang='scss' scoped>
.form-disabled ::v-deep .el-form-item__label {
  color: #A0A7B3 !important;
}

.form-disabled ::v-deep .el-form-item__content {
  color: #3D434E !important;
}

.form-enabled ::v-deep .el-form-item__label {
  color: #3d434e !important;
}

.form-enabled ::v-deep .el-form-item__content {
  color: unset !important;
}

::v-deep.centerMileage {
  padding-left: 0 !important;
}

.text-overflow {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
