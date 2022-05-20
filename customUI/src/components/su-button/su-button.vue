<!--
  - Copyright © 2020 Guangdong Sun Railway Information Technology, Inc.
  - All rights reserved.
  -
  - @author: wu jiajin <wujiajin@sunengineering.cn>
  - @description 按钮组件
  -
  - Changelog:
  - Revision 1.0 2020-06-01 wu jiajin
  - Revision 1.0.0 2020-11-04 规范3.0下组件库调整
  - - 初始化
  -->

<script>
import elButton from './button'

export default {
  name: 'su-button',
  components: {
    'el-button': elButton,
  },
  render(createElement, context) {
    if (this.buttonType === 'add') {
      // el-icon-plus-su 调整回 el-icon-plus
      return this.renderNativeButton(createElement, true, 'el-icon-plus')
    }
    if (this.buttonType === 'batchadd') {
      // el-icon-plus-su 调整回 el-icon-plus
      return this.renderNativeButton(createElement, true, 'el-icon-plus')
    }
    if (this.buttonType === 'edit') {
      return this.renderNativeButton(createElement, true, 'el-icon-edit-outline')
    }
    if (this.buttonType === 'del') {
      return this.renderNativeButton(createElement, true, 'el-icon-delete', 'danger')
    }
    if (this.buttonType === 'cancel') {
      return this.renderNativeButton(createElement, true, null, '')
    }
    if (this.buttonType === 'link') {
      return this.renderNativeButton(createElement, true, 'el-icon-link')
    }
    if (this.buttonType === 'release') {
      return this.renderNativeButton(createElement, true, 'el-icon-s-promotion')
    }
    if (this.buttonType === 'import') {
      return this.renderNativeButton(createElement, true, 'el-icon-upload2')
    }
    if (this.buttonType === 'export') {
      return this.renderNativeButton(createElement, true, 'el-icon-download')
    }
    return this.renderNativeButton(createElement)
  },

  methods: {
    renderNativeButton(createElement, customPlain, customIcon, customType) {
      return createElement(
        'el-button',
        {
          'class': {
            'su-button': true,
            'pa-no': this.type === 'text',
            'is-link': this.isLink,
          },
          attrs: {
            ...this.$attrs,
            size: this.size,
            type: customType === null || customType === undefined ? this.type : customType,
            plain: customPlain === null || customPlain === undefined ? this.plain : customPlain,
            icon: customIcon === null || customIcon === undefined ? this.icon : customIcon,
          },
          on: {
            ...this.$listeners,
          },
        },
        [
          this.content,
          this.$slots.default,
        ],
      )
    },
  },

  computed: {
    content: function() {
      if (this.buttonType) return this.$t(`buttons.${this.buttonType}`)
      return ''
    },
  },
  props: {
    buttonType: {
      type: String,
      default: '',
    },

    icon: {
      type: String,
    },
    type: {
      type: String,
      default: 'primary',
    },
    size: {
      type: String,
      default: 'small',
    },
    plain: {
      type: Boolean,
      default: false,
    },
    // 文字按钮时使用
    isLink: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {}
  },
}
</script>
