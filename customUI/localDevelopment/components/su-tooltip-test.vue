<template>
  <div>
    <div style="display:flex;justify-content:space-around;align-items:center;height:300px">
      <div>
        <su-tooltip effect="dark" content="我是默認content的内容" placement="top-start">
          <el-button>深色上边</el-button>
        </su-tooltip>
      </div>
      <div>
        <su-tooltip effect="dark" placement="left-start">
          <template slot="content">我是插桥slot="content"的内容</template>
          <el-button>深色左边</el-button>
        </su-tooltip>
      </div>
      <div>
        <su-tooltip
          effect="dark"
          content="我是默認content的内容，我是通过类名限制宽度的换行"
          popper-class="demo"
          placement="right-start"
        >
          <el-button>深色右边</el-button>
        </su-tooltip>
      </div>
      <div>
        <su-tooltip effect="dark" placement="bottom-start">
          <template slot="content">我是插桥slot="content"的<br />内容自定义的换行</template>
          <el-button>深色下边</el-button>
        </su-tooltip>
      </div>
    </div>
    <div style="display:flex;justify-content:space-around;align-items:center;height:300px">
      <div>
        <su-tooltip effect="light" content="我是默認content的内容" placement="top-start">
          <el-button>浅色上边</el-button>
        </su-tooltip>
      </div>
      <div>
        <su-tooltip effect="light" placement="left-start">
          <template slot="content">我是插桥slot="content"的内容</template>
          <el-button>浅色左边</el-button>
        </su-tooltip>
      </div>
      <div>
        <su-tooltip
          effect="light"
          content="我是默認content的内容，我是通过类名限制宽度的换行"
          popper-class="demo"
          placement="right-start"
        >
          <el-button>浅色右边</el-button>
        </su-tooltip>
      </div>
      <div>
        <su-tooltip effect="light" placement="bottom-start">
          <template slot="content">我是插桥slot="content"的<br />内容自定义的换行</template>
          <el-button>浅色下边</el-button>
        </su-tooltip>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'su-tooltip-test',
  data() {
    return {}
  },
  methods: {},
}
</script>
<style>
.demo {
  width: 60px;
  font-size: 16px;
}
</style>
