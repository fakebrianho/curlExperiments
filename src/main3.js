import './style.css'
import * as THREE from 'three'
import { sizes, camera } from './camera'
import { PARAMS, pane, orbit } from './controls'
import { resize } from './eventListeners'
import initFbo from './initFBO3'
import background from './background'
import glb from './externalModels'
import { MeshTransmissionMaterial } from './meshTransmissionMaterial'
import addLight from './lights'
let fbo, time, canvas, gltfScene

THREE.ColorManagement.legacyMode = false
const renderer = new THREE.WebGLRenderer({
	antialias: true,
	alpha: true,
})

const scene = new THREE.Scene()
const clock = new THREE.Clock()
init()
function init() {
	renderer.setSize(sizes.width, sizes.height)
	renderer.setClearColor(0xff0000, 0)
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
	canvas = renderer.domElement
	canvas.classList.add('webgl')
	document.body.appendChild(canvas)
	document.body.appendChild(renderer.domElement)
	resize(camera, renderer, sizes)
	orbit(camera, renderer)
	// glb(scene)
	add()
	animate()

	// scene.add(gltfScene)
}

function add() {
	fbo = initFbo(renderer)
	const bg = background()
	const g = new THREE.SphereGeometry(1, 100, 100)
	const m = new THREE.MeshStandardMaterial({ color: 'red' })
	const mm = new THREE.Mesh(g, m)
	// scene.add(mm)
	let light = addLight()
	scene.add(light)
	// gltfScene = glb()
	// scene.add(gltfScene)
	scene.add(bg)
	scene.add(fbo.particles)
}

function animate() {
	requestAnimationFrame(animate)
	time = clock.getElapsedTime()
	fbo.particles.rotation.x += 0.01
	fbo.particles.rotation.y += 0.005
	fbo.particles.rotation.z -= 0.012
	fbo.renderMaterial.uniforms.uPointSize.value = PARAMS.particleSize
	fbo.renderMaterial.uniforms.uOpacity.value = PARAMS.opacity
	fbo.simulationMaterial.uniforms.uCurlFreq.value = PARAMS.curl
	fbo.simulationMaterial.uniforms.uSpeed.value = PARAMS.particleSpeed
	fbo.simulationMaterial.uniforms.timer.value = PARAMS.morph
	fbo.update(time)
	renderer.render(scene, camera)
}
