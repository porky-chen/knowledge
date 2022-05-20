<template>
  <div class="theme-container">
    <div class="theme-left">
      <p class="theme-item-header">样式表</p>
      <div v-for="(item,index) in themeList[tabIndex].configsList" :key="index" class="theme-item-box">
        <p v-if='themeList[tabIndex].field!=="button"' class="theme-item-title">{{item.header}}</p>
        <el-row class="theme-color-box" type="flex" align="center">
          <div :class="themeList[tabIndex].class" v-for="(tar,i) in item.groups" :key="i">
            <el-col class="colorPicker" v-if="themeList[tabIndex].field==='color'" :style="{'background':themeList[tabIndex].configsDatas[tar.field]}">
              <div class="theme-color-title">{{tar.title}}</div>
              <p class="theme-color-value">{{themeList[tabIndex].configsDatas[tar.field]}}</p>
              <p class="theme-item-tips">{{tar.info}}</p>
            </el-col>
            <el-col class="font" v-else-if="themeList[tabIndex].field==='font'">
              <p v-if="item.cssType==='font-size'" :style="{'font-size':themeList[tabIndex].configsDatas[tar.field]}" class="theme-item-tips">{{tar.content}}</p>
              <p v-else-if="item.cssType==='font-weight'" :style="{'font-weight':themeList[tabIndex].configsDatas[tar.field]}" class="theme-item-tips">{{tar.content}}</p>
              <p v-else-if="item.cssType==='line-height'" :style="{'line-height':themeList[tabIndex].configsDatas[tar.field]}" class="theme-item-tips">{{tar.content}}</p>
              <p class="theme-color-value">值：{{themeList[tabIndex].configsDatas[tar.field]}}</p>
            </el-col>
            <!-- <el-col class="button" v-else-if='themeList[tabIndex].field==="button"'>
              <el-button :type="themeList[tabIndex].buttonType" v-if="item.cssType==='color'">
                <div>{{tar.content}}</div>
              </el-button>
              <p class="theme-color-value">值：{{themeList[tabIndex].configsDatas[tar.field]}}</p>
            </el-col> -->
          </div>
        </el-row>
      </div>
      <div v-if='themeList[tabIndex].field==="button"'>
        <el-row>
          <el-button>Default</el-button>
          <el-button type="primary">Primary</el-button>
          <el-button type="success">Success</el-button>
          <el-button type="info">Info</el-button>
          <el-button type="warning">Warning</el-button>
          <el-button type="danger">Danger</el-button>
        </el-row>

        <el-row>
          <el-button plain>Plain</el-button>
          <el-button type="primary" plain>Primary</el-button>
          <el-button type="success" plain>Success</el-button>
          <el-button type="info" plain>Info</el-button>
          <el-button type="warning" plain>Warning</el-button>
          <el-button type="danger" plain>Danger</el-button>
        </el-row>

        <el-row>
          <el-button round>Round</el-button>
          <el-button type="primary" round>Primary</el-button>
          <el-button type="success" round>Success</el-button>
          <el-button type="info" round>Info</el-button>
          <el-button type="warning" round>Warning</el-button>
          <el-button type="danger" round>Danger</el-button>
        </el-row>

      </div>
    </div>
    <div class="theme-right">
      <el-row type="flex" justify="end" class="theme-right-btns">
        <el-button type="primary">
          <el-link :href="fileURL" :underline="false" download="var.scss">下载
          </el-link>
        </el-button>
        <el-button type="primary" @click="upload">
          上传
        </el-button>
      </el-row>
      <div class="theme-right-select">
        <el-select @change="changeThemePick" v-model="tabValue" placeholder="请选择">
          <el-option v-for="item in themeList" :key="item.type" :label="item.type" :value="item.type">
          </el-option>
        </el-select>
      </div>
      <div class="theme-right-color">
        <div v-for="(item,index) in themeList[tabIndex].configsList" :key="index" class="right-color-item">
          <p class="color-item-header">{{item.header}}</p>
          <div v-for="(tar,i) in item.groups" :key="i" class="color-item-ele">
            <p class="item-ele-title">{{tar.title}}</p>
            <el-row type="flex" align="middle" justify="space-between">
              <el-input class="item-ele-text" @change="changeThemePicker($event,tar.field)" :disabled="tar.disable" v-model="themeList[tabIndex].configsDatas[tar.field]"></el-input>
              <el-color-picker v-if="tar.type==='colorPicker'" class="theme-picker" popper-class="theme-picker-dropdown" @change="changeThemePicker($event,tar.field)" v-model="themeList[tabIndex].configsDatas[tar.field]"></el-color-picker>
            </el-row>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import styles from '../../../src/css/vars.scss'
import { mapState, mapMutations } from 'vuex'
import { getIndex } from '../../util'
export default {
  data () {
    return {
      theme: '',
      tabValue: 0,
      tabIndex: 0,
      scssTemplate: ''
    }
  },
  computed: {
    ...mapState(['themeList']),
    fileURL () {
      this.getScssTem()
      const blob = new Blob([this.scssTemplate]);
      return URL.createObjectURL(blob);
    }
  },
  methods: {
    ...mapMutations(['updateThemeConfig']),
    upload(){
      this.getScssTem()
      const data = {
        fileStr:this.scssTemplate
      }
      const url = 'http://localhost:3000/formwork'
      fetch(url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        mode:'cors',
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response =>{
          location.reload()
          console.log('Success:', response)
        })

    },
    changeThemePick (e) {
      this.tabIndex = getIndex(e, this.themeList)
    },
    changeThemePicker (e, a) {
      this.updateThemeConfig({ themeType: this.tabValue, id: a, data: e })
    },
    // 获取scss字符串模板
    getScssTem () {
      this.scssTemplate = ''
      this.themeList.forEach(item => {
        this.scssTemplate += `// ${item.type} ${item.info}\n\n`
        item.configsList.forEach(tar => {
          tar.groups.forEach(ele => {
            if (item.configsDatas[ele.field]) {
              this.scssTemplate += `// ${ele.info}\n$${ele.field}:${item.configsDatas[ele.field]};\n`
            }
          })
        })
        this.scssTemplate += '\n\n\n'
      });
    }
  },
  mounted () {
    //设置默认值
    this.tabValue = this.themeList[this.tabIndex].type
  }
}
</script>
<style lang="scss" scoped>
@import "../../css/theme.scss";
</style>
