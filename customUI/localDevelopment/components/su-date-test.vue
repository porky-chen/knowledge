<template>
  <div>
    <span>dateValue：{{ dateValue }}</span>
    <span style='padding-left:20px;'>monthValue：{{ monthValue }}</span><br />
    <span>daterangeValue：{{ daterangeValue }}</span>
    <span style='padding-left:20px;'>monthrangeValue：{{ monthrangeValue }}</span><br />
    <span>datetimeValue：{{ datetimeValue }}</span>
    <span style='padding-left:20px;'>datetimerangeValue：{{ datetimerangeValue }}</span>
    <div style='display:flex;justify-content:center;'>
      <div style='margin:40px;'>
        <span>选则日期</span>
        <su-date-picker v-model='dateValue' type='date'
                 disabled=''
                 value-format='yyyy-MM-dd'
                 placeholder='选择日期' />
      </div>
      <div style='margin:40px;'>
        <span>带快捷选项</span>
        <su-date-picker
          v-model='dateValue'
          :picker-options='pickerOptions'
          align='left'
          type='date'
          value-format='yyyy-MM-dd'
          placeholder='选择日期'
        />
      </div>
      <div style='margin:40px;'>
        <span>选则年</span>
        <su-date-picker v-model='monthValue' type='year' format='yyyy' value-format='yyyy' placeholder='选择年' @change='weekChange' />
      </div>
    </div>
    <div style=''>
      <div style='margin:40px;'>
        <span>选则日期范围</span>
        <su-date-picker v-model='daterangeValue' type='daterange' value-format='yyyy-MM-dd' range-separator='至' start-placeholder='开始日期' end-placeholder='结束日期' />
      </div>
      <div style='margin:40px;'>
        <span>选则月范围</span>
        <su-date-picker v-model='monthrangeValue' type='monthrange' format='yyyy-MM' valueFormat='yyyy-MM' range-separator='至' start-placeholder='开始日期' end-placeholder='结束日期' />
      </div>
    </div>
    <div>
      <div style='margin:40px;'>
        <span>选则日期时间</span>
        <su-date-picker v-model='datetimeValue' type='datetime' value-format='yyyy-MM-dd HH:mm:ss' placeholder='选中日期时间' />
      </div>
      <div style='margin:40px;'>
        <span>日期时间（只读）</span>
        <su-date-picker v-model='datetimeValue' readonly type='datetime' value-format='yyyy-MM-dd HH:mm:ss' placeholder='选中日期时间' />
      </div>
      <div style='margin:40px;'>
        <span>选则日期时间范围</span>
        <su-date-picker v-model='datetimerangeValue' type='datetimerange' :picker-options='dateTimepickerOptions' format='yyyy-MM-dd HH:mm:ss' valueFormat='yyyy-MM-dd HH:mm:ss' range-separator='至' start-placeholder='开始日期时间' end-placeholder='结束日期时间' />
      </div>
      <div style='margin:40px;'>
        <span>日期时间范围（禁用）</span>
        <su-date-picker v-model='datetimerangeValue' disabled type='datetimerange' format='yyyy-MM-dd HH:mm:ss' valueFormat='yyyy-MM-dd HH:mm:ss' range-separator='至' start-placeholder='开始日期时间' end-placeholder='结束日期时间' />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'su-date-test',
  data() {
    return {
      dateValue: null,
      monthValue: null,
      daterangeValue: null,
      monthrangeValue: null,
      datetimeValue: null,
      datetimerangeValue: null,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            },
          },
          {
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            },
          },
          {
            text: '一周前',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            },
          },
        ],
      },
      dateTimepickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          },
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          },
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          },
        }],
      },
    }
  },
  methods: {
    weekChange(e) {
      console.log(e)
    },
  },
}
</script>
