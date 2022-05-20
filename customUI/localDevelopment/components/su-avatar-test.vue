<template>
  <div class="avatar-test">
    <h4>基本用法</h4>
    <h6>circle</h6>
    <div style="display: flex; justify-content: flex-start">
      <template v-for="size in sizeList">
        <su-avatar :size="size" :src="circleUrl" :key="size"></su-avatar>
      </template>
    </div>
    <h6>square</h6>
    <div style="display: flex; justify-content: flex-start">
      <template v-for="size in sizeList">
        <su-avatar :size="size" :src="squareUrl" shape="square" :key="size"></su-avatar>
      </template>
    </div>
    <h4>展示类型</h4>
    <div>
      <h6>icon</h6>
      <su-avatar icon="el-icon-user-solid"></su-avatar>
      <h6>img</h6>
      <su-avatar>
        <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
      /></su-avatar>
      <h6>字符</h6>
      <su-avatar> user </su-avatar>
    </div>
    <h4>根据颜色获取设置默认头像</h4>
    <div style="display: flex">
      <div>
        <h6>blue</h6>
        <su-avatar color="blue" :size="70"></su-avatar>
      </div>
      <div>
        <h6>yellow</h6>
        <su-avatar color="yellow" :size="60"></su-avatar>
      </div>
      <div>
        <h6>gray</h6>
        <su-avatar color="gray" :size="50"></su-avatar>
      </div>
      <div>
        <h6>red</h6>
        <su-avatar color="red" :size="40"></su-avatar>
      </div>
      <div>
        <h6>green</h6>
        <su-avatar color="green" :size="30"></su-avatar>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      squareUrl: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
      sizeList: [100, 76, 'large', 'medium', 'small'],
    }
  },
}
</script>

<style lang="scss" scoped>
.avatar-test {
  // display: flex;
  // justify-content: center;
  padding: 30px;
  > div {
    margin-right: 10px;
  }
  ::v-deep .el-avatar {
    margin-right: 20px;
  }
}
</style>