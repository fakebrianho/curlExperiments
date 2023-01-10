uniform float uOpacity;
uniform float bounds;
varying vec3 p;

void main() {
  // gl_FragColor = vec4(vec3(1.0), 0.25);
  // vec3 finalColor = vec3(1.0);
  vec3 finalColor = vec3(bounds, 0.0, 0.0);
  // gl_FragColor = vec4(vec3(1.0, 0.0, 0.0), uOpacity);
  // if(p.x < -bounds || p.x > bounds || p.y > bounds || p.y < -bounds || p.z < -bounds || p.z > bounds){
  //   finalColor = p;
  // }
  if(p.x < -bounds || p.x > bounds){
    finalColor = p;
  }
  gl_FragColor = vec4(finalColor, uOpacity);
}