<!--
- Copyright (c) 2021 Guangdong Sun Railway Information Technology, Inc.
- All rights reserved.
-
- @author wenteng
-
- Description:
-
- Changelog:
-
- Revision:
-->

<template>
  <div style='padding-left: 24px; padding-bottom: 78px'>
    <h1>下拉单选</h1>
    <su-select :clearable='true'
               v-model='value'
               label-content='标签'
               :options='items'
    />

    <su-select :options='items'
               style='margin-top: 12px'
               v-model='value'
               label-content='标签'
               disabled
    />

    <su-select :options='options'
               label-placement='top-start'
               style='margin-top: 24px'
               v-model='value'
               labelContent='标签标签'
               :clearable='true'
    >
      <div slot-scope='{item}' slot='option'>{{ item.label }}</div>
    </su-select>

    <el-form ref='form'
             style='margin-top: 32px'
             :model='formData'
             :rules='formRules'
             label-width='100px'
    >
      <el-form-item label='多选下拉框' prop='name'>
        <su-select :options='items'
                   v-model='formData.name'
                   :clearable='true'
                   multiple
        />
      </el-form-item>
      <el-form-item label='单选下拉框' prop='partyBTaxCode'>
        <su-select :options='items'
                   v-model='formData.partyBTaxCode'
                   placeholder='统一社会信息代码 - 怎么选都是错误格式的那种'
                   :clearable='true'
        />
      </el-form-item>
      <el-form-item style='text-align: center'>
        <el-button type='primary' @click='onSubmit'>表单验证</el-button>
      </el-form-item>
    </el-form>

    <h1>级联选择器</h1>
    <su-cascader label-content='显示全部层级'
                 v-model='cascaderValue'
                 :options='cascaderOptions'
    />

    <su-cascader label-content='只显示最小层级'
                 style='margin-top: 12px'
                 v-model='cascaderValue'
                 :show-all-levels='false'
                 :options='cascaderOptions'
    />
  </div>
</template>

<script>
export default {
  name: 'su-select-test',
  methods: {
    onMultipleChange() {
      console.log(this.$refs.multipleSelect.getSelectedItems(), 'this.$refs.multipleSelect.getSelectedItems()')
    },
    focusTest() {
      console.log('focusTest-focusTest')
    },
    onSubmit() {
      this.$refs.form.validate()
    },
  },
  data() {
    return {
      cascaderValue: [],

      formData: {},
      formRules: {
        name: [
          {required: true, message: '请选择活动区域', trigger: 'change'},
        ],
        xxxxx: [
          {required: true, message: '请选择活动区域', trigger: 'change'},
        ],
        partyBTaxCode: [
          {required: true, message: '请选择统一信用社会代码', trigger: 'blur'},
          {
            trigger: 'blur',
            message: '请正确的选择统一社会信用代码 - 选项没有符合规格的内容，怎么选都是错误，体验使用',
            validator: (rule, value, cb) => {
              const code = /^[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/g
              code.test(value) ? cb() : cb(new Error())
            },
          },
        ],
      },

      value: null,
      options: [{
        value: '选项1',
        label: '黄金糕',
      }, {
        value: '选项2',
        label: '双皮奶',
      }, {
        value: '选项3',
        label: '蚵仔煎',
      }, {
        value: '选项4',
        label: '龙须面',
        disabled: true,
      }, {
        value: '选项5',
        label: '北京烤鸭',
      }],

      text: '',
      items: [
        {
          value: 1,
          label: '隧道工程项目',
          icon: 'el-icon-search',
          callback() {
            alert(123)
          },
        },
        {
          value: 2,
          label: '连续梁项目连续梁项目连续梁项目连续梁项目',
        },
        {
          value: 3,
          label: '地铁项目',
          disabled: true,
        },
        {
          value: 4,
          label: '桥梁检测项目',
        },
        {
          value: 5,
          label: '很长很长很长很长很长很长很长很长很长很长的项目',
        },
        {
          value: 6,
          label: '很长很长很长很长很长很长很长很长很长很长的项目',
        },
        {
          value: 7,
          label: '很长很长很长很长很长很长很长很长很长很长的项目',
        },
        {
          value: 8,
          label: '很长很长很长很长很长很长很长很长很长很长的项目',
        },
        {
          value: 9,
          label: '很长很长很长很长很长很长很长很长很长很长的项目',
        },
        {
          value: 10,
          label: '很长很长很长很长很长很长很长很长很长很长的项目',
        },
      ],

      cascaderOptions: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致',
          }, {
            value: 'fankui',
            label: '反馈',
          }, {
            value: 'xiaolv',
            label: '效率',
          }, {
            value: 'kekong',
            label: '可控',
          }],
        }, {
          value: 'daohang',
          label: '导航',
          children: [
            {
              value: 'cexiangdaohang',
              label: '侧向导航',
            },
            {
              value: 'dingbudaohang',
              label: '顶部导航',
            },
            {
              value: 'dingbudaohang1',
              label: '顶部导航1',
            },
            {
              value: 'dingbudaohang2',
              label: '顶部导航2',
            },
            {
              value: 'dingbudaohang3',
              label: '顶部导航3',
            },
            {
              value: 'dingbudaohang1',
              label: '顶部导航1',
            },
            {
              value: 'dingbudaohang2',
              label: '顶部导航2',
            },
            {
              value: 'dingbudaohang3',
              label: '顶部导航3',
            },
            {
              value: 'dingbudaohang1',
              label: '顶部导航1',
            },
            {
              value: 'dingbudaohang2',
              label: '顶部导航2',
            },
            {
              value: 'dingbudaohang3',
              label: '顶部导航3',
            },
          ],
        }],
      }, {
        value: 'zujian',
        label: '组件',
        children: [{
          value: 'basic',
          label: 'Basic',
          children: [{
            value: 'layout',
            label: 'Layout 布局',
          }, {
            value: 'color',
            label: 'Color 色彩',
          }, {
            value: 'typography',
            label: 'Typography 字体',
          }, {
            value: 'icon',
            label: 'Icon 图标',
          }, {
            value: 'button',
            label: 'Button 按钮',
          }],
        }, {
          value: 'form',
          label: 'Form',
          children: [{
            value: 'radio',
            label: 'Radio 单选框',
          }, {
            value: 'checkbox',
            label: 'Checkbox 多选框',
          }, {
            value: 'input',
            label: 'Input 输入框',
          }, {
            value: 'input-number',
            label: 'InputNumber 计数器',
          }, {
            value: 'select',
            label: 'Select 选择器',
          }, {
            value: 'cascader',
            label: 'Cascader 级联选择器',
          }, {
            value: 'switch',
            label: 'Switch 开关',
          }, {
            value: 'slider',
            label: 'Slider 滑块',
          }, {
            value: 'time-picker',
            label: 'TimePicker 时间选择器',
          }, {
            value: 'date-picker',
            label: 'DatePicker 日期选择器',
          }, {
            value: 'datetime-picker',
            label: 'DateTimePicker 日期时间选择器',
          }, {
            value: 'upload',
            label: 'Upload 上传',
          }, {
            value: 'rate',
            label: 'Rate 评分',
          }, {
            value: 'form',
            label: 'Form 表单',
          }],
        }, {
          value: 'data',
          label: 'Data',
          children: [{
            value: 'table',
            label: 'Table 表格',
          }, {
            value: 'tag',
            label: 'Tag 标签',
          }, {
            value: 'progress',
            label: 'Progress 进度条',
          }, {
            value: 'tree',
            label: 'Tree 树形控件',
          }, {
            value: 'pagination',
            label: 'Pagination 分页',
          }, {
            value: 'badge',
            label: 'Badge 标记',
          }],
        }, {
          value: 'notice',
          label: 'Notice',
          children: [{
            value: 'alert',
            label: 'Alert 警告',
          }, {
            value: 'loading',
            label: 'Loading 加载',
          }, {
            value: 'message',
            label: 'Message 消息提示',
          }, {
            value: 'message-box',
            label: 'MessageBox 弹框',
          }, {
            value: 'notification',
            label: 'Notification 通知',
          }],
        }, {
          value: 'navigation',
          label: 'Navigation',
          children: [{
            value: 'menu',
            label: 'NavMenu 导航菜单',
          }, {
            value: 'tabs',
            label: 'Tabs 标签页',
          }, {
            value: 'breadcrumb',
            label: 'Breadcrumb 面包屑',
          }, {
            value: 'dropdown',
            label: 'Dropdown 下拉菜单',
          }, {
            value: 'steps',
            label: 'Steps 步骤条',
          }],
        }, {
          value: 'others',
          label: 'Others',
          children: [{
            value: 'dialog',
            label: 'Dialog 对话框',
          }, {
            value: 'tooltip',
            label: 'Tooltip 文字提示',
          }, {
            value: 'popover',
            label: 'Popover 弹出框',
          }, {
            value: 'card',
            label: 'Card 卡片',
          }, {
            value: 'carousel',
            label: 'Carousel 走马灯',
          }, {
            value: 'collapse',
            label: 'Collapse 折叠面板',
          }],
        }],
      }, {
        value: 'ziyuan',
        label: '资源',
        children: [{
          value: 'axure',
          label: 'Axure Components',
        }, {
          value: 'sketch',
          label: 'Sketch Templates',
        }, {
          value: 'jiaohu',
          label: '组件交互文档',
        }],
      }],
    }
  },
}
</script>

<style scoped lang='scss'>

</style>
