<template>
  <div id='app'>
    <su-alert-test style='margin-top: 32px'></su-alert-test>
    <su-tabs-test style='margin-top: 32px'></su-tabs-test>
    <su-dialog-test style='margin-top: 32px'></su-dialog-test>
    <su-avatar-test style='margin-top: 32px'></su-avatar-test>
    <su-button-test style='margin-top: 32px' />
    <su-search
      @click='printData'
      @updateKeyword='printData'
      label-key='value'
      :suggestion-data-list='suggestionDataList_test'
      @select='select'
    />
    <su-input-test style='margin-top: 32px' />
    <su-select-test style='margin-top: 32px' />
    <su-switch-checkbox-test />
    <su-cascader-test style='margin-top: 32px' />
    <su-upload-test style='margin-top: 32px' />
    <!--    <su-layout-test></su-layout-test>-->
  </div>
</template>

<script>
import SuSelectTest from './components/su-select-test'
import SuCascaderTest from './components/su-cascader-test'
import SuInputTest from './components/su-input-test'
import SuButtonTest from './components/su-button-test'
import SuAvatarTest from './components/su-avatar-test.vue'
import SuDialogTest from './components/su-dialog-test.vue'
import SuTabsTest from './components/su-tabs-test.vue'
import SuAlertTest from './components/su-alert-test.vue'
import SuUploadTest from './components/su-upload-test'
import SuSwitchCheckboxTest from './components/su-switch-checkbox-test'
// import SuLayoutTest from './components/su-layout-test'

export default {
  name: 'App',
  components: {
    SuSwitchCheckboxTest,
    // SuLayoutTest,
    SuInputTest,
    SuCascaderTest,
    SuSelectTest,
    SuButtonTest,
    SuAvatarTest,
    SuDialogTest,
    SuTabsTest,
    SuAlertTest,
    SuUploadTest,
  },
  data() {
    return {
      suggestionDataList_test: [
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
    }
  },
  methods: {
    printData(data) {
      console.log(data, 'data - data')
    },
    querySearch(queryString, cb) {
      return cb(this.suggestionDataList_test)
    },
    select(data) {
      console.log(data, 'select')
    },
  },
}
</script>

<style>
#app {
  /*font-family: Avenir, Helvetica, Arial, sans-serif;*/
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  /* color: #2c3e50; */
  /* margin-top: 60px; */
  /* padding: 32px; */
  height: 100%
}

body {
  overflow: auto !important;
}

/*::-webkit-scrollbar {*/
/*  width: 5*/
/*  px*/
/*;*/
/*  height: 10*/
/*  px*/
/*;*/
/*}*/
/*<style>*/
/* ::-webkit-scrollbar-thumb {*/
/*   background-color: #bbb;*/
/*   background-clip: padding-box;*/
/*   min-height: 28*/
/*   px*/
/* ;*/
/* }*/
/*<style>*/
/* ::-webkit-scrollbar-track-piece {*/
/*   background-color: #f8f8f8;*/
/* }*/
</style>
