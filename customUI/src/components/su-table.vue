<!--
  - Copyright © 2020 Guangdong Sun Railway Information Technology, Inc.
  - All rights reserved.
  -
  - @author: wu jiajin <wujiajin@sunengineering.cn>
  - @description 列表组件
  -
  - Changelog:
  - Revision 1.0 2020-06-01 wu jiajin
  - - 初始化
  -
  - - Changelog:
  - Revision 1.1 2020-10-23 Wang Peii
  - Revision 1.0.0 2020-11-04 规范3.0下组件库调整
  - - 自定义空数据
  -
  -->

<template>
  <div class="su-table-view">
    <div class="su-table-left-view" v-if="$slots.tableLeftView">
      <slot name="tableLeftView" />
    </div>
    <div class="su-table-content-view">
      <div
        class="su-table-header-view"
        v-if="$slots.tableHeaderLeftView || $slots.tableHeaderRightView"
      >
        <div class="su-table-header-left-view" v-if="$slots.tableHeaderLeftView">
          <slot name="tableHeaderLeftView" />
        </div>
        <div class="su-table-header-right-view" v-if="$slots.tableHeaderRightView">
          <slot name="tableHeaderRightView" />
        </div>
      </div>
      <el-table
        class="su-table"
        :class="{'su-table-with-left-view': $slots.tableHeaderLeftView}"
        ref="table"
        v-bind="$attrs"
        v-on="
          filterAttributes({
            targetObj: $listeners,
            excludePrefixes: ['row-click', 'selection-change'],
          })
        "
        :check-strictly="false"
        :span-method="$attrs['span-method'] || objectSpanMethod"
        :fit="fit"
        :border="border"
        :data="data"
        :height="tableHeight"
        :max-height="maxHeight"
        :row-key="$attrs['row-key'] || id"
        :row-class-name="rowClassName"
        :header-row-class-name="$attrs['header-row-class-name'] || headerrowClassName"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        @row-click="handleRowClick"
        @selection-change="handleSelectionChange"
        @filter-change="handleFilterChange"
      >
        <template slot="append">
          <slot name="append" />
        </template>
        <div class="empty" v-if="$slots.empty" slot="empty">
          <slot name="empty"></slot>
        </div>

        <el-table-column
          v-if="showCheckbox"
          width="49"
          type="selection"
          :resizable="false"
          :selectable="selectable"
        />

        <el-table-column
          v-if="showIndex"
          :width="indexwidth"
          type="index"
          :fixed="indexFixed"
          :index="index"
          :resizable="false"
          header-align="center"
          align="center"
          label="序号"
        />

        <template v-for="(v, k) of columns">
          <el-table-column
            v-if="v.buttons"
            :resizable="v.resizable !== undefined ? v.resizable : true"
            :key="'col' + k"
            :prop="v.prop"
            :label="v.label || '操作'"
            :width="v.width || 60"
            :min-width="v.minWidth || 100"
            :align="v.align || 'left'"
            :header-align="v.headerAlign || 'left'"
            :column-key="v.prop"
            :filters="v.filters"
            :fixed="v.fixed"
            :render-header="v.renderHeader"
          >
            <div class="buttons-cell" slot-scope="scope">
              <template v-if="v.round">
                <!-- 为空时:透明,primary:蓝色,success为绿色,info:灰色,warning:橙色,danger:红色 -->
                <el-button
                  :type="getType(v, scope.row)"
                  round
                  size="mini"
                  plain
                  @click="handleClick(x.onClick, scope)"
                  v-for="(x, i) of v.buttons"
                  :key="'btn' + i"
                  :loading="loading"
                >
                  {{ getBtnText(x, scope.row) }}
                </el-button>
              </template>

              <template v-else v-for="(x, i) of v.buttons">
                <su-button
                  v-if="getBtnText(x, scope.row)"
                  :key="'btn' + i"
                  :disabled="handleDisabled(x, scope.row)"
                  :fa="x.fa"
                  :type="x.type"
                  :icon="x.icon"
                  @click="handleClick(x.onClick, scope)"
                  :loading="loading"
                >
                  <span
                    class="action-button"
                    :style="{
                      color:
                        (x.color &&
                          (Object.prototype.toString.call(x.color) === '[object Function]'
                            ? x.color(scope.row)
                            : x.color)) ||
                        'rgba(52, 139, 245, 1)',
                    }"
                  >
                    {{ getBtnText(x, scope.row) }}
                  </span>
                </su-button>
              </template>
            </div>
          </el-table-column>

          <el-table-column
            v-else-if="v.type === 'textColor'"
            :show-overflow-tooltip="true"
            :key="'textColor' + k"
            :label="v.label"
            :fixed="v.fixed"
            :min-width="v.minWidth || 100"
            :prop="v.prop"
            :resizable="v.resizable !== undefined ? v.resizable : true"
            :sortable="v.sortable"
            :sort-method="v.sortMethod"
            :filters="v.filters"
            :filter-method="v.filterMethod"
            :width="v.width"
            :column-key="v.prop"
            :align="v.align || 'left'"
            :header-align="v.headerAlign || 'left'"
            :render-header="v.renderHeader"
          >
            <template slot-scope="scope">
              <strong
                class="text-overflow"
                @click="handleClick(v.onClick, scope)"
                :class="{
                  cursor: v.cursor,
                  'text-normal': v.textNormal,
                  underline: getUnderline(v, scope.row),
                }"
                :style="{
                  color: `${getColor(v, scope.row)}`,
                }"
              >
                {{ getColorText(v, scope.row) }}
              </strong>
            </template>
          </el-table-column>

          <el-table-column
            v-else-if="v.type === 'colorTag' && v.filters !== undefined"
            :filter-multiple="v.multiple === undefined"
            :filters="v.filters"
            :filter-method="v.filterMethod || filterHandler"
            filter-placement="bottom-end"
            :key="'colorTag' + k"
            :label="v.label"
            :fixed="v.fixed"
            :min-width="v.minWidth || 100"
            :prop="v.prop"
            :resizable="v.resizable !== undefined ? v.resizable : true"
            :sortable="v.sortable"
            :sort-method="v.sortMethod"
            :width="v.width"
            :column-key="v.prop"
            :align="v.align || 'left'"
            :header-align="v.headerAlign || 'left'"
            :render-header="v.renderHeader"
          >
            <template slot-scope="scope">
              <el-tag
                v-if="getTypeTool(v, scope.row, 'isBorder')"
                :effect="getTypeTool(v, scope.row, 'effect')"
                :type="getTypeTool(v, scope.row, 'tagType')"
              >
                {{ getBtnText(v, scope.row) }}
              </el-tag>
              <div
                v-else
                :class="`su-tabele-tag su-tabele-tag-${getTypeTool(v, scope.row, 'tagType')}`"
              >
                {{ getBtnText(v, scope.row) }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            v-else-if="v.type === 'colorTag' && v.filters === undefined"
            :key="'colorTag' + k"
            :label="v.label"
            :fixed="v.fixed"
            :min-width="v.minWidth || 100"
            :prop="v.prop"
            :resizable="v.resizable !== undefined ? v.resizable : true"
            :sortable="v.sortable"
            :sort-method="v.sortMethod"
            :width="v.width"
            :column-key="v.prop"
            :align="v.align || 'left'"
            :header-align="v.headerAlign || 'left'"
            :render-header="v.renderHeader"
          >
            <template slot-scope="scope">
              <el-tag
                v-if="getTypeTool(v, scope.row, 'isBorder')"
                :effect="getTypeTool(v, scope.row, 'effect')"
                :type="getTypeTool(v, scope.row, 'tagType')"
              >
                {{ getBtnText(v, scope.row) }}
              </el-tag>
              <div
                v-else
                :class="`su-tabele-tag su-tabele-tag-${getTypeTool(v, scope.row, 'tagType')}`"
              >
                {{ getBtnText(v, scope.row) }}
              </div>
            </template>
          </el-table-column>

          <el-table-column
            v-else-if="v.type === 'textButton'"
            :key="'textButton' + k"
            :label="v.label"
            :fixed="v.fixed"
            :min-width="v.minWidth || 100"
            :prop="v.prop"
            :resizable="v.resizable !== undefined ? v.resizable : true"
            :sortable="v.sortable"
            :sort-method="v.sortMethod"
            :width="v.width"
            :column-key="v.prop"
            :align="v.align || 'left'"
            :header-align="v.headerAlign || 'left'"
            :render-header="v.renderHeader"
          >
            <template slot-scope="scope">
              <su-button
                v-if="!v.clickable || v.clickable(scope.row)"
                @click="handleClick(v.onClick, scope)"
              >
                <span class="action-button" :style="{color: v.color || '#3699FF'}">
                  {{ scope.row[v.prop] }}
                </span>
              </su-button>

              <span v-else>{{ scope.row[v.prop] }}</span>
            </template>
          </el-table-column>

          <el-table-column
            v-else-if="v.isIcon"
            :fixed="v.fixed"
            :formatter="v.formatter"
            :key="v.prop + k"
            :resizable="v.resizable !== undefined ? v.resizable : true"
            :label="v.label"
            :min-width="v.minWidth || 100"
            :width="v.width"
            :align="v.align || 'left'"
            :header-align="v.headerAlign || 'left'"
            :render-header="v.renderHeader"
          >
            <template slot-scope="scope">
              <i :class="v.icon" style="cursor: pointer" @click="handleClick(v.onClick, scope)"></i>
            </template>
          </el-table-column>

          <el-table-column
            :class-name="v.class"
            v-else-if="v.icon"
            :fixed="v.fixed"
            :formatter="v.formatter"
            :key="v.prop + k"
            :label="v.label"
            :resizable="v.resizable !== undefined ? v.resizable : true"
            :min-width="v.minWidth || 100"
            :width="v.width"
            :show-overflow-tooltip="
              v.showOverflowTooltip !== undefined ? v.showOverflowTooltip : true
            "
            :sortable="v.sortable"
            :sort-method="v.sortMethod"
            :filters="v.filters"
            :align="v.align || 'left'"
            :header-align="v.headerAlign || 'left'"
            :render-header="v.renderHeader"
          >
            <template slot-scope="scope">
              <div
                :style="`display:flex;align-items:center;justify-content:${
                  v.align === 'right' ? 'flex-end' : 'flex-start'
                }`"
              >
                <img :src="getUrl(v, scope.row)" style="height: 12px" />
                <div
                  style="
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    margin-left: 10px;
                  "
                >
                  {{ getText(v, scope.row) }}
                </div>
              </div>
            </template>
          </el-table-column>

          <el-table-column
            v-else-if="v.showPhotos"
            :class-name="v.class"
            :fixed="v.fixed"
            :formatter="v.formatter"
            :key="v.prop + k"
            :label="v.label"
            :resizable="v.resizable !== undefined ? v.resizable : true"
            :min-width="v.minWidth || 100"
            :show-overflow-tooltip="
              v.showOverflowTooltip !== undefined ? v.showOverflowTooltip : true
            "
            :sortable="v.sortable"
            :sort-method="v.sortMethod"
            :width="v.width"
            :align="v.align || 'left'"
            :header-align="v.headerAlign || 'left'"
            :render-header="v.renderHeader"
          >
            <template slot-scope="scope">
              <img
                v-for="(url, index) in getPhotos(v, scope.row)"
                :key="index"
                :src="url"
                class="photo"
                @click="photoClick(url)"
              />
            </template>
          </el-table-column>

          <el-table-column
            v-else-if="v.isFilter"
            :fixed="v.fixed"
            :formatter="v.formatter"
            :key="v.prop + k"
            :label="v.label"
            :resizable="v.resizable !== undefined ? v.resizable : true"
            :min-width="v.minWidth || 100"
            :prop="v.prop"
            :show-overflow-tooltip="
              v.showOverflowTooltip !== undefined ? v.showOverflowTooltip : true
            "
            :sortable="v.sortable"
            :sort-method="v.sortMethod"
            :width="v.width"
            :column-key="v.prop"
            :filter-multiple="v.multiple === undefined"
            :filters="v.filters"
            :filter-method="v.filterMethod || filterHandler"
            filter-placement="bottom-end"
            :align="v.align || 'left'"
            :header-align="v.headerAlign || 'left'"
            :render-header="v.renderHeader"
          />

          <el-table-column
            v-else-if="v.type === 'popover'"
            :key="'slot' + k"
            :label="v.label"
            :fixed="v.fixed"
            :min-width="v.minWidth || 100"
            :prop="v.prop"
            :sortable="v.sortable"
            :sort-method="v.sortMethod"
            :resizable="v.resizable !== undefined ? v.resizable : true"
            :width="v.width"
            :column-key="v.prop"
            :align="v.align || 'left'"
            :header-align="v.headerAlign || 'left'"
            :render-header="v.renderHeader"
          >
            <template slot-scope="scope">
              <el-popover
                v-if="scope.row.showPopovers"
                class="popover-container"
                :trigger="v.trigger"
                :placement="v.placement"
              >
                <div class="popover-item" v-for="(item, index) in scope.row.popovers" :key="index">
                  {{ item }}
                </div>
                <div slot="reference">{{ scope.row[v.prop] }}</div>
              </el-popover>
              <div v-if="!scope.row.showPopovers">{{ scope.row[v.prop] }}</div>
            </template>
          </el-table-column>

          <el-table-column
            v-else-if="v.type === 'longtooltip'"
            :key="'slot' + k"
            :label="v.label"
            :fixed="v.fixed"
            :min-width="v.minWidth || 100"
            :prop="v.prop"
            :sortable="v.sortable"
            :sort-method="v.sortMethod"
            :resizable="v.resizable !== undefined ? v.resizable : true"
            :width="v.width"
            :column-key="v.prop"
            :align="v.align || 'left'"
            :header-align="v.headerAlign || 'left'"
            :render-header="v.renderHeader"
          >
            <template slot-scope="scope">
              <el-popover
                width="400"
                class="longtooltip"
                :trigger="v.trigger"
                :placement="v.placement"
              >
                <div>{{ getText(v, scope.row) }}</div>
                <div
                  style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap"
                  class="longtooltip-word"
                  slot="reference"
                >
                  {{ getText(v, scope.row) }}
                </div>
              </el-popover>
            </template>
          </el-table-column>

          <el-table-column
            v-else-if="v.type === 'slot'"
            :key="'slot' + k"
            :label="v.label"
            :fixed="v.fixed"
            :min-width="v.minWidth || 100"
            :prop="v.prop"
            :sortable="v.sortable"
            :sort-method="v.sortMethod"
            :resizable="v.resizable !== undefined ? v.resizable : true"
            :width="v.width"
            :column-key="v.prop"
            :filter-multiple="v.multiple === undefined"
            :filters="v.filters"
            filter-placement="bottom-end"
            :show-overflow-tooltip="
              v.showOverflowTooltip !== undefined ? v.showOverflowTooltip : false
            "
            :filter-method="
              v.filters && v.filters.length > 0 ? v.filterMethod || filterHandler : null
            "
            :align="v.align || 'left'"
            :header-align="v.headerAlign || 'left'"
            :render-header="v.renderHeader"
          >
            <template slot-scope="scope">
              <slot :name="v.slotID" :item="scope.row"></slot>
            </template>
          </el-table-column>

          <el-table-column
            v-else-if="v.type === 'date'"
            :key="'slot' + k"
            :label="v.label"
            :fixed="v.fixed"
            :min-width="v.minWidth || 100"
            :prop="v.prop"
            :sortable="v.sortable"
            :sort-method="v.sortMethod"
            :resizable="v.resizable !== undefined ? v.resizable : true"
            :width="v.width"
            :column-key="v.prop"
            :align="v.align || 'left'"
            :header-align="v.headerAlign || 'left'"
            :render-header="v.renderHeader"
          >
            <template slot-scope="scope">
              <el-date-picker
                size="small"
                class="datePicker"
                v-model="scope.row[v.prop]"
                :type="v.dateType"
                :format="v.format"
                :value-format="v.valueFormat"
              />
            </template>
          </el-table-column>

          <el-table-column
            v-else-if="v.type === 'input' || v.type === 'text'"
            :key="'slot' + k"
            :label="v.label"
            :fixed="v.fixed"
            :min-width="v.minWidth || 100"
            :prop="v.prop"
            :sortable="v.sortable"
            :sort-method="v.sortMethod"
            :resizable="v.resizable !== undefined ? v.resizable : true"
            :width="v.width"
            :column-key="v.prop"
            :align="v.align || 'left'"
            :header-align="v.headerAlign || 'left'"
            :render-header="v.renderHeader"
          >
            <template slot-scope="scope">
              <el-input
                size="small"
                v-model="scope.row[v.prop]"
                @change="text => changeInputValue(text, scope.row, v)"
                @input="text => updateInputValue(text, scope.row, v)"
                :placeholder="v.placeholder"
                :clearable="v.clearable"
                :minlength="v.minlength"
                :maxlength="v.maxlength"
              />
            </template>
          </el-table-column>

          <el-table-column
            v-else-if="v.type === 'number'"
            :key="'slot' + k"
            :label="v.label"
            :fixed="v.fixed"
            :min-width="v.minWidth || 100"
            :prop="v.prop"
            :sortable="v.sortable"
            :sort-method="v.sortMethod"
            :resizable="v.resizable !== undefined ? v.resizable : true"
            :width="v.width"
            :column-key="v.prop"
            :align="v.align || 'left'"
            :header-align="v.headerAlign || 'left'"
            :render-header="v.renderHeader"
          >
            <template slot-scope="scope">
              <el-input-number
                size="small"
                v-model="scope.row[v.prop]"
                @change="text => changeInputValue(text, scope.row, v)"
                @input="text => updateInputValue(text, scope.row, v)"
                :placeholder="v.placeholder"
                :clearable="v.clearable"
                :min="v.min"
                :max="v.max"
              />
            </template>
          </el-table-column>

          <el-table-column
            v-else-if="v.type === 'radio'"
            :key="'slot' + k"
            :label="v.label"
            :fixed="v.fixed"
            :min-width="v.minWidth || 100"
            :prop="v.prop"
            :sortable="v.sortable"
            :sort-method="v.sortMethod"
            :resizable="v.resizable !== undefined ? v.resizable : true"
            :width="v.width"
            :column-key="v.prop"
            :align="v.align || 'left'"
            :header-align="v.headerAlign || 'left'"
            :render-header="v.renderHeader"
          >
            <template slot-scope="scope">
              <el-radio-group v-model="scope.row[v.prop]">
                <el-radio v-for="(item, index) of v.options" :label="item.value" :key="index">
                  {{ item.label }}
                </el-radio>
              </el-radio-group>
            </template>
          </el-table-column>

          <el-table-column
            v-else-if="v.type === 'select'"
            :key="'slot' + k"
            :label="v.label"
            :fixed="v.fixed"
            :min-width="v.minWidth || 100"
            :prop="v.prop"
            :sortable="v.sortable"
            :sort-method="v.sortMethod"
            :resizable="v.resizable !== undefined ? v.resizable : true"
            :width="v.width"
            :column-key="v.prop"
            :align="v.align || 'left'"
            :header-align="v.headerAlign || 'left'"
            :render-header="v.renderHeader"
          >
            <template slot-scope="scope">
              <el-select v-model="scope.row[v.prop]" :placeholder="v.placeholder">
                <el-option
                  v-for="(item, index) of v.options"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </template>
          </el-table-column>

          <el-table-column
            v-else
            :class-name="v.class"
            :fixed="v.fixed"
            :resizable="v.resizable !== undefined ? v.resizable : true"
            :formatter="v.formatter"
            :key="v.prop + k"
            :label="v.label"
            :min-width="v.minWidth || 100"
            :prop="v.prop"
            :show-overflow-tooltip="
              v.showOverflowTooltip !== undefined ? v.showOverflowTooltip : true
            "
            :sortable="v.sortable"
            :width="v.width"
            :column-key="v.prop"
            :filter-multiple="v.multiple === undefined"
            :align="v.align || 'left'"
            :header-align="v.headerAlign || 'left'"
            :render-header="v.renderHeader"
            :sort-method="v.sortMethod"
          />
        </template>
      </el-table>
      <div class="su-table-footer-view" v-if="$slots.tableFooterView">
        <slot name="tableFooterView" />
      </div>
    </div>
    <div class="su-table-right-view" v-if="$slots.tableRightView">
      <slot name="tableRightView" />
    </div>
  </div>
</template>

<script>
import SuViewer from './su-viewer-modal/index'
import SuComponent from '@/mixins/su-component'
import {Table, Input, Radio, Select, Button, DatePicker} from 'element-ui'

export default {
  name: 'su-table',
  mixins: [SuComponent],
  components: {
    'el-date-picker': DatePicker,
    'el-button': Button,
    'el-table': Table,
    'el-input': Input,
    'el-radio': Radio,
    'el-select': Select,
  },
  data() {
    return {
      tableHeight: null,
    }
  },
  computed: {
    table() {
      return this.$refs.table
    },
    // 搜索，过滤等图片的宽度
    widthOfSearchFilterIcon() {
      return 24
    },
    // 字体大小
    fontSize() {
      return this.$attrs.fontSize || (this.$ELEMENT || {}).fontSize || 14
    },
    // 字体比例
    fontRate() {
      return {
        ...{
          CHAR_RATE: 1.1, // 汉字比率
          NUM_RATE: 0.65, // 数字
          OTHER_RATE: 0.5, // 除汉字和数字以外的字符的比率
        }, // 默认值
        ...((this.$ELEMENT || {}).fontRate || {}), // 根注册参数 (Vue.use 时的第二个参数)
        ...(this.$attrs.fontRate || {}), // 父组件属性
      }
    },
  },
  mounted() {
    if (!(navigator.userAgent.toLocaleLowerCase().indexOf('qqbrowse') > -1)) {
      this.tableHeight = this.height
    }
  },
  props: {
    indexwidth: {
      type: String,
      default: () => {
        return '62'
      },
    },
    indexFixed: {
      type: Boolean,
      default: false,
    },
    fit: {
      type: Boolean,
      default: true,
    },
    border: {
      type: Boolean,
      default: true,
    },
    columns: {
      type: Array,
      default() {
        return []
      },
    },
    data: {
      type: Array,
      default() {
        return []
      },
    },
    height: {
      type: String,
    },
    index: {
      type: Function,
      default(index) {
        return index + 1
      },
    },
    maxHeight: {
      type: String,
    },
    selectable: {
      type: Function,
      default() {
        return true
      },
    },
    noneOutBorder: {
      type: Boolean,
      default: true,
    },
    showCheckbox: {
      type: Boolean,
      default: true,
    },
    showIndex: {
      type: Boolean,
      default: true,
    },
    id: {
      type: String,
      default: '',
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
    objectSpanMethod: {
      type: Function,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    // 默认点击行不选中该行的复选框
    clickRowCheck: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    getRef() {
      return this.$refs.table
    },

    getTableColumnMinWidth(item, defaultWidth) {
      // 自定义宽度信息
      if (item.customWidth) {
        return item.minWidth || defaultWidth
      }
      // 自适应宽度
      let computedWidth = item.label.length * this.fontRate.CHAR_RATE * this.fontSize + 20
      if (item.sortable) {
        computedWidth += this.widthOfSearchFilterIcon
      }
      if (item.isFilter) {
        computedWidth += this.widthOfSearchFilterIcon
      }
      return computedWidth
    },
    toggleRowExpansion(row, expanded) {
      this.$refs.table.toggleRowExpansion(row, expanded)
    },
    setDefaultSelection(e) {
      this.$refs.table.toggleRowSelection(e, true)
    },
    clearSelection() {
      this.$refs.table.clearSelection()
    },
    clearFilter(filters) {
      this.$refs.table.clearFilter(filters)
    },
    clearSort() {
      this.$refs.table.clearSort()
    },
    doLayout() {
      this.$refs.table.doLayout()
    },
    handleRowClick(row, column, event) {
      row.flag = !row.flag
      if (this.clickRowCheck) {
        this.$refs.table.toggleRowSelection(row)
      }

      this.$emit('row-click', row, column, event)
    },

    handleSelectionChange(selectedRows) {
      this.$emit('selection-change', selectedRows)
    },

    handleClick(callback = () => {}, scope = {}) {
      const {row, $index} = scope
      callback(row, $index)
    },
    handleDisabled(opts = {}, row = {}) {
      const {disabled} = opts
      return disabled instanceof Function ? disabled(row) : disabled
    },
    handleFilterChange(e) {
      this.$emit('handle-filter-change', e)
      this.$emit('filter-change-origin', e)
      this.$emit('filter-change', e)
    },
    filterHandler(value, row, column) {
      const property = column['property']
      this.$emit('filter-change', {
        key: property,
        value,
        from: 'filterHandler',
      })

      return row[property] === value
    },
    getUrl(opts = {}, row = {}) {
      const {icon} = opts
      return icon instanceof Function ? icon(row) : icon
    },
    getBtnText(opts = {}, row = {}) {
      const {text} = opts
      return text instanceof Function ? text(row) : text
    },
    getType(opts = {}, row = {}) {
      const {type} = opts
      return type instanceof Function ? type(row) : type
    },

    getTypeTool(opts = {}, row = {}, typeStr) {
      const type = opts[typeStr]
      return type instanceof Function ? type(row) : type
    },

    getColor(opts = {}, row = {}) {
      const {color} = opts
      return color instanceof Function ? color(row) : color
    },
    getUnderline(opts = {}, row = {}) {
      const {underline} = opts
      return underline instanceof Function ? underline(row) : underline
    },
    getText(opts = {}, row = {}) {
      const {text} = opts
      return text instanceof Function ? text(row) : row[opts.prop]
    },
    // 获取图片Url
    getPhotos(opts = {}, row = {}) {
      return row[opts.prop]
    },
    // 点击图片显示
    photoClick(file) {
      SuViewer([file])
    },
    getColorText(opts = {}, row = {}) {
      let {text} = opts
      if (text) {
        return text(row)
        // console.log(opts,row)
      } else {
        return row[opts.prop]
      }
    },
    updateInputValue(text, row, opts = {}) {
      const {input} = opts
      if (input) input(text, row)
    },
    changeInputValue(text, row, opts = {}) {
      const {change} = opts
      if (change) change(text, row)
    },
  },
  watch: {
    height(val) {
      if (!(navigator.userAgent.toLocaleLowerCase().indexOf('qqbrowse') > -1)) {
        this.tableHeight = val
      }
    },
  },
}
</script>

<style lang='sass' scoped>
.action-button
  font-size: 0.9rem
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif

  .el-button.is-disabled.el-button--text ::v-deep
    > span
      > span
        color: #888 !important

  .photo
    margin-right: 5px
    height: 20px
    width: 20px
    cursor: pointer
</style>

<style lang='scss' scoped>
.cursor {
  cursor: pointer;
}

.text-normal {
  font-weight: normal !important;
}

.underline {
  text-decoration: underline;
}

.text-overflow {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

::v-deep .el-table__fixed {
  height: 100% !important;
}

.longtooltip {
  width: 300px;
}

.longtooltip-word {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.icon-column {
  display: flex;
  justify-content: space-between;
}

.datePicker {
  width: auto !important;
}

.buttons-cell {
  .el-button {
    padding: 0 12px !important;
  }
}
</style>
