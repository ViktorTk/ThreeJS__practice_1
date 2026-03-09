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

cubeMesh.position.set(1, 0.5, 1)

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

scene.add(cubeMesh)

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
}

animate()

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)
})
