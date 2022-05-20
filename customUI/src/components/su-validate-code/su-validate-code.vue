<!--
  - Copyright © 2020 Guangdong Sun Railway Information Technology, Inc.
  - All rights reserved.
  -
  - @author: wu jiajin <wujiajin@sunengineering.cn>
  - @description 验证码
  -
  - Changelog:
  - Revision 1.0 2020-06-01 wu jiajin
  - - 初始化
  -->
<template>
<div>
    <su-validate-puzzle v-if="codetype === 1"
      :verificationShow="isVerificationShow1"
      @success="handleSuccess"
      @error="handleError"
      @handleClose="handleClose"
      :puzzleImgList='puzzleImgList'
    ></su-validate-puzzle>
    <su-validate-image v-else :identifyCode="identifyCode"></su-validate-image>
</div>
</template>
<script>
import SuValidatePuzzle from './su-validate-puzzle.vue'
import SuValidateImage from './su-validate-image.vue'
export default {
  components:{
    SuValidatePuzzle,
    SuValidateImage
  },
  name: 'valudatecode-page',
  props:{
    codetype:{
      type:Number,
      default:1
    },
    identifyCode:{
      type:String,
      default: '123456'
    },
    puzzleImgList: {
      type: Array,
      default: () => [
      ]
    },
  },
  data () {
    return{
      isVerificationShow1:true
    }
  },
  methods: {
    handleError:function(){
      this.$emit('onError')
    },
    
    handleSuccess:function(){
      this.$emit('onSuccess')
    },
    handleClose:function () {
      this.$emit('handleClose')
      
    }
  }
}
</script>
