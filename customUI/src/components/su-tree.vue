<!--
 - Copyright (c) 2020 Guangdong Sun Railway Information Technology, Inc.
 - All rights reserved.
 -
 - @author weishibin
 - Description: su-tree 树形组件
 - Changelog:
 - Revision 1.0 2020-06-01 weishibin
 - - 初始化
 -->
<template>
  <div class='su-tree-view'>
    <div class='title' v-if='title'>{{ title }}</div>
    <el-tree v-bind='filterAttributes({
                targetObj: $attrs,
                excludePrefixes: ["tooltip-"]
             })'
             v-on='filterAttributes({
                targetObj: $listeners,
                excludePrefixes: ["node-click"]
             })'
             :show-checkbox='showCheckbox'
             :filter-node-method='filterNode'
             @node-click='handleNodeClick'
             :data='data'
             class='su-tree'
             :class='{"su-clickable-tree" : clickable}'
             :props='props'
             :expand-on-click-node='expandOnClickNode'
             :load='loadNode || $attrs["load"]'
             :highlight-current='highlightCurrent'
             :node-key='nodeKey'
             ref='tree'
    >
      <template slot-scope='{node, data}'>
        <slot :node='node' :data='data'>
          <div class='flex middle' style='width: 100%'>
            <i v-if='data.imgicon' class='icon-view'>
              <img class='img-icon' :src='data.imgicon' />
            </i>
            <i class='icon-view' :class='data.icon'></i>

            <div style='flex: 1; width: 100%'>
              <su-tooltip v-if='checkNodeTooltipVisible(data, node)'
                          class='item tooltip-tree-node'
                          v-bind='filterAttributes({
                            targetObj: $attrs,
                            includePrefixes: ["tooltip-"]
                          })'
                          :effect='tooltipEffect'
                          :placement='tooltipPlacement'
              >
                <div slot='content' v-if='data.tooltipContent && data.suComputedWidth' v-html='data.tooltipContent'></div>
                <div :ref='`treeSpan${data[nodeKey]}`'
                     class='ml-sm leaf-label'
                     :style='`width: ${data.width ? `${data.width}` : (defaultTooltipTextWidth || `${data.suComputedWidth}px`)}`'
                >
                  {{ node.label }}
                </div>
              </su-tooltip>
              <div v-else class='ml-sm leaf-label'>
                {{ node.label }}
              </div>
            </div>

            <div class='right-icon' style='margin: 0 12px' @click='handleRightIconClick(data)'>
              <i class='icon-view' v-if='data.rightImgIcon'>
                <img class='img-icon' :src='data.rightImgIcon' />
              </i>
              <i class='icon-view' v-if='data.rightIcon' :class='data.rightIcon'></i>
              <div v-if='data.rightIconRender' v-html='data.rightIconRender' />
            </div>
          </div>
        </slot>
      </template>
    </el-tree>
  </div>
</template>

<script>
import SuComponent from '@/mixins/su-component'
import {Tree} from 'element-ui'

export default {
  name: 'su-tree',
  mixins: [SuComponent],
  components: {
    'el-tree': Tree,
  },
  props: {
    // 维持一个节点展开
    keepOnNodeExpand: Boolean,

    clickable: Boolean,

    title: {
      type: String,
      default: null,
    },

    // 有true更改为默认的false
    expandOnClickNode: {
      type: Boolean,
      default: false,
    },
    loadNode: {
      type: Function,
    },
    data: {
      type: Array,
      default() {
        return JSON.parse(sessionStorage.treeData)
      },
    },
    tooltipEffect: {
      type: String,
      default: 'dark',
    },
    tooltipPlacement: {
      type: String,
      default: 'top',
    },
    nodeKey: {
      type: String,
      default: 'id',
    },
    showCheckbox: {
      type: Boolean,
      default: false,
    },
    props: {
      type: Object,
      default() {
        return {
          label: 'label',
          children: 'children',
          isLeaf: 'leaf',
        }
      },
    },
    filterNodeTypeId: {
      type: String,
    },
    // 由false更改为默认的true
    highlightCurrent: {
      type: Boolean,
      default: true,
    },
    customTooltip: {
      type: Boolean,
      default: false,
    },
    showTooltipTextLength: {
      type: Number,
      default: 14,
    },
    defaultTooltipTextWidth: {
      type: String,
      default: null,
    },
  },
  watch: {
    // filterNodeTypeId() {
    //   this.init()
    // },
    // data() {
    //   this.init()
    // },
  },
  data() {
    return {
      treeWidth: null,
    }
  },
  methods: {
    getRef() {
      return this.$refs.tree
    },

    handleRightIconClick(itemData) {
      this.$emit('rightIconClick', itemData)
    },

    // 自动计算树节点label的显示与否
    checkNodeTooltipVisible(data, node) {
      // 如果使用了customTooltip自定义tooltip信息
      if (this.customTooltip) {
        return !data.nonetooltip && node.label.length > this.showTooltipTextLength
      }
      // 采用文本长度计算
      let width = data.width
      let labelIndentationWidth = data.labelIndentationWidth

      if (!width) {
        let treeSpanRef = this.$refs[`treeSpan${data.nodeKey}`]
        width = this.$su.getTextWidth({
          text: data.label,
          el: treeSpanRef?.$el || this.$refs.tree?.$el,
        })

        // 计算label的缩进宽度
        if (!labelIndentationWidth) {
          labelIndentationWidth = 24
          if (this.showCheckbox) labelIndentationWidth += 24
          if (node.level) {
            labelIndentationWidth += 18 * (node.level - 1)
          }
          data.labelIndentationWidth = labelIndentationWidth
        }

        if (width) {
          width += labelIndentationWidth
        }
        data.width = width
      }

      // 计算label可显示的宽度
      if (!data.suComputedWidth) {
        data.suComputedWidth = parseFloat(this.treeWidth) - parseFloat(labelIndentationWidth) - 12
      }

      // 计算tooltip的换行内容
      if (!data.tooltipContent && data.suComputedWidth && this.treeWidth && width && width > this.treeWidth) {
        data.tooltipContent = ''
        let pieceWidth = data.label.length / (width / (data.suComputedWidth - labelIndentationWidth))
        pieceWidth = parseInt(`${pieceWidth}`)
        let pieceStartIndex = 0

        while (pieceWidth > 0 && pieceStartIndex < data.label.length) {
          let pieceEndIndex = pieceWidth + pieceStartIndex > data.label.length ? data.label.length : (pieceWidth + pieceStartIndex)
          data.tooltipContent += '<br/>' + data.label.substring(pieceStartIndex, pieceEndIndex)
          pieceStartIndex += pieceWidth
        }
        if (data.tooltipContent.length > 5) {
          data.tooltipContent = data.tooltipContent.substring(5)
        }
      }

      return this.treeWidth && width && width > this.treeWidth && data.tooltipContent
    },
    filter(val) {
      this.$refs.tree.filter(val)
    },
    // filterNode(value, data, node) {
    //   //如果共有四级菜单
    //   if (!value) return true
    //   let if_one = data.label.indexOf(value) !== -1
    //   let if_two =
    //     node.parent &&
    //     node.parent.data &&
    //     node.parent.data.label &&
    //     node.parent.data.label.indexOf(value) !== -1
    //   let if_three =
    //     node.parent &&
    //     node.parent.parent &&
    //     node.parent.parent.data &&
    //     node.parent.parent.data.label &&
    //     node.parent.parent.data.label.indexOf(value) !== -1
    //   let if_four =
    //     node.parent &&
    //     node.parent.parent &&
    //     node.parent.parent.parent &&
    //     node.parent.parent.parent.data &&
    //     node.parent.parent.parent.data.label &&
    //     node.parent.parent.parent.data.label.indexOf(value) !== -1
    //   let result_one = false
    //   let result_two = false
    //   let result_three = false
    //   let result_four = false
    //   if (node.level === 1) {
    //     result_one = if_one
    //   } else if (node.level === 2) {
    //     result_two = if_one || if_two
    //   } else if (node.level === 3) {
    //     result_three = if_one || if_two || if_three
    //   } else if (node.level === 4) {
    //     result_four = if_one || if_two || if_three || if_four
    //   }
    //   return result_one || result_two || result_three || result_four
    // },

    filterNode(value, data, node) {
      // 如果自定义了，调用自定义的函数要注意下返回值问题。
      if (this.$attrs['filter-node-method'] && typeof this.$attrs['filter-node-method'] === 'function') {
        return this.$attrs['filter-node-method'](value, data, node)
      } else {
        //优化之后的代码 不管有几级都可以适用
        if (!value) {
          return true
        }
        let _array = []
        this.getReturnNode(node, _array, value)
        let result = false
        _array.forEach(item => {
          result = result || item
        })
        return result
      }
    },
    getReturnNode(node, _array, value) {
      let key = this.props.label || 'label'
      let isPass = node.data && node.data[key] && node.data[key].indexOf(value) !== -1
      isPass ? _array.push(isPass) : ''
      if (!isPass && node.level != 1 && node.parent) {
        this.getReturnNode(node.parent, _array, value)
      }
    },

    handleNodeClick(data, node, obj) {
      this.$emit('node-click', data, node, obj)
    },
    // checkChange(data, checked) {
    //   this.$emit('check-change', data, checked)
    // },
    // check(data, checkData) {
    //   this.$emit('check', data, checkData)
    // },
    init() {
      this.$refs.tree.filter(this.filterNodeTypeId)
      // 当 data 从外部传入时，直接执行 setDefault 函数会无效
      setTimeout(() => this.setDefault(), 0)
    },
    /**
     * 设置默认选中节点
     */
    setDefault() {
      if (this.filterNodeTypeId) {
        for (let tree of this.data) {
          const data = this.nestedReverse(tree)
          const defaultNode = this.$su.find(data, v => {
            return v.nodeTypeId === this.filterNodeTypeId || v.id === this.filterNodeTypeId
          })

          if (defaultNode) {
            this.$refs.tree.setCurrentKey(defaultNode[this.nodeKey])
            const node = this.$refs.tree.getNode(defaultNode)
            this.handleNodeClick(defaultNode, node)
            return
          }
        }
      }

      // 当没有匹配节点时选中第一个节点
      if (this.data[0]) {
        this.$refs.tree.setCurrentKey(this.data[0][this.nodeKey])
        const node = this.$refs.tree.getNode(this.data[0])
        this.handleNodeClick(this.data[0], node)
      }
    },
    /**
     * 解嵌套
     * @param {Object} data 需要解嵌套的数据
     * @return {Object} 解嵌套后的数据
     */
    nestedReverse(data = {}) {
      const res = {}
      res[data[this.nodeKey]] = data
      if (data.children) {
        for (let child of data.children) {
          Object.assign(res, this.nestedReverse(child))
        }
      }
      return res
    },
    getCheckedNodes() {
      return this.$refs.tree.getCheckedNodes()
    },
  },
  mounted() {
    this.init()

    // 设置tree控件的宽度
    this.$nextTick(() => {
      this.treeWidth = this.$refs.tree.$el.clientWidth
    })
  },
}
</script>

<style scoped lang='scss'>
.su-tree-view {
  display: flex;
  background-color: white;
  flex-direction: column;

  .su-tree {
    flex: 1;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .icon-view {
    height: 16px;
    display: flex;
    align-items: center;

    img {
      height: 16px;
      width: 16px;
    }
  }

  .title {
    margin-bottom: 4px;
    display: flex;
    align-items: center;
    padding-left: 18px;

    font-size: 16px;
    font-weight: 700;
    color: #3d434e;
  }
}
</style>
