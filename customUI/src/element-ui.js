/**
 * Copyright (c) 2021 Guangdong Sun Railway Information Technology, Inc.
 * All rights reserved.
 *
 * @author wenteng
 *
 * Description:
 * Changelog:
 *
 * Revision:
 */
import locale from 'element-ui/lib/locale'
import element from 'element-ui'

// 在业务系统下禁用的element组件列表
const excludeComponentNames = [
  // 按钮
  element.Button.name,
  // 分页
  element.Pagination.name,
  // 弹窗 - 对话框
  element.Dialog.name,
  // 下拉按钮
  element.Dropdown.name,
  // 输入框
  element.Input.name,
  // 开关
  element.Switch.name,
  // 抽屉
  element.Drawer.name,
  // 级联
  element.Cascader.name,
  // 选择框
  element.Select.name,
  // 日期选择框
  element.DatePicker.name,
  // 标签tabs
  element.Tabs.name,
  // 树
  element.Tree.name,
  // 附件上传
  element.Upload.name,
  // 头像
  element.Avatar.name,
  // Alert
  element.Alert.name,
  // 表格
  element.Table.name,
  // 表单
  element.Form.name,
]

// 以下是element组件库的组件列表
//   Pagination,
//   Dialog,
//   Autocomplete,
//   Dropdown,
//   DropdownMenu,
//   DropdownItem,
//   Menu,
//   Submenu,
//   MenuItem,
//   MenuItemGroup,
//   Input,
//   InputNumber,
//   Radio,
//   RadioGroup,
//   RadioButton,
//   Checkbox,
//   CheckboxButton,
//   CheckboxGroup,
//   Switch,
//   Select,
//   Option,
//   OptionGroup,
//   Button,
//   ButtonGroup,
//   Table,
//   TableColumn,
//   DatePicker,
//   TimeSelect,
//   TimePicker,
//   Popover,
//   Tooltip,
//   Breadcrumb,
//   BreadcrumbItem,
//   Form,
//   FormItem,
//   Tabs,
//   TabPane,
//   Tag,
//   Tree,
//   Alert,
//   Slider,
//   Icon,
//   Row,
//   Col,
//   Upload,
//   Progress,
//   Spinner,
//   Badge,
//   Card,
//   Rate,
//   Steps,
//   Step,
//   Carousel,
//   Scrollbar,
//   CarouselItem,
//   Collapse,
//   CollapseItem,
//   Cascader,
//   ColorPicker,
//   Transfer,
//   Container,
//   Header,
//   Aside,
//   Main,
//   Footer,
//   Timeline,
//   TimelineItem,
//   Link,
//   Divider,
//   Image,
//   Calendar,
//   Backtop,
//   PageHeader,
//   CascaderPanel,
//   Avatar,
//   Drawer,
//   Popconfirm,
//   Skeleton,
//   SkeletonItem,
//   Empty,
//   Descriptions,
//   DescriptionsItem,
//   Result,
//   CollapseTransition


export default {
  version: element.version,

  install: function(Vue, opts = {}) {
    locale.use(opts.locale)
    locale.i18n(opts.i18n)

    let {include = []} = opts
    for (let itemComponent of Object.values(element)) {
      if (itemComponent.name && itemComponent.name.startsWith('El') && (!excludeComponentNames.includes(itemComponent.name) || include.includes(itemComponent.name))) {
        Vue.component(itemComponent.name, itemComponent)
      }
    }

    Vue.use(element.InfiniteScroll)
    Vue.use(element.Loading.directive)

    Vue.prototype.$ELEMENT = {
      size: opts.size || '',
      zIndex: opts.zIndex || 2000,
    }

    Vue.prototype.$loading = element.Loading.service
    Vue.prototype.$msgbox = element.MessageBox
    Vue.prototype.$alert = element.MessageBox.alert
    Vue.prototype.$confirm = element.MessageBox.confirm
    Vue.prototype.$prompt = element.MessageBox.prompt
    Vue.prototype.$notify = element.Notification
    Vue.prototype.$message = element.Message
  },
}
