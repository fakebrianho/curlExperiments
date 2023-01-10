uniform float uOpacity;
uniform float bounds;
varying vec3 p;

void main() {
  // gl_FragColor = vec4(vec3(1.0), 0.25);

  gl_FragColor = vec4(vec3(1.0, 0.0, 0.0), uOpacity);
  gl_FragColor = vec4(p, uOpacity);
}