const font = {
  type: 'Font Typography',
  info: '字体相关内容',
  field: 'font',
  class: 'font-container',
  // 可配置项
  configsList: [
    {
      header: 'Font Size',
      cssType: 'font-size',
      value: 'FontSize',
      groups: [
        {
          type: 'font',
          field: 'font-size-large',
          info: '标题文字大小',
          title: '标题文字大小',
          disable: false,
          content: '测试文字',
        },
        {
          type: 'font',
          field: 'font-size-base',
          info: '正文文字大小',
          title: '正文文字大小',
          disable: false,
          content: '测试文字',
        },
        {
          type: 'font',
          field: 'font-size-small',
          info: '正文（小）文字大小',
          title: '正文（小）文字大小',
          disable: false,
          content: '测试文字',
        },
        {
          type: 'font',
          field: 'text-size-default',
          info: '正文（小）文字大小',
          title: '正文（小）文字大小',
          disable: false,
          content: '测试文字',
        },
        {
          type: 'font',
          field: 'text-size-xs',
          info: '正文（小）文字超小',
          title: '正文（小）文字超小',
          disable: false,
          content: '测试文字',
        },
        {
          type: 'font',
          field: 'text-size-sm',
          info: '正文（小）文字小',
          title: '正文（小）文字小',
          disable: false,
          content: '测试文字',
        },
        {
          type: 'font',
          field: 'text-size-md',
          info: '正文（小）文字中',
          title: '正文（小）文字中',
          disable: false,
          content: '测试文字',
        },
      ]
    },
    {
      header: 'Font Weight',
      cssType: 'font-weight',
      value: 'FontWeight',
      groups: [
        {
          type: 'font',
          field: 'font-weight-primary',
          info: '主要文字粗细',
          title: '主要文字粗细',
          disable: false,
          content: 'With MySpace becoming more popular every day, there is the constant need to be different. There are millions of users. If MySpace layouts are chosen well, then you can enhance your profile a great deal.',
        },
      ]
    },
    {
      header: 'Line Height',
      cssType: 'line-height',
      value: 'LineHeight',
      groups: [
        {
          type: 'font',
          field: 'font-line-height-primary',
          info: '主要文字行高',
          title: '主要文字行高',
          disable: false,
          content: 'With MySpace becoming more popular every day, there is the constant need to be different. There are millions of users. If MySpace layouts are chosen well, then you can enhance your profile a great deal.',
        },
      ]
    },
  ],
  // 可配置项数据
  configsDatas: {
    'text-size-default': '12px',
    'text-size-xs': '14px',
    'text-size-sm': '16px',
    'text-size-md': '18px',
    'font-size-large': '1.1rem',
    'font-size-base': '0.9rem',
    'font-size-small': '0.8125rem',
    'font-weight-primary': '500',
    'font-line-height-primary': '24px',
  },
};

export default font;