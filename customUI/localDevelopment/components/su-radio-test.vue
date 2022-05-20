<template>
  <div>
    <div>checkValue：{{ checkValue }} checkValue2： {{ checkValue2 }}</div>
    <div>
      <su-radio v-model="checkValue" :data="radioData" style="margin:40px" />
    </div>
    <div>
      <su-radio
        v-model="checkValue2"
        :isNormalCheck="false"
        :data="disabledData"
        style="margin:40px"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: 'su-radio-test',
  data() {
    return {
      checkValue: '',
      checkValue2: '',
      radioData: [
        {label: '默认选中', value: '1'},
        {label: '默认2', value: '2'},
        {label: '默认3', value: '3'},
      ],
      disabledData: [
        {label: '默认1', value: '1'},
        {label: '自定义选中且禁止状态', value: '2', checked: true, disabled: true},
        {label: '禁止选中状态', value: '3', disabled: true},
      ],
    }
  },
}
</script>
