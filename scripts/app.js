import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { Pane } from 'tweakpane'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

const devMode = false

// // сцена
const scene = new THREE.Scene()

// // геометрия и грани по x/y/z
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1, 25, 25, 25)

// // материалы
const cubeMaterial = new THREE.MeshBasicMaterial({ color: '#519aba' })

const cubeMaterial2 = new THREE.MeshBasicMaterial({
  color: '#234223',
  wireframe: true,
})

// MeshBasicMaterial - не реагирует на освещение, MeshLambertMaterial - зависит от освещения
// const material = new THREE.MeshLambertMaterial({
//   color: 'limeGreen',
//   transparent: true,
//   opacity: 0.5,
// })

// MeshPhongMaterial - материал с поверхностями, где нужны блики; подходит для пластика/металла и т.д.
const material = new THREE.MeshPhongMaterial({
  color: 'limeGreen',
  // transparent: true,
  // opacity: 0.75,
})
// shininess - блеск материала
material.shininess = 2000

// MeshStandardMaterial - физически корректный материал
const standardMaterial = new THREE.MeshStandardMaterial()
standardMaterial.color = new THREE.Color('limeGreen')
standardMaterial.roughness = 0
standardMaterial.metalness = 0.65

// // Работа с текстурами
// создание материала и работа с картами текстур материала
// TextureLoader - ассинхронный загрузчик изображения, преобразует их в текстуры для материалов
const textureLoader = new THREE.TextureLoader()

// текстура травы
const textureGrass = textureLoader.load(
  '../textures/grass/wispy-grass-meadow_albedo.png',
)
const textureGrassAO = textureLoader.load(
  '../textures/grass/wispy-grass-meadow_ao.png',
)
const textureGrassHeight = textureLoader.load(
  '../textures/grass/wispy-grass-meadow_height.png',
)
const textureGrassMetallic = textureLoader.load(
  '../textures/grass/wispy-grass-meadow_metallic.png',
)
const textureGrassNormal = textureLoader.load(
  '../textures/grass/wispy-grass-meadow_normal-ogl.png',
)
const textureGrassRoughness = textureLoader.load(
  '../textures/grass/wispy-grass-meadow_roughness.png',
)

const materialGrass = new THREE.MeshStandardMaterial()
materialGrass.map = textureGrass
materialGrass.aoMap = textureGrassAO
materialGrass.roughnessMap = textureGrassRoughness
materialGrass.metalnessMap = textureGrassMetallic
materialGrass.normalMap = textureGrassNormal
materialGrass.displacementMap = textureGrassHeight

materialGrass.displacementScale = 0.15
materialGrass.roughness = 0.6

// текстура камня
const textureRocky = textureLoader.load(
  '../textures/rocky/rocky-rugged-terrain_1_albedo.png',
)
const textureRockyAO = textureLoader.load(
  '../textures/rocky/rocky-rugged-terrain_1_ao.png',
)
const textureRockyHeight = textureLoader.load(
  '../textures/rocky/rocky-rugged-terrain_1_height.png',
)
const textureRockyMetallic = textureLoader.load(
  '../textures/rocky/rocky-rugged-terrain_1_metallic.png',
)
const textureRockyNormal = textureLoader.load(
  '../textures/rocky/rocky-rugged-terrain_1_normal-ogl.png',
)
const textureRockyRoughness = textureLoader.load(
  '../textures/rocky/rocky-rugged-terrain_1_roughness.png',
)

const materialRocky = new THREE.MeshStandardMaterial()

materialRocky.map = textureRocky
materialRocky.aoMap = textureRockyAO
materialRocky.roughnessMap = textureRockyRoughness
materialRocky.metalnessMap = textureRockyMetallic
materialRocky.normalMap = textureRockyNormal
materialRocky.displacementMap = textureRockyHeight

materialRocky.displacementScale = 0.125
materialRocky.roughness = 0.45

// текстура кирпича
const textureBrick = textureLoader.load(
  '../textures/brick/victorian-brick_albedo.png',
)
const textureBrickAO = textureLoader.load(
  '../textures/brick/victorian-brick_ao.png',
)
const textureBrickHeight = textureLoader.load(
  '../textures/brick/victorian-brick_height.png',
)
const textureBrickMetallic = textureLoader.load(
  '../textures/brick/victorian-brick_metallic.png',
)
const textureBrickNormal = textureLoader.load(
  '../textures/brick/victorian-brick_normal-ogl.png',
)
const textureBrickRoughness = textureLoader.load(
  '../textures/brick/victorian-brick_roughness.png',
)

const materialBrick = new THREE.MeshStandardMaterial()
materialBrick.map = textureBrick
materialBrick.aoMap = textureBrickAO
materialBrick.roughnessMap = textureBrickRoughness
materialBrick.metalnessMap = textureBrickMetallic
materialBrick.normalMap = textureBrickNormal
materialBrick.displacementMap = textureBrickHeight

materialBrick.displacementScale = 0.25
materialBrick.roughness = 0.75

// // объекты с геометрией и материалом
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial)

// const cubeMesh2 = new THREE.Mesh(cubeGeometry, cubeMaterial)
const cubeMesh2 = new THREE.Mesh(cubeGeometry, material)
// // позиционка и скалирование
cubeMesh2.position.x = 2
// cubeMesh2.scale.setScalar(0.75)

const cubeMesh3 = new THREE.Mesh(cubeGeometry, cubeMaterial2)
cubeMesh3.position.x = -2
cubeMesh3.scale.setScalar(1.25)
// поворот по оси "y"
cubeMesh3.rotation.y = 0.75

// const geometry = new THREE.CapsuleGeometry(0.5, 1, 32, 64)
const geometry = new THREE.SphereGeometry(1, 64, 64)
const geometryMesh = new THREE.Mesh(geometry, material)

const torusKnot = new THREE.TorusKnotGeometry(0.5, 0.15, 100, 16)
// const torusKnotMesh = new THREE.Mesh(torusKnot, material)
const torusKnotMesh = new THREE.Mesh(torusKnot, standardMaterial)
torusKnotMesh.position.x = 2
// работа с тенями (объект)
torusKnotMesh.castShadow = true // Отбрасывает тень
torusKnotMesh.receiveShadow = true // Принимает тень

const sphereGeometry = new THREE.SphereGeometry(1, 64, 64)
// const sphereMesh = new THREE.Mesh(sphereGeometry, standardMaterial)
// const sphereMesh = new THREE.Mesh(sphereGeometry, materialGrass)
// const sphereMesh = new THREE.Mesh(sphereGeometry, materialRocky)
const sphereMesh = new THREE.Mesh(sphereGeometry, materialBrick)

// // Отражения
const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(128)
const cubeCamera = new THREE.CubeCamera(0.1, 60, cubeRenderTarget)
cubeCamera.position.copy(torusKnotMesh.position)
scene.add(cubeCamera)
standardMaterial.envMap = cubeRenderTarget.texture
standardMaterial.envMapIntensity = 0.5

// // работа с внешним объектом
// загрузка модели
const loader = new GLTFLoader()

loader.load('../textures/boulder/boulder.glb', (gltf) => {
  gltf.scene.traverse((node) => {
    if (node.isMesh) {
      node.material = boulderMaterial
    }
  })
  scene.add(gltf.scene)
})

// загрузка текстур
const textures = {
  boulderAlbedo: textureLoader.load(
    '../textures/boulder/sharp-boulder2-albedo.png',
  ),
}
// инвертируем текстуру по оси Y
textures.boulderAlbedo.flipY = false

// настройка материала
const boulderMaterial = new THREE.MeshStandardMaterial({
  map: textures.boulderAlbedo,
})

// // группа объектов сцены
const sceneGroup = new THREE.Group()
// sceneGroup.add(cubeMesh, cubeMesh2, cubeMesh3)
// sceneGroup.add(geometryMesh, cubeMesh2, cubeMesh3)
// sceneGroup.add(geometryMesh, torusKnotMesh, cubeMesh3)
// sceneGroup.add(sphereMesh, torusKnotMesh, cubeMesh3)
sceneGroup.add(torusKnotMesh, cubeMesh3)

// // добавление группы на сцену
scene.add(sceneGroup)

// // поворот всей группы по оси "y" в градусах
sceneGroup.rotation.y = THREE.MathUtils.degToRad(45)

// // туман
const fog = new THREE.Fog('#000', 2, 4)
scene.fog = fog

// // освещение
// AmbientLight - равномерно освещает объекты сцены, не создает теней и бликов, имитирует фоновое освещение
const light = new THREE.AmbientLight('#fff', 0.15)
scene.add(light)

// PointLight - точечный исочник света, светит во все направления, создает тени и блики, имеет параметры затухания с расстоянием
const pointLight = new THREE.PointLight('#fff', 2)
pointLight.position.set(1.8, 0.7, 0)
// работа с тенями  (источник освещения)
pointLight.castShadow = true
pointLight.shadow.mapSize.width = 2048
pointLight.shadow.mapSize.height = 2048
pointLight.shadow.camera.far = 10
pointLight.shadow.radius = 25

scene.add(pointLight)

// // Helper для pointLight
const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.1)
scene.add(pointLightHelper)

// // меняем у пишем в консоль позицию pointLight
// document.addEventListener('mousemove', (e) => {
//   pointLight.position.set(e.pageX / 50, e.pageY / 50, 0)
//   console.log(pointLight.position)
// })

// // цвета для обозначения позиционирования по осям:
// x - красный
// y - зеленый
// z - синий

// // добавили оси на сцену
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

// // добавили сетку на сцену
const gridHelper = new THREE.GridHelper(10, 10)
gridHelper.position.set(0.5, 0, 0.5)
scene.add(gridHelper)

// // настройки камеры
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  30,
)

camera.position.x = 2
camera.position.y = 2
camera.position.z = 2.5

scene.add(camera)

// // нахождение элемента "canvas" в html-документе
const canvas = document.querySelector('.threejs')

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
})

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setSize(window.innerWidth, window.innerHeight)

renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFShadowMap

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// // выравнивание анимации независимо от FPS
const clock = new THREE.Clock()

// // Raycaster - способ взаимодействия с объектом на сцене
const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()
let isDraggingKnot = false
let targetRotation = { x: 0, y: 0 }
let displayRotation = { x: 0, y: 0 }

canvas.addEventListener('mousedown', (e) => {
  if (e.button !== 0) return
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
  raycaster.setFromCamera(mouse, camera)
  isDraggingKnot = raycaster.intersectObject(torusKnotMesh).length > 0
})

canvas.addEventListener('mouseup', () => {
  isDraggingKnot = false
})

canvas.addEventListener('mousemove', (e) => {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
  raycaster.setFromCamera(mouse, camera)

  controls.enabled = !isDraggingKnot

  if (isDraggingKnot && e.buttons === 1) {
    targetRotation.y += e.movementX * 0.01
    targetRotation.x += e.movementY * 0.01
  }
})

// // цикличная функция ререндера
const animate = () => {
  const elapsedTime = clock.getElapsedTime()

  // для отражений
  torusKnotMesh.visible = false
  cubeCamera.update(renderer, scene)
  torusKnotMesh.visible = true
  //

  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(animate)
  camera.updateProjectionMatrix()

  // частота вращения - зависит от FPS экрана, потому желательно использовать другой вариант, чтобы скорость воспроизведения анимации была одинаковая независимо от FPS (через clock)
  // sceneGroup.rotation.y += THREE.MathUtils.degToRad(0.25)

  // pointLight.position.z = Math.sin(elapsedTime * 1)

  // Raycaster Smooth
  displayRotation.x = THREE.MathUtils.lerp(
    displayRotation.x,
    targetRotation.x,
    0.1,
  )
  displayRotation.y = THREE.MathUtils.lerp(
    displayRotation.y,
    targetRotation.y,
    0.1,
  )
  torusKnotMesh.rotation.set(displayRotation.x, displayRotation.y, 0)
}

animate()

// // изменение размера канваса при изменении ширины/высоты окна браузера
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)
})

// // Очистка от интструментов разработчика

if (devMode) {
  // // добавляем инструментарий для изменения параметров на клиенте
  const pane = new Pane()
  // pane.addBinding(material, 'shininess', {
  //   min: 0,
  //   max: 4000,
  // })
  pane.addBinding(standardMaterial, 'metalness', {
    min: 0,
    max: 1,
  })
  pane.addBinding(standardMaterial, 'roughness', {
    min: 0,
    max: 1,
  })
  pane.addBinding(textureGrass, 'offset', {
    x: { min: -1, max: 1 },
    y: { min: -1, max: 1 },
  })
  pane.addBinding(materialBrick, 'roughness', {
    min: 0,
    max: 1,
  })
  pane.addBinding(standardMaterial, 'envMapIntensity', {
    min: 0,
    max: 2,
  })
} else {
  scene.remove(axesHelper, gridHelper, pointLightHelper)
}
