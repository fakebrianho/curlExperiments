uniform sampler2D positions;
uniform float uPointSize; 
varying vec3 p; 
uniform float uRadius;
varying float vDistance;
void main() { 
  vec3 pos = texture2D(positions, position.xy).xyz;
  // float b = bounds;
  // b*=0.5;  float distanceFactor = pow(uRadius - distance(position, vec3(0.0)), 2.0);
 
  float distanceFactor = pow(uRadius - distance(pos.xyz, vec3(0.0)), 2.0);
  float size = distanceFactor * 1.5 + 3.0;
  vDistance = distanceFactor;
  p = pos;
  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  // pct = distance(st,vec2(0.5));

  // gl_PointSize = uPointSize / -mvPosition.z;
  // gl_PointSize = uPointSize;
 gl_PointSize =   uPointSize * 3.0;
  // Size attenuation;
  gl_PointSize *= step(1.0 - (1.0/64.0), position.x) + 0.5;

}