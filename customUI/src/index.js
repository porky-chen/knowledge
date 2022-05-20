import _ from 'lodash'
import QRCode from 'qrcode'

import SuLayout from './components/su-layout'
import SuButton from './components/su-button/su-button'
import SuForm from './components/su-form/index'
import SuContentlayout from './components/su-contentlayout'
import SuMenu from './components/su-menu'
import SuPagination from './components/su-pagination'
import SuTable from './components/su-table'
import SuTree from './components/su-tree'
import SuViewer from './components/su-viewer'
import SuViewerModal from './components/su-viewer-modal/index'
import {SuUpload, SuFileUpload} from './components/su-upload'
import SuTabs from './components/su-tabs'
import SuDialog from './components/su-dialog'
import SuInput from './components/su-input'
import SuRadio from './components/su-radio'
import SuDatePicker from './components/su-date-picker'
import SuCheckbox from './components/su-checkbox'
import SuSwitch from './components/su-switch'
import SuSearch from './components/su-search'
import SuAutocomplete from './components/su-autocomplete'
import SuTooltip from './components/su-tooltip'
import SuNavigator from './components/su-navigator'
import SuImages from './components/su-images'
import SuPdf from './components/su-pdf'

import SuValidateCode from './components/su-validate-code'
import MessageBox from './components/su-messagebox'
import SuSelect from './components/su-select'
import SuCascader from './components/su-cascader'
import SuLoading from './components/su-loading'
import SuDrawer from './components/su-drawer'
import SuDropdown from './components/su-dropdown'
import SuAvatar from './components/su-avatar'
import SuAlert from './components/su-alert'
import SuApproveProgress from './components/su-approve-progress'
import SuApproveStatus from './components/su-approve-status'

import {suEzuikitView, suEzuikit} from './components/su-ezuikit'

import methods from './utils/methods'
import print from './utils/print'
import utils from './utils/utils'

export default {
  // 局部导出海康组件
  suEzuikit,
  suEzuikitView,

  install: function(Vue) {
    // 注册组件
    Vue.component('SuApproveProgress', SuApproveProgress)
    Vue.component('SuApproveStatus', SuApproveStatus)
    Vue.component('SuFileUpload', SuFileUpload)
    Vue.component('SuLayout', SuLayout)
    Vue.component('SuButton', SuButton)
    Vue.component('SuForm', SuForm)
    Vue.component('SuContentlayout', SuContentlayout)
    Vue.component('SuMenu', SuMenu)
    Vue.component('SuPagination', SuPagination)
    Vue.component('SuTable', SuTable)
    Vue.component('SuTree', SuTree)
    Vue.component('SuNavigator', SuNavigator)
    Vue.component('SuViewer', SuViewer)
    Vue.component('SuUpload', SuUpload)
    Vue.component('SuTabs', SuTabs)
    Vue.component('SuDialog', SuDialog)
    Vue.component('SuDrawer', SuDrawer)
    Vue.component('SuInput', SuInput)
    Vue.component('SuRadio', SuRadio)
    Vue.component('SuCascader', SuCascader)

    Vue.component('SuImages', SuImages)
    Vue.component('SuValidateCode', SuValidateCode)
    Vue.component('SuPdf', SuPdf)
    Vue.component('SuSelect', SuSelect)
    Vue.component('SuDatePicker', SuDatePicker)
    Vue.component('SuCheckbox', SuCheckbox)
    Vue.component('SuSwitch', SuSwitch)
    Vue.component('SuSearch', SuSearch)
    Vue.component('SuAutocomplete', SuAutocomplete)
    Vue.component('SuDropdown', SuDropdown)
    Vue.component('SuAvatar', SuAvatar)
    Vue.component('SuAlert', SuAlert)
    Vue.component('SuTooltip', SuTooltip)

    // 添加 $su 属性到 vue 实例和 window
    Vue.prototype.$su = window.$su = {
      ..._,
      ...utils,
      // Http: Http,
      methods,
      print,
      QRCode,
      SuLoading,
      SuViewerModal,
      messagebox: MessageBox,
    }
  },
}
