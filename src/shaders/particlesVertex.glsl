uniform sampler2D positions;
uniform float uPointSize; 
varying vec3 p; 
uniform float bounds;
void main() { 
  vec3 pos = texture2D(positions, position.xy).xyz;
  float b = bounds;
  b*=0.5; 
  p = pos;
  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  // pct = distance(st,vec2(0.5));

  // gl_PointSize = uPointSize / -mvPosition.z;
  gl_PointSize = uPointSize;
}