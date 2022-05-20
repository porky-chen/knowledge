<template>
  <div class="content-layout">
    <div class="layout-main">
      <el-input v-model="account" placeholder="请输入账号" style="width:300px;margin-right:20px"></el-input>
      <el-input v-model="password" placeholder="请输入密码" style="width:300px;margin-right:20px"></el-input>
      <el-button type="primary" @click="submit">登陆/注册</el-button>
    </div>
    <div style="margin-left:50px">服务器返回数据=======>{{msg}}</div>
    <div style="border:1px solid #ccc;margin:20px 0"></div>
    <div class="layout-main">
      <el-upload
        class="upload-demo"
        :action="uploadUrl"
        :on-success="handleSuccess"
        :on-remove="handleRemove"
        :file-list="fileList"
        :show-file-list="false"
        :data="{index:'all',dir:'newTrh'}"
        accept=".png,.jpg,.jpeg">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </div>
    <div style="border:1px solid #ccc;margin:20px 0"></div>
    <div class="layout-main">
        <el-button size="small" type="primary" @click="getFile()">查询图片</el-button>
        <div v-for="(item,index) in files" :key="index">
          <el-image
          style="width: 100px; height: 100px"
          :src="item.fileUrl" :preview-src-list="[item.fileUrl]"
          fit="fit"></el-image>
        </div>
    </div>
    <div>
      <span>z-ui引入的组件</span>
      <ZButton />
    </div>
    <div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'express-app',
  data() {
    return {
      viewData:'',
      msg: null,
      uploadUrl: this.$api.upload,
      account: '',
      password: '',
      fileurl: 'uploads/2.jpg',
      fileList:[],
      files:[]
    };
  },
  computed:{
  },
  methods: {
    submit(){
      if(!this.account && !this.password) {
        this.$message.warning('请填写账号/密码!')
        return
      }
      this.Register()
    },
    Register(){
      let data = {
        account: this.account,
        password: this.password
      }
      // console.log(data)
        this.$ajax({
            url: this.$api.login,
            type: 'post',
            data,
            contentType: 'application/json'
        }).then(res => {
              this.msg = res.data || res.message
              this.$message.success(res.message);
              this.account = ''
              this.password = ''
        }).catch(err => {
            console.log(err)
        })
    },
    getFile(){
      this.$ajax({
            url: this.$api.getFiles,
            type: 'get',
        }).then(res => {
              this.files = res.data
        }).catch(err => {
            console.log(err)
        })
    },
    handleRemove(file, fileList) {
      console.log('handleRemove',file);
    },
    handleSuccess(res,file) {
      console.log('handleSuccess',file);
      this.fileurl = 'http://localhost:5000/public' + res.data
    },
    getAccountName(){
      this.$ajax({
        url: this.$api.all,
        type: 'get',
      }).then(res => {
        console.log(res)
      })
    },
    getViewFile(){
      this.$ajax({
        url: this.$api.viewFile+'2021112417128_2.jpg',
        type: 'get',
      }).then(res => {
      })
    }
  },
  created() {
    // this.getAccountName()
  }
};
</script>

<style lang="sass" scoped>
.content-layout
  padding: 50px
  .layout-main
    display: flex
    justify-content: center
    align-items: center
</style>
