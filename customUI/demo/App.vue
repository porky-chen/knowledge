<template>
  <div id='app' :class="{ 'is-component': isComponent }">
    <main-header></main-header>
    <div class='main-cnt'>
      <router-view></router-view>
    </div>
    <main-footer v-if='!isComponent && !isGenerator'></main-footer>
  </div>
</template>
<script>
export default {
  name: 'app',
  computed: {
    isComponent() {
      return /component/.test(this.$route.path || '')
    },
    isGenerator() {
      return /generator/.test(this.$route.path || '')
    },
  },
  created() {
  },
}
</script>
<style lang='scss' scoped>
</style>
