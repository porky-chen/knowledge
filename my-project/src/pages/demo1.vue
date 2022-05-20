<template>
    <div>
        <div id="threeModel"></div>
    </div>
</template>

<script>
import * as Three from 'three'
export default {
  name: 'Demo1',
  data () {
    return {
      camera: null,
      scene: null,
      renderer: null,
      mesh: null
    }
  },
  created () {
  },
  mounted () {
    this.init()
    this.animation()
  },
  methods: {
    init () {
      let ThreeModel = document.getElementById('threeModel')

      // 创建场景
      this.scene = new Three.Scene()
      // 设置摄像机
      this.camera = new Three.PerspectiveCamera(45, ThreeModel.innerWidth / ThreeModel.innerHeight, 0.1, 2000)
      // 创建渲染器
      this.renderer = new Three.WebGLRenderer()
      // 设置渲染器的初始颜色
      this.renderer.setClearColor(new Three.Color(0xEEEEEE))
      // 设置输出canvas画面的大小
      this.renderer.setSize(ThreeModel.innerWidth, ThreeModel.innerHeight)
      // 显示三维坐标
      let axes = new Three.AxisHelper(100)

      this.scene.add(axes)
      // 创建地面几何体
      var planeGeometry = new Three.PlaneGeometry(60, 20)
      // 地面物体上色
      var planeMaterial = new Three.MeshBasicMaterial({ color: 0xcccccc })
      // 创建地面
      var plane = new Three.Mesh(planeGeometry, planeMaterial)
      // 移动物体位置
      plane.rotation.x = -0.5 * Math.PI
      plane.position.x = 15
      plane.position.y = 0
      plane.position.z = 0

      // 添加到场景
      this.scene.add(plane)

      // 摄像机定位
      this.camera.position.x = -30
      this.camera.position.y = 40
      this.camera.position.z = 30
      this.camera.lookAt(this.scene.position)

      // 渲染器输出添加到html
      ThreeModel.appendChild(this.renderer.domElement)

      console.log(1)
    },
    animation () {
      // requestAnimationFrame(this.animate)
      this.renderer.render(this.scene, this.camera)
    }
  }
}
</script>

<style scoped>
#threeModel{
    height: 800px;
}
canvas { width: 100%; height: 100% }
</style>
