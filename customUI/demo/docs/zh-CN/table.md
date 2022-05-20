## Table 表格

用于展示多条结构类似的数据，可对数据进行排序、筛选、对比或其他自定义操作。

<br/>
<br/>
常见问题：
<br/>
1.table组件需要配置的东西<br/>
答：columns列表配置项 data保存数据的对象<br/><br/>
2.type类型textColor<br/>
答：新增的type类型textColor,文本加粗，传入color可以改变颜色，还提供textNormal和undeline两种可配置自定义class样式，可根据项目组件业务场景进行改样式
<br/>
<br/>

### 基础表格

基础的表格展示用法。

::: demo

```html

<su-table highlightCurrentRow 
          :columns='columns'
          :data='pageDatas' 
          :border='true' 
          :clickRowCheck='false' 
          indexwidth='100'
          sortable
>
  <div slot='tableHeaderLeftView'>
    <su-button icon='el-icon-plus'
               :plain='true'
    >
      登记
    </su-button>
  </div>
  <div slot='tableHeaderRightView'>
    <su-search />
  </div>
  <div slot='tableFooterView'>
    <su-pagination
      class='pagination-view'
      :current-page='1'
      :page-size='15'
      :total='20'
    />
  </div>
  <div slot='dealFlatSlot' slot-scope='scope'>
    {{scope.dealFlat == 1 ? '已处置': '未处置'}} slotID方式
  </div>
</su-table>
<script>
  export default {
    data() {
      return {
        pageDatas: [
          {
            'alarmId': '975eeb37632f4d76bf3300f821597b8d',
            'conbeamId': 'd8e3708c3cf447e9bca81d9259248cab',
            'conbeamName': '1111',
            'beamId': '82b6a50587604febbb256158ded61ebb',
            'beamCode': '1',
            'pierId': '0b52d29a78b24ec29c406add1a8cb5b3',
            'pierCode': '1',
            'pointPlace': 2,
            'pointName': '1#1-0-2',
            'theoryValue': 14.0000,
            'executeValue': 0.0000,
            'deviation': 12.0000,
            'theory': '[-2.00,2.00]',
            'warnType': 3,
            'overrunRatio': 3.00,
            'stepCode': 1,
            'stopDay': 1,
            'executorName': '彭荣华',
            'executeTime': '2020-06-03 09:54:40',
            'dealFlag': 0
          },
          {
            'alarmId': '1c8862907ab34eba8dad77e26258c127',
            'conbeamId': 'd8e3708c3cf447e9bca81d9259248cab',
            'conbeamName': '1111',
            'beamId': '82b6a50587604febbb256158ded61ebb',
            'beamCode': '1',
            'pierId': '0b52d29a78b24ec29c406add1a8cb5b3',
            'pierCode': '1',
            'pointPlace': 1,
            'pointName': '1#1-0-1',
            'theoryValue': null,
            'executeValue': null,
            'deviation': 45746.9316,
            'theory': '[-10.00,25.00]',
            'warnType': 5,
            'overrunRatio': 1307.06,
            'stepCode': 1,
            'stopDay': 1,
            'executorName': '彭荣华',
            'executeTime': '2020-06-03 09:54:33',
            'dealFlag': 0
          },
          {
            'alarmId': '1c8862907ab34eba8dad77e26258c127',
            'conbeamId': 'd8e3708c3cf447e9bca81d9259248cab',
            'conbeamName': '1111',
            'beamId': '82b6a50587604febbb256158ded61ebb',
            'beamCode': '1',
            'pierId': '0b52d29a78b24ec29c406add1a8cb5b3',
            'pierCode': '1',
            'pointPlace': 1,
            'pointName': '1#1-0-1',
            'theoryValue': null,
            'executeValue': null,
            'deviation': 45746.9316,
            'theory': '[-10.00,25.00]',
            'warnType': 5,
            'overrunRatio': 1307.06,
            'stepCode': 1,
            'stopDay': 1,
            'executorName': '彭荣华',
            'executeTime': '2020-06-03 09:54:33',
            'dealFlag': 0
          },
          {
            'alarmId': '0539af1339ff4d35a4fb5fe1dedf906d',
            'conbeamId': 'd8e3708c3cf447e9bca81d9259248cab',
            'conbeamName': '1111',
            'beamId': '82b6a50587604febbb256158ded61ebb',
            'beamCode': '1',
            'pierId': '0b52d29a78b24ec29c406add1a8cb5b3',
            'pierCode': '1',
            'pointPlace': 1,
            'pointName': '1#1-0-1',
            'theoryValue': 13.0000,
            'executeValue': 0.0000,
            'deviation': 11.0000,
            'theory': '[-2.00,2.00]',
            'warnType': 3,
            'overrunRatio': 2.75,
            'stepCode': 1,
            'stopDay': 1,
            'executorName': '彭荣华',
            'executeTime': '2020-06-03 09:54:33',
            'dealFlag': 0,
            showPopovers: true,
            popovers: [
              '名称：迪奥',
              '替身：扎瓦鲁多',
              '属性面板：3A',
              '口头禅：KoNo迪奥哒',
            ],
          },
          {
            'alarmId': '0539af1339ff4d35a4fb5fe1dedf906d',
            'conbeamId': 'd8e3708c3cf447e9bca81d9259248cab',
            'conbeamName': '1111',
            'beamId': '82b6a50587604febbb256158ded61ebb',
            'beamCode': '1',
            'pierId': '0b52d29a78b24ec29c406add1a8cb5b3',
            'pierCode': '1',
            'pointPlace': 1,
            'pointName': '1#1-0-1',
            'theoryValue': 13.0000,
            'executeValue': 0.0000,
            'deviation': 11.0000,
            'theory': '[-2.00,2.00]',
            'warnType': 3,
            'overrunRatio': 2.75,
            'stepCode': 1,
            'stopDay': 1,
            'executorName': '彭荣华',
            'executeTime': '2020-06-03 09:54:33',
            'dealFlag': 0,
            showPopovers: true,
            popovers: [
              '名称：乔瑟夫乔斯达',
              '替身名称：紫色之隐',
              '属性面板：1A',
            ],
          }
        ],
        columns: [
          {
            prop: 'conbeamName',
            label: '连续梁名称 ',
            class: 'testdasd'
          },
          {
            prop: 'pierCode',
            label: '考核得分',
            cursor: true,
            textNormal: true,
            underline: true,
            type: 'textColor',
            color: 'red'
          },
          {
            prop: 'beamCode',
            label: '审核状态',
            type: 'colorTag',
            effect: () => {
              return 'dark'
            },
            text: (row) => {
              let text = '待启动'
              return text
            },
          },
          {
            prop: 'pointPlace',
            label: '测点编号',
          },
          {
            prop: 'theoryValue',
            label: '理论值(m)',
          },
          {
            prop: 'executeValue',
            label: '实测值(m)',
          },
          {
            prop: 'deviation',
            label: '超限偏差(mm)',
          },
          {
            prop: 'theory',
            label: '正常偏差范围(mm)',
          },
          {
            prop: 'stepCode',
            label: '超限工况',
            width: 110,
            isFilter: true,
            multiple: false,
            filters: [
              {text: '挂篮后', value: 1},
              {text: '浇筑前', value: 2},
              {text: '浇筑后', value: 3},
              {text: '张拉前', value: 4},
              {text: '张拉后', value: 5},
              {text: '挂篮前', value: 6},
            ],
          },
          {
            prop: 'warnType',
            label: '超限类型',
            width: 110,
          },
          {
            prop: 'stopDay',
            label: '滞留时间',
          },
          {
            prop: 'executeTime',
            label: '测量人员',
            type: 'popover',
            trigger: 'hover',
            placement: 'top',
          },
          {
            prop: 'executorName',
            label: '测量日期',
            width: 200,
            align: 'right',
            icon: require('../../assets/logo.png'),
          },
          {
            prop: 'dealFlag',
            label: '处置状态',
            width: 200,
            type: 'slot',
            slotID: 'dealFlatSlot',
            // isFilter: true,
            // filters:[
            //   { text: '未处置', value: 0 },
            //   { text: '已处置', value: 1 },
            // ],
          },
          {
            prop: 'control',
            label: '操作',
            width: 150,
            align: 'left',
            headerAlign: 'left',
            placeholder: '请输入',
            buttons: [
              {
                text: '删除',
                type: 'text',
                onClick: (e) => {
                  this.delItem(e)
                }
              }
            ]
          },
        ],
      }
    },
    methods: {
      // vue中基本类型的值会有报错提示，所以需要手动设置值
      changeDate(e) {
        this.infoData.createTime = e
      }
    }
  }
</script>
```

:::

### 固定列 以及 固定表头

设置参数可以固定列 防止滑动的时候表列随之滑动

::: demo

```html

<su-table :indexFixed='true' :columns='columns' :data='pageDatas' :border='true' sortable />
<script>
  export default {
    data() {
      return {
        pageDatas: [
          {
            'alarmId': '975eeb37632f4d76bf3300f821597b8d',
            'conbeamId': 'd8e3708c3cf447e9bca81d9259248cab',
            'conbeamName': '1111',
            'beamId': '82b6a50587604febbb256158ded61ebb',
            'beamCode': '1',
            'pierId': '0b52d29a78b24ec29c406add1a8cb5b3',
            'pierCode': '1',
            'pointPlace': 2,
            'pointName': '1#1-0-2',
            'theoryValue': 14.0000,
            'executeValue': 0.0000,
            'deviation': 12.0000,
            'theory': '[-2.00,2.00]',
            'warnType': 3,
            'overrunRatio': 3.00,
            'stepCode': 1,
            'stopDay': 1,
            'executorName': '彭荣华',
            'executeTime': '2020-06-03 09:54:40',
            'dealFlag': 0
          },
          {
            'alarmId': '1c8862907ab34eba8dad77e26258c127',
            'conbeamId': 'd8e3708c3cf447e9bca81d9259248cab',
            'conbeamName': '1111',
            'beamId': '82b6a50587604febbb256158ded61ebb',
            'beamCode': '1',
            'pierId': '0b52d29a78b24ec29c406add1a8cb5b3',
            'pierCode': '1',
            'pointPlace': 1,
            'pointName': '1#1-0-1',
            'theoryValue': null,
            'executeValue': null,
            'deviation': 45746.9316,
            'theory': '[-10.00,25.00]',
            'warnType': 5,
            'overrunRatio': 1307.06,
            'stepCode': 1,
            'stopDay': 1,
            'executorName': '彭荣华',
            'executeTime': '2020-06-03 09:54:33',
            'dealFlag': 0
          },
          {
            'alarmId': '1c8862907ab34eba8dad77e26258c127',
            'conbeamId': 'd8e3708c3cf447e9bca81d9259248cab',
            'conbeamName': '1111',
            'beamId': '82b6a50587604febbb256158ded61ebb',
            'beamCode': '1',
            'pierId': '0b52d29a78b24ec29c406add1a8cb5b3',
            'pierCode': '1',
            'pointPlace': 1,
            'pointName': '1#1-0-1',
            'theoryValue': null,
            'executeValue': null,
            'deviation': 45746.9316,
            'theory': '[-10.00,25.00]',
            'warnType': 5,
            'overrunRatio': 1307.06,
            'stepCode': 1,
            'stopDay': 1,
            'executorName': '彭荣华',
            'executeTime': '2020-06-03 09:54:33',
            'dealFlag': 0
          },
          {
            'alarmId': '0539af1339ff4d35a4fb5fe1dedf906d',
            'conbeamId': 'd8e3708c3cf447e9bca81d9259248cab',
            'conbeamName': '1111',
            'beamId': '82b6a50587604febbb256158ded61ebb',
            'beamCode': '1',
            'pierId': '0b52d29a78b24ec29c406add1a8cb5b3',
            'pierCode': '1',
            'pointPlace': 1,
            'pointName': '1#1-0-1',
            'theoryValue': 13.0000,
            'executeValue': 0.0000,
            'deviation': 11.0000,
            'theory': '[-2.00,2.00]',
            'warnType': 3,
            'overrunRatio': 2.75,
            'stepCode': 1,
            'stopDay': 1,
            'executorName': '彭荣华',
            'executeTime': '2020-06-03 09:54:33',
            'dealFlag': 0,
            showPopovers: true,
            popovers: [
              '名称：迪奥',
              '替身：扎瓦鲁多',
              '属性面板：3A',
              '口头禅：KoNo迪奥哒',
            ],
          },
          {
            'alarmId': '0539af1339ff4d35a4fb5fe1dedf906d',
            'conbeamId': 'd8e3708c3cf447e9bca81d9259248cab',
            'conbeamName': '1111',
            'beamId': '82b6a50587604febbb256158ded61ebb',
            'beamCode': '1',
            'pierId': '0b52d29a78b24ec29c406add1a8cb5b3',
            'pierCode': '1',
            'pointPlace': 1,
            'pointName': '1#1-0-1',
            'theoryValue': 13.0000,
            'executeValue': 0.0000,
            'deviation': 11.0000,
            'theory': '[-2.00,2.00]',
            'warnType': 3,
            'overrunRatio': 2.75,
            'stepCode': 1,
            'stopDay': 1,
            'executorName': '彭荣华',
            'executeTime': '2020-06-03 09:54:33',
            'dealFlag': 0,
            showPopovers: true,
            popovers: [
              '名称：乔瑟夫乔斯达',
              '替身名称：紫色之隐',
              '属性面板：1A',
            ],
          }
        ],
        columns: [
          {
            prop: 'conbeamName',
            label: '连续梁名称 ',
          },
          {
            prop: 'pierCode',
            label: '桥墩号',
          },
          {
            prop: 'beamCode',
            label: '梁段号',
          },
          {
            prop: 'pointPlace',
            label: '测点编号',
          },
          {
            prop: 'theoryValue',
            label: '理论值(m)',
          },
          {
            prop: 'executeValue',
            label: '实测值(m)',
          },
          {
            prop: 'deviation',
            label: '超限偏差(mm)',
          },
          {
            prop: 'theory',
            label: '正常偏差范围(mm)',
          },
          {
            prop: 'stepCode',
            label: '超限工况',
            width: 110,
            isFilter: true,
            multiple: false,
            filters: [
              {text: '挂篮后', value: 1},
              {text: '浇筑前', value: 2},
              {text: '浇筑后', value: 3},
              {text: '张拉前', value: 4},
              {text: '张拉后', value: 5},
              {text: '挂篮前', value: 6},
            ],
          },
          {
            prop: 'warnType',
            label: '超限类型',
            width: 110,
          },
          {
            prop: 'stopDay',
            label: '滞留时间',
          },
          {
            prop: 'executorName',
            label: '测量人员',
            type: 'popover',
            trigger: 'hover',
            placement: 'top',
          },
          {
            prop: 'executeTime',
            label: '测量日期',
          },
          {
            prop: 'dealFlag',
            label: '处置状态',
            width: 110,
            isFilter: true,
            filters: [
              {text: '未处置', value: 0},
              {text: '已处置', value: 1},
            ],
          },
          {
            prop: 'control',
            label: '操作',
            width: 150,
            align: 'left',
            headerAlign: 'left',
            fixed: 'right',
            placeholder: '请输入',
            buttons: [
              {
                text: '删除',
                type: 'text',
                onClick: (e) => {
                  this.delItem(e)
                }
              }
            ]
          },
        ],
      }
    },
    methods: {
      // vue中基本类型的值会有报错提示，所以需要手动设置值
      changeDate(e) {
        this.infoData.createTime = e
      }
    }
  }
</script>
```

:::

### 彩色标签、彩色字体以及彩色按钮

可以通过设置columns设置彩色字体、标签和按钮

::: demo

```html

<su-table height='280px' :indexFixed='true' :columns='columns' :data='pageDatas' :border='true' sortable />
<script>
  export default {
    data() {
      return {
        pageDatas: [
          {
            'alarmId': '975eeb37632f4d76bf3300f821597b8d',
            'conbeamId': 'd8e3708c3cf447e9bca81d9259248cab',
            'conbeamName': '1111',
            'beamId': '82b6a50587604febbb256158ded61ebb',
            'beamCode': '1',
            'pierId': '0b52d29a78b24ec29c406add1a8cb5b3',
            'pierCode': '1',
            'pointPlace': 2,
            'pointName': '1#1-0-2',
            'theoryValue': 14.0000,
            'executeValue': 0.0000,
            'deviation': 12.0000,
            'theory': '[-2.00,2.00]',
            'warnType': 3,
            'overrunRatio': 3.00,
            'stepCode': 1,
            'stopDay': 1,
            'executorName': '彭荣华',
            'executeTime': '2020-06-03 09:54:40',
            'dealFlag': 0,
            'uploadStatus': 1
          },
          {
            'alarmId': '1c8862907ab34eba8dad77e26258c127',
            'conbeamId': 'd8e3708c3cf447e9bca81d9259248cab',
            'conbeamName': '1111',
            'beamId': '82b6a50587604febbb256158ded61ebb',
            'beamCode': '1',
            'pierId': '0b52d29a78b24ec29c406add1a8cb5b3',
            'pierCode': '1',
            'pointPlace': 1,
            'pointName': '1#1-0-1',
            'theoryValue': null,
            'executeValue': null,
            'deviation': 45746.9316,
            'theory': '[-10.00,25.00]',
            'warnType': 5,
            'overrunRatio': 1307.06,
            'stepCode': 1,
            'stopDay': 1,
            'executorName': '彭荣华',
            'executeTime': '2020-06-03 09:54:33',
            'dealFlag': 0,
            'uploadStatus': 1
          },
          {
            'alarmId': '1c8862907ab34eba8dad77e26258c127',
            'conbeamId': 'd8e3708c3cf447e9bca81d9259248cab',
            'conbeamName': '1111',
            'beamId': '82b6a50587604febbb256158ded61ebb',
            'beamCode': '1',
            'pierId': '0b52d29a78b24ec29c406add1a8cb5b3',
            'pierCode': '1',
            'pointPlace': 1,
            'pointName': '1#1-0-1',
            'theoryValue': null,
            'executeValue': null,
            'deviation': 45746.9316,
            'theory': '[-10.00,25.00]',
            'warnType': 5,
            'overrunRatio': 1307.06,
            'stepCode': 1,
            'stopDay': 1,
            'executorName': '彭荣华',
            'executeTime': '2020-06-03 09:54:33',
            'dealFlag': 0,
            'uploadStatus': 1
          },
          {
            'alarmId': '0539af1339ff4d35a4fb5fe1dedf906d',
            'conbeamId': 'd8e3708c3cf447e9bca81d9259248cab',
            'conbeamName': '1111',
            'beamId': '82b6a50587604febbb256158ded61ebb',
            'beamCode': '1',
            'pierId': '0b52d29a78b24ec29c406add1a8cb5b3',
            'pierCode': '1',
            'pointPlace': 1,
            'pointName': '1#1-0-1',
            'theoryValue': 13.0000,
            'executeValue': 0.0000,
            'deviation': 11.0000,
            'theory': '[-2.00,2.00]',
            'warnType': 3,
            'overrunRatio': 2.75,
            'stepCode': 1,
            'stopDay': 1,
            'executorName': '彭荣华',
            'executeTime': '2020-06-03 09:54:33',
            'dealFlag': 0,
            'uploadStatus': 0,
            showPopovers: true,
            popovers: [
              '名称：迪奥',
              '替身：扎瓦鲁多',
              '属性面板：3A',
              '口头禅：KoNo迪奥哒',
            ],
          },
          {
            'alarmId': '0539af1339ff4d35a4fb5fe1dedf906d',
            'conbeamId': 'd8e3708c3cf447e9bca81d9259248cab',
            'conbeamName': '1111',
            'beamId': '82b6a50587604febbb256158ded61ebb',
            'beamCode': '1',
            'pierId': '0b52d29a78b24ec29c406add1a8cb5b3',
            'pierCode': '1',
            'pointPlace': 1,
            'pointName': '1#1-0-1',
            'theoryValue': 13.0000,
            'executeValue': 0.0000,
            'deviation': 11.0000,
            'theory': '[-2.00,2.00]',
            'warnType': 3,
            'overrunRatio': 2.75,
            'stepCode': 1,
            'stopDay': 1,
            'executorName': '彭荣华',
            'longtooltest': '彭荣华彭荣华彭荣华彭荣华彭荣华彭荣华彭荣华彭荣华彭荣华彭荣华彭荣华彭荣华彭荣华彭荣华彭荣华彭荣华彭荣华彭荣华彭荣华彭荣华彭荣华彭荣华彭荣华彭荣华彭荣华彭荣华彭荣华彭荣华彭荣华彭荣华彭荣华彭荣华彭荣华',
            'executeTime': '2020-06-03 09:54:33',
            'dealFlag': 0,
            'uploadStatus': 0,
            showPopovers: true,
            popovers: [
              '名称：乔瑟夫乔斯达',
              '替身名称：紫色之隐',
              '属性面板：1A',
            ],
          }
        ],
        columns: [
          {
            prop: 'conbeamName',
            label: '连续梁名称 ',
          },
          {
            prop: 'pierCode',
            label: '桥墩号',
          },
          {
            prop: 'beamCode',
            label: '梁段号',
          },
          {
            prop: 'pointPlace',
            label: '测点编号',
          },
          {
            prop: 'theoryValue',
            label: '理论值(m)',
          },
          {
            prop: 'executeValue',
            label: '实测值(m)',
          },
          {
            prop: 'deviation',
            label: '超限偏差(mm)',
          },
          {
            prop: 'theory',
            label: '正常偏差范围(mm)',
          },
          {
            prop: 'stepCode',
            label: '超限工况',
            width: 110,
            isFilter: true,
            multiple: false,
            filters: [
              {text: '挂篮后', value: 1},
              {text: '浇筑前', value: 2},
              {text: '浇筑后', value: 3},
              {text: '张拉前', value: 4},
              {text: '张拉后', value: 5},
              {text: '挂篮前', value: 6},
            ],
          },
          {
            prop: 'warnType',
            label: '超限类型',
            width: 110,
          },
          {
            prop: 'stopDay',
            label: '滞留时间',
            width: 130,
            sortable: true,
            sortMethod: (a, b) => {
              console.log('sortMethod', a);
              return a.stopDay - b.stopDay;
            }
          },
          {
            prop: 'executorName',
            label: '测量人员',
            type: 'popover',
            trigger: 'hover',
            placement: 'top',
          },
          {
            prop: 'longtooltest',
            label: '测试',
            trigger: 'hover',
            placement: 'top',
            type: 'longtooltip',
          },
          {
            prop: 'executeTime',
            label: '测量日期',
          },
          {
            prop: 'dealFlag',
            label: '处置状态',
            width: 110,
            isFilter: true,
            filters: [
              {text: '未处置', value: 0},
              {text: '已处置', value: 1},
            ],
          },
          {
            prop: 'uploadStatus',
            label: '上传状态',
            width: 110,
            type: 'colorTag',
            isBorder: (row) => {
              return row.uploadStatus === 0 ? false : true
            },
            tagType: (row) => {
              return row.uploadStatus === 0 ? 'warning' : 'warning'
            },
            text: (row) => {
              return row.uploadStatus === 0 ? '未上传' : '已上传'
            },
            isFilter: true,
            filters: [
              {text: '未处置', value: 0},
              {text: '已处置', value: 1},
            ],
          },
          {
            prop: 'control',
            label: '操作',
            width: 150,
            align: 'left',
            headerAlign: 'left',
            fixed: 'right',
            placeholder: '请输入',
            buttons: [
              {
                text: '删除',
                type: 'text',
                onClick: (e) => {
                  this.delItem(e)
                }
              }
            ]
          },
        ],
      }
    },
    methods: {
      // vue中基本类型的值会有报错提示，所以需要手动设置值
      changeDate(e) {
        this.infoData.createTime = e
      }
    }
  }
</script>
```

:::

### 表格数据编辑

可以通过columns设置日期选择，字符串输入，单选按钮,选择器

::: demo

```html

<div style='justify-content:flex-end;display: flex'>
  <su-button
    type='text'
    icon='el-icon-plus'
    @click='add'
    class=''>新增
  </su-button>
</div>
<su-table :showCheckbox='false' height='280px' :indexFixed='true' :columns='columns' :data='pageDatas' :border='true' />
<script>
  export default {
    data() {
      return {
        pageDatas: [{text: 'init', extra: 'd'}
        ],
        columns: [
          {
            prop: 'date',
            label: '日期 ',
            type: 'date',
            dateType: 'year',
            format: 'yyyy',
            valueFormat: 'yyyy',
          },
          {
            prop: 'number',
            label: '数字 ',
            type: 'number',
            max: 100,
            min: 1
          },
          {
            prop: 'text',
            label: '字符串',
            type: 'text',
            maxlength: 5,
            minlength: 1,
            clearable: true,
            placeholder: '请输入',
            change: (val, row) => {
              console.log('change', row)
            },
            input: (val, row) => {
              console.log('input', row)
            },
          },
          {
            prop: 'radio',
            label: '单选',
            type: 'radio',
            options: [{value: 1, label: 'a'}, {value: 2, label: 'b'}]
          },
          {
            prop: 'select',
            label: '选择器',
            type: 'select',
            options: [{value: 1, label: '黄金糕'}, {value: 2, label: '双皮奶'}]
          },
          {
            prop: 'control',
            label: '操作',
            width: 120,
            align: 'left',
            headerAlign: 'left',
            fixed: 'right',
            buttons: [
              {
                text: '删除',
                type: 'text',
                onClick: (e, index) => {
                  console.log('obj', e)
                  this.delItem(index)
                }
              },
              {
                text: '查看',
                type: 'text',
                onClick: (e, index) => {
                  console.log('obj', e)
                  delete e.flag
                  this.$alert(JSON.stringify(e), '内容')
                }
              }
            ]
          },
        ],
      }
    },
    methods: {
      delItem(index) {
        this.pageDatas.splice(index, 1)
      },
      add() {
        this.pageDatas.push({});
      }
    }
  }
</script>
```

:::

### Table参数

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| data | 显示的数据 | array | - | - |
| max-height | Table 的最大高度。合法的值为数字或者单位为 px 的高度 | string/number | - | - |
| stripe | 是否为斑马纹 table | boolean | - | false |
| border | 是否带有纵向边框 | boolean | - | false |
| size | Table 的尺寸 | Table 的尺寸 | medium / small / mini | - |
| fit | 列的宽度是否自撑开 | boolean | - | true |
| show-header | 是否显示表头 | boolean | - | true |
| highlight-current-row | 是否要高亮当前行 | boolean | - | false |
| current-row-key | 当前行的 key，只写属性 | String,Number | - | - |
| row-class-name | 行的 className 的回调方法，也可以使用字符串为所有行设置一个固定的 className | Function({row, rowIndex})/String | - | row-defalut-class |
| row-style | 行的 style 的回调方法，也可以使用一个固定的 Object 为所有行设置一样的 Style | Function({row, rowIndex})/Object | - | - |
| cell-class-name | 单元格的 className 的回调方法，也可以使用字符串为所有单元格设置一个固定的 className | Function({row, column, rowIndex, columnIndex})/String | - | - |
| cell-style | 单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有单元格设置一样的 Style | Function({row, column, rowIndex, columnIndex})/Object | - | - |
| header-row-class-name/headerrow-class-name | 表头行的 className 的回调方法，也可以使用字符串为所有表头行设置一个固定的 className | Function({row, rowIndex})/String | - | header-defalut-row-class |
| header-row-style | 表头行的 style 的回调方法，也可以使用一个固定的 Object 为所有表头行设置一样的 Style | Function({row, rowIndex})/Object | - | - |
| header-cell-class-name | 表头单元格的 className 的回调方法，也可以使用字符串为所有表头单元格设置一个固定的 className | Function({row, column, rowIndex, columnIndex})/String | - | - |
| header-cell-style | 表头单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有表头单元格设置一样的 Style | Function({row, column, rowIndex, columnIndex})/Object | - | - |
| row-key/id | 行数据的 Key，用来优化 Table 的渲染；在使用 reserve-selection 功能与显示树形数据时，该属性是必填的。类型为 String 时，支持多层访问：user.info.id，但不支持 user.info[0].id，此种情况请使用 Function | Function(row)/String | - | - |
| empty-text | 空数据时显示的文本内容，也可以通过 slot="empty" 设置 | String | - | 暂无数据 |
| default-expand-all | 是否默认展开所有行，当 Table 包含展开行存在或者为树形表格时有效 | Boolean | - | false |
| expand-row-keys | 可以通过该属性设置 Table 目前的展开行，需要设置 row-key 属性才能使用，该属性为展开行的 keys 数组 | Array | - | - |
| default-sort | 默认的排序列的 prop 和顺序。它的prop属性指定默认的排序的列，order指定默认排序的顺序 | Object | order: ascending, descending | 如果只指定了prop, 没有指定order, 则默认顺序是ascending |
| tooltip-effect | tooltip effect 属性 | String | dark/light | - |
| show-summary | 是否在表尾显示合计行 | Boolean | - | false |
| sum-text | 合计行第一列的文本 | String | - | 合计 |
| summary-method | 自定义的合计计算方法 | Function({ columns, data }) | - | - |
| span-method/object-span-method | 合并行或列的计算方法 | Function({ row, column, rowIndex, columnIndex }) | - | - |
| select-on-indeterminate | 在多选表格中，当仅有部分行被选中时，点击表头的多选框时的行为。若为 true，则选中所有行；若为 false，则取消选择所有行 | Boolean | - | true |
| indent | 展示树形数据时，树节点的缩进 | Number | - | 16 |
| lazy | 是否懒加载子节点数据 | Boolean | - | - |
| load | 加载子节点数据的函数，lazy 为 true 时生效，函数第二个参数包含了节点的层级信息 | Function(row, treeNode, resolve) | - | - |
| tree-props | 渲染嵌套数据的配置选项 | Object | - | { hasChildren: 'hasChildren', children: 'children' } |
| indexwidth | table的序号列的列宽 | string | - | 62 |
| indexFixed | table的序号列table-column的fixed属性配置 | boolean | - | false |
| columns | 选项模板 | array | - | [] |
| index | 序号列的内容 | funtion | - | {index} + 1 |
| selectable | 列的checkbox配置selectable属性，能否选择该行 | function | - | return true |
| show-checkbox | 是否显示行的复选框 | boolean | - | true |
| show-index | 是否显示序号列 | boolean | - | false |
| loading | 当round为true时，显示的按钮的loading属性  | boolean | - | false |
| click-row-check | 默认点击行不选中该行的复选框 | boolean | - | false |

### Table事件

| 参数      | 说明          | 参数      | 
|---------- |-------------- |---------- |
| select | 当用户手动勾选数据行的 Checkbox 时触发的事件 | selection, row |
| select-all | 当用户手动勾选全选 Checkbox 时触发的事件 | selection |
| selection-change | 当选择项发生变化时会触发该事件 | selection |
| cell-mouse-enter | 当单元格 hover 进入时会触发该事件 | row, column, cell, event |
| cell-mouse-leave | 当单元格 hover 退出时会触发该事件 | row, column, cell, event |
| cell-click | 当某个单元格被点击时会触发该事件 | row, column, cell, event |
| cell-dblclick | 当某个单元格被双击击时会触发该事件 | row, column, cell, event |
| row-click | 当某一行被点击时会触发该事件 | row, column, event |
| row-contextmenu | 当某一行被鼠标右键点击时会触发该事件 | row, column, event |
| row-dblclick | 当某一行被双击时会触发该事件 | row, column, event |
| header-click | 当某一列的表头被点击时会触发该事件 | column, event |
| header-contextmenu | 当某一列的表头被鼠标右键点击时触发该事件 | column, event |
| sort-change | 当表格的排序条件发生变化的时候会触发该事件 | { column, prop, order } |
| filter-change | 当表格的筛选条件发生变化的时候会触发该事件，参数的值是一个对象，对象的 key 是 column 的 columnKey，对应的 value 为用户选择的筛选条件的数组 | filters |
| current-change | 当表格的当前行发生变化的时候会触发该事件，如果要高亮当前行，请打开表格的 highlight-current-row 属性 | currentRow, oldCurrentRow |
| header-dragend | 当拖动表头改变了列的宽度的时候会触发该事件 | newWidth, oldWidth, column, event |
| expand-change | 当用户对某一行展开或者关闭的时候会触发该事件（展开行时，回调的第二个参数为 expandedRows；树形表格时第二参数为 expanded） | row, (expandedRows | expanded) |

### Table Methods （通过组件的getRef()获取其原生element组件的ref对象）

| 方法名      | 说明          | 参数      | 
|---------- |-------------- |---------- |
| clearSelection | 用于多选表格，清空用户的选择     | - |
| toggleRowSelection | 用于多选表格，切换某一行的选中状态，如果使用了第二个参数，则是设置这一行选中与否（selected 为 true 则选中） | row, selected |
| toggleAllSelection | 用于多选表格，切换所有行的选中状态 | - |
| toggleRowExpansion | 用于可展开表格与树形表格，切换某一行的展开状态，如果使用了第二个参数，则是设置这一行展开与否（expanded 为 true 则展开） | row, expanded |
| setCurrentRow | 用于单选表格，设定某一行为选中行，如果调用时不加参数，则会取消目前高亮行的选中状态。 | row |
| clearSort | 用于清空排序条件，数据会恢复成未排序的状态 | - |
| clearFilter | 不传入参数时用于清空所有过滤条件，数据会恢复成未过滤的状态，也可传入由columnKey组成的数组以清除指定列的过滤条件 | columnKey |
| doLayout | 对 Table 进行重新布局。当 Table 或其祖先元素由隐藏切换为显示时，可能需要调用此方法 | - |
| sort | 手动对 Table 进行排序。参数prop属性指定排序列，order指定排序顺序。 | prop: string, order: string |

### Table Slot

| name | 说明 |
|---------- |-------------- |
| - | 默认插槽，放置el-table-column等 |
| append | 插入至表格最后一行之后的内容，如果需要对表格的内容进行无限滚动操作，可能需要用到这个 slot。若表格有合计行，该 slot 会位于合计行之上。 |
| empty | 空文本的插槽 |
| tableLeftView | 表格整体布局下的左边模块视图，一般用于放置行的更多说明信息 |
| tableRightView | 表格整体布局下的右边模块视图，一般用于放置筛选树等 |
| tableHeaderLeftView | 表格整体布局下的头部的左边模块视图，一般用于放置按钮 |
| tableHeaderRightView | 表格整体布局下的头部的右边模块视图，一般用于放置搜索框 |
| tableFooterView | 表格整体布局下的尾部模块视图，一般用于放置分页组件 |

