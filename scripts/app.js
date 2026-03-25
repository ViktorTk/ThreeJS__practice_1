import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { Pane } from 'tweakpane'

const devMode = true

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
// TextureLoader - ассинхронный загрузчик изображения, преобразует их в текстуры для материалов
const textureLoader = new THREE.TextureLoader()

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

// создание материала и работа с картами текстур материала
const materialGrass = new THREE.MeshStandardMaterial()
materialGrass.map = textureGrass
materialGrass.aoMap = textureGrassAO
materialGrass.roughnessMap = textureGrassRoughness
materialGrass.metalnessMap = textureGrassMetallic
materialGrass.normalMap = textureGrassNormal
materialGrass.displacementMap = textureGrassHeight

materialGrass.displacementScale = 0.15
materialGrass.roughness = 0.6

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

const sphereGeometry = new THREE.SphereGeometry(1, 64, 64)
// const sphereMesh = new THREE.Mesh(sphereGeometry, standardMaterial)
const sphereMesh = new THREE.Mesh(sphereGeometry, materialGrass)

// // группа объектов сцены
const sceneGroup = new THREE.Group()
// sceneGroup.add(cubeMesh, cubeMesh2, cubeMesh3)
// sceneGroup.add(geometryMesh, cubeMesh2, cubeMesh3)
// sceneGroup.add(geometryMesh, torusKnotMesh, cubeMesh3)
sceneGroup.add(sphereMesh, torusKnotMesh, cubeMesh3)

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

// console.log(renderer);

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// // выравнивание анимации независимо от FPS
const clock = new THREE.Clock()

// // цикличная функция ререндера
const animate = () => {
  const elapsedTime = clock.getElapsedTime()

  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(animate)
  camera.updateProjectionMatrix()

  // частота вращения - зависит от FPS экрана, потому желательно использовать другой вариант, чтобы скорость воспроизведения анимации была одинаковая независимо от FPS (через clock)
  // sceneGroup.rotation.y += THREE.MathUtils.degToRad(0.25)

  // pointLight.position.z = Math.sin(elapsedTime * 1)
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
} else {
  scene.remove(axesHelper, gridHelper, pointLightHelper)
}
