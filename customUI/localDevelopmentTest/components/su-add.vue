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
  <su-dialog
    :dialog-visible="dialogVisible"
    dialog-width="960px"
    @dialogClose="dialogClose"
    @dialogSuccess="dialogSuccess"
  >
    <div slot="header">{{ isEdit ? '这是编辑的标题' : '这是新增的标题' }}</div>
    <!--    <div slot='btns'>-->
    <!--      <su-button type='primary' @click='dialogClose' :plain='true'>取消</su-button>-->
    <!--      <su-button type='primary' @click='dialogSuccess' :plain='true'>确定</su-button>-->
    <!--    </div>-->
    <div slot="content">
      <!--      <div style='display: flex; justify-content: center; margin-bottom: 20px'>-->
      <!--        <su-tabs @clickTab='e => this.tabIndex = e' :tabIndex='tabIndex' tabType='button' :columns='tabColumns' />-->
      <!--      </div>-->
      <su-form ref="form" :model="formData" :rules="formRules">
        <el-row>
          <el-form-item label="项目暂定名" prop="项目暂定名" :label-width="leftLabelWidth">
            <su-input placeholder="这是输入框" v-model="formData['项目暂定名']" />
          </el-form-item>
        </el-row>

        <el-row>
          <el-form-item label="项目正式名" :label-width="leftLabelWidth">
            <su-input
              type="textarea"
              placeholder="这是文本输入框"
              v-model="formData['项目正式名']"
            />
          </el-form-item>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="计划列支部门" prop="计划列支部门" :label-width="leftLabelWidth">
              <su-search
                :suggestion-data-list="suggestionDataList"
                placeholder="这是搜索框"
                v-model="formData['计划列支部门']"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="主管部门/牵头部"
              prop="主管部门/牵头部"
              :label-width="rightLabelWidth"
            >
              <su-cascader
                :options="cascaderOptions"
                placeholder="这是级联选择框"
                :show-all-levels="false"
                collapse-tags
                :props="{multiple: true}"
                v-model="formData['主管部门/牵头部']"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="建设性质" prop="建设性质" :label-width="leftLabelWidth">
              <su-cascader
                :options="cascaderOptions"
                placeholder="这是级联选择框"
                v-model="formData['建设性质']"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属功能片区" prop="所属功能片区" :label-width="rightLabelWidth">
              <su-select
                :options="belongGongNengPiece"
                placeholder="这是多选下拉框"
                multiple
                v-model="formData['所属功能片区']"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="立项批复时间" prop="立项批复时间" :label-width="leftLabelWidth">
              <su-date-picker
                placeholder="时间选择框"
                type="date"
                style="width: 100%"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
                v-model="formData['立项批复时间']"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目类型" prop="项目类型" :label-width="rightLabelWidth">
              <su-select
                :options="projectTypeList"
                placeholder="这是单选下拉框"
                v-model="formData['项目类型']"
                @change="changeAction"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="总投资额" prop="总投资额" :label-width="leftLabelWidth">
              <su-input
                type="number"
                placeholder="8个整数，2个小数的数字输入框，最小12"
                :maxlength="10"
                :precision="2"
                v-model="formData['总投资额']"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="建安费" prop="建安费" :label-width="rightLabelWidth">
              <su-input
                type="number"
                placeholder="8个整数，2个小数的数字输入框"
                :maxlength="10"
                :precision="2"
                v-model="formData['建安费']"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-form-item label="建设内容和规模" :label-width="leftLabelWidth">
            <su-radio
              v-model="formData['建设内容和规模']"
              :isNormalCheck="false"
              :data="radioData"
            />
          </el-form-item>
        </el-row>

        <el-row>
          <el-form-item label="建设必要性" :label-width="leftLabelWidth">
            <su-checkbox :items="checkItems" v-model="formData['建设必要性']" />
          </el-form-item>
        </el-row>

        <el-row>
          <el-form-item label="投资测算及资金来源" :label-width="leftLabelWidth">
            <div style="display: flex">
              <su-switch
                :active-text="'开'"
                :inactive-text="'关'"
                v-model="formData['投资测算及资金来源']"
              />
              <su-switch
                :active-text="'开-禁用'"
                style="margin-left: 32px"
                :inactive-text="'关-禁用'"
                v-model="formData['投资测算及资金来源']"
                :disabled="true"
              />
            </div>
          </el-form-item>
        </el-row>

        <el-row>
          <su-approve-status
            :data="{status: 'process', name: '周杰伦', durationFormat: '12小时'}"
          ></su-approve-status>
        </el-row>
      </su-form>
    </div>
  </su-dialog>
</template>

<script>
export default {
  name: 'su-add',
  data() {
    return {
      isEdit: false,
      dialogVisible: false,

      // 附件上传
      uploadFileUrl: '//hsptest.sunrtnet.com:9398/uploadFile',
      uploadConfiguration: {
        accept:
          'image/jpg,image/JPG,image/jpeg,image/JPEG,image/png,image/PNG,image/svg,image/SVG,image/gif,image/GIF',
        acceptTips: '请上传图片类型文件！',
        field: null,
        showFileTypeSelect: true,
        disabled: null,
        fileShowInfoList: true,
        pattern: '.',
        fileBtnName: null,
        hint: ' ',
        uploadLimit: 10,
        uploadLimitSize: 200,
      },
      fileTypeOptions: [
        {value: '1111', label: 'xxxx1'},
        {value: '2222', label: 'xxxx2'},
        {value: '3333', label: 'xxxx3'},
        {value: '4444', label: 'xxxx4'},
      ],
      uploadName: 'files',

      leftLabelWidth: '140px',
      rightLabelWidth: '156px',

      formData: {},
      formRules: {
        项目暂定名: [{required: true, message: '请输入内容', trigger: 'blur'}],
        项目正式名: [{required: true, message: '请输入内容', trigger: 'blur'}],
        计划列支部门: [{required: true, message: '请输入内容', trigger: 'blur'}],
        '主管部门/牵头部': [{required: true, message: '请输入内容', trigger: 'blur'}],
        建设性质: [{required: true, message: '请输入内容', trigger: 'blur'}],
        所属功能片区: [{required: true, message: '请输入内容', trigger: 'blur'}],
        项目类型: [{required: true, message: '请输入内容', trigger: 'blur'}],
        总投资额: [{required: true, message: '请输入内容', trigger: 'blur'}],
        建安费: [{required: true, message: '请输入内容', trigger: 'blur'}],
      },

      suggestionDataList: [
        {value: '三全鲜食（北新泾店）', address: '长宁区新渔路144号'},
        {value: 'Hot honey 首尔炸鸡（仙霞路）', address: '上海市长宁区淞虹路661号'},
        {value: '新旺角茶餐厅', address: '上海市普陀区真北路988号创邑金沙谷6号楼113'},
        {value: '新旺角茶餐厅', address: '上海市普陀区真北路988号创邑金沙谷6号楼113'},
        {value: '新旺角茶餐厅', address: '上海市普陀区真北路988号创邑金沙谷6号楼113'},
        {value: '新旺角茶餐厅', address: '上海市普陀区真北路988号创邑金沙谷6号楼113'},
        {value: '新旺角茶餐厅', address: '上海市普陀区真北路988号创邑金沙谷6号楼113'},
        {value: '新旺角茶餐厅', address: '上海市普陀区真北路988号创邑金沙谷6号楼113'},
        {value: '泷千家(天山西路店)', address: '天山西路438号'},
        {
          value: '胖仙女纸杯蛋糕胖仙女纸杯蛋糕（上海凌空店）',
          address: '上海市长宁区金钟路968号1幢18号楼一层商铺18-101',
        },
      ],

      radioData: [
        {label: '默认选中', value: '1'},
        {label: '默认2', value: '2'},
        {label: '默认3', value: '3', disabled: true},
      ],

      checkItems: [
        {label: '默认未选1', checked: false},
        {label: '鼠标悬浮2', checked: true},
        {label: '已选', checked: true},
        {label: 'x选'},
        {label: '默认选择', checked: true, disabled: true},
        {label: '禁选', disabled: true},
      ],

      tabIndex: 0,
      tabColumns: [{label: '理论值'}, {label: '设计值'}, {label: '预拱度'}],

      belongGongNengPiece: [
        {
          value: 1,
          label: '所属功能片区1',
        },
        {
          value: 2,
          label: '所属功能片区2',
        },
        {
          value: 3,
          label: '所属功能片区3',
        },
        {
          value: 4,
          label: '所属功能片区4',
        },
      ],

      projectTypeList: [
        {
          value: 1,
          label: '项目类型1',
        },
        {
          value: 2,
          label: '项目类型2',
        },
        {
          value: 3,
          label: '项目类型3',
        },
        {
          value: 4,
          label: '项目类型4',
        },
      ],

      cascaderOptions: [
        {
          value: 'zhinan',
          label: '指南',
          children: [
            {
              value: 'shejiyuanze',
              label: '设计原则',
              children: [
                {
                  value: 'yizhi',
                  label: '一致',
                },
                {
                  value: 'fankui',
                  label: '反馈',
                },
                {
                  value: 'xiaolv',
                  label: '效率',
                },
                {
                  value: 'kekong',
                  label: '可控',
                },
              ],
            },
            {
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
            },
          ],
        },
        {
          value: 'zujian',
          label: '组件',
          children: [
            {
              value: 'basic',
              label: 'Basic',
              children: [
                {
                  value: 'layout',
                  label: 'Layout 布局',
                },
                {
                  value: 'color',
                  label: 'Color 色彩',
                },
                {
                  value: 'typography',
                  label: 'Typography 字体',
                },
                {
                  value: 'icon',
                  label: 'Icon 图标',
                },
                {
                  value: 'button',
                  label: 'Button 按钮',
                },
              ],
            },
            {
              value: 'form',
              label: 'Form',
              children: [
                {
                  value: 'radio',
                  label: 'Radio 单选框',
                },
                {
                  value: 'checkbox',
                  label: 'Checkbox 多选框',
                },
                {
                  value: 'input',
                  label: 'Input 输入框',
                },
                {
                  value: 'input-number',
                  label: 'InputNumber 计数器',
                },
                {
                  value: 'select',
                  label: 'Select 选择器',
                },
                {
                  value: 'cascader',
                  label: 'Cascader 级联选择器',
                },
                {
                  value: 'switch',
                  label: 'Switch 开关',
                },
                {
                  value: 'slider',
                  label: 'Slider 滑块',
                },
                {
                  value: 'time-picker',
                  label: 'TimePicker 时间选择器',
                },
                {
                  value: 'date-picker',
                  label: 'DatePicker 日期选择器',
                },
                {
                  value: 'datetime-picker',
                  label: 'DateTimePicker 日期时间选择器',
                },
                {
                  value: 'upload',
                  label: 'Upload 上传',
                },
                {
                  value: 'rate',
                  label: 'Rate 评分',
                },
                {
                  value: 'form',
                  label: 'Form 表单',
                },
              ],
            },
            {
              value: 'data',
              label: 'Data',
              children: [
                {
                  value: 'table',
                  label: 'Table 表格',
                },
                {
                  value: 'tag',
                  label: 'Tag 标签',
                },
                {
                  value: 'progress',
                  label: 'Progress 进度条',
                },
                {
                  value: 'tree',
                  label: 'Tree 树形控件',
                },
                {
                  value: 'pagination',
                  label: 'Pagination 分页',
                },
                {
                  value: 'badge',
                  label: 'Badge 标记',
                },
              ],
            },
            {
              value: 'notice',
              label: 'Notice',
              children: [
                {
                  value: 'alert',
                  label: 'Alert 警告',
                },
                {
                  value: 'loading',
                  label: 'Loading 加载',
                },
                {
                  value: 'message',
                  label: 'Message 消息提示',
                },
                {
                  value: 'message-box',
                  label: 'MessageBox 弹框',
                },
                {
                  value: 'notification',
                  label: 'Notification 通知',
                },
              ],
            },
            {
              value: 'navigation',
              label: 'Navigation',
              children: [
                {
                  value: 'menu',
                  label: 'NavMenu 导航菜单',
                },
                {
                  value: 'tabs',
                  label: 'Tabs 标签页',
                },
                {
                  value: 'breadcrumb',
                  label: 'Breadcrumb 面包屑',
                },
                {
                  value: 'dropdown',
                  label: 'Dropdown 下拉菜单',
                },
                {
                  value: 'steps',
                  label: 'Steps 步骤条',
                },
              ],
            },
            {
              value: 'others',
              label: 'Others',
              children: [
                {
                  value: 'dialog',
                  label: 'Dialog 对话框',
                },
                {
                  value: 'tooltip',
                  label: 'Tooltip 文字提示',
                },
                {
                  value: 'popover',
                  label: 'Popover 弹出框',
                },
                {
                  value: 'card',
                  label: 'Card 卡片',
                },
                {
                  value: 'carousel',
                  label: 'Carousel 走马灯',
                },
                {
                  value: 'collapse',
                  label: 'Collapse 折叠面板',
                },
              ],
            },
          ],
        },
        {
          value: 'ziyuan',
          label: '资源',
          children: [
            {
              value: 'axure',
              label: 'Axure Components',
            },
            {
              value: 'sketch',
              label: 'Sketch Templates',
            },
            {
              value: 'jiaohu',
              label: '组件交互文档',
            },
          ],
        },
      ],

      fileDataList: [
        {
          fileId: '05669e6a8331450e8a8d696f54f0ceb2',
          fileName: '这是图片文件1.jpg',
          fileExt: 'jpg',
          fileSize: 2811784,
          createTime: '2020-05-26 14:56:26',
          userId: '56cc0d60253111eab2a5075d32172326',
          fileUrl:
            'https://ss0.baidu.com/7Po3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/9c16fdfaaf51f3dee3fbb43696eef01f3a297912.jpg',
          userName: 'zyb',
          accountName: 'zyb',
          userTypeId: null,
          userTypeName: null,
          unitId: '0',
          unitName: '研发部',
          roleId: null,
          roleName: '系统管理员',
        },
        {
          fileId: '218dd2ad4ed64827ae13c6b68f1ccdef',
          fileName: '这是图片文件2.jpg',
          fileExt: 'jpg',
          fileSize: 2811784,
          createTime: '2020-05-26 14:56:26',
          userId: '56cc0d60253111eab2a5075d32172326',
          fileUrl:
            'http://hsptest.sunrtnet.com:8888/bridge-linear/05669e6a8331450e8a8d696f54f0ceb2.jpg',
          userName: 'zyb',
          accountName: 'zyb',
          userTypeId: null,
          userTypeName: null,
          unitId: '0',
          unitName: '研发部',
          roleId: null,
          roleName: '系统管理员',
        },
        {
          fileId: 'a36f68b879cd415cbc04e10f7a88b8c6',
          fileName: '这是pdf文件.pdf',
          fileExt: 'pdf',
          fileSize: 2811784,
          createTime: '2020-05-26 14:56:26',
          userId: '56cc0d60253111eab2a5075d32172326',
          fileUrl:
            'http://192.168.0.56:9698//image//construction/2021/9/e9da667021c144648a0dac077579140d.pdf',
          userName: 'zyb',
          accountName: 'zyb',
          userTypeId: null,
          userTypeName: null,
          unitId: '0',
          unitName: '研发部',
          roleId: null,
          roleName: '系统管理员',
        },
      ],
    }
  },
  methods: {
    openDialog(isEdit) {
      this.$refs.form?.clearValidate()
      this.formData = {}

      this.isEdit = isEdit
      this.dialogVisible = true
    },
    dialogClose() {
      this.dialogVisible = false
      this.$message.warning(`警告：关闭了${this.isEdit ? '编辑' : '新增'}对话框`)
    },
    dialogSuccess() {
      // this.$message.success('成功：成功保存')
      this.$su.messagebox('del', '删除操作不可恢复，请谨慎操作！', '温馨提示')
    },

    changeAction(value, data) {
      console.log(value, data, 'changeAction')
    },
  },
}
</script>

<style scoped lang='scss'>
</style>
