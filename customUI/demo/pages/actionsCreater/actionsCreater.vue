<template>
  <div class="theme-container">
    <div class="theme-left">
      <p class="theme-item-header">预览</p>
      <component :is="dynComponent" v-bind="$props"></component>
      
    </div>
    <div class="theme-right">
      <el-row type="flex" justify="end" class="theme-right-btns">
        <el-button type="primary" @click="upload">
          上传
        </el-button>
      </el-row>
      <el-row class="buttons_item" v-for="(item,index) in actionItems" :key="index"> 
        <el-row>
          <el-col :offset="1" :span="9">按钮类型：</el-col>
          <el-col  :span="12">
            <su-select @change="(e) => {handleButtonType(index,e)}" :options="items">
            </su-select>
          </el-col>
        </el-row>
        <el-row v-if="item.buttonType === ''">
          <el-col :offset="1" :span="9" >自定义文本：</el-col>
          <el-col  :span="12">
            <su-input @change="(e) => {onChangeText(index,e)}"></su-input>
          </el-col>
        </el-row>
      </el-row>
      <el-row>
        <su-button @click="addtoButtons" type="text">添加按钮</su-button>
      </el-row>
      
    </div>
  </div>
</template>
<script>

import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapMutations } = createNamespacedHelpers('projectCreater')

export default {
  
  data () {
    return {
      buttons: [],
      items: [
        {
          value: '',
          label: '自定义'
        },
        {
          value: 'add',
          label: '新增',
        },{
          value: 'del',
          label: '删除',
        },{
          value: 'batchadd',
          label: '批量新增',
        },{
          value: 'release',
          label: '发布',
        },{
          value: 'link',
          label: '关联结构',
        },{
          value: 'click',
          label: '点击',
        },{
          value: 'edit',
          label: '编辑',
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['templateStr','actionItems']),
    dynComponent() {
      const template = this.templateStr
      console.log('template'+template)
      return { 
        template, // use content as template for this component
      }
    }
  },
  methods: {
    ...mapMutations(['setActionItems']),
    upload(){
   
    },
    onChangeText(index,e){
      const newButtons = [...this.actionItems]
      newButtons[index].text = e
      this.setActionItems(newButtons)
    },
    addtoButtons(){
      const newButtons = [...this.actionItems]
      newButtons.push({})
      this.updateActionItems(newButtons)
    },
    updateActionItems(newButtons){
      this.setActionItems(newButtons)
    },
    handleButtonType(index,e){
      const newButtons = [...this.actionItems]
      newButtons[index] = {
        buttonType: e
      }
      this.updateActionItems(newButtons)
    }
    
  },
  mounted () {
    //设置默认值
  }
}
</script>
<style lang="scss" scoped>
@import "../../css/theme.scss";
.buttons_item {
  margin-bottom: 5px;
}
</style>