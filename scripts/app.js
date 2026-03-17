import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

// сцена
const scene = new THREE.Scene()

// геометрия и грани по x/y/z
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1, 25, 25, 25)

// материалы
const cubeMaterial = new THREE.MeshBasicMaterial({ color: '#519aba' })

const cubeMaterial2 = new THREE.MeshBasicMaterial({
  color: '#234223',
  wireframe: true,
})

// объекты с геометрией и материалом
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial)

const cubeMesh2 = new THREE.Mesh(cubeGeometry, cubeMaterial)
// позиционка и скалирование
cubeMesh2.position.x = 2
cubeMesh2.scale.setScalar(0.5)

const cubeMesh3 = new THREE.Mesh(cubeGeometry, cubeMaterial2)
cubeMesh3.position.x = -2
cubeMesh3.scale.setScalar(1.25)
// поворот по оси "y"
cubeMesh3.rotation.y = 0.75

// const geometry = new THREE.CapsuleGeometry(0.5, 1, 32, 64)
const geometry = new THREE.SphereGeometry(0.75, 64, 64)
const geometryMesh = new THREE.Mesh(geometry, cubeMaterial2)

// группа объектов сцены
const sceneGroup = new THREE.Group()
// sceneGroup.add(cubeMesh, cubeMesh2, cubeMesh3)
sceneGroup.add(geometryMesh, cubeMesh2, cubeMesh3)

// добавление группы в сцену
scene.add(sceneGroup)

// поворот всей группы по оси "y" в градусах
sceneGroup.rotation.y = THREE.MathUtils.degToRad(45)

// цвета для обозначения позиционирования по осям:
// x - красный
// y - зеленый
// z - синий

// добавили оси на сцену
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

// добавили сетку на сцену
const gridHelper = new THREE.GridHelper(10, 10)
gridHelper.position.set(0.5, 0, 0.5)
scene.add(gridHelper)

// настройки камеры
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

// нахождение элемента "canvas" в html-документе
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

// выравнивание анимации независимо от FPS
const clock = new THREE.Clock()

// цикличная функция ререндера
const animate = () => {
  const elapsedTime = clock.getElapsedTime()

  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(animate)
  camera.updateProjectionMatrix()

  // частота вращения - зависит от FPS экрана, потому желательно использовать другой вариант, чтобы скорость воспроизведения анимации была одинаковая независимо от FPS (через clock)
  // sceneGroup.rotation.y += THREE.MathUtils.degToRad(0.25)
}

animate()

// изменение размера канваса при изменении ширины/высоты окна браузера
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)
})

