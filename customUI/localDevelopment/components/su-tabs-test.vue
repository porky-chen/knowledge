<template>
  <div class="tabs-test">
    <h4>button</h4>
    <su-tabs
      :tabIndex="tabIndex"
      @clickTab="clickTab"
      tabType="button"
      :columns="columns"
    ></su-tabs>
    <!-- <h4>button-underline</h4>
    <su-tabs
      :tabIndex="tabIndex"
      @clickTab="clickTab"
      tabType="button-underline"
      :columns="columns"
    ></su-tabs> -->
    <h4>text-underline</h4>
    <su-tabs
      :tabIndex="tabIndex"
      @clickTab="clickTab"
      tabType="text-underline"
      :columns="columns"
    ></su-tabs>
    <!-- <h4>text</h4>
    <su-tabs :tabIndex="tabIndex" @clickTab="clickTab" tabType="text" :columns="columns"></su-tabs> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        {
          label: '理论值',
        },
        {
          label: '设计值',
        },
        {
          label: '预拱度',
        },
      ],
      tabIndex: 0,
    }
  },
  methods: {
    clickTab(e) {
      this.tabIndex = e
    },
  },
}
</script>

<style lang="scss" scoped>
.tabs-test {
  padding: 30px;
  > div {
    margin-right: 40px;
  }
}
</style>