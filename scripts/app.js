import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

// console.log(THREE)

const scene = new THREE.Scene()

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 'red' })

const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial)

// console.log(cubeMesh)

scene.add(cubeMesh)

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  30,
)

camera.position.z = 2

scene.add(camera)

const canvas = document.querySelector('.threejs')

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})

renderer.setSize(window.innerWidth, window.innerHeight)

// renderer.render(scene, camera)

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.autoRotate = true

const animate = () => {
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(animate)
}

animate()
