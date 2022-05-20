const color = {
  type: 'Color',
  info: '颜色选择器',
  field: 'color',
  class: 'color-container',
  // 可配置项
  configsList: [
    {
      header: 'Brand Color',
      value: 'brandColor',
      groups: [
        {
          title: 'Primary',
          type: 'colorPicker',
          field: 'color-primary',
          info: '产品主色调/按钮色/ 选中背景/选中',
          disable: true
        }
      ]
    },
    {
      header: 'Functional Color',
      value: 'FunctionalColor',
      groups: [
        {
          title: 'Success',
          type: 'colorPicker',
          field: 'color-success',
          info: '辅助色-成功提示',
          disable: true
        },
        {
          title: 'Warning',
          type: 'colorPicker',
          field: 'color-warning',
          info: '辅助色-信息警告/警示',
          disable: true
        },
        {
          title: 'Danger',
          type: 'colorPicker',
          field: 'color-danger',
          info: '辅助色-错误提醒/ 错误反馈/删除/危险',
          disable: true
        },
        {
          title: 'Info',
          type: 'colorPicker',
          field: 'color-info',
          info: '二级文字信息',
          disable: true
        },
      ]
    },
    {
      header: 'Font Color',
      value: 'FontColor',
      groups: [
        {
          title: 'text-primary',
          info: '主要文字颜色',
          type: 'colorPicker',
          field: 'color-text-primary',
          disable: true
        },
        {
          title: 'text-primary-light',
          info: '主要文字颜色 轻色号-1级',
          type: 'colorPicker',
          field: 'color-text-primary-light',
          disable: true
        },
        {
          title: 'text-regular',
          info: '常规文字颜色',
          type: 'colorPicker',
          field: 'color-text-regular',
          disable: true
        },
        {
          title: 'text-secondary',
          info: '次要文字颜色',
          type: 'colorPicker',
          field: 'color-text-secondary',
          disable: true
        },
        {
          title: 'text-placeholder',
          info: '占位文字颜色',
          type: 'colorPicker',
          field: 'color-text-placeholder',
          disable: true
        },
      ]
    },
    {
      header: 'Pure Color',
      value: 'PureColor',
      groups: [
        {
          title: 'color-white',
          info: '白色系',
          type: 'colorPicker',
          field: 'color-white',
          disable: true
        },
        {
          title: 'color-black',
          info: '黑色系',
          type: 'colorPicker',
          field: 'color-black',
          disable: true
        },
      ]
    },
  ],
  // 可配置项数据
  configsDatas: {
    'color-success': '#74D13D',
    'color-warning': '#F7A62B',
    'color-danger': '#F4513B',
    'color-info': '#959BA6',
    'color-primary': '#3B86FF',
    'color-primary-light': '#3c86ff',
    'color-primary-lighter': '#3774EE',
    'color-primary-lightest': '#348BF5',
    'color-primary-light-9': 'mix($color-white, $color-primary, 90%)',

    // 黑白色
    'color-white': '#ffffff',
    'color-black': '#000000',

    // 字体主题色
    'color-text-primary': '#3D434D',
    'color-text-primary-light': '#3d434e',
    'color-text-secondary': '#959BA6',
    'color-text-placeholder': '#888888',
    'color-text-regular': '#666F80',
  },
};

export default color;