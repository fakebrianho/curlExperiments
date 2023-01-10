import simVertex from '/@/shaders/simulationVert2.glsl'
import simFragment from '/@/shaders/simulationFrag2.glsl'
import particlesFragment from '/@/shaders/particlesFragment.glsl'
import particlesVertex from '/@/shaders/particlesVertex.glsl'
import FBO from './FBO'
import { getRandomSpherePoint } from './getRandomSpherePoint'
import {
	DataTexture,
	ShaderMaterial,
	AdditiveBlending,
	RGBFormat,
	FloatType,
} from 'three'

function getRandomData(width, height, size) {
	var len = width * height * 3
	var data = new Float32Array(len)
	while (len--) data[len] = (Math.random() - 0.5) * size
	return data
}

export default function initFbo(renderer) {
	// Set up the FBO
	const fboWidth = 256
	const fboHeight = 256
	let length = fboWidth * fboHeight * 3
	let data = new Float32Array(length)
	for (let i = 0; i < length; i += 3) {
		// Random positions inside a sphere
		const point = getRandomSpherePoint()
		data[i + 0] = point.x
		data[i + 1] = point.y
		data[i + 2] = point.z
	}

	let dataB = getRandomData(fboWidth, fboHeight, 2)
	const positionsB = new DataTexture(
		dataB,
		fboWidth,
		fboHeight,
		RGBFormat,
		FloatType
	)
	positionsB.needsUpdate = true
	// Convert the data to a FloatTexture
	const positions = new DataTexture(
		data,
		fboWidth,
		fboHeight,
		RGBFormat,
		FloatType
	)
	positions.needsUpdate = true
	let simulationMaterial = new ShaderMaterial({
		vertexShader: simVertex,
		fragmentShader: simFragment,
		uniforms: {
			positions: { value: positions },
			positionsB: { type: 't', value: positionsB },
			initPos: { type: 't', value: positionsB },
			timer: { value: 0.0 },
			uTime: { value: 0 },
			uSpeed: { value: 3.0 },
			bounds: { value: 2.0 },
			uCurlFreq: { value: 0.55 },
		},
	})
	let renderMaterial = new ShaderMaterial({
		vertexShader: particlesVertex,
		fragmentShader: particlesFragment,
		uniforms: {
			positions: { value: null },
			uTime: { value: 0 },
			uPointSize: { value: 1.4 },
			uOpacity: { value: 0.55 },
		},
		transparent: true,
		blending: AdditiveBlending,
	})
	const fbo = new FBO(
		fboWidth,
		fboHeight,
		renderer,
		simulationMaterial,
		renderMaterial
	)
	return fbo
	// scene.add(fbo.particles)
}
