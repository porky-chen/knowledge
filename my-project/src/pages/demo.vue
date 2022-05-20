<template>
  <div class="app-container">
     <!-- <div>
         <button @click="buttonModelChange">切换</button>
     </div> -->
    <div id="container"></div>
  </div>
</template>

<script>
import * as Three from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer'
export default {
  name: 'ThreeJS',
  data () {
    return {
      camera: null,
      scene: null,
      renderer: null,
      mesh: null,
      mush: null,
      loader: null,
      mixer: null,
      clock: new Three.Clock(),
      controls: null,
      cube: null,
      sphere: null,
      moon: null,
      step: 0,
      stats: null,
      group: null,
      glbModel: 'Horse.glb',
      oldTime: 0,
      labelRanderer: null
    }
  },
  computed: {
  },
  watch: {
    'window.innerHeight': {
      handler (val) {
        console.log(val)
        this.onresize()
      }
    }
  },
  methods: {
    buttonModelChange () {
      if (this.glbModel === 'Cesium_Air.glb') {
        this.glbModel = 'train.blg'
        this.init()
        this.animate()
      } else {
        this.glbModel = 'Cesium_Air.glb'
        this.init()
        this.animate()
      }
    },
    init () {
      let container = document.getElementById('container')
      // 设置照相机
      this.camera = new Three.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000)
      this.camera.position.set(30, 30, 70)

      this.scene = new Three.Scene()
      this.scene.background = new Three.Color(0xf5f5f5)
      let self = this

      // ---------------------------------------------------
      // 创建地面几何体
      var planeGeometry = new Three.PlaneGeometry(100, 60)
      // 地面物体上色
      // var planeMaterial = new Three.MeshBasicMaterial({ color: 0xcccccc })
      // 创建地面
      // var plane = new Three.Mesh(planeGeometry, planeMaterial)
      // 创建纹理
      var planeLoader = new Three.TextureLoader()
      var planetexture = planeLoader.load('/static/model/rock-texture.jpg')
      var planetextMaterial = new Three.MeshLambertMaterial({ map: planetexture })
      var plane = new Three.Mesh(planeGeometry, planetextMaterial)
      // 移动物体位置
      plane.rotation.x = -0.5 * Math.PI
      plane.position.x = 0
      plane.position.y = -5
      plane.position.z = 0
      plane.castShadow = true
      // 接收阴影
      plane.receiveShadow = true

      // 添加到场景
      this.scene.add(plane)

      // ---------------------------------------------------
      // 加载模型
      var loader = new GLTFLoader().setPath('/static/model/')
      loader.load(this.glbModel, function (glb) {
        var mesh = glb.scene
        mesh.traverse((obj) => {
          if (obj.isMesh) {
            obj.castShadow = true
          }
        })
        mesh.scale.set(0.1, 0.1, 0.1)
        mesh.position.x = 20
        mesh.position.y = 0
        mesh.position.z = -10

        self.scene.add(mesh) // 模型引入three
        console.log(glb, 'glb')

        // 调用动画
        self.mixer = new Three.AnimationMixer(mesh)
        var action = self.mixer.clipAction(glb.animations[0])
        action
          .stop()
          .setDuration(4)
          .play()
      })
      this.scene.add(loader)

      // ---------------------------------------------------
      // 添加球体
      var sphereGeometry = new Three.SphereGeometry(5, 64, 64)
      // var sphereMaterial = new Three.MeshLambertMaterial({ color: 0xff0000 })
      var sphereLoader = new Three.TextureLoader()
      var texture = sphereLoader.load('/static/model/world.jpg')
      // bumpMap凹凸纹理  normalMap法线纹理贴图
      var bumptexture = sphereLoader.load('/static/model/rock-texture.jpg')
      var textMaterial = new Three.MeshLambertMaterial({ map: texture, normalMap: bumptexture })
      this.sphere = new Three.Mesh(sphereGeometry, textMaterial)
      // this.sphere.position.x = 0
      // this.sphere.position.y = -2
      // this.sphere.position.z = 0

      this.sphere.castShadow = true
      this.scene.add(this.sphere)

      this.clock = new Three.Clock()
      const moonGeometry = new Three.SphereGeometry(1.5, 64, 64)
      const moonMaterial = new Three.MeshPhongMaterial({ map: bumptexture })
      this.moon = new Three.Mesh(moonGeometry, moonMaterial)
      // this.moon.position.x = -10
      // this.moon.position.y = 5
      // this.moon.position.z = 20
      this.moon.castShadow = true
      this.moon.receiveShadow = true
      this.scene.add(this.moon)
      // ---------------------------------------------------
      // 添加立方体
      var cubeGeometry = new Three.BoxGeometry(4, 4, 4)
      var cubeMaterial = new Three.MeshLambertMaterial({ color: 0xff0000 })
      this.cube = new Three.Mesh(cubeGeometry, cubeMaterial)
      this.cube.position.x = 20
      this.cube.position.y = 4
      this.cube.position.z = 20

      // 对象是否渲染到阴影贴纸图中
      this.cube.castShadow = true

      this.scene.add(this.cube)

      // ---------------------------------------------------
      // 加载mtl材质文件
      var mtlLoader = new MTLLoader()
      // 加载obj几何体文件加载器
      var objLoader = new OBJLoader()

      mtlLoader.load('/static/model/pearl.mtl', (material) => {
        objLoader.setMaterials(material)
          .load('/static/model/pearl.obj', (obj) => {
            self.scene.add(obj)
            obj.scale.set(10, 10, 10)
            obj.position.x = 20
            obj.position.z = -20
          })
      })

      //   添加光源
      //   var point = new Three.PointLight(0xffffff)
      //   point.position.set(400, 200, 300)
      //   this.scene.add(point)
      // 创建聚光灯
      var spotLight = new Three.SpotLight(0xffffff)
      spotLight.position.set(50, 200, -100)
      spotLight.castShadow = true
      spotLight.angle = Math.PI / 10
      spotLight.shadow.penumber = 0.05
      spotLight.shadow.mapSize.width = 1024
      spotLight.shadow.mapSize.innerHeight = 1024
      // 添加聚光灯
      this.scene.add(spotLight)

      // 环境光
      var ambient = new Three.AmbientLight(0xe0e0e0)
      this.scene.add(ambient)
      // let axes = new Three.AxisHelper(50)
      // this.scene.add(axes)
      let dirlight = new Three.DirectionalLight(0xdfebff, 1)
      dirlight.position.set(20, 20, 20)
      this.scene.add(dirlight)

      // 摄像机定位
      this.camera.position.x = 10
      this.camera.position.y = 30
      this.camera.position.z = 70
      this.camera.lookAt(this.scene.position)

      this.renderer = new Three.WebGLRenderer({ antialias: true, alpha: true })
      this.renderer.setSize(container.clientWidth, container.clientHeight)
      this.renderer.setPixelRatio(window.devicePixelRatio)
      this.renderer.shadowMapEnabled = true
      container.appendChild(this.renderer.domElement)
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)

      // 标签渲染器
      // this.labelRanderer = new CSS2DRenderer()
      // this.labelRanderer.setSize(window.innerWidth, window.innerHeight)
      // this.labelRanderer.domElement.style.position = 'absolute'
      // this.labelRanderer.domElement.style.top = '0px'
      // container.appendChild(this.labelRanderer.domElement)
    },
    animate () {
      this.step += 0.2
      this.cube.position.x = 20 + (20 * (Math.cos(this.step)))
      this.cube.position.y = 2 + (20 * Math.abs(Math.sin(this.step)))
      // this.sphere.rotateY(0.1)
      const elapsed = this.clock.getElapsedTime()
      // 月球周转
      this.moon.position.set(Math.sin(elapsed) * 10, 0, Math.cos(elapsed) * 10)
      // 地球自转
      let axis = new Three.Vector3(0, 1, 0)
      this.sphere.rotateOnAxis(axis, (elapsed - this.oldTime) * Math.PI / 10)
      this.oldTime = elapsed
      this.renderer.render(this.scene, this.camera)
      requestAnimationFrame(this.animate)
      // if (this.mixer) {
      //   this.mixer.update(time)
      // }

      const earthDiv = document.createElement('div')
      earthDiv.className = 'earthLabel'
      earthDiv.textContent = 'Earth'
      const earthLabel = new CSS2DObject(earthDiv)
      this.sphere.add(earthLabel)
    },
    // 监听窗口变化
    onresize () {
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(window.innerWidth, window.innerHeight)
    }
  },
  mounted () {
    this.init()
    this.animate()
  }
}
</script>
<style scoped>
.app-container{
    height: 100%;
    margin: 0;
    padding: 0;
}
#container {
  height: 900px;
}
canvas{
  background-image: url('/static/model/tree.png');
  background-size: cover;
}
.earthLabel{
  color: red;
  font-size: 16px;
}
</style>
