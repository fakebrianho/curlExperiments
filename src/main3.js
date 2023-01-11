import './style.css'
import * as THREE from 'three'
import { sizes, camera } from './camera'
import { PARAMS, pane, orbit } from './controls'
import { resize } from './eventListeners'
import initFbo from './initFBO3'
import background from './background'
import { MeshTransmissionMaterial } from './meshTransmissionMaterial'
let fbo, time, canvas
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
	add()
	testClearMat()
	animate()
}
function testClearMat() {
	const geometry = new THREE.BoxGeometry(1, 1, 1)
	const material = new THREE.MeshPhysicalMaterial({
		roughness: 0,
		transmission: 1,
		thickness: 0.5, // Add refraction!
	})
	const g2 = new THREE.SphereGeometry(0.2, 32, 16)
	const m2 = new THREE.MeshBasicMaterial({ color: 'red' })
	const mesh2 = new THREE.Mesh(g2, m2)
	const mesh = new THREE.Mesh(geometry, material)
	scene.add(mesh)
	mesh2.position.set(0, 0, 0)
	scene.add(mesh2)

	// const material = new THREE.MeshPhysicalMaterial()
	// const material = new MeshTransmissionMaterial(10)
	// material.uniforms.chromaticAberration.value = 0.05
	// material.uniforms.anisotropy.value = 0.1
	// material.uniforms.distortion.value = 0.0
	// material.uniforms.distortionScale.value = 0.5
	// material.uniforms.temporalDistortion.value = 0.0
	// material.uniforms.temporalDistortion.value = 0.0
	// material.roughness = 0
	// material.thickness = 4.5
	// material.ior = 1.5
	// material.clearcoat = 1
	// material.clearcoatRoughness = 0
	// roughness: 0,
	// thickness: 4.5,
	// ior: 1.5
	// const mesh = new THREE.Mesh(geometry, material)
	// scene.add(mesh)
	// console.log(material)
}

function add() {
	fbo = initFbo(renderer)
	const bg = background()
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
