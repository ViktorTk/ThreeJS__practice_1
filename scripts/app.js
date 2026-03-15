import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

// console.log(THREE)

const scene = new THREE.Scene()
// console.log(scene)

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 'red' })

const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial)

// console.log(cubeMesh)

// cubeMesh.position.x = 1
// cubeMesh.position.y = 1
// cubeMesh.position.z = -1

// cubeMesh.position.set(1, 0.5, 1)

// const tempVector = new THREE.Vector3(0, 0.25, 0)
// cubeMesh.position.copy(tempVector)

// cubeMesh.scale.set(1, 1.5, 1)
// cubeMesh.updateMatrix()

const cubeMesh2 = new THREE.Mesh(cubeGeometry, cubeMaterial)
cubeMesh2.position.x = 2
// cubeMesh2.scale.x = 0.5
// cubeMesh2.scale.y = 0.5
// cubeMesh2.scale.z = 0.5

// cubeMesh2.scale.set(0.5, 0.5, 0.5)

cubeMesh2.scale.setScalar(0.5)

const cubeMesh3 = new THREE.Mesh(cubeGeometry, cubeMaterial)
cubeMesh3.position.x = -2
cubeMesh3.scale.setScalar(1.25)

const sceneGroup = new THREE.Group()

sceneGroup.add(cubeMesh, cubeMesh2, cubeMesh3)

scene.add(sceneGroup)

sceneGroup.scale.y = 3
// sceneGroup.scale.setScalar(1.25)

// цвета для обозначения позиционирования по осям:
// x - красный
// y - зеленый
// z - синий

const axesHelper = new THREE.AxesHelper(5)
// console.log(axesHelper)
scene.add(axesHelper)

const gridHelper = new THREE.GridHelper(10, 10)
// console.log(gridHelper)
gridHelper.position.set(0.5, 0, 0.5)
scene.add(gridHelper)

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  30,
)

camera.position.z = 2

// console.log(camera);

scene.add(camera)

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
// controls.autoRotate = true

// console.log(controls);

const animate = () => {
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(animate)

  camera.updateProjectionMatrix()
}

animate()

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)
})

// закончил 9 урок
