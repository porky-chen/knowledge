<template>
  <div class="app">
    <b-card title="Card Title" body-class="text-center" header-tag="nav" style="height: 100%">
      <template v-slot:header style="height: 50px">
        <b-nav card-header tabs>
          <b-nav-item to="/" @click="menuToggle('Home')" :active="active == 'Menu'">Home</b-nav-item>
          <b-nav-item to="Demo" @click="menuToggle('Demo')" :active="active == 'Demo'">Demo</b-nav-item>
          <b-nav-item to="expressApp" @click="menuToggle('expressApp')" :active="active == 'expressApp'">expressApp</b-nav-item>
          <b-nav-item to="table" @click="menuToggle('table')" :active="active == 'table'">table</b-nav-item>
          <b-nav-item to="antvG2" @click="menuToggle('antvG2')" :active="active == 'antvG2'">antvG2</b-nav-item>
        </b-nav>
      </template>

      <router-view/>

      <template v-slot:footer style="height: 50px">
        <em>Footer Slot</em>
      </template>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      menuText:'Menu',
      active:'Menu',
    }
  },
  methods:{
    menuToggle(e){
      let menuName = () => {
        return e === 'Home'? 'Menu' : e
      }
      this.menuText = menuName()
      this.active = menuName()
    },
  },
  mounted() {
  }
}
</script>

<style>
html,body{
  height: 100%;
}
html{
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
*{
  -webkit-box-sizing: inherit;
  -moz-box-sizing: inherit;
  box-sizing: inherit;
}
.app {
  height: 100%;
  width: 100%;
  overflow: auto;
  padding: 0;
  margin: 0 !important;
}
.card-body{
  height: 100%;
  overflow: auto
}
</style>
