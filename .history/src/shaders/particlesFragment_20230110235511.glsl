uniform float uOpacity;
uniform float bounds;
varying vec3 p;

void main() {
  // gl_FragColor = vec4(vec3(1.0), 0.25);
  vec3 finalColor = vec3(1.0);
  gl_FragColor = vec4(vec3(1.0, 0.0, 0.0), uOpacity);
  if(finalPos.x < -bounds || finalPos.x > bounds || finalPos.y > bounds || finalPos.y < -bounds || finalPos.z < -bounds || finalPos.z > bounds){
    finalColor = p;
  }
  gl_FragColor = vec4(finalColor, uOpacity);
}